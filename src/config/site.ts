/**
 * ============================================================================
 *  THE GROOM ROOM — SITE CONTENT
 * ============================================================================
 *  This is the ONE file to edit for everyday content changes.
 *  Change text here and the whole site updates. No code knowledge needed —
 *  just edit the text between the quote marks.
 * ============================================================================
 */

export const site = {
  /** Business name shown in the header and browser tab. */
  name: "The Groom Room",

  /** Short tagline under the business name on the homepage. */
  tagline: "Caring, professional dog grooming in Elkhart, Indiana.",

  /** The groomer / owner. */
  groomer: "Virginia Hays",

  /** Town/region, used in a few places for local SEO. */
  location: "Elkhart, Indiana",

  /** Year Virginia started grooming. Years of experience is calculated from
   *  this automatically, so it stays current on its own. */
  experienceSince: 2002,

  /** Public URL of the site (used for SEO tags + sitemap). */
  url: "https://thegroomroomelkhart.com",

  contact: {
    phone: "(574) 361-0301",
    /** Digits only, for click-to-call links. */
    phoneRaw: "5743610301",
    email: "", // add an email here if you'd like one shown, e.g. "hello@thegroomroomelkhart.com"
    address: "23567 Linden Dr.",
    city: "Elkhart",
    state: "IN",
    zip: "46516",
  },

  /** Business hours, top to bottom as shown on the site. */
  hours: [
    { day: "Sunday", time: "Closed" },
    { day: "Monday", time: "Closed" },
    { day: "Tuesday", time: "8:00am – 5:00pm" },
    { day: "Wednesday", time: "8:00am – 5:00pm" },
    { day: "Thursday", time: "8:00am – 5:00pm" },
    { day: "Friday", time: "8:00am – 5:00pm" },
    { day: "Saturday", time: "8:00am – 5:00pm" },
  ],

  /** The "About the groomer" blurb on the homepage. */
  about:
    "The Groom Room is a locally owned dog grooming service in Elkhart, " +
    "founded to give every pup a calm, caring, and high-quality grooming " +
    "experience. Self-owned and operated by Virginia Hays, the shop keeps a " +
    "relaxed, low-stress atmosphere so your dog is comfortable from the first " +
    "wag to the final blow-dry. Appointments are booked by phone so every dog " +
    "gets personal, unrushed attention.",

  /**
   * SERVICES
   * --------
   * NOTE: These are common dog-grooming services as sensible placeholders.
   * Virginia should confirm the real list and add prices if she wants them
   * shown. To hide prices, just delete the `price` line. Add/remove services
   * by copying a block.
   */
  services: [
    {
      name: "Bath & Brush",
      description:
        "A warm bath with gentle shampoo, blow-dry, brush-out, nail trim, and ear cleaning.",
      price: "", // e.g. "from $40"
    },
    {
      name: "Full Groom",
      description:
        "Everything in a Bath & Brush plus a full haircut styled to your breed or your preference.",
      price: "",
    },
    {
      name: "Nail Trim",
      description: "Quick, careful nail trim to keep paws healthy and comfortable.",
      price: "",
    },
    {
      name: "De-Shedding Treatment",
      description:
        "Deep bath and specialized brush-out to remove loose undercoat and cut down on shedding.",
      price: "",
    },
    {
      name: "Puppy's First Groom",
      description:
        "A gentle, patient introduction to grooming so young pups build good, calm habits.",
      price: "",
    },
    {
      name: "Ear Cleaning & Sanitary Trim",
      description: "Tidy-up add-ons to keep your dog clean, fresh, and comfortable between full grooms.",
      price: "",
    },
  ],

  /**
   * INSTAGRAM FEED
   * --------------
   * The live feed uses Behold.so (free), which safely connects to Instagram
   * and hands us a simple data feed — no expiring passwords to maintain.
   *
   * SETUP (once the Instagram Business/Creator account exists):
   *   1. Go to https://behold.so and create a free account.
   *   2. Connect the grooming Instagram account.
   *   3. Copy the "JSON feed" URL it gives you (looks like
   *      https://feeds.behold.so/XXXXXXXXXXXX ).
   *   4. Paste it below between the quotes and save.
   *
   * Until this is filled in, the site shows a friendly "coming soon" gallery.
   */
  instagram: {
    beholdFeedUrl: "", // <-- paste the Behold JSON feed URL here
    profileUrl: "", // e.g. "https://instagram.com/thegroomroomelkhart"
    handle: "", // e.g. "@thegroomroomelkhart"
    maxPosts: 12,
  },
} as const;

export type SiteConfig = typeof site;
