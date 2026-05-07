import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isBiometricAvailable] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBiometricLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("メールアドレスを入力してください");
      return;
    }
    if (!password.trim()) {
      setError("パスワードを入力してください");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/setup/device");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="w-full max-w-md">
        {/* Logo area */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-ink tracking-wider">
            ワークフロー
          </h1>
          <p className="text-sm text-ink-soft mt-2">
            一般経費承認システム
          </p>
        </div>

        {/* Biometric button */}
        {isBiometricAvailable && (
          <button
            onClick={handleBiometricLogin}
            disabled={isLoading}
            className="w-full h-14 rounded-btn bg-primary text-white font-medium text-base flex items-center justify-center gap-2 mb-6 hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50"
          >
            <i className="ri-fingerprint-line text-xl"></i>
            {isLoading ? "認証中..." : "生体認証でログイン"}
          </button>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-line"></div>
          <span className="text-xs text-ink-soft">または</span>
          <div className="flex-1 h-px bg-line"></div>
        </div>

        {/* Login form */}
        <form onSubmit={handlePasswordLogin} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 text-sm text-accent bg-[#fde8e3] px-4 py-3 rounded-btn">
              <i className="ri-error-warning-line"></i>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="会社のメールアドレス"
              className="w-full h-12 px-4 rounded-btn bg-screen-soft border border-line text-ink placeholder:text-ink-soft/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
            />
          </div>

          <div>
            <label className="block text-sm text-ink-soft mb-1.5">
              パスワード
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                className="w-full h-12 px-4 pr-12 rounded-btn bg-screen-soft border border-line text-ink placeholder:text-ink-soft/40 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink transition-colors cursor-pointer"
              >
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-btn bg-primary text-white font-medium text-base hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        {/* Forgot password */}
        <div className="text-center mt-6">
          <button className="text-sm text-ink-soft hover:text-primary transition-colors cursor-pointer">
            パスワードを忘れた方
          </button>
        </div>
      </div>
    </div>
  );
}