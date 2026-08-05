import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vladimir-deev-kazanov.vladimirdeev0.chatgpt.site"),
  title: { default: "Vladimir Deev-Kazanov — Product Designer", template: "%s — Vladimir Deev-Kazanov" },
  description: "Senior Product Designer making complex AI and financial products understandable and trustworthy.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Vladimir Deev-Kazanov — Product Designer", description: "I design clarity into complexity.", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Vladimir Deev-Kazanov — Product Designer", description: "I design clarity into complexity.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>
      <header className="site-nav shell">
        <Link href="/" className="wordmark">V/DK</Link>
        <nav aria-label="Primary navigation"><Link href="/#work">Work</Link><Link href="/cv">CV</Link><a href="mailto:vladimirdeev0@gmail.com">Contact</a></nav>
      </header>
      {children}
      <footer className="site-footer shell"><span>Vladimir Deev-Kazanov</span><span>Product Designer · 2026</span><a href="https://www.linkedin.com/in/vladimir-deev-kazanov-449a2459/" target="_blank" rel="noreferrer">LinkedIn ↗</a></footer>
    </body></html>
  );
}
