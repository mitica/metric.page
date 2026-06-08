// SimpleAnalytics event tracking. Loaded async via the <script> tag in layout.tsx,
// so window.sa_event may not be defined yet on early clicks — silently no-op then.

type EventMetadata = Record<string, string | number | boolean>;

declare global {
  interface Window {
    sa_event?: (name: string, metadata?: EventMetadata) => void;
  }
}

export function trackEvent(name: string, metadata?: EventMetadata): void {
  if (typeof window === "undefined") return;
  try {
    window.sa_event?.(name, metadata);
  } catch {
    // analytics must never break the app
  }
}
