import Link from "next/link";
import Arrow from "./Arrow";
import Pic, { fullSize } from "./work/Pic";
import VideoPlayer from "./work/VideoPlayer";
import { CASES, type CaseInfo } from "./work/cases";
import "./home.css";

export default function Home() {
  return (
    <main id="main-content">
      <section id="top" aria-labelledby="hero-title" className="hsd-hero">
        <div className="hsd-hero-grid">
          <div className="hsd-identity">
            <p className="hsd-name">Vladimir <span className="hsd-nowrap">Deev-Kazanov</span></p>
            <p className="hsd-role">Senior Product Designer · Cyprus · Open to roles</p>
          </div>

          <div className="hsd-portrait-wrap">
            <Pic priority name="avatar" alt="Portrait of Vladimir Deev-Kazanov" sizes="(min-width: 880px) 240px, 80px" className="hsd-portrait" />
          </div>

          <h1 id="hero-title" className="hsd-title">I design how people decide, delegate, and recover.</h1>

          <div className="hsd-hero-copy-col">
            <p className="hsd-hero-desc">7+ years designing products at Semrush and Raiffeisen Bank.</p>

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

      <section className="work-section shell" id="work" aria-label="Selected work">
        <div className="project-list">
          <ProjectCard info={CASES.aiAgent} event="case_open_ai_agent" lead outcome="8% of landing-page visitors paid for and configured the agent in month one. After I added an onboarding step, weekly first-time activations were 50% higher than the month before.">
            <div className="project-clip"><VideoPlayer src="/work/ai-agent/motion/edit-post.mp4" poster={fullSize("ai-agent/clip-edit-post")} width={1020} height={930} alt="Prototype recording: opening a scheduled post from the actions list, rewriting its text and saving" /></div>
          </ProjectCard>
          <ProjectCard info={CASES.raiffeisen} event="case_open_raiffeisen">
            <div className="project-clip phone"><VideoPlayer src="/work/raiffeisen-mobile/motion/qr-flow.mp4" poster={fullSize("raiffeisen-mobile/clip-qr-flow")} width={750} height={1624} alt="Prototype recording: from the QR payments screen, tapping Create QR code, choosing Single-use, entering 3,000 roubles and creating the code" /></div>
          </ProjectCard>
          <ProjectCard info={CASES.locations} event="case_open_semrush_locations">
            <div className="project-shot"><Pic name="semrush-locations/bulk-expansion" alt="Semrush Locations dashboard with an Expand your local visibility panel" sizes="(min-width: 1250px) 580px, (min-width: 800px) 46vw, 86vw" /></div>
          </ProjectCard>
        </div>
      </section>

      <section className="how-i-work shell" aria-labelledby="how-title">
        <h2 id="how-title">How I work</h2>
        <p>
          When time is fixed, I agree the cut with the product owner and design the loop that’s left: one design week for the Semrush agent meant deferring editing and shipping a dashboard of what it did.
        </p>
        <p>
          I change designs on evidence. Five merchant UX tests at Raiffeisen changed how QR types were named; feedback sent from the agent page shaped its next release. With engineers I keep scope shippable: bulk location setup reused existing components and accepted a 20-location cap. When there’s no analyst, I run the funnel myself in GA4 and SQL.
        </p>
      </section>

      <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
        <div className="shell">
          <h2 id="contact-title" className="contact-headline">Looking for a Product Designer for a complex product?</h2>
          <p className="contact-note">I’m based in Cyprus and open to Senior Product Designer roles.</p>
          <div className="contact-actions">
            <a className="contact-cta-primary" href="mailto:vladimirdeev0@gmail.com" data-analytics-event="contact_email">vladimirdeev0@gmail.com</a>
            <a className="contact-cta-secondary" href="https://www.linkedin.com/in/vladimir-deev-kazanov/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" data-analytics-event="contact_linkedin">LinkedIn<Arrow /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectCard({ info, event, lead = false, outcome, visualClass = "", children }: { info: CaseInfo; event: string; lead?: boolean; outcome?: string; visualClass?: string; children: React.ReactNode }) {
  return (
    <article className={`project-card${lead ? " project-card-lead" : ""}`}>
      <div className="project-copy">
        <h3><Link className="project-link" href={info.href} data-analytics-event={event}>{info.title}</Link></h3>
        <p>{info.summary}</p>
        <p className="project-outcome"><b>Outcome</b>{outcome ?? info.outcome}</p>
        <span className="role-line">{info.role}</span>
      </div>
      <div className={`project-visual ${visualClass}`.trim()}>{children}</div>
    </article>
  );
}
