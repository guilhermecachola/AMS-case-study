import { STORAGE_KEY } from "../config/validationRules";
import type { SavedSubmission } from "../types";

export const loadSubmissions = (): SavedSubmission[] => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as SavedSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveSubmission = (submission: SavedSubmission): SavedSubmission[] => {
  const current = loadSubmissions();
  const updated = [submission, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
