import type { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import Login from "@/pages/login/page";
import SetupDevice from "@/pages/setup-device/page";
import ApplyCategory from "@/pages/apply/page";
import ApplyForm from "@/pages/apply-form/page";
import History from "@/pages/history/page";
import RequestDetail from "@/pages/request-detail/page";
import Approvals from "@/pages/approvals/page";
import ApprovalDetail from "@/pages/approval-detail/page";
import Notifications from "@/pages/notifications/page";
import Dashboard from "@/pages/dashboard/page";
import Settings from "@/pages/settings/page";

const routes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "/setup/device", element: <SetupDevice /> },
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/apply", element: <ApplyCategory /> },
  { path: "/apply/:category", element: <ApplyForm /> },
  { path: "/history", element: <History /> },
  { path: "/request/:id", element: <RequestDetail /> },
  { path: "/approvals", element: <Approvals /> },
  { path: "/approvals/:id", element: <ApprovalDetail /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/settings", element: <Settings /> },
  { path: "*", element: <NotFound /> },
];

export default routes;