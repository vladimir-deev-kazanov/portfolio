import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNav from "./SiteNav";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vladimir-deev-kazanov.vladimirdeev0.chatgpt.site"),
  title: { default: "Vladimir Deev-Kazanov — Product Designer", template: "%s — Vladimir Deev-Kazanov" },
  description: "Product Designer with 7+ years of experience making complex Marketing SaaS, Fintech, and B2B SaaS products understandable and trustworthy.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Vladimir Deev-Kazanov — Product Designer", description: "I design clarity into complexity.", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Vladimir Deev-Kazanov — Product Designer", description: "I design clarity into complexity.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-nav shell">
        <Link href="/" className="wordmark">V/DK</Link>
        <SiteNav />
      </header>
      {children}
      <footer className="site-footer shell"><span>© 2026 Vladimir Deev-Kazanov</span><div><a href="mailto:vladimirdeev0@gmail.com">Email</a><a href="https://www.linkedin.com/in/vladimir-deev-kazanov-449a2459/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.behance.net/gallery/157977921/Vova-Deev-Kazanov" target="_blank" rel="noreferrer">Behance ↗</a><Link href="/cv">CV</Link></div></footer>
    </body></html>
  );
}
