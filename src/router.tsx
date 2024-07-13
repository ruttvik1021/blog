import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthWrapper from "./wrappers/AuthWrapper";
import Login from "./pages/Login";
import NotFound from "./wrappers/NotFound";
import LayoutWrapper from "./wrappers/LayoutWrapper";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import Blogs from "./pages/Blogs/Blogs";
import BlogCreate from "./pages/Blogs/BlogsCreate";
import BlogsList from "./pages/Blogs/BlogsList";

export const routers = createBrowserRouter([
  {
    path: "auth",
    element: <AuthWrapper />,
    children: [
      {
        path: "",
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "",
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "blogs",
        element: <Blogs />,
        children: [
          { path: "", element: <BlogsList />, errorElement: <p>Oops</p> },
          {
            path: "create",
            element: <BlogCreate />,
            errorElement: <p>Oops</p>,
          },
          { path: ":id", element: <BlogCreate />, errorElement: <p>Oops</p> },
        ],
      },
    ],
  },
  { path: "logout", element: <Logout /> },
  { path: "*", element: <NotFound /> },
]);
