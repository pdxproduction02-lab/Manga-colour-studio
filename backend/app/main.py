from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import Response
from PIL import Image
import io, json

from .pipeline import colorize

app = FastAPI(title="Manga Colorizer Ultimate", version="1.0.0")

@app.get("/health")
def health():
    return {"ok": True, "service": "manga-colorizer-api"}

@app.post("/api/colorize")
async def colorize_page(
    image: UploadFile = File(...),
    prompt: str = Form("cinematic manga colorization"),
    palette: str = Form("{}"),
):
    raw = await image.read()
    if len(raw) > 20 * 1024 * 1024:
        raise HTTPException(413, "Image exceeds 20 MB limit.")
    try:
        src = Image.open(io.BytesIO(raw)).convert("RGB")
    except Exception as exc:
        raise HTTPException(400, f"Invalid image: {exc}")

    try:
        palette_data = json.loads(palette or "{}")
    except json.JSONDecodeError:
        raise HTTPException(400, "palette must be valid JSON.")

    result = colorize(src, prompt=prompt, palette=palette_data)
    buf = io.BytesIO()
    result.save(buf, format="PNG", optimize=True)
    return Response(buf.getvalue(), media_type="image/png")
