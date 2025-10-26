import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import ForgotPassword from "../pages/Forget";
import VerifyCode from "../pages/VerifyCode";
import ResetPassword from "../pages/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/verify-code", element: <VerifyCode /> },
      { path: "/reset-password", element: <ResetPassword /> },
    ],
  },
]);
