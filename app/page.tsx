import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="home-hero shell">
        <div className="availability reveal"><span /> Available for select projects · Paphos, Cyprus</div>
        <h1 className="display reveal delay-1">I make complex<br />products feel <em>obvious.</em></h1>
        <div className="hero-bottom reveal delay-2">
          <p>Senior Product Designer focused on AI and financial products—turning high-stakes systems into clear, trustworthy experiences.</p>
          <a className="circle-link" href="#work" aria-label="Scroll to selected work">↓</a>
        </div>
      </section>

      <section className="manifesto shell section-pad">
        <p className="kicker">What I do</p>
        <p className="statement">I work where products are complicated, consequences are real, and “just make it simple” is not a strategy.</p>
        <div className="manifesto-meta">
          <span>7+ years in product design</span><span>AI · Fintech · B2B</span><span>Research → shipped product</span>
        </div>
      </section>

      <section className="work-section shell section-pad" id="work">
        <div className="section-head"><p className="kicker">Selected work</p><span>01 project / more soon</span></div>
        <Link href="/work/ai-agent" className="project-card">
          <div className="project-copy">
            <div><span className="project-no">01</span><span className="tag">AI PRODUCT</span></div>
            <h2>An AI agent<br />owners could control</h2>
            <p>From mandate to shipped MVP in four weeks—designing the trust boundaries for invisible automation.</p>
            <span className="text-link">Read case study <b>↗</b></span>
          </div>
          <div className="project-visual">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <img src="/work/ai-agent/dashboard-mvp.png" alt="Semrush AI Agent product dashboard" />
            <span className="metric-stamp"><b>8%</b> landing → configured agent</span>
          </div>
        </Link>
      </section>

      <section className="about shell section-pad">
        <p className="kicker">A little context</p>
        <div className="about-grid">
          <h2>Designer by craft.<br /><em>Translator</em> by nature.</h2>
          <div><p>I’m Vladimir Deev-Kazanov, a Senior Product Designer at Semrush. I combine product analytics, research, rapid prototyping, and close engineering collaboration.</p><p>Before AI and Local SEO, I spent nearly five years making web and mobile banking work better for entrepreneurs at Raiffeisen Bank.</p><Link className="button-link" href="/cv">View full CV <span>↗</span></Link></div>
        </div>
      </section>

      <section className="contact shell section-pad">
        <p className="kicker">Have a difficult product?</p>
        <a href="mailto:vladimirdeev0@gmail.com" className="contact-link">Let’s make it clear. <span>↗</span></a>
      </section>
    </main>
  );
}
