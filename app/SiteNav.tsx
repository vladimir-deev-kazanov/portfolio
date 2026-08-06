"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#work", label: "Work", section: "work" },
  { href: "/#about", label: "About", section: "about" },
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

  const active = pathname === "/cv" ? "cv" : pathname.startsWith("/work/") ? "work" : hash || "work";

  return <nav aria-label="Primary navigation">{links.map(link => <Link key={link.label} href={link.href} className={active === link.section ? "active" : undefined} aria-current={active === link.section ? "page" : undefined}>{link.label}</Link>)}</nav>;
}
