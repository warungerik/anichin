import { getScraper, errorResponse } from "@/lib/scraper";

export const runtime = "nodejs";

export async function GET() {
  try {
    const scraper = getScraper();
    const result = await scraper.quickfilter();
    return Response.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(msg);
  }
}
