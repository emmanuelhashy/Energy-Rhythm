import { hashTable } from "./data";
import type { EnergyPoint, Highlight } from "./types";

// Get today’s ISO string (YYYY-MM-DD)
const today = new Date();
const todayISO = today.toISOString().split('T')[0];

export const getCurrentTime = () => {
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    today.getMinutes()
  );
};

// Convert string times to Date objects
export const parsedData = (data: EnergyPoint[]) => data.map((d) => ({
  ...d,
  time: new Date(d.time),
}));

// Parse highlights dates
export const parsedHighlights = (highlights: Highlight[]) => highlights.map((h) => ({
  ...h,
  time: new Date(h.time),
}));

// Function to get the current active label
export function getCurrentLabel(highlights: Highlight[]): string | null {
  // Sort highlights by time
  const sorted = [...highlights].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  for (let i = 0; i < sorted.length; i++) {
    const start = new Date(sorted[i].time);
    const end =
      i + 1 < sorted.length
        ? new Date(sorted[i + 1].time)
        : new Date(`${todayISO}T23:59:59Z`);

    if (today >= start && today < end) {
      return sorted[i].label;
    }
  }

  return null;
}

export const getCurrentFactAndRecommendation = (label: string | null) => {
  const info = hashTable[label as keyof typeof hashTable];
  return {
    fact: info.fact,
    recommendation: info.recommendation,
  };
}