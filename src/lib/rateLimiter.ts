interface RateLimiterConfig {
  windowMs: number;    // 时间窗口（毫秒）
  maxRequests: number; // 最大请求数
}

export class RateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private requests: number;
  private lastReset: number;

  constructor(config: RateLimiterConfig) {
    this.windowMs = config.windowMs;
    this.maxRequests = config.maxRequests;
    this.requests = 0;
    this.lastReset = Date.now();
  }

  private resetIfNeeded(): void {
    const now = Date.now();
    if (now - this.lastReset >= this.windowMs) {
      this.requests = 0;
      this.lastReset = now;
    }
  }

  public tryRequest(): boolean {
    this.resetIfNeeded();
    
    if (this.requests >= this.maxRequests) {
      return false;
    }

    this.requests++;
    return true;
  }

  public getRemainingRequests(): number {
    this.resetIfNeeded();
    return Math.max(0, this.maxRequests - this.requests);
  }

  public getTimeToReset(): number {
    const now = Date.now();
    return Math.max(0, this.windowMs - (now - this.lastReset));
  }
} 