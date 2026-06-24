import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { applications } from "@/mocks/applications";
import StatusBadge from "@/components/base/StatusBadge";
import { ArrowUpDown, ChevronDown, ArrowRight, Package, TrainFront, Users } from "lucide-react";

type SortKey = "dateDesc" | "dateAsc" | "amountDesc" | "amountAsc";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "dateDesc", label: "申請日：新しい順" },
  { key: "dateAsc", label: "申請日：古い順" },
  { key: "amountDesc", label: "金額：高い順" },
  { key: "amountAsc", label: "金額：低い順" },
];

export default function History() {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>("dateDesc");
  const [sortOpen, setSortOpen] = useState(false);

  const sorted = [...applications].sort((a, b) => {
    switch (sortKey) {
      case "dateDesc": return b.createdAt.localeCompare(a.createdAt);
      case "dateAsc": return a.createdAt.localeCompare(b.createdAt);
      case "amountDesc": return b.amount - a.amount;
      case "amountAsc": return a.amount - b.amount;
      default: return 0;
    }
  });

  const currentLabel = sortOptions.find((o) => o.key === sortKey)?.label || "";

  const categoryIcon = (cat: string) => {
    if (cat === "equipment") return <Package className="w-4 h-4 text-primary" />;
    if (cat === "travel") return <TrainFront className="w-4 h-4 text-warning" />;
    return <Users className="w-4 h-4 text-accent" />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-serif font-medium text-ink">申請履歴</h1>

        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-btn bg-white border border-line text-sm text-ink hover:bg-screen-soft hover:shadow-card transition-all cursor-pointer whitespace-nowrap"
          >
            <ArrowUpDown className="w-4 h-4 text-ink-soft" />
            <span className="font-bold">{currentLabel}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>
          {sortOpen && (
            <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-card shadow-modal border border-line overflow-hidden z-30">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSortKey(opt.key);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${
                    sortKey === opt.key
                      ? "text-primary bg-[rgba(36,189,126,0.08)] font-bold"
                      : "text-ink-soft hover:bg-screen-soft"
                  }`}
                >
                  {sortKey === opt.key && <span className="mr-2 text-primary">&#10003;</span>}
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-card shadow-card overflow-hidden border border-line/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-screen-soft">
                <th className="text-left text-sm font-bold text-ink-soft px-4 py-3 whitespace-nowrap">ステータス</th>
                <th className="text-left text-sm font-bold text-ink-soft px-4 py-3 whitespace-nowrap">申請日</th>
                <th className="text-left text-sm font-bold text-ink-soft px-4 py-3 whitespace-nowrap">カテゴリ</th>
                <th className="text-left text-sm font-bold text-ink-soft px-4 py-3 whitespace-nowrap">業者名</th>
                <th className="text-right text-sm font-bold text-ink-soft px-4 py-3 whitespace-nowrap">金額</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((app) => (
                <tr key={app.id} className="border-b border-line/30 hover:bg-screen-soft transition-colors">
                  <td className="px-4 py-3.5">
                    <StatusBadge status={app.status as "draft" | "pending" | "approved" | "rejected"} label={app.statusLabel} />
                  </td>
                  <td className="px-4 py-3.5 text-base text-ink">{app.createdAt}</td>
                  <td className="px-4 py-3.5 text-base text-ink">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                        app.category === "equipment" ? "bg-[rgba(36,189,126,0.10)]" :
                        app.category === "travel" ? "bg-[rgba(184,92,0,0.10)]" :
                        "bg-[rgba(200,71,43,0.08)]"
                      }`}>
                        {categoryIcon(app.category)}
                      </div>
                      {app.categoryName}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-base text-ink">{app.vendor}</td>
                  <td className="px-4 py-3.5 text-base text-ink font-mono text-right font-bold">
                    ¥{app.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => navigate(`/request/${app.id}`)}
                      className="text-sm text-primary hover:text-primary-dark whitespace-nowrap cursor-pointer font-bold flex items-center gap-1"
                    >
                      詳細
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}