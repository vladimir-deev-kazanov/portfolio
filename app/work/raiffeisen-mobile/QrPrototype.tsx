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
    // The browser scrolls this iframe into view once it becomes the
    // outer document's focused element — confirmed the trigger is that
    // outer transition, not any specific element focused inside it (the
    // inner document's own activeElement stays "body" throughout; nothing
    // inside ever visibly focuses). That transition fires exactly once,
    // reliably, but the resulting scroll doesn't land immediately — logged
    // timestamps show scrollY still untouched 2 frames (~30ms) after the
    // transition, with the actual jump landing sometime after that. So:
    // detect the one-time transition, then keep correcting for a bounded
    // window afterward (not from mount, and not re-armed by anything later)
    // long enough to catch wherever the browser's own scroll actually lands.
    let lastGoodY = window.scrollY;
    let wasFocused = false;
    let correctUntil = 0;
    let rafId = 0;

    function tick() {
      const isFocused = document.activeElement === iframeRef.current;
      const now = performance.now();

      if (isFocused && !wasFocused) {
        correctUntil = now + 1000;
      }

      if (now < correctUntil && window.scrollY !== lastGoodY) {
        window.scrollTo({ top: lastGoodY, left: 0, behavior: "instant" });
      }

      if (!isFocused) lastGoodY = window.scrollY;
      wasFocused = isFocused;
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    if (iframeRef.current) iframeRef.current.src = PROTOTYPE_SRC;
    return () => cancelAnimationFrame(rafId);
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
