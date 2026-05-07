import { useParams } from "react-router-dom";

export default function ApplyForm() {
  const { category } = useParams<{ category: string }>();
  const categoryNames: Record<string, string> = {
    equipment: "施設備品購入",
    travel: "出張交通費精算",
    recruitment: "採用関連費",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <h1 className="font-serif text-xl md:text-2xl font-medium text-ink mb-6">
        {categoryNames[category || ""] || "申請フォーム"}
      </h1>
      <div className="bg-screen rounded-card shadow-card p-6">
        <p className="text-sm text-ink-soft">申請フォームをここに配置します（Phase 2で実装）</p>
      </div>
    </div>
  );
}