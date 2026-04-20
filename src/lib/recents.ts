const STORAGE_KEY = "metric_page_recents";
const MAX_RECENTS = 20;

export function getRecents(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecent(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    const recents = getRecents().filter((s) => s !== slug);
    recents.unshift(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recents.slice(0, MAX_RECENTS)));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}
