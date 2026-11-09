import Link from "next/link";
import type { ReactNode } from "react";
import Pic, { fullSize } from "./Pic";

/* Server-component pieces shared by the three case studies. */

/** One row of Role / Team / Timeline / Outcome, plus the one gap to fix first. */
export function Tldr({ rows, gap }: { rows: Array<[string, ReactNode]>; gap: ReactNode }) {
  return (
    <section className="tldr" aria-label="Summary">
      <dl>
        {rows.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
      <p className="tldr-gap"><b>The gap I’d fix first.</b> {gap}</p>
    </section>
  );
}

/** Four-row scope and ownership table. Sits below the first decision. */
export function Scope({ rows }: { rows: Array<[string, ReactNode]> }) {
  return (
    <section className="case-section shell snapshot-section" aria-labelledby="scope-title">
      <div><h2 id="scope-title">Scope and ownership</h2></div>
      <dl>
        {rows.map(([term, detail]) => (
          <div key={term} className="scope-row">
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** The one figure pattern: image (tap to open full size), then a mono label and a one-sentence claim. */
export function Fig({
  name,
  alt,
  label,
  children,
  priority = false,
  className = "",
  maxWidth,
}: {
  name: string;
  alt: string;
  label: string;
  children: ReactNode;
  priority?: boolean;
  className?: string;
  maxWidth?: number;
}) {
  const sizes = maxWidth ? `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px` : "(min-width: 1200px) 1085px, 100vw";
  return (
    <figure className={`fig ${className}`.trim()} style={maxWidth ? { maxWidth } : undefined}>
      <a className="fig-link" href={fullSize(name)} target="_blank" rel="noreferrer" aria-label={`${alt} (open full size)`}>
        <Pic name={name} alt={alt} sizes={sizes} priority={priority} />
      </a>
      <figcaption>
        <span className="fig-label">{label}</span>
        <span className="fig-claim">{children}</span>
      </figcaption>
    </figure>
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
