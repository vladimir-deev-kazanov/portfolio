import type { Metadata } from "next";
import Link from "next/link";
import QrPrototype from "./QrPrototype";
import { SIZES } from "../Pic";
import { Alternatives, Decision, EndContact, Evidence, Fig, FlowGallery, FullFlow, NextCase, PHONE, PhoneRow, SectionNav, Tldr } from "../case-parts";
import { CASES } from "../cases";

const c = CASES.raiffeisen;

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: c.href },
  openGraph: {
    type: "article",
    url: c.href,
    title: c.title,
    description: c.description,
    images: [{ url: "/og/raiffeisen-mobile.png", width: 1200, height: 630, alt: c.title }],
  },
  twitter: { card: "summary_large_image", title: c.title, description: c.description, images: ["/og/raiffeisen-mobile.png"] },
};

type Screen = { file: string; label: string; alt: string };

export default function RaiffeisenMobileCaseStudy() {
  return <main id="main-content" className="case-page qr-case fit-case">
    <header className="case-hero shell">
      <Link className="case-back" href="/#work">← All projects</Link>
      <p className="case-context">Raiffeisen Bank, Russia, 2023. Mobile banking for entrepreneurs.</p>
      <h1>I turned technical QR types into merchant tasks and gave cashiers their own limited access.</h1>
      <p>Raiffeisen offered business customers QR payments as a lower-fee alternative to cards. In usability tests, merchants couldn’t find the other QR types or tell dynamic from static. I made choosing a type the first step, named the types by task, put transactions first, and designed payment-only access for cashiers.</p>
      <PhoneRow
        priority
        gallery="hero"
        label="QR type chooser, 2023"
        claim="Each type is described by the payment situation it serves. Screens translated from Russian for this case study."
        screens={[
          { name: "raiffeisen-mobile/screens/one-type-en", alt: "Choose a QR code type screen: one-time, reusable and cashier, each with a plain-language description" },
          { name: "raiffeisen-mobile/screens/one-form-en", alt: "One-time QR code form with amount 3 500 roubles, optional name, validity until 22 January 2024 and a Create button" },
          { name: "raiffeisen-mobile/screens/one-created-en", alt: "Created QR code for 3 500 roubles, status awaiting payment until 22 January 2024" },
        ]}
      />
      <Tldr
        live={c.live}
        rows={[
          ["Role", "Sole product designer: flows, terminology, chooser, cashier experience"],
          ["Team", "PM/PO, system analyst, UX researcher, UX writer, developers, QA"],
          ["Timeline", "2023, shipped to production"],
          ["Outcome", "17% more QR codes of the other types created in the month after release"],
        ]}
      />
      <SectionNav items={[["decision-1", "Type choice"], ["decision-2", "Transactions first"], ["decision-3", "Cashier access"], ["evidence-title", "Results"], ["flow-title", "Full flow"]]} />
    </header>

    <Decision n={1} title="Make choosing the QR type the first step, and name types by the merchant’s task" event="case_decision_raiffeisen">
      <p><strong>Challenge.</strong> The first design followed the Central Bank’s categories. Dynamic was the default: the merchant went straight to an amount screen, and the other types (static, POS) sat behind a settings button. In the first round of usability tests with five entrepreneurs, participants didn’t find where to choose the type, and 3 of 5 didn’t know other types existed. “Dynamic” and “static” also didn’t say whether a code could be used again, and participants kept creating new dynamic codes.</p>
      <PhoneRow
        gallery="round-1"
        label="Before · round 1"
        claim="The type was a settings button away, even with a tooltip pointing at it."
        screens={[
          { name: "raiffeisen-mobile/round1-main", alt: "Round 1 prototype: the main screen listing dynamic codes" },
          { name: "raiffeisen-mobile/round1-amount", alt: "Round 1 prototype: the Enter amount screen with a settings button and a tooltip saying you can choose the QR type here" },
          { name: "raiffeisen-mobile/round1-types", alt: "Round 1 prototype: the sheet behind the settings button with Dynamic, Static and POS" },
        ]}
      />
      <Alternatives
        couldHave="Keep dynamic as the default and make the settings button easier to find, as the tooltip in round 1 tried; or offer a single QR type, as one competitor did."
        did="Ask for the type first, as a list with no default, and name each type by the situation it serves: one-time, reusable, cashier. I wrote the names with a UX writer."
      />
      <p>“Reusable” connects to something familiar: a fixed-price service, such as a manicure, can show the same code to every customer. One-time and reusable describe how a code is used, while cashier describes who uses it; the list mixes the two on purpose so a merchant can pick by situation.</p>
      <p><strong>Trade-off:</strong> choosing a type adds a step to the most common flow. QR creation completion was the guardrail.</p>
      <ScreenFlow
        gallery="one-time"
        label="After · one-time QR"
        claim="Choose the type, set the amount, show the code."
        screens={[
          { file: "one-type-en", label: "Choose", alt: "Choose a QR code type screen listing one-time, reusable and cashier, each with a description" },
          { file: "one-form-en", label: "Configure", alt: "One-time QR code form with amount 3 500 roubles, optional name, validity until 22 January 2024 and a Create button" },
          { file: "one-created-en", label: "Show", alt: "Created QR code for 3 500 roubles, status awaiting payment until 22 January 2024" },
        ]}
      />
    </Decision>

    <Decision n={2} title="Put transactions on the first screen" tone>
      <p>In the same tests, 4 of 5 participants looked for money, not codes. After creating a code they returned to the main screen, got lost, and opened the list of codes to find the payment. One said: “So, where’s that payment… Oh, I think I just created this QR.”</p>
      <p>I moved all transactions to the first screen, with codes on a second tab, so a merchant checks a payment in fewer taps. <strong>Trade-off:</strong> the codes list is one tap further away.</p>
      <div className="fig-pair wide phones">
        <Fig name="raiffeisen-mobile/round1-main" ratio={PHONE} sizes={SIZES.phone} gallery="before-after" alt="Before: main screen with transaction totals at the top and the QR codes list grouped by type below" label="Before">Transactions as two summary cards; the list below is codes.</Fig>
        <Fig name="raiffeisen-mobile/after-main" ratio={PHONE} sizes={SIZES.phone} gallery="before-after" alt="After: QR payments screen with Transactions and QR codes tabs, filters, monthly turnover and a list of payments" label="After">Payments first, with filters and turnover; codes on the next tab.</Fig>
      </div>
    </Decision>

    <Decision n={3} title="Give cashiers payment tools, not the owner’s bank account">
      <p>A fixed-price reusable QR didn’t cover every point of sale. Cashiers needed to enter changing totals, but owners didn’t want to give employees full internet-banking access.</p>
      <p>I proposed a cashier QR with a changeable amount and a limited experience around two tasks: create a QR code and check whether the payment succeeded. Letting cashiers use the owner’s access would have avoided a separate surface but exposed accounts, transfers and settings. <strong>Trade-off:</strong> the limited experience increased product and implementation scope.</p>
      <div className="access-model"><FactCard label="Owner" title="Full banking" detail="Accounts · transfers · settings · QR payments"/><i>≠</i><FactCard label="Cashier" title="Payment access" detail="Create QR · check payment status"/></div>
      <ScreenFlow
        gallery="cashier"
        label="Cashier QR"
        claim="The cashier names a till, then enters the amount for each payment."
        screens={[
          { file: "cashier-type-en", label: "Choose", alt: "Choose a QR code type screen with the cashier option described as for a retail location" },
          { file: "cashier-name-en", label: "Name the till", alt: "Cashier QR code form with a name field containing Front counter and a Create QR code button" },
          { file: "cashier-payment-en", label: "Take a payment", alt: "Payment amount keypad asking what the payment amount is, with a To payment button" },
        ]}
      />
    </Decision>

    <section className="prototype-section shell" aria-labelledby="proto-title">
      <h2 id="proto-title">Guided walkthrough</h2>
      <p>The one-time QR flow, from the home screen to a created code, plays step by step once you press the button. Restart walkthrough replays it.</p>
      <QrPrototype />
    </section>

    <Evidence
      title="What the tests and the launch show"
      event="case_evidence_raiffeisen"
      method="Usability tests on prototypes with five entrepreneurs, run with a UX researcher. After release, a backend engineer supplied production counts at my request: QR codes created by type, the month after release against the month before."
      result="In the tests, 3 of 5 participants didn’t know other QR types existed, participants created new dynamic codes instead of reusing one, and 4 of 5 looked for the payment among their codes. The team shipped type-first choice, the task names, transactions first and the cashier mode. In the month after release, 17% more QR codes of the other types were created than in the month before; QR creation completion didn’t drop."
      limits="No control group. The 17% counts codes created, not codes reused, payments taken or better understanding. Comprehension after the change, cashier adoption and revenue weren’t measured."
    />

    <section className="reflection shell" data-analytics-event="case_result_raiffeisen" data-analytics-observe aria-labelledby="reflection-title">
      <h2 id="reflection-title">Why the terms had to change</h2>
      <p>The first design assumed merchants already knew the Central Bank’s terms and would find the other types on their own. The redesign kept the same payment options, asked for the type first and described it by task: use once, reuse at a fixed price, or let a cashier enter changing totals. Next I’d test whether merchants pick the right type the first time.</p>
    </section>

    <FullFlow intro="Every shipped screen from the QR payments entry to a paid code, the cashier path, and transactions with filters. Select a screen to open it full size. The states row shows the original Russian screens, with what each says.">
      <FlowGallery
        label="Create a QR code"
        cols={6}
        steps={[
          { name: "raiffeisen-mobile/after-main", title: "QR payments", alt: "QR payments screen with transactions first", shape: "phone" },
          { name: "raiffeisen-mobile/screens/one-type-en", title: "Choose a type", alt: "Choose a QR code type", shape: "phone" },
          { name: "raiffeisen-mobile/screens/one-form-en", title: "One-time: amount", alt: "One-time QR form", shape: "phone" },
          { name: "raiffeisen-mobile/screens/one-created-en", title: "Awaiting payment", alt: "Created one-time QR awaiting payment", shape: "phone" },
          { name: "raiffeisen-mobile/screens/reusable-form-en", title: "Reusable: details", alt: "Reusable QR form", shape: "phone" },
          { name: "raiffeisen-mobile/screens/reusable-created-en", title: "Reusable: payments", alt: "Reusable QR page with its transactions", shape: "phone" },
        ]}
      />
      <FlowGallery
        label="Cashier and transactions"
        cols={6}
        start={7}
        steps={[
          { name: "raiffeisen-mobile/screens/cashier-name-en", title: "Name the till", alt: "Cashier QR form", shape: "phone" },
          { name: "raiffeisen-mobile/screens/cashier-payment-en", title: "Enter the amount", alt: "Cashier payment keypad", shape: "phone" },
          { name: "raiffeisen-mobile/screens/tx-list-en", title: "Transactions", alt: "Transactions list with status chips", shape: "phone" },
          { name: "raiffeisen-mobile/screens/tx-filters-en", title: "Filters", alt: "Filters for status, period and amount", shape: "phone" },
          { name: "raiffeisen-mobile/screens/tx-filtered-en", title: "Filtered", alt: "Transactions narrowed by status and dates", shape: "phone" },
        ]}
      />
      <FlowGallery
        label="States, original Russian screens"
        cols={6}
        start={12}
        steps={[
          { name: "raiffeisen-mobile/states/loading", title: "Loading", alt: "Transactions loading, shown as grey placeholder rows", note: "Skeleton rows while transactions load.", shape: "phone" },
          { name: "raiffeisen-mobile/states/empty", title: "Empty", alt: "No transactions yet; they will appear when a customer pays", note: "“Nothing yet. Transactions appear when a customer pays.”", shape: "phone" },
          { name: "raiffeisen-mobile/states/error", title: "Error", alt: "Something went wrong, try later, with a Refresh button", note: "“Something went wrong. Try later.” Refresh.", shape: "phone" },
          { name: "raiffeisen-mobile/states/not-found", title: "No results", alt: "Nothing found, try changing the filters, with a Change filters button", note: "“Nothing found. Try changing the filters.”", shape: "phone" },
          { name: "raiffeisen-mobile/states/create-error", title: "Create failed", alt: "One-time QR form with an error banner: could not create the QR code, try again", note: "“Couldn’t create the QR code. Try again.” The form keeps its values.", shape: "phone" },
        ]}
      />
    </FullFlow>

    <EndContact />
    <NextCase href={CASES.locations.href} title={CASES.locations.title} outcome={CASES.locations.outcome} event="case_open_semrush_locations" />
  </main>;
}

function FactCard({ label, title, detail }: { label: string; title: string; detail: string }) {
  return <div><span>{label}</span><b>{title}</b><small>{detail}</small></div>;
}

function ScreenFlow({ label, claim, screens, gallery }: { label: string; claim: string; screens: Screen[]; gallery: string }) {
  return <PhoneRow label={label} claim={claim} gallery={gallery} screens={screens.map(({ file, label: step, alt }) => ({ name: `raiffeisen-mobile/screens/${file}`, label: step, alt }))} />;
}
