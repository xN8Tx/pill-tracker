import { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";

import { LogoutPage } from "./ui/LogoutPage";
import { Skeleton } from "./ui/Skeleton";
import { Layout } from "./ui/Layout";

const LoginPage = lazy(() =>
  import("./ui/LoginPage").then((mod) => ({ default: mod.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("./ui/RegisterPage").then((mod) => ({ default: mod.RegisterPage })),
);

export const authRouter: RouteObject = {
  path: "/auth",
  element: <Layout />,
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<Skeleton />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback={<Skeleton />}>
          <RegisterPage />
        </Suspense>
      ),
    },
    {
      path: "logout",
      element: <LogoutPage />,
    },
  ],
};
