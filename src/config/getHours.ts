import { site } from "./site";
import generated from "../data/hours.json";

export interface HourRow {
  day: string;
  time: string;
}

/**
 * Returns the hours to display. Prefers live hours pulled from Google
 * (src/data/hours.json, refreshed by the scheduled build) and falls back to the
 * hand-entered hours in site.ts when the Google integration isn't set up.
 */
export function getHours(): { hours: HourRow[]; live: boolean } {
  const live = (generated as { live?: boolean }).live === true;
  const rows = (generated as { hours?: HourRow[] }).hours;

  if (live && Array.isArray(rows) && rows.length > 0) {
    return { hours: rows, live: true };
  }
  return { hours: site.hours as unknown as HourRow[], live: false };
}
