import { Link } from "react-router-dom";
import { applications } from "@/mocks/applications";
import StatusBadge from "@/components/base/StatusBadge";

export default function History() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <h1 className="font-serif text-xl md:text-2xl font-medium text-ink mb-6">
        申請履歴
      </h1>
      <div className="bg-screen rounded-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-paper-warm/50">
                <th className="text-left text-xs font-medium text-ink-soft px-4 py-3">ステータス</th>
                <th className="text-left text-xs font-medium text-ink-soft px-4 py-3">申請日</th>
                <th className="text-left text-xs font-medium text-ink-soft px-4 py-3">カテゴリ</th>
                <th className="text-left text-xs font-medium text-ink-soft px-4 py-3">業者名</th>
                <th className="text-right text-xs font-medium text-ink-soft px-4 py-3">金額</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-line/50 hover:bg-paper-warm/30 transition-colors">
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status as "draft" | "pending" | "approved" | "rejected"} label={app.statusLabel} />
                  </td>
                  <td className="px-4 py-3 text-sm text-ink">{app.createdAt}</td>
                  <td className="px-4 py-3 text-sm text-ink">{app.categoryName}</td>
                  <td className="px-4 py-3 text-sm text-ink">{app.vendor}</td>
                  <td className="px-4 py-3 text-sm text-ink font-mono text-right">
                    ¥{app.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/request/${app.id}`}
                      className="text-sm text-primary hover:text-primary-dark whitespace-nowrap cursor-pointer"
                    >
                      詳細
                    </Link>
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