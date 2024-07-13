import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { queryKeys } from "../../utils/querykeys";
import { useEffect } from "react";
import TextField, { fieldTypeEnums } from "../../components/textfield";
import { createBlog, getBlogById, updateBlog } from "../../api/blogsApi";
import { Button } from "../../components/ui/button";

const BlogCreate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: updateBlogMutation } = useMutation({
    mutationKey: [queryKeys.blogs, id],
    mutationFn: (values: any) => updateBlog(values, id ?? ""),
    onSuccess() {
      queryClient.setQueryData([queryKeys.blogs, id], formik.values);
      navigate("/blogs");
    },
  });

  const { mutate: createBlogMutation } = useMutation({
    mutationKey: [queryKeys.blogsCreate],
    mutationFn: (values: any) => createBlog(values),
    onSuccess(data: any) {
      queryClient.setQueryData([queryKeys.blogs, data.id], formik.values);
      navigate("/blogs");
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

  const { data: blogData } = useQuery({
    queryKey: [queryKeys.blogs, id],
    queryFn: () => getBlogById(id ?? ""),
    enabled: !!id,
  });

  useEffect(() => {
    if (blogData?.data?.length) {
      const blogDetails = blogData.data;
      delete blogDetails.id;
      formik.setValues(blogDetails);
    }
  }, [blogData]);

  return (
    <div className="w-1/2 mx-auto">
      <FormikProvider value={formik}>
        <Form className="space-y-4">
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
            onClick={() => formik.handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default BlogCreate;
