import AnichinScraper from "@zhadev/anichin";

let scraperInstance: AnichinScraper | null = null;

export function getScraper(): AnichinScraper {
  if (!scraperInstance) {
    scraperInstance = new AnichinScraper({
      timeout: 30000,
      maxRetries: 3,
      retryDelay: 1000,
      requestDelay: 500,
    });
  }
  return scraperInstance;
}

export function errorResponse(message: string, status = 500) {
  return Response.json(
    { success: false, message, data: null },
    { status }
  );
}
