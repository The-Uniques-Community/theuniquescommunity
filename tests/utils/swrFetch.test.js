import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  networkFirstFetch,
  swrFetch,
  isBrowserOnline,
  broadcastCacheStatus,
  subscribeCacheStatus,
  registerCacheFetcher,
} from "../../src/utils/cache/networkFirst.js";

describe("SWR Cache & Network Resilience Engine", () => {
  it("verifies isBrowserOnline defaults to true in standard/server environments", () => {
    assert.equal(isBrowserOnline(), true);
  });

  it("verifies swrFetch is an alias to networkFirstFetch", () => {
    assert.strictEqual(swrFetch, networkFirstFetch);
  });

  it("subscribes to cache status events and receives broadcast notifications", async () => {
    let received = null;
    const unsubscribe = subscribeCacheStatus((detail) => {
      received = detail;
    });

    broadcastCacheStatus({
      cacheKey: "test_key",
      isFromCache: false,
      timestamp: 12345,
      error: null,
    });

    unsubscribe();
    assert.ok(received, "Should have received broadcast detail");
    assert.strictEqual(received.cacheKey, "test_key");
    assert.strictEqual(received.isFromCache, false);
    assert.strictEqual(received.error, null);
  });

  it("registers and unregisters cache fetchers cleanly", () => {
    let fetchCalled = false;
    const unregister = registerCacheFetcher("sample_key", async () => {
      fetchCalled = true;
    });

    assert.equal(typeof unregister, "function");
    unregister();
  });

  it("executes network fetch and applies transform when no cache is present", async () => {
    const fakeData = ["Batch A", "Batch B"];
    const fetcher = async (signal) => {
      assert.ok(signal, "AbortSignal should be passed to fetcher");
      return { data: { success: true, data: fakeData } };
    };

    const result = await networkFirstFetch({
      cacheKey: "test_batches_fresh",
      fetcher,
      fallbackDefault: ["Default"],
      transform: (items) => items.map((x) => x.toUpperCase()),
      timeoutMs: 2000,
      forceFresh: true,
    });

    assert.deepEqual(result.data, ["BATCH A", "BATCH B"]);
    assert.strictEqual(result.isFromCache, false);
    assert.ok(result.timestamp > 0);
  });

  it("gracefully falls back to fallbackDefault on network error without cache", async () => {
    const failingFetcher = async () => {
      throw new Error("500 Internal Server Error");
    };

    const result = await networkFirstFetch({
      cacheKey: "test_failing_endpoint",
      fetcher: failingFetcher,
      fallbackDefault: ["Fallback Item"],
      timeoutMs: 1000,
      forceFresh: true,
    });

    assert.deepEqual(result.data, ["Fallback Item"]);
    assert.strictEqual(result.isFromCache, true);
    assert.strictEqual(result.isDefault, true);
    assert.strictEqual(result.timestamp, null);
  });

  it("deduplicates concurrent in-flight requests for the same cache key", async () => {
    let networkCallCount = 0;
    const slowFetcher = async () => {
      networkCallCount++;
      await new Promise((r) => setTimeout(r, 50));
      return { data: { success: true, data: ["Item 1"] } };
    };

    const [res1, res2] = await Promise.all([
      networkFirstFetch({
        cacheKey: "test_dedup_key",
        fetcher: slowFetcher,
        fallbackDefault: [],
        forceFresh: true,
      }),
      networkFirstFetch({
        cacheKey: "test_dedup_key",
        fetcher: slowFetcher,
        fallbackDefault: [],
        forceFresh: true,
      }),
    ]);

    assert.deepEqual(res1.data, ["Item 1"]);
    assert.deepEqual(res2.data, ["Item 1"]);
    assert.strictEqual(networkCallCount, 1, "Fetcher should only have been called once due to deduplication");
  });
});
