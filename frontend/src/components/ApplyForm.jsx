// ApplyForm.jsx
// The "Apply Now" form shown inside a course or scholarship detail modal.
// Collects basic applicant info and submits to POST /api/apply.
// On success, shows a confirmation screen with the application reference
// number instead of the form.

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import ErrorBanner from "./ErrorBanner.jsx";
import api from "../api/axios.js";

export default function ApplyForm({ applicationType, referenceId, referenceName, onDone }) {
  const [form, setForm] = useState({ applicant_name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await api.post("/apply", {
        ...form,
        application_type: applicationType,
        reference_id: referenceId,
        reference_name: referenceName,
      });
      setConfirmation(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="text-center py-6 animate-fade-in">
        <CheckCircle2 className="mx-auto text-emerald-500 mb-3" size={40} />
        <h4 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
          Application submitted!
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Your reference number is
        </p>
        <p className="mt-1 font-mono font-bold text-brand-600 dark:text-brand-400 text-lg tracking-wide">
          {confirmation.id}
        </p>
        <p className="text-xs text-slate-400 mt-3 max-w-xs mx-auto">
          Save this for your records. We've noted your application for{" "}
          <span className="font-medium">{confirmation.reference_name}</span>.
        </p>
        <button
          onClick={onDone}
          className="mt-6 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-6 py-2.5 transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Applying for <span className="font-medium text-slate-700 dark:text-slate-200">{referenceName}</span>
      </p>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full name</label>
        <input
          required
          name="applicant_name"
          value={form.applicant_name}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="Jane Doe"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
          <input
            required
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="98765 43210"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message (optional)</label>
        <textarea
          rows={3}
          name="message"
          value={form.message}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="Anything you'd like the admissions team to know?"
        />
      </div>

      {error && <ErrorBanner message={error} />}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold px-6 py-3 transition-colors"
      >
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
