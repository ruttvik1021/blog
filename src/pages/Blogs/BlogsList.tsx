import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteBlog,
  getAllBlog,
  getBlogById,
  getBlogCategories,
} from "../../api/blogsApi";
import { queryKeys } from "../../utils/querykeys";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { ICategory } from "../../utils/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

const BlogsList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: blogsList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.blogs],
    queryFn: () => getAllBlog(),
  });

  const { data: blogCategoriesData } = useQuery({
    queryKey: [queryKeys.blogCategories],
    queryFn: () => getBlogCategories(),
  });

  const prefetch = (id: any) => {
    queryClient.prefetchQuery({
      queryKey: [queryKeys.blogs, String(id)],
      queryFn: () => getBlogById(id),
      staleTime: 20000,
    });
  };

  const { mutate: deleteBlogById } = useMutation({
    mutationKey: [queryKeys.blogsDelete],
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.blogs] });
    },
  });

  if (isLoading) <p>Loading...</p>;
  if (isError) <p>Error</p>;

  return (
    <>
      {blogsList && blogsList.data && blogsList?.data.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogsList?.data?.map((blog: any) => (
              <Card key={blog.id} className="border border-gray-200 shadow-md">
                <CardHeader className="flex-row justify-between p-5 items-center">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={blog.image} />
                    <AvatarFallback>{blog.title}</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-3">
                    <button
                      onMouseEnter={() => prefetch(blog.id)}
                      onFocus={() => prefetch(blog.id)}
                      onClick={() => navigate(`/blogs/${blog.id}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      disabled
                      onClick={() => navigate(`/blogs/${blog.id}`)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteBlogById(blog.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription className="mt-3">
                    {blog.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-gray-500">
                    Category:{" "}
                    {(blogCategoriesData &&
                      blogCategoriesData.data.find(
                        (cat: ICategory) => cat.id === blog.categoryId
                      )?.categoryName) ||
                      ""}
                  </div>
                  <div className="text-gray-500">
                    Featured: {blog.isFeatured ? "Yes" : "No"}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p>No Data</p>
      )}
    </>
  );
};

export default BlogsList;
