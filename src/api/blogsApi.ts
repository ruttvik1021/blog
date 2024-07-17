import { IBlog, ICreateCategory } from "../utils/types";
import { AjaxUtils } from "./ajax";

export const createBlog = (values: IBlog) => {
  const url = "/Blog";
  return AjaxUtils.postAjax(url, values, true);
};

export const updateBlog = (values: IBlog, id: string) => {
  const url = `/Blog/${id}`;
  return AjaxUtils.putAjax(url, values, false);
};

export const deleteBlog = (id: string) => {
  const url = `/Blog/${id}`;
  return AjaxUtils.deleteAjax(url, true);
};

export const getAllBlog = () => {
  const url = `/Blog`;
  return AjaxUtils.getAjax(url, true);
};

export const getBlogById = (id: string) => {
  const url = `/Blog/${id}`;
  return AjaxUtils.getAjax(url, true);
};

export const getBlogCategories = () => {
  const url = `/Category`;
  return AjaxUtils.getAjax(url, true);
};

export const createBlogCategory = (values: ICreateCategory) => {
  const url = "/Category";
  return AjaxUtils.postAjax(url, values, true);
};

export const deleteBlogCategory = (id: string) => {
  const url = "/Category/" + id;
  return AjaxUtils.deleteAjax(url, true);
};
