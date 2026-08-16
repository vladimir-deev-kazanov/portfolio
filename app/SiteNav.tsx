"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#work", label: "Work", section: "work" },
  { href: "/cv", label: "CV", section: "cv" },
  { href: "/#contact", label: "Contact", section: "contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.slice(1));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = ["work", "contact"].map(id => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(entry => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        setHash(topmost.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const active = pathname === "/cv" ? "cv" : pathname === "/about" ? "about" : pathname.startsWith("/work/") ? "work" : hash || "work";

  return <nav aria-label="Primary navigation">{links.map(link => <Link key={link.label} href={link.href} className={active === link.section ? "active" : undefined} aria-current={active === link.section ? "page" : undefined}>{link.label}</Link>)}</nav>;
}
