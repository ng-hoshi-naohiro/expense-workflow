import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { currentUser } from "@/mocks/users";
import { monthlyStats, monthlyTrends, budgetOverview, approvalStats, topSpenders } from "@/mocks/dashboard";
import {
  ArrowLeft, TrendingUp, CheckCircle, XCircle, Clock, Wallet,
  BarChart3, Users, Zap, Calendar, ArrowRight, ChevronDown, ChevronUp,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>("budget");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const maxAmount = Math.max(...monthlyTrends.map((t) => t.amount));
  const totalCount = Math.max(
    ...monthlyTrends.map((t) => t.approved + t.rejected + t.pending)
  );

  const StatCard = ({
    icon: Icon,
    label,
    value,
    sub,
    color,
  }: {
    icon: React.ElementType;
    label: string;
    value: string;
    sub?: string;
    color: string;
  }) => (
    <div className="bg-white rounded-card shadow-card p-5 border border-line/50">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span className="text-sm text-ink-soft font-bold">{label}</span>
      </div>
      <p className="text-2xl md:text-3xl font-mono font-bold text-ink">{value}</p>
      {sub && <p className="text-xs text-ink-soft mt-1.5">{sub}</p>}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white border border-line flex items-center justify-center hover:bg-screen-soft transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-ink-soft" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-ink leading-tight">
            ダッシュボード
          </h1>
          <p className="text-sm text-ink-soft mt-0.5">
            業務データの可視化と分析
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard
          icon={BarChart3}
          label="総申請数"
          value={String(monthlyStats.totalRequests)}
          sub="今月"
          color="#24BD7E"
        />
        <StatCard
          icon={CheckCircle}
          label="承認済み"
          value={String(monthlyStats.approvedCount)}
          sub={`承認率 ${((monthlyStats.approvedCount / monthlyStats.totalRequests) * 100).toFixed(0)}%`}
          color="#1a4480"
        />
        <StatCard
          icon={Clock}
          label="承認待ち"
          value={String(monthlyStats.pendingCount)}
          sub="対応が必要"
          color="#b85c00"
        />
        <StatCard
          icon={Wallet}
          label="総金額"
          value={`¥${(monthlyStats.totalAmount / 10000).toFixed(0)}万`}
          sub={`平均 ¥${monthlyStats.averageAmount.toLocaleString()}`}
          color="#c8472b"
        />
      </div>

      {/* Monthly trend chart */}
      <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-serif font-medium text-ink">
            月次申請推移
          </h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-primary" />
              承認済
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent" />
              差戻し
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-warning" />
              承認待ち
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 md:gap-3 h-40 md:h-48 px-2">
          {monthlyTrends.map((t) => {
            const total = t.approved + t.rejected + t.pending;
            const approvedH = total > 0 ? (t.approved / totalCount) * 100 : 0;
            const rejectedH = total > 0 ? (t.rejected / totalCount) * 100 : 0;
            const pendingH = total > 0 ? (t.pending / totalCount) * 100 : 0;
            return (
              <div key={t.month} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full max-w-[56px] rounded-t-md overflow-hidden relative" style={{ height: "100%" }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-primary/20 rounded-t-md" style={{ height: `${(t.amount / maxAmount) * 100}%`, minHeight: "4px" }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-primary" style={{ height: `${approvedH}%` }} />
                    <div
                      className="absolute left-0 right-0 bg-accent"
                      style={{ bottom: `${approvedH}%`, height: `${rejectedH}%` }}
                    />
                    <div
                      className="absolute left-0 right-0 bg-warning"
                      style={{ bottom: `${approvedH + rejectedH}%`, height: `${pendingH}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-ink-soft font-bold">{t.month}</span>
                <span className="text-xs font-mono text-ink-soft">
                  ¥{(t.amount / 10000).toFixed(0)}万
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget section */}
        <div className="bg-white rounded-card shadow-card border border-line/50 overflow-hidden">
          <button
            onClick={() => toggleSection("budget")}
            className="flex items-center justify-between w-full p-5 md:p-6 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[rgba(36,189,126,0.10)] flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-base font-serif font-medium text-ink">
                予算使用状況
              </h2>
            </div>
            {expandedSection === "budget" ? (
              <ChevronUp className="w-5 h-5 text-ink-soft" />
            ) : (
              <ChevronDown className="w-5 h-5 text-ink-soft" />
            )}
          </button>
          {expandedSection === "budget" && (
            <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-bold text-ink">{budgetOverview.department}</p>
                    <p className="text-xs text-ink-soft">{budgetOverview.fiscalYear}</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-ink">
                    ¥{budgetOverview.usedAmount.toLocaleString()} / ¥{budgetOverview.totalBudget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-line/40 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(budgetOverview.usedAmount / budgetOverview.totalBudget) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-ink-soft">
                    残り ¥{budgetOverview.remainingAmount.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono font-bold text-primary">
                    {((budgetOverview.usedAmount / budgetOverview.totalBudget) * 100).toFixed(1)}% 使用
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {budgetOverview.categories.map((cat) => {
                  const pct = (cat.used / cat.budget) * 100;
                  return (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-ink font-medium">{cat.name}</span>
                        <span className="text-xs font-mono text-ink-soft">
                          ¥{cat.used.toLocaleString()} / ¥{cat.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-line/30 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: cat.color }}
                        />
                      </div>
                      <p className="text-xs text-ink-soft mt-1">{pct.toFixed(1)}% 使用</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Approval stats */}
        <div className="bg-white rounded-card shadow-card border border-line/50 overflow-hidden">
          <button
            onClick={() => toggleSection("approval")}
            className="flex items-center justify-between w-full p-5 md:p-6 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[rgba(26,68,128,0.10)] flex items-center justify-center">
                <Zap className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-base font-serif font-medium text-ink">
                承認速度分析
              </h2>
            </div>
            {expandedSection === "approval" ? (
              <ChevronUp className="w-5 h-5 text-ink-soft" />
            ) : (
              <ChevronDown className="w-5 h-5 text-ink-soft" />
            )}
          </button>
          {expandedSection === "approval" && (
            <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-screen-soft rounded-card p-4">
                  <p className="text-xs text-ink-soft font-bold mb-1">平均承認日数</p>
                  <p className="text-2xl font-mono font-bold text-ink">{approvalStats.averageDays}日</p>
                </div>
                <div className="bg-screen-soft rounded-card p-4">
                  <p className="text-xs text-ink-soft font-bold mb-1">最速承認</p>
                  <p className="text-sm font-bold text-ink truncate">{approvalStats.fastestApproval.name}</p>
                  <p className="text-xs font-mono text-primary font-bold">{approvalStats.fastestApproval.days}日</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-ink mb-3">承認者別統計</h3>
                <div className="space-y-3">
                  {approvalStats.byApprover.map((a) => (
                    <div key={a.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-line/50 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4 text-ink-soft" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-ink">{a.name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-ink-soft">
                            承認 {a.approved}件
                          </span>
                          <span className="text-xs text-accent">
                            差戻し {a.rejected}件
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-ink-soft">平均</p>
                        <p className="text-sm font-mono font-bold text-ink">{a.avgDays}日</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top spenders */}
      <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50 mt-6">
        <h2 className="text-base font-serif font-medium text-ink mb-4">
          申請金額ランキング
        </h2>
        <div className="space-y-3">
          {topSpenders.map((user, idx) => {
            const maxSpend = topSpenders[0].amount;
            return (
              <div key={user.name} className="flex items-center gap-4">
                <span className="w-6 text-center text-sm font-mono font-bold text-ink-soft shrink-0">
                  {idx + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-line/40 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-ink-soft" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-ink">{user.name}</p>
                  <div className="w-full h-1.5 bg-line/30 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${maxSpend > 0 ? (user.amount / maxSpend) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-mono font-bold text-ink">
                    ¥{user.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-ink-soft">{user.count}件</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}