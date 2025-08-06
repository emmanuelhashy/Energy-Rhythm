import type { EnergyPoint, Highlight } from "./types";

// Get today’s ISO string (YYYY-MM-DD)
const today = new Date();

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
