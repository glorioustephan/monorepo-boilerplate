import { describe, expect, it } from "vitest";

import { RateLimiter, retry, withTimeout } from "./resilience";

describe("retry", () => {
  it("retries until success", async () => {
    let calls = 0;
    const result = await retry(
      () => {
        calls += 1;
        if (calls < 3) return Promise.reject(new Error("fail"));
        return Promise.resolve("ok");
      },
      { retries: 5, baseDelayMs: 0 },
    );
    expect(result).toBe("ok");
    expect(calls).toBe(3);
  });

  it("stops when shouldRetry returns false", async () => {
    let calls = 0;
    await expect(
      retry(
        () => {
          calls += 1;
          return Promise.reject(new Error("nope"));
        },
        { retries: 5, baseDelayMs: 0, shouldRetry: () => false },
      ),
    ).rejects.toThrow("nope");
    expect(calls).toBe(1);
  });
});

describe("withTimeout", () => {
  it("resolves when fast enough", async () => {
    await expect(withTimeout(Promise.resolve(42), 50)).resolves.toBe(42);
  });

  it("rejects with a TIMEOUT error when too slow", async () => {
    const slow = new Promise((resolve) => setTimeout(resolve, 50));
    await expect(withTimeout(slow, 5)).rejects.toMatchObject({ code: "TIMEOUT" });
  });
});

describe("RateLimiter", () => {
  it("allows up to capacity then blocks", () => {
    const limiter = new RateLimiter(2, 1);
    expect(limiter.tryAcquire()).toBe(true);
    expect(limiter.tryAcquire()).toBe(true);
    expect(limiter.tryAcquire()).toBe(false);
  });
});
