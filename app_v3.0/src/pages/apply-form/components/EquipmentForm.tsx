import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/base/ConfirmDialog";
import { Send, Save, Upload, X, FileText, CheckCircle2, ArrowLeft } from "lucide-react";

export default function EquipmentForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    itemCategory: "furniture",
    vendor: "",
    unitPrice: "",
    quantity: "1",
    facility: "headquarters",
    purpose: "",
    neededBy: "",
    urgent: false,
  });

  const [attachments, setAttachments] = useState<{ id: string; name: string; size: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const itemCategories = [
    { id: "furniture", name: "家具・備品" },
    { id: "medical", name: "医療器具" },
    { id: "office", name: "事務用品" },
    { id: "it", name: "IT機器" },
    { id: "consumable", name: "消耗品" },
    { id: "other", name: "その他" },
  ];

  const facilities = [
    { id: "headquarters", name: "東京都 本社" },
    { id: "osaka", name: "大阪支社" },
    { id: "nagoya", name: "名古屋支社" },
    { id: "fukuoka", name: "福岡支社" },
  ];

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const calcAmount = () => {
    const price = parseInt(form.unitPrice.replace(/,/g, ""), 10) || 0;
    const qty = parseInt(form.quantity, 10) || 0;
    return (price * qty).toLocaleString();
  };

  const handleFileChange = () => {
    const mockFiles = [
      { id: `att-${Date.now()}`, name: "見積書.pdf", size: "245KB" },
    ];
    setAttachments((prev) => [...prev, ...mockFiles]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "品名を入力してください";
    if (!form.vendor.trim()) newErrors.vendor = "業者名を入力してください";
    if (!form.unitPrice.trim()) newErrors.unitPrice = "単価を入力してください";
    if (!form.purpose.trim()) newErrors.purpose = "用途を入力してください";
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
        施設備品購入申請
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
                品名・タイトル <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="例：オフィスチェア、聴診器"
                className={`w-full h-12 px-4 rounded-btn bg-screen-soft border text-base text-ink placeholder:text-line focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                  errors.title ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                }`}
              />
              {errors.title && <p className="text-sm text-accent mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">品目カテゴリ</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {itemCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleChange("itemCategory", cat.id)}
                    className={`px-3 py-2.5 rounded-btn text-sm font-bold text-center transition-colors cursor-pointer whitespace-nowrap ${
                      form.itemCategory === cat.id
                        ? "bg-primary text-white"
                        : "bg-screen-soft border border-line text-ink-soft hover:text-ink hover:border-ink-soft"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">
                業者名 <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={form.vendor}
                onChange={(e) => handleChange("vendor", e.target.value)}
                placeholder="例：〇〇商事株式会社"
                className={`w-full h-12 px-4 rounded-btn bg-screen-soft border text-base text-ink placeholder:text-line focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                  errors.vendor ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                }`}
              />
              {errors.vendor && <p className="text-sm text-accent mt-1">{errors.vendor}</p>}
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <h2 className="text-lg font-medium text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-[rgba(36,189,126,0.08)] flex items-center justify-center">
              <span className="text-primary font-bold text-sm">¥</span>
            </div>
            金額情報
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">
                単価（税込） <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft font-bold">¥</span>
                <input
                  type="number"
                  value={form.unitPrice}
                  onChange={(e) => handleChange("unitPrice", e.target.value)}
                  placeholder="0"
                  className={`w-full h-12 pl-8 pr-4 rounded-btn bg-screen-soft border text-base text-ink font-mono focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                    errors.unitPrice ? "border-accent" : "border-line focus:border-primary"
                  }`}
                />
              </div>
              {errors.unitPrice && <p className="text-sm text-accent mt-1">{errors.unitPrice}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">数量</label>
              <div className="relative">
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                  min="1"
                  className="w-full h-12 px-4 rounded-btn bg-screen-soft border border-line text-base text-ink font-mono focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft font-bold">個</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">合計金額</label>
              <div className="h-12 px-4 rounded-btn bg-screen-soft border border-line flex items-center">
                <span className="text-base font-mono font-bold text-ink">
                  ¥{calcAmount()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <h2 className="text-lg font-medium text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-[rgba(184,92,0,0.08)] flex items-center justify-center">
              <span className="text-warning font-bold text-sm">!</span>
            </div>
            詳細情報
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">納入先施設</label>
              <div className="flex flex-wrap gap-2">
                {facilities.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleChange("facility", f.id)}
                    className={`px-4 py-2.5 rounded-btn text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      form.facility === f.id
                        ? "bg-primary text-white"
                        : "bg-screen-soft border border-line text-ink-soft hover:text-ink hover:border-ink-soft"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-soft mb-1.5">希望納期</label>
                <input
                  type="date"
                  value={form.neededBy}
                  onChange={(e) => handleChange("neededBy", e.target.value)}
                  className="w-full h-12 px-4 rounded-btn bg-screen-soft border border-line text-base text-ink focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.urgent}
                    onChange={(e) => handleChange("urgent", e.target.checked)}
                    className="w-5 h-5 rounded border-line bg-screen-soft text-primary focus:ring-[rgba(36,189,126,0.15)]"
                  />
                  <span className="text-sm font-bold text-accent">緊急申請（即日対応希望）</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">
                用途・備考 <span className="text-accent">*</span>
              </label>
              <textarea
                value={form.purpose}
                onChange={(e) => handleChange("purpose", e.target.value)}
                placeholder="購入の目的や詳細な用途を入力してください"
                rows={4}
                maxLength={500}
                className={`w-full px-4 py-3 rounded-btn bg-screen-soft border text-base text-ink resize-none focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                  errors.purpose ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                }`}
              />
              <div className="flex items-center justify-between mt-1">
                {errors.purpose && <p className="text-sm text-accent">{errors.purpose}</p>}
                <p className="text-xs text-ink-soft ml-auto font-bold">{form.purpose.length}/500文字</p>
              </div>
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
                <div
                  key={att.id}
                  className="flex items-center gap-3 p-3 rounded-btn bg-screen-soft border border-line/30"
                >
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
            <span className="text-sm font-bold">ファイルをアップロード（見積書など）</span>
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
        message={`「${form.title || "施設備品購入"}」の申請を送信します。合計金額 ¥${calcAmount()} です。よろしいですか？`}
        confirmLabel="送信する"
        confirmVariant="primary"
        onConfirm={confirmSubmit}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}