"use client";

import { useEffect, useRef, useState } from "react";

const NATURAL_WIDTH = 660;
const NATURAL_HEIGHT = 850;
const MAX_VH_RATIO = 0.78;
const PROTOTYPE_SRC = "/work/raiffeisen-mobile/prototypes/one-time.html";

/*
 * The prototype is click-to-start. Until the visitor presses the button the
 * iframe has no src and tabindex="-1", so it can never take keyboard focus
 * (or scroll position) from the page. The old bug: the prototype loaded with
 * the page and an autofocus input inside it moved focus into the iframe.
 */
export default function QrPrototype() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [active, setActive] = useState(false);

  useEffect(() => {
    function updateScale() {
      const availableWidth = outerRef.current?.parentElement?.clientWidth ?? NATURAL_WIDTH;
      const availableHeight = window.innerHeight * MAX_VH_RATIO;
      setScale(Math.min(1, availableWidth / NATURAL_WIDTH, availableHeight / NATURAL_HEIGHT));
    }
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="qr-proto">
      {!active && (
        <button type="button" className="qr-proto-button" onClick={() => setActive(true)}>
          Play the walkthrough
        </button>
      )}
      <div
        ref={outerRef}
        className="qr-hero-prototype-wrap"
        hidden={!active}
        style={{ width: NATURAL_WIDTH * scale, height: NATURAL_HEIGHT * scale }}
      >
        <iframe
          className="qr-hero-prototype"
          tabIndex={active ? 0 : -1}
          src={active ? PROTOTYPE_SRC : undefined}
          title="Guided walkthrough: choose a QR code type, then create a one-time QR code"
          style={{ width: NATURAL_WIDTH, height: NATURAL_HEIGHT, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}
