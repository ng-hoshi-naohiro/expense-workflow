import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/mocks/users";
import ConfirmDialog from "@/components/base/ConfirmDialog";
import {
  ArrowLeft, Bell, Fingerprint, Shield, Eye, Moon, Globe,
  ChevronRight, User, Mail, Building, Smartphone, KeyRound,
  ToggleLeft, ToggleRight, LogOut, Trash2, AlertTriangle,
} from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Toggle states
  const [settings, setSettings] = useState({
    pushNotify: true,
    emailNotify: true,
    approvalNotify: true,
    biometric: currentUser.hasBiometric,
    darkMode: false,
    compactView: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingToggle = ({
    icon: Icon,
    label,
    desc,
    active,
    onToggle,
  }: {
    icon: React.ElementType;
    label: string;
    desc?: string;
    active: boolean;
    onToggle: () => void;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-screen-soft flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-ink-soft" />
        </div>
        <div>
          <p className="text-sm font-bold text-ink">{label}</p>
          {desc && <p className="text-xs text-ink-soft mt-0.5">{desc}</p>}
        </div>
      </div>
      <button
        onClick={onToggle}
        className="cursor-pointer shrink-0 transition-transform active:scale-95"
      >
        {active ? (
          <ToggleRight className="w-8 h-8 text-primary" />
        ) : (
          <ToggleLeft className="w-8 h-8 text-ink-soft/40" />
        )}
      </button>
    </div>
  );

  const SettingRow = ({
    icon: Icon,
    label,
    value,
    onClick,
    danger,
  }: {
    icon: React.ElementType;
    label: string;
    value?: string;
    onClick?: () => void;
    danger?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full py-3 cursor-pointer text-left ${onClick ? "hover:bg-screen-soft -mx-3 px-3 rounded-lg transition-colors" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${danger ? "bg-[rgba(200,71,43,0.08)]" : "bg-screen-soft"}`}>
          <Icon className={`w-4 h-4 ${danger ? "text-accent" : "text-ink-soft"}`} />
        </div>
        <span className={`text-sm font-bold ${danger ? "text-accent" : "text-ink"}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {value && <span className="text-xs text-ink-soft font-medium">{value}</span>}
        {onClick && <ChevronRight className="w-4 h-4 text-ink-soft" />}
      </div>
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center hover:bg-screen-soft transition-colors cursor-pointer shrink-0 shadow-card"
        >
          <ArrowLeft className="w-5 h-5 text-ink-soft" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-ink leading-tight">
            設定
          </h1>
          <p className="text-sm text-ink-soft mt-0.5">
            アカウントとシステム設定の管理
          </p>
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-serif font-medium text-ink">{currentUser.name}</h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs text-ink-soft">
                <Mail className="w-3 h-3" />
                {currentUser.email}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-ink-soft">
                <Building className="w-3 h-3" />
                {currentUser.facility}
              </span>
            </div>
          </div>
          <button className="px-4 py-2 rounded-btn border border-line bg-white text-ink-soft hover:bg-screen-soft hover:text-ink transition-all text-xs font-bold cursor-pointer shrink-0">
            編集
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(36,189,126,0.10)] flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-base font-serif font-medium text-ink">
              通知設定
            </h2>
          </div>
          <div className="divide-y divide-line/30">
            <SettingToggle
              icon={Smartphone}
              label="プッシュ通知"
              desc="アプリからのリアルタイム通知"
              active={settings.pushNotify}
              onToggle={() => toggleSetting("pushNotify")}
            />
            <SettingToggle
              icon={Mail}
              label="メール通知"
              desc="重要な更新をメールで受信"
              active={settings.emailNotify}
              onToggle={() => toggleSetting("emailNotify")}
            />
            <SettingToggle
              icon={Bell}
              label="承認依頼通知"
              desc="承認依頼が届いた時に通知"
              active={settings.approvalNotify}
              onToggle={() => toggleSetting("approvalNotify")}
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(26,68,128,0.10)] flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <h2 className="text-base font-serif font-medium text-ink">
              セキュリティ
            </h2>
          </div>
          <div className="divide-y divide-line/30">
            <SettingToggle
              icon={Fingerprint}
              label="生体認証ログイン"
              desc="Face ID / Touch ID でログイン"
              active={settings.biometric}
              onToggle={() => toggleSetting("biometric")}
            />
            <SettingRow
              icon={KeyRound}
              label="パスワード変更"
              onClick={() => {}}
            />
            <SettingRow
              icon={Globe}
              label="デバイス管理"
              value="2台"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Display */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(184,92,0,0.10)] flex items-center justify-center">
              <Eye className="w-5 h-5 text-warning" />
            </div>
            <h2 className="text-base font-serif font-medium text-ink">
              表示設定
            </h2>
          </div>
          <div className="divide-y divide-line/30">
            <SettingToggle
              icon={Moon}
              label="ダークモード"
              desc="暗いテーマで表示"
              active={settings.darkMode}
              onToggle={() => toggleSetting("darkMode")}
            />
            <SettingToggle
              icon={Eye}
              label="コンパクト表示"
              desc="一覧を高密度で表示"
              active={settings.compactView}
              onToggle={() => toggleSetting("compactView")}
            />
          </div>
        </div>

        {/* Account actions */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[rgba(200,71,43,0.08)] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-base font-serif font-medium text-ink">
              アカウント操作
            </h2>
          </div>
          <div className="divide-y divide-line/30">
            <SettingRow
              icon={LogOut}
              label="ログアウト"
              onClick={() => setShowLogoutDialog(true)}
            />
            <SettingRow
              icon={Trash2}
              label="アカウント削除"
              danger
              onClick={() => setShowDeleteDialog(true)}
            />
          </div>
        </div>
      </div>

      {/* Version info */}
      <div className="mt-8 text-center">
        <p className="text-xs text-ink-soft">
          経費承認システム v1.2.0
        </p>
        <p className="text-xs text-ink-soft/60 mt-1">
          © 2026 株式会社サンプル. All rights reserved.
        </p>
      </div>

      {/* Logout dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={() => {
          setShowLogoutDialog(false);
          navigate("/login");
        }}
        title="ログアウトしますか？"
        message="再度ログインが必要になります。"
        confirmLabel="ログアウト"
        cancelLabel="キャンセル"
        variant="warning"
      />

      {/* Delete account dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => setShowDeleteDialog(false)}
        title="アカウントを削除しますか？"
        message="この操作は取り消せません。すべてのデータが削除されます。"
        confirmLabel="削除する"
        cancelLabel="キャンセル"
        variant="danger"
      />
    </div>
  );
}