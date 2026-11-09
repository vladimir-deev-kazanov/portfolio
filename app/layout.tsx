import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SiteNav from "./SiteNav";
import AnalyticsClient from "./AnalyticsClient";
import Arrow from "./Arrow";
import "./globals.css";
// Tokens (colour, type scale, space, font stacks) live in globals-quiet-weight.css.
import "./globals-quiet-weight.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vladimirdeev.com"),
  title: { default: "Vladimir Deev-Kazanov — Product Designer", template: "%s — Vladimir Deev-Kazanov" },
  description: "Product Designer with 7+ years of experience in B2B SaaS and fintech, working on AI automation, business banking, and complex user decisions.",
  manifest: "/site.webmanifest?v=1",
  icons: {
    icon: [
      { url: "/favicon.svg?v=1", type: "image/svg+xml" },
      { url: "/favicon-32x32.png?v=1", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=1", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico?v=1", sizes: "any" },
    ],
    shortcut: "/favicon.ico?v=1",
    apple: [{ url: "/apple-touch-icon.png?v=1", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/mask-icon.svg?v=1", color: "#171717" }],
  },
  openGraph: { title: "Vladimir Deev-Kazanov — Product Designer", description: "An AI agent that posts to small businesses’ Google profiles at Semrush.", images: [{ url: "/og.png?v=2", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Vladimir Deev-Kazanov — Product Designer", description: "An AI agent that posts to small businesses’ Google profiles at Semrush.", images: ["/og.png?v=2"] },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vladimir Deev-Kazanov",
  jobTitle: "Senior Product Designer",
  url: "https://vladimirdeev.com",
  image: "https://vladimirdeev.com/apple-touch-icon.png",
  address: { "@type": "PostalAddress", addressCountry: "CY" },
  knowsAbout: ["Product design", "AI product design", "Fintech", "B2B SaaS"],
  sameAs: ["https://www.linkedin.com/in/vladimir-deev-kazanov/"],
  worksFor: { "@type": "Organization", name: "Semrush" },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/oswald-700-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="site-nav-inner shell">
          <Link href="/" className="mark-link" aria-label="V/DK, Vladimir Deev-Kazanov home">
            <span className="mark">V/DK</span>
          </Link>
          <SiteNav />
        </div>
      </header>
      {children}
      <footer className="site-footer shell"><span>© 2026 Vladimir Deev-Kazanov</span><div><a href="mailto:vladimirdeev0@gmail.com" data-analytics-event="contact_email">Email</a><a href="https://www.linkedin.com/in/vladimir-deev-kazanov/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" data-analytics-event="contact_linkedin">LinkedIn<Arrow /></a><Link href="/cv">CV</Link><Link href="/privacy">Privacy</Link></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <AnalyticsClient />
    </body></html>
  );
}
