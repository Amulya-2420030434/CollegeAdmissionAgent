// App.jsx
// Defines every route in the application using React Router.
// Marketing pages (Landing, Contact) use their own Navbar/Footer.
// App pages (Chat, CourseFinder, Scholarship, FeeStructure, FAQPage,
// UploadPDF) share the Sidebar-based AppLayout (see components/AppLayout.jsx).

import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Contact from "./pages/Contact.jsx";
import Chat from "./pages/Chat.jsx";
import CourseFinder from "./pages/CourseFinder.jsx";
import Scholarship from "./pages/Scholarship.jsx";
import FeeStructure from "./pages/FeeStructure.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import UploadPDF from "./pages/UploadPDF.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      {/* Marketing pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/contact" element={<Contact />} />

      {/* App pages (sidebar layout) */}
      <Route path="/chat" element={<Chat />} />
      <Route path="/courses" element={<CourseFinder />} />
      <Route path="/scholarships" element={<Scholarship />} />
      <Route path="/fees" element={<FeeStructure />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/upload" element={<UploadPDF />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
