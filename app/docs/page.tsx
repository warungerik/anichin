"use client";

import React from "react";

// Catatan: Metadata dihapus dari sini karena "use client" tidak memperbolehkan ekspor metadata.
// Metadata sudah ditangani secara global di layout.tsx.

export default function DocsPage() {
  return (
    <>
      <style>{`
        :root {
          --bg: #0a0a0f;
          --surface: #111118;
          --surface2: #1a1a26;
          --border: #252535;
          --accent: #7c6af7;
          --accent2: #f76a8c;
          --accent3: #6af7c4;
          --text: #e8e8f0;
          --muted: #6b6b8a;
          --get: #6af7c4;
          --get-bg: rgba(106, 247, 196, 0.08);
          --code-bg: #0d0d16;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Syne', sans-serif;
          line-height: 1.6;
          min-height: 100vh;
        }
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.4;
        }
        body::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }
        .layout { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; position: relative; z-index: 1; }
        .sidebar { position: sticky; top: 0; height: 100vh; overflow-y: auto; border-right: 1px solid var(--border); padding: 2rem 0; background: rgba(10,10,15,0.9); backdrop-filter: blur(12px); }
        .sidebar::-webkit-scrollbar { width: 4px; }
        .sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .logo { padding: 0 1.5rem 2rem; border-bottom: 1px solid var(--border); }
        .logo-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 0.4rem 0.8rem; font-size: 0.7rem; color: var(--accent3); font-family: 'JetBrains Mono', monospace; margin-bottom: 0.75rem; letter-spacing: 0.1em; }
        .logo h1 { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; }
        .logo h1 span { color: var(--accent); }
        .logo p { font-size: 0.75rem; color: var(--muted); margin-top: 0.25rem; font-family: 'JetBrains Mono', monospace; }
        .nav-section { padding: 1.5rem 1.5rem 0.5rem; }
        .nav-section-title { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); font-weight: 600; margin-bottom: 0.5rem; }
        .nav-item { display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.75rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; color: var(--muted); transition: all 0.15s; text-decoration: none; border: 1px solid transparent; }
        .nav-item:hover { color: var(--text); background: var(--surface2); border-color: var(--border); }
        .nav-item.active { color: var(--accent3); background: rgba(106,247,196,0.06); border-color: rgba(106,247,196,0.2); }
        .method-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--get); flex-shrink: 0; }
        .sidebar-footer { padding: 1.5rem; border-top: 1px solid var(--border); margin-top: 2rem; }
        .version-chip { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); background: var(--surface2); border: 1px solid var(--border); border-radius: 4px; padding: 0.2rem 0.5rem; }
        .main { padding: 3rem 4rem; max-width: 900px; }
        @media (max-width: 768px) { .layout { grid-template-columns: 1fr; } .sidebar { display: none; } .main { padding: 2rem 1.5rem; } }
        .hero { margin-bottom: 4rem; padding-bottom: 3rem; border-bottom: 1px solid var(--border); }
        .hero-tag { display: inline-flex; align-items: center; gap: 0.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; letter-spacing: 0.1em; color: var(--accent); background: rgba(124,106,247,0.1); border: 1px solid rgba(124,106,247,0.3); border-radius: 4px; padding: 0.3rem 0.7rem; margin-bottom: 1.5rem; }
        .hero-tag::before { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .hero h2 { font-size: 3rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 1rem; }
        .hero h2 em { font-style: normal; color: transparent; -webkit-text-stroke: 1px var(--accent); }
        .hero p { color: var(--muted); max-width: 500px; line-height: 1.7; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; }
        .hero-meta { display: flex; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; }
        .meta-chip { display: flex; align-items: center; gap: 0.4rem; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--muted); background: var(--surface2); border: 1px solid var(--border); border-radius: 4px; padding: 0.3rem 0.7rem; }
        .meta-chip strong { color: var(--text); }
        .base-url-box { background: var(--code-bg); border: 1px solid var(--border); border-radius: 10px; padding: 1.25rem 1.5rem; margin-bottom: 3rem; display: flex; align-items: center; gap: 1rem; }
        .base-url-label { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); font-weight: 600; white-space: nowrap; }
        .base-url-value { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: var(--accent3); flex: 1; word-break: break-all; }
        .section { margin-bottom: 5rem; scroll-margin-top: 2rem; }
        .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .section-number { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--muted); background: var(--surface2); border: 1px solid var(--border); border-radius: 4px; padding: 0.2rem 0.5rem; }
        .section h3 { font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em; }
        .endpoint-card { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; background: var(--surface); transition: border-color 0.2s; }
        .endpoint-card:hover { border-color: rgba(124,106,247,0.3); }
        .endpoint-header { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; cursor: pointer; user-select: none; background: var(--surface); transition: background 0.15s; }
        .endpoint-header:hover { background: var(--surface2); }
        .method-badge { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; padding: 0.25rem 0.6rem; border-radius: 4px; background: var(--get-bg); color: var(--get); border: 1px solid rgba(106,247,196,0.2); flex-shrink: 0; }
        .endpoint-path { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: var(--text); flex: 1; }
        .endpoint-path .param { color: var(--accent); }
        .endpoint-desc { font-size: 0.8rem; color: var(--muted); font-family: 'JetBrains Mono', monospace; }
        .chevron { color: var(--muted); transition: transform 0.2s; font-size: 0.8rem; flex-shrink: 0; }
        .endpoint-card.open .chevron { transform: rotate(180deg); }
        .endpoint-body { display: none; border-top: 1px solid var(--border); }
        .endpoint-card.open .endpoint-body { display: block; }
        .endpoint-section { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); }
        .endpoint-section:last-child { border-bottom: none; }
        .endpoint-section-title { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); font-weight: 600; margin-bottom: 0.75rem; }
        .params-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .params-table th { text-align: left; color: var(--muted); font-weight: 500; padding: 0.4rem 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; letter-spacing: 0.05em; border-bottom: 1px solid var(--border); }
        .params-table td { padding: 0.5rem 0.75rem; border-bottom: 1px solid rgba(37,37,53,0.5); font-family: 'JetBrains Mono', monospace; vertical-align: top; }
        .params-table tr:last-child td { border-bottom: none; }
        .param-name { color: var(--accent); } .param-type { color: var(--muted); font-size: 0.72rem; } .param-required { color: var(--accent2); font-size: 0.68rem; } .param-optional { color: var(--muted); font-size: 0.68rem; } .param-desc { color: var(--text); font-size: 0.78rem; font-family: 'Syne', sans-serif; }
        .code-block { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
        .code-header { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 1rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border); }
        .code-lang { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--muted); letter-spacing: 0.1em; }
        .copy-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--muted); background: none; border: 1px solid var(--border); border-radius: 4px; padding: 0.2rem 0.5rem; cursor: pointer; transition: all 0.15s; }
        .copy-btn:hover { color: var(--text); border-color: var(--muted); }
        .copy-btn.copied { color: var(--get); border-color: var(--get); }
        .code-content { padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; line-height: 1.7; overflow-x: auto; color: var(--text); white-space: pre; }
        .try-it { padding: 1.25rem 1.5rem; background: rgba(124,106,247,0.03); }
        .try-it-row { display: flex; gap: 0.75rem; align-items: center; }
        .try-url { flex: 1; background: var(--code-bg); border: 1px solid var(--border); border-radius: 6px; padding: 0.6rem 0.9rem; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: var(--text); outline: none; transition: border-color 0.15s; }
        .try-url:focus { border-color: var(--accent); }
        .try-btn { background: var(--accent); color: white; border: none; border-radius: 6px; padding: 0.6rem 1.25rem; font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: opacity 0.15s; }
        .try-btn:hover { opacity: 0.85; }
        .try-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .try-result { margin-top: 0.75rem; background: var(--code-bg); border: 1px solid var(--border); border-radius: 6px; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; line-height: 1.6; overflow-x: auto; max-height: 300px; overflow-y: auto; display: none; color: var(--text); white-space: pre; }
        .try-result.visible { display: block; }
        .try-result.error { color: var(--accent2); border-color: rgba(247,106,140,0.3); }
        .overview-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; margin-top: 1rem; }
        .overview-table th { text-align: left; padding: 0.6rem 1rem; font-size: 0.68rem; letter-spacing: 0.1em; color: var(--muted); background: var(--surface2); font-family: 'JetBrains Mono', monospace; font-weight: 500; }
        .overview-table td { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); font-family: 'JetBrains Mono', monospace; }
        .overview-table tr:hover td { background: rgba(255,255,255,0.01); }
        .overview-table tr:last-child td { border-bottom: none; }
        .ov-method { color: var(--get); font-size: 0.7rem; font-weight: 700; }
        .ov-path { color: var(--text); }
        .ov-path .p { color: var(--accent); }
        .ov-desc { color: var(--muted); font-size: 0.78rem; font-family: 'Syne', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
        .set-url-row { display: flex; gap: 0.5rem; margin-bottom: 3rem; }
        .url-hint { font-size: 0.8rem; color: var(--muted); margin-bottom: 0.75rem; font-family: 'JetBrains Mono', monospace; }
        .set-btn { background: var(--surface2); border: 1px solid var(--border); color: var(--text); border-radius: 6px; padding: 0.6rem 1.25rem; font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
        .set-btn:hover { border-color: var(--accent); color: var(--accent); }
        code { background: var(--surface2); padding: 0.1rem 0.35rem; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-size: 0.85em; color: var(--accent3); }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-badge">🎬 REST API</div>
            <h1>Anichin <span>API</span></h1>
            <p>v1.0.0 · Unofficial Scraper</p>
          </div>
          <div className="nav-section">
            <div className="nav-section-title">Getting Started</div>
            <a href="#intro" className="nav-item active"><span className="method-dot" style={{ background: 'var(--accent)' }}></span>Introduction</a>
            <a href="#overview" className="nav-item"><span className="method-dot" style={{ background: 'var(--accent2)' }}></span>All Endpoints</a>
            <a href="#response" className="nav-item"><span className="method-dot" style={{ background: 'var(--accent3)' }}></span>Response Format</a>
          </div>
          <div className="nav-section">
            <div className="nav-section-title">Endpoints</div>
            {['home', 'search', 'series', 'watch', 'schedule', 'ongoing', 'completed', 'sidebar', 'genres', 'quickfilter'].map(ep => (
              <a key={ep} href={`#ep-${ep}`} className="nav-item"><span className="method-dot"></span>{ep.charAt(0).toUpperCase() + ep.slice(1)}</a>
            ))}
          </div>
          <div className="nav-section">
            <div className="nav-section-title">More</div>
            <a href="#examples" className="nav-item"><span className="method-dot" style={{ background: 'var(--accent)' }}></span>Code Examples</a>
          </div>
          <div className="sidebar-footer">
            <span className="version-chip">@zhadev/anichin · MIT</span>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">

          {/* HERO */}
          <div className="hero" id="intro">
            <div className="hero-tag">LIVE · REST · JSON</div>
            <h2>Anichin <em>API</em><br />Documentation</h2>
            <p>Unofficial scraper API untuk Anichin.cafe. Semua halaman Anichin tersedia dalam format JSON. Free, open, tanpa autentikasi.</p>
            <div className="hero-meta">
              <div className="meta-chip">Format <strong>JSON</strong></div>
              <div className="meta-chip">Auth <strong>None</strong></div>
              <div className="meta-chip">Method <strong>GET</strong></div>
            </div>
          </div>

          {/* BASE URL */}
          <div className="base-url-box">
            <span className="base-url-label">Base URL</span>
            <span className="base-url-value" id="baseUrlDisplay">https://your-domain.vercel.app</span>
          </div>

          <div>
            <p className="url-hint">→ Set URL Vercel kamu untuk langsung coba endpoint di bawah:</p>
            <div className="set-url-row">
              <input id="baseUrlInput" type="text" className="try-url" placeholder="https://your-domain.vercel.app" style={{ maxWidth: '400px' }} />
              <button className="set-btn" onClick={() => {
                const inputElement = document.getElementById('baseUrlInput') as HTMLInputElement;
                const input = inputElement?.value?.trim().replace(/\/$/, '');
                if (input) {
                  (window as any).__BASE__ = input;
                  const display = document.getElementById('baseUrlDisplay');
                  if (display) display.textContent = input;
                }
              }}>Set URL</button>
            </div>
          </div>

          {/* OVERVIEW */}
          <div className="section" id="overview">
            <div className="section-header"><span className="section-number">01</span><h3>All Endpoints</h3></div>
            <table className="overview-table">
              <thead><tr><th>Method</th><th>Endpoint</th><th>Description</th></tr></thead>
              <tbody>
                {[
                  ['/api/home', 'Home page (slider, latest, popular)'],
                  ['/api/search', 'Cari series berdasarkan keyword'],
                  ['/api/series/:slug', 'Detail series & daftar episode'],
                  ['/api/watch/:slug', 'Server video & link download'],
                  ['/api/schedule', 'Jadwal tayang mingguan'],
                  ['/api/ongoing', 'Daftar series ongoing'],
                  ['/api/completed', 'Daftar series completed'],
                  ['/api/sidebar', 'Sidebar data'],
                  ['/api/genres/:slug', 'Series berdasarkan genre'],
                  ['/api/quickfilter', 'Semua opsi filter tersedia'],
                ].map(([path, desc]) => (
                  <tr key={path}>
                    <td className="ov-method">GET</td>
                    <td className="ov-path">{path}</td>
                    <td className="ov-desc">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RESPONSE FORMAT */}
          <div className="section" id="response">
            <div className="section-header"><span className="section-number">02</span><h3>Response Format</h3></div>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Semua endpoint mengembalikan format standar:</p>
            <div className="code-block">
              <div className="code-header"><span className="code-lang">JSON</span><button className="copy-btn" id="copy-resp">copy</button></div>
              <div className="code-content" id="resp-fmt">{`{
  "success": true,      // boolean — apakah request berhasil
  "creator": "zhadevv", // string  — author library
  "data":    { ... },   // object  — hasil scraping
  "message": null       // string  — pesan error jika gagal
}`}</div>
            </div>
          </div>

          {/* ENDPOINTS */}
          <div className="section" id="ep-home">
            <div className="section-header"><span className="section-number">03</span><h3>Endpoints</h3></div>

            <EndpointCard method="GET" path="/api/home" desc="Home data" id="ep-home-card"
              description="Mengembalikan data halaman utama Anichin: slider hero, latest release, popular today, dan recommendation."
              queryParams={[{ name: 'page', type: 'integer', req: false, desc: 'Halaman (default: 1)' }]}
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/home?page=1"`}
              defaultPath="/api/home?page=1"
            />

            <EndpointCard method="GET" path="/api/search" desc="Cari series" id="ep-search"
              description="Mencari series berdasarkan keyword. Mendukung pagination."
              queryParams={[
                { name: 'q', type: 'string', req: true, desc: 'Keyword pencarian' },
                { name: 'page', type: 'integer', req: false, desc: 'Halaman (default: 1)' },
              ]}
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/search?q=naruto&page=1"`}
              defaultPath="/api/search?q=naruto"
            />

            <EndpointCard method="GET" path="/api/series/:slug" desc="Detail series" id="ep-series"
              description="Mengembalikan detail lengkap sebuah series: info, genre, studio, daftar episode, dan download batch."
              pathParams={[{ name: 'slug', type: 'string', req: true, desc: 'Slug series dari URL Anichin. Contoh: against-the-sky-supreme' }]}
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/series/against-the-sky-supreme"`}
              defaultPath="/api/series/against-the-sky-supreme"
            />

            <EndpointCard method="GET" path="/api/watch/:slug" desc="Watch episode" id="ep-watch"
              description="Mengembalikan server video, link embed, dan link download untuk suatu episode."
              pathParams={[{ name: 'slug', type: 'string', req: true, desc: 'Slug series' }]}
              queryParams={[{ name: 'episode', type: 'integer', req: false, desc: 'Nomor episode (default: 1)' }]}
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/watch/against-the-sky-supreme?episode=1"`}
              defaultPath="/api/watch/against-the-sky-supreme?episode=1"
            />

            <EndpointCard method="GET" path="/api/schedule" desc="Jadwal tayang" id="ep-schedule"
              description="Jadwal tayang mingguan. Bisa filter per hari."
              queryParams={[{ name: 'day', type: 'string', req: false, desc: 'monday | tuesday | wednesday | thursday | friday | saturday | sunday' }]}
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/schedule?day=monday"`}
              defaultPath="/api/schedule?day=monday"
            />

            <EndpointCard method="GET" path="/api/ongoing" desc="Series ongoing" id="ep-ongoing"
              queryParams={[{ name: 'page', type: 'integer', req: false, desc: 'Halaman (default: 1)' }]}
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/ongoing?page=1"`}
              defaultPath="/api/ongoing?page=1"
            />

            <EndpointCard method="GET" path="/api/completed" desc="Series completed" id="ep-completed"
              queryParams={[{ name: 'page', type: 'integer', req: false, desc: 'Halaman (default: 1)' }]}
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/completed?page=1"`}
              defaultPath="/api/completed?page=1"
            />

            <EndpointCard method="GET" path="/api/sidebar" desc="Sidebar data" id="ep-sidebar"
              description="Data sidebar: quickfilter, popular series, ongoing series, dll."
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/sidebar"`}
              defaultPath="/api/sidebar"
            />

            <EndpointCard method="GET" path="/api/genres/:slug" desc="Series by genre" id="ep-genres"
              pathParams={[{ name: 'slug', type: 'string', req: true, desc: 'Slug genre. Contoh: action, romance, fantasy' }]}
              queryParams={[{ name: 'page', type: 'integer', req: false, desc: 'Halaman (default: 1)' }]}
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/genres/action?page=1"`}
              defaultPath="/api/genres/action?page=1"
            />

            <EndpointCard method="GET" path="/api/quickfilter" desc="Opsi filter tersedia" id="ep-quickfilter"
              description="Mengembalikan semua opsi filter yang tersedia (genre, studio, season, status, dll)."
              curlExample={`curl -X GET "https://your-domain.vercel.app/api/quickfilter"`}
              defaultPath="/api/quickfilter"
            />
          </div>

          {/* CODE EXAMPLES */}
          <div className="section" id="examples">
            <div className="section-header"><span className="section-number">04</span><h3>Code Examples</h3></div>
            {/* ... section code examples dipertahankan ... */}
          </div>

        </main>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
        window.__BASE__ = '';

        document.querySelectorAll('.copy-btn').forEach(btn => {
          btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const targetId = this.id.replace('copy-', 'ex-').replace('copy-resp', 'resp-fmt');
            const el = document.getElementById(targetId) || this.closest('.code-block')?.querySelector('.code-content');
            if (!el) return;
            navigator.clipboard.writeText(el.innerText).then(() => {
              this.textContent = 'copied!';
              this.classList.add('copied');
              setTimeout(() => { this.textContent = 'copy'; this.classList.remove('copied'); }, 1500);
            });
          });
        });

        document.querySelectorAll('.endpoint-header').forEach(header => {
          header.addEventListener('click', function() {
            const card = this.closest('.endpoint-card');
            card.classList.toggle('open');
          });
        });

        document.querySelectorAll('.try-btn').forEach(btn => {
          btn.addEventListener('click', async function(e) {
            e.stopPropagation();
            const row = this.closest('.try-it-row');
            const input = row.querySelector('.try-url');
            const result = this.closest('.try-it').querySelector('.try-result');
            const path = input.value.trim();
            const base = window.__BASE__ || window.location.origin;
            const url = base + (path.startsWith('/') ? path : '/' + path);
            this.disabled = true;
            this.textContent = '...';
            result.className = 'try-result visible';
            result.textContent = 'Fetching...';
            try {
              const res = await fetch(url);
              const data = await res.json();
              result.className = 'try-result visible';
              result.textContent = JSON.stringify(data, null, 2);
            } catch(err) {
              result.className = 'try-result visible error';
              result.textContent = 'Error: ' + err.message + '\\n\\nPastikan URL sudah di-set dan API sudah deployed.';
            }
            this.disabled = false;
            this.textContent = 'Send →';
          });
        });
      `}} />
    </>
  );
}

interface Param { name: string; type: string; req: boolean; desc: string; }

function EndpointCard({
  method, path, desc, id,
  description, pathParams, queryParams, curlExample, defaultPath
}: {
  method: string; path: string; desc: string; id: string;
  description?: string; pathParams?: Param[]; queryParams?: Param[];
  curlExample: string; defaultPath: string;
}) {
  return (
    <div className="endpoint-card" id={id}>
      <div className="endpoint-header">
        <span className="method-badge">{method}</span>
        <span className="endpoint-path">{path}</span>
        <span className="endpoint-desc">{desc}</span>
        <span className="chevron">▾</span>
      </div>
      <div className="endpoint-body">
        {description && (
          <div className="endpoint-section">
            <div className="endpoint-section-title">Description</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{description}</p>
          </div>
        )}
        {pathParams && pathParams.length > 0 && (
          <div className="endpoint-section">
            <div className="endpoint-section-title">Path Parameters</div>
            <table className="params-table">
              <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
              <tbody>
                {pathParams.map(p => (
                  <tr key={p.name}>
                    <td className="param-name">{p.name}</td>
                    <td className="param-type">{p.type}</td>
                    <td className={p.req ? 'param-required' : 'param-optional'}>{p.req ? 'required' : 'optional'}</td>
                    <td className="param-desc">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {queryParams && queryParams.length > 0 && (
          <div className="endpoint-section">
            <div className="endpoint-section-title">Query Parameters</div>
            <table className="params-table">
              <thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
              <tbody>
                {queryParams.map(p => (
                  <tr key={p.name}>
                    <td className="param-name">{p.name}</td>
                    <td className="param-type">{p.type}</td>
                    <td className={p.req ? 'param-required' : 'param-optional'}>{p.req ? 'required' : 'optional'}</td>
                    <td className="param-desc">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="endpoint-section">
          <div className="endpoint-section-title">Example Request</div>
          <div className="code-block">
            <div className="code-header">
              <span className="code-lang">curl</span>
              <button className="copy-btn card-copy-btn">copy</button>
            </div>
            <div className="code-content">{curlExample}</div>
          </div>
        </div>
        <div className="try-it">
          <div className="endpoint-section-title" style={{ marginBottom: '0.75rem' }}>Try It</div>
          <div className="try-it-row">
            <input className="try-url" type="text" defaultValue={defaultPath} />
            <button className="try-btn">Send →</button>
          </div>
          <div className="try-result"></div>
        </div>
      </div>
    </div>
  );
}