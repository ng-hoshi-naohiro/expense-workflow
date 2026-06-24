import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, Check, Smartphone, AlertCircle } from "lucide-react";

export default function SetupDevice() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) return "iPhone Safari";
    if (/Android/.test(ua)) return "Android Chrome";
    if (/Windows/.test(ua)) return "Windows Chrome";
    if (/Mac/.test(ua)) return "Mac Safari";
    return "不明なデバイス";
  };

  const handleRegister = () => {
    setError("");
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 2000);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-medium text-ink">
            デバイス登録
          </h1>
          <p className="text-sm text-ink-soft mt-2 font-medium">
            このデバイスを承認用端末として登録します
          </p>
        </div>

        {success ? (
          <div className="bg-[rgba(36,189,126,0.08)] border border-[rgba(36,189,126,0.15)] rounded-card p-6 text-center">
            <Check className="w-12 h-12 text-primary mx-auto mb-3" />
            <p className="font-serif font-medium text-ink text-lg">登録が完了しました</p>
            <p className="text-sm text-ink-soft mt-1">ホーム画面に移動します...</p>
          </div>
        ) : (
          <>
            {/* Benefits */}
            <div className="bg-white rounded-card shadow-card p-6 mb-6 border border-line/50">
              <h2 className="text-base font-serif font-medium text-ink mb-4">
                登録するメリット
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[rgba(36,189,126,0.12)] shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-ink-soft">
                    次回からパスワード入力が不要になります
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[rgba(36,189,126,0.12)] shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-ink-soft">
                    生体認証でセキュアなログインが可能です
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[rgba(36,189,126,0.12)] shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-ink-soft">
                    承認操作もワンタップで完了します
                  </p>
                </li>
              </ul>
            </div>

            {/* Device info */}
            <div className="bg-screen-soft rounded-btn p-4 mb-6 border border-line/50">
              <p className="text-xs text-ink-soft mb-1 font-bold">検出されたデバイス</p>
              <p className="text-sm font-bold text-ink flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                {getDeviceInfo()}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-accent bg-[rgba(200,71,43,0.06)] px-4 py-3 rounded-btn mb-4 border border-[rgba(200,71,43,0.12)]">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {/* Register button */}
            <button
              onClick={handleRegister}
              disabled={isRegistering}
              className="w-full h-12 rounded-btn bg-primary text-white font-bold text-base flex items-center justify-center gap-2 hover:bg-primary-dark active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 shadow-card mb-4"
            >
              <Fingerprint className="w-5 h-5" />
              {isRegistering ? "登録中..." : "このデバイスを登録する"}
            </button>

            {/* Skip */}
            <div className="text-center">
              <button
                onClick={handleSkip}
                disabled={isRegistering}
                className="text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer disabled:opacity-50 font-bold"
              >
                あとで登録する
              </button>
              <p className="text-xs text-line mt-1">
                ※推奨しません。セキュリティと利便性が低下します
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}