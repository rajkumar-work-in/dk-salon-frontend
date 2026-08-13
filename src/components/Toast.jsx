import React, { useEffect } from "react";

/**
 * A small, self-dismissing toast notification.
 * `toast` shape: { type: "success" | "error", message: string } | null
 */
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm animate-[toast-in_0.25s_ease-out]"
    >
      <div
        className={`flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm ${
          isSuccess
            ? "bg-green-50 border-green-300 text-green-800 dark:bg-green-900/80 dark:border-green-700 dark:text-green-100"
            : "bg-red-50 border-red-300 text-red-800 dark:bg-red-900/80 dark:border-red-700 dark:text-red-100"
        }`}
      >
        <span className="text-lg leading-none mt-0.5">
          {isSuccess ? "✓" : "✕"}
        </span>
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="text-current opacity-60 hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
