import type { Metadata } from "next";
import Link from "next/link";
import QrPrototype from "./QrPrototype";
import Pic, { fullSize } from "../Pic";
import { Alternatives, Decision, EndContact, Evidence, NextCase, Scope, Tldr } from "../case-parts";

export const metadata: Metadata = {
  title: "QR payments for merchants and cashiers case study",
  description: "How I replaced technical QR types with task-based names and designed limited payment access for cashiers.",
  alternates: { canonical: "/work/raiffeisen-mobile" },
  openGraph: {
    type: "article",
    url: "/work/raiffeisen-mobile",
    title: "QR payments for merchants and cashiers, Raiffeisen Bank",
    description: "How I replaced technical QR types with task-based names and designed limited payment access for cashiers.",
    images: [{ url: "/og/raiffeisen-mobile.png", width: 1200, height: 630, alt: "QR payments for merchants and cashiers, Raiffeisen Bank" }],
  },
  twitter: { card: "summary_large_image", title: "QR payments for merchants and cashiers, Raiffeisen Bank", description: "How I replaced technical QR types with task-based names and designed limited payment access for cashiers.", images: ["/og/raiffeisen-mobile.png"] },
};

type Screen = { file: string; label: string; alt: string };

export default function RaiffeisenMobileCaseStudy() {
  return <main id="main-content" className="case-page qr-case">
    <header className="case-hero shell">
      <Link className="case-back" href="/#work">← All projects</Link>
      <p className="case-context">Raiffeisen Bank, 2023. Mobile banking for entrepreneurs. I was the sole product designer. An interactive prototype is further down.</p>
      <h1>Merchants didn’t understand QR types, so I renamed them by task.</h1>
      <p>Raiffeisen offered business customers QR payments as a lower-fee alternative to cards. In UX tests with five merchants, participants didn’t understand “dynamic” and “static” and kept creating new codes instead of reusing one. I renamed the types one-time, reusable and cashier, and designed payment-only access for cashiers.</p>
      <Tldr
        rows={[
          ["Role", "Sole designer: terminology, chooser, cashier experience"],
          ["Team", "PM/PO, system analyst, developers, QA"],
          ["Timeline", "2023, shipped to production"],
          ["Outcome", "Reusable QR creation +17% in the first month"],
        ]}
        gap="Measure whether merchants pick the right QR type after the change. Post-change comprehension and selection accuracy are not in the available evidence."
      />
      <figure className="qr-hero-stage">
        <Pic priority name="raiffeisen-mobile/screens/one-type-en" alt="Choose a QR code type screen: one-time, reusable and cashier, each with a plain-language description" sizes="300px" />
      </figure>
    </header>

    <section className="case-section shell orientation" aria-labelledby="problem-title">
      <div><h2 id="problem-title">Merchants couldn’t tell which QR to create.</h2></div>
      <div className="reading-copy">
        <p>The first design followed the Central Bank’s categories: dynamic and static QR codes as tabs, with dynamic selected by default. Merchants needed to pick a code by how they accepted payments, so after the tests I proposed changing both the names and the chooser.</p>
      </div>
    </section>

    <Decision n={1} title="Rename QR types around the merchant’s task" event="case_decision_raiffeisen">
      <p><strong>Challenge.</strong> “Dynamic” and “static” describe how the payment system works. They don’t tell a merchant whether a code can be used again.</p>
      <Alternatives
        couldHave="Keep the Central Bank’s terms, or offer a single QR type as one competitor did."
        did="Keep the capability, rename it as one-time and reusable, and let the merchant choose by situation."
      />
      <p>“Reusable” connects to something familiar: a fixed-price service, such as a manicure, can show the same code to every customer.</p>
      <p><strong>Trade-off:</strong> merchants still choose between several modes. Decision 2 makes the criteria visible before they create a code.</p>
      <ScreenFlow
        label="Decision 1 · one-time QR"
        claim="A one-time code takes three steps: choose the mode, set the amount, show the code."
        screens={[
          { file: "one-type-en", label: "Choose", alt: "Choose a QR code type screen listing one-time, reusable and cashier, each with a description" },
          { file: "one-form-en", label: "Configure", alt: "One-time QR code form with amount 3 500 roubles, optional name, validity until 22 January 2024 and a Create button" },
          { file: "one-created-en", label: "Show", alt: "Created QR code for 3 500 roubles, status awaiting payment until 22 January 2024" },
        ]}
      />
    </Decision>

    <Scope rows={[
      ["Role", "I owned product design. I proposed the terminology, the chooser, and the cashier experience. We delivered implementation and the production launch as an agile team."],
      ["Team", "PM/PO, system analyst, developers, QA, and me as the sole product designer."],
      ["Timeline", "2023; shipped to production."],
      ["Not mine", "The SBP C2B payment system (Russia’s bank-to-business QR payment system), Central Bank rules, and engineering implementation."],
    ]} />

    <Decision n={2} title="Replace the default tab with a list that explains each type" tone>
      <p>The original interface selected dynamic QR before the merchant had said what they needed. Removing the default would have left both categories unexplained.</p>
      <p>I proposed a list of three variants: <b>one-time</b>, <b>reusable</b> and <b>cashier</b>. Each option describes the payment situation it supports, so merchants see the criteria before they create anything.</p>
      <p><strong>Trade-off:</strong> the list adds a step. I proposed keeping it while merchants learned the model, then using usage data to decide whether to prioritise one mode or simplify the chooser.</p>
      <div className="chooser-compare"><div><span>Before</span><h3>Dynamic / Static</h3><p>A technical default, selected before the merchant said what they needed.</p></div><div><span>After</span><h3>One-time / Reusable / Cashier</h3><p>Each option is described by the payment situation it serves.</p></div></div>
      <ScreenFlow
        label="Decision 2 · reusable QR"
        claim="A reusable code is created once, then reused and managed from its own page."
        screens={[
          { file: "reusable-type-en", label: "Choose", alt: "Choose a QR code type screen with the reusable option described as never expiring" },
          { file: "reusable-form-en", label: "Configure", alt: "Reusable QR code form with optional amount, name, payment purpose and a Create button" },
          { file: "reusable-created-en", label: "Reuse", alt: "Reusable QR code page: active and never expires, with Show, Send and Rename actions and a list of its transactions" },
        ]}
      />
    </Decision>

    <section className="prototype-section shell" aria-labelledby="proto-title">
      <h2 id="proto-title">Prototype</h2>
      <p>The one-time QR flow, from the home screen to a created code. It stays inactive until you press the button.</p>
      <QrPrototype />
    </section>

    <Decision n={3} title="Give cashiers payment tools, not the owner’s bank account">
      <p>A fixed-price reusable QR didn’t cover every point of sale. Cashiers needed to enter changing totals, but owners didn’t want to give employees full internet-banking access.</p>
      <p>I proposed a cashier QR with a changeable amount and a limited experience around two tasks: create a QR code and check whether the payment succeeded. The alternative, letting cashiers use the owner’s full access, avoids a separate surface but exposes accounts, transfers and settings.</p>
      <p><strong>Trade-off:</strong> the limited experience increased product and implementation scope.</p>
      <div className="access-model"><FactCard label="Owner" title="Full banking" detail="Accounts · transfers · settings · QR payments"/><i>≠</i><FactCard label="Cashier" title="Payment access" detail="Create QR · check payment status"/></div>
      <ScreenFlow
        label="Decision 3 · cashier QR"
        claim="The cashier names a till, then enters the amount for each payment."
        screens={[
          { file: "cashier-type-en", label: "Choose", alt: "Choose a QR code type screen with the cashier option described as for a retail location" },
          { file: "cashier-name-en", label: "Name the till", alt: "Cashier QR code form with a name field containing Front counter and a Create QR code button" },
          { file: "cashier-payment-en", label: "Take a payment", alt: "Payment amount keypad asking what the payment amount is, with a To payment button" },
        ]}
      />
    </Decision>

    <Evidence
      title="What the tests and the launch show"
      event="case_evidence_raiffeisen"
      method="UX tests with five participants. After release, a backend engineer supplied the production count of reusable QR creation at my request."
      result="Participants didn’t understand “dynamic” and “static” and repeatedly created new dynamic codes. Task-based names and an explained chooser followed, plus a limited cashier mode for changing totals. The revised experience shipped to production. Reusable QR creation +17% in the first month after release."
      limits="No control group. Comprehension and selection accuracy after the change, payment success, cashier adoption, savings, retention and revenue were not preserved, nor whether the chooser follow-up happened."
    />

    <section className="reflection shell" data-analytics-event="case_result_raiffeisen" data-analytics-observe aria-labelledby="reflection-title">
      <h2 id="reflection-title">Why the terms had to change</h2>
      <p>The first design assumed merchants already knew the Central Bank’s terms. The redesign kept the same payment options and described them by task: use once, reuse at a fixed price, or let a cashier enter changing totals.</p>
    </section>

    <section className="case-section shell transactions" aria-labelledby="tx-title">
      <div><h2 id="tx-title">QR transactions and filters</h2></div>
      <div>
        <p className="reading-note">I also designed the QR transaction list and filters: status, period and amount filtering, with transaction details and empty, loading and error states.</p>
        <ScreenFlow
          label="QR transactions"
          claim="List, filters, then filtered results."
          screens={[
            { file: "tx-list-en", label: "List", alt: "Transactions list with status filter chips and payments and refunds grouped by date" },
            { file: "tx-filters-en", label: "Filters", alt: "Filters screen with Status, Period and Amount sections and an Apply button" },
            { file: "tx-filtered-en", label: "Filtered", alt: "Transactions screen narrowed by status and a date range" },
          ]}
        />
      </div>
    </section>

    <EndContact />
    <NextCase href="/work/semrush-locations" title="Locations bulk setup, Semrush" outcome="Users adding 2+ locations spiked after launch, then returned near the earlier level." event="case_open_semrush_locations" />
  </main>;
}

function FactCard({ label, title, detail }: { label: string; title: string; detail: string }) {
  return <div><span>{label}</span><b>{title}</b><small>{detail}</small></div>;
}

function ScreenFlow({ label, claim, screens }: { label: string; claim: string; screens: Screen[] }) {
  return (
    <figure className="screen-flow">
      <div>
        {screens.map(({ file, label: screenLabel, alt }, index) => {
          const name = `raiffeisen-mobile/screens/${file}`;
          return (
            <div className="flow-screen" key={file}>
              <span>{index + 1}. {screenLabel}</span>
              <a href={fullSize(name)} target="_blank" rel="noreferrer" aria-label={`${alt} (open full size)`}><Pic name={name} alt={alt} sizes="(max-width: 800px) 76vw, 330px" /></a>
            </div>
          );
        })}
      </div>
      <figcaption><span className="fig-label">{label}</span><span className="fig-claim">{claim}</span></figcaption>
    </figure>
  );
}
