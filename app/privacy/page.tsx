import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this portfolio uses privacy-friendly analytics.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="prose-page shell">
      <header className="prose-hero">
        <p className="kicker">Privacy</p>
        <h1>Minimal analytics, without personal profiles.</h1>
      </header>

      <section className="prose-section" aria-labelledby="measured-title">
        <h2 id="measured-title">What is measured</h2>
        <div className="reading-copy">
          <p>This portfolio uses Plausible Analytics to understand which pages and case studies are useful, how visitors find the site, and whether it works well across devices.</p>
          <p>Plausible does not use cookies or persistent identifiers. Reports include page paths, referral or campaign source, broad device and browser information, approximate location, and a small number of interactions such as opening a case study, reaching its main decision, evidence, or result, downloading the CV, or choosing a contact link.</p>
        </div>
      </section>

      <section className="prose-section" aria-labelledby="not-measured-title">
        <h2 id="not-measured-title">What is not collected</h2>
        <div className="reading-copy">
          <p>I do not use session replay, advertising tracking, user profiles, form recording, or keystroke capture. Analytics events do not include email addresses, message contents, full external URLs, or arbitrary query strings.</p>
        </div>
      </section>

      <section className="prose-section" aria-labelledby="where-title">
        <h2 id="where-title">Where it runs and how to opt out</h2>
        <div className="reading-copy">
          <p>Plausible processes and stores visitor analytics in the EU. Analytics only run on vladimirdeev.com, and only when your browser sends neither a Do Not Track signal nor a Global Privacy Control signal. The information is used only to improve this portfolio and understand its distribution.</p>
          <p>To opt out, enable Do Not Track or Global Privacy Control in your browser, block the Plausible script, or contact me at vladimirdeev0@gmail.com.</p>
        </div>
      </section>

      <section className="prose-section" aria-labelledby="fonts-title">
        <h2 id="fonts-title">Fonts and third parties</h2>
        <div className="reading-copy">
          <p>Fonts are served from this site. Loading a page makes no request to a third-party font service.</p>
        </div>
      </section>
    </main>
  );
}
