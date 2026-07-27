export type GradeLevel = 'Grade6' | 'Grade7' | 'Grade8' | 'Grade9' | 'Custom';

export type GameMode = 'practice' | 'timed' | 'classroom';

export interface CrosswordRow {
  id: number; // Row index (1-based, e.g. 1 to 6)
  word: string; // Target English word, uppercase (e.g. "TEACHER")
  keyLetterIndex: number; // 0-based index of the letter that forms the secret vertical keyword
  clueVi: string; // Vietnamese clue / question
  clueEn?: string; // Optional English hint or sentence completion
  ipa?: string; // IPA pronunciation e.g. "/ˈtiː.tʃər/"
  partOfSpeech?: string; // e.g. "Noun", "Verb", "Adjective"
  exampleSentence?: string; // Example sentence with blank e.g. "My English ___ is very kind."
}

export interface CrosswordPuzzle {
  id: string;
  title: string;
  grade: GradeLevel;
  gradeLabel: string;
  topic: string;
  description: string;
  secretKeyword: string; // The vertical keyword formed by key letters (e.g. "ENGLISH")
  secretKeywordClueVi: string; // Vietnamese clue for the secret keyword
  secretKeywordClueEn?: string; // English clue for the secret keyword
  rows: CrosswordRow[];
}

export interface UserProgress {
  completedPuzzleIds: string[];
  puzzleScores: Record<string, number>; // puzzleId -> high score
  totalStars: number;
  totalWordsSolved: number;
}

export interface CellState {
  value: string;
  isCorrect?: boolean;
  isError?: boolean;
  isRevealed?: boolean;
}
