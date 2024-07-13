import { IBlog, ICategory } from "../utils/types";
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
  const url = `/api/Category`;
  return AjaxUtils.getAjax(url, true);
};

export const createBlogCategory = (values: ICategory) => {
  const url = "/api/Category";
  return AjaxUtils.postAjax(url, values, true);
};
