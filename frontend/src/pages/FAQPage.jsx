// FAQPage.jsx
// Full FAQ page shown inside the app layout (accessible from the Sidebar).
// Reuses the same FAQ accordion component as the landing page teaser.

import AppLayout from "../components/AppLayout.jsx";
import FAQ from "../components/FAQ.jsx";

export default function FAQPage() {
  return (
    <AppLayout title="FAQ">
      <FAQ />
    </AppLayout>
  );
}
