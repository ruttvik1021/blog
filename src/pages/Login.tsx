import { useMutation } from "@tanstack/react-query";
import { FormikProvider, useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginApi } from "../api/authApi";
import TextField, { fieldTypeEnums } from "../components/textfield";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { queryKeys } from "../utils/querykeys";
import { ILogin } from "../utils/types";
import { useAuthContext } from "../wrappers/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { mutate: loginFn } = useMutation({
    mutationKey: [queryKeys.authUser],
    mutationFn: (form: ILogin) => loginApi(form),
    onSuccess: (data: any) => {
      login(data.data.token);
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      loginFn(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Card className="min-w-[400px] w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <TextField
                type={fieldTypeEnums.TEXT}
                name={"email"}
                placeholder={"Email"}
              />
            </div>
            <div className="grid gap-2">
              <TextField
                type={fieldTypeEnums.PASSWORD}
                name={"password"}
                placeholder={"Password"}
              />
            </div>

            <Button className="w-full" variant="default">
              Login
            </Button>
          </CardContent>
          <CardFooter>
            Don't have an account ?{" "}
            <NavLink to={"/auth/signup"} className="ml-2 text-blue-500">
              Signup here
            </NavLink>
          </CardFooter>
        </Card>
      </form>
    </FormikProvider>
  );
};

export default Login;
