// Footer.jsx
// Site-wide footer with brand blurb, quick links, contact info and
// social placeholders. Shown at the bottom of all marketing pages.

import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg text-white mb-3">
            <span className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center">
              <GraduationCap size={20} />
            </span>
            College Admission Agent
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            An AI-powered assistant that helps students navigate admissions —
            courses, fees, scholarships and everything in between — instantly.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/chat" className="hover:text-white transition-colors">Admission Chat</Link></li>
            <li><Link to="/courses" className="hover:text-white transition-colors">Course Finder</Link></li>
            <li><Link to="/scholarships" className="hover:text-white transition-colors">Scholarships</Link></li>
            <li><Link to="/fees" className="hover:text-white transition-colors">Fee Structure</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/upload" className="hover:text-white transition-colors">Upload Documents</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-3">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Mail size={16} /> admissions@college-agent.edu</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> Admissions Office, Main Campus</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {year} College Admission Agent. Built as a demo project — powered by IBM watsonx.ai (coming soon).
      </div>
    </footer>
  );
}
