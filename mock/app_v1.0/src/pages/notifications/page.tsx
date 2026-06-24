import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@/mocks/notifications";
import { useState } from "react";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "すべて" },
    { id: "unread", label: "未読" },
    { id: "requests", label: "承認依頼" },
    { id: "results", label: "結果通知" },
  ];

  const filtered = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    if (activeTab === "requests") return n.type === "approval_request";
    if (activeTab === "results") return n.type === "approval_result" || n.type === "rejection";
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-xl md:text-2xl font-medium text-ink">通知</h1>
        <button className="text-sm text-primary hover:text-primary-dark cursor-pointer">
          すべて既読にする
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-paper-warm rounded-full mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "bg-screen text-ink shadow-sm"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.map((n) => (
          <button
            key={n.id}
            onClick={() => navigate(n.targetUrl)}
            className={`w-full text-left bg-screen rounded-card p-4 hover:shadow-card transition-shadow cursor-pointer ${
              !n.read ? "border-l-4 border-l-primary" : "border-l-4 border-l-transparent"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-paper-warm flex items-center justify-center shrink-0">
                <i className={`${n.icon} text-lg text-ink-soft`}></i>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-ink">{n.title}</p>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1"></span>
                  )}
                </div>
                <p className="text-sm text-ink-soft mt-0.5">{n.body}</p>
                <p className="text-xs text-ink-soft/50 mt-2">{n.date}</p>
              </div>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-sm text-ink-soft/60 py-8">
            該当する通知はありません
          </p>
        )}
      </div>
    </div>
  );
}