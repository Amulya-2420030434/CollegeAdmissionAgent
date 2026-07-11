// CourseFinder.jsx
// Lets students browse all academic programs, filter by department, and
// see key details (duration, eligibility, seats, average package) at a glance.
// Data comes from GET /api/courses.

import { useEffect, useMemo, useState } from "react";
import { Search, GraduationCap, Users, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
import AppLayout from "../components/AppLayout.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import Modal from "../components/Modal.jsx";
import ApplyForm from "../components/ApplyForm.jsx";
import api from "../api/axios.js";

export default function CourseFinder() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  async function fetchCourses() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/courses");
      setCourses(res.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const departments = useMemo(
    () => ["All", ...new Set(courses.map((c) => c.department))],
    [courses]
  );

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
      const matchesDept = department === "All" || c.department === department;
      return matchesQuery && matchesDept;
    });
  }, [courses, query, department]);

  return (
    <AppLayout title="Course Finder">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Explore every program we offer — filter by department or search by name. Click a course to see full details and apply.
        </p>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartment(dept)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                  department === dept
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-brand-500"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {loading && <LoadingScreen message="Fetching courses..." />}
        {error && <ErrorBanner message={error} onRetry={fetchCourses} />}

        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course) => (
              <div
                key={course.id}
                onClick={() => { setSelectedCourse(course); setShowApplyForm(false); }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") { setSelectedCourse(course); setShowApplyForm(false); } }}
                className="text-left cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-brand-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center">
                    <GraduationCap size={18} />
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {course.department}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-slate-900 dark:text-white leading-snug">
                  {course.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 py-2">
                    <Clock size={14} className="mx-auto text-brand-600 mb-1" />
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">{course.duration}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 py-2">
                    <Users size={14} className="mx-auto text-brand-600 mb-1" />
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">{course.seats} seats</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 py-2">
                    <TrendingUp size={14} className="mx-auto text-brand-600 mb-1" />
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">{course.avgPackage}</p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Eligibility: </span>
                  {course.eligibility}
                </p>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full text-center text-slate-500 py-12">
                No courses match your search. Try a different keyword or department.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Course detail / apply modal */}
      <Modal
        open={!!selectedCourse}
        onClose={() => { setSelectedCourse(null); setShowApplyForm(false); }}
        title={showApplyForm ? "Apply Now" : selectedCourse?.name}
      >
        {selectedCourse && !showApplyForm && (
          <div className="space-y-4">
            <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300">
              {selectedCourse.department}
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedCourse.description}
            </p>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 py-3">
                <Clock size={16} className="mx-auto text-brand-600 mb-1" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{selectedCourse.duration}</p>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 py-3">
                <Users size={16} className="mx-auto text-brand-600 mb-1" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{selectedCourse.seats} seats</p>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 py-3">
                <TrendingUp size={16} className="mx-auto text-brand-600 mb-1" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{selectedCourse.avgPackage}</p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4">
              <p className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 size={16} className="text-brand-600 mt-0.5 shrink-0" />
                <span><span className="font-medium">Eligibility:</span> {selectedCourse.eligibility}</span>
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

        {selectedCourse && showApplyForm && (
          <ApplyForm
            applicationType="course"
            referenceId={selectedCourse.id}
            referenceName={selectedCourse.name}
            onDone={() => { setSelectedCourse(null); setShowApplyForm(false); }}
          />
        )}
      </Modal>
    </AppLayout>
  );
}
