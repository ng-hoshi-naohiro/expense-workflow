import { useNavigate } from "react-router-dom";
import { notifications } from "@/mocks/notifications";
import { useState } from "react";
import { Bell, MailCheck, CheckCircle2, XCircle, Clock, Inbox } from "lucide-react";

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
        <h1 className="text-2xl md:text-3xl font-serif font-medium text-ink">通知</h1>
        <button className="text-sm text-primary hover:text-primary-dark cursor-pointer font-bold">
          すべて既読にする
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-screen-soft rounded-btn mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const count = tab.id === "all" ? notifications.length :
            tab.id === "unread" ? notifications.filter(n => !n.read).length :
            tab.id === "requests" ? notifications.filter(n => n.type === "approval_request").length :
            notifications.filter(n => n.type === "approval_result" || n.type === "rejection").length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-btn text-sm font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20 text-white" : "bg-line/50 text-ink-soft"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((n) => {
          return (
            <button
              key={n.id}
              onClick={() => navigate(n.targetUrl)}
              className={`w-full text-left bg-white rounded-card p-4 hover:shadow-card transition-all cursor-pointer border ${
                !n.read
                  ? "border-l-4 border-l-primary border-y border-r border-line"
                  : "border-line"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-screen-soft">
                  {!n.read ? (
                    <span className="w-3 h-3 rounded-full bg-primary" />
                  ) : (
                    <span className="w-3 h-3 rounded-full bg-line" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-base ${!n.read ? "font-bold text-ink" : "font-medium text-ink"}`}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <span className="shrink-0 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-accent" />
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">{n.body}</p>
                  <p className="text-xs text-ink-soft/70 mt-2.5 font-medium">{n.date}</p>
                </div>
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-ink-soft">
            <div className="w-16 h-16 rounded-full bg-screen-soft flex items-center justify-center">
              <Inbox className="w-8 h-8 text-ink-soft" />
            </div>
            <p className="text-sm">該当する通知はありません</p>
          </div>
        )}
      </div>
    </div>
  );
}