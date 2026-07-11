// About.jsx
// About section for the landing page — explains the "why" behind the
// project and previews the underlying architecture (RAG + IBM watsonx.ai)
// for technically curious visitors. Given an #about id for Navbar linking.

import { Bot, Database, Cpu } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bg-brand-50/60 dark:bg-slate-900/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold tracking-wide text-brand-600 dark:text-brand-400 uppercase">
            About the project
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Built to make admissions feel human, not bureaucratic
          </h2>
          <p className="mt-5 text-slate-600 dark:text-slate-300 leading-relaxed">
            Every year, thousands of students ask the same questions —
            eligibility, fees, hostel, placements — through crowded helplines
            and outdated PDFs. College Admission Agent puts those answers in
            one conversational interface, available anytime, on any device.
          </p>
          <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            Today, the assistant runs on a fast rule-based engine backed by
            real course, fee and scholarship data. It's architected so the
            same interface can be upgraded to a full generative AI model —
            IBM watsonx.ai's Granite — with a single function swap on the
            backend, plus a Retrieval-Augmented Generation (RAG) layer for
            grounding answers in official admission documents.
          </p>
        </div>

        <div className="grid gap-5">
          <div className="flex gap-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white">Conversational Engine</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Rule-based today, IBM Granite-ready tomorrow — the chat logic
                lives behind a single, swappable function.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <Database size={20} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white">RAG-Ready Document Pipeline</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Upload admission PDFs today; the retrieval pipeline that will
                ground AI answers in them is already scaffolded.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <Cpu size={20} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white">Clean, Extensible Stack</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                React + Tailwind frontend, Flask REST API backend — simple
                enough to extend, solid enough to deploy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
