export const runtime = "nodejs";

export async function GET(request: Request) {
  const host = request.headers.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = `${protocol}://${host}`;

  return Response.json({
    success: true,
    message: "🎬 Anichin API — Unofficial Scraper",
    creator: "zhadevv",
    version: "1.0.0",
    docs: `${base}/docs`,
    endpoints: {
      home:        `${base}/api/home?page=1`,
      search:      `${base}/api/search?q=naruto&page=1`,
      series:      `${base}/api/series/:slug`,
      watch:       `${base}/api/watch/:slug?episode=1`,
      schedule:    `${base}/api/schedule`,
      schedule_day:`${base}/api/schedule?day=monday`,
      ongoing:     `${base}/api/ongoing?page=1`,
      completed:   `${base}/api/completed?page=1`,
      sidebar:     `${base}/api/sidebar`,
      genres:      `${base}/api/genres/:slug?page=1`,
      quickfilter: `${base}/api/quickfilter`,
    },
  });
}
