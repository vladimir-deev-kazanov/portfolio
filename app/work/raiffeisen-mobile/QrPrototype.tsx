"use client";

import { useEffect, useRef, useState } from "react";

const NATURAL_WIDTH = 660;
const NATURAL_HEIGHT = 850;
const MAX_VH_RATIO = 0.78;
const PROTOTYPE_SRC = "/work/raiffeisen-mobile/prototypes/one-time.html";

export default function QrPrototype() {
  const outerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      const availableWidth = outerRef.current?.parentElement?.clientWidth ?? NATURAL_WIDTH;
      const availableHeight = window.innerHeight * MAX_VH_RATIO;
      const next = Math.min(1, availableWidth / NATURAL_WIDTH, availableHeight / NATURAL_HEIGHT);
      setScale(next);
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    // The prototype's autoplay demo focuses its rename input (autofocus in
    // the served HTML), which makes the browser scroll this iframe into
    // view whenever that happens — including on load and again on later
    // autoplay loops, each time an inner element re-focuses. The guard used
    // to key off `document.activeElement === iframe`, but the iframe stays
    // focused indefinitely once the demo starts, which reverted every
    // scroll attempt (even a plain wheel scroll) for as long as the page
    // was open. Instead, arm a short-lived window right when an inner focus
    // happens (caught via a listener on the iframe's own contentWindow, so
    // it fires on every loop, not just the first outer focus transition),
    // and only correct scroll jumps that land inside that window.
    let lastOwnScrollY = window.scrollY;
    let guardUntil = 0;
    let frame = 0;

    function armGuard() {
      guardUntil = performance.now() + 200;
    }

    function onScroll() {
      if (performance.now() < guardUntil) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          window.scrollTo({ top: lastOwnScrollY, left: 0, behavior: "instant" });
        });
      } else {
        lastOwnScrollY = window.scrollY;
      }
    }

    function attachInnerFocusGuard() {
      try {
        iframeRef.current?.contentWindow?.addEventListener("focus", armGuard, true);
      } catch {
        // Cross-origin (shouldn't happen for a same-origin prototype path);
        // nothing more we can do, guard just won't re-arm on later loops.
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    const iframeEl = iframeRef.current;
    iframeEl?.addEventListener("load", attachInnerFocusGuard);
    // The inner document's autofocus fires while it parses, which is before
    // this outer `load` event — so the very first jump would otherwise land
    // before attachInnerFocusGuard has a listener to catch it, and gets
    // silently accepted as the new "real" scroll position. Arm a generous
    // window up front to cover that first jump regardless of inner-load
    // timing; attachInnerFocusGuard above only needs to handle later loops.
    guardUntil = performance.now() + 2500;
    if (iframeEl) iframeEl.src = PROTOTYPE_SRC;
    return () => {
      window.removeEventListener("scroll", onScroll);
      iframeEl?.removeEventListener("load", attachInnerFocusGuard);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="qr-hero-prototype-wrap"
      style={{ width: NATURAL_WIDTH * scale, height: NATURAL_HEIGHT * scale }}
    >
      <iframe
        ref={iframeRef}
        className="qr-hero-prototype"
        title="Interactive prototype: choose a QR code type, then create a one-time QR code"
        style={{ width: NATURAL_WIDTH, height: NATURAL_HEIGHT, transform: `scale(${scale})` }}
      />
    </div>
  );
}
