export const DEFAULT_BATCHES = [
  "The Uniques 1.0",
  "The Uniques 2.0",
  "The Uniques 3.0",
  "The Uniques 4.0",
];

const BATCH_STORAGE_KEY = "tu_community_member_batches";

export const getStoredBatches = () => {
  try {
    const raw = localStorage.getItem(BATCH_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(DEFAULT_BATCHES));
      return [...DEFAULT_BATCHES];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const merged = [...DEFAULT_BATCHES];
      parsed.forEach((b) => {
        if (b && !merged.includes(b)) {
          merged.push(b);
        }
      });
      return merged;
    }
    return [...DEFAULT_BATCHES];
  } catch (err) {
    console.error("Error reading stored batches:", err);
    return [...DEFAULT_BATCHES];
  }
};

export const suggestNextBatch = (existingBatches = getStoredBatches()) => {
  let maxNum = 4.0;
  existingBatches.forEach((b) => {
    const match = String(b).match(/(\d+(\.\d+)?)/);
    if (match) {
      const num = parseFloat(match[1]);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  });
  const nextNum = (Math.floor(maxNum) + 1).toFixed(1);
  return `The Uniques ${nextNum}`;
};

export const addStoredBatch = (batchName) => {
  if (!batchName || !batchName.trim()) return null;
  let formatted = batchName.trim();
  if (
    !formatted.toLowerCase().startsWith("the uniques") &&
    !formatted.toLowerCase().startsWith("uniques")
  ) {
    formatted = `The Uniques ${formatted}`;
  } else if (formatted.toLowerCase().startsWith("uniques")) {
    formatted = `The ${formatted}`;
  }

  const current = getStoredBatches();
  if (!current.includes(formatted)) {
    const updated = [...current, formatted];
    try {
      localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(
        new CustomEvent("batches-updated", { detail: updated })
      );
    } catch (err) {
      console.error("Error saving batch:", err);
    }
    return formatted;
  }
  return formatted;
};
