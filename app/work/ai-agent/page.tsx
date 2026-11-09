import type { Metadata } from "next";
import Link from "next/link";
import Pic from "../Pic";
import { Alternatives, Decision, EndContact, Evidence, Fig, NextCase, Scope, Tldr } from "../case-parts";

export const metadata: Metadata = {
  title: "Google Business Profile AI Agent case study",
  description: "How I cut a Google Business Profile agent to one useful loop in a week, made its work visible, and designed the controls deferred from the MVP.",
  alternates: { canonical: "/work/ai-agent" },
  openGraph: {
    type: "article",
    url: "/work/ai-agent",
    title: "Google Business Profile AI Agent, Semrush",
    description: "How I cut a Google Business Profile agent to one useful loop in a week, made its work visible, and designed the controls deferred from the MVP.",
    images: [{ url: "/og/ai-agent.png", width: 1200, height: 630, alt: "Google Business Profile AI Agent, Semrush" }],
  },
  twitter: { card: "summary_large_image", title: "Google Business Profile AI Agent, Semrush", description: "How I cut a Google Business Profile agent to one useful loop in a week, made its work visible, and designed the controls deferred from the MVP.", images: ["/og/ai-agent.png"] },
};

export default function CaseStudy() {
  return <main id="main-content" className="case-page"><article>
    <header className="case-hero shell">
      <Link className="case-back" href="/#work">← Back to projects</Link>
      <p className="case-context">Semrush, 2025. A Local SEO product (helping a business show up in Google Maps and local search). Sole product designer.</p>
      <h1>I had one week to decide what an AI agent would do on its own, and what its users could see.</h1>
      <p>The Google Business Profile AI Agent posts updates and photos to a small business’s Google listing and prepares review replies. Leadership mandated the agent; I cut preview and editing, and designed setup, a dashboard of what the agent did, and adjustable posting cadence.</p>
      <Tldr
        rows={[
          ["Role", "Sole designer: flows, UI, interactions, cadence controls"],
          ["Team", "Product owner, 2 frontend, 2 backend, QA; no analyst"],
          ["Timeline", "1 week of design, 4 weeks to MVP, 2025"],
          ["Outcome", "8% of landing-page visitors paid for and configured the agent in month one"],
        ]}
        gap="Whether owners trust generated content: preview, edit, approval and correction behaviour, not just reaching the dashboard."
      />
      <Fig priority name="ai-agent/dashboard-mvp-full" alt="MVP Google Business Profile AI Agent dashboard showing Views, Interactions, Average Rating, and a Recent Actions list" label="MVP dashboard, 2025">Owners saw that the agent had acted, but not what it had written.</Fig>
    </header>

    <Decision n={1} title="Show what the agent did before letting owners edit it" event="case_decision_ai_agent">
      <p><strong>Challenge.</strong> Leadership had mandated the agent and the product owner had outlined the first capabilities. The agent posts under the owner’s name, so owners needed to see what it had done. A fuller release would also let them preview and edit content and write custom instructions. With one design week before a conference launch, the product owner and I deferred all three.</p>
      <Alternatives
        couldHave="Include preview, editing and custom instructions: more control, more scope before a fixed date."
        did="Connect a profile, configure the agent, and see completed work on a dashboard."
      />
      <p>The shorter loop still showed whether people would activate an autonomous workflow. <strong>Trade-off:</strong> owners could confirm the agent had acted but couldn’t inspect or fix its output inside Semrush.</p>
      <p>Flow: landing → Google sign-in → profile analysis → audit → payment → setup → dashboard.</p>
      <Fig name="ai-agent/setup-crop" maxWidth={700} alt="AI Agent setup screen for configuring automated Local SEO activity" label="Decision 1 · setup">Setup collects profile photos and keywords, then goes straight to the dashboard.</Fig>
    </Decision>

    <Scope rows={[
      ["Role", "I owned product design, flows, interactions and feature behaviour. The product owner and I agreed the minimum scope and the launch cuts."],
      ["Team", "Product owner, 2 frontend, 2 backend, QA, me; no analyst. Desktop web on the Semrush UI kit."],
      ["Timeline", "1 week of design, 4 weeks to the 2025 MVP; the product kept evolving."],
      ["Not mine", "The AI initiative, model architecture and quality, pricing (half the full Local SEO subscription), landing-page copy, and the negative-review reply flow that predated this project."],
    ]} />

    <Decision n={2} title="What happens when the agent posts something wrong" tone>
      <p>In the MVP a technical failure had a path: the agent retried, showed a service-status message if the retry failed, and resumed later without owner action. Wrong content had none. An owner who found a bad or repetitive post could correct it only in Google. A separate team worked on model quality; I didn’t own that.</p>
      <p>After launch I designed the post-editing interface, so owners can change a scheduled post before it publishes.</p>
      <Fig name="ai-agent/post-editor-crop" maxWidth={434} alt="Scheduled post editor with generated image, editable copy, link, and save action" label="Decision 2 · after launch">Owners can edit a scheduled post before it goes out.</Fig>
    </Decision>

    <Decision n={3} title="The dashboard shows what the agent did">
      <p>Owners needed proof the agent was working without inheriting a professional Local SEO dashboard. The alternative was a broader SEO panel. I chose three familiar Google measures (views, interactions, average rating) and a chronological list of completed actions.</p>
      <p>Average rating was later removed: it barely changed, and a static number made the screen harder to read. <strong>Trade-off:</strong> less analytical depth, and owners saw content only after it published.</p>
    </Decision>

    <Decision n={4} title="Posting cadence is adjustable" tone>
      <p>Many owners would never open settings, so defaults mattered, but rhythms differ: a café may have frequent events, a plumber few. A fixed schedule would repeat itself for quieter businesses. I designed controls per activity: posts and photos have separate schedules, review replies their own tone and language settings.</p>
      <p>At launch everything ran every seven days and review drafts took an hour, following Google Business Profile community best-practice guidance, not a formal Google rule. <strong>Trade-off:</strong> more settings, more complexity.</p>
      <div className="state-toggle">
        <input className="state-radio" type="radio" name="settings-state" id="settings-on" defaultChecked />
        <input className="state-radio" type="radio" name="settings-state" id="settings-off" />
        <div className="state-tabs" role="group" aria-label="Settings states">
          <label htmlFor="settings-on">Automations on</label>
          <label htmlFor="settings-off">Automations off</label>
        </div>
        <div className="case-stage case-stage-settings state-stage">
          <Pic className="state-on" name="ai-agent/settings-enabled" alt="AI Agent settings with posts, photos, and review replies switched on, each with its own cadence control" sizes="(min-width: 1200px) 1085px, 100vw" />
          <Pic className="state-off" name="ai-agent/settings-disabled" alt="AI Agent settings with every activity switched off, cadence controls greyed out, and a red Disable AI Agent action" sizes="(min-width: 1200px) 1085px, 100vw" />
        </div>
        <p className="state-caption state-on"><span className="fig-label">Post-MVP settings, 2026</span> Cadence is set per activity.</p>
        <p className="state-caption state-off"><span className="fig-label">Post-MVP settings, 2026</span> With everything off, the primary action becomes <b>Disable AI Agent</b>, so an owner can’t leave a silently dormant agent.</p>
      </div>
    </Decision>

    <section className="case-after" aria-labelledby="after-title" data-analytics-event="case_result_ai_agent" data-analytics-observe><div className="shell">
      <h2 id="after-title">After launch, owners asked to see posts before they went out.</h2>
      <p>After several months of analytics, growth in feature users and feedback from the Send feedback modal, the team prioritised new scope. I owned the post-editing interface, a growth task that surfaces a scheduled post for review, and an agent-setup step in onboarding, and contributed to the redesign of list output and metrics. I don’t claim the photo, keyword, instruction or activation-widget work.</p>
      <p>Weekly first-time agent activations rose 50% in the month after the onboarding step shipped (August 2026), against the month before. Onboarding completion didn’t drop.</p>
      <Fig name="ai-agent/actions-mvp" maxWidth={475} alt="MVP Recent Actions list: published post, replied to a review, added Q&A and updated photos, each with a time and a check mark" label="MVP · recent actions">Completed actions only, with no sign of what was written.</Fig>
      <Fig name="ai-agent/actions-later" maxWidth={670} alt="Post-MVP Actions panel: 13 completed and 3 upcoming, with scheduled posts and their content previews above recent actions" label="Post-MVP · actions">Planned work and a content preview sit above completed actions.</Fig>
    </div></section>

    <Evidence
      title="What the 8% measures"
      event="case_evidence_ai_agent"
      method="GA4 and a SQL query I ran myself; the team had no analyst. Funnel: landing page seen, then configured agent dashboard seen, in the first month after launch (October 2025). No trial, so reaching the dashboard meant a paid subscription."
      result="8% of landing-page visitors paid for and configured the agent in month one. Weekly first-time activations rose 50% after the onboarding step. From March to September 2026 the agent was the only Local tool whose weekly active paid users grew (my read of Semrush’s internal dashboard; counts under NDA)."
      limits="Not causal; no control group. The 8% has no baseline, target or preserved visitor count. Nothing here measures trust in generated content, ranking or retention."
    />

    <section className="reflection shell" aria-labelledby="reflection-title">
      <h2 id="reflection-title">Control has to continue after setup.</h2>
      <p>I’d still protect the deadline, but I’d describe the MVP precisely: it tested whether people would activate an autonomous workflow, and said nothing about trust in what the agent wrote.</p>
    </section>

    <EndContact />
    <NextCase href="/work/raiffeisen-mobile" title="QR payments for merchants, Raiffeisen Bank" outcome="Shipped to production; reusable QR creation rose 17% in the first month." event="case_open_raiffeisen" />
  </article></main>;
}
