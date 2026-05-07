import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { currentUser } from "@/mocks/users";
import { applications, pendingApprovals, activityTimeline } from "@/mocks/applications";
import StatusBadge from "@/components/base/StatusBadge";

export default function Home() {
  const navigate = useNavigate();

  // Greeting based on time
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      {/* Greeting */}
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif text-xl md:text-2xl font-medium text-ink">
          {currentUser.name}さん、{greeting}
        </h1>
        <p className="text-sm text-ink-soft mt-1">
          {new Date().toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="bg-screen rounded-card shadow-card p-5 md:p-6">
            <h2 className="text-sm font-medium text-ink-soft mb-4">
              クイックアクション
            </h2>
            <div className="space-y-3">
              <Link
                to="/apply"
                className="flex items-center justify-center gap-2 w-full h-14 rounded-btn bg-primary text-white font-medium text-base hover:bg-primary-dark transition-colors cursor-pointer"
              >
                <i className="ri-file-add-line text-xl"></i>
                新しく申請する
              </Link>
              {latestApp && (
                <button
                  onClick={() => navigate(`/apply/${latestApp.category}`)}
                  className="flex items-center justify-center gap-2 w-full h-12 rounded-btn border border-line bg-screen text-ink font-medium text-sm hover:bg-paper-warm transition-colors cursor-pointer"
                >
                  <i className="ri-file-copy-line"></i>
                  前回と同じ内容で申請（{latestApp.title}）
                </button>
              )}
            </div>
          </div>

          {/* Pending approvals card */}
          {currentUser.pendingApprovals > 0 && (
            <div
              onClick={() => navigate("/approvals")}
              className="bg-[#fff5e6] rounded-card p-5 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warning/15 flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-lg text-warning"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">
                    {currentUser.pendingApprovals}件の承認待ちがあります
                  </p>
                  <p className="text-xs text-ink-soft mt-0.5">
                    タップして承認一覧を表示
                  </p>
                </div>
                <i className="ri-arrow-right-s-line text-lg text-ink-soft ml-auto"></i>
              </div>
            </div>
          )}

          {/* My active applications */}
          <div className="bg-screen rounded-card shadow-card p-5 md:p-6">
            <h2 className="text-sm font-medium text-ink-soft mb-4">
              進行中の申請
            </h2>
            {myActiveApps.length === 0 ? (
              <p className="text-sm text-ink-soft/60 text-center py-4">
                進行中の申請はありません
              </p>
            ) : (
              <div className="space-y-3">
                {myActiveApps.slice(0, 3).map((app) => (
                  <div
                    key={app.id}
                    onClick={() => navigate(`/request/${app.id}`)}
                    className="flex items-center gap-3 p-3 rounded-btn bg-paper-warm/50 hover:bg-paper-warm transition-colors cursor-pointer"
                  >
                    <StatusBadge status={app.status as "draft" | "pending"} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink truncate">
                        {app.title}
                      </p>
                      <p className="text-xs text-ink-soft mt-0.5">
                        {app.categoryName} · {app.createdAt}
                      </p>
                    </div>
                    <span className="font-mono text-sm text-ink font-medium shrink-0">
                      ¥{app.amount.toLocaleString()}
                    </span>
                    <i className="ri-arrow-right-s-line text-ink-soft shrink-0"></i>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Recent activity */}
          <div className="bg-screen rounded-card shadow-card p-5 md:p-6">
            <h2 className="text-sm font-medium text-ink-soft mb-4">
              最近の活動
            </h2>
            <div className="space-y-0">
              {activityTimeline.map((item, index) => (
                <div key={item.id} className="flex gap-3 relative">
                  {/* Timeline line */}
                  {index < activityTimeline.length - 1 && (
                    <div className="absolute left-4 top-8 w-px h-full bg-line"></div>
                  )}
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-full bg-paper-warm flex items-center justify-center shrink-0 z-10">
                    <i className={`${item.icon} text-sm text-ink-soft`}></i>
                  </div>
                  <div className="pb-5">
                    <p className="text-sm text-ink">{item.title}</p>
                    <p className="text-xs text-ink-soft/60 mt-0.5">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approvals preview (for approvers) */}
          {pendingApprovals.length > 0 && (
            <div className="bg-screen rounded-card shadow-card p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-ink-soft">
                  承認待ち一覧
                </h2>
                <Link
                  to="/approvals"
                  className="text-xs text-primary hover:text-primary-dark cursor-pointer"
                >
                  すべて見る
                </Link>
              </div>
              <div className="space-y-3">
                {pendingApprovals.slice(0, 2).map((app) => (
                  <div
                    key={app.id}
                    onClick={() => navigate(`/approvals/${app.id}`)}
                    className="flex items-center gap-3 p-3 rounded-btn bg-paper-warm/50 hover:bg-paper-warm transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <i className="ri-checkbox-circle-line text-lg text-primary"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink truncate">
                        {app.title}
                      </p>
                      <p className="text-xs text-ink-soft mt-0.5">
                        {app.applicant} · {app.categoryName}
                      </p>
                      {app.alert && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-warning/10 text-warning text-[11px] rounded-full">
                          {app.alert}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-sm text-ink font-medium shrink-0">
                      ¥{app.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}