import { useParams, useNavigate } from "react-router-dom";
import { applications } from "@/mocks/applications";
import StatusBadge from "@/components/base/StatusBadge";
import ConfirmDialog from "@/components/base/ConfirmDialog";
import { useState } from "react";

export default function RequestDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);

  const app = applications.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <p className="text-ink-soft">申請が見つかりません</p>
      </div>
    );
  }

  const handleWithdraw = () => {
    setShowWithdrawDialog(false);
    navigate("/history");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-btn hover:bg-paper-warm transition-colors cursor-pointer"
        >
          <i className="ri-arrow-left-line text-lg text-ink-soft"></i>
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ink-soft">{app.id}</span>
            <StatusBadge status={app.status as "draft" | "pending" | "approved" | "rejected"} label={app.statusLabel} />
          </div>
          <h1 className="font-serif text-lg md:text-xl font-medium text-ink mt-1">
            {app.title}
          </h1>
        </div>
      </div>

      {/* Progress map */}
      {app.progress.length > 0 && (
        <div className="bg-screen rounded-card shadow-card p-5 md:p-6 mb-6">
          <h2 className="text-sm font-medium text-ink-soft mb-4">進捗状況</h2>
          <div className="flex items-start gap-2 overflow-x-auto pb-2">
            {app.progress.map((step, idx) => (
              <div key={step.step} className="flex items-start gap-2 shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-success text-white"
                        : step.status === "in_progress"
                        ? "bg-accent text-white"
                        : step.status === "rejected"
                        ? "bg-accent text-white"
                        : "bg-paper-warm text-ink-soft"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <i className="ri-check-line"></i>
                    ) : step.status === "rejected" ? (
                      <i className="ri-close-line"></i>
                    ) : (
                      <span className="text-sm font-mono">{step.step}</span>
                    )}
                  </div>
                  <span className="text-xs text-ink-soft mt-1.5 whitespace-nowrap">{step.name}</span>
                  {step.user && (
                    <span className="text-[11px] text-ink-soft/70 mt-0.5 whitespace-nowrap">{step.user}</span>
                  )}
                  {step.date && (
                    <span className="text-[11px] text-ink-soft/50 mt-0.5 whitespace-nowrap">{step.date}</span>
                  )}
                  {step.daysPending !== undefined && step.daysPending > 0 && (
                    <span className="text-[11px] text-warning mt-0.5 whitespace-nowrap">
                      滞留 {step.daysPending}日
                    </span>
                  )}
                </div>
                {idx < app.progress.length - 1 && (
                  <div className="w-8 h-px bg-line mt-5"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div className="bg-screen rounded-card shadow-card p-5 md:p-6 mb-6">
        <h2 className="text-sm font-medium text-ink-soft mb-4">申請内容</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-ink-soft mb-1">施設名</p>
            <p className="text-sm text-ink">{app.facility}</p>
          </div>
          <div>
            <p className="text-xs text-ink-soft mb-1">カテゴリ</p>
            <p className="text-sm text-ink">{app.categoryName}</p>
          </div>
          <div>
            <p className="text-xs text-ink-soft mb-1">業者名</p>
            <p className="text-sm text-ink">{app.vendor}</p>
          </div>
          <div>
            <p className="text-xs text-ink-soft mb-1">金額（税込）</p>
            <p className="text-sm text-ink font-mono font-medium">¥{app.amount.toLocaleString()}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs text-ink-soft mb-1">用途・説明</p>
            <p className="text-sm text-ink">{app.description}</p>
          </div>
        </div>
      </div>

      {/* Rejection comment */}
      {app.rejectionComment && (
        <div className="bg-[#fde8e3] rounded-card p-5 mb-6">
          <div className="flex items-start gap-2">
            <i className="ri-error-warning-line text-accent mt-0.5"></i>
            <div>
              <p className="text-sm font-medium text-accent">差戻しコメント</p>
              <p className="text-sm text-ink-soft mt-1">{app.rejectionComment}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {app.status === "pending" && (
          <button
            onClick={() => setShowWithdrawDialog(true)}
            className="h-12 px-6 rounded-btn border border-line bg-screen text-ink font-medium text-sm hover:bg-paper-warm transition-colors cursor-pointer whitespace-nowrap"
          >
            取下げ
          </button>
        )}
        {app.status === "rejected" && (
          <button
            onClick={() => navigate(`/apply/${app.category}`)}
            className="h-12 px-6 rounded-btn bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors cursor-pointer whitespace-nowrap"
          >
            修正して再申請
          </button>
        )}
      </div>

      <ConfirmDialog
        isOpen={showWithdrawDialog}
        title="申請を取下げますか？"
        message={`「${app.title}」の申請を取下げます。この操作は取り消せません。`}
        confirmLabel="取下げる"
        confirmVariant="danger"
        onConfirm={handleWithdraw}
        onCancel={() => setShowWithdrawDialog(false)}
      />
    </div>
  );
}