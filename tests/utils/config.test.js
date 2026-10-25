import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Helper function modeling BASE_URL resolution logic
const resolveBaseUrl = (envVal) => {
  return envVal && String(envVal).trim() !== ""
    ? String(envVal).trim().replace(/\/+$/, "")
    : "https://the-uniques-portal.vercel.app";
};

// Helper function modeling PORTAL_URL resolution logic
const resolvePortalUrl = (portalUrl, portalFrontendUrl) => {
  return (
    (portalUrl && String(portalUrl).trim() !== ""
      ? String(portalUrl).trim().replace(/\/+$/, "")
      : null) ||
    (portalFrontendUrl && String(portalFrontendUrl).trim() !== ""
      ? String(portalFrontendUrl).trim().replace(/\/+$/, "")
      : null) ||
    "https://the-uniques-portal.vercel.app"
  );
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

describe("Portal Frontend URL Configuration", () => {
  it("resolves to custom configured VITE_PORTAL_URL", () => {
    assert.equal(resolvePortalUrl("http://localhost:3000"), "http://localhost:3000");
  });

  it("strips trailing slashes from portal URL", () => {
    assert.equal(resolvePortalUrl("https://portal.mycustomdomain.com///"), "https://portal.mycustomdomain.com");
  });

  it("supports VITE_PORTAL_FRONTEND_URL as fallback", () => {
    assert.equal(resolvePortalUrl("", "http://localhost:5173"), "http://localhost:5173");
  });

  it("falls back to default canonical portal when undefined or empty", () => {
    assert.equal(resolvePortalUrl(undefined), "https://the-uniques-portal.vercel.app");
    assert.equal(resolvePortalUrl(""), "https://the-uniques-portal.vercel.app");
    assert.equal(resolvePortalUrl(null), "https://the-uniques-portal.vercel.app");
  });
});
