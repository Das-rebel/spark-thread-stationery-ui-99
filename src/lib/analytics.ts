/**
 * Analytics tracking utility
 * Tracks user engagement and app performance
 */

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

class Analytics {
  private userId: string | null = null;
  private sessionId: string;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  setUser(userId: string | null) {
    this.userId = userId;
  }

  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        userId: this.userId,
        sessionId: this.sessionId,
        url: window.location.pathname,
        userAgent: navigator.userAgent,
      },
      timestamp: Date.now(),
    };

    this.events.push(analyticsEvent);
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event, analyticsEvent.properties);
    }

    // In production, send to analytics service
    // this.sendToAnalyticsService(analyticsEvent);
  }

  page(pageName?: string) {
    this.track('page_view', {
      page: pageName || window.location.pathname,
      referrer: document.referrer,
    });
  }

  // User actions
  bookmarkCreated(bookmarkId: string, source: string) {
    this.track('bookmark_created', { bookmarkId, source });
  }

  bookmarkViewed(bookmarkId: string) {
    this.track('bookmark_viewed', { bookmarkId });
  }

  collectionCreated(collectionId: string) {
    this.track('collection_created', { collectionId });
  }

  searchPerformed(query: string, resultsCount: number) {
    this.track('search_performed', { query, resultsCount });
  }

  featureUsed(featureName: string, details?: Record<string, any>) {
    this.track('feature_used', { featureName, ...details });
  }

  errorOccurred(error: Error, context?: string) {
    this.track('error_occurred', {
      errorMessage: error.message,
      errorStack: error.stack,
      context,
    });
  }

  performanceMetric(metric: string, value: number, unit: string = 'ms') {
    this.track('performance_metric', { metric, value, unit });
  }

  // Session metrics
  getSessionDuration(): number {
    return Date.now() - parseInt(this.sessionId.split('-')[0]);
  }

  getEventCount(): number {
    return this.events.length;
  }

  // Export events for debugging
  exportEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents() {
    this.events = [];
  }
}

export const analytics = new Analytics();
