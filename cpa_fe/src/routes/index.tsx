import { createBrowserRouter } from "react-router-dom";
// import { getCompanyTypes } from '@api/company/companyTypes';
// import queryClient from "../query-client";
import React from "react";

import LoginHistoryPage from "@pages/login-history/LoginHistoryPage";
import PaymentsPage from "@pages/payments/PaymentsPage";
import DomainsPage from "@pages/domains/DomainsPage";
import ProductsPage from "@pages/products/ProductsPage";
import { productLoader } from "@pages/productDetails/ProductDetailsPage";
import ProductDetailsPage from "@pages/productDetails/ProductDetailsPage";
import ReferralPage from "@pages/referral/ReferralPage";
import queryClient from "../query-client";
import { getCategories, getCountries } from "@api/product/product";
import OrderPage from "@pages/orders/OrderPage";
import BalanceOrderPage from "@pages/balance/BalanceOrderPage";
import ReportsPage from "@pages/reports/ReportsPage";

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
            loader: () =>
              queryClient.fetchQuery({
                queryKey: ["countries_and_categories"],
                queryFn: () => Promise.all([getCountries(), getCategories()]),
              }),
          },
          {
            id: "product",
            path: ":productId",
            children: [
              {
                index: true,
                element: <ProductDetailsPage />,
                errorElement: <ErrorPage />,
                loader: productLoader,
              },
            ],
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
        id: "referrals",
        path: "/referrals",
        children: [
          {
            index: true,
            element: <ReferralPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        id: "orders",
        path: "/orders",
        children: [
          {
            index: true,
            element: <OrderPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        id: "balance",
        path: "/balance",
        children: [
          {
            index: true,
            element: <BalanceOrderPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        id: "reports",
        path: "/reports",
        children: [
          {
            index: true,
            element: <ReportsPage />,
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
