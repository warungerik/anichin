import { getScraper, errorResponse } from "@/lib/scraper";

export const runtime = "nodejs";

type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
const VALID_DAYS: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const day = searchParams.get("day") as Day | null;

    if (day && !VALID_DAYS.includes(day)) {
      return errorResponse(`Hari tidak valid. Pilihan: ${VALID_DAYS.join(", ")}`, 400);
    }

    const scraper = getScraper();
    const result = day ? await scraper.schedule(day) : await scraper.schedule();
    return Response.json(result);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return errorResponse(msg);
  }
}
