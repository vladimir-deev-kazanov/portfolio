import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Chivo, Geist_Mono, Alfa_Slab_One } from "next/font/google";
import SiteNav from "./SiteNav";
import AnalyticsClient from "./AnalyticsClient";
import Arrow from "./Arrow";
import "./globals.css";

const chivo = Chivo({ variable: "--font-chivo", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const alfaSlab = Alfa_Slab_One({ variable: "--font-alfa", subsets: ["latin"], weight: "400" });

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
  openGraph: { title: "Vladimir Deev-Kazanov — Product Designer", description: "I turn product insights into clear decisions.", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Vladimir Deev-Kazanov — Product Designer", description: "I turn product insights into clear decisions.", images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${chivo.variable} ${mono.variable} ${alfaSlab.variable}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="site-nav shell">
          <Link href="/" className="wordmark" aria-label="Vladimir Deev-Kazanov — home">
            <img src="/avatar.png" alt="" width={44} height={44} className="wordmark-avatar" />
          </Link>
          <SiteNav />
        </div>
      </header>
      {children}
      <footer className="site-footer shell"><span>© 2026 Vladimir Deev-Kazanov</span><div><a href="mailto:vladimirdeev0@gmail.com" data-analytics-event="contact_email">Email</a><a href="https://www.linkedin.com/in/vladimir-deev-kazanov/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)" data-analytics-event="contact_linkedin">LinkedIn<Arrow /></a><Link href="/cv">CV</Link><Link href="/privacy">Privacy</Link></div></footer>
      <AnalyticsClient />
    </body></html>
  );
}
