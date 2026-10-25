import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveProfilesWithDefaults, DEFAULT_BATCH_PROFILES } from "../../src/utils/batch/batchProfilesData.js";
import { BASE_URL } from "../../src/config.js";

describe("batchProfilesData seam S3", () => {
  const normalizedBaseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "https://the-uniques-portal.vercel.app";
  const sampleFileId = "1Mrd7Gxja5ZEhU17NVn-PA8VCQm1e-nAr";

  describe("resolveProfilesWithDefaults URL Normalization", () => {
    it("case 1: transforms relative /api/image-proxy/:fileId into fully qualified backend proxy URL", () => {
      const input = [
        {
          id: "uniques-5.0",
          label: "Uniques 5.0",
          title: "The Uniques Batch 5.0",
          description: "Batch 5.0 description",
          image: `/api/image-proxy/${sampleFileId}`,
          customImage: true,
        },
      ];

      const result = resolveProfilesWithDefaults(input);
      assert.strictEqual(result.length, 1);
      const expectedUrl = `${normalizedBaseUrl}/api/image-proxy/${sampleFileId}`;
      assert.strictEqual(result[0].image, expectedUrl);
      assert.strictEqual(result[0].customImage, true);
    });

    it("case 2: falls back to default webp asset when image is null, empty string, or whitespace", () => {
      const input = [
        {
          id: "uniques-1.0",
          label: "Uniques 1.0",
          title: "The Uniques Batch 1.0",
          image: null,
        },
        {
          id: "uniques-2.0",
          label: "Uniques 2.0",
          title: "The Uniques Batch 2.0",
          image: "",
        },
        {
          id: "uniques-3.0",
          label: "Uniques 3.0",
          title: "The Uniques Batch 3.0",
          image: "   ",
        },
      ];

      const result = resolveProfilesWithDefaults(input);
      assert.strictEqual(result.length, 3);
      result.forEach((p) => {
        assert.ok(p.image, "Image should not be null or empty");
        assert.ok(
          p.image.includes(".webp") || p.image.includes("assets"),
          `Image ${p.image} should be a valid fallback asset`
        );
      });
    });

    it("case 3: preserves external image URLs without alteration", () => {
      const externalUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800";
      const input = [
        {
          id: "uniques-4.0",
          label: "Uniques 4.0",
          title: "The Uniques Batch 4.0",
          image: externalUrl,
        },
      ];

      const result = resolveProfilesWithDefaults(input);
      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].image, externalUrl);
    });

    it("case 4: naturally sorts cohorts in numeric order (1.0, 2.0, 3.0, 4.0, 5.0)", () => {
      const input = [
        { id: "uniques-5.0", label: "Uniques 5.0", title: "The Uniques Batch 5.0" },
        { id: "uniques-1.0", label: "Uniques 1.0", title: "The Uniques Batch 1.0" },
        { id: "uniques-3.0", label: "Uniques 3.0", title: "The Uniques Batch 3.0" },
        { id: "uniques-2.0", label: "Uniques 2.0", title: "The Uniques Batch 2.0" },
      ];

      const result = resolveProfilesWithDefaults(input);
      assert.strictEqual(result.length, 4);
      assert.strictEqual(result[0].label, "Uniques 1.0");
      assert.strictEqual(result[1].label, "Uniques 2.0");
      assert.strictEqual(result[2].label, "Uniques 3.0");
      assert.strictEqual(result[3].label, "Uniques 5.0");
    });

    it("case 5: filters out malformed timestamp-based batch identifiers", () => {
      const input = [
        { id: "uniques-1.0", label: "Uniques 1.0", title: "The Uniques Batch 1.0" },
        { id: "temp-batch", label: "Batch-1729000000000", title: "The Uniques-1729000000000" },
      ];

      const result = resolveProfilesWithDefaults(input);
      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].label, "Uniques 1.0");
    });

    it("case 6: returns empty array when input is empty or non-array (no stale defaults)", () => {
      assert.deepStrictEqual(resolveProfilesWithDefaults([]), []);
      assert.deepStrictEqual(resolveProfilesWithDefaults(null), []);
      assert.deepStrictEqual(resolveProfilesWithDefaults(undefined), []);
      assert.deepStrictEqual(DEFAULT_BATCH_PROFILES, []);
    });
  });
});
