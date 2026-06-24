import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "@/components/base/ConfirmDialog";
import { Send, Save, Upload, X, FileText, CheckCircle2, TrainFront, ArrowLeft, Plus, Minus } from "lucide-react";

interface TripLeg {
  id: string;
  date: string;
  from: string;
  to: string;
  transport: string;
  cost: string;
}

export default function TravelForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    destination: "",
    purpose: "",
    departureDate: "",
    returnDate: "",
    accommodationCost: "",
    mealCost: "",
    otherCost: "",
    facility: "headquarters",
  });

  const [legs, setLegs] = useState<TripLeg[]>([
    { id: "leg-1", date: "", from: "", to: "", transport: "shinkansen", cost: "" },
  ]);

  const [attachments, setAttachments] = useState<{ id: string; name: string; size: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>();

  const transportOptions = [
    { id: "shinkansen", name: "新幹線" },
    { id: "flight", name: "飛行機" },
    { id: "bus", name: "高速バス" },
    { id: "taxi", name: "タクシー" },
    { id: "rental", name: "レンタカー" },
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

  const handleLegChange = (id: string, field: keyof TripLeg, value: string) => {
    setLegs((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const addLeg = () => {
    setLegs((prev) => [
      ...prev,
      { id: `leg-${Date.now()}`, date: "", from: "", to: "", transport: "shinkansen", cost: "" },
    ]);
  };

  const removeLeg = (id: string) => {
    setLegs((prev) => prev.filter((l) => l.id !== id));
  };

  const calcTotal = () => {
    const transportTotal = legs.reduce((sum, l) => sum + (parseInt(l.cost.replace(/,/g, ""), 10) || 0), 0);
    const acc = parseInt(form.accommodationCost.replace(/,/g, ""), 10) || 0;
    const meal = parseInt(form.mealCost.replace(/,/g, ""), 10) || 0;
    const other = parseInt(form.otherCost.replace(/,/g, ""), 10) || 0;
    return (transportTotal + acc + meal + other).toLocaleString();
  };

  const handleFileChange = () => {
    const mockFiles = [
      { id: `att-${Date.now()}`, name: "領収書.pdf", size: "120KB" },
    ];
    setAttachments((prev) => [...prev, ...mockFiles]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "件名を入力してください";
    if (!form.destination.trim()) newErrors.destination = "出張先を入力してください";
    if (!form.purpose.trim()) newErrors.purpose = "目的を入力してください";
    if (!form.departureDate) newErrors.departureDate = "出発日を選択してください";
    if (legs.some((l) => !l.date || !l.from || !l.to || !l.cost)) {
      newErrors.legs = "すべての区間情報を入力してください";
    }
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
        出張交通費精算申請
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
                placeholder="例：大阪出張 交通費"
                className={`w-full h-12 px-4 rounded-btn bg-screen-soft border text-base text-ink placeholder:text-line focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                  errors.title ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                }`}
              />
              {errors.title && <p className="text-sm text-accent mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-soft mb-1.5">
                  出張先 <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                  placeholder="例：大阪支社"
                  className={`w-full h-12 px-4 rounded-btn bg-screen-soft border text-base text-ink placeholder:text-line focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                    errors.destination ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                  }`}
                />
                {errors.destination && <p className="text-sm text-accent mt-1">{errors.destination}</p>}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-soft mb-1.5">
                  出発日 <span className="text-accent">*</span>
                </label>
                <input
                  type="date"
                  value={form.departureDate}
                  onChange={(e) => handleChange("departureDate", e.target.value)}
                  className={`w-full h-12 px-4 rounded-btn bg-screen-soft border text-base text-ink focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all ${
                    errors.departureDate ? "border-accent focus:border-accent" : "border-line focus:border-primary"
                  }`}
                />
                {errors.departureDate && <p className="text-sm text-accent mt-1">{errors.departureDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-ink-soft mb-1.5">帰着日</label>
                <input
                  type="date"
                  value={form.returnDate}
                  onChange={(e) => handleChange("returnDate", e.target.value)}
                  className="w-full h-12 px-4 rounded-btn bg-screen-soft border border-line text-ink focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">
                出張目的 <span className="text-accent">*</span>
              </label>
              <textarea
                value={form.purpose}
                onChange={(e) => handleChange("purpose", e.target.value)}
                placeholder="出張の目的や訪問先、会議内容などを入力してください"
                rows={3}
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

        {/* Transport legs */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <h2 className="text-lg font-medium text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-[rgba(36,189,126,0.08)] flex items-center justify-center">
              <TrainFront className="w-4 h-4 text-primary" />
            </div>
            交通費明細
          </h2>

          <div className="space-y-4">
            {legs.map((leg, index) => (
              <div key={leg.id} className="p-4 rounded-card bg-screen-soft border border-line/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-ink">区間 {index + 1}</span>
                  {legs.length > 1 && (
                    <button
                      onClick={() => removeLeg(leg.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-btn hover:bg-[rgba(200,71,43,0.06)] text-accent cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-ink-soft mb-1">利用日</label>
                    <input
                      type="date"
                      value={leg.date}
                      onChange={(e) => handleLegChange(leg.id, "date", e.target.value)}
                      className="w-full h-10 px-3 rounded-btn bg-white border border-line text-sm text-ink focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-soft mb-1">出発地</label>
                    <input
                      type="text"
                      value={leg.from}
                      onChange={(e) => handleLegChange(leg.id, "from", e.target.value)}
                      placeholder="東京"
                      className="w-full h-10 px-3 rounded-btn bg-white border border-line text-sm text-ink placeholder:text-line focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-soft mb-1">目的地</label>
                    <input
                      type="text"
                      value={leg.to}
                      onChange={(e) => handleLegChange(leg.id, "to", e.target.value)}
                      placeholder="大阪"
                      className="w-full h-10 px-3 rounded-btn bg-white border border-line text-sm text-ink placeholder:text-line focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-soft mb-1">交通手段</label>
                    <select
                      value={leg.transport}
                      onChange={(e) => handleLegChange(leg.id, "transport", e.target.value)}
                      className="w-full h-10 px-3 rounded-btn bg-white border border-line text-sm text-ink focus:border-primary outline-none"
                    >
                      {transportOptions.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink-soft mb-1">金額</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-ink-soft font-bold">¥</span>
                      <input
                        type="number"
                        value={leg.cost}
                        onChange={(e) => handleLegChange(leg.id, "cost", e.target.value)}
                        placeholder="0"
                        className="w-full h-10 pl-6 pr-3 rounded-btn bg-white border border-line text-sm text-ink font-mono focus:border-primary outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {errors.legs && <p className="text-sm text-accent">{errors.legs}</p>}
            <button
              onClick={addLeg}
              className="flex items-center justify-center gap-2 w-full h-10 rounded-btn border border-dashed border-line bg-screen-soft text-ink-soft hover:bg-white hover:text-ink hover:border-ink-soft transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-bold">区間を追加</span>
            </button>
          </div>
        </div>

        {/* Other costs */}
        <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
          <h2 className="text-lg font-medium text-ink mb-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-btn bg-[rgba(184,92,0,0.08)] flex items-center justify-center">
              <span className="text-warning font-bold text-sm">他</span>
            </div>
            その他経費
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">宿泊費</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft font-bold">¥</span>
                <input
                  type="number"
                  value={form.accommodationCost}
                  onChange={(e) => handleChange("accommodationCost", e.target.value)}
                  placeholder="0"
                  className="w-full h-12 pl-8 pr-4 rounded-btn bg-screen-soft border border-line text-base text-ink font-mono focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">食費・日当</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft font-bold">¥</span>
                <input
                  type="number"
                  value={form.mealCost}
                  onChange={(e) => handleChange("mealCost", e.target.value)}
                  placeholder="0"
                  className="w-full h-12 pl-8 pr-4 rounded-btn bg-screen-soft border border-line text-base text-ink font-mono focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-ink-soft mb-1.5">その他</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft font-bold">¥</span>
                <input
                  type="number"
                  value={form.otherCost}
                  onChange={(e) => handleChange("otherCost", e.target.value)}
                  placeholder="0"
                  className="w-full h-12 pl-8 pr-4 rounded-btn bg-screen-soft border border-line text-base text-ink font-mono focus:border-primary focus:ring-2 focus:ring-[rgba(36,189,126,0.15)] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-card bg-screen-soft border border-line/30 flex items-center justify-between">
            <span className="text-base font-bold text-ink">合計金額</span>
            <span className="text-2xl font-mono font-bold text-ink">
              ¥{calcTotal()}
            </span>
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
            <span className="text-sm font-bold">領収書・チケットをアップロード</span>
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
        message={`「${form.title || "出張交通費"}」の精算申請を送信します。合計金額 ¥${calcTotal()} です。よろしいですか？`}
        confirmLabel="送信する"
        confirmVariant="primary"
        onConfirm={confirmSubmit}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}