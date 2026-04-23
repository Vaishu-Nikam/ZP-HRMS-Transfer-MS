// src/routes/AppRouter.jsx
import React, { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { Layout } from "../components/layout/Layout";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy pages
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const UserList = React.lazy(() => import("../pages/users/UserList"));
const UserAdd = React.lazy(() => import("../pages/users/UserAdd"));
const UserEdit = React.lazy(() => import("../pages/users/UserEdit"));
const UserView = React.lazy(() => import("../pages/users/UserView"));
const RoleList = React.lazy(() => import("../pages/roles/RoleList"));
const RoleAdd = React.lazy(() => import("../pages/roles/RoleAdd"));
const RoleEdit = React.lazy(() => import("../pages/roles/RoleEdit"));
const ChangePassword = React.lazy(() => import("../pages/auth/ChangePassword"));
const MasterRoutes = React.lazy(() => import("../routes/masterRoutes"));
const EmployeeRoutes = React.lazy(() => import("../routes/EmployeeRoutes"));
const AppraisalRoutes = React.lazy(() => import("../routes/AppraisalRoutes"));
const RosterPage = React.lazy(() => import("../pages/roster/RosterPage"));
const TransferPage = React.lazy(() => import("../pages/transfer/TransferPage"));
const ReportsPage = React.lazy(() => import("../pages/reports/ReportsPage"));
const ExcelImportRoutes = React.lazy(() => import("../routes/ExcelImportRoutes"));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Layout />, // ✅ Layout NOT protected directly
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },

      // 🔐 PROTECTED ROUTES WRAPPER
      {
        element: <ProtectedRoute />,
        children: [
          // ✅ Dashboard
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                <Dashboard />
              </Suspense>
            ),
          },

          // ✅ Users
          {
            path: "users",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<div className="p-6">Loading...</div>}>
                    <UserList />
                  </Suspense>
                ),
              },
              {
                path: "add",
                element: (
                  <Suspense fallback={<div className="p-6">Loading...</div>}>
                    <UserAdd />
                  </Suspense>
                ),
              },
              {
                path: "edit/:id",
                element: (
                  <Suspense fallback={<div className="p-6">Loading...</div>}>
                    <UserEdit />
                  </Suspense>
                ),
              },
              {
                path: "view/:id",
                element: (
                  <Suspense fallback={<div className="p-6">Loading...</div>}>
                    <UserView />
                  </Suspense>
                ),
              },
            ],
          },

          // ✅ Roles
          {
            path: "roles",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<div className="p-6">Loading...</div>}>
                    <RoleList />
                  </Suspense>
                ),
              },
              {
                path: "add",
                element: (
                  <Suspense fallback={<div className="p-6">Loading...</div>}>
                    <RoleAdd />
                  </Suspense>
                ),
              },
              {
                path: "edit/:id",
                element: (
                  <Suspense fallback={<div className="p-6">Loading...</div>}>
                    <RoleEdit />
                  </Suspense>
                ),
              },
            ],
          },

          // ✅ Other protected pages
          {
            path: "change-password",
            element: (
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                <ChangePassword />
              </Suspense>
            ),
          },

          {
            path: "masters/*",
            element: (
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                <MasterRoutes />
              </Suspense>
            ),
          },

          {
            path: "employees/*",
            element: (
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                <EmployeeRoutes />
              </Suspense>
            ),
          },

          {
            path: "excel-import/*",
            element: (
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                <ExcelImportRoutes />
              </Suspense>
            ),
          },

          {
            path: "roster",
            element: (
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                <RosterPage />
              </Suspense>
            ),
          },

          {
            path: "transfer",
            element: (
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                <TransferPage />
              </Suspense>
            ),
          },

          {
            path: "appraisal/*",
            element: (
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                <AppraisalRoutes />
              </Suspense>
            ),
          },

          {
            path: "reports",
            element: (
              <Suspense fallback={<div className="p-6">Loading...</div>}>
                <ReportsPage />
              </Suspense>
            ),
          },
        ],
      },

      // ❌ Unknown route
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};