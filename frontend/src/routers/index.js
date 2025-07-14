import Error from "@/app/error";
import MainLayout from "@/app/layout";
import NotFound from "@/app/not-found";
import AuthLayout from "@/app/pages/auth/layout";
import Login from "@/app/pages/auth/login";
import Register from "@/app/pages/auth/register";
import AdminLayout from "@/app/pages/protected/admin/layout";
import CompleteProfile from "@/app/pages/protected/complete-profile";
import EmployeeLayout from "@/app/pages/protected/employee/layout";
import PaymentHistory from "@/app/pages/protected/employee/payment-history";
import WorkSheet from "@/app/pages/protected/employee/work-sheet";
import EmployeeDetails from "@/app/pages/protected/hr/employee-details";
import EmployeeList from "@/app/pages/protected/hr/employee-list";
import HRLayout from "@/app/pages/protected/hr/layout";
import ProtectedLayout from "@/app/pages/protected/layout";
import Profile from "@/app/pages/protected/profile";
import Home from "@/app/pages/public/home";
import { createBrowserRouter } from "react-router";
import Progress from "../app/pages/protected/hr/progress";
import AllEmployeeList from "@/app/pages/protected/admin/all-employee-list";
import YouAreFired from "@/app/pages/protected/you-are-fired";
import Payroll from "@/app/pages/protected/admin/payroll";
import Test from "@/app/test";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    errorElement: Error,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/test",
        Component: Test,
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: "/auth/login",
            Component: Login,
          },
          {
            path: "/auth/register",
            Component: Register,
          },
        ],
      },
      {
        Component: ProtectedLayout,
        children: [
          {
            path: "/complete-profile",
            Component: CompleteProfile,
          },
          {
            path: "/profile",
            Component: Profile,
          },
          {
            path: "/you-are-fired",
            Component: YouAreFired,
          },
          {
            Component: EmployeeLayout,
            children: [
              {
                path: "/dashboard/work-sheet",
                Component: WorkSheet,
              },
              {
                path: "/dashboard/payment-history",
                Component: PaymentHistory,
              },
            ],
          },
          {
            Component: HRLayout,
            children: [
              {
                path: "/dashboard/employee-list",
                Component: EmployeeList,
              },
              {
                path: "/dashboard/progress",
                Component: Progress,
              },
              {
                path: "/dashboard/employee-list/:id",
                Component: EmployeeDetails,
              },
            ],
          },
          {
            Component: AdminLayout,
            children: [
              {
                path: "/dashboard/all-employee-list",
                Component: AllEmployeeList,
              },
              {
                path: "/dashboard/payroll",
                Component: Payroll,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);
