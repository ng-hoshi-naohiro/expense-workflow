import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupDevice() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Detect device/browser
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

    // Simulate WebAuthn registration
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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <i className="ri-fingerprint-line text-3xl text-primary"></i>
          </div>
          <h1 className="font-serif text-xl font-medium text-ink">
            デバイス登録
          </h1>
          <p className="text-sm text-ink-soft mt-2">
            このデバイスを承認用端末として登録します
          </p>
        </div>

        {success ? (
          <div className="bg-success/10 border border-success/20 rounded-card p-6 text-center">
            <i className="ri-checkbox-circle-line text-4xl text-success mb-3"></i>
            <p className="font-medium text-ink">登録が完了しました</p>
            <p className="text-sm text-ink-soft mt-1">ホーム画面に移動します...</p>
          </div>
        ) : (
          <>
            {/* Benefits */}
            <div className="bg-screen rounded-card shadow-card p-5 mb-6">
              <h2 className="text-sm font-medium text-ink mb-3">
                登録するメリット
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-success/10 shrink-0 mt-0.5">
                    <i className="ri-check-line text-xs text-success"></i>
                  </div>
                  <p className="text-sm text-ink-soft">
                    次回からパスワード入力が不要になります
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-success/10 shrink-0 mt-0.5">
                    <i className="ri-check-line text-xs text-success"></i>
                  </div>
                  <p className="text-sm text-ink-soft">
                    生体認証でセキュアなログインが可能です
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-success/10 shrink-0 mt-0.5">
                    <i className="ri-check-line text-xs text-success"></i>
                  </div>
                  <p className="text-sm text-ink-soft">
                    承認操作もワンタップで完了します
                  </p>
                </li>
              </ul>
            </div>

            {/* Device info */}
            <div className="bg-paper-warm rounded-card p-4 mb-6">
              <p className="text-xs text-ink-soft mb-1">検出されたデバイス</p>
              <p className="text-sm font-medium text-ink flex items-center gap-2">
                <i className="ri-smartphone-line"></i>
                {getDeviceInfo()}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-sm text-accent bg-[#fde8e3] px-4 py-3 rounded-btn mb-4">
                <i className="ri-error-warning-line"></i>
                {error}
              </div>
            )}

            {/* Register button */}
            <button
              onClick={handleRegister}
              disabled={isRegistering}
              className="w-full h-14 rounded-btn bg-primary text-white font-medium text-base flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50 mb-4"
            >
              <i className="ri-fingerprint-line text-xl"></i>
              {isRegistering ? "登録中..." : "このデバイスを登録する"}
            </button>

            {/* Skip */}
            <div className="text-center">
              <button
                onClick={handleSkip}
                disabled={isRegistering}
                className="text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer disabled:opacity-50"
              >
                あとで登録する
              </button>
              <p className="text-xs text-ink-soft/60 mt-1">
                ※推奨しません。セキュリティと利便性が低下します
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}