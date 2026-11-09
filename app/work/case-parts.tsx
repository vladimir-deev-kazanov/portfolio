import type { ReactNode } from "react";

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
