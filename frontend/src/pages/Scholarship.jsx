// Scholarship.jsx
// Lists all available scholarships with type, coverage, eligibility and
// deadline. Data comes from GET /api/scholarships.

import { useEffect, useState } from "react";
import { Award, CalendarDays, CheckCircle2, RefreshCcw } from "lucide-react";
import AppLayout from "../components/AppLayout.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import Modal from "../components/Modal.jsx";
import ApplyForm from "../components/ApplyForm.jsx";
import api from "../api/axios.js";

export default function Scholarship() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  async function fetchScholarships() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/scholarships");
      setScholarships(res.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchScholarships();
  }, []);

  return (
    <AppLayout title="Scholarships">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Explore scholarships you may be eligible for — merit, need-based
          and special category awards. Click a scholarship to see full details and apply.
        </p>

        {loading && <LoadingScreen message="Fetching scholarships..." />}
        {error && <ErrorBanner message={error} onRetry={fetchScholarships} />}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 gap-5">
            {scholarships.map((s) => (
              <div
                key={s.id}
                onClick={() => { setSelectedScholarship(s); setShowApplyForm(false); }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") { setSelectedScholarship(s); setShowApplyForm(false); } }}
                className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Award size={20} />
                    </span>
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white leading-snug">
                      {s.name}
                    </h3>
                  </div>
                  {s.renewable && (
                    <span className="shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <RefreshCcw size={10} /> Renewable
                    </span>
                  )}
                </div>

                <span className="inline-block mt-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
                  {s.type}
                </span>

                <div className="mt-4 space-y-2 text-sm">
                  <p className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 size={15} className="text-brand-600 mt-0.5 shrink-0" />
                    <span><span className="font-medium">Coverage:</span> {s.coverage}</span>
                  </p>
                  <p className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <CheckCircle2 size={15} className="text-brand-600 mt-0.5 shrink-0" />
                    <span><span className="font-medium">Eligibility:</span> {s.eligibility}</span>
                  </p>
                  <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs pt-1">
                    <CalendarDays size={14} /> Apply before {new Date(s.deadline).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scholarship detail / apply modal */}
      <Modal
        open={!!selectedScholarship}
        onClose={() => { setSelectedScholarship(null); setShowApplyForm(false); }}
        title={showApplyForm ? "Apply Now" : selectedScholarship?.name}
      >
        {selectedScholarship && !showApplyForm && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
                {selectedScholarship.type}
              </span>
              {selectedScholarship.renewable && (
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <RefreshCcw size={10} /> Renewable
                </span>
              )}
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 space-y-2.5">
              <p className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 size={16} className="text-brand-600 mt-0.5 shrink-0" />
                <span><span className="font-medium">Coverage:</span> {selectedScholarship.coverage}</span>
              </p>
              <p className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 size={16} className="text-brand-600 mt-0.5 shrink-0" />
                <span><span className="font-medium">Eligibility:</span> {selectedScholarship.eligibility}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                <CalendarDays size={14} /> Apply before {new Date(selectedScholarship.deadline).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            <button
              onClick={() => setShowApplyForm(true)}
              className="w-full rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 transition-colors"
            >
              Apply Now
            </button>
          </div>
        )}

        {selectedScholarship && showApplyForm && (
          <ApplyForm
            applicationType="scholarship"
            referenceId={selectedScholarship.id}
            referenceName={selectedScholarship.name}
            onDone={() => { setSelectedScholarship(null); setShowApplyForm(false); }}
          />
        )}
      </Modal>
    </AppLayout>
  );
}
