// @ts-check
/**
 * Fetches current business hours from the Google Places API and writes them to
 * src/data/hours.json, which the site reads at build time.
 *
 * - Uses `currentOpeningHours` (falls back to `regularOpeningHours`), so any
 *   holiday / special hours set in the Google Business Profile flow through.
 * - If GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID aren't set, this exits quietly and
 *   the site falls back to the hours in src/config/site.ts. That means local
 *   builds and first-time setup never break.
 *
 * Run by the GitHub Actions workflow before each build (twice daily on a
 * schedule). Requires Node 18+ (uses the built-in global fetch).
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/data/hours.json");

const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
const placeId = process.env.GOOGLE_PLACE_ID?.trim();

async function main() {
  if (!apiKey || !placeId) {
    console.log(
      "[fetch-hours] GOOGLE_MAPS_API_KEY / GOOGLE_PLACE_ID not set — keeping fallback hours.",
    );
    return;
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(
    placeId,
  )}`;

  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "regularOpeningHours,currentOpeningHours",
    },
  });

  if (!res.ok) {
    // Don't fail the build over an hours hiccup — keep whatever's committed.
    console.warn(
      `[fetch-hours] Places API responded ${res.status}. Keeping existing hours.`,
    );
    return;
  }

  const data = await res.json();
  const descriptions =
    data?.currentOpeningHours?.weekdayDescriptions ??
    data?.regularOpeningHours?.weekdayDescriptions;

  if (!Array.isArray(descriptions) || descriptions.length === 0) {
    console.warn("[fetch-hours] No opening hours in response. Keeping existing hours.");
    return;
  }

  // Google returns strings like "Monday: 8:00 AM – 5:00 PM" or "Sunday: Closed".
  const hours = descriptions.map((line) => {
    const idx = line.indexOf(": ");
    if (idx === -1) return { day: line, time: "" };
    return { day: line.slice(0, idx), time: line.slice(idx + 2) };
  });

  const payload = {
    live: true,
    updatedAt: new Date().toISOString(),
    hours,
  };

  await writeFile(OUT, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`[fetch-hours] Wrote ${hours.length} days of hours to ${OUT}`);
}

main().catch((err) => {
  // Never break the build because of hours; just log and move on.
  console.warn("[fetch-hours] Error, keeping fallback hours:", err?.message ?? err);
});
