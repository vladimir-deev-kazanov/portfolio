import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this portfolio uses privacy-friendly analytics.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="about-page shell">
      <section className="about-hero">
        <p className="kicker">Privacy</p>
        <h1>Minimal analytics,<br /><em>without personal profiles.</em></h1>
      </section>
      <section className="about-story">
        <div><p className="kicker">What is measured</p></div>
        <div>
          <p>This portfolio uses Plausible Analytics to understand which pages and case studies are useful, how visitors find the site, and whether it works well across devices.</p>
          <p>Plausible does not use cookies or persistent identifiers. Reports include page paths, referral or campaign source, broad device and browser information, approximate location, and a small number of interactions such as opening a case study, reaching its main decision, evidence, or result, downloading the CV, or choosing a contact link.</p>
          <p>I do not use session replay, advertising tracking, user profiles, form recording, or keystroke capture. Analytics events do not include email addresses, message contents, full external URLs, or arbitrary query strings.</p>
          <p>Plausible processes and stores visitor analytics in the EU. Analytics only run on vladimirdeev.com and only when your browser does not send a Do Not Track signal. The information is used only to improve this portfolio and understand its distribution.</p>
          <p>If you prefer not to be included, enable your browser&apos;s Do Not Track setting, block the Plausible script, or contact me at vladimirdeev0@gmail.com.</p>
        </div>
      </section>
    </main>
  );
}
