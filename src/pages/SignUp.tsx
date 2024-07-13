import { useMutation } from "@tanstack/react-query";
import { FormikProvider, useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signUpApi } from "../api/authApi";
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
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: signup } = useMutation({
    mutationKey: [queryKeys.authUser],
    mutationFn: (form: ILogin) => signUpApi(form),
    onSuccess: () => {
      navigate("/auth/login");
      toast.success("Registration Complete, Please Login to continue");
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
      signup(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Card className="min-w-[400px] w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your email below to create an account.
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
              Signup
            </Button>
          </CardContent>
          <CardFooter>
            Already have an account ?{" "}
            <NavLink to={"/auth/login"} className="ml-2 text-blue-500">
              Login here
            </NavLink>
          </CardFooter>
        </Card>
      </form>
    </FormikProvider>
  );
};

export default Signup;
