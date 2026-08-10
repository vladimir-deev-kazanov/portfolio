import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QR payments for merchants and cashiers case study",
  description: "How I replaced technical QR types with task-based choices and designed limited payment access for cashiers.",
};

export default function RaiffeisenMobileCaseStudy() {
  return <main id="main-content" className="case-page qr-case">
    <header className="case-hero shell">
      <div className="case-meta"><span>Raiffeisen Bank · 2023</span><span>Mobile banking</span><span>Sole Product Designer</span></div>
      <h1>I replaced technical QR types with choices <em>merchants could use.</em></h1>
      <p>When card payment fees were too high for a business, Raiffeisen could offer QR payments instead. I redesigned the names, chooser, and cashier flow around how merchants accepted payments.</p>
      <div className="case-stage qr-hero-stage">
        <img src="/work/raiffeisen-mobile/qr-type.png" width="752" height="1624" loading="lazy" alt="Raiffeisen QR type picker: one-time, reusable, and cashier codes, each with a plain-language explanation" />
      </div>
    </header>

    <section className="case-section shell snapshot-section"><div><p className="kicker">Snapshot</p><h2>Scope and ownership</h2></div><dl><dt>Period</dt><dd>2023</dd><dt>Team</dt><dd>PM/PO, system analyst, developers, QA, and me as the sole product designer</dd><dt>I owned</dt><dd>Product design. I proposed the terminology, chooser, and cashier experience.</dd><dt>We delivered</dt><dd>Implementation and production launch as an agile team</dd><dt>Not mine</dt><dd>SBP C2B payment system, Central Bank rules, and engineering implementation</dd><dt>Status</dt><dd>Shipped to production</dd></dl></section>

    <section className="case-punch"><div className="shell"><p className="kicker">Why this mattered</p><h2>Help merchants choose a lower-cost payment method without learning the Central Bank's technical terms.</h2><div className="punch-grid"><p><b>SBP C2B</b><span>Russia's bank-to-business QR payment system</span></p><p><b>Five participants</b><span>in the initial UX-test sample</span></p><p><b>Shipped</b><span>revised QR model and cashier functionality</span></p></div></div></section>

    <section className="case-section shell orientation"><div><p className="kicker">The problem</p><h2>The hard part was choosing<br/>the right QR, not creating one.</h2></div><div><p className="case-lede">The first design followed the Central Bank's categories: dynamic and static QR codes, shown as tabs with dynamic selected by default. In UX tests with five participants, people did not understand the two terms and repeatedly created a new dynamic QR instead of reusing an existing code.</p><p>Merchants did not need a lesson in payment infrastructure. They needed to choose a QR based on how they accepted payments. After the tests, I proposed changing both the names and the chooser.</p><ol className="flow-list"><li><span>01</span>Choose a QR for the payment situation</li><li><span>02</span>Set or change the amount</li><li><span>03</span>Show the QR</li><li><span>04</span>Confirm the payment</li></ol></div></section>

    <Decision no="01" title="Rename the system around the merchant’s task" eyebrow="Decision 1 · Use task-based names">
      <p>“Dynamic” and “static” described how the payment system worked. They did not tell a merchant whether a code could be used again.</p><p>I proposed the customer-facing names <b>one-time QR</b> and <b>reusable QR</b>. “Reusable” connected the feature to a familiar situation: a fixed-price service, such as a manicure, could show the same code to each customer.</p><p>I considered two alternatives, then kept the underlying capability and translated it into task-based language rather than removing choice altogether.</p>
      <div className="compare"><p><b>Alternative 01</b><span>Keep the Central Bank’s terms unchanged.</span></p><p><b>Alternative 02</b><span>Offer one QR type, as one competitor did.</span></p></div><blockquote><b>Trade-off:</b> merchants still had to choose between several modes. The next decision made the criteria visible before they created a code.</blockquote>
      <div className="term-shift"><FactCard label="System language" title="Dynamic · Static" detail="Technically correct, poorly understood"/><i>→</i><FactCard label="Task language" title="One-time · Reusable" detail="Explains how the code will be used"/></div>
      <ScreenFlow caption="One-time QR · choose the mode, configure the payment, show the code" sourceLabel="English-language prototype reconstruction" screens={[['one-type-en','Choose by use case'],['one-form-en','Configure payment'],['one-created-en','Show the QR']]} />
    </Decision>

    <Decision no="02" title="Replace a defaulted tab with an explained list" eyebrow="Decision 2 · Explain the choice first" tone>
      <p>The original interface selected dynamic QR before the merchant had expressed a need. Removing the default was one option, but the two categories would still be unexplained.</p><p>I proposed a list of three variants: <b>one-time</b>, <b>reusable</b>, and <b>cashier</b>. Each option described the payment situation it supported. Merchants could see the decision criteria before creating a code.</p><blockquote><b>Trade-off:</b> the list added a step. I proposed keeping it while merchants learned the model, then using usage data to decide whether to prioritise one mode or simplify the chooser.</blockquote><p className="evidence-limit">The available evidence does not show whether the team later collected that data or whether selection accuracy improved.</p>
      <div className="chooser-compare"><div><span>Before</span><h3>Dynamic / Static</h3><p>A technical default selected before the merchant expressed a need.</p></div><div><span>After</span><h3>One-time / Reusable / Cashier</h3><p>Each heading is followed by a plain-language description of the payment situation.</p></div></div>
      <ScreenFlow caption="Reusable QR · choose the mode, configure the code, then reuse it" sourceLabel="English-language prototype reconstruction" screens={[['reusable-type-en','Choose reusable'],['reusable-form-en','Configure the code'],['reusable-created-en','Reuse and manage']]} />
    </Decision>

    <Decision no="03" title="Give cashiers payment tools, not the owner’s bank account" eyebrow="Decision 3 · Limit cashier access">
      <p>A fixed-price reusable QR did not cover every point of sale. Cashiers needed to enter changing totals, but merchants did not want to give employees full access to internet banking.</p><p>I proposed a cashier QR with a changeable amount, plus a limited experience around two tasks: create a QR and check whether the payment succeeded.</p><div className="compare"><p><b>Rejected</b><span>Let cashiers use the owner’s full banking access—avoids a separate surface, but exposes accounts, transfers, and settings cashiers did not need.</span></p><p><b>Chosen</b><span>Expose QR creation and payment status only.</span></p></div><blockquote><b>Trade-off:</b> the limited cashier experience increased product and implementation scope. In return, access matched the cashier’s job.</blockquote>
      <div className="access-model"><FactCard label="Owner" title="Full banking" detail="Accounts · transfers · settings · QR payments"/><i>≠</i><FactCard label="Cashier" title="Payment access" detail="Create QR · check payment status"/></div>
      <p className="evidence-limit">The experience shipped with the wider QR work. I do not have preserved evidence of adoption or operational impact.</p>
      <ScreenFlow caption="Cashier QR · select the delegated mode, name the cashier point, create payments" sourceLabel="English-language prototype reconstruction" screens={[['cashier-type-en','Choose cashier QR'],['cashier-name-en','Name the cashier point'],['cashier-payment-en','Create a payment']]} />
    </Decision>

    <section className="case-section shell measure qr-evidence"><div><p className="kicker">Evidence</p><h2>What changed, and what remains unmeasured</h2></div><dl><dt>Method</dt><dd>UX tests with five participants</dd><dt>Finding</dt><dd>Participants did not understand “dynamic” and “static” and repeatedly created new dynamic QR codes</dd><dt>Test-driven changes</dt><dd>Task-based names and an explained chooser</dd><dt>Related scope shipped</dt><dd>A limited cashier mode for changing totals</dd><dt>Product outcome</dt><dd>The revised QR experience shipped to production</dd><dt>Limits</dt><dd>Post-change comprehension, selection accuracy, usage, payment success, savings, retention, and revenue were not preserved in the available evidence</dd></dl><p className="measure-limit">Testing changed the product model. It did not establish a quantified user or business outcome.</p></section>

    <section className="reflection shell"><p className="kicker">Reflection</p><h2>Technical accuracy does not guarantee user understanding.</h2><p>The first design treated the Central Bank’s terms as if merchants already understood them. The tests showed that technically correct categories could still lead people to the wrong action.</p><p>The redesign kept the underlying payment options but described them through merchant tasks: use once, reuse at a fixed price, or let a cashier enter changing totals.</p><p>The unresolved question was how long the explicit chooser needed to remain. I proposed using behaviour data to decide when to prioritise a mode or simplify the step. The available evidence does not show whether that follow-up happened.</p></section>

    <section className="appendix shell" aria-labelledby="qr-appendix-title"><p className="kicker">Appendix</p><h2 id="qr-appendix-title">Supporting surface</h2>
      <details><summary>QR transaction list and filters</summary><p>I also worked on the QR transaction list and filters, bringing payment status, period and amount filtering into the merchant’s operational flow, with transaction details and empty, loading and error states. This work is confirmed by the design source; its post-launch effect is not preserved in the available evidence.</p><EvidenceVisual src="/work/raiffeisen-mobile/qr-transactions-filters.jpg" alt="QR transaction list, transaction details and filters for status, date period and amount" caption="QR transactions · list, details, filters and system states" portrait /></details>
    </section>
    <section className="next-case shell" aria-label="Next case study">
      <p className="kicker">Next case study</p>
      <Link className="next-case-card" href="/work/ai-agent">
        <span className="next-case-visual next-case-visual-wide"><img src="/work/ai-agent/dashboard-mvp.png" alt="Google Business Profile AI Agent dashboard" loading="lazy" /></span>
        <b>Google Business Profile AI Agent</b>
      </Link>
    </section>
  </main>;
}

function FactCard({label,title,detail}:{label:string,title:string,detail:string}) { return <div><span>{label}</span><b>{title}</b><small>{detail}</small></div>; }
function ScreenFlow({caption,screens,sourceLabel="Production design source"}:{caption:string,screens:Array<[string,string]>,sourceLabel?:string}) { return <figure className="screen-flow"><div>{screens.map(([file,label],index)=><div className="flow-screen" key={file}><span>{String(index+1).padStart(2,'0')} · {label}</span><img src={`/work/raiffeisen-mobile/screens/${file}.jpg`} alt={label} loading="lazy"/>{index<screens.length-1&&<i aria-hidden="true">→</i>}</div>)}</div><figcaption>{caption}<span>{sourceLabel}</span></figcaption></figure>; }
function EvidenceVisual({src,alt,caption,portrait=false}:{src:string,alt:string,caption:string,portrait?:boolean}) { return <figure className={`product-evidence ${portrait?"portrait":""}`}><div><img src={src} alt={alt} loading="lazy"/></div><figcaption>{caption}<span>Production design source</span></figcaption></figure>; }
function Decision({no,title,eyebrow,tone=false,children}:{no:string,title:string,eyebrow:string,tone?:boolean,children:React.ReactNode}) { return <section className={`decision-section ${tone?"tone":""}`}><div className="shell"><div className="decision-head"><span>{no}</span><h2>{title}</h2></div><div className="decision-body"><p className="kicker">{eyebrow}</p><div className="decision-copy">{children}</div></div></div></section>; }
