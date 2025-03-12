import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Notfound from "@/pages/Error/Notfound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRouter";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Auth/Login";
import User from "@/pages/Dashboard/User";
import Meeting from "@/pages/Dashboard/Meeting";
import Branch from "@/pages/Dashboard/Branch";
import GroupUser from "@/pages/Dashboard/GroupUser";
import MeetingApproval from "@/pages/Dashboard/MeetingApproval";
import Statistics from "@/pages/Dashboard/Statistics";

export const RootRouter = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Dashboard />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/meetings",
        element: <Meeting />,
      },
      {
        path: "/meetings/room-approvals",
        element: <MeetingApproval />,
      },
      {
        path: "/facilities/branches",
        element: <Branch />,
      },
      {
        path: "/users/groups",
        element: <GroupUser />,
      }
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
