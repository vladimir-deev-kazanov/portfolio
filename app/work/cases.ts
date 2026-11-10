/*
 * One source for each case's name and one-line summaries. The page <title>,
 * Open Graph, the home card and the next-case row all read from here, so a
 * case can't drift into three names again.
 */
export type CaseInfo = {
  href: string;
  /** Product + company. Used for <title>, OG, home card and next-case row. */
  title: string;
  /** Meta description and OG description. */
  description: string;
  /** Home card: the problem and my answer, one sentence. */
  summary: string;
  /** Home card and next-case row: one confirmed result. */
  outcome: string;
  /** Home card: role and period. */
  role: string;
  tag: string;
  /** Link to the live product and its status, shown in the case summary. */
  live: { href: string; label: string; status: string };
};

export const CASES = {
  aiAgent: {
    href: "/work/ai-agent",
    title: "Google Business Profile AI Agent, Semrush",
    description: "How I designed the first release of an AI agent that posts to small businesses’ Google profiles in one design week, then post editing, a growth task and an onboarding step after launch.",
    summary: "One design week before a conference launch. With the product owner I cut the MVP to connect, configure and see what the agent did, then designed editing and onboarding after launch.",
    outcome: "8% of landing-page visitors paid for and configured the agent in month one.",
    role: "Sole product designer · 2025–2026",
    tag: "AI product",
    live: { href: "https://www.semrush.com/local-business/start/", label: "Semrush Local", status: "Live since 2025" },
  },
  raiffeisen: {
    href: "/work/raiffeisen-mobile",
    title: "QR payments for merchants and cashiers, Raiffeisen Bank",
    description: "How I made choosing a QR type the first step, named the types by the merchant’s task, put transactions first, and designed payment-only access for cashiers.",
    summary: "In usability tests, merchants couldn’t find the other QR types or tell them apart. I made choosing a type the first step, named the types by task, and gave cashiers payment-only access.",
    outcome: "Shipped to production. In the month after release, 17% more QR codes of the other types were created than in the month before.",
    role: "Sole product designer · 2023",
    tag: "Fintech",
    live: { href: "https://apps.apple.com/cy/app/%D1%80%D0%B0%D0%B9%D1%84%D1%84%D0%B0%D0%B9%D0%B7%D0%B5%D0%BD-%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81-%D1%80%D0%BE%D1%81%D1%81%D0%B8%D1%8F/id1295021523", label: "Raiffeisen Business (Russia), App Store", status: "Shipped to production in 2023 · Russian market · screens translated" },
  },
  locations: {
    href: "/work/semrush-locations",
    title: "Bulk location setup, Semrush",
    description: "How I moved recognised businesses onto the Locations page and designed bulk select, verify and setup that keeps successful adds when some fail.",
    summary: "Semrush recognised users’ other businesses but showed them only after Add location. I surfaced them on the Locations page and designed setup for several at once.",
    outcome: "Users adding 2+ locations spiked after launch, then returned near the earlier level.",
    role: "Sole product designer · 2025",
    tag: "B2B SaaS",
    live: { href: "https://www.semrush.com/local-business/start/", label: "Semrush Local", status: "Live since 2025" },
  },
} satisfies Record<string, CaseInfo>;
