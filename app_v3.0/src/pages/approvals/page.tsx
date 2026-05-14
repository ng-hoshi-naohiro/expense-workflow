import { Link, useNavigate } from "react-router-dom";
import { pendingApprovals as rawApprovals } from "@/mocks/applications";
import { useState, useMemo } from "react";
import { ArrowUpDown, ChevronDown, AlertTriangle, Clock, User, ArrowRight } from "lucide-react";

type SortKey = "dateDesc" | "dateAsc" | "amountDesc" | "amountAsc" | "category";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "dateDesc", label: "申請日：新しい順" },
  { key: "dateAsc", label: "申請日：古い順" },
  { key: "amountDesc", label: "金額：高い順" },
  { key: "amountAsc", label: "金額：低い順" },
  { key: "category", label: "カテゴリ別" },
];

const categoryOrder: Record<string, number> = {
  "施設備品購入": 1,
  "出張交通費精算": 2,
  "採用関連費": 3,
};

export default function Approvals() {
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>("dateDesc");
  const [sortOpen, setSortOpen] = useState(false);

  const stuckCount = rawApprovals.filter((a) => a.daysPending >= 3).length;

  const sortedApprovals = useMemo(() => {
    const list = [...rawApprovals];
    switch (sortKey) {
      case "dateDesc":
        return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      case "dateAsc":
        return list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      case "amountDesc":
        return list.sort((a, b) => b.amount - a.amount);
      case "amountAsc":
        return list.sort((a, b) => a.amount - b.amount);
      case "category":
        return list.sort((a, b) => {
          const orderA = categoryOrder[a.categoryName] || 99;
          const orderB = categoryOrder[b.categoryName] || 99;
          if (orderA !== orderB) return orderA - orderB;
          return b.createdAt.localeCompare(a.createdAt);
        });
      default:
        return list;
    }
  }, [sortKey]);

  const currentLabel = sortOptions.find((o) => o.key === sortKey)?.label || "";

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-serif font-medium text-ink mb-2">
        承認待ち一覧
      </h1>
      <p className="text-base text-ink-soft mb-6 font-medium">
        <span className="font-bold text-ink">{rawApprovals.length}件</span>の承認待ち
        {stuckCount > 0 && (
          <span className="text-warning ml-2">（うち滞留中 <span className="font-bold">{stuckCount}件</span>）</span>
        )}
      </p>

      {/* Sort controls */}
      <div className="relative mb-5">
        <button
          onClick={() => setSortOpen(!sortOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-btn bg-white border border-line text-sm text-ink hover:bg-screen-soft hover:shadow-card transition-all cursor-pointer whitespace-nowrap"
        >
          <ArrowUpDown className="w-4 h-4 text-ink-soft" />
          <span className="font-bold">{currentLabel}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
        </button>
        {sortOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-card shadow-modal border border-line overflow-hidden z-30">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedApprovals.map((app) => (
          <div
            key={app.id}
            onClick={() => navigate(`/approvals/${app.id}`)}
            className="bg-white rounded-card p-5 hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer border border-line/50"
          >
            {app.alert && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[rgba(184,92,0,0.10)] text-warning text-xs font-bold rounded-full">
                  <AlertTriangle className="w-3 h-3" />
                  {app.alert}
                </span>
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-serif font-medium text-lg text-ink truncate">{app.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-[rgba(36,189,126,0.08)] flex items-center justify-center">
                    <User className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-sm text-ink-soft">
                    {app.applicant} · {app.categoryName}
                  </p>
                </div>
                <p className="text-sm text-ink-soft/70 mt-1.5">
                  申請日 {app.submittedAt}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl md:text-2xl font-mono font-bold text-ink">
                  ¥{app.amount.toLocaleString()}
                </p>
                {app.daysPending >= 3 && (
                  <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-[rgba(184,92,0,0.10)] text-warning text-xs font-bold rounded-full">
                    <Clock className="w-3 h-3" />
                    滞留 {app.daysPending}日
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}