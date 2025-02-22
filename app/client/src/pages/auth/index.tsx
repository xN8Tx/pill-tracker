import { RouteObject } from "react-router-dom";

import { RegisterPage } from "./ui/RegisterPage";
import { LogoutPage } from "./ui/LogoutPage";
import { LoginPage } from "./ui/LoginPage";
import { Layout } from "./ui/Layout";

export const authRouter: RouteObject = {
  path: "/auth",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "logout",
      element: <LogoutPage />,
    },
  ],
};
