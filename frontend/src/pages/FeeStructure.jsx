// FeeStructure.jsx
// Displays an itemized, course-wise fee breakdown in a responsive table.
// Data comes from GET /api/fees.

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import AppLayout from "../components/AppLayout.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import api from "../api/axios.js";

const formatCurrency = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function FeeStructure() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchFees() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/fees");
      setFees(res.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <AppLayout title="Fee Structure">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          A transparent, itemized breakdown of tuition, hostel and other charges for every course.
        </p>

        {loading && <LoadingScreen message="Fetching fee structure..." />}
        {error && <ErrorBanner message={error} onRetry={fetchFees} />}

        {!loading && !error && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-left text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">
                  <th className="px-5 py-3.5 font-semibold">Course</th>
                  <th className="px-5 py-3.5 font-semibold">Tuition / yr</th>
                  <th className="px-5 py-3.5 font-semibold">Hostel / yr</th>
                  <th className="px-5 py-3.5 font-semibold">Exam Fee</th>
                  <th className="px-5 py-3.5 font-semibold">Other</th>
                  <th className="px-5 py-3.5 font-semibold text-brand-700 dark:text-brand-300">Total / yr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {fees.map((f) => (
                  <tr key={f.id} className="hover:bg-brand-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <Wallet size={15} className="text-brand-600 shrink-0" /> {f.course}
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{formatCurrency(f.tuitionPerYear)}</td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{formatCurrency(f.hostelPerYear)}</td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{formatCurrency(f.examFee)}</td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">{formatCurrency(f.otherCharges)}</td>
                    <td className="px-5 py-4 font-semibold text-brand-700 dark:text-brand-300">{formatCurrency(f.totalPerYear)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-slate-400 mt-4">
          * Fees are indicative and subject to revision. Scholarships may reduce the effective tuition amount — see the Scholarship page.
        </p>
      </div>
    </AppLayout>
  );
}
