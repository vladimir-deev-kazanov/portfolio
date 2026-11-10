import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Pic, { CROPS, SIZES, fullSize, visibleSize } from "./Pic";
import VideoPlayer from "./VideoPlayer";
import Arrow from "../Arrow";

/* Server-component pieces shared by the three case studies. */

/** One row of Role / Team / Timeline / Outcome, plus the ownership boundary that matters. */
export function Tldr({
  rows,
  notMine,
  live,
  kit = false,
}: {
  rows: Array<[string, ReactNode]>;
  notMine?: ReactNode;
  live?: { href: string; label: string; status: string };
  kit?: boolean;
}) {
  return (
    <section className="tldr" aria-label="Summary">
      {live ? (
        <p className="live-product">
          <a href={live.href} target="_blank" rel="noreferrer" aria-label={`Live product: ${live.label} (opens in new tab)`}>Live product: {live.label}<Arrow /></a>
          <span>{live.status}</span>
        </p>
      ) : null}
      <dl>
        {rows.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
      {kit ? <p className="tldr-note"><b>Inside the Semrush UI kit.</b> The screens are built from the kit’s base components. My work: the flows, screen composition, information hierarchy, states and behaviour.</p> : null}
      {notMine ? <p className="tldr-note"><b>Not mine.</b> {notMine}</p> : null}
    </section>
  );
}

/** Compact in-page index for long cases. Plain anchors, no script. */
export function SectionNav({ items }: { items: Array<[string, string]> }) {
  return (
    <nav className="case-nav" aria-label="Sections of this case study">
      <ol>
        {items.map(([id, label]) => (
          <li key={id}><a href={`#${id}`}>{label}</a></li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * One image inside the shared figure frame (stage background, 8px radius,
 * hairline). Clicking opens the on-page lightbox (Lightbox.tsx); without
 * script the link opens the largest file. Images with the same `gallery`
 * page through together.
 */
export function Media({
  name,
  alt,
  sizes,
  priority = false,
  ratio,
  gallery,
  className = "",
  fit,
}: {
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  ratio?: number;
  gallery?: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const crop = CROPS[name];
  const vis = visibleSize(name);
  return (
    <a
      className={`media ${className}`.trim()}
      style={{ "--ar": ratio ?? vis.width / vis.height } as CSSProperties}
      href={fullSize(name)}
      data-lightbox={gallery ?? ""}
      data-crop={crop ? crop.join(",") : undefined}
      aria-label={`${alt} (open larger view)`}
    >
      <Pic name={name} alt={alt} sizes={sizes} priority={priority} ratio={ratio} fit={fit} />
    </a>
  );
}

function Caption({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figcaption>
      <span className="fig-label">{label}</span>
      <span className="fig-claim">{children}</span>
    </figcaption>
  );
}

/**
 * The one figure pattern: image, then a short label and a one-sentence claim.
 * Width is `text` (the 680px column) or `wide` (the page container); `pair`
 * and three-up rows are grids inside `wide`.
 */
export function Fig({
  name,
  alt,
  label,
  children,
  priority = false,
  className = "",
  wide = false,
  ratio,
  sizes,
  gallery,
}: {
  name: string;
  alt: string;
  label: string;
  children: ReactNode;
  priority?: boolean;
  className?: string;
  wide?: boolean;
  ratio?: number;
  sizes?: string;
  gallery?: string;
}) {
  return (
    <figure className={`fig${wide ? " wide" : ""} ${className}`.trim()} style={{ "--ar": ratio ?? visibleSize(name).width / visibleSize(name).height } as CSSProperties}>
      <Media name={name} alt={alt} sizes={sizes ?? (wide ? SIZES.wide : SIZES.text)} priority={priority} ratio={ratio} gallery={gallery} />
      <Caption label={label}>{children}</Caption>
    </figure>
  );
}

export type PhoneScreen = { name: string; label?: string; alt: string };

/**
 * Up to three phone screens in a row on `wide`, one screen height, no device
 * frame. Long screens show their first screenful; the lightbox shows all of it.
 * Under 700px the row scrolls sideways and the next screen peeks in.
 */
export function PhoneRow({ label, claim, screens, priority = false, gallery }: { label: string; claim: ReactNode; screens: PhoneScreen[]; priority?: boolean; gallery: string }) {
  return (
    <figure className="fig phone-row wide">
      <ol>
        {screens.map(({ name, label: screenLabel, alt }, index) => (
          <li key={name}>
            {screenLabel ? <span className="phone-step">{index + 1}. {screenLabel}</span> : null}
            <Media name={name} alt={alt} sizes={SIZES.phone} ratio={PHONE} priority={priority && index === 0} gallery={gallery} />
          </li>
        ))}
      </ol>
      <Caption label={label}>{claim}</Caption>
    </figure>
  );
}

/** Phone screen proportion shared by every row and flow (375 × 812). */
export const PHONE = 375 / 812;

/**
 * A silent prototype recording, in the figure frame, with its own play/pause
 * control (VideoPlayer.tsx). Autoplays in view unless reduced motion is on.
 */
export function Clip({
  src,
  poster,
  width,
  height,
  label,
  alt,
  children,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <figure className="fig clip wide" style={{ "--ar": width / height } as CSSProperties}>
      <VideoPlayer src={src} poster={fullSize(poster)} width={width} height={height} alt={alt} />
      <Caption label={label}>{children}</Caption>
    </figure>
  );
}

export type FlowStep = { name: string; title: string; alt: string; note?: string; shape?: "phone" | "screen" | "tall" };

/**
 * A row of real screens, each opening in the lightbox, which pages through
 * the whole gallery. Desktop screens sit in 4:3 tiles, phones at screen
 * height, both top-aligned. `cols` fixes the column count; without it the
 * grid fills automatically.
 */
export function FlowGallery({ label, steps, start = 1, cols, gallery, fit }: { label: string; steps: FlowStep[]; start?: number; cols?: number; gallery?: string; fit?: "cover" | "contain" }) {
  const group = gallery ?? label;
  return (
    <div className="flow-gallery wide" role="group" aria-label={label} style={cols ? ({ "--cols": cols } as CSSProperties) : undefined} data-cols={cols ? "" : undefined}>
      <p className="flow-gallery-label">{label}</p>
      <ol start={start}>
        {steps.map(({ name, title, alt, note, shape = "screen" }, i) => (
          <li key={name} className={`flow-item ${shape}`}>
            <Media name={name} alt={alt} sizes={shape === "phone" ? SIZES.flowPhone : SIZES.flowScreen} ratio={shape === "phone" ? PHONE : 4 / 3} gallery={group} fit={fit} />
            <span className="flow-step">{start + i}. {title}</span>
            {note ? <span className="flow-note">{note}</span> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** "Full flow" section at the end of a case: every real screen from entry to result. */
export function FullFlow({ intro, children }: { intro: ReactNode; children: ReactNode }) {
  return (
    <section className="full-flow" aria-labelledby="flow-title">
      <div className="shell">
        <h2 id="flow-title">Full flow</h2>
        <p className="full-flow-intro">{intro}</p>
        {children}
      </div>
    </section>
  );
}

/** One decision. Heading size is the shared h2 size; the label carries the number. */
export function Decision({
  n,
  title,
  tone = false,
  event,
  children,
}: {
  n: number;
  title: string;
  tone?: boolean;
  event?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`decision-section${tone ? " tone" : ""}`}
      aria-labelledby={`decision-${n}`}
      {...(event ? { "data-analytics-event": event, "data-analytics-observe": true } : {})}
    >
      <div className="shell">
        <p className="decision-label">Decision {n}</p>
        <h2 id={`decision-${n}`}>{title}</h2>
        <div className="decision-copy">{children}</div>
      </div>
    </section>
  );
}

/** The full alternative scaffold. Used once per case, on the main decision. */
export function Alternatives({ couldHave, did }: { couldHave: ReactNode; did: ReactNode }) {
  return (
    <div className="compare">
      <p><b>We could have</b><span>{couldHave}</span></p>
      <p className="chosen"><b>We did</b><span>{did}</span></p>
    </div>
  );
}

/** Method, result, and what the evidence doesn't show. One per case, after the decisions. */
export function Evidence({
  title,
  event,
  method,
  result,
  limits,
  dark = false,
  children,
}: {
  title: string;
  event: string;
  method: ReactNode;
  result: ReactNode;
  limits: ReactNode;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`evidence-wrap${dark ? " dark" : ""}`} aria-labelledby="evidence-title" data-analytics-event={event} data-analytics-observe>
      <div className="case-section shell evidence">
        <div><h2 id="evidence-title">{title}</h2></div>
        <dl>
          <div className="scope-row"><dt>Method</dt><dd>{method}</dd></div>
          <div className="scope-row"><dt>Result</dt><dd>{result}</dd></div>
          <div className="scope-row"><dt>What it doesn’t show</dt><dd>{limits}</dd></div>
        </dl>
      </div>
      {children ? <div className="shell evidence-figure">{children}</div> : null}
    </section>
  );
}

/** Closing contact line. */
export function EndContact() {
  return (
    <p className="end-contact shell">
      Want the full story? <a href="mailto:vladimirdeev0@gmail.com" data-analytics-event="contact_email">Email</a> · <Link href="/cv">CV</Link>
    </p>
  );
}

/** Full-width row to the next case. No thumbnail. */
export function NextCase({ href, title, outcome, event }: { href: string; title: string; outcome: string; event: string }) {
  return (
    <section className="next-case shell" aria-label="Next case study">
      <Link className="next-row" href={href} data-analytics-event={event}>
        <span className="next-label">Next case study</span>
        <h2>{title}</h2>
        <p>{outcome}</p>
        <span className="next-arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
