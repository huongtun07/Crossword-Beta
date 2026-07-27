import React, { useEffect, useRef } from 'react';
import { CrosswordPuzzle, CellState } from '../types';
import { Key, CheckCircle, HelpCircle, Sparkles } from 'lucide-react';

interface CrosswordGridProps {
  puzzle: CrosswordPuzzle;
  cellStates: Record<string, CellState>; // key: `${rowId}-${colIndex}`
  activeRowId: number;
  activeCellIndex: number;
  solvedRowIds: number[];
  revealedKeyLetters: number[]; // rowIds whose key letter is revealed
  onSelectCell: (rowId: number, cellIndex: number) => void;
  onInputChange: (rowId: number, cellIndex: number, char: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, rowId: number, cellIndex: number) => void;
  isSecretKeywordSolved: boolean;
}

export const CrosswordGrid: React.FC<CrosswordGridProps> = ({
  puzzle,
  cellStates,
  activeRowId,
  activeCellIndex,
  solvedRowIds,
  revealedKeyLetters,
  onSelectCell,
  onInputChange,
  onKeyDown,
  isSecretKeywordSolved,
}) => {
  // Compute max keyLetterIndex to determine aligned key column index
  const maxKeyIndex = Math.max(...puzzle.rows.map((r) => r.keyLetterIndex), 0);
  const keyColumnIndex = maxKeyIndex; // Align all key letters to this column

  // Calculate total columns needed across all rows
  const totalColumns = Math.max(
    ...puzzle.rows.map((r) => keyColumnIndex - r.keyLetterIndex + r.word.length),
    keyColumnIndex + 1
  );

  // Focus ref map for smooth keyboard navigation
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    // Focus the active cell input
    const key = `${activeRowId}-${activeCellIndex}`;
    const el = inputRefs.current[key];
    if (el) {
      el.focus();
    }
  }, [activeRowId, activeCellIndex]);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
      {/* Grid Title & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>Bảng Ô Chữ Hàng Ngang</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200">
              {puzzle.rows.length} hàng
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Nhấp vào ô để điền chữ cái hoặc chọn hàng để xem gợi ý.
          </p>
        </div>

        {/* Color Legend */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-xs bg-amber-400 border border-amber-500 inline-block shadow-2xs"></span>
            <span>Từ khóa hàng dọc</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-xs bg-emerald-500 border border-emerald-600 inline-block shadow-2xs"></span>
            <span>Đúng</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-xs bg-rose-500 border border-rose-600 inline-block shadow-2xs"></span>
            <span>Chưa đúng</span>
          </div>
        </div>
      </div>

      {/* Crossword Rows Container with horizontal scroll for smaller mobile screens */}
      <div className="overflow-x-auto pb-4 pt-1 px-1 no-scrollbar">
        <div className="flex flex-col gap-2.5 min-w-max mx-auto">
          {puzzle.rows.map((row, rowIndex) => {
            const startOffset = keyColumnIndex - row.keyLetterIndex;
            const isRowActive = activeRowId === row.id;
            const isRowSolved = solvedRowIds.includes(row.id);

            return (
              <div
                key={row.id}
                onClick={() => onSelectCell(row.id, Math.min(activeCellIndex, row.word.length - 1))}
                className={`flex items-center gap-2 p-1.5 rounded-xl transition-all ${
                  isRowActive
                    ? 'bg-teal-50/80 ring-2 ring-teal-500/30 border border-teal-200'
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                {/* Row Number Badge & Status */}
                <div className="w-16 sm:w-20 shrink-0 flex items-center justify-between pr-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCell(row.id, 0);
                    }}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      isRowSolved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isRowActive
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span>Hàng {rowIndex + 1}</span>
                  </button>

                  {isRowSolved && (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                </div>

                {/* Grid Cells with Indentation Offset */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {/* Empty Offset Boxes for alignment */}
                  {Array.from({ length: startOffset }).map((_, emptyIdx) => (
                    <div
                      key={`empty-${emptyIdx}`}
                      className="w-8 h-8 sm:w-10 sm:h-10 invisible"
                    />
                  ))}

                  {/* Letters Cells */}
                  {row.word.split('').map((targetChar, cellIndex) => {
                    const cellKey = `${row.id}-${cellIndex}`;
                    const state = cellStates[cellKey] || { value: '' };
                    const isKeyCell = cellIndex === row.keyLetterIndex;
                    const isActiveCell = isRowActive && activeCellIndex === cellIndex;
                    const isKeyRevealed = revealedKeyLetters.includes(row.id);

                    // Dynamic Styling
                    let bgStyle = 'bg-white text-slate-800 border-slate-300 hover:border-slate-400';
                    if (state.isCorrect) {
                      bgStyle = 'bg-emerald-500 text-white border-emerald-600 font-extrabold shadow-xs';
                    } else if (state.isError) {
                      bgStyle = 'bg-rose-500 text-white border-rose-600 font-extrabold animate-shake';
                    } else if (isKeyCell) {
                      if (isSecretKeywordSolved || isKeyRevealed) {
                        bgStyle = 'bg-amber-400 text-slate-900 border-amber-500 font-extrabold ring-2 ring-amber-300 shadow-xs';
                      } else {
                        bgStyle = 'bg-amber-100 text-amber-900 border-amber-400 font-bold hover:bg-amber-200/80';
                      }
                    } else if (isRowActive) {
                      bgStyle = 'bg-teal-50/50 text-slate-900 border-teal-300';
                    }

                    if (isActiveCell) {
                      bgStyle += ' ring-2 ring-teal-500 border-teal-600 z-10 scale-105 shadow-sm';
                    }

                    return (
                      <div
                        key={cellKey}
                        className="relative group shrink-0"
                      >
                        <input
                          ref={(el) => (inputRefs.current[cellKey] = el)}
                          type="text"
                          maxLength={1}
                          value={state.value}
                          onChange={(e) => onInputChange(row.id, cellIndex, e.target.value)}
                          onKeyDown={(e) => onKeyDown(e, row.id, cellIndex)}
                          onFocus={() => onSelectCell(row.id, cellIndex)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-center font-bold text-base sm:text-lg uppercase transition-all duration-150 select-none border cursor-pointer focus:outline-none ${bgStyle}`}
                          readOnly={state.isCorrect}
                        />

                        {/* Special Key Column Badge / Icon overlay */}
                        {isKeyCell && (
                          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center text-[9px] font-bold shadow-2xs pointer-events-none ring-1 ring-white">
                            <Key className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secret Keyword Vertical Hint Banner */}
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-teal-50 border border-amber-200/80 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-700">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            Gợi ý từ khóa hàng dọc:{' '}
            <strong className="text-teal-800 font-bold">{puzzle.secretKeywordClueVi}</strong>
          </span>
        </div>
        <div className="font-bold text-teal-800 px-2 py-1 rounded-md bg-white border border-teal-200 shrink-0">
          {puzzle.secretKeyword.length} chữ cái
        </div>
      </div>
    </div>
  );
};
