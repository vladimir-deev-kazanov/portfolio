import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QR payments case study",
  description: "How Vladimir Deev-Kazanov translated SBP C2B QR types into understandable payment modes for Raiffeisen Bank entrepreneurs.",
};

export default function RaiffeisenMobileCaseStudy() {
  return <main id="main-content" className="case-page qr-case">
    <header className="case-hero shell">
      <div className="case-meta"><span>Raiffeisen Bank · 2023</span><span>Mobile banking</span><span>Product Designer</span></div>
      <h1>Turning SBP’s QR types into payment modes merchants could <em>understand.</em></h1>
      <p>When acquiring was too expensive, QR payments gave businesses another option. My job was to make the payment system usable—not merely reproduce Central Bank terminology.</p>
      <div className="case-stage qr-hero-stage" aria-label="Three task-based QR payment modes">
        <div className="qr-phone"><div className="qr-phone-top"><span>‹</span><b>Accept payment by QR</b><i>•••</i></div><p>What do you need the QR for?</p>
          <QrOption no="01" title="One-time QR" detail="For a single payment with a set amount" />
          <QrOption no="02" title="Reusable QR" detail="For repeated payments at the same price" />
          <QrOption no="03" title="Cashier QR" detail="Reuse the code and change the amount" active />
        </div>
      </div>
    </header>

    <section className="case-section shell snapshot-section"><div><p className="kicker">Snapshot</p><h2>Scope and ownership</h2></div><dl><dt>Period</dt><dd>2023</dd><dt>Team</dt><dd>PM/PO, system analyst, developers, QA, and me as product designer</dd><dt>I owned</dt><dd>Product design and the proposed terminology, selection model, and cashier experience</dd><dt>We delivered</dt><dd>Implementation and production launch as an agile team</dd><dt>Not mine</dt><dd>SBP C2B payment rail, Central Bank rules, and engineering implementation</dd><dt>Status</dt><dd>Shipped to production</dd></dl></section>

    <section className="case-punch"><div className="shell"><p className="kicker">The brief, distilled</p><h2>Make a lower-cost payment rail usable without asking entrepreneurs to learn Central Bank terminology.</h2><div className="punch-grid"><p><b>SBP C2B</b><span>alternative when conventional acquiring was too expensive</span></p><p><b>5 users</b><span>in the initial UX-test sample</span></p><p><b>Shipped</b><span>revised QR model and cashier functionality</span></p></div></div></section>

    <section className="case-section shell orientation"><div><p className="kicker">The real problem</p><h2>Choosing,<br/>not generating.</h2></div><div><p className="case-lede">The first design followed the Central Bank model: dynamic and static QR. In tests, users did not understand the terms and repeatedly created a new dynamic code.</p><ol className="flow-list"><li><span>01</span>Choose a QR by business situation</li><li><span>02</span>Set or change the amount</li><li><span>03</span>Show the code to the customer</li><li><span>04</span>Confirm the payment status</li></ol></div></section>

    <Decision no="01" title="Rename the system around the user’s task" eyebrow="Language as product design">
      <p>“Dynamic” and “static” described how the payment system behaved. They did not tell a merchant whether a code could be used again.</p><p>After the UX tests, I proposed renaming the customer-facing options <b>one-time</b> and <b>reusable</b>. A reusable QR connected directly to a familiar situation: a fixed-price service, such as a manicure, could use the same code repeatedly.</p>
      <div className="compare"><p><b>Alternative 01</b><span>Keep the Central Bank model unchanged.</span></p><p><b>Alternative 02</b><span>Offer only one QR type, as one competitor did.</span></p></div><blockquote><b>Trade-off:</b> preserving several useful modes meant users still had to learn that a choice existed.</blockquote>
      <div className="term-shift"><FactCard label="System language" title="Dynamic · Static" detail="Technically correct, poorly understood"/><i>→</i><FactCard label="Task language" title="One-time · Reusable" detail="Explains how the code will be used"/></div>
      <ScreenFlow caption="One-time QR · choose the mode, configure the payment, show the code" screens={[['one-type','Choose by use case'],['one-form','Configure payment'],['one-created','Show the QR']]} />
    </Decision>

    <Decision no="02" title="Replace a defaulted tab with an explained choice" eyebrow="Choice architecture" tone>
      <p>The original interface used dynamic/static tabs and selected dynamic before the user had expressed a need. Removing only the preselection was one option, but it would leave the categories unexplained.</p><p>I proposed a list of three QR variants. Each option explained which payment situation it suited, so the decision criteria became visible before code creation.</p><blockquote><b>Trade-off:</b> the new chooser added a step. I proposed keeping it while users learned the model, collecting usage data, then deciding which mode to prioritise or whether the step could be simplified.</blockquote>
      <div className="chooser-compare"><div><span>Before</span><h3>Dynamic / Static</h3><p>A technical default selected before the merchant expressed a need.</p></div><div><span>After</span><h3>One-time / Reusable / Cashier</h3><p>Each heading is followed by a plain-language description of the payment situation.</p></div></div>
      <ScreenFlow caption="Reusable QR · name it, decide whether to set an amount, then reuse it" screens={[['reusable-name','Name the code'],['reusable-amount','Set or skip amount'],['reusable-created','Reuse and manage']]} />
    </Decision>

    <Decision no="03" title="Give cashiers the payment tools—not the owner’s bank" eyebrow="Delegated access">
      <p>A reusable fixed-price QR did not cover every point of sale. Cashiers needed changing totals, while entrepreneurs did not want to give employees full access to internet banking.</p><p>I proposed a cashier QR whose amount could change, plus a constrained experience around two tasks: create a code and check whether payment succeeded.</p><div className="compare"><p><b>Rejected</b><span>Give the cashier the owner’s full internet-banking access.</span></p><p><b>Chosen</b><span>Expose QR creation and payment status only.</span></p></div><blockquote><b>Trade-off:</b> a separate constrained surface increased delivery scope, but kept delegated access aligned with the cashier’s job.</blockquote>
      <div className="access-model"><FactCard label="Owner" title="Full banking" detail="Accounts · transfers · settings · QR payments"/><i>≠</i><FactCard label="Cashier" title="Payment access" detail="Create QR · check payment status"/></div>
      <ScreenFlow caption="Cashier QR · select the delegated mode, name the cashier point, create payments" screens={[['cashier-type','Choose cashier QR'],['cashier-name','Name the cashier point'],['cashier-created','Create a payment']]} />
    </Decision>

    <section className="case-section shell operations-section"><div><p className="kicker">Supporting surface</p><h2>Make QR payments traceable after the code is shown</h2></div><div><p className="case-lede">I also worked on the QR transaction list and filters. The interface brought payment status, period and amount filtering into the merchant’s operational flow, with transaction details and empty, loading and error states.</p><p className="evidence-limit">This work is confirmed by the design source. Its post-launch effect is not preserved in the available evidence.</p><EvidenceVisual src="/work/raiffeisen-mobile/qr-transactions-filters.jpg" alt="QR transaction list, transaction details and filters for status, date period and amount" caption="QR transactions · list, details, filters and system states" portrait /></div></section>

    <section className="case-section shell measure qr-evidence"><div><p className="kicker">Evidence</p><h2>What testing changed—and what remains unmeasured</h2></div><dl><dt>Method</dt><dd>UX tests with 5 people</dd><dt>Finding</dt><dd>Users did not understand dynamic/static and repeatedly created dynamic QR codes</dd><dt>Response</dt><dd>Task-oriented names, an explained three-option chooser, and cashier mode</dd><dt>Outcome</dt><dd>Shipped to production</dd><dt>Limit</dt><dd>Post-change comprehension, usage, payment success, savings, retention, and revenue were not preserved in the available evidence</dd></dl></section>

    <section className="reflection shell"><p className="kicker">Reflection</p><h2>System language is not a user mental model.</h2><p>The redesign preserved SBP’s underlying capabilities but moved the choice closer to merchant work: use once, reuse at a stable price, or delegate changing totals to a cashier. The unresolved question was when the explicit chooser could be simplified. I wanted usage data—not intuition—to decide.</p></section>
    <section className="next-case shell" aria-label="Next case study">
      <Link className="next-case-card" href="/work/ai-agent">
        <span className="next-case-copy"><small>Next case study</small><b>Local SEO AI Agent</b><em>How the autonomy boundary made invisible AI work legible.</em></span>
        <span className="next-case-visual next-case-visual-wide"><img src="/work/ai-agent/dashboard-mvp.png" alt="Local SEO AI Agent dashboard" loading="lazy" /></span>
      </Link>
    </section>
  </main>;
}

function QrOption({no,title,detail,active=false}:{no:string,title:string,detail:string,active?:boolean}) { return <div className={`qr-option ${active?"active":""}`}><span>{no}</span><div><b>{title}</b><small>{detail}</small></div><i>›</i></div>; }
function FactCard({label,title,detail}:{label:string,title:string,detail:string}) { return <div><span>{label}</span><b>{title}</b><small>{detail}</small></div>; }
function ScreenFlow({caption,screens}:{caption:string,screens:Array<[string,string]>}) { return <figure className="screen-flow"><div>{screens.map(([file,label],index)=><div className="flow-screen" key={file}><span>{String(index+1).padStart(2,'0')} · {label}</span><img src={`/work/raiffeisen-mobile/screens/${file}.jpg`} alt={label} loading="lazy"/>{index<screens.length-1&&<i aria-hidden="true">→</i>}</div>)}</div><figcaption>{caption}<span>Production design source</span></figcaption></figure>; }
function EvidenceVisual({src,alt,caption,portrait=false}:{src:string,alt:string,caption:string,portrait?:boolean}) { return <figure className={`product-evidence ${portrait?"portrait":""}`}><div><img src={src} alt={alt} loading="lazy"/></div><figcaption>{caption}<span>Production design source</span></figcaption></figure>; }
function Decision({no,title,eyebrow,tone=false,children}:{no:string,title:string,eyebrow:string,tone?:boolean,children:React.ReactNode}) { return <section className={`decision-section ${tone?"tone":""}`}><div className="shell"><div className="decision-head"><span>{no}</span><h2>{title}</h2></div><div className="decision-body"><p className="kicker">{eyebrow}</p><div className="decision-copy">{children}</div></div></div></section>; }
