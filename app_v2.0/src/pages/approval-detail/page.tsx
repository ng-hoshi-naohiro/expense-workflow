import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pendingApprovals, applications } from "@/mocks/applications";
import ConfirmDialog from "@/components/base/ConfirmDialog";
import { Fingerprint, AlertTriangle, ArrowLeft, CheckCircle2, XCircle, MessageSquare } from "lucide-react";

export default function ApprovalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const app = pendingApprovals.find((a) => a.id === id) || applications.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <p className="text-ink-soft">申請が見つかりません</p>
      </div>
    );
  }

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowApproveDialog(false);
      setCompleted(true);
      setTimeout(() => navigate("/approvals"), 2000);
    }, 1500);
  };

  const handleReject = () => {
    if (!rejectComment.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRejectDialog(false);
      navigate("/approvals");
    }, 1500);
  };

  if (completed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-xl font-serif font-medium text-ink mb-2">承認しました</h2>
          <p className="text-sm text-ink-soft">承認待ち一覧に戻ります...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 md:py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer mb-4 font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        戻る
      </button>

      {/* Status badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-[rgba(184,92,0,0.10)] text-warning text-xs font-bold rounded-full">
          承認待ち
        </span>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-serif font-medium text-ink mb-4">
        {app.title}
      </h1>

      {/* Amount - most prominent */}
      <div className="mb-6">
        <p className="text-xs text-ink-soft mb-1 font-bold">金額（税込）</p>
        <p className="text-3xl md:text-4xl font-mono font-bold text-ink">
          ¥{app.amount.toLocaleString()}
        </p>
      </div>

      {/* Meta info */}
      <div className="bg-white rounded-card shadow-card p-5 mb-6 border border-line/50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-ink-soft mb-1 font-bold">申請者</p>
            <p className="text-sm text-ink font-medium">{(app as Record<string, unknown>).applicant as string || "田中 太郎"}</p>
          </div>
          <div>
            <p className="text-xs text-ink-soft mb-1 font-bold">カテゴリ</p>
            <p className="text-sm text-ink font-medium">{app.categoryName}</p>
          </div>
          <div>
            <p className="text-xs text-ink-soft mb-1 font-bold">申請日</p>
            <p className="text-sm text-ink font-medium">{app.createdAt}</p>
          </div>
          <div>
            <p className="text-xs text-ink-soft mb-1 font-bold">施設</p>
            <p className="text-sm text-ink font-medium">{(app as Record<string, unknown>).facility as string || "東京都 本社"}</p>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {(app as Record<string, unknown>).alert && (
        <div className="bg-[rgba(184,92,0,0.06)] border border-[rgba(184,92,0,0.12)] rounded-card p-4 mb-6">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <p className="text-sm text-warning font-bold">{(app as Record<string, unknown>).alert as string}</p>
          </div>
        </div>
      )}

      {/* AI estimate placeholder */}
      <div className="bg-[rgba(36,189,126,0.06)] border border-[rgba(36,189,126,0.12)] rounded-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-primary">AI 推定勘定科目</span>
        </div>
        <p className="text-sm text-ink">
          推定：消耗品費（信頼度 高）
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={() => setShowApproveDialog(true)}
          disabled={isProcessing}
          className="w-full h-14 rounded-btn bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary-dark active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 shadow-card"
        >
          <Fingerprint className="w-5 h-5" />
          {isProcessing ? "処理中..." : "承認する"}
        </button>

        {!showRejectInput ? (
          <button
            onClick={() => setShowRejectInput(true)}
            className="w-full h-12 rounded-btn border border-line bg-white text-ink font-bold text-sm hover:bg-screen-soft transition-colors cursor-pointer"
          >
            差戻す
          </button>
        ) : (
          <div className="space-y-3">
            <textarea
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              placeholder="差戻し理由を入力してください（必須）"
              rows={3}
              className="w-full px-4 py-3 rounded-btn bg-screen-soft border border-line text-ink placeholder:text-line focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all text-sm resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectInput(false);
                  setRejectComment("");
                }}
                className="flex-1 h-12 rounded-btn border border-line bg-white text-ink font-bold text-sm hover:bg-screen-soft transition-colors cursor-pointer"
              >
                キャンセル
              </button>
              <button
                onClick={() => setShowRejectDialog(true)}
                disabled={!rejectComment.trim()}
                className="flex-1 h-12 rounded-btn bg-accent text-white font-bold text-sm hover:bg-[#a03b1f] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              >
                差戻し送信
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm dialogs */}
      <ConfirmDialog
        isOpen={showApproveDialog}
        title={`「${app.title}」を承認します`}
        message={`金額 ¥${app.amount.toLocaleString()} の申請を承認します。よろしいですか？生体認証で本人確認を行います。`}
        confirmLabel="承認する"
        confirmVariant="primary"
        onConfirm={handleApprove}
        onCancel={() => setShowApproveDialog(false)}
      />

      <ConfirmDialog
        isOpen={showRejectDialog}
        title={`「${app.title}」を差戻します`}
        message="この申請を差戻します。申請者に通知が送信されます。よろしいですか？"
        confirmLabel="差戻す"
        confirmVariant="danger"
        onConfirm={handleReject}
        onCancel={() => setShowRejectDialog(false)}
      />
    </div>
  );
}