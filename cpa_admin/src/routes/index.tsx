import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "@pages/Error/NotFoundPage";
import CategoryPage from "@pages/categories/CategoryPage";
import ErrorPage from "@pages/Error/ErrorPage";
import ProductsPage from "@pages/products/ProductsPage";
import queryClient from "../query-client";
import { getCategories } from "@api/category/category";
import { getCountries } from "@api/product/product";
import PaymentsPage from "@pages/payments/PaymentsPage";
import OrderPage from "@pages/orders/OrderPage";
import UserPage from "@pages/users/UserPage";
import React from "react";
import Notifications from "@pages/notifications/Notifications";
import StatisticsPage from "@pages/statistic/StatisticPage";
import ReferralPage from "@pages/referrals/ReferralPage";
import { getAccountManagers } from "@api/user/user";
import UserStatisticsPage from "@pages/userStatistics/UserStatisticsPage";
import ReportsPage from "@pages/reports/ReportsPage";
import VIPRequestsPage from "@pages/vip/VIPRequestsPage";
import PartnersPage from "@pages/Partners/PartnersPage";

const FullLayout = React.lazy(() => import("@layout/full/FullLayout"));
const LayoutUnauth = React.lazy(() => import("@layout/LayoutUnauth"));

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
        id: "dashboard",
        path: "/",
        children: [
          {
            index: true,
            element: <StatisticsPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        id: "categories",
        path: "/categories",
        element: <CategoryPage />,
        errorElement: <ErrorPage />,
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
        ],
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
        id: "partners",
        path: "/partners",
        children: [
          {
            index: true,
            element: <PartnersPage />,
            errorElement: <ErrorPage />,
          },
          {
            id: "partner_orders",
            path: ":userId/orders",
            element: <OrderPage />,
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
        id: "users",
        path: "/users",
        children: [
          {
            index: true,
            element: <UserPage />,
            errorElement: <ErrorPage />,
            loader: () =>
              queryClient.fetchQuery({
                queryKey: ["account_managers"],
                queryFn: () => Promise.all([getAccountManagers()]),
              }),
          },
          {
            id: "statistics",
            path: ":userId/statistics",
            element: <UserStatisticsPage />,
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
        id: "vipRequests",
        path: "/vip_requests",
        children: [
          {
            index: true,
            element: <VIPRequestsPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        id: "notifications",
        path: "/notifications",
        element: <Notifications />,
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
