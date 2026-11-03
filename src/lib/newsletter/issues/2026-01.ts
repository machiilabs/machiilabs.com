import type { NewsletterIssue } from "../types";

const issue: NewsletterIssue = {
  slug: "2026-01",
  subject: "New from Mach II Labs: Skagway 1.5 and 15CE Flasher 1.4",
  preheader:
    "Skagway makes playable copies of stubborn videos, and 15CE Flasher now recognizes your calculator’s firmware.",
  headline: "What’s new from Mach II Labs",
  subhead: "Skagway 1.5 · 15CE Flasher 1.4 for Mac and 1.2 for Windows",
  greeting: "Hello,",
  intro: [
    "Thanks for signing up for news from Mach II Labs. This is our first newsletter. We’ll only send one when there’s something worth your time.",
    "We make two free apps, and you may have signed up because of either one. So each section below starts with a short introduction, then covers what’s new.",
  ],
  products: [
    {
      product: "skagway",
      tagline: "A Mac video organizer for the files already on your drives.",
      image: {
        path: "2026-01/skagway-library.jpg",
        width: 1200,
        height: 574,
        alt: "Skagway’s grid view: a large video library with thumbnails, ratings, and tags",
      },
      intro:
        "Point Skagway at the folders you already keep, on this Mac or an external drive. It catalogs every clip and builds thumbnails, and your files stay exactly where they are.",
      highlights: [
        {
          title: "Find any moment by eye",
          body: "Rest on a thumbnail and a silent preview plays. Storyboard shows six frames of every video.",
        },
        {
          title: "Organize without moving anything",
          body: "Tags, star ratings, albums, and smart collections, with search and filters across the whole library.",
        },
        {
          title: "Fast with thousands of videos",
          body: "Long or short, tiny or enormous, the library stays smooth.",
        },
        {
          title: "Free forever, private by default",
          body: "No account, no ads, no subscription, and no telemetry.",
        },
      ],
      whatsNewTitle: "New in Skagway 1.5",
      whatsNew: [
        {
          title: "Make a playable copy",
          body: "Skagway now converts videos your Mac can’t play into a playable MP4 copy. Many formats are supported, and your original stays in the catalog.",
        },
        {
          title: "Better Bulk Rename",
          body: "Templates, undo, and a smoother flow for renaming many files at once.",
        },
        {
          title: "Recently: rate and tag from the card",
          body: "Since 1.4, stars (keys 1–5) and tags work right on the card, without opening the Inspector.",
        },
      ],
      ctaLabel: "Get Skagway 1.5",
    },
    {
      product: "flasher",
      tagline: "A guided flasher for the HP 15c and 16c Collector’s Editions.",
      image: {
        path: "2026-01/flasher-wizard.jpg",
        width: 1200,
        height: 1034,
        alt: "15CE Flasher’s step-by-step wizard with a diagram of the pogo cable on the calculator",
      },
      intro:
        "Updating a Collector’s Edition calculator used to mean command-line tools and guesswork. 15CE Flasher walks you through every step over the official pogo cable. It works on the HP 15c and 16c Collector’s Editions and the post-2015 HP 12c.",
      highlights: [
        {
          title: "A seven-step wizard",
          body: "Diagrams and clear status at every step, from seating the cable to the final checksum.",
        },
        {
          title: "Rehearse first in DEMO mode",
          body: "Walk through the whole process with a simulated calculator. No hardware needed.",
        },
        {
          title: "Careful by design",
          body: "It leaves the bootloader intact, offers a backup before writing, and verifies afterward.",
        },
        {
          title: "BATCH mode and offline",
          body: "Flash several calculators in a row. No network and no telemetry.",
        },
      ],
      whatsNewTitle: "New in 1.4 for Mac and 1.2 for Windows",
      whatsNew: [
        {
          title: "Knows your firmware",
          body: "The app reads the calculator, names the firmware it finds, and suggests a backup file name based on its version.",
        },
        {
          title: "Catches the wrong file",
          body: "If the firmware you choose is for a different model than the calculator, you’re warned before anything is written.",
        },
        {
          title: "16c and 12c support",
          body: "It recognizes the HP 16c Collector’s Edition, including its Extended Memory and stopwatch firmware, and the post-2015 HP 12c.",
        },
        {
          title: "Windows catches up",
          body: "Windows 1.2 brings all of this to the PC.",
        },
      ],
      ctaLabel: "Get 15CE Flasher",
    },
  ],
  closing: [
    "Questions, ideas, or a bug to report? Just reply to this email. It comes straight to us.",
  ],
  signature: ["Thanks for using our apps,", "Paul", "Mach II Labs"],
};

export default issue;
