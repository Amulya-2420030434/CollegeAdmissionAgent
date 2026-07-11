// UploadPDF.jsx
// Lets students upload admission documents (PDF only) via drag-and-drop
// or file picker. Sends the file to POST /api/upload, which currently
// just stores it — the real text-extraction + embedding pipeline for RAG
// is scaffolded in backend/rag.py (retrieve_relevant_context) and will be
// wired up once IBM watsonx.ai is integrated.

import { useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, Loader2 } from "lucide-react";
import AppLayout from "../components/AppLayout.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import api from "../api/axios.js";

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  function handleFileSelect(selected) {
    setError(null);
    setResult(null);
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      setError("Only PDF files are supported. Please choose a .pdf file.");
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files?.[0]);
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <AppLayout title="Upload Admission Documents">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Upload marksheets, transfer certificates or admission brochures for
          AI-assisted review. This is a demo pipeline — files are stored
          securely but not yet parsed by the AI (see the note below).
        </p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
            dragActive
              ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
              : "border-slate-300 dark:border-slate-700 hover:border-brand-400"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />
          <UploadCloud size={36} className="mx-auto text-brand-600 mb-3" />
          <p className="font-medium text-slate-700 dark:text-slate-200">
            Drag & drop your PDF here, or click to browse
          </p>
          <p className="text-xs text-slate-400 mt-1">Maximum file size: 10MB · PDF only</p>
        </div>

        {file && (
          <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 animate-fade-in">
            <div className="flex items-center gap-3 min-w-0">
              <FileText size={20} className="text-brand-600 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}

        {error && <div className="mt-5"><ErrorBanner message={error} /></div>}

        {result && (
          <div className="mt-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10 px-4 py-3.5 flex items-start gap-3 animate-fade-in">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-emerald-700 dark:text-emerald-400">Upload successful</p>
              <p className="text-emerald-600/90 dark:text-emerald-400/80 mt-0.5">
                <span className="font-medium">{result.filename}</span> was received and is marked as{" "}
                <span className="italic">"{result.status}"</span>. AI-based document review will be
                available once the RAG + IBM watsonx.ai pipeline is fully connected.
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
