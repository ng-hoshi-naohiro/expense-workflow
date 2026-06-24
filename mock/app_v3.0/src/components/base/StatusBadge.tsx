import { Clock, CheckCircle2, XCircle, FileText, AlertTriangle } from "lucide-react";

interface StatusBadgeProps {
  status: "draft" | "pending" | "approved" | "rejected" | "stuck";
  label?: string;
  className?: string;
}

const statusConfig = {
  draft: {
    bg: "bg-[#e6e6eb]",
    text: "text-ink-soft",
    icon: FileText,
    defaultLabel: "下書き",
  },
  pending: {
    bg: "bg-[#fff5e6]",
    text: "text-warning",
    icon: Clock,
    defaultLabel: "承認待ち",
  },
  approved: {
    bg: "bg-[#e7ecf5]",
    text: "text-success",
    icon: CheckCircle2,
    defaultLabel: "承認済",
  },
  rejected: {
    bg: "bg-[#fde8e3]",
    text: "text-accent",
    icon: XCircle,
    defaultLabel: "差戻し",
  },
  stuck: {
    bg: "bg-[#fff5e6]",
    text: "text-warning",
    icon: AlertTriangle,
    defaultLabel: "滞留",
  },
};

export default function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${config.bg} ${config.text} ${className}`}
    >
      <Icon className="w-4 h-4" />
      {label || config.defaultLabel}
    </span>
  );
}