// Contact.jsx
// A simple contact page with a form (client-side only demo — no backend
// endpoint wired up yet, intentionally, since the brief doesn't request one)
// plus quick facts for reaching the admissions office directly.

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // NOTE: This is a front-end only demo submission. Wire this up to a
    // real backend endpoint (e.g. POST /api/contact) when ready.
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Get in touch
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Have a question the Admission Chat couldn't answer? Reach out to
            our admissions office directly.
          </p>

          <ul className="mt-8 space-y-5 text-sm">
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <span className="w-9 h-9 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center"><Mail size={16} /></span>
              admissions@college-agent.edu
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <span className="w-9 h-9 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center"><Phone size={16} /></span>
              +91 98765 43210 (Mon–Sat, 9am–6pm)
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <span className="w-9 h-9 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center"><MapPin size={16} /></span>
              Admissions Office, Main Campus, Hyderabad
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10 animate-fade-in">
              <CheckCircle2 className="text-emerald-500 mb-3" size={40} />
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">Message sent!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                We'll get back to you within 1–2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full name</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 transition-colors"
              >
                Send message <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
