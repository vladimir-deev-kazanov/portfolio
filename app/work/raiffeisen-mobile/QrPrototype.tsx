"use client";

import { useEffect, useRef, useState } from "react";

const NATURAL_WIDTH = 660;
const NATURAL_HEIGHT = 850;
const MAX_VH_RATIO = 0.78;

export default function QrPrototype() {
  const outerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div
      ref={outerRef}
      className="qr-hero-prototype-wrap"
      style={{ width: NATURAL_WIDTH * scale, height: NATURAL_HEIGHT * scale }}
    >
      <iframe
        className="qr-hero-prototype"
        src="/work/raiffeisen-mobile/prototypes/one-time.html"
        title="Interactive prototype: choose a QR code type, then create a one-time QR code"
        style={{ width: NATURAL_WIDTH, height: NATURAL_HEIGHT, transform: `scale(${scale})` }}
      />
    </div>
  );
}
