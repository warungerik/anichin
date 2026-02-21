import { getScraper, errorResponse } from "@/lib/scraper";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const page = Number(searchParams.get("page")) || 1;

    if (!query) return errorResponse("Parameter 'q' wajib diisi", 400);

    const scraper = getScraper();
    const result = await scraper.search(query, page);
    return Response.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(msg);
  }
}
