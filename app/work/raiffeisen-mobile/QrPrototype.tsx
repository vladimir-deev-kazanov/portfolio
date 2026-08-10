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
    // autoplay loops. Attach this guard first, then start loading the
    // prototype (its `src` is intentionally left off the initial markup),
    // so the very first jump is caught too instead of racing hydration.
    let lastOwnScrollY = window.scrollY;
    let frame = 0;
    function onScroll() {
      if (document.activeElement === iframeRef.current) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          window.scrollTo({ top: lastOwnScrollY, left: 0, behavior: "instant" });
        });
      } else {
        lastOwnScrollY = window.scrollY;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    if (iframeRef.current) iframeRef.current.src = PROTOTYPE_SRC;
    return () => {
      window.removeEventListener("scroll", onScroll);
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
