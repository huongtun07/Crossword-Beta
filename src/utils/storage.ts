import { CrosswordPuzzle, UserProgress } from '../types';

const STORAGE_KEY_PROGRESS = 'crossword_master_progress';
const STORAGE_KEY_CUSTOM_PUZZLES = 'crossword_master_custom_puzzles';

export function getSavedProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return { completedPuzzleIds: [], puzzleScores: {}, totalStars: 0, totalWordsSolved: 0 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Return default
  }
  return { completedPuzzleIds: [], puzzleScores: {}, totalStars: 0, totalWordsSolved: 0 };
}

export function saveUserProgress(progress: UserProgress) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch {
    // Storage full or unavailable
  }
}

export function getCustomPuzzles(): CrosswordPuzzle[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_PUZZLES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Return default
  }
  return [];
}

export function saveCustomPuzzle(puzzle: CrosswordPuzzle) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomPuzzles();
    const updated = [puzzle, ...existing.filter((p) => p.id !== puzzle.id)];
    localStorage.setItem(STORAGE_KEY_CUSTOM_PUZZLES, JSON.stringify(updated));
  } catch {
    // Fail silently
  }
}

export function deleteCustomPuzzle(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getCustomPuzzles();
    const updated = existing.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY_CUSTOM_PUZZLES, JSON.stringify(updated));
  } catch {
    // Fail silently
  }
}
