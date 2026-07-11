// ErrorBanner.jsx
// Consistent inline error message component, used whenever an API call
// fails, so every page handles errors the same way instead of silently
// breaking or showing inconsistent messages.

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300 px-4 py-3.5 animate-fade-in">
      <AlertTriangle size={18} className="shrink-0 mt-0.5" />
      <div className="flex-1 text-sm">
        <p className="font-medium">Something went wrong</p>
        <p className="mt-0.5 text-red-600/90 dark:text-red-400/80">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-red-300 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <RotateCcw size={14} /> Retry
        </button>
      )}
    </div>
  );
}
