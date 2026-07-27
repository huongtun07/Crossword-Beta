import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  GradeLevel, 
  GameMode, 
  CrosswordPuzzle, 
  CellState, 
  UserProgress 
} from './types';
import { INITIAL_PUZZLES } from './data/puzzles';
import { 
  getSavedProgress, 
  saveUserProgress, 
  getCustomPuzzles, 
  saveCustomPuzzle 
} from './utils/storage';
import { soundFx } from './utils/sound';

import { Header } from './components/Header';
import { CrosswordGrid } from './components/CrosswordGrid';
import { CluePanel } from './components/CluePanel';
import { SecretKeywordCard } from './components/SecretKeywordCard';
import { TimerBar } from './components/TimerBar';
import { VictoryModal } from './components/VictoryModal';
import { CustomPuzzleModal } from './components/CustomPuzzleModal';
import { QRCodeModal } from './components/QRCodeModal';
import { HowToPlayModal } from './components/HowToPlayModal';

import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Trophy,
  Info
} from 'lucide-react';

export default function App() {
  // Saved Progress & Custom Puzzles State
  const [progress, setProgress] = useState<UserProgress>(getSavedProgress);
  const [customPuzzles, setCustomPuzzles] = useState<CrosswordPuzzle[]>(getCustomPuzzles);

  // Active Navigation & Filters
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>('Grade6');
  const [activePuzzleIndex, setActivePuzzleIndex] = useState(0);
  const [gameMode, setGameMode] = useState<GameMode>('practice');
  const [soundMuted, setSoundMuted] = useState(false);

  // Available Puzzles for current grade
  const gradePuzzles = useMemo(() => {
    if (currentGrade === 'Custom') {
      return customPuzzles;
    }
    return INITIAL_PUZZLES.filter((p) => p.grade === currentGrade);
  }, [currentGrade, customPuzzles]);

  const activePuzzle: CrosswordPuzzle = useMemo(() => {
    if (gradePuzzles.length === 0) {
      return INITIAL_PUZZLES[0];
    }
    return gradePuzzles[Math.min(activePuzzleIndex, gradePuzzles.length - 1)];
  }, [gradePuzzles, activePuzzleIndex]);

  // Gameplay State
  const [score, setScore] = useState(0);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [activeRowId, setActiveRowId] = useState<number>(1);
  const [activeCellIndex, setActiveCellIndex] = useState<number>(0);
  const [cellStates, setCellStates] = useState<Record<string, CellState>>({});
  const [solvedRowIds, setSolvedRowIds] = useState<number[]>([]);
  const [revealedKeyLetters, setRevealedKeyLetters] = useState<number[]>([]);
  const [isSecretKeywordSolved, setIsSecretKeywordSolved] = useState(false);

  // Modals
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);

  // Reset/Initialize state whenever active puzzle changes
  const initPuzzleState = useCallback((puzzle: CrosswordPuzzle) => {
    setScore(0);
    setTimeSpentSeconds(0);
    setActiveRowId(puzzle.rows[0]?.id || 1);
    setActiveCellIndex(0);
    setSolvedRowIds([]);
    setRevealedKeyLetters([]);
    setIsSecretKeywordSolved(false);
    setShowVictoryModal(false);

    // Empty cell states
    const initialCells: Record<string, CellState> = {};
    puzzle.rows.forEach((row) => {
      for (let c = 0; c < row.word.length; c++) {
        initialCells[`${row.id}-${c}`] = { value: '' };
      }
    });
    setCellStates(initialCells);
  }, []);

  useEffect(() => {
    if (activePuzzle) {
      initPuzzleState(activePuzzle);
    }
  }, [activePuzzle, initPuzzleState]);

  // Timer counter for active gameplay
  useEffect(() => {
    if (showVictoryModal) return;
    const interval = setInterval(() => {
      setTimeSpentSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showVictoryModal]);

  // Active Row Reference
  const activeRow = useMemo(() => {
    return activePuzzle.rows.find((r) => r.id === activeRowId) || activePuzzle.rows[0];
  }, [activePuzzle, activeRowId]);

  const activeRowIndex = useMemo(() => {
    return activePuzzle.rows.findIndex((r) => r.id === activeRowId);
  }, [activePuzzle, activeRowId]);

  // Current string typed for active row
  const currentWordInput = useMemo(() => {
    if (!activeRow) return '';
    let str = '';
    for (let c = 0; c < activeRow.word.length; c++) {
      const state = cellStates[`${activeRow.id}-${c}`];
      str += state?.value || ' ';
    }
    return str.trimEnd();
  }, [activeRow, cellStates]);

  // Check if all horizontal rows are solved
  const checkOverallVictory = useCallback((
    updatedSolvedRowIds: number[],
    updatedSecretSolved: boolean
  ) => {
    if (
      updatedSolvedRowIds.length === activePuzzle.rows.length ||
      updatedSecretSolved
    ) {
      soundFx.playVictory();
      setShowVictoryModal(true);

      // Save user progress
      const newScore = score + (updatedSecretSolved ? 100 : 50);
      const updatedScores = {
        ...progress.puzzleScores,
        [activePuzzle.id]: Math.max(progress.puzzleScores[activePuzzle.id] || 0, newScore),
      };

      const updatedCompleted = Array.from(
        new Set([...progress.completedPuzzleIds, activePuzzle.id])
      );

      const newProgress: UserProgress = {
        ...progress,
        completedPuzzleIds: updatedCompleted,
        puzzleScores: updatedScores,
        totalSolvedWords: progress.totalWordsSolved + updatedSolvedRowIds.length,
      };

      setProgress(newProgress);
      saveUserProgress(newProgress);
    }
  }, [activePuzzle, score, progress]);

  // Handle cell click / select
  const handleSelectCell = (rowId: number, cellIndex: number) => {
    setActiveRowId(rowId);
    setActiveCellIndex(cellIndex);
  };

  // Handle letter typing
  const handleInputChange = (rowId: number, cellIndex: number, char: string) => {
    if (solvedRowIds.includes(rowId)) return; // Lock if already correct

    const cleanChar = char.toUpperCase().replace(/[^A-Z]/g, '');
    soundFx.playKey();

    setCellStates((prev) => ({
      ...prev,
      [`${rowId}-${cellIndex}`]: { value: cleanChar, isError: false },
    }));

    // Auto-advance focus to next cell
    const targetRow = activePuzzle.rows.find((r) => r.id === rowId);
    if (cleanChar && targetRow && cellIndex < targetRow.word.length - 1) {
      setActiveCellIndex(cellIndex + 1);
    }
  };

  // Handle Keyboard Nav (Arrow keys, Backspace, Enter)
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowId: number,
    cellIndex: number
  ) => {
    const targetRow = activePuzzle.rows.find((r) => r.id === rowId);
    if (!targetRow) return;

    if (e.key === 'ArrowRight') {
      if (cellIndex < targetRow.word.length - 1) {
        setActiveCellIndex(cellIndex + 1);
      }
    } else if (e.key === 'ArrowLeft') {
      if (cellIndex > 0) {
        setActiveCellIndex(cellIndex - 1);
      }
    } else if (e.key === 'ArrowDown') {
      const nextIdx = Math.min(activeRowIndex + 1, activePuzzle.rows.length - 1);
      const nextRow = activePuzzle.rows[nextIdx];
      setActiveRowId(nextRow.id);
      setActiveCellIndex(Math.min(cellIndex, nextRow.word.length - 1));
    } else if (e.key === 'ArrowUp') {
      const prevIdx = Math.max(activeRowIndex - 1, 0);
      const prevRow = activePuzzle.rows[prevIdx];
      setActiveRowId(prevRow.id);
      setActiveCellIndex(Math.min(cellIndex, prevRow.word.length - 1));
    } else if (e.key === 'Backspace') {
      const key = `${rowId}-${cellIndex}`;
      const currentVal = cellStates[key]?.value;

      if (!currentVal && cellIndex > 0) {
        // Move back and clear previous
        setActiveCellIndex(cellIndex - 1);
        setCellStates((prev) => ({
          ...prev,
          [`${rowId}-${cellIndex - 1}`]: { value: '', isError: false },
        }));
      } else {
        setCellStates((prev) => ({
          ...prev,
          [key]: { value: '', isError: false },
        }));
      }
    } else if (e.key === 'Enter') {
      handleCheckRowAnswer();
    }
  };

  // Check Active Row Answer
  const handleCheckRowAnswer = () => {
    if (!activeRow || solvedRowIds.includes(activeRow.id)) return;

    let typedWord = '';
    for (let c = 0; c < activeRow.word.length; c++) {
      typedWord += cellStates[`${activeRow.id}-${c}`]?.value || '';
    }

    if (typedWord === activeRow.word) {
      // Correct!
      soundFx.playCorrect();
      soundFx.speakWord(activeRow.word);

      const updatedSolved = [...solvedRowIds, activeRow.id];
      setSolvedRowIds(updatedSolved);
      setScore((prev) => prev + 50);

      // Update cells state to correct
      setCellStates((prev) => {
        const updated = { ...prev };
        for (let c = 0; c < activeRow.word.length; c++) {
          updated[`${activeRow.id}-${c}`] = {
            value: activeRow.word[c],
            isCorrect: true,
          };
        }
        return updated;
      });

      // Advance to next unsolved row if available
      const nextUnsolvedRow = activePuzzle.rows.find((r) => !updatedSolved.includes(r.id));
      if (nextUnsolvedRow) {
        setActiveRowId(nextUnsolvedRow.id);
        setActiveCellIndex(0);
      }

      checkOverallVictory(updatedSolved, isSecretKeywordSolved);
    } else {
      // Wrong
      soundFx.playWrong();
      setCellStates((prev) => {
        const updated = { ...prev };
        for (let c = 0; c < activeRow.word.length; c++) {
          const key = `${activeRow.id}-${c}`;
          updated[key] = {
            ...updated[key],
            isError: true,
          };
        }
        return updated;
      });

      // Clear error shake after 800ms
      setTimeout(() => {
        setCellStates((prev) => {
          const updated = { ...prev };
          for (let c = 0; c < activeRow.word.length; c++) {
            const key = `${activeRow.id}-${c}`;
            if (updated[key]?.isError) {
              updated[key] = {
                ...updated[key],
                isError: false,
              };
            }
          }
          return updated;
        });
      }, 800);
    }
  };

  // Quick submit answer
  const handleQuickSubmitAnswer = (word: string) => {
    if (!activeRow) return;
    const clean = word.toUpperCase();

    // Populate cell states
    const updatedCells = { ...cellStates };
    for (let c = 0; c < activeRow.word.length; c++) {
      updatedCells[`${activeRow.id}-${c}`] = {
        value: clean[c] || '',
      };
    }
    setCellStates(updatedCells);

    if (clean === activeRow.word) {
      soundFx.playCorrect();
      soundFx.speakWord(activeRow.word);

      const updatedSolved = [...solvedRowIds, activeRow.id];
      setSolvedRowIds(updatedSolved);
      setScore((prev) => prev + 50);

      for (let c = 0; c < activeRow.word.length; c++) {
        updatedCells[`${activeRow.id}-${c}`] = {
          value: activeRow.word[c],
          isCorrect: true,
        };
      }
      setCellStates(updatedCells);

      const nextUnsolved = activePuzzle.rows.find((r) => !updatedSolved.includes(r.id));
      if (nextUnsolved) {
        setActiveRowId(nextUnsolved.id);
        setActiveCellIndex(0);
      }

      checkOverallVictory(updatedSolved, isSecretKeywordSolved);
    } else {
      soundFx.playWrong();
    }
  };

  // Give 1 letter hint
  const handleGiveHint = () => {
    if (!activeRow || solvedRowIds.includes(activeRow.id)) return;

    // Find first empty or wrong cell in active row
    let targetIndex = -1;
    for (let c = 0; c < activeRow.word.length; c++) {
      const state = cellStates[`${activeRow.id}-${c}`];
      if (!state || state.value !== activeRow.word[c]) {
        targetIndex = c;
        break;
      }
    }

    if (targetIndex !== -1) {
      soundFx.playHint();
      const hintChar = activeRow.word[targetIndex];

      setCellStates((prev) => ({
        ...prev,
        [`${activeRow.id}-${targetIndex}`]: {
          value: hintChar,
          isRevealed: true,
        },
      }));

      setScore((prev) => Math.max(0, prev - 5));
    }
  };

  // Clear current row
  const handleClearRow = () => {
    if (solvedRowIds.includes(activeRow.id)) return;
    setCellStates((prev) => {
      const updated = { ...prev };
      for (let c = 0; c < activeRow.word.length; c++) {
        updated[`${activeRow.id}-${c}`] = { value: '' };
      }
      return updated;
    });
    setActiveCellIndex(0);
  };

  // Guess Secret Keyword Directly
  const handleUnlockKeywordGuess = (guess: string): boolean => {
    if (guess.trim().toUpperCase() === activePuzzle.secretKeyword) {
      soundFx.playVictory();
      setIsSecretKeywordSolved(true);
      setScore((prev) => prev + 100);

      // Mark all key letters solved
      setRevealedKeyLetters(activePuzzle.rows.map((r) => r.id));

      checkOverallVictory(solvedRowIds, true);
      return true;
    } else {
      soundFx.playWrong();
      return false;
    }
  };

  // Reveal all answers
  const handleRevealAll = () => {
    soundFx.playCorrect();
    setIsSecretKeywordSolved(true);

    const allSolved = activePuzzle.rows.map((r) => r.id);
    setSolvedRowIds(allSolved);

    const updatedCells: Record<string, CellState> = {};
    activePuzzle.rows.forEach((row) => {
      for (let c = 0; c < row.word.length; c++) {
        updatedCells[`${row.id}-${c}`] = {
          value: row.word[c],
          isCorrect: true,
        };
      }
    });
    setCellStates(updatedCells);
  };

  // Key Letters solved progress for Secret Keyword Card
  const keyLettersSolved = useMemo(() => {
    return activePuzzle.rows.map((row) => {
      const cellKey = `${row.id}-${row.keyLetterIndex}`;
      const state = cellStates[cellKey];
      if (
        isSecretKeywordSolved ||
        state?.isCorrect ||
        revealedKeyLetters.includes(row.id) ||
        (state?.value && state.value === row.word[row.keyLetterIndex])
      ) {
        return row.word[row.keyLetterIndex];
      }
      return '?';
    });
  }, [activePuzzle, cellStates, isSecretKeywordSolved, revealedKeyLetters]);

  // Save new Custom Puzzle
  const handleSaveCustomPuzzle = (newPuzzle: CrosswordPuzzle) => {
    saveCustomPuzzle(newPuzzle);
    setCustomPuzzles(getCustomPuzzles());
    setCurrentGrade('Custom');
    setActivePuzzleIndex(0);
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Quicksand',sans-serif] selection:bg-teal-500 selection:text-white">
      {/* Header */}
      <Header
        currentGrade={currentGrade}
        onSelectGrade={(g) => {
          setCurrentGrade(g);
          setActivePuzzleIndex(0);
        }}
        gameMode={gameMode}
        onSelectMode={setGameMode}
        soundMuted={soundMuted}
        onToggleSound={() => {
          const next = !soundMuted;
          setSoundMuted(next);
          soundFx.setMuted(next);
        }}
        score={score}
        totalSolved={solvedRowIds.length}
        onOpenCreateModal={() => setShowCreateModal(true)}
        onOpenQRModal={() => setShowQRModal(true)}
        onOpenHowToPlayModal={() => setShowHowToPlayModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-5">
        {/* Topic Title & Topic Carousel Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-0.5">
              <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                {activePuzzle.gradeLabel}
              </span>
              <span>Chủ đề: {activePuzzle.topic}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>{activePuzzle.title}</span>
            </h2>
          </div>

          {/* Puzzle Navigation Carousel */}
          {gradePuzzles.length > 1 && (
            <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200 text-xs shrink-0">
              <button
                onClick={() => setActivePuzzleIndex((prev) => Math.max(0, prev - 1))}
                disabled={activePuzzleIndex === 0}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                title="Bài trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-bold text-slate-700 px-2">
                Bài {activePuzzleIndex + 1} / {gradePuzzles.length}
              </span>

              <button
                onClick={() => setActivePuzzleIndex((prev) => Math.min(gradePuzzles.length - 1, prev + 1))}
                disabled={activePuzzleIndex === gradePuzzles.length - 1}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                title="Bài tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Timed Mode Banner if enabled */}
        {gameMode === 'timed' && (
          <TimerBar
            durationSeconds={30}
            isActive={!showVictoryModal}
            onTimeUp={() => {
              handleCheckRowAnswer();
            }}
            onReset={() => {
              initPuzzleState(activePuzzle);
            }}
          />
        )}

        {/* Main Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left / Top Section: Crossword Grid & Secret Keyword Card (Cols 7) */}
          <div className="lg:col-span-7 space-y-5">
            <CrosswordGrid
              puzzle={activePuzzle}
              cellStates={cellStates}
              activeRowId={activeRowId}
              activeCellIndex={activeCellIndex}
              solvedRowIds={solvedRowIds}
              revealedKeyLetters={revealedKeyLetters}
              onSelectCell={handleSelectCell}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              isSecretKeywordSolved={isSecretKeywordSolved}
            />

            <SecretKeywordCard
              secretKeyword={activePuzzle.secretKeyword}
              clueVi={activePuzzle.secretKeywordClueVi}
              clueEn={activePuzzle.secretKeywordClueEn}
              keyLettersSolved={keyLettersSolved}
              isUnlocked={isSecretKeywordSolved}
              onUnlockKeywordGuess={handleUnlockKeywordGuess}
              onRevealAll={handleRevealAll}
            />
          </div>

          {/* Right / Bottom Section: Clue Panel & Quick Actions (Cols 5) */}
          <div className="lg:col-span-5 space-y-5 h-full">
            <CluePanel
              activeRow={activeRow}
              activeRowIndex={activeRowIndex}
              totalRows={activePuzzle.rows.length}
              currentWordInput={currentWordInput}
              isRowSolved={solvedRowIds.includes(activeRow.id)}
              onCheckRowAnswer={handleCheckRowAnswer}
              onQuickSubmitAnswer={handleQuickSubmitAnswer}
              onGiveHint={handleGiveHint}
              onClearRow={handleClearRow}
              onNextRow={() => {
                const nextIdx = (activeRowIndex + 1) % activePuzzle.rows.length;
                setActiveRowId(activePuzzle.rows[nextIdx].id);
                setActiveCellIndex(0);
              }}
              onPrevRow={() => {
                const prevIdx = (activeRowIndex - 1 + activePuzzle.rows.length) % activePuzzle.rows.length;
                setActiveRowId(activePuzzle.rows[prevIdx].id);
                setActiveCellIndex(0);
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 Giải Mã Ô Chữ Tiếng Anh • Thiết kế hỗ trợ học tập THCS Lớp 6-9
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHowToPlayModal(true)}
              className="hover:text-teal-700 hover:underline cursor-pointer"
            >
              Hướng dẫn
            </button>
            <span>•</span>
            <button
              onClick={() => setShowQRModal(true)}
              className="hover:text-teal-700 hover:underline cursor-pointer"
            >
              Mã QR Dạy học
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showVictoryModal && (
        <VictoryModal
          puzzle={activePuzzle}
          score={score}
          timeSpentSeconds={timeSpentSeconds}
          onClose={() => setShowVictoryModal(false)}
          onNextPuzzle={() => {
            setShowVictoryModal(false);
            if (activePuzzleIndex < gradePuzzles.length - 1) {
              setActivePuzzleIndex((prev) => prev + 1);
            } else {
              // Loop to next grade
              const gradeOrder: GradeLevel[] = ['Grade6', 'Grade7', 'Grade8', 'Grade9'];
              const currIdx = gradeOrder.indexOf(currentGrade);
              if (currIdx !== -1 && currIdx < gradeOrder.length - 1) {
                setCurrentGrade(gradeOrder[currIdx + 1]);
                setActivePuzzleIndex(0);
              } else {
                initPuzzleState(activePuzzle);
              }
            }
          }}
          onReplay={() => {
            initPuzzleState(activePuzzle);
          }}
        />
      )}

      {showCreateModal && (
        <CustomPuzzleModal
          onSave={handleSaveCustomPuzzle}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {showQRModal && (
        <QRCodeModal onClose={() => setShowQRModal(false)} />
      )}

      {showHowToPlayModal && (
        <HowToPlayModal onClose={() => setShowHowToPlayModal(false)} />
      )}
    </div>
  );
}
