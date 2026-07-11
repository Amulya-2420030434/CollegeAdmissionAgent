// NotFound.jsx
// Shown for any unmatched route. Keeps the same brand look and offers a
// clear way back to the homepage instead of a dead end.

import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-surface-light dark:bg-surface-dark">
      <span className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center mb-5">
        <GraduationCap size={26} />
      </span>
      <h1 className="text-6xl font-display font-extrabold text-brand-600">404</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        This page doesn't exist — but your admission questions still have answers.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
