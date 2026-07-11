// Sidebar.jsx
// Left navigation sidebar shown across the "app" pages (Admission Chat,
// Course Finder, Scholarship, Fee Structure, FAQ). Collapses into a
// slide-over drawer on mobile, toggled via a hamburger button passed in
// by the parent layout (see App.jsx AppLayout).

import { NavLink } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Search,
  Award,
  Wallet,
  HelpCircle,
  GraduationCap,
  X,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

const NAV_ITEMS = [
  { label: "Home", to: "/", icon: Home },
  { label: "Admission Chat", to: "/chat", icon: MessageCircle },
  { label: "Course Finder", to: "/courses", icon: Search },
  { label: "Scholarship", to: "/scholarships", icon: Award },
  { label: "Fee Structure", to: "/fees", icon: Wallet },
  { label: "FAQ", to: "/faq", icon: HelpCircle },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 shrink-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 font-display font-bold text-brand-700 dark:text-brand-300">
            <span className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
              <GraduationCap size={16} />
            </span>
            <span className="text-sm">Admission Agent</span>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-500">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-600 text-white shadow-sm shadow-brand-600/30"
                    : "text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-brand-300"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">Dark / Light</span>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
