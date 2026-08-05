import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "AI Agent case study", description: "How Vladimir Deev-Kazanov designed a trustworthy Local SEO AI Agent MVP at Semrush." };
const Img = ({src, alt}:{src:string,alt:string}) => <div className="case-stage"><img src={`/work/ai-agent/${src}`} alt={alt}/></div>;

export default function CaseStudy(){ return <main className="case-page">
  <header className="case-hero shell">
    <div className="case-meta"><span>Semrush · 2025</span><span>4-week MVP</span><span>Sole Product Designer</span></div>
    <h1>Turning an AI mandate into an agent owners could <em>control.</em></h1>
    <p>With one week to design the MVP before a conference, I had to decide what made it useful enough to ship—and how to make invisible automation legible.</p>
    <Img src="dashboard-mvp.png" alt="AI Agent dashboard with metrics, upcoming actions and recent actions"/>
  </header>

  <section className="case-section shell snapshot-section"><div><p className="kicker">Snapshot</p><h2>Scope and ownership</h2></div><dl><dt>Duration</dt><dd>4 weeks: 1 week design, then build and iteration</dd><dt>Team</dt><dd>PO, 2 frontend, 2 backend, QA, and me; no analyst</dd><dt>I owned</dt><dd>Product design, flows, interactions, and user-facing behaviour</dd><dt>Not mine</dt><dd>AI initiative, architecture, and model-quality training</dd><dt>System</dt><dd>Desktop web, using the Semrush UI kit</dd><dt>Status</dt><dd>Shipped, measured, and expanded after the MVP</dd></dl></section>

  <section className="case-punch"><div className="shell"><p className="kicker">The brief, distilled</p><h2>Make the agent’s work understandable without making the owner learn Local SEO.</h2><div className="punch-grid"><p><b>½ price</b><span>of the full Local SEO subscription</span></p><p><b>1 week</b><span>to design before conference launch</span></p><p><b>8%</b><span>landing → configured dashboard</span></p></div></div></section>

  <section className="case-section shell orientation"><div><p className="kicker">Orientation</p><h2>One agent.<br/>Seven surfaces.</h2></div><div><p className="case-lede">The product connected a Google Business Profile, analysed it, configured routine work, and then operated in the background.</p><ol className="flow-list">{["Landing","Google auth","Analysis","Audit","Payment","Setup","Dashboard"].map((x,i)=><li key={x}><span>0{i+1}</span>{x}</li>)}</ol></div></section>

  <Decision no="01" title="Ship proof of execution before full control" eyebrow="The cut">
    <p>A complete product would let owners inspect and edit generated content and give the agent instructions. We could not build that safely before the conference.</p><p>With the product owner, I prioritised the shortest valuable loop: connect a profile, configure the agent, and see that it completed a task. User-authored instructions were deferred.</p><blockquote><b>Trade-off:</b> we could test activation, but not trust in individual outputs.</blockquote><div className="compare"><p><b>Technical failure</b><span>Automatic retry → status message → resume without owner action.</span></p><p><b>Wrong published content</b><span>No in-product recovery → owner corrects it directly in Google.</span></p></div>
  </Decision>

  <Decision no="02" title="Make the dashboard answer ‘What did the agent do?’" eyebrow="Operational visibility" tone>
    <p>After activation, the agent worked in the background. The dashboard had to make that invisible work legible without recreating the complexity of Semrush for a non-marketer.</p><p>The first version combined familiar Google metrics with a record of completed posts, photos, Q&amp;A, profile updates, and review responses.</p><blockquote><b>Product principle:</b> the AI does the specialist work; the owner monitors a small set of outcomes and actions.</blockquote>
    <Img src="dashboard-later.png" alt="Initial dashboard reporting completed actions"/><div className="annotations"><p><b>01 · Outcomes</b>Views, interactions and rating—not a full SEO panel.</p><p><b>02 · Proof</b>Recent Actions confirm that background work happened.</p><p><b>03 · Limit</b>The owner sees an action only after execution.</p></div>
    <h3>Feedback asked for foresight, not more metrics.</h3><p>Average rating was removed because it changed too slowly. Upcoming actions were added so owners could inspect planned content before publication.</p><Img src="dashboard-mvp.png" alt="Later dashboard showing upcoming content previews"/>
  </Decision>

  <Decision no="03" title="Make cadence adjustable instead of pretending every business is the same" eyebrow="Behaviour over time">
    <p>Routine publications ran every seven days; review drafts were prepared within an hour. But a restaurant has constant events and offers while a watchmaker may have few meaningful updates.</p><p>Publishing equally often creates repetitive content that looks automated rather than active. I designed controls for changing cadence. Frequency became part of the autonomy contract, not a hidden system parameter.</p><Img src="settings.png" alt="AI Agent settings for controlling automated activity"/>
  </Decision>

  <section className="case-section shell measure"><div><p className="kicker">Measurement</p><h2>What 8% does—and does not—prove</h2></div><div><div className="big-number">8%</div><p className="case-lede">of landing-page visitors later reached a configured agent dashboard.</p><dl><dt>Source</dt><dd>GA4 + SQL; measured by me</dd><dt>Baseline</dt><dd>None; new product</dd><dt>Limit</dt><dd>No preserved benchmark or absolute sample</dd></dl></div></section>

  <section className="case-after"><div className="shell"><p className="kicker">After the MVP</p><h2>The evidence brought the missing controls back.</h2><p>After several months of analytics, growth, and feedback, I designed post editing and a revised onboarding flow. The product moved from proof of execution toward preview and repair.</p><div className="image-pair"><Img src="dashboard-later.png" alt="Before: completed actions only"/><Img src="post-editor.png" alt="After: content preview and editing"/></div></div></section>

  <section className="reflection shell"><p className="kicker">Reflection</p><h2>Control cannot exist only at setup.</h2><p>The first release validated activation of an autonomous workflow—not trust in output quality. Owners need to understand what an agent will do, see what it did, and repair the result without leaving. Trustworthy autonomy comes from that continuing loop.</p></section>
  <Link className="next-project shell" href="/cv"><span>Next</span><b>See how I got here</b><i>CV ↗</i></Link>
  </main> }

function Decision({no,title,eyebrow,tone=false,children}:{no:string,title:string,eyebrow:string,tone?:boolean,children:React.ReactNode}) { return <section className={`decision-section ${tone?"tone":""}`}><div className="shell"><div className="decision-head"><span>{no}</span><h2>{title}</h2></div><div className="decision-body"><p className="kicker">{eyebrow}</p><div className="decision-copy">{children}</div></div></div></section> }
