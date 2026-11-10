import type { Metadata } from "next";
import Link from "next/link";
import { SIZES } from "../Pic";
import { Alternatives, Decision, EndContact, Evidence, Fig, FlowGallery, FullFlow, Media, NextCase, SectionNav, Tldr } from "../case-parts";
import { CASES } from "../cases";

const c = CASES.locations;

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: c.href },
  openGraph: {
    type: "article",
    url: c.href,
    title: c.title,
    description: c.description,
    images: [{ url: "/og/semrush-locations.png", width: 1200, height: 630, alt: c.title }],
  },
  twitter: { card: "summary_large_image", title: c.title, description: c.description, images: ["/og/semrush-locations.png"] },
};

/* Copy restored from the production page (vladimirdeev.com, November 2026), set in the current components. */
export default function CaseStudy() {
  return <main id="main-content" className="case-page semrush-case"><article>
    <header className="case-hero shell">
      <Link className="case-back" href="/#work">← All projects</Link>
      <p className="case-context">Semrush · Local SEO · Sole Product Designer · 2025–2026</p>
      <h1>Adding several locations without starting over.</h1>
      <p>Small businesses and agencies managing several locations had to open Add location before Semrush showed another business it already recognised. They then repeated setup for each one. I moved these opportunities into the page where they managed locations and designed one setup for several businesses.</p>
      <Fig priority wide name="semrush-locations/hero" alt="Semrush Local dashboard showing recognised businesses and a 15% expansion discount on the Locations page" label="Expand your local visibility">Recognised businesses and the problems Semrush found appear where users manage locations; this later view also carries the 2026 discount treatment.</Fig>
      <Tldr
        live={c.live}
        kit
        rows={[
          ["Bulk release", "1 April 2025"],
          ["Later experiment", "Multi-location discount, 2026"],
          ["Team", "Product owner, 2 frontend engineers, 2 backend engineers, QA, and me; no dedicated analyst. Andrei Fateev was Design Team Lead."],
          ["Platform", "Semrush Local SEO · desktop web"],
          ["I owned", "Moving suggestions to the Locations page, the multi-select and bulk setup, and the later discount-treatment design."],
          ["We decided together", "How to prioritise the project by reusing existing components and limiting engineering effort."],
          ["Status", "Bulk setup shipped in 2025. A separate discount experiment launched in 2026."],
        ]}
        notMine="The existing one-business flow, Google data behaviour, pricing policy, and engineering implementation."
      />
      <SectionNav items={[["glance-title", "At a glance"], ["decision-1", "Suggestions"], ["decision-2", "Bulk setup"], ["evidence-title", "Results"], ["discount-title", "Discount, 2026"], ["appendix-title", "Appendix"], ["flow-title", "Full flow"]]} />
    </header>

    <section className="case-section shell" aria-labelledby="glance-title">
      <div><p className="stage-label">At a glance</p><h2 id="glance-title">What changed in 30 seconds</h2></div>
      <div className="reading-copy">
        <p><strong>The problem.</strong> Users saw another recognised business only after choosing Add location. They could set up one business per pass.</p>
        <p><strong>My decisions.</strong> Show specific businesses on the Locations page, then let users select and add several without restarting setup.</p>
        <p><strong>The evidence.</strong> The number of users adding 2+ locations rose after the 2025 release, then returned near its earlier range. In a separate 2026 pre/post comparison, the share of eligible users adding 2+ locations changed from 4.6% to 10.3%. The comparison does not show what caused the difference.</p>
      </div>
    </section>

    <section className="case-section shell orientation" aria-labelledby="brief-title">
      <div><p className="stage-label">Why this mattered</p><h2 id="brief-title">Semrush recognised the next business, but showed it too late</h2></div>
      <div className="reading-copy">
        <p>Semrush could recognise other businesses connected to the same Google account, but showed them only after users opened Add location. Users had to decide to expand before seeing a specific opportunity, then repeat setup for every business.</p>
        <p>We considered email, first-location onboarding and the Locations page. We chose the Locations page because users were already managing businesses there. To keep the project feasible, we reused existing components and limited each setup to 20 locations. Enterprise customers already had a separate API flow.</p>
      </div>
    </section>

    <Decision n={1} title="Show a specific business before asking users to start setup" event="case_decision_semrush_locations">
      <p><strong>Challenge.</strong> Semrush had a relevant suggestion, but revealed it only after the user had already chosen to add a location.</p>
      <p>We considered email, but users could open it outside a Local SEO task. We also considered showing the offer while users set up their first location. We rejected that option because they still needed to finish the first setup and see what the product did.</p>
      <Alternatives
        couldHave="Email or another onboarding step—more reach, but less context or a delay before seeing the first location."
        did="Show recognised businesses and the problems Semrush found on the Locations page."
      />
      <p><strong>Prioritisation.</strong> We gained support for the project by showing that it reused existing components and required limited engineering effort.</p>
      <p><strong>Trade-off:</strong> the Locations page became denser and included a commercial offer. In return, users saw the opportunity while managing locations, without interrupting their first setup.</p>
      <div className="fig-row wide">
        <Fig name="semrush-locations/before-list" sizes={SIZES.pair} gallery="before" alt="Local Dashboard listing businesses before opening Add location" label="Before · hidden in setup">Users opened Add location before seeing a specific business.</Fig>
        <Fig name="semrush-locations/before-expansion" sizes={SIZES.pair} gallery="before" alt="Add location modal containing a recognised business suggestion" label="Before · inside Add location">The suggestion appeared only after users opened Add location.</Fig>
      </div>
      <Fig wide name="semrush-locations/hero" gallery="before" alt="Shipped Locations page with recognised businesses visible" label="After · visible in context">The opportunity appears where users already manage locations.</Fig>
    </Decision>

    <Decision n={2} title="Let users add several businesses—and recover without starting over" tone>
      <p><strong>Challenge.</strong> Moving suggestions into view didn’t remove repeated work.</p>
      <p>I designed a list of concrete businesses instead of one abstract Google account. Users could select several, verify them together and follow progress for the whole set.</p>
      <p>The result state handled mixed outcomes without discarding successful work. It kept completed additions, identified the businesses that failed and offered a direct path to fix them.</p>
      <p><strong>Trade-off:</strong> the technical 20-location cap did not cover every business size. We accepted it for small businesses and agencies; enterprise customers already used a separate API flow.</p>
      <Fig name="semrush-locations/bulk-select-crop" gallery="bulk" alt="Google Business Profile selection modal with several businesses selected" label="Selection · 2026 variant">Several businesses, one selection. The available selection visual includes the later discount treatment; it does not represent the clean 2025 release.</Fig>
      <Fig name="semrush-locations/bulk-verify-crop" gallery="bulk" alt="Verification page containing several selected businesses" label="Verify the set together">Users check several businesses without restarting setup.</Fig>
      <Fig name="semrush-locations/bulk-progress-crop" gallery="bulk" alt="Creating locations progress state showing how many of four are created" label="Progress · production 2025">The flow reports how many selected locations have been created.</Fig>
      <Fig name="semrush-locations/bulk-partial-crop" gallery="bulk" alt="Partial result showing two of four locations added and two requiring fixes" label="Partial result · 2025">Completed locations remain added while failed ones get a recovery path.</Fig>
    </Decision>

    <Evidence
      dark
      title="More users added 2+ locations after launch, but the increase did not last"
      event="case_evidence_semrush_locations"
      method="Tableau counted weekly unique users who set up 2+ locations and attributed the action to Expansion by last click."
      result="The release coincided with a sharp peak of about 60 users a week and several higher weeks. The first labelled weekly value was 17; by the final captured week, the number had returned to 16, close to the first labelled value."
      limits="The chart shows a launch response, not a causal or sustained increase. The exact Tableau workbook, query, eligible population, target and possible concurrent releases are unavailable. The chart supports temporal association only."
    >
      <figure className="fig chart-fig">
        <Media name="semrush-locations/results-chart-crop" alt="Tableau chart showing weekly users setting up two or more locations before and after the 2025 release" sizes={SIZES.text} />
        <figcaption><span className="fig-label">2025 release signal</span><span className="fig-claim">≈60 at the highest week after release; 17 at the first labelled week; 16 at the final visible week.</span></figcaption>
      </figure>
    </Evidence>

    <section className="case-section shell" aria-labelledby="discount-title">
      <div><p className="stage-label">Separate discount experiment · 2026</p><h2 id="discount-title">A later discount test showed a difference, not a cause</h2></div>
      <div className="reading-copy">
        <p>In a separate 2026 initiative, I applied the same flow to a discount treatment. A pre/post comparison changed from 4.6% to 10.3%, but the available data cannot isolate the cause.</p>
      </div>
    </section>

    <section className="reflection shell" aria-labelledby="reflection-title">
      <p className="stage-label">Reflection</p>
      <h2 id="reflection-title">Expansion was a segmented opportunity, not one generic growth loop</h2>
      <p>The launch showed that removing repeated setup could unlock existing intent, but the increase did not last. Next, I would measure the full journey—from seeing a recognised business to managing it later—to understand where users stopped and which segments gained lasting value.</p>
    </section>

    <section className="case-section shell appendix" aria-labelledby="appendix-title">
      <div><p className="stage-label">Appendix</p><h2 id="appendix-title">Evidence boundaries</h2></div>
      <div className="reading-copy">
        <h3>2025 launch measurement</h3>
        <p>The exact Tableau workbook, query, eligible population, target and possible concurrent releases are unavailable. The chart supports temporal association only.</p>
        <h3>2026 discount measurement</h3>
        <p>I designed the treatment so the discount remained visible from the Locations page through business selection. It appeared on the offer, qualifying business cards, selection banner, row tags and selected-location count.</p>
        <p><strong>4.6% → 10.3%.</strong> In a one-month pre/post comparison, the share of users with 2+ eligible locations who added at least two through Expansion changed by 5.7 percentage points. The difference was statistically significant. This was not a randomised test; exact dates, counts and statistical method are unavailable. The result does not show how much of the difference came from price, clearer incentive visibility, seasonality or another concurrent change.</p>
        <Fig name="semrush-locations/discount-entry" gallery="discount" alt="Locations page showing a 15 percent discount treatment" label="Discount beside the offer">The 2026 treatment placed the incentive next to recognised businesses.</Fig>
        <Fig name="semrush-locations/discount-selection" gallery="discount" alt="Business selection modal with discount banner and 15 percent tags" label="Discount in selection">Banner, row tags and count showed which selected locations qualified.</Fig>
        <h3>Visual evidence</h3>
        <p>The entry, progress and partial-result states are confirmed production behaviour from 2025. The available selection visual contains the 2026 discount treatment; a clean 2025 selection export and the exact 20-location boundary state remain unavailable.</p>
        <h3>Ownership</h3>
        <p>I owned the placement proposal, bulk setup interaction and later discount-treatment design. Pricing policy, Google data behaviour and engineering architecture were not mine.</p>
      </div>
    </section>

    <FullFlow intro="From the suggestions on the Locations page to the result of a bulk setup; the earlier list and Add location screens are under Decision 1. Design files with demo data; select a screen to open it full size. Labels mark the 2025 release and the 2026 discount variant.">
      <FlowGallery
        label="Bulk location setup"
        fit="contain"
        steps={[
          { name: "semrush-locations/hero", title: "Suggestions, on the page", alt: "Recognised businesses on the Locations page with Add location buttons", note: "2026 view, with discount badges." },
          { name: "semrush-locations/bulk-select-crop", title: "Select several", alt: "Select Google Business Profile modal with three of four businesses ticked", note: "2026 variant with the discount offer." },
          { name: "semrush-locations/bulk-verify-crop", title: "Verify together", alt: "Verify business details for the whole set, one expanded", note: "2025 release." },
          { name: "semrush-locations/bulk-progress-crop", title: "Progress", alt: "Creating locations, 2 of 4 created", note: "2025 release." },
          { name: "semrush-locations/bulk-partial-crop", title: "Partial result", alt: "2 of 4 locations added, two errors with a Fix errors action", note: "2025 release." },
        ]}
      />
    </FullFlow>

    <EndContact />
    <NextCase href={CASES.aiAgent.href} title={CASES.aiAgent.title} outcome={CASES.aiAgent.outcome} event="case_open_ai_agent" />
  </article></main>;
}
