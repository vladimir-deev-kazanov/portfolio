import Link from "next/link";

/* Product screenshots remain uncompressed for UI-text fidelity. */
/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero shell">
        <div className="availability reveal"><span /> Product Designer</div>
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

      <section className="visual-reel" aria-label="Selected Local SEO AI Agent interface details">
        <div className="reel-track">
          <div className="reel-frame reel-a"><img src="/work/ai-agent/dashboard-mvp.png" width="1020" height="552" loading="lazy" alt="MVP Local SEO AI Agent dashboard with performance metrics and completed actions"/></div>
          <div className="reel-frame reel-b"><img src="/work/ai-agent/post-editor.png" width="450" height="882" loading="lazy" alt="Post editor for previewing and changing a scheduled AI post"/></div>
          <div className="reel-frame reel-c"><img src="/work/ai-agent/settings.png" width="570" height="648" loading="lazy" alt="Controls for Local SEO AI Agent activity"/></div>
        </div>
      </section>

      <section className="work-section shell section-pad" id="work">
        <div className="section-head"><div><p className="kicker">Selected work</p><p className="section-intro">Three projects across B2B SaaS and financial products, selected for the decisions and constraints behind the interfaces.</p></div><span>03 projects</span></div>
        <div className="project-list">
          <Link href="/work/ai-agent" className="project-card">
            <div className="project-copy"><div><span className="project-no">01</span><span className="tag">LOCAL SEO</span></div><h2>Local SEO AI Agent</h2><p>Designing the autonomy boundaries of an agent that maintains a small business’s Google Business Profile—under a four-week MVP deadline.</p><span className="role-line">Semrush · 2025–2026<br/>Sole Product Designer</span><span className="text-link">Read the Local SEO AI Agent case <b>↗</b></span></div>
            <div className="project-visual"><img src="/work/ai-agent/dashboard-mvp.png" width="1020" height="552" loading="lazy" alt="Semrush Local SEO AI Agent MVP dashboard" /></div>
          </Link>
          <a href="https://volodyalovesyou.tilda.ws/web-banking" className="project-card text-project web-project" target="_blank" rel="noreferrer">
            <div className="project-copy"><div><span className="project-no">02</span><span className="tag">FINTECH</span></div><h2>Web banking for entrepreneurs</h2><p>Turning branch- and support-dependent business-banking tasks into guided self-service flows.</p><span className="role-line">Raiffeisen Bank · 2021–2022<br/>Product Designer</span><span className="text-link">Explore the web banking work <b>↗</b></span></div>
          </a>
          <Link href="/work/raiffeisen-mobile" className="project-card">
            <div className="project-copy"><div><span className="project-no">03</span><span className="tag">MOBILE FINTECH</span></div><h2>Mobile banking for entrepreneurs</h2><p>Translating technical payment-system concepts into task-based QR payment flows for business owners and cashiers.</p><span className="role-line">Raiffeisen Bank · 2023<br/>Product Designer</span><span className="text-link">Read the mobile banking case <b>↗</b></span></div>
            <div className="project-visual qr-project-visual" aria-hidden="true"><div className="qr-card-stack"><div className="qr-card qr-card-back"><span>Reusable</span><b>Same price, many payments</b></div><div className="qr-card qr-card-front"><span>Cashier QR</span><b>Set amount → create code</b><i>Payment received</i></div></div></div>
          </Link>
        </div>
      </section>

      <section className="additional shell section-pad">
        <p className="kicker">Additional work</p>
        <a href="https://volodyalovesyou.tilda.ws/crm" target="_blank" rel="noreferrer" className="work-row"><span>Corporate CRM for relationship managers<small>Raiffeisen Bank · B2B SaaS · 2019–2021</small></span><p>A workspace for client portfolios, product opportunities, tasks, goals, and profitability.</p><b>↗</b></a>
        <a href="https://volodyalovesyou.tilda.ws/open-self-employed" target="_blank" rel="noreferrer" className="work-row"><span>Banking for self-employed workers<small>Otkritie Bank · Research and product concepts</small></span><p>Research and mobile-banking concepts shaped around the financial realities of self-employed people.</p><b>↗</b></a>
      </section>

      <section className="about shell section-pad" id="about">
        <p className="kicker">About</p>
        <div className="about-grid">
          <h2>Complex products need clear decisions.<br/><em>Not more confusion.</em></h2>
          <div><p>I’m a Product Designer with 7+ years of experience in Fintech and B2B SaaS. At Semrush, I design Local SEO tools that help small businesses manage their online presence. Previously, at Raiffeisen Bank, I designed web and mobile banking for entrepreneurs and a CRM for relationship managers.</p><p>I work from problem framing and research through flows, prototypes, product analytics, and implementation review. I’m most useful when difficult rules, high-stakes actions, or automation must feel clear before people can trust the product.</p><Link className="button-link" href="/cv">See experience and education <span>↗</span></Link></div>
        </div>
      </section>

      <section className="contact shell section-pad" id="contact">
        <p className="kicker">Contact</p>
        <a href="mailto:vladimirdeev0@gmail.com" className="contact-link">Let’s make a complex product easier to use. <span>↗</span></a>
        <div className="contact-meta"><a href="mailto:vladimirdeev0@gmail.com">vladimirdeev0@gmail.com</a><a href="https://www.linkedin.com/in/vladimir-deev-kazanov-449a2459/" target="_blank" rel="noreferrer">LinkedIn ↗</a><Link href="/cv">View CV ↗</Link></div>
      </section>
    </main>
  );
}
