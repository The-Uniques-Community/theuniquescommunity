import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isChunkLoadError, retryImport } from "../../src/utils/lazyWithRetry.js";

// Mock in-memory storage implementation for tests
class MockStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.get(key) || null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
}

describe("lazyWithRetry utility", () => {
  describe("isChunkLoadError", () => {
    it("identifies dynamic import fetch failures", () => {
      const err = new TypeError(
        "Failed to fetch dynamically imported module: https://theuniques.in/assets/About-xyz.js"
      );
      assert.equal(isChunkLoadError(err), true);
    });

    it("identifies module script import failures", () => {
      const err = new Error("Importing a module script failed.");
      assert.equal(isChunkLoadError(err), true);
    });

    it("identifies chunk load errors by name or message", () => {
      const errByName = { name: "ChunkLoadError", message: "Chunk 42 not found" };
      const errByMsg = new Error("Loading chunk 5 failed");
      assert.equal(isChunkLoadError(errByName), true);
      assert.equal(isChunkLoadError(errByMsg), true);
    });

    it("returns false for standard business/runtime errors", () => {
      assert.equal(isChunkLoadError(new TypeError("Cannot read properties of null")), false);
      assert.equal(isChunkLoadError(new Error("Network timeout on api/posts")), false);
      assert.equal(isChunkLoadError(null), false);
      assert.equal(isChunkLoadError(undefined), false);
    });
  });

  describe("retryImport", () => {
    it("resolves immediately when import succeeds on first attempt", async () => {
      let callCount = 0;
      const fakeModule = { default: () => "Component" };
      const importer = async () => {
        callCount++;
        return fakeModule;
      };

      const result = await retryImport(importer, { retries: 2, interval: 10 });
      assert.equal(result, fakeModule);
      assert.equal(callCount, 1);
    });

    it("retries on temporary network failure and succeeds", async () => {
      let callCount = 0;
      const fakeModule = { default: () => "Component" };
      const importer = async () => {
        callCount++;
        if (callCount < 2) {
          throw new Error("Temporary network glitch");
        }
        return fakeModule;
      };

      const result = await retryImport(importer, { retries: 2, interval: 20 });
      assert.equal(result, fakeModule);
      assert.equal(callCount, 2);
    });

    it("triggers reloader when chunk error occurs and no reload lock exists", async () => {
      const storage = new MockStorage();
      let reloadCalled = false;
      const reloader = () => {
        reloadCalled = true;
      };

      const importer = async () => {
        throw new TypeError("Failed to fetch dynamically imported module: /assets/test.js");
      };

      await assert.rejects(
        async () => {
          await retryImport(importer, {
            retries: 0,
            interval: 10,
            storage,
            reloader,
            reloadDelay: 20000,
          });
        },
        /Reloading page due to updated application version/
      );

      assert.equal(reloadCalled, true);
      assert.ok(storage.getItem("tu_chunk_reload_timestamp"));
    });

    it("prevents infinite reload loop if reload was performed recently", async () => {
      const storage = new MockStorage();
      // Set timestamp within 20s
      storage.setItem("tu_chunk_reload_timestamp", String(Date.now() - 5000));

      let reloadCalled = false;
      const reloader = () => {
        reloadCalled = true;
      };

      const importer = async () => {
        throw new TypeError("Failed to fetch dynamically imported module: /assets/test.js");
      };

      await assert.rejects(
        async () => {
          await retryImport(importer, {
            retries: 0,
            interval: 10,
            storage,
            reloader,
            reloadDelay: 20000,
          });
        },
        /Failed to fetch dynamically imported module/
      );

      // Reloader must NOT have been called due to lock
      assert.equal(reloadCalled, false);
    });
  });
});
