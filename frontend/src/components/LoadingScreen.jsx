// LoadingScreen.jsx
// A reusable loading state — a centered spinner with a message.
// Used inside pages while their initial data (courses, fees, etc.) loads
// from the Flask backend.

import { Loader2 } from "lucide-react";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-500 dark:text-slate-400 animate-fade-in">
      <Loader2 size={32} className="animate-spin text-brand-600 mb-3" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
