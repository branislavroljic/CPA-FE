import { createBrowserRouter } from "react-router-dom";
// import { getCompanyTypes } from '@api/company/companyTypes';
// import queryClient from "../query-client";
import React from "react";

import LoginHistoryPage from "@pages/login-history/LoginHistoryPage";
import PaymentsPage from "@pages/payments/PaymentsPage";
import DomainsPage from "@pages/domains/DomainsPage";
import ProductsPage from "@pages/products/ProductsPage";

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
const AccountSetting = React.lazy(
  () => import("@pages/account-setting/AccountSettingsPage")
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
        id: "products",
        path: "/products",
        children: [
          {
            index: true,
            element: <ProductsPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        id: "user-profile",
        path: "/user-profile",
        element: <AccountSetting />,
        errorElement: <ErrorPage />,
      },
      {
        id: "payments",
        path: "/payments",
        children: [
          {
            index: true,
            element: <PaymentsPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        id: "domains",
        path: "/domains",
        children: [
          {
            index: true,
            element: <DomainsPage />,
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
