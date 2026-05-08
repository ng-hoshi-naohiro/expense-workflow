import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/base/ConfirmDialog";
import { Send, Save, Upload, X, FileText, CheckCircle2, Users, ArrowLeft } from "lucide-react";

export default function RecruitmentForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    expenseType: "agency",
    agency: "",
    position: "",
    candidates: "1",
    amount: "",
    contractPeriod: "",
    facility: "headquarters",
    description: "",
  });

  const [attachments, setAttachments] = useState<{ id: string; name: string; size: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>();

  const expenseTypes = [
    { id: "agency", name: "紹介手数料" },
    { id: "advertising", name: "求人広告費" },
    { id: "event", name: "採用イベント費" },
    { id: "exam", name: "試験・検査費" },
    { id: "other", name: "その他" },
  ];

  const facilities = [
    { id: "headquarters", name: "東京都 本社" },
    { id: "osaka", name: "大阪支社" },
    { id: "nagoya", name: "名古屋支社" },
    { id: "fukuoka", name: "福岡支社" },
  ];

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileChange = () => {
    const mockFiles = [
      { id: `att-${Date.now()}`, name: "請求書.pdf", size: "180KB" },
    ];
    setAttachments((prev) => [...prev, ...mockFiles]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "件名を入力してください";
    if (!form.agency.trim()) newErrors.agency = "業者名を入力してください";
    if (!form.position.trim()) newErrors.position = "募集職種を入力してください";
    if (!form.amount.trim()) newErrors.amount = "金額を入力してください";
    if (!form.description.trim()) newErrors.description = "内容を入力してください";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setShowConfirm(true);
  };

  const confirmSubmit = () => {
    setShowConfirm(false);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => navigate("/"), 2500);
    }, 1500);
  };

  const handleSaveDraft = () => {
    navigate("/");
  };

  const formattedAmount = () => {
    const val = parseInt(form.amount.replace(/,/g, ""), 10);
    return val ? val.toLocaleString() : "0";
  };

  if (showSuccess) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-medium text-ink mb-2">申請を送信しました</h2>
          <p className="text-base text-ink-soft">承認フローに進みます。ホームに戻ります...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors cursor-pointer mb-4 font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        戻る
      </button>
      <h1 className="text-2xl md:text-3xl font-serif font-medium text-ink mb-6">
        採用関連費申請
      </h1>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <h2 className="text-lg font-medium text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-[rgba(36,189,126,0.08)] flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            基本情報
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">
                件名 <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="例：看護師採用 紹介手数料"
                className={`w-full h-12 px-4 rounded-btn bg-screen-soft border text-base text-ink placeholder:text-line focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                  errors.title ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                }`}
              />
              {errors.title && <p className="text-sm text-accent mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">費用種別</label>
              <div className="flex flex-wrap gap-2">
                {expenseTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleChange("expenseType", type.id)}
                    className={`px-4 py-2.5 rounded-btn text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      form.expenseType === type.id
                        ? "bg-primary text-white"
                        : "bg-screen-soft border border-line text-ink-soft hover:text-ink hover:border-ink-soft"
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-soft mb-1.5">
                  業者名 / 媒体名 <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={form.agency}
                  onChange={(e) => handleChange("agency", e.target.value)}
                  placeholder="例：株式会社人材紹介"
                  className={`w-full h-12 px-4 rounded-btn bg-screen-soft border text-base text-ink placeholder:text-line focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                    errors.agency ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                  }`}
                />
                {errors.agency && <p className="text-sm text-accent mt-1">{errors.agency}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-ink-soft mb-1.5">所属施設</label>
                <select
                  value={form.facility}
                  onChange={(e) => handleChange("facility", e.target.value)}
                  className="w-full h-12 px-4 rounded-btn bg-screen-soft border border-line text-base text-ink focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all"
                >
                  {facilities.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Position info */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <h2 className="text-lg font-medium text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-[rgba(36,189,126,0.08)] flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            採用情報
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-soft mb-1.5">
                  募集職種 <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={form.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                  placeholder="例：看護師、介護士、事務職"
                  className={`w-full h-12 px-4 rounded-btn bg-screen-soft border text-base text-ink placeholder:text-line focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                    errors.position ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                  }`}
                />
                {errors.position && <p className="text-sm text-accent mt-1">{errors.position}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-ink-soft mb-1.5">採用予定人数</label>
                <div className="relative">
                  <input
                    type="number"
                    value={form.candidates}
                    onChange={(e) => handleChange("candidates", e.target.value)}
                    min="1"
                    className="w-full h-12 px-4 rounded-btn bg-screen-soft border border-line text-base text-ink focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft font-bold">名</span>
                </div>
              </div>
            </div>

            {form.expenseType === "agency" && (
              <div>
                <label className="block text-sm font-bold text-ink-soft mb-1.5">契約期間（任意）</label>
                <input
                  type="text"
                  value={form.contractPeriod}
                  onChange={(e) => handleChange("contractPeriod", e.target.value)}
                  placeholder="例：紹介から入社後3ヶ月経過時点"
                  className="w-full h-12 px-4 rounded-btn bg-screen-soft border border-line text-base text-ink placeholder:text-line focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all"
                />
              </div>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <h2 className="text-lg font-medium text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-[rgba(184,92,0,0.08)] flex items-center justify-center">
              <span className="text-warning font-bold text-sm">¥</span>
            </div>
            金額情報
          </h2>

          <div>
            <label className="block text-sm font-bold text-ink-soft mb-1.5">
              金額（税込） <span className="text-accent">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft font-bold text-lg">¥</span>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="0"
                className={`w-full h-14 pl-10 pr-4 rounded-btn bg-screen-soft border text-xl text-ink font-mono focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                  errors.amount ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                }`}
              />
            </div>
            {errors.amount && <p className="text-sm text-accent mt-1">{errors.amount}</p>}
            {form.amount && (
              <p className="text-sm text-ink-soft mt-2 font-bold">
                一人あたり：¥{(() => {
                  const total = parseInt(form.amount.replace(/,/g, ""), 10) || 0;
                  const count = parseInt(form.candidates, 10) || 1;
                  return Math.round(total / count).toLocaleString();
                })()}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <h2 className="text-lg font-medium text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-[rgba(200,71,43,0.06)] flex items-center justify-center">
              <span className="text-accent font-bold text-sm">詳</span>
            </div>
            内容詳細
          </h2>

          <div>
            <label className="block text-sm font-bold text-ink-soft mb-1.5">
              内容・備考 <span className="text-accent">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="採用の背景や契約内容の詳細を入力してください"
              rows={4}
              maxLength={500}
              className={`w-full px-4 py-3 rounded-btn bg-screen-soft border text-base text-ink resize-none focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                errors.description ? "border-accent focus:border-accent" : "border-line focus:border-primary"
              }`}
            />
            <div className="flex items-center justify-between mt-1">
              {errors.description && <p className="text-sm text-accent">{errors.description}</p>}
              <p className="text-xs text-ink-soft ml-auto font-bold">{form.description.length}/500文字</p>
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <h2 className="text-lg font-medium text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-[rgba(200,71,43,0.06)] flex items-center justify-center">
              <Upload className="w-4 h-4 text-accent" />
            </div>
            添付ファイル
          </h2>

          {attachments.length > 0 && (
            <div className="space-y-2 mb-4">
              {attachments.map((att) => (
                <div key={att.id} className="flex items-center gap-3 p-3 rounded-btn bg-screen-soft border border-line/30">
                  <div className="w-10 h-10 rounded-btn bg-[rgba(200,71,43,0.06)] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-ink truncate">{att.name}</p>
                    <p className="text-xs text-ink-soft">{att.size}</p>
                  </div>
                  <button
                    onClick={() => removeAttachment(att.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-btn hover:bg-[rgba(200,71,43,0.06)] text-accent cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleFileChange}
            className="flex items-center justify-center gap-2 w-full h-12 rounded-btn border border-dashed border-line bg-screen-soft text-ink-soft hover:text-ink hover:border-ink-soft transition-colors cursor-pointer"
          >
            <Upload className="w-5 h-5" />
            <span className="text-sm font-bold">請求書・契約書をアップロード</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleSaveDraft}
            className="h-12 px-8 rounded-btn border border-line bg-white text-ink font-bold text-base hover:bg-screen-soft transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4 inline mr-2" />
            下書き保存
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 h-12 rounded-btn bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary-dark active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 shadow-card"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "送信中..." : "申請を送信する"}
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="申請を送信しますか？"
        message={`「${form.title || "採用関連費"}」の申請を送信します。金額 ¥${formattedAmount()} です。よろしいですか？`}
        confirmLabel="送信する"
        confirmVariant="primary"
        onConfirm={confirmSubmit}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}