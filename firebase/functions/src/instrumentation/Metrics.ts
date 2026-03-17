interface MetricEntry {
  name: string;
  value: number;
  timestamp: number;
  labels?: Record<string, string>;
}

class MetricsCollector {
  private static instance: MetricsCollector;
  private metrics: MetricEntry[] = [];
  private counters: Map<string, number> = new Map();
  private histograms: Map<string, number[]> = new Map();

  static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector();
    }
    return MetricsCollector.instance;
  }

  increment(name: string, value = 1, labels?: Record<string, string>): void {
    const key = labels ? `${name}:${JSON.stringify(labels)}` : name;
    this.counters.set(key, (this.counters.get(key) || 0) + value);
    this.metrics.push({ name, value, timestamp: Date.now(), labels });
  }

  recordDuration(name: string, durationMs: number, labels?: Record<string, string>): void {
    const key = labels ? `${name}:${JSON.stringify(labels)}` : name;
    if (!this.histograms.has(key)) {
      this.histograms.set(key, []);
    }
    this.histograms.get(key)!.push(durationMs);
    this.metrics.push({ name: `${name}_duration_ms`, value: durationMs, timestamp: Date.now(), labels });
  }

  getCounter(name: string): number {
    return this.counters.get(name) || 0;
  }

  getHistogram(name: string): { count: number; min: number; max: number; avg: number; p95: number; p99: number } | null {
    const values = this.histograms.get(name);
    if (!values || values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    return {
      count: sorted.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: sorted.reduce((a, b) => a + b, 0) / sorted.length,
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }

  getSummary(): Record<string, unknown> {
    const summary: Record<string, unknown> = {};
    summary.counters = Object.fromEntries(this.counters);
    const histSummary: Record<string, unknown> = {};
    for (const [key, values] of this.histograms) {
      histSummary[key] = this.getHistogram(key);
    }
    summary.histograms = histSummary;
    summary.totalEvents = this.metrics.length;
    return summary;
  }

  reset(): void {
    this.metrics = [];
    this.counters.clear();
    this.histograms.clear();
  }
}

export const metrics = MetricsCollector.getInstance();
