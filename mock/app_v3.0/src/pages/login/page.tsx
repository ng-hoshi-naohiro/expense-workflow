import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, Eye, EyeOff, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md">
        {/* Logo area */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-ink tracking-wider">
            ワークフロー
          </h1>
          <p className="text-sm text-ink-soft mt-2 font-medium">
            一般経費承認システム
          </p>
        </div>

        {/* Biometric button */}
        {isBiometricAvailable && (
          <button
            onClick={handleBiometricLogin}
            disabled={isLoading}
            className="w-full h-12 rounded-btn bg-primary text-white font-bold text-base flex items-center justify-center gap-2 mb-6 hover:bg-primary-dark active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 shadow-card"
          >
            <Fingerprint className="w-5 h-5" />
            {isLoading ? "認証中..." : "生体認証でログイン"}
          </button>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-line"></div>
          <span className="text-xs text-ink-soft font-bold">または</span>
          <div className="flex-1 h-px bg-line"></div>
        </div>

        {/* Login form */}
        <form onSubmit={handlePasswordLogin} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 text-sm text-accent bg-[rgba(200,71,43,0.06)] px-4 py-3 rounded-btn border border-[rgba(200,71,43,0.12)]">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-ink-soft mb-1.5">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="会社のメールアドレス"
              className="w-full h-12 px-4 rounded-btn bg-screen-soft border border-line text-ink placeholder:text-line focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink-soft mb-1.5">
              パスワード
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                className="w-full h-12 px-4 pr-12 rounded-btn bg-screen-soft border border-line text-ink placeholder:text-line focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-ink-soft hover:text-ink transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-btn bg-ink text-white font-bold text-base hover:bg-ink-soft active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        {/* Forgot password */}
        <div className="text-center mt-6">
          <button className="text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer font-bold">
            パスワードを忘れた方
          </button>
        </div>
      </div>
    </div>
  );
}