import { type ReactNode } from "react";

interface StatusBadgeProps {
  status: "draft" | "pending" | "approved" | "rejected" | "stuck";
  label?: string;
  className?: string;
}

const statusConfig = {
  draft: {
    bg: "bg-[#e6e6eb]",
    text: "text-ink-soft",
    defaultLabel: "下書き",
  },
  pending: {
    bg: "bg-[#fff5e6]",
    text: "text-warning",
    defaultLabel: "承認待ち",
  },
  approved: {
    bg: "bg-[#e8f4ee]",
    text: "text-success",
    defaultLabel: "承認済",
  },
  rejected: {
    bg: "bg-[#fde8e3]",
    text: "text-accent",
    defaultLabel: "差戻し",
  },
  stuck: {
    bg: "bg-[#fff5e6]",
    text: "text-warning",
    defaultLabel: "滞留",
  },
};

export default function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${config.bg} ${config.text} ${className}`}
    >
      {label || config.defaultLabel}
    </span>
  );
}