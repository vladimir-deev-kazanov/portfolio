import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main-content" className="prose-page shell">
      <span hidden data-analytics-event="not_found" data-analytics-on-mount />
      <header className="prose-hero">
        <p className="kicker">404</p>
        <h1>This page does not exist.</h1>
        <p className="prose-action"><Link href="/">Return to selected work</Link></p>
      </header>
    </main>
  );
}
