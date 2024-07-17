import { ILogin } from "../utils/types";
import { AjaxUtils } from "./ajax";

export const loginApi = (values: ILogin) => {
  const url = "/Authorization";
  return AjaxUtils.postAjax(
    url,
    values,
    false
  );
};

export const signUpApi = (values: ILogin) => {
  const url = "/User";
  return AjaxUtils.postAjax(url, values, false);
};
