import type { Metadata } from "next";
import Link from "next/link";
import { Alternatives, Decision, EndContact, Evidence, Fig, NextCase, Scope, Tldr } from "../case-parts";

/* Product screens are fixed-size UI evidence, so plain <img> with explicit dimensions. */
/* eslint-disable @next/next/no-img-element */

export const metadata: Metadata = {
  title: "Adding several business locations without repeating setup case study",
  description: "How I moved known businesses into the right context, let users add several in one setup, and read mixed adoption evidence.",
};

export default function CaseStudy() {
  return <main id="main-content" className="case-page semrush-case"><article>
    <header className="case-hero shell">
      <Link className="case-back" href="/#work">← Back to projects</Link>
      <p className="case-context">Semrush Local SEO, 2025. I was the sole product designer.</p>
      <h1>I turned one-at-a-time location setup into a single bulk action.</h1>
      <p>Semrush recognised users’ other businesses but showed them only after Add location, then made them set up each one separately. I moved the suggestions onto the Locations page and designed bulk select, verify and setup.</p>
      <Tldr
        rows={[
          ["Role", "Sole designer: suggestions, bulk select, verify and setup"],
          ["Team", "Product owner, 2 frontend, 2 backend, QA; no analyst"],
          ["Timeline", "Bulk release 1 April 2025; discount work 2026"],
          ["Outcome", "Adds of 2+ locations spiked after launch, then returned near the earlier level"],
        ]}
        gap="Measure the full journey from seeing a recognised business to managing it later, to learn where users stop and which segments gain lasting value."
      />
      <Fig priority src="/work/semrush-locations/hero.png" width={2040} height={1140} alt="Semrush Local dashboard showing recognised businesses and a 15% expansion discount on the Locations page" label="Locations page, later view">Recognised businesses sit where users already manage locations. This view also carries the 2026 discount offer.</Fig>
    </header>

    <section className="case-section shell orientation" aria-labelledby="brief-title">
      <div><h2 id="brief-title">Semrush recognised the next business, but showed it too late.</h2></div>
      <div className="reading-copy">
        <p>Semrush could recognise other businesses connected to the same Google account, but showed them only after users opened Add location. Users had to decide to expand before seeing a specific opportunity, then repeat setup for every business.</p>
      </div>
    </section>

    <Decision n={1} title="Show a specific business before asking users to start setup" event="case_decision_semrush_locations">
      <p><strong>Challenge.</strong> Semrush had a relevant suggestion but revealed it only after the user had chosen to add a location.</p>
      <Alternatives
        couldHave="Send an email, or show the offer during first-location onboarding. Email can be opened outside a Local SEO task; onboarding means users still haven’t seen what the product does."
        did="Show recognised businesses and the problems Semrush found on the Locations page, where users already manage locations."
      />
      <p><strong>Trade-off:</strong> the Locations page got denser and carries a commercial offer. Users see the opportunity without being interrupted during first setup.</p>
      <div className="fig-row">
        <Fig src="/work/semrush-locations/before-list.png" width={2040} height={1552} alt="Local dashboard listing businesses, with no recognised-business suggestion" label="Before · the list">Nothing on the list pointed to another business.</Fig>
        <Fig src="/work/semrush-locations/before-expansion.png" width={2040} height={1552} alt="Add location modal containing a recognised business suggestion" label="Before · inside Add location">The suggestion appeared only after users opened Add location.</Fig>
      </div>
    </Decision>

    <Scope rows={[
      ["Role", "I owned moving suggestions to the Locations page, the multi-select and bulk setup, and the later discount-offer design. We decided together how to prioritise by reusing existing components and limiting engineering effort."],
      ["Team", "Product owner, 2 frontend engineers, 2 backend engineers, QA, and me; no dedicated analyst. Desktop web."],
      ["Timeline", "Bulk setup shipped on 1 April 2025. A separate discount experiment launched in 2026."],
      ["Not mine", "The existing one-business flow, Google data behaviour, pricing policy, and engineering implementation."],
    ]} />

    <Decision n={2} title="Bulk add turned one-at-a-time setup into one pass" tone>
      <p>I designed a list of concrete businesses instead of one abstract Google account. Users select several, verify them together and follow progress for the whole set.</p>
      <p>The result state handles mixed outcomes. It keeps completed additions, identifies the businesses that failed and offers a direct path to fix them.</p>
      <p><strong>Trade-off:</strong> a technical cap of 20 locations per setup didn’t cover every business size. We accepted it for small businesses and agencies; enterprise customers already used a separate API flow.</p>
      <Fig src="/work/semrush-locations/bulk-select-crop.png" width={1400} height={1510} maxWidth={700} alt="Select Google Business Profile modal with three of four businesses ticked and a Continue button" label="Decision 2 · select">Several businesses, one selection. This export is the 2026 variant and includes the discount offer.</Fig>
      <Fig src="/work/semrush-locations/bulk-verify-crop.png" width={1990} height={2260} maxWidth={995} alt="Verify business details page: one business expanded with its name, address, service area, phone and website, two more collapsed, and a Distribute business info button" label="Decision 2 · verify">Users check the whole set at once.</Fig>
      <Fig src="/work/semrush-locations/bulk-progress-crop.png" width={1050} height={1050} maxWidth={525} alt="Creating locations progress screen with a progress bar reading 2 of 4 created" label="Production, 2025 · progress">The flow reports how many selected locations exist so far.</Fig>
      <Fig src="/work/semrush-locations/bulk-partial-crop.png" width={720} height={670} maxWidth={720} alt="Result screen: 2 of 4 locations were added; two businesses with errors are listed, with Continue and Fix errors actions" label="Production, 2025 · partial result">Two added locations stay added; two failures get a fix path.</Fig>
    </Decision>

    <section className="case-section shell" aria-labelledby="discount-title">
      <div><h2 id="discount-title">Later, I reused the flow for a discount offer.</h2></div>
      <div className="reading-copy">
        <p>In 2026 I reused the flow for a multi-location discount, keeping the offer visible from the Locations page through business selection. The share of eligible users (users with 2+ eligible locations) adding 2+ locations went from 4.6% to 10.3% pre/post; cause not isolated.</p>
      </div>
    </section>

    <Evidence
      dark
      title="Adds of 2+ locations spiked after the 2025 release, then settled"
      event="case_evidence_semrush_locations"
      method="Tableau counted weekly unique users who set up 2+ locations and attributed the action to Expansion by last click. The 2026 figure is a one-month pre/post comparison of the share of eligible users adding 2+ locations."
      result="After the 1 April 2025 release the weekly count peaked at about 60, then drifted back: the first labelled week was 17 and the last captured week was 16. In 2026 the share of eligible users adding 2+ locations went from 4.6% to 10.3%, a statistically significant difference."
      limits="The Tableau workbook, query, eligible population, target and any concurrent releases are unavailable, so the chart shows association in time only. The 2026 comparison wasn’t randomised; exact dates, counts and method are unavailable, and it can’t separate price, offer visibility, seasonality or other changes."
    >
      <figure className="fig chart-fig">
        <img src="/work/semrush-locations/results-chart-crop.png" width={3479} height={1605} loading="lazy" alt="Tableau chart of weekly users setting up two or more locations, before and after the 2025 release" />
        <figcaption><span className="fig-label">Weekly users setting up 2+ locations</span><span className="fig-claim">A sharp peak after release, then a return to near the first labelled value.</span></figcaption>
      </figure>
    </Evidence>

    <section className="reflection shell" aria-labelledby="reflection-title">
      <h2 id="reflection-title">Some customers needed bulk setup more than others.</h2>
      <p>Removing repeated setup unlocked intent that already existed, but the lift faded. Expansion looks like a segmented opportunity rather than one growth loop for every customer.</p>
    </section>

    <EndContact />
    <NextCase href="/work/ai-agent" title="Google Business Profile AI Agent, Semrush" outcome="8% of landing-page visitors paid for and configured the agent in month one." event="case_open_ai_agent" />
  </article></main>;
}
