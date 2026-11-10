import Link from "next/link";
import Arrow from "./Arrow";
import Pic from "./work/Pic";
import "./home.css";

export default function Home() {
  return (
    <main id="main-content">
      <section id="top" aria-labelledby="hero-title" className="hsd-hero">
        <div className="hsd-hero-grid">
          <div className="hsd-identity">
            <p className="hsd-name">Vladimir Deev-Kazanov</p>
            <p className="hsd-role">Senior Product Designer · Cyprus · open to roles</p>
          </div>

          <div className="hsd-portrait-wrap">
            <Pic priority name="avatar" alt="Portrait of Vladimir Deev-Kazanov" sizes="240px" className="hsd-portrait" />
          </div>

          <h1 id="hero-title" className="hsd-title">I design products where users hand work to a system and need to know what it did.</h1>

          <div className="hsd-hero-copy-col">
            <p className="hsd-hero-desc">
              An AI agent that posts to small businesses’ Google profiles at Semrush. QR payments for merchants at Raiffeisen Bank. 7+ years, based in Cyprus.
            </p>

            <div className="hsd-hero-actions">
              <a href="#work" className="hsd-cta-primary">
                See selected work
                <span aria-hidden="true">&#8594;</span>
              </a>
              <Link href="/cv" className="hsd-cta-secondary">View CV</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="work-section shell" id="work" aria-labelledby="work-title">
        <h2 id="work-title" className="kicker">Three projects</h2>
        <div className="project-list">
          <article className="project-card project-card-lead">
            <div className="project-copy">
              <span className="tag">AI product</span>
              <h3><Link className="project-link" href="/work/ai-agent" data-analytics-event="case_open_ai_agent">Google Business Profile AI Agent, Semrush</Link></h3>
              <p>One design week before a conference launch. I cut the MVP to connect, configure, and see what the agent did, and deferred preview and editing.</p>
              <p className="project-outcome"><b>Outcome</b>8% of landing-page visitors paid for and configured the agent in month one. My later onboarding step lifted weekly first-time activations by 50%.</p>
              <span className="role-line">MVP launched 2025 · Sole Product Designer</span>
            </div>
            <div className="project-visual"><Pic name="ai-agent/dashboard-mvp" alt="Semrush Google Business Profile AI Agent MVP dashboard" sizes="(max-width: 800px) 89vw, 580px" /></div>
          </article>
          <article className="project-card">
            <div className="project-copy">
              <span className="tag">Mobile fintech</span>
              <h3><Link className="project-link" href="/work/raiffeisen-mobile" data-analytics-event="case_open_raiffeisen">QR payments for merchants, Raiffeisen Bank</Link></h3>
              <p>In UX tests, merchants didn’t understand dynamic and static QR codes. I renamed them by task, replaced the default tab with an explained chooser, and gave cashiers payment-only access.</p>
              <p className="project-outcome"><b>Outcome</b>Shipped to production. Reusable QR creation rose 17% in the first month.</p>
              <span className="role-line">2023 · Sole Product Designer</span>
            </div>
            <div className="project-visual qr-project-visual"><Pic name="raiffeisen-mobile/screens/one-type-en" alt="Choose a QR code type screen listing one-time, reusable, and cashier codes, each with a plain-language description" sizes="280px" /></div>
          </article>
          <article className="project-card">
            <div className="project-copy">
              <span className="tag">Local SEO</span>
              <h3><Link className="project-link" href="/work/semrush-locations" data-analytics-event="case_open_semrush_locations">Locations bulk setup, Semrush</Link></h3>
              <p>Semrush already recognised users’ other businesses but showed them only after Add location. I surfaced them on the Locations page and designed bulk setup that keeps successful adds when some fail.</p>
              <p className="project-outcome"><b>Outcome</b>Users adding 2+ locations spiked after launch, then returned near the earlier level.</p>
              <span className="role-line">Bulk release 2025 · Sole Product Designer</span>
            </div>
            <div className="project-visual"><Pic name="semrush-locations/bulk-expansion" alt="Semrush Locations dashboard with an Expand your local visibility panel" sizes="(max-width: 800px) 89vw, 580px" /></div>
          </article>
        </div>
      </section>

      <section className="how-i-work shell" aria-labelledby="how-title">
        <h2 id="how-title">How I work</h2>
        <p>
          I design products where software acts on someone’s behalf: an agent posting to a business’s Google profile, a QR code that takes a merchant’s payment. The question I keep coming back to is where the user’s control ends and how they find out.
        </p>
        <p>
          On the Semrush agent we shipped the dashboard before the edit button, and the feedback we got was that owners wanted to see planned posts before they went out. I’d make that call again under the same deadline, but I’d measure it differently.
        </p>
      </section>

      <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
        <div className="shell">
          <h2 id="contact-title" className="contact-headline">Hiring for AI or fintech product design? Email me.</h2>
          <p className="contact-note">I’m based in Cyprus and open to Senior product designer opportunities.</p>
          <div className="contact-actions">
            <a className="contact-cta-primary" href="mailto:vladimirdeev0@gmail.com" data-analytics-event="contact_email">vladimirdeev0@gmail.com</a>
            <a className="contact-cta-secondary" href="https://www.linkedin.com/in/vladimir-deev-kazanov/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" data-analytics-event="contact_linkedin">LinkedIn<Arrow /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
