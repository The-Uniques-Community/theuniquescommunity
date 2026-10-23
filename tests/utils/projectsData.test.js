import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeProject, getProjectById, mergeWithInitialProjects } from "../../src/utils/project/projectsData.js";
import { BASE_URL } from "../../src/config.js";

describe("projectsData seam S2", () => {
  const normalizedBaseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "https://the-uniques-portal.vercel.app";
  const sampleFileId = "1PqxZ9aOCL1pYKpFbzZkSgiH_x8ar13Dz";

  describe("normalizeProject", () => {
    it("case a: transforms relative image-proxy path into fully qualified URL", () => {
      const input = {
        id: "proj-101",
        title: "UNIQUE eGYAN",
        image: `/api/image-proxy/${sampleFileId}`,
      };
      const result = normalizeProject(input);
      const expectedUrl = `${normalizedBaseUrl}/api/image-proxy/${sampleFileId}`;
      assert.strictEqual(result.image, expectedUrl);
    });

    it("case b: preserves local static asset paths such as /projects/unicare.webp", () => {
      const input = {
        id: "proj-102",
        title: "UNI CARE",
        image: "/projects/unicare.webp",
      };
      const result = normalizeProject(input);
      assert.strictEqual(result.image, "/projects/unicare.webp");
    });

    it("case c: sets fallback /projects/unicare.webp for undefined, null, or empty image", () => {
      const inputUndefined = { id: 1, title: "No Image Key" };
      const resultUndefined = normalizeProject(inputUndefined);
      assert.strictEqual(resultUndefined.image, "/projects/unicare.webp");

      const inputNull = { id: 2, title: "Null Image", image: null };
      const resultNull = normalizeProject(inputNull);
      assert.strictEqual(resultNull.image, "/projects/unicare.webp");

      const inputEmpty = { id: 3, title: "Empty Image", image: "" };
      const resultEmpty = normalizeProject(inputEmpty);
      assert.strictEqual(resultEmpty.image, "/projects/unicare.webp");

      const inputWhitespace = { id: 4, title: "Whitespace Image", image: "   " };
      const resultWhitespace = normalizeProject(inputWhitespace);
      assert.strictEqual(resultWhitespace.image, "/projects/unicare.webp");

      // Non-object passthrough
      assert.strictEqual(normalizeProject(null), null);
      assert.strictEqual(normalizeProject(undefined), undefined);
    });

    it("case d: preserves absolute proxy URL without duplicate base URL", () => {
      const absoluteUrl = `https://the-uniques-portal.vercel.app/api/image-proxy/${sampleFileId}`;
      const input = {
        id: "proj-103",
        title: "Ideajam",
        image: absoluteUrl,
      };
      const result = normalizeProject(input);
      assert.strictEqual(result.image, absoluteUrl);
    });

    it("case e: sets both id and _id properly", () => {
      const mongoItem = { _id: "mongo-id-999", title: "Mongo Project" };
      const resultMongo = normalizeProject(mongoItem);
      assert.strictEqual(resultMongo.id, "mongo-id-999");
      assert.strictEqual(resultMongo._id, "mongo-id-999");

      const numericItem = { id: 42, title: "Numeric Project" };
      const resultNumeric = normalizeProject(numericItem);
      assert.strictEqual(resultNumeric.id, 42);
      assert.strictEqual(resultNumeric._id, 42);
    });
  });

  describe("mergeWithInitialProjects", () => {
    it("merges backend item with initial project matching case-insensitively and preserves backend image", () => {
      const backendItems = [
        {
          _id: "6adb02aaa1805aee0a0aa3b8",
          title: "Uniques eGyan",
          image: `/api/image-proxy/${sampleFileId}`,
          technologies: ["REACT", "NODE.JS", "MONGODB"],
        },
      ];

      const merged = mergeWithInitialProjects(backendItems);
      assert.strictEqual(merged.length, 1);
      assert.strictEqual(merged[0]._id, "6adb02aaa1805aee0a0aa3b8");
      assert.strictEqual(merged[0].title, "Uniques eGyan");
      // The backend image must override any initial default image
      assert.strictEqual(
        merged[0].image,
        `${normalizedBaseUrl}/api/image-proxy/${sampleFileId}`
      );
      // Features or rich metadata from initial match should be inherited
      assert.ok(Array.isArray(merged[0].features), "Should inherit features from initial project");
    });
  });

  describe("getProjectById", () => {
    it("case f: retrieves project with normalized safe image", () => {
      const project = getProjectById(1);
      assert.ok(project, "Project with id 1 should exist");
      assert.strictEqual(project.id, 1);
      assert.strictEqual(project._id, 1);
      assert.strictEqual(project.image, "/projects/unicare.webp");

      // Verify lookup by slug
      const projectBySlug = getProjectById("uni-care");
      assert.ok(projectBySlug, "Project should be findable by slug");
      assert.strictEqual(projectBySlug.title, "UNI CARE");
      assert.strictEqual(projectBySlug.image, "/projects/unicare.webp");
    });
  });
});
