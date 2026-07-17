import { site } from "./site";

const { contact, name } = site;

const destination = `${name} ${contact.address} ${contact.city}, ${contact.state} ${contact.zip}`;

/**
 * Opens Google Maps directions to the shop. On phones this hands off to the
 * Maps app with turn-by-turn navigation; on desktop it opens Maps in a tab.
 */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  destination,
)}`;
