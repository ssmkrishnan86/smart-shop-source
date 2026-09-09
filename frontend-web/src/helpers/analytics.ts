export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] ${eventName}:`, properties);
  }
}
