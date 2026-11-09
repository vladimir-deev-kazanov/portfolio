#!/usr/bin/env python3
"""Encode every original in assets/originals/ as AVIF (q 60) and WebP (q 82).

Variants are sized at 640px, at the largest CSS width the image is rendered
at, and at twice that (never above the source width). File names carry a
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

# Largest CSS width each image is rendered at. Anything not listed uses its
# own width halved (a 2x export shown at 1x).
DISPLAY = {
    "avatar": 240,
    "ai-agent/dashboard-mvp-full": 1085, "ai-agent/dashboard-mvp": 580,
    "ai-agent/actions-mvp": 475, "ai-agent/actions-later": 670,
    "ai-agent/setup-crop": 700, "ai-agent/post-editor-crop": 434,
    "ai-agent/settings-enabled": 1085, "ai-agent/settings-disabled": 1085,
    "semrush-locations/hero": 1085, "semrush-locations/before-list": 1085,
    "semrush-locations/before-expansion": 1085, "semrush-locations/bulk-expansion": 580,
    "semrush-locations/bulk-select-crop": 700, "semrush-locations/bulk-verify-crop": 995,
    "semrush-locations/bulk-progress-crop": 525, "semrush-locations/bulk-partial-crop": 720,
    "semrush-locations/results-chart-crop": 1085,
    "raiffeisen-mobile/screens/one-type-en": 375,
}

manifest = {}
for path in sorted(SRC.rglob("*")):
    if path.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
        continue
    name = path.relative_to(SRC).with_suffix("").as_posix()
    digest = hashlib.sha1(path.read_bytes()).hexdigest()[:8]
    image = Image.open(path).convert("RGBA" if path.suffix.lower() == ".png" else "RGB")
    width, height = image.size
    shown = DISPLAY.get(name, max(1, width // 2))
    widths = sorted({min(width, w) for w in (640, shown, shown * 2)})
    # drop near-duplicates (within 8%)
    kept = []
    for w in widths:
        if not kept or w > kept[-1] * 1.08:
            kept.append(w)
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
