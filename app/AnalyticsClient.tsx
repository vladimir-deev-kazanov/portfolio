"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PLAUSIBLE_HOST = "plausible.io";
const PRODUCTION_HOST = "vladimirdeev.com";
const scriptSource = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC;

type AnalyticsEvent =
  | "case_open_ai_agent"
  | "case_open_raiffeisen"
  | "case_decision_ai_agent"
  | "case_evidence_ai_agent"
  | "case_result_ai_agent"
  | "case_decision_raiffeisen"
  | "case_evidence_raiffeisen"
  | "case_result_raiffeisen"
  | "cv_download"
  | "contact_email"
  | "contact_linkedin"
  | "external_project_open"
  | "not_found";

declare global {
  interface Window {
    plausible?: ((event: AnalyticsEvent | "pageview") => void) & {
      init?: (options?: Record<string, unknown>) => void;
      o?: Record<string, unknown>;
      q?: unknown[][];
    };
  }
}

function approvedScriptSource(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === PLAUSIBLE_HOST ? url.href : null;
  } catch {
    return null;
  }
}

function trackingAllowed() {
  return window.location.hostname === PRODUCTION_HOST
    && navigator.doNotTrack !== "1"
    && document.documentElement.dataset.analyticsDisabled !== "true";
}

function track(event: AnalyticsEvent) {
  if (trackingAllowed()) window.plausible?.(event);
}

export default function AnalyticsClient() {
  const pathname = usePathname();

  useEffect(() => {
    const src = approvedScriptSource(scriptSource);
    if (!src || !trackingAllowed()) return;

    window.plausible = window.plausible || Object.assign(
      (event: AnalyticsEvent | "pageview") => {
        window.plausible!.q = window.plausible!.q || [];
        window.plausible!.q!.push([event]);
      },
      { q: [] as unknown[][] },
    );
    window.plausible.init = window.plausible.init || ((options = {}) => {
      window.plausible!.o = options;
    });
    window.plausible.init();

    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      script.dataset.portfolioAnalytics = "plausible";
      document.head.appendChild(script);
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event]")
        : null;
      const name = target?.dataset.analyticsEvent as AnalyticsEvent | undefined;
      if (name && !target?.hasAttribute("data-analytics-observe")) track(name);
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (!approvedScriptSource(scriptSource) || !trackingAllowed()) return;

    const reached = new Set<string>();
    const timers = new Map<string, ReturnType<typeof setTimeout>>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const name = element.dataset.analyticsEvent as AnalyticsEvent | undefined;
        if (!name || reached.has(name)) continue;

        const visibleShare = entry.intersectionRect.height
          / Math.min(entry.boundingClientRect.height, window.innerHeight);
        if (entry.isIntersecting && visibleShare >= 0.5) {
          if (!timers.has(name)) {
            timers.set(name, setTimeout(() => {
              reached.add(name);
              timers.delete(name);
              track(name);
              observer.unobserve(element);
            }, 500));
          }
        } else {
          const timer = timers.get(name);
          if (timer) clearTimeout(timer);
          timers.delete(name);
        }
      }
    }, { threshold: [0.5] });

    document.querySelectorAll<HTMLElement>("[data-analytics-observe]").forEach((element) => observer.observe(element));
    document.querySelectorAll<HTMLElement>("[data-analytics-on-mount]").forEach((element) => {
      const name = element.dataset.analyticsEvent as AnalyticsEvent | undefined;
      if (name) track(name);
    });

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
