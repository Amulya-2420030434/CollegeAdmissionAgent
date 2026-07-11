// AppLayout.jsx
// Shared layout for every "app" page (Admission Chat, Course Finder,
// Scholarship, Fee Structure, FAQ). Renders the persistent Sidebar plus
// a slim top bar with a mobile menu toggle, and renders whatever page
// content is passed in as children.

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar.jsx";

export default function AppLayout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-surface-light dark:bg-surface-dark">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center gap-3 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-surface-dark/80 backdrop-blur sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <h1 className="font-display font-semibold text-slate-800 dark:text-slate-100">{title}</h1>
        </header>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
