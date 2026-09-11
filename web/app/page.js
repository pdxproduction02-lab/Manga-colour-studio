'use client';

import {useState} from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [file,setFile] = useState(null);
  const [prompt,setPrompt] = useState(
    'cinematic manga colorization, realistic lighting, preserve original line art'
  );
  const [busy,setBusy] = useState(false);
  const [result,setResult] = useState(null);
  const [error,setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!file) return;
    setBusy(true); setError(''); setResult(null);
    try {
      const form = new FormData();
      form.append('image',file);
      form.append('prompt',prompt);
      form.append('palette',JSON.stringify({
        line:[18,18,22], paper:[246,244,238], accent:[55,85,130]
      }));
      const r = await fetch(`${API}/api/colorize`,{method:'POST',body:form});
      if (!r.ok) throw new Error(await r.text());
      setResult(URL.createObjectURL(await r.blob()));
    } catch(err) {
      setError(err.message || 'Colorization failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{maxWidth:1000,margin:'0 auto',padding:'48px 20px'}}>
      <h1 style={{fontSize:42,marginBottom:8}}>Manga Colorizer Ultimate</h1>
      <p style={{color:'#aaa'}}>Preserve the drawing. Add controlled color.</p>
      <form onSubmit={submit} style={{marginTop:32,display:'grid',gap:18}}>
        <input type="file" accept="image/png,image/jpeg,image/webp"
          onChange={e=>setFile(e.target.files?.[0]||null)}
          style={{padding:18,background:'#151519',color:'#fff',borderRadius:12}} />
        <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}
          rows={4} style={{padding:14,background:'#151519',color:'#fff',
          borderRadius:12,border:'1px solid #333'}} />
        <button disabled={!file||busy}
          style={{padding:16,border:0,borderRadius:12,fontWeight:700}}>
          {busy ? 'Colorizing…' : 'Colorize page'}
        </button>
      </form>
      {error && <pre style={{color:'#ff8a8a',whiteSpace:'pre-wrap'}}>{error}</pre>}
      {result && (
        <section style={{marginTop:36}}>
          <h2>Result</h2>
          <img src={result} alt="Colorized manga page"
            style={{maxWidth:'100%',borderRadius:12,background:'#fff'}} />
          <p><a href={result} download="colorized-manga.png" style={{color:'#fff'}}>
            Download PNG
          </a></p>
        </section>
      )}
    </main>
  );
}
