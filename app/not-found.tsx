import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content">
      <span hidden data-analytics-event="not_found" data-analytics-on-mount />
      <section className="home-hero shell">
        <p className="kicker">404 · Page not found</p>
        <h1 className="display">This page does not exist.</h1>
        <div className="hero-actions">
          <Link href="/">Return to selected work</Link>
        </div>
      </section>
    </main>
  );
}
