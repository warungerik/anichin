"use client";

import { useState, useCallback } from "react";

const ENDPOINTS = [
  { id: "home",        label: "Home",        path: "/api/home?page=1",                      desc: "Slider, latest release, popular today" },
  { id: "search",      label: "Search",      path: "/api/search?q=naruto",                  desc: "Pencarian series" },
  { id: "series",      label: "Series",      path: "/api/series/against-the-sky-supreme",   desc: "Detail series & episode list" },
  { id: "watch",       label: "Watch",       path: "/api/watch/against-the-sky-supreme?episode=1", desc: "Server video & download links" },
  { id: "schedule",    label: "Schedule",    path: "/api/schedule?day=monday",               desc: "Jadwal tayang mingguan" },
  { id: "ongoing",     label: "Ongoing",     path: "/api/ongoing?page=1",                   desc: "Daftar series ongoing" },
  { id: "completed",   label: "Completed",   path: "/api/completed?page=1",                 desc: "Daftar series completed" },
  { id: "sidebar",     label: "Sidebar",     path: "/api/sidebar",                          desc: "Data sidebar" },
  { id: "genres",      label: "Genres",      path: "/api/genres/action?page=1",             desc: "Series by genre" },
  { id: "quickfilter", label: "Quickfilter", path: "/api/quickfilter",                      desc: "Opsi filter tersedia" },
];

type Status = "idle" | "loading" | "ok" | "error";

interface Result {
  status: Status;
  statusCode?: number;
  latency?: number;
  data?: string;
  error?: string;
}

export default function StatusPage() {
  const [baseUrl, setBaseUrl] = useState("https://your-domain.vercel.app");
  const [inputUrl, setInputUrl] = useState("");
  const [results, setResults] = useState<Record<string, Result>>({});
  const [running, setRunning] = useState(false);
  const [detail, setDetail] = useState<{ id: string; data: string } | null>(null);

  const testOne = useCallback(async (endpoint: typeof ENDPOINTS[0], base: string): Promise<Result> => {
    const url = base.replace(/\/$/, "") + endpoint.path;
    const start = Date.now();
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      const latency = Date.now() - start;
      const text = await res.text();
      let parsed: any;
      try { parsed = JSON.parse(text); } catch { parsed = null; }
      const ok = res.ok && parsed?.success === true;
      return {
        status: ok ? "ok" : "error",
        statusCode: res.status,
        latency,
        data: JSON.stringify(parsed, null, 2),
        error: ok ? undefined : (parsed?.message || `HTTP ${res.status}`),
      };
    } catch (e: any) {
      return { status: "error", latency: Date.now() - start, error: e.message };
    }
  }, []);

  const runAll = async () => {
    const base = inputUrl.trim().replace(/\/$/, "") || baseUrl;
    setBaseUrl(base);
    setRunning(true);
    setResults({});
    setDetail(null);

    // Run all concurrently
    const entries = await Promise.all(
      ENDPOINTS.map(async (ep) => {
        setResults(prev => ({ ...prev, [ep.id]: { status: "loading" } }));
        const result = await testOne(ep, base);
        setResults(prev => ({ ...prev, [ep.id]: result }));
        return [ep.id, result] as const;
      })
    );
    setRunning(false);
    void entries;
  };

  const runSingle = async (ep: typeof ENDPOINTS[0]) => {
    const base = inputUrl.trim().replace(/\/$/, "") || baseUrl;
    setBaseUrl(base);
    setResults(prev => ({ ...prev, [ep.id]: { status: "loading" } }));
    const result = await testOne(ep, base);
    setResults(prev => ({ ...prev, [ep.id]: result }));
    if (result.data) setDetail({ id: ep.id, data: result.data });
  };

  const okCount = Object.values(results).filter(r => r.status === "ok").length;
  const errCount = Object.values(results).filter(r => r.status === "error").length;
  const totalDone = okCount + errCount;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap');
        :root {
          --bg: #0a0a0f; --surface: #111118; --surface2: #1a1a26; --border: #252535;
          --accent: #7c6af7; --accent2: #f76a8c; --accent3: #6af7c4;
          --text: #e8e8f0; --muted: #6b6b8a;
          --ok: #6af7c4; --ok-bg: rgba(106,247,196,0.08); --ok-border: rgba(106,247,196,0.2);
          --err: #f76a8c; --err-bg: rgba(247,106,140,0.08); --err-border: rgba(247,106,140,0.2);
          --warn: #f7c26a; --warn-bg: rgba(247,194,106,0.08);
          --code-bg: #0d0d16;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; min-height: 100vh; }
        body::after {
          content: ''; position: fixed; inset: 0;
          background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 48px 48px; opacity: 0.2; pointer-events: none; z-index: 0;
        }
        .wrap { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 2.5rem 2rem; }
        
        /* HEADER */
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2.5rem; flex-wrap: gap; gap: 1rem; }
        .header-left { display: flex; align-items: center; gap: 1rem; }
        .back-btn { display: inline-flex; align-items: center; gap: 0.4rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--muted); background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; padding: 0.4rem 0.8rem; text-decoration: none; transition: all 0.15s; }
        .back-btn:hover { color: var(--text); border-color: var(--muted); }
        .page-title { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.03em; }
        .page-title span { color: var(--accent3); }
        .page-sub { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--muted); margin-top: 0.2rem; }

        /* URL INPUT */
        .url-box { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; }
        .url-label { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); font-weight: 600; margin-bottom: 0.75rem; }
        .url-row { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
        .url-input { flex: 1; min-width: 200px; background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; padding: 0.75rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--text); outline: none; transition: border-color 0.15s; }
        .url-input:focus { border-color: var(--accent); }
        .run-all-btn { background: var(--accent); color: white; border: none; border-radius: 8px; padding: 0.75rem 1.5rem; font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 700; cursor: pointer; white-space: nowrap; transition: opacity 0.15s; display: flex; align-items: center; gap: 0.5rem; }
        .run-all-btn:hover { opacity: 0.85; }
        .run-all-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* SUMMARY BAR */
        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
        @media (max-width: 600px) { .summary { grid-template-columns: repeat(2, 1fr); } }
        .summary-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 1.25rem; text-align: center; }
        .summary-card.ok-card { border-color: var(--ok-border); background: var(--ok-bg); }
        .summary-card.err-card { border-color: var(--err-border); background: var(--err-bg); }
        .summary-num { font-size: 2rem; font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
        .summary-num.ok { color: var(--ok); }
        .summary-num.err { color: var(--err); }
        .summary-num.warn { color: var(--warn); }
        .summary-label { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--muted); margin-top: 0.4rem; letter-spacing: 0.08em; }

        /* PROGRESS BAR */
        .progress-wrap { margin-bottom: 2rem; display: ${running || totalDone > 0 ? 'block' : 'none'}; }
        .progress-track { background: var(--surface2); border-radius: 99px; height: 4px; overflow: hidden; }
        .progress-bar { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent3)); border-radius: 99px; transition: width 0.3s; }
        .progress-label { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); margin-top: 0.5rem; }

        /* GRID */
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 700px) { .grid { grid-template-columns: 1fr; } }

        /* ENDPOINT ROW */
        .ep-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; transition: border-color 0.2s; }
        .ep-card:hover { border-color: rgba(124,106,247,0.3); }
        .ep-card.ok { border-color: var(--ok-border); }
        .ep-card.error { border-color: var(--err-border); }
        .ep-top { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem; }
        .ep-status-icon { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0; background: var(--surface2); border: 1px solid var(--border); }
        .ep-status-icon.ok { background: var(--ok-bg); border-color: var(--ok-border); color: var(--ok); }
        .ep-status-icon.error { background: var(--err-bg); border-color: var(--err-border); color: var(--err); }
        .ep-status-icon.loading { background: rgba(124,106,247,0.1); border-color: rgba(124,106,247,0.3); animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ep-info { flex: 1; min-width: 0; }
        .ep-name { font-weight: 700; font-size: 0.9rem; }
        .ep-path { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ep-badges { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
        .badge { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid var(--border); color: var(--muted); background: var(--surface2); }
        .badge.ok { color: var(--ok); background: var(--ok-bg); border-color: var(--ok-border); }
        .badge.err { color: var(--err); background: var(--err-bg); border-color: var(--err-border); }
        .badge.latency { color: var(--warn); background: var(--warn-bg); border-color: rgba(247,194,106,0.2); }
        .ep-bottom { border-top: 1px solid var(--border); padding: 0.75rem 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
        .ep-desc { font-size: 0.75rem; color: var(--muted); }
        .ep-actions { display: flex; gap: 0.5rem; }
        .ep-btn { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--muted); background: none; border: 1px solid var(--border); border-radius: 4px; padding: 0.2rem 0.6rem; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
        .ep-btn:hover { color: var(--text); border-color: var(--muted); }
        .ep-btn.primary { background: var(--accent); color: white; border-color: var(--accent); }
        .ep-btn.primary:hover { opacity: 0.85; }

        /* DETAIL PANEL */
        .detail-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; margin-top: 2rem; overflow: hidden; }
        .detail-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-bottom: 1px solid var(--border); background: var(--surface2); }
        .detail-title { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--accent3); }
        .detail-close { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--muted); background: none; border: 1px solid var(--border); border-radius: 4px; padding: 0.2rem 0.5rem; cursor: pointer; transition: all 0.15s; }
        .detail-close:hover { color: var(--err); border-color: var(--err); }
        .detail-body { padding: 1.25rem 1.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; line-height: 1.7; max-height: 400px; overflow-y: auto; white-space: pre; color: var(--text); }
        .detail-body::-webkit-scrollbar { width: 4px; height: 4px; }
        .detail-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>

      <div className="wrap">

        {/* HEADER */}
        <div className="header">
          <div>
            <div className="header-left" style={{ marginBottom: '0.4rem' }}>
              <a href="/docs" className="back-btn">← Docs</a>
            </div>
            <div className="page-title">API <span>Status</span> Checker</div>
            <div className="page-sub">Test semua endpoint sekaligus — lihat mana yang ✅ jalan atau ❌ error</div>
          </div>
        </div>

        {/* URL INPUT */}
        <div className="url-box">
          <div className="url-label">Base URL API kamu</div>
          <div className="url-row">
            <input
              className="url-input"
              type="text"
              value={inputUrl}
              onChange={e => setInputUrl(e.target.value)}
              placeholder="https://your-domain.vercel.app"
              onKeyDown={e => e.key === 'Enter' && !running && runAll()}
            />
            <button className="run-all-btn" onClick={runAll} disabled={running}>
              {running ? (
                <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Testing...</>
              ) : (
                <>▶ Run All Tests</>
              )}
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="summary">
          <div className={`summary-card ${okCount > 0 ? 'ok-card' : ''}`}>
            <div className={`summary-num ${okCount > 0 ? 'ok' : ''}`}>{okCount}</div>
            <div className="summary-label">PASSED ✅</div>
          </div>
          <div className={`summary-card ${errCount > 0 ? 'err-card' : ''}`}>
            <div className={`summary-num ${errCount > 0 ? 'err' : ''}`}>{errCount}</div>
            <div className="summary-label">FAILED ❌</div>
          </div>
          <div className="summary-card">
            <div className="summary-num" style={{ color: 'var(--accent)' }}>{ENDPOINTS.length - totalDone}</div>
            <div className="summary-label">PENDING ⏳</div>
          </div>
          <div className="summary-card">
            <div className="summary-num" style={{ color: 'var(--muted)' }}>
              {totalDone > 0 ? Math.round((okCount / totalDone) * 100) : 0}%
            </div>
            <div className="summary-label">SUCCESS RATE</div>
          </div>
        </div>

        {/* PROGRESS */}
        {(running || totalDone > 0) && (
          <div className="progress-wrap" style={{ display: 'block', marginBottom: '2rem' }}>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${(totalDone / ENDPOINTS.length) * 100}%` }} />
            </div>
            <div className="progress-label">
              {running ? `Testing... ${totalDone}/${ENDPOINTS.length}` : `Selesai — ${totalDone}/${ENDPOINTS.length} endpoint ditest`}
            </div>
          </div>
        )}

        {/* ENDPOINT GRID */}
        <div className="grid">
          {ENDPOINTS.map(ep => {
            const r = results[ep.id];
            const s = r?.status ?? "idle";
            return (
              <div key={ep.id} className={`ep-card ${s === 'ok' ? 'ok' : s === 'error' ? 'error' : ''}`}>
                <div className="ep-top">
                  <div className={`ep-status-icon ${s}`}>
                    {s === 'idle'    && <span style={{ color: 'var(--muted)' }}>—</span>}
                    {s === 'loading' && <span>⟳</span>}
                    {s === 'ok'      && <span>✓</span>}
                    {s === 'error'   && <span>✗</span>}
                  </div>
                  <div className="ep-info">
                    <div className="ep-name">{ep.label}</div>
                    <div className="ep-path">{ep.path}</div>
                  </div>
                  <div className="ep-badges">
                    {r?.statusCode && (
                      <span className={`badge ${r.status === 'ok' ? 'ok' : 'err'}`}>
                        {r.statusCode}
                      </span>
                    )}
                    {r?.latency !== undefined && (
                      <span className="badge latency">{r.latency}ms</span>
                    )}
                  </div>
                </div>
                <div className="ep-bottom">
                  <span className="ep-desc">
                    {s === 'error' && r?.error
                      ? <span style={{ color: 'var(--err)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}>{r.error}</span>
                      : ep.desc}
                  </span>
                  <div className="ep-actions">
                    {r?.data && (
                      <button className="ep-btn" onClick={() => setDetail(detail?.id === ep.id ? null : { id: ep.id, data: r.data! })}>
                        {detail?.id === ep.id ? 'hide' : 'view'}
                      </button>
                    )}
                    <button className="ep-btn primary" onClick={() => runSingle(ep)} disabled={running}>
                      test
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DETAIL PANEL */}
        {detail && (
          <div className="detail-panel">
            <div className="detail-header">
              <span className="detail-title">
                Response — {ENDPOINTS.find(e => e.id === detail.id)?.path}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="ep-btn" onClick={() => navigator.clipboard.writeText(detail.data)}>copy</button>
                <button className="detail-close" onClick={() => setDetail(null)}>✕ close</button>
              </div>
            </div>
            <div className="detail-body">{detail.data}</div>
          </div>
        )}

      </div>
    </>
  );
}
