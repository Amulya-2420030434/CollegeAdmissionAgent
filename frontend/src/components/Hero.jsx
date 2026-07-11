// Hero.jsx
// The landing page's hero section — the first thing a prospective student
// sees. Clear value proposition, primary CTA into the chat, and a live
// preview of the chat UI to make the "AI agent" concept tangible immediately.

import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white dark:from-brand-950 dark:to-surface-dark">
      {/* Decorative blurred blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-brand-300/40 dark:bg-brand-700/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-96 h-96 bg-brand-200/50 dark:bg-brand-800/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-900/50 px-3 py-1.5 rounded-full">
            <Sparkles size={14} /> Powered by AI · IBM watsonx.ai ready
          </span>

          <h1 className="mt-5 text-4xl sm:text-5xl font-display font-extrabold leading-tight text-slate-900 dark:text-white">
            Your admission questions, <span className="text-brand-600 dark:text-brand-400">answered instantly.</span>
          </h1>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
            College Admission Agent is your 24/7 AI assistant for eligibility,
            courses, fees, scholarships, hostel life and the entire admission
            process — no more waiting in queues or hunting through PDFs.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 shadow-lg shadow-brand-600/30 transition-colors"
            >
              Chat with the Agent <ArrowRight size={18} />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 font-semibold px-6 py-3.5 transition-colors"
            >
              Explore Courses
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand-600" /> Verified information</div>
            <div className="flex items-center gap-2"><Clock size={16} className="text-brand-600" /> Available 24/7</div>
          </div>
        </div>

        {/* Chat preview card */}
        <div className="animate-slide-up">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-brand-900/10 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-medium text-slate-400">Admission Chat</span>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div className="ml-auto max-w-[80%] bg-brand-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5">
                What's the eligibility for B.Tech CSE?
              </div>
              <div className="max-w-[85%] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                You need 10+2 with Physics, Chemistry & Mathematics, scoring at
                least 60% overall. Want me to check the fee structure too?
              </div>
              <div className="ml-auto max-w-[80%] bg-brand-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5">
                Yes please!
              </div>
              <div className="flex items-center gap-1.5 px-2">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce-dot [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce-dot [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce-dot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
