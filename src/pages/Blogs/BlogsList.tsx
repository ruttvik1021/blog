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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-200 py-2 px-4">Image</th>
                  <th className="border-b border-gray-200 py-2 px-4">Title</th>
                  <th className="border-b border-gray-200 py-2 px-4">
                    Description
                  </th>
                  <th className="border-b border-gray-200 py-2 px-4">
                    Category
                  </th>
                  <th className="border-b border-gray-200 py-2 px-4">
                    Is Featured ?
                  </th>
                  <th className="border-b border-gray-200 py-2 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogsList?.data?.map((blog: any) => (
                  <tr key={blog.id}>
                    <td className="border-b border-gray-200 py-2 px-4">
                      <Avatar>
                        <AvatarImage src={blog.image} />
                        <AvatarFallback>{blog.title}</AvatarFallback>
                      </Avatar>
                    </td>
                    <td className="border-b border-gray-200 py-2 px-4">
                      {blog.title}
                    </td>
                    <td className="border-b border-gray-200 py-2 px-4">
                      {blog.description}
                    </td>
                    <td className="border-b border-gray-200 py-2 px-4">
                      {(blogCategoriesData &&
                        blogCategoriesData.data.find(
                          (cat: ICategory) => cat.id === blog.categoryId
                        )?.categoryName) ||
                        ""}
                    </td>
                    <td className="border-b border-gray-200 py-2 px-4">
                      {blog.isFeatured ? "True" : "False"}
                    </td>
                    <td className="border-b border-gray-200 py-2 px-4">
                      <div className="flex gap-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No Data</p>
      )}
    </>
  );
};

export default BlogsList;
