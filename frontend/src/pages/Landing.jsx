// Landing.jsx
// The public marketing homepage: Navbar + Hero + Features + About +
// FAQ teaser + Footer. This is what visitors see before they start chatting.

import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import About from "../components/About.jsx";
import FAQ from "../components/FAQ.jsx";
import Footer from "../components/Footer.jsx";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <FAQ compact />
      <Footer />
    </div>
  );
}
