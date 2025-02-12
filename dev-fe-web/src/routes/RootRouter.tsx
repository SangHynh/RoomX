import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Notfound from "@/pages/Error/Notfound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRouter";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Auth/Login";

export const RootRouter = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />, 
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />, // 
  },
  {
    path: "*",
    element: <Notfound />, 
  },
]);