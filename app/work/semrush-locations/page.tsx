import type { Metadata } from "next";
import Link from "next/link";

/* Product screenshots remain uncompressed; the current Sites image runtime is not reliable in local preview. */
/* eslint-disable @next/next/no-img-element */

export const metadata: Metadata = {
  title: "Adding several business locations without repeating setup case study",
  description: "How I moved known businesses into the right context, let users add several in one setup, and interpreted mixed adoption evidence.",
};

const images = {
  hero: { src: "/work/semrush-locations/hero.png", width: 2040, height: 1140 },
  after: { src: "/work/semrush-locations/hero.png", width: 2040, height: 1140 },
  beforeList: { src: "/work/semrush-locations/before-list.png", width: 2040, height: 1552 },
  beforeExpansion: { src: "/work/semrush-locations/before-expansion.png", width: 2040, height: 1552 },
  select: { src: "/work/semrush-locations/bulk-select.png", width: 2880, height: 1630 },
  verify: { src: "/work/semrush-locations/bulk-verify.png", width: 2880, height: 2354 },
  progress: { src: "/work/semrush-locations/bulk-progress.png", width: 2880, height: 1646 },
  partial: { src: "/work/semrush-locations/bulk-partial.png", width: 1440, height: 823 },
  discountEntry: { src: "/work/semrush-locations/discount-entry.png", width: 2880, height: 2570 },
  discountSelect: { src: "/work/semrush-locations/discount-selection.png", width: 2880, height: 2570 },
  chart: { src: "/work/semrush-locations/results-chart.png", width: 3840, height: 2160 },
};

type ImageKey = keyof typeof images;

function ProductImage({ image, alt, priority = false }: { image: ImageKey; alt: string; priority?: boolean }) {
  const asset = images[image];
  return (
    <div className={`case-stage case-stage-${image}`}>
      <img src={asset.src} width={asset.width} height={asset.height} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
    </div>
  );
}

function Shot({ image, alt, label, children, className }: { image: ImageKey; alt: string; label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <ProductImage image={image} alt={alt} />
      <p className="shot-caption"><b>{label}</b>{children}</p>
    </div>
  );
}

function ShotPair({ images: pair, label, children }: { images: { image: ImageKey; alt: string }[]; label: string; children: React.ReactNode }) {
  return (
    <div className="shot-pair-block">
      <div className="shot-pair">
        {pair.map((item) => (
          <ProductImage key={item.image} image={item.image} alt={item.alt} />
        ))}
      </div>
      <p className="shot-caption"><b>{label}</b>{children}</p>
    </div>
  );
}

function Decision({ no, title, eyebrow, tone = false, children }: { no: string; title: string; eyebrow: string; tone?: boolean; children: React.ReactNode }) {
  return (
    <section className={`decision-section ${tone ? "tone" : ""}`} aria-labelledby={`decision-${no}`} {...(no === "01" ? { "data-analytics-event": "case_decision_semrush_locations", "data-analytics-observe": true } : {})}>
      <div className="shell">
        <div className="decision-head"><span>Decision {no}</span><h2 id={`decision-${no}`}>{title}</h2></div>
        <div className="decision-body"><p className="kicker">{eyebrow}</p><div className="decision-copy">{children}</div></div>
      </div>
    </section>
  );
}

function Alternatives({ rejected, chosen, rejectedLabel = "Rejected" }: { rejected: string; chosen: string; rejectedLabel?: string }) {
  return <div className="compare" aria-label="Alternative comparison"><p><b>{rejectedLabel}</b><span>{rejected}</span></p><p className="chosen"><b>Chosen</b><span>{chosen}</span></p></div>;
}

export default function CaseStudy() {
  return <main id="main-content" className="case-page semrush-case"><article>
    <header className="case-hero shell">
      <Link className="case-back reveal" href="/#work">← Back to projects</Link>
      <div className="case-meta reveal"><span>Semrush · Local SEO</span><span>Sole Product Designer</span><span>2025–2026</span></div>
      <h1 className="reveal delay-1">Adding several locations <em>without starting over.</em></h1>
      <p className="reveal delay-2">Small businesses and agencies managing several locations had to open Add location before Semrush showed another business it already recognised. They then repeated setup for each one. I moved these opportunities into the page where they managed locations and designed one setup for several businesses.</p>
      <ProductImage image="hero" priority alt="Semrush Local dashboard showing recognised businesses and a 15% expansion discount on the Locations page" />
      <p className="shot-caption"><b>Expand your local visibility</b>Recognised businesses and the problems Semrush found appear where users manage locations; this later view also carries the 2026 discount treatment.</p>
    </header>

    <section className="case-section shell snapshot-section" aria-labelledby="snapshot-title">
      <div><p className="kicker">Project snapshot</p><h2 id="snapshot-title">Scope and ownership</h2></div>
      <dl>
        <dt>Bulk release</dt><dd>1 April 2025</dd>
        <dt>Later experiment</dt><dd>Multi-location discount, 2026</dd>
        <dt>Team</dt><dd>Product owner, 2 frontend engineers, 2 backend engineers, QA, and me; no dedicated analyst. Andrei Fateev was Design Team Lead.</dd>
        <dt>Platform</dt><dd>Semrush Local SEO · desktop web</dd>
        <dt>I owned</dt><dd>Moving suggestions to the Locations page, the multi-select and bulk setup, and the later discount-treatment design.</dd>
        <dt>We decided together</dt><dd>How to prioritise the project by reusing existing components and limiting engineering effort.</dd>
        <dt>Not mine</dt><dd>The existing one-business flow, Google data behaviour, pricing policy, and engineering implementation.</dd>
        <dt>Status</dt><dd>Bulk setup shipped in 2025. A separate discount experiment launched in 2026.</dd>
      </dl>
    </section>

    <section className="case-punch" aria-labelledby="glance-title"><div className="shell">
      <p className="kicker">At a glance</p><h2 id="glance-title">What changed in 30 seconds</h2>
      <div className="glance-grid">
        <p><b>The problem</b><span>Users saw another recognised business only after choosing Add location. They could set up one business per pass.</span></p>
        <p><b>My decisions</b><span>Show specific businesses on the Locations page, then let users select and add several without restarting setup.</span></p>
        <p><b>The evidence</b><span>The number of users adding 2+ locations rose after the 2025 release, then returned near its earlier range. In a separate 2026 pre/post comparison, the share of eligible users adding 2+ locations changed from 4.6% to 10.3%. The comparison does not show what caused the difference.</span></p>
      </div>
    </div></section>

    <section className="case-section shell orientation" aria-labelledby="brief-title">
      <div><p className="kicker">Why this mattered</p><h2 id="brief-title">Semrush recognised the next business, but showed it too late</h2></div>
      <div className="reading-copy">
        <p className="case-lede">Semrush could recognise other businesses connected to the same Google account, but showed them only after users opened Add location. Users had to decide to expand before seeing a specific opportunity, then repeat setup for every business.</p>
        <p>We considered email, first-location onboarding and the Locations page. We chose the Locations page because users were already managing businesses there. To keep the project feasible, we reused existing components and limited each setup to 20 locations. Enterprise customers already had a separate API flow.</p>
      </div>
    </section>

    <Decision no="01" title="Show a specific business before asking users to start setup" eyebrow="The challenge: a relevant suggestion, revealed too late">
      <p><strong>The challenge.</strong> Semrush had a relevant suggestion, but revealed it only after the user had already chosen to add a location.</p>
      <p>We considered email, but users could open it outside a Local SEO task. We also considered showing the offer while users set up their first location. We rejected that option because they still needed to finish the first setup and see what the product did.</p>
      <Alternatives rejected="Email or another onboarding step—more reach, but less context or a delay before seeing the first location." chosen="Show recognised businesses and the problems Semrush found on the Locations page." />
      <p><strong>Prioritisation.</strong> We gained support for the project by showing that it reused existing components and required limited engineering effort.</p>
      <blockquote><b>Trade-off:</b> the Locations page became denser and included a commercial offer. In return, users saw the opportunity while managing locations, without interrupting their first setup.</blockquote>
      <div className="decision-screens">
        <ShotPair
          images={[
            { image: "beforeList", alt: "Local Dashboard listing businesses before opening Add location" },
            { image: "beforeExpansion", alt: "Add location modal containing a recognised business suggestion" },
          ]}
          label="Before · hidden in setup"
        >
          Users opened Add location before seeing a specific business.
        </ShotPair>
        <Shot image="after" alt="Shipped Locations page with recognised businesses visible" label="After · visible in context">The opportunity appears where users already manage locations.</Shot>
      </div>
    </Decision>

    <Decision no="02" title="Let users add several businesses—and recover without starting over" eyebrow="The challenge: moving suggestions into view didn't remove repeated work" tone>
      <p>I designed a list of concrete businesses instead of one abstract Google account. Users could select several, verify them together and follow progress for the whole set.</p>
      <p>The result state handled mixed outcomes without discarding successful work. It kept completed additions, identified the businesses that failed and offered a direct path to fix them.</p>
      <blockquote><b>Trade-off:</b> The technical 20-location cap did not cover every business size. We accepted it for small businesses and agencies; enterprise customers already used a separate API flow.</blockquote>
      <div className="decision-screens">
        <Shot className="shot-block" image="select" alt="Google Business Profile selection modal with several businesses selected" label="Several businesses, one selection · 2026 variant">The available selection visual includes the later discount treatment; it does not represent the clean 2025 release.</Shot>
        <Shot className="shot-block" image="verify" alt="Verification page containing several selected businesses" label="Verify the selected set together">Users check several businesses without restarting setup.</Shot>
        <div className="shot-row shot-block">
          <Shot image="progress" alt="Creating locations progress state showing one of four created" label="Visible progress · production 2025">The flow reports how many selected locations have been created.</Shot>
          <Shot image="partial" alt="Partial result showing two of four locations added and two requiring fixes" label="Keep successes, fix failures · production 2025">Completed locations remain added while failed ones get a recovery path.</Shot>
        </div>
      </div>
    </Decision>

    <section className="metric-band" aria-labelledby="metric-title" data-analytics-event="case_evidence_semrush_locations" data-analytics-observe><div className="shell">
      <p className="kicker">2025 release signal</p><h2 id="metric-title">More users added 2+ locations after launch, but the increase did not last</h2>
      <div className="metric-grid">
        <div className="metric"><strong>≈60</strong><span>Highest weekly number of users setting up 2+ locations after release</span></div>
        <div className="metric"><strong>16</strong><span>Final visible weekly value</span></div>
        <div className="metric"><strong>17</strong><span>First labelled weekly value</span></div>
      </div>
      <ProductImage image="chart" alt="Tableau chart showing weekly users setting up two or more locations before and after the 2025 release" />
      <p className="limit">Tableau counted weekly unique users who set up 2+ locations and attributed the action to Expansion by last click. The release coincided with a sharp peak and several higher weeks. By the final captured week, the number had returned close to the first labelled value. The chart shows a launch response, not a causal or sustained increase.</p>
    </div></section>

    <section className="case-section shell" aria-labelledby="experiment-title">
      <div><p className="kicker">Separate discount experiment · 2026</p><h2 id="experiment-title">A later discount test showed a difference, not a cause</h2></div>
      <div className="reading-copy">
        <p className="case-lede">In a separate 2026 initiative, I applied the same flow to a discount treatment. A pre/post comparison changed from 4.6% to 10.3%, but the available data cannot isolate the cause.</p>
      </div>
    </section>

    <section className="reflection shell" aria-labelledby="reflection-title">
      <p className="kicker">Reflection</p><h2 id="reflection-title">Expansion was a segmented opportunity, not one generic growth loop</h2>
      <p className="reflection-single">The launch showed that removing repeated setup could unlock existing intent, but the increase did not last. Next, I would measure the full journey—from seeing a recognised business to managing it later—to understand where users stopped and which segments gained lasting value.</p>
    </section>

    <section className="appendix shell" aria-labelledby="appendix-title"><p className="kicker">Appendix</p><h2 id="appendix-title">Evidence boundaries</h2>
      <details><summary>2025 launch measurement</summary><p>The exact Tableau workbook, query, eligible population, target and possible concurrent releases are unavailable. The chart supports temporal association only.</p></details>
      <details><summary>2026 discount measurement</summary>
        <p>I designed the treatment so the discount remained visible from the Locations page through business selection. It appeared on the offer, qualifying business cards, selection banner, row tags and selected-location count.</p>
        <div className="experiment-metric" aria-label="The share of eligible users changed from 4.6 percent before to 10.3 percent after"><strong>4.6%</strong><span>→</span><strong>10.3%</strong></div>
        <p>In a one-month pre/post comparison, the share of users with 2+ eligible locations who added at least two through Expansion changed by 5.7 percentage points. The difference was statistically significant. This was not a randomised test; exact dates, counts and statistical method are unavailable. The result does not show how much of the difference came from price, clearer incentive visibility, seasonality or another concurrent change.</p>
        <div className="decision-screens">
          <Shot className="shot-block" image="discountEntry" alt="Locations page showing a 15 percent discount treatment" label="Discount beside the opportunity">The 2026 treatment placed the incentive next to recognised businesses.</Shot>
          <Shot className="shot-block" image="discountSelect" alt="Business selection modal with discount banner and 15 percent tags" label="Discount visible through selection">Banner, row tags and count showed which selected locations qualified.</Shot>
        </div>
      </details>
      <details><summary>Visual evidence</summary><p>The entry, progress and partial-result states are confirmed production behaviour from 2025. The available selection visual contains the 2026 discount treatment; a clean 2025 selection export and the exact 20-location boundary state remain unavailable.</p></details>
      <details><summary>Ownership</summary><p>I owned the placement proposal, bulk setup interaction and later discount-treatment design. Pricing policy, Google data behaviour and engineering architecture were not mine.</p></details>
    </section>

    <section className="next-case shell" aria-label="Next case study">
      <p className="kicker">Next case study</p>
      <Link className="next-case-card" href="/work/ai-agent" data-analytics-event="case_open_ai_agent">
        <span className="next-case-visual next-case-visual-wide"><img src="/work/ai-agent/dashboard-mvp.png" alt="Google Business Profile AI Agent dashboard" loading="lazy" /></span>
        <b>Google Business Profile AI Agent</b>
      </Link>
    </section>
  </article></main>;
}
