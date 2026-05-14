import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { currentUser } from "@/mocks/users";
import { applications, pendingApprovals, activityTimeline } from "@/mocks/applications";
import { monthlyStats, monthlyTrends, budgetOverview, approvalStats } from "@/mocks/dashboard";
import StatusBadge from "@/components/base/StatusBadge";
import { FilePlus, FileText, CheckCircle, XCircle, Clock, ArrowRight, Copy, AlertTriangle, BarChart3, TrendingUp, Wallet, Users, Zap } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "おはようございます";
    if (hour < 18) return "こんにちは";
    return "こんばんは";
  }, []);

  const myActiveApps = applications.filter(
    (a) => a.status === "pending" || a.status === "draft"
  );

  const latestApp = applications[0];

  // Calculate bar chart heights
  const maxAmount = Math.max(...monthlyTrends.map((t) => t.amount));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <div className="relative">
        {/* Greeting */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-ink leading-tight">
            {currentUser.name}さん、{greeting}
          </h1>
          <p className="text-sm text-ink-soft mt-1.5 font-medium">
            {new Date().toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>
        </div>

        {/* Dashboard quick link */}
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-btn bg-white border border-line text-ink-soft hover:text-primary hover:border-primary/30 transition-all shadow-card text-sm font-bold cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" />
            ダッシュボードを見る
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
              <h2 className="text-base font-serif font-medium text-ink mb-4">
                クイックアクション
              </h2>
              <div className="space-y-3">
                <Link
                  to="/apply"
                  className="flex items-center justify-center gap-3 w-full h-12 rounded-btn bg-primary text-white font-bold text-base hover:bg-primary-dark active:scale-[0.98] transition-all cursor-pointer shadow-card"
                >
                  <FilePlus className="w-5 h-5" />
                  新しく申請する
                </Link>
                {latestApp && (
                  <button
                    onClick={() => navigate(`/apply/${latestApp.category}`)}
                    className="flex items-center justify-center gap-3 w-full h-12 rounded-btn border border-line bg-white text-ink-soft font-bold text-sm hover:bg-screen-soft hover:text-ink transition-all cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    前回と同じ内容で申請（{latestApp.title}）
                  </button>
                )}
              </div>
            </div>

            {/* Monthly summary mini chart */}
            <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-serif font-medium text-ink">
                  月次推移
                </h2>
                <Link
                  to="/dashboard"
                  className="text-sm text-primary hover:text-primary-dark cursor-pointer font-bold"
                >
                  詳細
                </Link>
              </div>
              <div className="flex items-end justify-between gap-2 h-32 px-2">
                {monthlyTrends.map((t) => (
                  <div key={t.month} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full max-w-[40px] rounded-t-md bg-primary/20 hover:bg-primary/30 transition-colors relative"
                      style={{ height: `${(t.amount / maxAmount) * 100}%`, minHeight: "8px" }}
                    >
                      <div
                        className="absolute bottom-0 left-0 right-0 rounded-t-md bg-primary"
                        style={{ height: `${(t.approved / Math.max(t.approved + t.rejected + t.pending, 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-ink-soft font-bold">{t.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending approvals card */}
            {currentUser.pendingApprovals > 0 && (
              <div
                onClick={() => navigate("/approvals")}
                className="bg-[rgba(184,92,0,0.06)] rounded-card p-5 cursor-pointer hover:border-warning/20 transition-all border border-warning/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[rgba(184,92,0,0.12)] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-serif font-medium text-ink">
                      {currentUser.pendingApprovals}件の承認待ちがあります
                    </p>
                    <p className="text-sm text-ink-soft mt-0.5">
                      タップして承認一覧を表示
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-ink-soft shrink-0" />
                </div>
              </div>
            )}

            {/* My active applications */}
            <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
              <h2 className="text-base font-serif font-medium text-ink mb-4">
                進行中の申請
              </h2>
              {myActiveApps.length === 0 ? (
                <div className="flex items-center gap-3 py-4 text-ink-soft">
                  <div className="w-10 h-10 rounded-full bg-screen-soft flex items-center justify-center">
                    <FileText className="w-5 h-5 text-ink-soft" />
                  </div>
                  <p className="text-sm">進行中の申請はありません</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myActiveApps.slice(0, 3).map((app) => (
                    <div
                      key={app.id}
                      onClick={() => navigate(`/request/${app.id}`)}
                      className="flex items-center gap-3 p-3 rounded-card bg-screen-soft hover:bg-line/20 transition-colors cursor-pointer"
                    >
                      <StatusBadge status={app.status as "draft" | "pending"} />
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-bold text-ink truncate">
                          {app.title}
                        </p>
                        <p className="text-sm text-ink-soft mt-0.5">
                          {app.categoryName} · {app.createdAt}
                        </p>
                      </div>
                      <span className="font-mono text-base text-ink font-bold shrink-0">
                        ¥{app.amount.toLocaleString()}
                      </span>
                      <ArrowRight className="w-5 h-5 text-ink-soft shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-card shadow-card p-4 border border-line/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[rgba(36,189,126,0.10)] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-ink-soft font-bold">総申請数</span>
                </div>
                <p className="text-2xl font-mono font-bold text-ink">{monthlyStats.totalRequests}</p>
                <p className="text-xs text-ink-soft mt-1">今月</p>
              </div>
              <div className="bg-white rounded-card shadow-card p-4 border border-line/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[rgba(26,68,128,0.10)] flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-xs text-ink-soft font-bold">総金額</span>
                </div>
                <p className="text-2xl font-mono font-bold text-ink">¥{(monthlyStats.totalAmount / 10000).toFixed(0)}万</p>
                <p className="text-xs text-ink-soft mt-1">今月</p>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
              <h2 className="text-base font-serif font-medium text-ink mb-4">
                最近の活動
              </h2>
              <div className="space-y-0">
                {activityTimeline.map((item, index) => (
                  <div key={item.id} className="flex gap-4 relative">
                    {index < activityTimeline.length - 1 && (
                      <div className="absolute left-5 top-10 w-px h-full bg-line/50"></div>
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      item.type === "approve" ? "bg-[rgba(26,68,128,0.10)]" :
                      item.type === "reject" ? "bg-[rgba(200,71,43,0.08)]" :
                      "bg-[rgba(36,189,126,0.08)]"
                    }`}>
                      {item.type === "approve" ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : item.type === "reject" ? (
                        <XCircle className="w-5 h-5 text-accent" />
                      ) : (
                        <FilePlus className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="pb-6 pt-1">
                      <p className="text-base text-ink font-medium">{item.title}</p>
                      <p className="text-sm text-ink-soft mt-1">
                        {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approvals preview */}
            {pendingApprovals.length > 0 && (
              <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-serif font-medium text-ink">
                    承認待ち一覧
                  </h2>
                  <Link
                    to="/approvals"
                    className="text-sm text-primary hover:text-primary-dark cursor-pointer font-bold"
                  >
                    すべて見る
                  </Link>
                </div>
                <div className="space-y-3">
                  {pendingApprovals.slice(0, 2).map((app) => (
                    <div
                      key={app.id}
                      onClick={() => navigate(`/approvals/${app.id}`)}
                      className="flex items-center gap-3 p-3 rounded-card bg-screen-soft hover:bg-line/20 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-[rgba(36,189,126,0.08)] flex items-center justify-center shrink-0">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-bold text-ink truncate">
                          {app.title}
                        </p>
                        <p className="text-sm text-ink-soft mt-0.5">
                          {app.applicant} · {app.categoryName}
                        </p>
                        {app.alert && (
                          <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 bg-[rgba(184,92,0,0.10)] text-warning text-xs font-bold rounded-full">
                            <AlertTriangle className="w-3 h-3" />
                            {app.alert}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-base text-ink font-bold shrink-0">
                        ¥{app.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Budget preview */}
            <div className="bg-white rounded-card shadow-card p-5 md:p-6 border border-line/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-serif font-medium text-ink">
                  予算使用状況
                </h2>
                <Link
                  to="/dashboard"
                  className="text-sm text-primary hover:text-primary-dark cursor-pointer font-bold"
                >
                  詳細
                </Link>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-ink-soft font-bold">{budgetOverview.department}</span>
                  <span className="text-sm font-mono font-bold text-ink">
                    ¥{budgetOverview.usedAmount.toLocaleString()} / ¥{budgetOverview.totalBudget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-line/40 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(budgetOverview.usedAmount / budgetOverview.totalBudget) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-ink-soft mt-1.5">
                  残り ¥{budgetOverview.remainingAmount.toLocaleString()} ({((budgetOverview.remainingAmount / budgetOverview.totalBudget) * 100).toFixed(1)}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}