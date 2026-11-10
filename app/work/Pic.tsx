import type { CSSProperties } from "react";
import manifest from "./image-manifest.json";

/*
 * Responsive picture: AVIF, then WebP (also the <img> fallback), with a
 * srcset of the widths scripts/optimize-images.py produced. File names carry
 * a content hash, so /img/** is cached for a year.
 *
 * Crops happen here, in CSS, never by editing pixels. CROPS lists, in source
 * pixels [left, top, right, bottom], what to trim from files whose export
 * carries a frame that isn't the screen (a baked shadow, an iPhone bezel,
 * black corners). Every place an image appears, the lightbox included, uses
 * the same crop. Replace the file with a clean Figma frame export and delete
 * its entry.
 */
type Entry = { width: number; height: number; hash: string; widths: number[] };
export type Crop = [number, number, number, number];
const images = manifest as Record<string, Entry>;

export const CROPS: Record<string, Crop> = {
  // Shadow exported as black-and-white noise, black rounded corners.
  "ai-agent/dashboard-mvp-clean": [36, 34, 36, 48],
  // A grey frame and, on option 2, a baked blue selection border.
  "ai-agent/dash-option-1": [16, 16, 16, 16],
  "ai-agent/dash-option-2": [16, 16, 16, 16],
  "ai-agent/dash-option-3": [16, 16, 16, 16],
  // The settings modal with a 24px (48 source px) margin of dimmed dashboard.
  "ai-agent/settings-enabled": [406, 31, 405, 32],
  "ai-agent/settings-disabled": [406, 31, 405, 32],
  // Figma exports whose card carries a soft 3px edge (shadow or stroke).
  "ai-agent/onboarding-posts": [6, 6, 6, 0],
  "ai-agent/actions-later": [6, 6, 6, 6],
};

function entryFor(name: string) {
  const entry = images[name];
  if (!entry) throw new Error(`Unknown image "${name}". Run scripts/optimize-images.py.`);
  return entry;
}

function url(name: string, width: number, ext: "avif" | "webp") {
  return `/img/${name}-${width}.${entryFor(name).hash}.${ext}`;
}

/** Largest WebP, for the lightbox and the no-script link. */
export function fullSize(name: string) {
  const { widths } = entryFor(name);
  return url(name, widths[widths.length - 1], "webp");
}

/** Size of the visible area after the crop, in source pixels. */
export function visibleSize(name: string) {
  const { width, height } = entryFor(name);
  const [l, t, r, b] = CROPS[name] ?? [0, 0, 0, 0];
  return { width: width - l - r, height: height - t - b };
}

/** Inline styles that show only the cropped area of an image. */
export function cropStyles(name: string, ratio?: number) {
  const { width } = entryFor(name);
  const crop = CROPS[name];
  const vis = visibleSize(name);
  if (!crop) return null;
  const [l, t] = crop;
  const pct = (n: number) => `${(n / vis.width) * 100}%`;
  return {
    box: { aspectRatio: `${ratio ?? vis.width / vis.height}` } as CSSProperties,
    img: { width: pct(width), maxWidth: "none", marginLeft: pct(-l), marginTop: pct(-t) } as CSSProperties,
  };
}

export const SIZES = {
  text: "(min-width: 760px) 680px, calc(100vw - 40px)",
  wide: "(min-width: 1250px) 1085px, 92vw",
  pair: "(min-width: 1250px) 530px, (min-width: 700px) 46vw, 92vw",
  third: "(min-width: 1250px) 345px, (min-width: 900px) 30vw, 92vw",
  phone: "(min-width: 700px) 280px, 70vw",
  flowPhone: "(min-width: 1250px) 200px, (min-width: 800px) 18vw, 44vw",
  flowScreen: "(min-width: 1250px) 345px, (min-width: 800px) 30vw, 76vw",
};

export default function Pic({
  name,
  alt,
  sizes,
  priority = false,
  className,
  ratio,
  fit = "cover",
}: {
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Show the image in a box of this width/height ratio, top-aligned. */
  ratio?: number;
  /** How an uncropped image fills that box. */
  fit?: "cover" | "contain";
}) {
  const entry = entryFor(name);
  const srcSet = (ext: "avif" | "webp") => entry.widths.map((w) => `${url(name, w, ext)} ${w}w`).join(", ");
  const crop = cropStyles(name, ratio);
  // A cropped file is wider than its box by the trimmed margins; ask for that much.
  const k = crop ? entry.width / visibleSize(name).width : 1;
  const sizeList = k === 1 ? sizes : sizes.split(/,\s*(?![^()]*\))/).map((part) => {
    const at = part.startsWith("(") ? part.indexOf(")") + 1 : 0;
    return `${part.slice(0, at)} calc(${part.slice(at).trim()} * ${k.toFixed(3)})`.trim();
  }).join(", ");
  const picture = (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizeList} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizeList} />
      <img
        className={crop ? undefined : className}
        style={crop ? crop.img : ratio ? { aspectRatio: `${ratio}` } : undefined}
        data-fit={!crop && ratio ? fit : undefined}
        src={fullSize(name)}
        srcSet={srcSet("webp")}
        sizes={sizeList}
        width={entry.width}
        height={entry.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
  if (!crop) return picture;
  return <span className={`crop${className ? ` ${className}` : ""}`} style={crop.box}>{picture}</span>;
}
