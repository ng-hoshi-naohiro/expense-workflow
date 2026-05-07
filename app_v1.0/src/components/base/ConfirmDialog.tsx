import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  confirmVariant?: "primary" | "danger" | "success";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = "キャンセル",
  confirmVariant = "primary",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const variantStyles = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    danger: "bg-accent hover:bg-[#b03a20] text-white",
    success: "bg-success hover:bg-[#256942] text-white",
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(12, 24, 48, 0.5)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onCancel();
      }}
    >
      <div className="bg-screen rounded-card shadow-modal w-full max-w-sm overflow-hidden">
        <div className="px-5 pt-5 pb-2">
          <h3 className="font-serif text-lg font-medium text-ink">{title}</h3>
        </div>
        <div className="px-5 pb-5">
          <p className="text-sm text-ink-soft leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={onCancel}
            className="flex-1 h-12 rounded-btn border border-line bg-screen text-ink font-medium text-sm hover:bg-paper-warm transition-colors cursor-pointer whitespace-nowrap"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 h-12 rounded-btn font-medium text-sm transition-colors cursor-pointer whitespace-nowrap ${variantStyles[confirmVariant]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}