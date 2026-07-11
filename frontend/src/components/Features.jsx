// Features.jsx
// Grid of feature cards describing what the College Admission Agent can do.
// Given an #features id so the Navbar's "Features" link can scroll to it.

import {
  MessageSquareText,
  BookOpenCheck,
  Wallet,
  Award,
  FileUp,
  CalendarClock,
} from "lucide-react";

const FEATURES = [
  {
    icon: MessageSquareText,
    title: "AI Admission Chat",
    description:
      "Ask anything about eligibility, hostel, placements or admission steps and get instant, accurate answers.",
  },
  {
    icon: BookOpenCheck,
    title: "Course Finder",
    description:
      "Browse every program we offer with seats, duration, eligibility and average placement package.",
  },
  {
    icon: Award,
    title: "Scholarship Matching",
    description:
      "Discover merit-based, need-based and category scholarships you may qualify for, with deadlines.",
  },
  {
    icon: Wallet,
    title: "Transparent Fee Structure",
    description:
      "See a full, itemized breakdown of tuition, hostel and other charges for every course — no surprises.",
  },
  {
    icon: FileUp,
    title: "Document Upload & Review",
    description:
      "Upload admission documents for AI-assisted verification, powered by a retrieval pipeline under the hood.",
  },
  {
    icon: CalendarClock,
    title: "Important Dates",
    description:
      "Never miss an application window, counseling date or scholarship deadline again.",
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-semibold tracking-wide text-brand-600 dark:text-brand-400 uppercase">
          What you get
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
          Everything you need to make an informed decision
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          One assistant, every answer — built to make the admission journey
          simple, transparent and fast.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-xl hover:shadow-brand-900/5 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
              <Icon size={22} />
            </div>
            <h3 className="mt-4 font-display font-semibold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
