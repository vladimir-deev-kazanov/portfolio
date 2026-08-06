import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Product Designer Vladimir Deev-Kazanov and his approach to complex Fintech and B2B SaaS products.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page shell">
      <section className="about-hero">
        <p className="kicker">About</p>
        <h1>Complex products need clear decisions.<br/><em>Not more confusion.</em></h1>
      </section>
      <section className="about-story">
        <div>
          <p>I’m a Product Designer with 7+ years of experience in Fintech and B2B SaaS. At Semrush, I design Local SEO tools that help small businesses manage their online presence. Previously, at Raiffeisen Bank, I designed web and mobile banking for entrepreneurs and a CRM for relationship managers.</p>
          <p>I work from problem framing and research through flows, prototypes, product analytics, and implementation review. I’m most useful when difficult rules, high-stakes actions, or automation must feel clear before people can trust the product.</p>
        </div>
        <Link className="button-link" href="/cv">See experience and education <span>↗</span></Link>
      </section>
    </main>
  );
}
