import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import Arrow from "../Arrow";

export const metadata: Metadata = { title: "CV", alternates: { canonical: "/cv" }, description: "Experience, skills and education of Senior Product Designer Vladimir Deev-Kazanov." };

const roles: Array<{ company: string; role: string; date: string; intro: string; bullets: ReactNode[] }> = [
  {
    company: "Semrush",
    role: "Senior Product Designer",
    date: "Feb 2024 – Present",
    intro: "Own product design for Local SEO initiatives serving small and multi-location businesses.",
    bullets: [
      <>Sole designer of the <Link href="/work/ai-agent">Google Business Profile AI Agent</Link>, from a four-week MVP to post-launch features. I agreed the MVP scope with the product owner and owned flows, UI, interactions, cadence controls and engineering handoff, working with two frontend engineers, two backend engineers and QA.</>,
      "With no analyst on the team, I measured the launch funnel in GA4 and SQL. In month one, 8% of landing-page visitors paid for and configured the agent (no free trial). There’s no baseline, target or absolute sample size, so I treat it as directional.",
      "After launch I designed post editing, a growth task that brings a scheduled post up for review, and an agent step in Local onboarding. After the onboarding step shipped in August 2026, weekly first-time activations were 50% higher than in the month before.",
      <>Moved recognised businesses onto the Locations page and designed bulk location setup that keeps successful adds when some fail, released April 2025 (<Link href="/work/semrush-locations">case study</Link>).</>,
      "Redesigned Local product landing pages. Activation rose 42% against the previous version in the first month, among visitors who weren’t existing Local SEO users. I checked the result in Tableau.",
    ],
  },
  {
    company: "Raiffeisen Bank Russia",
    role: "Senior Product Designer",
    date: "May 2019 – Feb 2024",
    intro: "Designed complex web and mobile banking products for entrepreneurs and an enterprise CRM for CIB teams.",
    bullets: [
      "Led end-to-end design for account funding, self-service account closure, QR payments, transaction search, and counterparty risk assessment across web and mobile banking.",
      <>Tested QR-payment prototypes with five entrepreneurs, with a UX researcher. I made choosing a QR type the first step, named the types by task with a UX writer, and moved transactions to the first screen (<Link href="/work/raiffeisen-mobile">QR case study</Link>). In the month after release, 17% more QR codes of the other types were created than in the month before; a backend engineer supplied the counts at my request.</>,
      "Designed an account top-up flow associated with 70% fewer branch visits and a self-service account-closure flow associated with 95% fewer support contacts. The product owner supplied both results; I did not have direct analytics access.",
      "Designed a corporate CRM covering goals, client portfolios, profitability, product opportunities, tasks, meetings, and activity history for relationship managers and team leads.",
    ],
  },
];

const skills = [
  "Complex B2B workflows",
  "AI automation, human in the loop",
  "Interaction design",
  "Product analytics, experimentation",
  "User research",
  "Fintech",
  "Figma, FigJam",
  "Tableau, GA4, SQL",
  "Rapid prototyping",
];

export default function CV() { return <main id="main-content" className="cv-page shell">
  <section className="cv-hero"><p className="kicker">Curriculum vitae, 2026</p><h1>Vladimir Deev-Kazanov</h1><div className="cv-intro"><p className="cv-role">Senior Product Designer</p><p>Senior Product Designer, 7+ years in AI, B2B SaaS and fintech. Sole designer of Semrush’s Google Business Profile AI Agent; before that, self-service banking for entrepreneurs at Raiffeisen Bank. I run my own funnel analysis in GA4 and SQL when there’s no analyst.</p><div><a href="mailto:vladimirdeev0@gmail.com" data-analytics-event="contact_email">Email</a><a href="https://www.linkedin.com/in/vladimir-deev-kazanov/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" data-analytics-event="contact_linkedin">LinkedIn<Arrow /></a><a href="https://www.dropbox.com/scl/fi/ys41xfy5c237f0zyrzvqg/Vladimir_Deev-Kazanov_Senior_Product_Designer_CV.pdf?rlkey=1pwdant6idyxuqljdhcbxlhpc&st=11ex1pop&dl=1" target="_blank" rel="noreferrer" aria-label="Download CV (opens in new tab)" data-analytics-event="cv_download">Download CV<Arrow /></a></div></div></section>
  <section className="cv-block"><p className="kicker">Experience</p><div>{roles.map(r => <article className="role" key={r.company}><div className="role-title"><h2>{r.company}</h2><p>{r.role}<br/><span>{r.date}</span></p></div><p className="role-intro">{r.intro}</p><ul>{r.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul></article>)}</div></section>
  <section className="cv-block"><p className="kicker">Earlier and alongside</p><div className="cv-earlier"><p><b>British Higher School of Art and Design</b><br/>Mentor · Nov 2019 – Jul 2022</p><p><b>VTB</b><br/>Project Manager · Dec 2017 – Apr 2019</p></div></section>
  <section className="cv-block cv-columns"><div><p className="kicker">Skills</p><ul className="skills-list">{skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div><div><p className="kicker">Education</p><p><b>British Higher School of Art and Design</b><br/>UX/UI Design, 2018 – 2019</p><p><b>Higher School of Economics</b><br/>Digital Product Design, 2017 – 2018</p><p><b>Russian Foreign Trade Academy</b><br/>World Economy Specialist, International Business / Trade / Commerce, 2007 – 2013</p><p className="kicker mini-gap">Certification</p><p><b>GoPractice, Inc.</b><br/>Data-driven Product Management Simulator</p><p className="kicker mini-gap">Languages</p><p>Russian: Native<br/>English: C1, professional working proficiency</p></div></section>
</main> }
