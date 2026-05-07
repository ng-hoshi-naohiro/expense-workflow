import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSetupPage = location.pathname === "/setup/device";
  if (isLoginPage || isSetupPage) return null;

  const items = [
    { path: "/", label: "ホーム", icon: "ri-home-line" },
    { path: "/approvals", label: "承認", icon: "ri-checkbox-circle-line", badge: 3 },
    { path: "/apply", label: "申請", icon: "ri-add-line", center: true },
    { path: "/history", label: "履歴", icon: "ri-history-line" },
    { path: "/settings", label: "その他", icon: "ri-menu-4-line" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-screen border-t border-line shadow-[0_-2px_8px_rgba(12,24,48,0.06)]">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          if (item.center) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center -mt-5 w-16 h-16 rounded-full bg-accent text-white shadow-card cursor-pointer"
              >
                <i className={`${item.icon} text-xl`}></i>
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center w-full h-full cursor-pointer ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-ink-soft"
              }`}
            >
              <div className="relative">
                <i className={`${item.icon} text-lg`}></i>
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-accent text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}