import { getScraper, errorResponse } from "@/lib/scraper";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;

    if (!slug) return errorResponse("Genre slug wajib diisi", 400);

    const scraper = getScraper();
    const result = await scraper.genres(slug, page);
    return Response.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(msg);
  }
}
