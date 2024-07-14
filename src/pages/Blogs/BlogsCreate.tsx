import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  createBlog,
  createBlogCategory,
  getBlogById,
  getBlogCategories,
  updateBlog,
} from "../../api/blogsApi";
import TextField, { fieldTypeEnums } from "../../components/textfield";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { queryKeys } from "../../utils/querykeys";
import { ICreateCategory } from "../../utils/types";

const BlogCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: blogData } = useQuery({
    queryKey: [queryKeys.blogs, id],
    queryFn: () => getBlogById(id ?? ""),
    enabled: !!id,
  });

  const { data: blogCategoriesData } = useQuery({
    queryKey: [queryKeys.blogCategories],
    queryFn: () => getBlogCategories(),
  });

  const { mutate: updateBlogMutation } = useMutation({
    mutationKey: [queryKeys.blogs, id],
    mutationFn: (values: any) => updateBlog(values, id ?? ""),
    onSuccess() {
      queryClient.setQueryData([queryKeys.blogs, id], formik.values);
      formik.resetForm();
      navigate("/blogs");
    },
  });

  const { mutate: createBlogMutation } = useMutation({
    mutationKey: [queryKeys.blogsCreate],
    mutationFn: (values: any) => createBlog(values),
    onSuccess(data: any) {
      queryClient.setQueryData([queryKeys.blogs, data.id], formik.values);
      formik.resetForm();
      navigate("/blogs");
    },
  });

  const { mutate: createBlogCategoryMutation } = useMutation({
    mutationKey: [queryKeys.blogsCreate],
    mutationFn: (values: ICreateCategory) => createBlogCategory(values),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [queryKeys.blogCategories] });
      categoryFormik.resetForm();
    },
    onError() {
      queryClient.invalidateQueries({ queryKey: [queryKeys.blogCategories] });
    },
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      title: "",
      content: "",
      image: "",
      isFeatured: false,
      categoryId: 1,
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      image: Yup.string().required("Image URL is required"),
      categoryId: Yup.number()
        .required("Category ID is required")
        .min(1, "Category ID must be greater than 0"),
    }),
    onSubmit: (values) => {
      if (id) {
        updateBlogMutation(values);
      } else {
        createBlogMutation(values);
      }
    },
  });

  const categoryFormik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      createBlogCategoryMutation(values);
    },
  });

  useEffect(() => {
    if (blogData?.data?.length) {
      const blogDetails = blogData.data;
      delete blogDetails.id;
      formik.setValues(blogDetails);
    }
  }, [blogData]);

  return (
    <div className="p-5">
      <div className="flex justify-between flex-wrap gap-3">
        <Label className="text-3xl">Create Blogs</Label>
        <FormikProvider value={categoryFormik}>
          <div className="flex items-center gap-5 flex-wrap">
            {blogCategoriesData && blogCategoriesData.data?.length ? (
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {blogCategoriesData?.data?.map((item: any) => (
                    <SelectItem value={item.id}>
                      {item.categoryName} <Button>X</Button>{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}

            <TextField
              type={fieldTypeEnums.TEXT}
              name={"categoryName"}
              placeholder={"New Category"}
              required
            />
            <Button onClick={() => categoryFormik.handleSubmit()} type="submit">
              Add
            </Button>
          </div>
        </FormikProvider>
      </div>
      <Separator className="my-3" />
      <div className="w-full mx-auto">
        <FormikProvider value={formik}>
          <Form className="space-y-4">
            <Field name={"categoryName"}>
              {({ meta }: any) => (
                <div className="my-2">
                  <Label htmlFor="category">Category</Label>
                  <span className="text-red-600 ml-1">*</span>
                  <Select value={String(formik.values.categoryId)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue defaultValue={formik.values.categoryId} />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategoriesData?.data?.map((item: any) => (
                        <SelectItem value={item.id} onClick={() => formik.setFieldValue(“categoryId”, item.id)}>
                          {item.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {meta.touched && meta.error && (
                    <div className="text-sm text-red-600">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>

            <TextField
              type={fieldTypeEnums.TEXT}
              name={"title"}
              placeholder={"Title"}
              label="Title"
              required
            />
            <TextField
              type={fieldTypeEnums.TEXT}
              name={"description"}
              placeholder={"Description"}
              label="Description"
              required
            />
            <TextField
              type={fieldTypeEnums.TEXTAREA}
              name={"content"}
              placeholder={"Content"}
              label="Content"
              required
            />
            <TextField
              type={fieldTypeEnums.TEXT}
              name={"image"}
              placeholder={"Image URL"}
              label="Image Url"
              required
            />
            <Button
              type="submit"
              variant="default"
              onClick={() => formik.handleSubmit()}
            >
              Submit
            </Button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default BlogCreate;
