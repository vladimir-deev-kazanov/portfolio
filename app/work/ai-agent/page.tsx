import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { SIZES } from "../Pic";
import { Alternatives, Clip, Decision, EndContact, Evidence, Fig, Media, NextCase, SectionNav, Tldr } from "../case-parts";
import { CASES } from "../cases";

const c = CASES.aiAgent;

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: c.href },
  openGraph: {
    type: "article",
    url: c.href,
    title: c.title,
    description: c.description,
    images: [{ url: "/og/ai-agent.png", width: 1200, height: 630, alt: c.title }],
  },
  twitter: { card: "summary_large_image", title: c.title, description: c.description, images: ["/og/ai-agent.png"] },
};

export default function CaseStudy() {
  return <main id="main-content" className="case-page fit-case"><article>
    <header className="case-hero shell">
      <Link className="case-back" href="/#work">← All projects</Link>
      <p className="case-context">Semrush, 2025–2026. Local SEO (helping a business show up in Google Maps and local search).</p>
      <h1>I designed an AI agent’s first release in a week, then what owners needed after launch.</h1>
      <p>The Google Business Profile AI Agent posts updates and photos to a small business’s Google listing and prepares review replies. Leadership set up the initiative and the product owner outlined the first capabilities. I agreed the MVP scope with the product owner and designed its flows, interface and interactions; after launch, post editing, a growth task and an onboarding step.</p>
      <Fig priority wide name="ai-agent/dashboard-mvp-clean" alt="MVP AI Agent dashboard for New York Pizza: agent status Active, this week’s views, interactions and average rating, and a Recent Actions list" label="MVP dashboard, 2025">Owners saw that the agent had acted, but not what it had written.</Fig>
      <Tldr
        live={c.live}
        kit
        rows={[
          ["Role", "Sole product designer: MVP scope with the PO, flows, UI, interactions, post-launch features"],
          ["Team", "Product owner, 2 frontend, 2 backend, QA; no analyst"],
          ["Timeline", "1 week of design, 4 weeks to the MVP (October 2025); post-launch work in 2026"],
          ["Outcome", "8% of landing-page visitors paid for and configured the agent in month one"],
        ]}
        notMine="The AI initiative and its first capability list, model quality, pricing and landing-page copy."
      />
      <SectionNav items={[["decision-1", "MVP scope"], ["decision-2", "Dashboard"], ["decision-3", "Controls"], ["after-title", "After launch"], ["evidence-title", "Results"]]} />
    </header>

    <Decision n={1} title="Launch one loop: connect, configure, see what the agent did" event="case_decision_ai_agent">
      <p><strong>Challenge.</strong> We had one design week before a conference launch. The agent posts under the owner’s name, so owners needed to see what it had done. A fuller release would also let them preview and edit content and write custom instructions.</p>
      <Alternatives
        couldHave="Include preview, editing and custom instructions: more control, more scope before a fixed date."
        did="Connect a profile, configure the agent, and see completed work on a dashboard. The product owner and I deferred the rest."
      />
      <p>The shorter loop still showed whether people would pay for and switch on an autonomous workflow: landing, Google sign-in, profile analysis, audit, payment, setup, dashboard.</p>
      <p><strong>Trade-off:</strong> the agent published without a preview. A technical failure had a path: the agent retried, showed a service-status message, and resumed later. Wrong content could be corrected only in Google. Beyond the deadline, the reasoning for accepting that wasn’t recorded.</p>
    </Decision>

    <Decision n={2} title="Show the agent’s actions next to three Google metrics owners already know" tone>
      <p>The dashboard had to answer one question: what did the agent do for me this week? I explored three layouts. Two led with progress charts; charts make owners dig for how the agent works, and a list of actions shows it’s working. We shipped the layout built around the agent’s work.</p>
      <p>The three Google measures (views, interactions, average rating) describe the profile, not the agent’s contribution; the actions list is what shows the agent’s work. Average rating was later removed: it barely changed, and a static number made the screen harder to read. <strong>Trade-off:</strong> less analytical depth, and owners saw content only after it published.</p>
      <div className="option-row wide">
        <Fig name="ai-agent/dash-option-1" sizes={SIZES.third} gallery="dashboard-options" alt="Layout option 1: performance charts for average rank, views, interactions and rating, with a line chart against the previous period" label="Option 1 · rejected">Led with progress charts.</Fig>
        <Fig name="ai-agent/dash-option-2" className="is-chosen" sizes={SIZES.third} gallery="dashboard-options" alt="Layout option 2: agent status, three metrics without charts and a Recent Actions list" label="Option 2 · shipped">Built around the agent’s work.</Fig>
        <Fig name="ai-agent/dash-option-3" sizes={SIZES.third} gallery="dashboard-options" alt="Layout option 3: smaller progress charts beside a list of ten recent automations and a rating prompt" label="Option 3 · rejected">Fewer charts, more actions.</Fig>
      </div>
    </Decision>

    <Decision n={3} title="Give owners separate controls for each activity">
      <p>Many owners would never open settings, so defaults mattered, but rhythms differ: a café may have frequent events, a plumber few. I designed controls per activity: posts, Q&A and photos have separate schedules, review replies their own tone and language. At launch everything ran every seven days (Google Business Profile community best-practice guidance, not a formal rule). <strong>Trade-off:</strong> more settings, more complexity.</p>
      <div className="state-toggle" style={{ "--ar": 1189 / 1345 } as CSSProperties}>
        <input className="state-radio" type="radio" name="settings-state" id="settings-on" defaultChecked />
        <input className="state-radio" type="radio" name="settings-state" id="settings-off" />
        <div className="state-tabs" role="group" aria-label="Settings states">
          <label htmlFor="settings-on">Automations on</label>
          <label htmlFor="settings-off">Automations off</label>
        </div>
        <div className="state-stage">
          <Media className="state-on" gallery="settings" sizes={SIZES.text} name="ai-agent/settings-enabled" alt="AI Agent settings with posts, photos, and review replies switched on, each with its own cadence control" />
          <Media className="state-off" gallery="settings" sizes={SIZES.text} name="ai-agent/settings-disabled" alt="AI Agent settings with every activity switched off, cadence controls greyed out, and a red Disable AI Agent action" />
        </div>
        <p className="state-caption state-on"><span className="fig-label">Post-MVP settings, 2026</span> Cadence is set per activity.</p>
        <p className="state-caption state-off"><span className="fig-label">Post-MVP settings, 2026</span> With everything off, the primary action becomes <b>Disable AI Agent</b>, so an owner can’t leave a silently dormant agent.</p>
      </div>
      <Clip src="/work/ai-agent/motion/settings-dropdown.mp4" poster="ai-agent/clip-settings-dropdown" width={1020} height={760} label="Prototype · cadence" alt="Prototype recording: opening AI Agent settings, changing photo updates from every 7 days to every 30 days, and saving">Photo updates move from every 7 days to every 30 without touching posts or replies.</Clip>
    </Decision>

    <section className="case-after" aria-labelledby="after-title" data-analytics-event="case_result_ai_agent" data-analytics-observe><div className="shell">
      <h2 id="after-title">After launch, owners asked to see posts before they went out.</h2>
      <p>The feedback came through the agent’s Send feedback modal. A bad or repetitive post still had no fix inside Semrush, and a separate team owned model quality. After several months of analytics, growth in feature users and that feedback, the team prioritised new scope.</p>
      <p>I designed post editing, so owners can change a scheduled post before it publishes; a growth task, shipped 7 August 2026, that brings a scheduled post up for review; and an agent step in Local onboarding, shipped 19 August 2026. I contributed to the actions list and metrics redesign. The photo, keyword, instruction and widget work isn’t mine.</p>
      <Clip src="/work/ai-agent/motion/edit-post.mp4" poster="ai-agent/clip-edit-post" width={1020} height={930} label="Prototype · edit a post" alt="Prototype recording: opening a scheduled post from the actions list, rewriting its text and saving">An owner opens a scheduled post, rewrites it and saves before it goes out.</Clip>
      <div className="fig-pair wide">
        <Fig name="ai-agent/actions-mvp" ratio={475 / 375} sizes={SIZES.pair} alt="MVP Recent Actions list: published post, replied to a review, added Q&A and updated photos, each with a time and a check mark" label="MVP · recent actions">Completed actions only, with no sign of what was written.</Fig>
        <Fig name="ai-agent/actions-later" ratio={475 / 375} sizes={SIZES.pair} alt="Post-MVP Actions panel: 13 completed and 3 upcoming, with scheduled posts and their content previews above recent actions" label="Post-MVP · actions">Planned posts and their text now sit above completed actions.</Fig>
      </div>
      <Clip src="/work/ai-agent/motion/growth-action.mp4" poster="ai-agent/clip-growth-action" width={1100} height={805} label="Prototype · growth task" alt="Prototype recording: a growth task on the Local dashboard shows a sample scheduled post; the user sets up the agent, skips adding photos and sees it start working">The growth task shows a sample scheduled post first, then sets the agent up in a few steps.</Clip>
      <h3 className="after-sub">Where the onboarding step sits</h3>
      <ol className="journey" aria-label="Local onboarding path">
        <li>Landing page</li>
        <li>Pick a location</li>
        <li>Connect Google Business Profile</li>
        <li>Location setup</li>
        <li className="journey-mine">AI agent step: the post is ready</li>
        <li>Payment</li>
      </ol>
      <p>Profile data (name, category, photos, reviews) starts loading when the owner connects Google, and the first post is generated in the background in about a minute. By the agent step, the owner sees a post written for their own business, with a promise they can review or edit any post before it goes live.</p>
      <Fig name="ai-agent/onboarding-posts" alt="Onboarding step: AI Agent generates posts, with a sample post for Central Perk, a note that any post can be reviewed or edited before it goes live, Turn on weekly posts and Skip" label="Onboarding step, 2026">The agent step shows a ready post before asking the owner to turn on weekly posts. It can be skipped.</Fig>
    </div></section>

    <Evidence
      title="What the numbers show"
      event="case_evidence_ai_agent"
      method="GA4 and SQL I ran myself; the team had no analyst. The 8% is landing page seen, then configured agent dashboard seen, in the first month after launch (October 2025); there was no trial, so reaching the dashboard meant paying. The 50% compares weekly first-time agent activations in the month after the onboarding step with the month before. Usage by tool is my read of Semrush’s internal dashboard."
      result="Three separate observations. 8% of landing-page visitors paid for and configured the agent in month one. After I added the onboarding step, weekly first-time activations were 50% higher than in the month before, and onboarding completion didn’t drop. From March to September 2026 the agent was the only Local tool whose weekly active paid users grew (counts under NDA)."
      limits="Not causal; no control group. The 8% has no baseline, target or preserved visitor count. Activations aren’t retention. None of these numbers measures whether owners trust what the agent writes."
    />

    <section className="reflection shell" aria-labelledby="reflection-title">
      <h2 id="reflection-title">What the MVP could and couldn’t tell me</h2>
      <p>I’d still protect the deadline, but I’d describe the MVP precisely: it tested whether people would pay for and switch on an autonomous workflow. The gap I’d close first is trust in generated content: how often owners preview, edit, approve or correct posts, not just whether they reach the dashboard.</p>
    </section>

    <EndContact />
    <NextCase href={CASES.raiffeisen.href} title={CASES.raiffeisen.title} outcome={CASES.raiffeisen.outcome} event="case_open_raiffeisen" />
  </article></main>;
}
