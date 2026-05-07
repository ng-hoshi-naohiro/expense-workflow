import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { currentUser } from "@/mocks/users";
import { notifications } from "@/mocks/notifications";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLoginPage = location.pathname === "/login";
  const isSetupPage = location.pathname === "/setup/device";
  if (isLoginPage || isSetupPage) return null;

  const navItems = [
    { path: "/", label: "ホーム", icon: "ri-home-line" },
    { path: "/apply", label: "申請", icon: "ri-file-add-line" },
    { path: "/approvals", label: "承認待ち", icon: "ri-checkbox-circle-line" },
    { path: "/history", label: "履歴", icon: "ri-history-line" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-screen shadow-card border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-14 md:h-16">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer"
          aria-label="メニュー"
        >
          <i className="ri-menu-line text-xl text-ink"></i>
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-lg md:text-xl font-medium text-ink tracking-wide"
        >
          ワークフロー
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-btn text-sm whitespace-nowrap transition-colors cursor-pointer ${
                location.pathname === item.path
                  ? "text-primary bg-primary/5"
                  : "text-ink-soft hover:text-ink hover:bg-paper-warm"
              }`}
            >
              <i className={`${item.icon} text-base`}></i>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-1">
          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setUserMenuOpen(false);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-btn hover:bg-paper-warm transition-colors cursor-pointer relative"
              aria-label="通知"
            >
              <i className="ri-notification-3-line text-lg text-ink-soft"></i>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-screen rounded-card shadow-modal border border-line overflow-hidden">
                <div className="px-4 py-3 border-b border-line flex items-center justify-between">
                  <span className="font-medium text-sm text-ink">通知</span>
                  <Link
                    to="/notifications"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs text-primary hover:text-primary-dark cursor-pointer"
                  >
                    すべて見る
                  </Link>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 4).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        setNotifOpen(false);
                        navigate(n.targetUrl);
                      }}
                      className={`w-full text-left px-4 py-3 border-b border-line/50 hover:bg-paper-warm transition-colors cursor-pointer ${
                        !n.read ? "bg-primary/3" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-paper-warm shrink-0">
                          <i className={`${n.icon} text-sm text-ink-soft`}></i>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-ink font-medium truncate">
                            {n.title}
                          </p>
                          <p className="text-xs text-ink-soft mt-0.5 line-clamp-2">
                            {n.body}
                          </p>
                          <p className="text-[11px] text-ink-soft/60 mt-1">
                            {n.date}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setNotifOpen(false);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
              aria-label="ユーザーメニュー"
            >
              <i className="ri-user-line text-lg text-primary"></i>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-12 w-52 bg-screen rounded-card shadow-modal border border-line overflow-hidden">
                <div className="px-4 py-3 border-b border-line">
                  <p className="font-medium text-sm text-ink">{currentUser.name}</p>
                  <p className="text-xs text-ink-soft mt-0.5">{currentUser.email}</p>
                </div>
                <Link
                  to="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-paper-warm transition-colors cursor-pointer"
                >
                  <i className="ri-settings-3-line"></i>
                  設定
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-accent hover:bg-paper-warm transition-colors cursor-pointer text-left"
                >
                  <i className="ri-logout-box-r-line"></i>
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-paper z-40">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-btn text-base whitespace-nowrap transition-colors cursor-pointer ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/5"
                    : "text-ink hover:bg-paper-warm"
                }`}
              >
                <i className={`${item.icon} text-lg`}></i>
                {item.label}
              </Link>
            ))}
            <div className="border-t border-line my-2"></div>
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-btn text-base text-ink hover:bg-paper-warm transition-colors cursor-pointer"
            >
              <i className="ri-bar-chart-2-line text-lg"></i>
              ダッシュボード
            </Link>
            <Link
              to="/settings"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-btn text-base text-ink hover:bg-paper-warm transition-colors cursor-pointer"
            >
              <i className="ri-settings-3-line text-lg"></i>
              設定
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}