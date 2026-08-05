import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="home-hero shell">
        <div className="availability reveal"><span /> Senior Product Designer · Paphos, Cyprus</div>
        <h1 className="display reveal delay-1">Hi, I’m Vladimir.<br />I design clarity<br/><em>into complexity.</em></h1>
        <div className="hero-bottom reveal delay-2">
          <p>For 7+ years, I’ve made AI and financial products easier to understand, trust, and use—from first idea to shipped experience.</p>
          <a className="circle-link" href="#work" aria-label="Scroll to selected work">↓</a>
        </div>
      </section>

      <section className="visual-reel" aria-label="Selected AI Agent interface details">
        <div className="reel-track">
          <div className="reel-frame reel-a"><img src="/work/ai-agent/dashboard-mvp.png" alt="AI Agent dashboard"/></div>
          <div className="reel-frame reel-b"><img src="/work/ai-agent/post-editor.png" alt="AI Agent post editor"/></div>
          <div className="reel-frame reel-c"><img src="/work/ai-agent/settings.png" alt="AI Agent settings"/></div>
        </div>
      </section>

      <section className="manifesto shell section-pad">
        <p className="kicker">What I do</p>
        <p className="statement">I turn tangled systems into products people can understand—and decisions teams can stand behind.</p>
        <div className="manifesto-meta">
          <span>7+ years in product design</span><span>AI · Fintech · B2B</span><span>Research → shipped product</span>
        </div>
      </section>

      <section className="work-section shell section-pad" id="work">
        <div className="section-head"><p className="kicker">Selected work</p><span>01 project / more soon</span></div>
        <Link href="/work/ai-agent" className="project-card">
          <div className="project-copy">
            <div><span className="project-no">01</span><span className="tag">AI PRODUCT</span></div>
            <h2>Making invisible AI work feel visible</h2>
            <p>From mandate to shipped MVP in four weeks—designing an autonomous Local SEO agent that small-business owners could understand and control.</p>
            <span className="text-link">Read case study <b>↗</b></span>
          </div>
          <div className="project-visual">
            <img src="/work/ai-agent/dashboard-mvp.png" alt="Semrush AI Agent product dashboard" />
            <span className="metric-stamp"><b>8%</b> landing → configured agent</span>
          </div>
        </Link>
      </section>

      <section className="about shell section-pad">
        <p className="kicker">A little context</p>
        <div className="about-grid">
          <h2>Strategy in one hand.<br/><em>Craft</em> in the other.</h2>
          <div><p>I’m Vladimir Deev-Kazanov, a Senior Product Designer at Semrush. I combine product analytics, research, rapid prototyping, and close engineering collaboration.</p><p>Before AI and Local SEO, I spent nearly five years making web and mobile banking work better for entrepreneurs at Raiffeisen Bank.</p><Link className="button-link" href="/cv">View full CV <span>↗</span></Link></div>
        </div>
      </section>

      <section className="contact shell section-pad">
        <p className="kicker">Have a difficult product?</p>
        <a href="mailto:vladimirdeev0@gmail.com" className="contact-link">Let’s talk. <span>↗</span></a>
      </section>
    </main>
  );
}
