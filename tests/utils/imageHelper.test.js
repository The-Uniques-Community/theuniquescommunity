import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { extractDriveFileId, getSafeImageUrl, DEFAULT_PROXY_BASE } from "../../src/utils/imageHelper.js";
import { BASE_URL } from "../../src/config.js";

describe("imageHelper seam S1", () => {
  const normalizedBaseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const sampleFileId = "1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz";

  describe("extractDriveFileId", () => {
    it("case a: extracts fileId from relative image proxy path", () => {
      const result = extractDriveFileId(`/api/image-proxy/${sampleFileId}`);
      assert.strictEqual(result, sampleFileId);
    });

    it("case b: extracts fileId from absolute image proxy URL", () => {
      const result = extractDriveFileId(
        `https://the-uniques-portal.vercel.app/api/image-proxy/${sampleFileId}`
      );
      assert.strictEqual(result, sampleFileId);
    });

    it("case c: extracts fileId from raw drive ID string", () => {
      const result = extractDriveFileId(sampleFileId);
      assert.strictEqual(result, sampleFileId);
    });

    it("case d: returns null for local static assets", () => {
      const result = extractDriveFileId("/projects/unicare.webp");
      assert.strictEqual(result, null);
    });

    it("extracts fileId from drive uc url", () => {
      const result = extractDriveFileId(`https://drive.google.com/uc?id=${sampleFileId}&export=download`);
      assert.strictEqual(result, sampleFileId);
    });

    it("extracts fileId from drive /d/ url", () => {
      const result = extractDriveFileId(`https://drive.google.com/file/d/${sampleFileId}/view`);
      assert.strictEqual(result, sampleFileId);
    });

    it("extracts fileId from object with fileId or url", () => {
      assert.strictEqual(extractDriveFileId({ fileId: sampleFileId }), sampleFileId);
      assert.strictEqual(extractDriveFileId({ url: `/api/image-proxy/${sampleFileId}` }), sampleFileId);
      assert.strictEqual(extractDriveFileId({ image: `/api/image-proxy/${sampleFileId}` }), sampleFileId);
    });
  });

  describe("getSafeImageUrl", () => {
    it("case e: prefixes relative proxy path with BASE_URL", () => {
      const expectedUrl = `${normalizedBaseUrl}/api/image-proxy/${sampleFileId}`;
      const result = getSafeImageUrl(`/api/image-proxy/${sampleFileId}`);
      assert.strictEqual(result, expectedUrl);
    });

    it("case f: preserves absolute proxy URL without double prefixing", () => {
      const fullUrl = `https://the-uniques-portal.vercel.app/api/image-proxy/${sampleFileId}`;
      const result = getSafeImageUrl(fullUrl);
      assert.strictEqual(result, fullUrl);
    });

    it("re-anchors absolute proxy URLs with different host to current BASE_URL", () => {
      const localhostUrl = `http://localhost:5001/api/image-proxy/${sampleFileId}`;
      const result = getSafeImageUrl(localhostUrl);
      assert.strictEqual(result, `${normalizedBaseUrl}/api/image-proxy/${sampleFileId}`);
    });

    it("verifies DEFAULT_PROXY_BASE constant is set to canonical portal domain", () => {
      assert.strictEqual(DEFAULT_PROXY_BASE, "https://the-uniques-portal.vercel.app");
    });

    it("case g: preserves local static asset path", () => {
      const result = getSafeImageUrl("/projects/unicare.webp");
      assert.strictEqual(result, "/projects/unicare.webp");
    });

    it("case h: preserves external non-drive image URL", () => {
      const externalUrl = "https://images.unsplash.com/photo-123";
      const result = getSafeImageUrl(externalUrl);
      assert.strictEqual(result, externalUrl);
    });

    it("case i: returns fallback when source is null", () => {
      const result = getSafeImageUrl(null, "/fallback.webp");
      assert.strictEqual(result, "/fallback.webp");
    });

    it("case j: returns fallback when source is empty string", () => {
      const result = getSafeImageUrl("", "/fallback.webp");
      assert.strictEqual(result, "/fallback.webp");
    });

    it("returns fallback when source is whitespace only", () => {
      const result = getSafeImageUrl("   ", "/fallback.webp");
      assert.strictEqual(result, "/fallback.webp");
    });

    it("routes drive url through image proxy", () => {
      const expectedUrl = `${normalizedBaseUrl}/api/image-proxy/${sampleFileId}`;
      const result = getSafeImageUrl(`https://drive.google.com/file/d/${sampleFileId}/view`);
      assert.strictEqual(result, expectedUrl);
    });

    it("handles object sources properly", () => {
      const expectedUrl = `${normalizedBaseUrl}/api/image-proxy/${sampleFileId}`;
      assert.strictEqual(getSafeImageUrl({ fileId: sampleFileId }), expectedUrl);
      assert.strictEqual(getSafeImageUrl({ image: `/api/image-proxy/${sampleFileId}` }), expectedUrl);
      assert.strictEqual(
        getSafeImageUrl({ url: `https://the-uniques-portal.vercel.app/api/image-proxy/${sampleFileId}` }),
        `https://the-uniques-portal.vercel.app/api/image-proxy/${sampleFileId}`
      );
      assert.strictEqual(getSafeImageUrl({ url: "/projects/unicare.webp" }), "/projects/unicare.webp");
    });
  });
});
