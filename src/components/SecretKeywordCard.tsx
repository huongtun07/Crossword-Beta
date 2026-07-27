import React, { useState } from 'react';
import { Key, Unlock, Sparkles, Check, HelpCircle } from 'lucide-react';

interface SecretKeywordCardProps {
  secretKeyword: string;
  clueVi: string;
  clueEn?: string;
  keyLettersSolved: string[]; // List of key chars already solved (or '?' for unsolved)
  isUnlocked: boolean;
  onUnlockKeywordGuess: (guess: string) => boolean;
  onRevealAll: () => void;
}

export const SecretKeywordCard: React.FC<SecretKeywordCardProps> = ({
  secretKeyword,
  clueVi,
  clueEn,
  keyLettersSolved,
  isUnlocked,
  onUnlockKeywordGuess,
  onRevealAll,
}) => {
  const [guessInput, setGuessInput] = useState('');
  const [showGuessInput, setShowGuessInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (guessInput.trim()) {
      const isCorrect = onUnlockKeywordGuess(guessInput.trim().toUpperCase());
      if (!isCorrect) {
        setErrorMessage('Chưa đúng rồi! Hãy thử đoán lại hoặc giải thêm các hàng ngang nhé.');
      } else {
        setGuessInput('');
        setShowGuessInput(false);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden border border-teal-700/50">
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-teal-500/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-teal-800/80 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold">
            <Key className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-amber-300 flex items-center gap-1.5">
              <span>TỪ KHÓA BÍ MẬT HÀNG DỌC</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </h3>
            <p className="text-xs text-teal-200/80">
              Điền đúng các ô hàng ngang để tìm ra từ khóa này!
            </p>
          </div>
        </div>

        {isUnlocked ? (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            Đã giải mã!
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            {keyLettersSolved.filter((c) => c !== '?').length} / {secretKeyword.length} chữ
          </span>
        )}
      </div>

      {/* Letter Tiles Display */}
      <div className="my-4 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap relative z-10">
        {secretKeyword.split('').map((char, index) => {
          const isLetterSolved = keyLettersSolved[index] && keyLettersSolved[index] !== '?';
          const displayChar = isUnlocked || isLetterSolved ? char : '?';

          return (
            <div
              key={index}
              className={`w-9 h-11 sm:w-11 sm:h-13 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl transition-all duration-300 shadow-md border ${
                isUnlocked || isLetterSolved
                  ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300/50 scale-105'
                  : 'bg-slate-800/80 text-teal-300/50 border-teal-700/60'
              }`}
            >
              {displayChar}
            </div>
          );
        })}
      </div>

      {/* Clue Prompt */}
      <div className="p-3 rounded-xl bg-slate-800/70 border border-teal-800/60 text-xs sm:text-sm text-teal-100/90 leading-relaxed relative z-10">
        <span className="text-amber-300 font-bold">Gợi ý từ khóa: </span>
        {clueVi}
      </div>

      {/* Action to guess secret keyword directly */}
      {!isUnlocked && (
        <div className="mt-4 pt-3 border-t border-teal-800/80 relative z-10 space-y-2">
          {!showGuessInput ? (
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setShowGuessInput(true)}
                className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Đoán từ khóa hàng dọc (+100đ)</span>
              </button>

              <button
                onClick={onRevealAll}
                className="px-3 py-2 rounded-xl bg-teal-800/60 hover:bg-teal-700/80 text-teal-200 font-semibold text-xs transition-colors border border-teal-700 cursor-pointer"
                title="Mở toàn bộ đáp án bài này"
              >
                Hiện đáp án
              </button>
            </div>
          ) : (
            <form onSubmit={handleGuessSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={guessInput}
                  onChange={(e) => setGuessInput(e.target.value.toUpperCase())}
                  placeholder={`Nhập ${secretKeyword.length} chữ cái từ khóa...`}
                  maxLength={secretKeyword.length + 2}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-amber-400/60 focus:border-amber-400 text-amber-300 font-extrabold uppercase text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0 cursor-pointer"
                >
                  Gửi
                </button>
                <button
                  type="button"
                  onClick={() => setShowGuessInput(false)}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-xs shrink-0 cursor-pointer"
                >
                  Hủy
                </button>
              </div>

              {errorMessage && (
                <p className="text-rose-400 font-semibold text-xs animate-shake">
                  {errorMessage}
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
};
