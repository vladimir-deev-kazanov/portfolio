"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
 * On-page image viewer for every `a.media[data-lightbox]` (see Media in
 * case-parts.tsx). A native <dialog>: Esc and a click on the backdrop close
 * it, focus returns to the image that opened it. Links that share a
 * data-lightbox value page with ← and → (keys and buttons).
 * Without script the links still open the largest file.
 */
type Item = { src: string; alt: string; label: string; claim: string; crop?: number[] };

function readItem(link: HTMLAnchorElement): Item {
  const img = link.querySelector("img");
  const item = link.closest("li");
  const caption = link.closest("figure")?.querySelector(":scope > figcaption");
  const step = item?.querySelector(".flow-step, .phone-step");
  const note = item?.querySelector(".flow-note");
  const label = step?.textContent ?? caption?.querySelector(".fig-label")?.textContent ?? "";
  const claim = note?.textContent ?? caption?.querySelector(".fig-claim")?.textContent ?? "";
  const crop = link.dataset.crop ? link.dataset.crop.split(",").map(Number) : undefined;
  return { src: link.href, alt: img?.alt ?? "", label, claim, crop };
}

export default function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const [items, setItems] = useState<HTMLAnchorElement[]>([]);
  const [index, setIndex] = useState(0);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  const close = useCallback(() => dialog.current?.close(), []);
  const go = useCallback((step: number) => {
    setNatural(null);
    setIndex((i) => (i + step + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a.media[data-lightbox]");
      if (!link) return;
      event.preventDefault();
      const group = link.dataset.lightbox;
      const all = group
        ? Array.from(document.querySelectorAll<HTMLAnchorElement>("a.media[data-lightbox]")).filter((a) => a.dataset.lightbox === group && a.offsetParent !== null)
        : [link];
      opener.current = link;
      setItems(all);
      setIndex(Math.max(0, all.indexOf(link)));
      setNatural(null);
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      opener.current?.focus();
      setItems([]);
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const item = items[index] ? readItem(items[index]) : null;
  const many = items.length > 1;

  let frame: React.CSSProperties | undefined;
  let picture: React.CSSProperties | undefined;
  if (item?.crop && natural) {
    const [l, t, r, b] = item.crop;
    // Crops are in source pixels; the file shown may be a smaller variant.
    const source = items[index].querySelector("img");
    const scale = source ? natural.w / Number(source.getAttribute("width")) : 1;
    const vw = natural.w - (l + r) * scale;
    const vh = natural.h - (t + b) * scale;
    frame = { aspectRatio: `${vw} / ${vh}`, width: `min(100%, calc((100dvh - 200px) * ${vw / vh}), ${vw}px)` };
    picture = { width: `${(natural.w / vw) * 100}%`, maxWidth: "none", maxHeight: "none", marginLeft: `${(-l * scale / vw) * 100}%`, marginTop: `${(-t * scale / vw) * 100}%` };
  }

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={item ? item.alt : "Image viewer"}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      }}
    >
      {item ? (
        <div className="lightbox-body" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className={`lightbox-frame${item.crop ? " is-cropped" : ""}`} style={frame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              style={picture}
              onLoad={(e) => setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
            />
          </div>
          <div className="lightbox-bar">
            <p className="lightbox-caption">
              {item.label ? <span className="fig-label">{item.label}</span> : null}
              {item.claim ? <span>{item.claim}</span> : null}
              {many ? <span className="lightbox-count">{index + 1} of {items.length}</span> : null}
            </p>
            <div className="lightbox-actions">
              {many ? (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Previous image">←</button>
                  <button type="button" onClick={() => go(1)} aria-label="Next image">→</button>
                </>
              ) : null}
              <button type="button" onClick={close} aria-label="Close image viewer" autoFocus>✕</button>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
