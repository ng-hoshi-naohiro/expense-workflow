import { Link, useLocation } from "react-router-dom";
import { Home, CheckCircle, Plus, History, MoreHorizontal } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSetupPage = location.pathname === "/setup/device";
  if (isLoginPage || isSetupPage) return null;

  const items = [
    { path: "/", label: "ホーム", icon: Home },
    { path: "/approvals", label: "承認", icon: CheckCircle, badge: 3 },
    { path: "/apply", label: "申請", icon: Plus, center: true },
    { path: "/history", label: "履歴", icon: History },
    { path: "/settings", label: "設定", icon: MoreHorizontal },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-line">
      <div className="flex items-end justify-around h-16 pb-1">
        {items.map((item) => {
          const Icon = item.icon;
          if (item.center) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-card cursor-pointer mb-1 active:scale-95 transition-transform"
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] mt-0.5 font-bold">{item.label}</span>
              </Link>
            );
          }
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center w-16 h-14 shrink-0 cursor-pointer ${
                isActive ? "text-primary" : "text-ink-soft"
              }`}
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                <Icon className="w-6 h-6" />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}