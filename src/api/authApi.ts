import { ILogin } from "../utils/types";
import { AjaxUtils } from "./ajax";

export const loginApi = (values: ILogin) => {
  const url = "/Authorization";
  console.log("values", values);
  return AjaxUtils.postAjax(
    url,
    {
      email: "string",
      password: "wBtpVK$Imx",
    },
    false
  );
};

export const signUpApi = (values: ILogin) => {
  const url = "/signup";
  return AjaxUtils.postAjax(url, values, false);
};
