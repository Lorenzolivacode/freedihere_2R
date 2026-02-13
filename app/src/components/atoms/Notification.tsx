import { useEffect, useState } from "react";

type NotificationType = "success" | "error" | "info";

type NotificationProps = {
  message: string;
  type?: NotificationType;
  duration?: number;
  onDismiss?: () => void;
};

const bgColors: Record<NotificationType, string> = {
  success: "var(--color-kcal)",
  error: "#ef4444",
  info: "var(--color-primary)",
};

export function Notification({
  message,
  type = "info",
  duration = 4000,
  onDismiss,
}: NotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium"
      style={{ backgroundColor: bgColors[type], color: "var(--color-black)" }}
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={() => { setVisible(false); onDismiss?.(); }}
        className="opacity-70 hover:opacity-100 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}
