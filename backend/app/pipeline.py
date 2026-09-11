from PIL import Image, ImageEnhance
import numpy as np

DEFAULT_PALETTE = {
    "line": (18, 18, 22),
    "paper": (246, 244, 238),
    "accent": (55, 85, 130),
}

def colorize(image: Image.Image, prompt="", palette=None) -> Image.Image:
    # Deterministic fallback that preserves the source geometry/ink.
    # Replace this function with the production ML adapter.
    p = DEFAULT_PALETTE.copy()
    for k, v in (palette or {}).items():
        if isinstance(v, list) and len(v) == 3:
            p[k] = tuple(max(0, min(255, int(x))) for x in v)

    rgb = np.asarray(image).astype(np.float32) / 255.0
    lum = 0.299 * rgb[...,0] + 0.587 * rgb[...,1] + 0.114 * rgb[...,2]

    paper = np.array(p["paper"], dtype=np.float32) / 255.0
    line = np.array(p["line"], dtype=np.float32) / 255.0
    accent = np.array(p["accent"], dtype=np.float32) / 255.0

    out = paper[None,None,:] * (0.72 + 0.28 * lum[...,None])
    ink = np.clip((0.48 - lum) / 0.48, 0, 1)[...,None]
    out = out * (1 - ink) + line[None,None,:] * ink
    out = out * 0.92 + accent[None,None,:] * 0.08

    result = Image.fromarray(np.uint8(np.clip(out,0,1)*255), "RGB")
    return ImageEnhance.Contrast(result).enhance(1.04)
