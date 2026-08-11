import type { Metadata } from "next";
import Link from "next/link";

/* Product screenshots remain uncompressed; the current Sites image runtime is not reliable in local preview. */
/* eslint-disable @next/next/no-img-element */

export const metadata: Metadata = {
  title: "Google Business Profile AI Agent case study",
  description: "How I scoped a Google Business Profile agent, made its work visible, measured activation, and designed the controls deferred from the MVP.",
};

const images = {
  mvp: { src: "/work/ai-agent/dashboard-mvp-full.png", width: 2040, height: 1232 },
  later: { src: "/work/ai-agent/dashboard-later.png", width: 1020, height: 900 },
  editor: { src: "/work/ai-agent/post-editor.png", width: 2000, height: 1616 },
  settings: { src: "/work/ai-agent/settings.png", width: 570, height: 648 },
  landing: { src: "/work/ai-agent/landing-page.png", width: 2564, height: 1617 },
  setup: { src: "/work/ai-agent/setup.png", width: 1200, height: 1920 },
};

type ProductImageProps = {
  image: keyof typeof images;
  alt: string;
  className?: string;
  priority?: boolean;
};

function ProductImage({ image, alt, className = "", priority = false }: ProductImageProps) {
  const asset = images[image];
  return (
    <div className={`case-stage case-stage-${image} ${className}`}>
      <img src={asset.src} width={asset.width} height={asset.height} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
    </div>
  );
}

function Decision({ no, title, eyebrow, tone = false, children }: { no: string; title: string; eyebrow: string; tone?: boolean; children: React.ReactNode }) {
  return (
    <section className={`decision-section ${tone ? "tone" : ""}`} aria-labelledby={`decision-${no}`} {...(no === "01" ? { "data-analytics-event": "case_decision_ai_agent", "data-analytics-observe": true } : {})}>
      <div className="shell">
        <div className="decision-head"><span>Decision {no}</span><h2 id={`decision-${no}`}>{title}</h2></div>
        <div className="decision-body"><p className="kicker">{eyebrow}</p><div className="decision-copy">{children}</div></div>
      </div>
    </section>
  );
}

function Alternatives({ rejected, chosen }: { rejected: string; chosen: string }) {
  return <div className="compare" aria-label="Alternative comparison"><p><b>Credible alternative</b><span>{rejected}</span></p><p className="chosen"><b>Chosen direction</b><span>{chosen}</span></p></div>;
}

export default function CaseStudy() {
  return <main id="main-content" className="case-page"><article>
    <header className="case-hero shell">
      <Link className="case-back reveal" href="/#work">← Back to projects</Link>
      <div className="case-meta reveal"><span>Semrush · 2025</span><span>1 week design · 4 weeks to MVP</span><span>Sole Product Designer</span></div>
      <h1 className="reveal delay-1">I cut an AI agent to one useful loop—and <em>exposed its limits.</em></h1>
      <p className="reveal delay-2">With one week to design, I helped define what the MVP would do, what owners could see, and which controls had to wait.</p>
      <ProductImage image="mvp" priority alt="MVP Google Business Profile AI Agent dashboard showing Views, Interactions, Average Rating, and a Recent Actions list" />
    </header>

    <section className="case-section shell snapshot-section" aria-labelledby="snapshot-title">
      <div><p className="kicker">Project snapshot</p><h2 id="snapshot-title">Scope and ownership</h2></div>
      <dl>
        <dt>Product</dt><dd>Google Business Profile AI Agent</dd>
        <dt>Duration</dt><dd>4 weeks: 1 week of design, followed by build and iteration</dd>
        <dt>Team</dt><dd>Product owner, 2 frontend engineers, 2 backend engineers, QA, and me; no dedicated analyst</dd>
        <dt>I owned</dt><dd>Product design, user flows, interactions, and user-facing feature behaviour</dd>
        <dt>We decided together</dt><dd>The product owner and I agreed on the minimum valuable scope and launch cuts</dd>
        <dt>Not mine</dt><dd>The AI initiative, model architecture, model-quality training, pricing, and landing-page copy</dd>
        <dt>System</dt><dd>Desktop web, built with the Semrush UI kit</dd>
        <dt>Status</dt><dd>Shipped; activation measured; product expanded after the MVP</dd>
      </dl>
    </section>

    <section className="case-punch" aria-labelledby="glance-title"><div className="shell">
      <p className="kicker">At a glance</p><h2 id="glance-title">Make the agent's work visible without teaching owners Local SEO.</h2>
      <div className="glance-grid">
        <p><b>The problem</b><span>Leadership had chosen an AI agent, but the first useful MVP boundary was still open.</span></p>
        <p><b>My decisions</b><span>Show completed work, focus the dashboard on understandable signals, and let owners change the publishing schedule.</span></p>
        <p><b>The result</b><span>8% of landing-page viewers reached a configured dashboard. This measured activation only; no target or absolute sample is preserved.</span></p>
      </div>
    </div></section>

    <section className="case-section shell orientation" aria-labelledby="brief-title">
      <div><p className="kicker">Brief and orientation</p><h2 id="brief-title">Leadership chose the agent. We still had to define the first useful release.</h2></div>
      <div className="reading-copy">
        <p className="case-lede">Top management had already decided that Semrush would build an AI agent. The product owner set the direction and outlined the first capabilities. We did not compare an agent with checklists, templates, or a managed service.</p>
        <p>My job was to turn that mandate into a product a small-business owner could operate. The agent maintained the owner's Google business listing by publishing posts and photos and preparing review replies. Because these actions appeared publicly under the business's name, owners needed to know what the agent had done and where their control ended.</p>
        <p>The product launched at half the price of the full Local SEO subscription. This was commercial positioning, not evidence that price caused activation or later growth.</p>
        <ol className="flow-list" aria-label="Product flow">{["Landing", "Google sign-in", "Profile analysis", "Audit", "Payment", "Setup", "Dashboard"].map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol>
      </div>
    </section>

    <Decision no="01" title="Ship proof of execution before full control" eyebrow="Cut scope without hiding the agent's work">
      <p><strong>The challenge.</strong> A more complete release would let owners preview and edit generated content and give the agent custom instructions. The conference deadline left one design week. Preview, editing, and custom instructions would put the launch scope at risk, so the product owner and I deferred them.</p>
      <Alternatives rejected="Include preview, editing, and user instructions in the MVP. This offered more control but increased scope before a fixed launch." chosen="Connect a profile, configure the agent, and see completed posts, photos, and review tasks on the dashboard." />
      <p><strong>What I owned.</strong> I designed the flow and worked with the product owner to separate the minimum useful loop from the features we would defer.</p>
      <p><strong>Why.</strong> The shorter loop could establish whether people activated an autonomous workflow and reached the operating dashboard. It protected the fixed launch while still giving the agent a visible job to perform.</p>
      <blockquote><b>Trade-off accepted:</b> owners could confirm that the agent had acted, but they could not inspect or fix its output inside Semrush.</blockquote>
      <p><strong>Validation status.</strong> The product shipped, but the MVP did not let an owner repair successfully published bad or repetitive content inside Semrush. They had to correct it directly in Google. Technical publication failures followed a separate path: automatic retry, a service-status message if the retry failed, then later resumption without owner action.</p>
      <div className="failure-grid"><p><b>Technical failure</b><span>Retry → service status → resume.</span></p><p><b>Wrong public result</b><span>No in-product MVP recovery → correct in Google.</span></p></div>
      <div className="decision-screens"><div><span className="image-label">Landing page · entry point</span><ProductImage image="landing" alt="Local SEO AI Agent landing page introducing the product and its value" /></div><div><span className="image-label">Agent setup · control boundary</span><ProductImage image="setup" alt="AI Agent setup screen for configuring automated Local SEO activity" /></div></div>
    </Decision>

    <Decision no="02" title="Make the dashboard answer ‘What did the agent do?’" eyebrow="Show completed and planned work" tone>
      <p><strong>The challenge.</strong> The short setup kept activation manageable, but it moved complexity into the background. After setup, owners needed proof that the agent was working, without inheriting a professional Local SEO dashboard.</p>
      <Alternatives rejected="Expose a broader SEO control panel with more specialist measures and controls." chosen="Use three familiar Google measures—views, interactions, and average rating—and a chronological list of completed actions." />
      <p><strong>What I owned.</strong> I designed the post-activation dashboard, its metric hierarchy, activity model, and interactions.</p>
      <p><strong>Why.</strong> Small-business owners already had operational work to do. The AI would handle the specialist tasks; the owner would monitor Views, Interactions, Average Rating, and concrete agent actions instead of operating another toolkit.</p>
      <blockquote><b>Trade-off accepted:</b> the focused version reduced analytical depth. In return, owners could see what changed without learning another marketing toolkit.</blockquote>
      <ProductImage image="mvp" alt="MVP AI Agent dashboard showing Views, Interactions, Average Rating, and a Recent Actions list" />
      <div className="annotations"><p><b>Outcomes</b>Three familiar Google metrics instead of an SEO control panel.</p><p><b>Proof</b>Recent Actions made background execution visible.</p><p><b>Limit</b>Owners saw content only after the action happened.</p></div>
      <h3>The next iteration needed foresight, not more metrics.</h3>
      <p>After launch, Average Rating was removed because it changed too slowly to justify permanent space. Later feedback asked to see planned content before publication rather than add more metrics. The later dashboard added upcoming work and previews above recent actions.</p>
      <p><strong>Validation status.</strong> Later feedback asked for previews of planned content rather than more metrics; the feedback method and sample are not preserved. I treat the later preview and editing work as a product iteration, not as a quantified trust improvement.</p>
    </Decision>

    <Decision no="03" title="Keep publishing cadence adjustable" eyebrow="Let businesses change the schedule">
      <p><strong>The challenge.</strong> Defaults were necessary because many owners would never open settings, but business rhythms differ. A café may have frequent events; a watchmaker or plumber may have few meaningful updates.</p>
      <Alternatives rejected="Use one fixed schedule for every business. It reduced interface and operational complexity but increased the risk of repetitive content for businesses with fewer updates." chosen="Start with defaults and let the owner adjust the publication cadence." />
      <p><strong>What I owned.</strong> I designed the cadence controls and how owners managed automated activity. Routine publication types initially ran every seven days; review drafts were prepared within an hour.</p>
      <p><strong>Why.</strong> Frequency had to remain part of the owner’s control boundary. The initial rhythm drew on Google Business Profile community best-practice guidance, not a formal Google frequency rule.</p>
      <blockquote><b>Trade-off accepted:</b> adjustable settings increased product complexity. In return, the schedule stayed inside the owner's control boundary.</blockquote>
      <p><strong>Validation status.</strong> We did not establish that changing frequency improved Google ranking or reduced repetitive content.</p>
      <div className="state-toggle">
        <input className="state-radio" type="radio" name="settings-state" id="settings-on" defaultChecked />
        <input className="state-radio" type="radio" name="settings-state" id="settings-off" />
        <div className="state-tabs" role="group" aria-label="Settings states">
          <label htmlFor="settings-on">Automations on</label>
          <label htmlFor="settings-off">Automations off</label>
        </div>
        <div className="case-stage case-stage-settings state-stage">
          <img className="state-on" src="/work/ai-agent/settings-enabled.png" width={2000} height={1408} loading="lazy" alt="AI Agent settings with posts, photos, and review replies switched on, each with its own cadence control" />
          <img className="state-off" src="/work/ai-agent/settings-disabled.png" width={2000} height={1408} loading="lazy" alt="AI Agent settings with every activity switched off, cadence controls greyed out, and a red Disable AI Agent action" />
        </div>
        <p className="state-caption state-on">Cadence is set per activity, not once for the whole agent: posts and photos carry separate schedules, and review replies expand into their own tone and language controls.</p>
        <p className="state-caption state-off">Switching everything off is treated as a decision, not a side effect. The cadence controls grey out, the review sub-settings collapse, and the primary action changes from <b>Save changes</b> to <b>Disable AI Agent</b>—so an owner cannot end up with a silently dormant agent.</p>
      </div>
      <p className="evidence-note"><b>Visual boundary:</b> this is a post-MVP settings state. Its example frequencies do not prove the original seven-day default.</p>
      <div className="post-edit-screen"><span className="image-label">Post-MVP · preview and edit</span><ProductImage image="editor" alt="Post-MVP scheduled post editor with generated image, editable copy, link, and save action" /></div>
    </Decision>

    <section className="case-section shell measure" aria-labelledby="measure-title" data-analytics-event="case_evidence_ai_agent" data-analytics-observe>
      <div><p className="kicker">Outcome and limitations</p><h2 id="measure-title">What 8% does—and does not—prove</h2></div>
      <div><div className="big-number">8%</div><p className="case-lede">of people who saw the landing page later reached the dashboard during the initial measurement.</p>
        <dl><dt>Definition</dt><dd>Landing page seen → dashboard seen</dd><dt>Baseline</dt><dd>None; this was a new product</dd><dt>Target</dt><dd>None set</dd><dt>Source</dt><dd>GA4 and a SQL query run by me because the team had no analyst</dd></dl>
        <p className="measure-limit">This validates arrival at an operating agent, not trust in generated content, ranking improvement, retention, or a causal pricing effect.</p>
      </div>
    </section>

    <section className="case-after" aria-labelledby="after-title" data-analytics-event="case_result_ai_agent" data-analytics-observe><div className="shell">
      <p className="kicker">Post-MVP evolution</p><h2 id="after-title">Later evidence moved the product from execution status to preview and editing.</h2>
      <p>After several months, the team used analytics, reported user growth, and qualitative feedback to prioritise an improvement scope. Exact growth numbers, dates, and feedback sample are unavailable.</p>
      <div className="ownership-grid"><p><b>I owned</b><span>The post-editing interface, a growth task that surfaced a scheduled post for review, and an agent-setup onboarding step.</span></p><p><b>I contributed</b><span>The redesign of the agent’s list output and performance metrics.</span></p><p><b>Not claimed</b><span>All later photo, keyword, instruction, and activation work.</span></p></div>
      <div className="image-pair"><div><span className="image-label">MVP · execution status after publication</span><ProductImage image="mvp" alt="Initial dashboard showing completed agent actions without generated content preview" /></div><div><span className="image-label">Post-MVP · planned work and content preview</span><ProductImage image="later" alt="Post-MVP dashboard showing upcoming content previews and recent completed actions" /></div></div>
    </div></section>

    <section className="reflection shell" aria-labelledby="reflection-title"><p className="kicker">Reflection</p><h2 id="reflection-title">Control cannot exist only at setup.</h2><div className="reflection-copy">
      <p><b>What I would change.</b> I would still protect the deadline, but describe the MVP precisely: it measured activation of an autonomous workflow, not trust in output quality.</p>
      <p><b>What remained unresolved.</b> The largest gap sat between technical success and a correct public result. The product could recover from a failed publication, but it could not repair successfully published bad content inside Semrush.</p>
      <p><b>What I would measure next.</b> Preview, edit, approval, and correction behaviour, connected to retention—rather than treating dashboard arrival as a proxy for trust.</p>
    </div></section>

    <section className="appendix shell" aria-labelledby="appendix-title"><p className="kicker">Appendix</p><h2 id="appendix-title">Evidence boundaries</h2>
      <details><summary>How activation was measured</summary><p>I defined activation as reaching the dashboard after seeing the landing page. With no analyst on the team, I combined GA4 events with my own SQL query. I use the result as an early activation signal, not a comparative success benchmark.</p></details>
      <details><summary>What the MVP included</summary><p>Completed post, photo, and review work; cadence controls; and automatic retry for technical publication failures.</p></details>
      <details><summary>What the MVP deferred</summary><p>Content preview, in-product editing, custom AI instructions, and in-product recovery for successfully published bad content.</p></details>
      <details><summary>Ownership boundary</summary><p>The negative-review draft/edit/publish flow existed before this project and was integrated into the agent ecosystem. A separate model team owned model training and content-quality improvements.</p></details>
    </section>

    <section className="next-case shell" aria-label="Next case study">
      <p className="kicker">Next case study</p>
      <Link className="next-case-card" href="/work/raiffeisen-mobile" data-analytics-event="case_open_raiffeisen">
        <span className="next-case-visual"><img src="/work/raiffeisen-mobile/screens/cashier-payment-en.jpg" alt="Cashier QR payment interface" loading="lazy" /></span>
        <b>QR payments for merchants and cashiers</b>
      </Link>
    </section>
  </article></main>;
}
