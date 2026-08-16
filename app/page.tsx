import Link from "next/link";

/* Product screenshots remain uncompressed for UI-text fidelity. */
/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero shell">
        <div className="availability reveal"><span className="availability-dot" aria-hidden="true" /><span><span className="availability-nowrap">Open to roles</span> <span className="availability-nowrap">· Vladimir Deev-Kazanov</span> <span className="availability-nowrap">· Senior Product Designer</span></span></div>
        <h1 className="display reveal delay-1">I turn product insights into <em>clear decisions.</em></h1>
        <div className="hero-bottom reveal delay-2">
          <div className="hero-copy">
            <p>I design B2C, B2B SaaS and fintech—from AI tools for small businesses to payment products for merchants.</p>
            <div className="hero-actions"><a href="#work">View selected works</a><Link href="/cv">View CV</Link></div>
            <span className="proof-line">7+ years · Semrush · Raiffeisen Bank</span>
          </div>
        </div>
      </section>

      <section className="work-section shell section-pad" id="work">
        <div className="section-head"><div><p className="kicker">Selected work</p><p className="section-intro">Three projects showing how I set product boundaries, explain technical choices, and work with incomplete evidence.</p></div></div>
        <div className="project-list">
          <Link href="/work/ai-agent" className="project-card" data-analytics-event="case_open_ai_agent">
            <div className="project-copy"><div><span className="project-no">01</span><span className="tag">AI PRODUCT</span></div><h3>Google Business Profile AI Agent</h3><p>With one week to design, I scoped the agent's first useful loop, made completed work visible, and documented the controls the MVP deferred.</p><span className="role-line">Semrush · MVP launched in 2025<br/>Sole Product Designer</span><span className="text-link">Read case study <b aria-hidden="true">↗</b></span></div>
            <div className="project-visual"><img src="/work/ai-agent/dashboard-mvp.png" width="1020" height="552" loading="lazy" alt="Semrush Google Business Profile AI Agent MVP dashboard" /></div>
          </Link>
          <Link href="/work/raiffeisen-mobile" className="project-card" data-analytics-event="case_open_raiffeisen">
            <div className="project-copy"><div><span className="project-no">02</span><span className="tag">MOBILE FINTECH</span></div><h3>QR payments for merchants and cashiers</h3><p>I replaced technical QR terms with task-based choices and limited cashier access to payment work.</p><span className="role-line">Raiffeisen Bank · 2023<br/>Sole Product Designer</span><span className="text-link">Read case study <b aria-hidden="true">↗</b></span></div>
            <div className="project-visual qr-project-visual"><img src="/work/raiffeisen-mobile/home.png" width="750" height="1298" loading="lazy" alt="Raiffeisen QR merchant app home screen listing one-time, cashier, and reusable QR codes" /></div>
          </Link>
          <Link href="/work/semrush-locations" className="project-card" data-analytics-event="case_open_semrush_locations">
            <div className="project-copy"><div><span className="project-no">03</span><span className="tag">LOCAL SEO</span></div><h3>Semrush Locations Expansion</h3><p>I moved known Google Business Profile opportunities into the Locations list and replaced repeated setup with one bulk action.</p><span className="role-line">Semrush · Bulk release 2025<br/>Sole Product Designer</span><span className="text-link">Read case study <b aria-hidden="true">↗</b></span></div>
            <div className="project-visual"><img src="/work/semrush-locations/bulk-expansion.png" width="1020" height="816" loading="lazy" alt="Semrush Locations dashboard with an Expand your local visibility panel" /></div>
          </Link>
        </div>
      </section>

      <section className="contact shell section-pad" id="contact">
        <h2 className="contact-headline">Looking for a Product Designer for a complex product?</h2>
        <p className="contact-note">I'm based in Cyprus and open to Senior product designer opportunities.</p>
        <div className="contact-actions">
          <a className="contact-cta-primary" href="mailto:vladimirdeev0@gmail.com" data-analytics-event="contact_email">vladimirdeev0@gmail.com</a>
          <a className="contact-cta-secondary" href="https://www.linkedin.com/in/vladimir-deev-kazanov-449a2459/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" data-analytics-event="contact_linkedin">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
