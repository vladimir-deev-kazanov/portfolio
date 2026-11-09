import Link from "next/link";
import Arrow from "./Arrow";
import "./home.css";

/* Product screenshots remain uncompressed for UI-text fidelity. */
/* eslint-disable @next/next/no-img-element */

/*
 * Hero ("Hero Surface Depth": identity block, real portrait, spacing
 * rhythm) styled by app/home.css. Everything below the
 * hero (work-section, contact, footer) is untouched production content.
 * The header/nav is the shared one from layout.tsx (SiteNav) — no local
 * override needed now that the shared header uses the same V/DK + quiet
 * nav design.
 */
export default function Home() {
  return (
      <main id="main-content">
        <section id="top" aria-labelledby="hero-title" className="hsd-hero">
          <div className="hsd-meta-row">
            <span className="hsd-meta-left">
              <span aria-hidden="true" className="hsd-meta-dot" />
              Available for product design roles
            </span>
            <span className="hsd-meta-right">Cyprus</span>
          </div>

          <div className="hsd-hero-grid">
            <div className="hsd-identity">
              <p className="hsd-name">Vladimir Deev-Kazanov</p>
              <p className="hsd-role">Senior Product Designer</p>
            </div>

            <div className="hsd-portrait-wrap">
              <img
                src="/avatar.png"
                width="240"
                height="240"
                fetchPriority="high"
                decoding="async"
                alt="Portrait of Vladimir Deev-Kazanov"
                className="hsd-portrait"
              />
            </div>

            <h1 id="hero-title" className="hsd-title">I turn difficult systems into products people can act on.</h1>

            <div className="hsd-hero-copy-col">
              <p className="hsd-hero-desc hsd-decision-cut">
                Product Designer with 7+ years across fintech, SaaS and AI. I turn technical rules into clear choices, show users what the system is doing, and help them recover when something goes wrong.
              </p>

              <div className="hsd-hero-actions">
                <a href="#work" className="hsd-cta-primary">
                  See selected work
                  <span aria-hidden="true">&#8594;</span>
                </a>
                <Link href="/cv" className="hsd-cta-secondary">View CV</Link>
              </div>

              <ul className="hsd-fact-row">
                <li className="hsd-fact-item">7+ YEARS &middot; SEMRUSH &middot; RAIFFEISEN</li>
                <li className="hsd-fact-item">SELF-SERVICE &middot; FINTECH &middot; SaaS &middot; AI</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="work-section shell section-pad" id="work">
        <div className="section-head"><div><p className="kicker">Selected work</p><p className="section-intro">Three projects showing how I set product boundaries, explain technical choices, and work with incomplete evidence.</p></div></div>
        <div className="project-list">
          <Link href="/work/ai-agent" className="project-card" data-analytics-event="case_open_ai_agent">
            <div className="project-copy"><div><span className="project-no">01</span><span className="tag">AI PRODUCT</span></div><h3>Google Business Profile AI Agent</h3><p>With one week to design, I scoped the agent’s first useful loop, made completed work visible, and documented the controls the MVP deferred.</p><span className="role-line">Semrush · MVP launched in 2025<br/>Sole Product Designer</span><span className="text-link">Read case study<Arrow /></span></div>
            <div className="project-visual"><img src="/work/ai-agent/dashboard-mvp.png" width="1020" height="552" loading="lazy" alt="Semrush Google Business Profile AI Agent MVP dashboard" /></div>
          </Link>
          <Link href="/work/raiffeisen-mobile" className="project-card" data-analytics-event="case_open_raiffeisen">
            <div className="project-copy"><div><span className="project-no">02</span><span className="tag">MOBILE FINTECH</span></div><h3>QR payments for merchants and cashiers</h3><p>I replaced technical QR terms with task-based choices and limited cashier access to payment work.</p><span className="role-line">Raiffeisen Bank · 2023<br/>Sole Product Designer</span><span className="text-link">Read case study<Arrow /></span></div>
            <div className="project-visual qr-project-visual"><img src="/work/raiffeisen-mobile/home.png" width="750" height="1298" loading="lazy" alt="Raiffeisen QR merchant app home screen listing one-time, cashier, and reusable QR codes" /></div>
          </Link>
          <Link href="/work/semrush-locations" className="project-card" data-analytics-event="case_open_semrush_locations">
            <div className="project-copy"><div><span className="project-no">03</span><span className="tag">LOCAL SEO</span></div><h3>Semrush Locations Expansion</h3><p>I moved known Google Business Profile opportunities into the Locations list and replaced repeated setup with one bulk action.</p><span className="role-line">Semrush · Bulk release 2025<br/>Sole Product Designer</span><span className="text-link">Read case study<Arrow /></span></div>
            <div className="project-visual"><img src="/work/semrush-locations/bulk-expansion.png" width="1020" height="816" loading="lazy" alt="Semrush Locations dashboard with an Expand your local visibility panel" /></div>
          </Link>
        </div>
      </section>

        <section className="contact shell section-pad" id="contact">
          <h2 className="contact-headline">Looking for a Product Designer for a complex product?</h2>
          <p className="contact-note">I’m based in Cyprus and open to Senior product designer opportunities.</p>
          <div className="contact-actions">
            <a className="contact-cta-primary" href="mailto:vladimirdeev0@gmail.com" data-analytics-event="contact_email">vladimirdeev0@gmail.com</a>
            <a className="contact-cta-secondary" href="https://www.linkedin.com/in/vladimir-deev-kazanov/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" data-analytics-event="contact_linkedin">LinkedIn<Arrow /></a>
          </div>
        </section>
      </main>
  );
}
