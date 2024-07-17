import { ILogin } from "../utils/types";
import { AjaxUtils } from "./ajax";

export const loginApi = (values: ILogin) => {
  const url = "/Authorization";
  console.log("values", values);
  return AjaxUtils.postAjax(
    url,
    {
      email: "string",
      password: "0D3HDg2KtH",
    },
    false
  );
};

export const signUpApi = (values: ILogin) => {
  const url = "/User";
  return AjaxUtils.postAjax(url, values, false);
};
