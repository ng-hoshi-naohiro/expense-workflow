import { Link, useNavigate } from "react-router-dom";
import { pendingApprovals } from "@/mocks/applications";

export default function Approvals() {
  const navigate = useNavigate();
  const stuckCount = pendingApprovals.filter((a) => a.daysPending >= 3).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <h1 className="font-serif text-xl md:text-2xl font-medium text-ink mb-2">
        承認待ち一覧
      </h1>
      <p className="text-sm text-ink-soft mb-6">
        {pendingApprovals.length}件の承認待ち
        {stuckCount > 0 && (
          <span className="text-warning ml-2">（うち滞留中 {stuckCount}件）</span>
        )}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pendingApprovals.map((app) => (
          <div
            key={app.id}
            onClick={() => navigate(`/approvals/${app.id}`)}
            className="bg-screen rounded-card shadow-card p-5 hover:shadow-lg transition-shadow cursor-pointer"
          >
            {app.alert && (
              <div className="mb-3">
                <span className="inline-block px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                  {app.alert}
                </span>
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-medium text-ink truncate">{app.title}</h3>
                <p className="text-sm text-ink-soft mt-1">
                  {app.applicant} · {app.categoryName}
                </p>
                <p className="text-xs text-ink-soft/60 mt-1">
                  申請日 {app.submittedAt}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-serif text-xl font-medium text-ink">
                  ¥{app.amount.toLocaleString()}
                </p>
                {app.daysPending >= 3 && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-warning/10 text-warning text-[11px] rounded-full">
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