# Manga Colorizer Ultimate

A production-oriented starter for structure-preserving manga colorization.

## Stack
- Next.js frontend
- FastAPI inference API
- Pillow/OpenCV-compatible image pipeline
- Stable model-adapter interface
- Docker deployment files
- Project palette / prompt support

## Quick start

### API
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Web
```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000.

## Vercel
Deploy `web/` to Vercel. Put the FastAPI service on a GPU-capable host when using an actual ML checkpoint, then set `NEXT_PUBLIC_API_URL` to its public API URL.

## Important
The included backend has a deterministic fallback so the repository runs immediately without a large model download. For production-quality colorization, implement `ColorizationModel` with a properly licensed manga-colorization checkpoint/model.

The pipeline is intended for fictional artwork transformation. It does not attempt to circumvent another provider's safeguards.
