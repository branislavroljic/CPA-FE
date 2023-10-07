import { createBrowserRouter } from "react-router-dom";
// import { getCompanyTypes } from '@api/company/companyTypes';
// import queryClient from "../query-client";
import React from "react";
import CompanyPage from "@pages/Company/CompanyPage";

import LoginHistoryPage from "@pages/login-history/LoginHistoryPage";

const FullLayout = React.lazy(() => import("@layout/full/FullLayout"));
const LayoutUnauth = React.lazy(() => import("@layout/LayoutUnauth"));
const ErrorPage = React.lazy(() => import("@pages/Error/ErrorPage"));
const NotFoundPage = React.lazy(() => import("@pages/Error/NotFoundPage"));

const LoginPage = React.lazy(() => import("@pages/Auth/LoginPage"));
const ForgotPasswordPage = React.lazy(
  () => import("@pages/Auth/ForgotPassword")
);
const RecoverPasswordPage = React.lazy(
  () => import("@pages/Auth/RecoverPasswordPage")
);

const browserConfig = createBrowserRouter([
  {
    id: "layout-auth",
    path: "/",
    element: <FullLayout />,
    children: [
      {
        id: "login_history",
        path: "/",
        children: [
          {
            index: true,
            element: <LoginHistoryPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        id: "notFound",
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    id: "layout-unatuh",
    element: <LayoutUnauth />,
    children: [
      {
        id: "login",
        path: "/login",
        element: <LoginPage />,
      },
      {
        id: "forgot-password",
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        id: "recover-password",
        path: "/recover-password",
        element: <RecoverPasswordPage />,
      },
    ],
  },
]);

export default browserConfig;
