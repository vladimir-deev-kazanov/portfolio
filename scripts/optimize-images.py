#!/usr/bin/env python3
"""Encode every original in assets/originals/ as AVIF (q 60) and WebP (q 82).

Variants follow one width ladder (LADDER), capped at the source width. File names carry a
content hash, so they can be cached for a year (see public/_headers).
Writes public/img/** and app/work/image-manifest.json.

    python3 scripts/optimize-images.py          # needs Pillow with AVIF + WebP
"""
import hashlib, json, re
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "originals"
OUT = ROOT / "public" / "img"
MANIFEST = ROOT / "app" / "work" / "image-manifest.json"

# One width ladder for every image, so srcset can serve 2x at each figure
# width the site uses (680 text, 1085 wide, 530 pair, 345 third, 280 phone,
# 170 flow phone). Capped at the source width, which is always included.
ENCODING = b"ladder-v1;flatten-white"
LADDER = (280, 360, 560, 720, 1080, 1360, 1600, 2170)

manifest = {}
for path in sorted(SRC.rglob("*")):
    if path.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
        continue
    name = path.relative_to(SRC).with_suffix("").as_posix()
    # The salt changes the names when the encoding changes, not only the source.
    digest = hashlib.sha1(path.read_bytes() + ENCODING).hexdigest()[:8]
    image = Image.open(path)
    if image.mode in ("RGBA", "LA", "P"):
        # Transparent corners flatten to white, not black.
        rgba = image.convert("RGBA")
        image = Image.alpha_composite(Image.new("RGBA", rgba.size, (255, 255, 255, 255)), rgba)
    image = image.convert("RGB")
    width, height = image.size
    widths = sorted({min(width, w) for w in LADDER} | {min(width, 2170)})
    # drop near-duplicates (within 8%), keeping the largest
    kept = []
    for w in reversed(widths):
        if not kept or w < kept[-1] / 1.08:
            kept.append(w)
    kept.reverse()
    target = OUT / name
    target.parent.mkdir(parents=True, exist_ok=True)
    stale = re.compile(rf"^{re.escape(target.name)}-\d+\.[0-9a-f]{{8}}\.(avif|webp)$")
    for old in target.parent.iterdir():
        if stale.match(old.name):
            old.unlink()
    for w in kept:
        resized = image if w == width else image.resize((w, round(height * w / width)), Image.LANCZOS)
        flat = resized.convert("RGB")
        flat.save(f"{target}-{w}.{digest}.avif", quality=60, speed=4)
        flat.save(f"{target}-{w}.{digest}.webp", quality=82, method=6)
    manifest[name] = {"width": width, "height": height, "hash": digest, "widths": kept}
    print(f"{name}: {width}x{height} -> {kept}")

MANIFEST.write_text(json.dumps(manifest, indent=1, sort_keys=True) + "\n")
total = sum(f.stat().st_size for f in OUT.rglob("*") if f.is_file())
print(f"{len(manifest)} images, {total/1024:.0f} KB total in public/img")
