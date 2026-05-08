import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  Home,
  FilePlus,
  CheckCircle,
  History,
  BarChart3,
} from "lucide-react";
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
    { path: "/", label: "ホーム", icon: Home },
    { path: "/apply", label: "申請", icon: FilePlus },
    { path: "/approvals", label: "承認待ち", icon: CheckCircle },
    { path: "/history", label: "履歴", icon: History },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white border-b border-[#d5cdb8]"
          : "bg-white border-b border-[#d5cdb8]"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 h-14 md:h-16">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer"
          aria-label="メニュー"
        >
          <Menu className="w-6 h-6 text-ink" />
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-serif font-medium text-ink tracking-wide flex items-center gap-2"
        >
          ワークフロー
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-btn text-sm whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setUserMenuOpen(false);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-btn hover:bg-screen-soft transition-colors cursor-pointer relative"
              aria-label="通知"
            >
              <Bell className="w-5 h-5 text-ink-soft" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-card shadow-modal border border-line overflow-hidden">
                <div className="px-4 py-3 border-b border-line flex items-center justify-between">
                  <span className="font-bold text-base text-ink">通知</span>
                  <Link
                    to="/notifications"
                    onClick={() => setNotifOpen(false)}
                    className="text-sm text-primary hover:text-primary-dark cursor-pointer font-bold"
                  >
                    すべて見る
                  </Link>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 4).map((n) => {
                    return (
                      <button
                        key={n.id}
                        onClick={() => {
                          setNotifOpen(false);
                          navigate(n.targetUrl);
                        }}
                        className={`w-full text-left px-4 py-3 border-b border-line/50 hover:bg-screen-soft transition-colors cursor-pointer ${
                          !n.read ? "bg-[rgba(36,189,126,0.03)]" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full shrink-0 bg-screen-soft">
                            {!n.read ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-line" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-sm ${!n.read ? "font-bold text-ink" : "font-medium text-ink"} truncate`}>
                                {n.title}
                              </p>
                              {!n.read && (
                                <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-sm text-ink-soft mt-1 line-clamp-2 leading-relaxed">
                              {n.body}
                            </p>
                            <p className="text-xs text-ink-soft/70 mt-1.5 font-medium">
                              {n.date}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
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
              className="w-10 h-10 flex items-center justify-center rounded-btn bg-screen-soft hover:bg-line/30 transition-colors cursor-pointer"
              aria-label="ユーザーメニュー"
            >
              <User className="w-5 h-5 text-ink-soft" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-card shadow-modal border border-line overflow-hidden">
                <div className="px-4 py-3 border-b border-line">
                  <p className="font-bold text-sm text-ink">{currentUser.name}</p>
                  <p className="text-xs text-ink-soft mt-0.5">{currentUser.email}</p>
                </div>
                <Link
                  to="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-soft hover:text-ink hover:bg-screen-soft transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  設定
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-accent hover:bg-[rgba(200,71,43,0.06)] transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4" />
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-14 bg-white z-40">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-btn text-base whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-ink-soft hover:bg-screen-soft"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <div className="border-t border-line my-2"></div>
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-btn text-base text-ink-soft hover:bg-screen-soft transition-colors cursor-pointer"
            >
              <BarChart3 className="w-5 h-5" />
              ダッシュボード
            </Link>
            <Link
              to="/settings"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-btn text-base text-ink-soft hover:bg-screen-soft transition-colors cursor-pointer"
            >
              <Settings className="w-5 h-5" />
              設定
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}