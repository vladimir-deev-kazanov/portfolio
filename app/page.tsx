import Link from "next/link";

/* Product screenshots remain uncompressed for UI-text fidelity. */
/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero shell">
        <div className="availability reveal"><span /> Vladimir Deev-Kazanov · Product Designer</div>
        <h1 className="display reveal delay-1">I make complex products<br/><em>clear and trustworthy.</em></h1>
        <div className="hero-bottom reveal delay-2">
          <div className="hero-copy">
            <p>I design Fintech and B2B SaaS products—from Local SEO automation for small businesses to high-stakes banking workflows for entrepreneurs.</p>
            <div className="hero-actions"><a href="#work">View selected work</a><Link href="/cv">View CV</Link></div>
            <span className="proof-line">7+ years · Semrush · Raiffeisen Bank</span>
          </div>
          <a className="circle-link" href="#work" aria-label="Scroll to selected work">↓</a>
        </div>
      </section>

      <section className="work-section shell section-pad" id="work">
        <div className="section-head"><div><p className="kicker">Selected work</p><p className="section-intro">Two projects across B2B SaaS and financial products, selected for the decisions and constraints behind the interfaces.</p></div><span>02 projects</span></div>
        <div className="project-list">
          <Link href="/work/ai-agent" className="project-card">
            <div className="project-copy"><div><span className="project-no">01</span><span className="tag">LOCAL SEO</span></div><h2>Local SEO AI Agent</h2><p>Designing the autonomy boundaries of an agent that maintains a small business’s Google Business Profile—under a four-week MVP deadline.</p><span className="role-line">Semrush · 2025–2026<br/>Product Designer</span><span className="text-link">Read the Local SEO AI Agent case <b>↗</b></span></div>
            <div className="project-visual"><img src="/work/ai-agent/dashboard-later.png" width="1020" height="900" loading="lazy" alt="Semrush Local SEO AI Agent MVP dashboard" /></div>
          </Link>
          <Link href="/work/raiffeisen-mobile" className="project-card">
            <div className="project-copy"><div><span className="project-no">02</span><span className="tag">MOBILE FINTECH</span></div><h2>Mobile banking for entrepreneurs</h2><p>Translating technical payment-system concepts into task-based QR payment flows for business owners and cashiers.</p><span className="role-line">Raiffeisen Bank · 2023<br/>Product Designer</span><span className="text-link">Read the mobile banking case <b>↗</b></span></div>
            <div className="project-visual qr-project-visual"><img src="/work/raiffeisen-mobile/home.png" width="563" height="2076" loading="lazy" alt="Raiffeisen QR merchant app home screen listing one-time, cashier, and reusable QR codes" /></div>
          </Link>
        </div>
      </section>

      <section className="additional shell section-pad">
        <p className="kicker">Additional work</p>
        <a href="https://volodyalovesyou.tilda.ws/crm" target="_blank" rel="noreferrer" className="work-row"><span>Corporate CRM for relationship managers<small>Raiffeisen Bank · B2B SaaS · 2019–2021</small></span><p>A workspace for client portfolios, product opportunities, tasks, goals, and profitability.</p><b>↗</b></a>
        <a href="https://volodyalovesyou.tilda.ws/open-self-employed" target="_blank" rel="noreferrer" className="work-row"><span>Banking for self-employed workers<small>Otkritie Bank · Research and product concepts</small></span><p>Research and mobile-banking concepts shaped around the financial realities of self-employed people.</p><b>↗</b></a>
      </section>

      <section className="contact shell section-pad" id="contact">
        <p className="kicker">Contact</p>
        <h2 className="contact-link">Let’s make a complex product easier to use.</h2>
      </section>
    </main>
  );
}
