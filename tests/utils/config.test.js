import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Helper function modeling BASE_URL resolution logic
const resolveBaseUrl = (envVal) => {
  return envVal && String(envVal).trim() !== ""
    ? String(envVal).trim().replace(/\/+$/, "")
    : "https://the-uniques-portal.vercel.app";
};

describe("Backend API URL Configuration", () => {
  it("resolves to custom configured VITE_API_BASE_URL", () => {
    const customUrl = "http://localhost:5001";
    assert.equal(resolveBaseUrl(customUrl), "http://localhost:5001");
  });

  it("strips trailing slashes from configured URL", () => {
    assert.equal(
      resolveBaseUrl("https://my-custom-backend.vercel.app///"),
      "https://my-custom-backend.vercel.app"
    );
  });

  it("falls back to canonical hosted portal when VITE_API_BASE_URL is undefined", () => {
    assert.equal(resolveBaseUrl(undefined), "https://the-uniques-portal.vercel.app");
  });

  it("falls back to canonical hosted portal when VITE_API_BASE_URL is empty string", () => {
    assert.equal(resolveBaseUrl(""), "https://the-uniques-portal.vercel.app");
    assert.equal(resolveBaseUrl("   "), "https://the-uniques-portal.vercel.app");
  });

  it("falls back to canonical hosted portal when VITE_API_BASE_URL is null", () => {
    assert.equal(resolveBaseUrl(null), "https://the-uniques-portal.vercel.app");
  });
});
