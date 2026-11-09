import manifest from "./image-manifest.json";

/*
 * Responsive picture: AVIF, then WebP (also the <img> fallback), with a
 * srcset of the widths scripts/optimize-images.py produced. File names carry
 * a content hash, so /img/** is cached for a year.
 */
type Entry = { width: number; height: number; hash: string; widths: number[] };
const images = manifest as Record<string, Entry>;

function entryFor(name: string) {
  const entry = images[name];
  if (!entry) throw new Error(`Unknown image "${name}". Run scripts/optimize-images.py.`);
  return entry;
}

function url(name: string, width: number, ext: "avif" | "webp") {
  return `/img/${name}-${width}.${entryFor(name).hash}.${ext}`;
}

/** Largest WebP, for "open full size" links. */
export function fullSize(name: string) {
  const { widths } = entryFor(name);
  return url(name, widths[widths.length - 1], "webp");
}

export default function Pic({
  name,
  alt,
  sizes,
  priority = false,
  className,
}: {
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const entry = entryFor(name);
  const srcSet = (ext: "avif" | "webp") => entry.widths.map((w) => `${url(name, w, ext)} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        className={className}
        src={fullSize(name)}
        srcSet={srcSet("webp")}
        sizes={sizes}
        width={entry.width}
        height={entry.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
