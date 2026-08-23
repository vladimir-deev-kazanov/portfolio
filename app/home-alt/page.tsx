import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "../Arrow";
import "./hero-surface-depth.css";

/*
 * Draft alternative homepage. Lives at /home-alt, does not affect "/" or
 * the production build's default route. Safe to experiment on freely —
 * remove this whole app/home-alt/ folder when done, or promote it by
 * copying its contents into app/page.tsx.
 *
 * Hero implemented from Claude Design: "Hero Surface Depth".
 */

/* eslint-disable @next/next/no-img-element */

export const metadata: Metadata = {
  title: "Home (draft)",
  robots: { index: false, follow: false },
};

export default function HomeAlt() {
  return (
    <div className="hsd-page">
      <div className="hsd-nav-wrap">
        <div className="hsd-nav-inner">
          <a href="#top" aria-label="Vladimir Deev-Kazanov — home" className="hsd-mark-link">
            <span className="hsd-mark">V/DK</span>
          </a>
          <nav aria-label="Primary navigation" className="hsd-nav">
            <a href="#depth" aria-current="page" className="hsd-nav-link is-active"><span className="hsd-nav-label">Work</span></a>
            <Link href="/cv" className="hsd-nav-link"><span className="hsd-nav-label">CV</span></Link>
            <a href="#contact" className="hsd-nav-link"><span className="hsd-nav-label">Contact</span></a>
          </nav>
        </div>
      </div>

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

            <h1 id="hero-title" className="hsd-title">Decisions that help businesses move forward.</h1>

            <div className="hsd-hero-copy-col">
              <p className="hsd-hero-desc hsd-decision-cut">
                Across fintech, SaaS and AI, I turn complex systems into clear actions and straightforward products. I make technical rules understandable, show what the system is doing, and design ways to recover when something goes wrong.
              </p>

              <div className="hsd-hero-actions">
                <a href="#depth" className="hsd-cta-primary">
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

        <section id="depth" aria-label="Selected work" className="hsd-cards-section">
          <div className="hsd-cards-inner">
            <div className="hsd-card-list">

              <Link href="/work/ai-agent" className="hsd-card">
                <div className="hsd-card-text">
                  <div className="hsd-card-top">
                    <span className="hsd-card-number">01</span>
                    <span className="hsd-card-domain">AI PRODUCT</span>
                  </div>
                  <h2 className="hsd-card-title">Google Business Profile AI Agent</h2>
                  <p className="hsd-card-desc">Focus a four-week MVP on one loop owners could follow.</p>
                  <p className="hsd-card-outcome">MVP shipped &middot; 8% reached the configured dashboard</p>
                  <p className="hsd-card-meta">Initial measurement period; no baseline or available absolute sample size.</p>
                  <span className="hsd-card-cta">
                    View case
                    <span aria-hidden="true">&#8594;</span>
                  </span>
                </div>
                <div className="hsd-card-media is-mist">
                  <img
                    src="/work/ai-agent/dashboard-mvp-full.png"
                    width="2040"
                    height="1232"
                    fetchPriority="high"
                    decoding="async"
                    alt="AI Agent dashboard showing Active status, weekly performance, and a list of recently completed actions"
                  />
                </div>
              </Link>

              <Link href="/work/raiffeisen-mobile" className="hsd-card">
                <div className="hsd-card-text">
                  <div className="hsd-card-top">
                    <span className="hsd-card-number">02</span>
                    <span className="hsd-card-domain">MOBILE FINTECH</span>
                  </div>
                  <h2 className="hsd-card-title">QR payments for merchants and cashiers</h2>
                  <p className="hsd-card-desc">Replace payment-system terms with choices merchants understand.</p>
                  <p className="hsd-card-outcome">Shipped &middot; Reusable QR creation increased 17% in month one</p>
                  <p className="hsd-card-meta">Raiffeisen Bank &middot; 2023 &middot; Sole Product Designer</p>
                  <span className="hsd-card-cta">
                    View case
                    <span aria-hidden="true">&#8594;</span>
                  </span>
                </div>
                <div className="hsd-card-media is-clay-wash">
                  <img
                    src="/work/raiffeisen-mobile/home.png"
                    width="750"
                    height="1298"
                    loading="lazy"
                    decoding="async"
                    alt="Raiffeisen QR merchant app home screen listing one-time, cashier, and reusable QR codes"
                  />
                </div>
              </Link>

              <Link href="/work/semrush-locations" className="hsd-card">
                <div className="hsd-card-text">
                  <div className="hsd-card-top">
                    <span className="hsd-card-number">03</span>
                    <span className="hsd-card-domain">LOCAL SEO</span>
                  </div>
                  <h2 className="hsd-card-title">Semrush Locations Expansion</h2>
                  <p className="hsd-card-desc">Show known businesses earlier. Add several without starting over.</p>
                  <p className="hsd-card-outcome">Shipped &middot; Bulk setup for up to 20 locations</p>
                  <p className="hsd-card-meta">Semrush &middot; Bulk release 2025 &middot; Sole Product Designer</p>
                  <span className="hsd-card-cta">
                    View case
                    <span aria-hidden="true">&#8594;</span>
                  </span>
                </div>
                <div className="hsd-card-media is-lavender">
                  <img
                    src="/work/semrush-locations/bulk-expansion.png"
                    width="2040"
                    height="1632"
                    loading="lazy"
                    decoding="async"
                    alt="Semrush Locations dashboard showing a recognised business and an Expand your local visibility panel offering bulk setup for nearby locations"
                  />
                </div>
              </Link>

            </div>
          </div>
        </section>

        <section className="contact shell section-pad" id="contact">
          <h2 className="contact-headline">Building a complex product?<br />Let&rsquo;s talk.</h2>
          <p className="contact-note">I&rsquo;m based in Cyprus and open to Senior Product Designer roles.</p>
          <div className="contact-actions">
            <a className="contact-cta-primary" href="mailto:vladimirdeev0@gmail.com" data-analytics-event="contact_email">Email me</a>
            <a className="contact-cta-secondary" href="https://www.linkedin.com/in/vladimir-deev-kazanov/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" data-analytics-event="contact_linkedin">LinkedIn<Arrow /></a>
          </div>
          <p className="hsd-personal-line">Freediving teaches me to stay calm, focus on the next decision and avoid unnecessary movement.</p>
        </section>
      </main>
    </div>
  );
}
