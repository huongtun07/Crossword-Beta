import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CrosswordPuzzle } from '../types';
import { Trophy, Star, Sparkles, Volume2, ArrowRight, RotateCcw, X, BookOpen } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface VictoryModalProps {
  puzzle: CrosswordPuzzle;
  score: number;
  timeSpentSeconds: number;
  onClose: () => void;
  onNextPuzzle: () => void;
  onReplay: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  puzzle,
  score,
  timeSpentSeconds,
  onClose,
  onNextPuzzle,
  onReplay,
}) => {
  useEffect(() => {
    soundFx.playVictory();

    // Trigger confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  // Compute stars
  const stars = score >= 300 ? 3 : score >= 150 ? 2 : 1;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-teal-100 relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Victory Header */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-3 ring-8 ring-amber-50">
            <Trophy className="w-9 h-9 fill-amber-500 text-amber-600 animate-bounce" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Xuất Sắc! Giải Mã Thành Công!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Chúc mừng bạn đã hoàn thành bài ô chữ{' '}
            <strong className="text-teal-700">{puzzle.title}</strong>
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-2 my-4">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-8 h-8 ${
                  starIdx <= stars
                    ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-xs'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3 bg-teal-50/80 p-3.5 rounded-2xl border border-teal-100 my-4">
            <div>
              <span className="text-xs font-semibold text-teal-800 block">Tổng Điểm Thưởng</span>
              <span className="text-xl font-black text-teal-900">{score} điểm</span>
            </div>
            <div className="border-l border-teal-200 pl-3">
              <span className="text-xs font-semibold text-teal-800 block">Thời Gian Hoàn Thành</span>
              <span className="text-xl font-black text-teal-900">{timeSpentSeconds}s</span>
            </div>
          </div>
        </div>

        {/* Vocabulary Review List */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>Sổ tay Từ Vựng đã học bài này:</span>
          </h4>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {/* Secret Keyword First */}
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-amber-900 block text-sm">
                  ★ {puzzle.secretKeyword} (Từ khóa hàng dọc)
                </span>
                <span className="text-slate-600">{puzzle.secretKeywordClueVi}</span>
              </div>
              <button
                onClick={() => soundFx.speakWord(puzzle.secretKeyword)}
                className="p-1.5 rounded-lg bg-amber-500 text-slate-900 hover:bg-amber-600 transition-colors shrink-0"
                title="Nghe đọc"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {puzzle.rows.map((r, i) => (
              <div
                key={r.id}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-800 text-sm">
                    {i + 1}. {r.word}
                  </span>
                  <span className="text-slate-500 text-[11px] ml-2 font-mono">{r.ipa}</span>
                  <p className="text-slate-600 truncate max-w-[240px]">{r.clueVi}</p>
                </div>
                <button
                  onClick={() => soundFx.speakWord(r.word)}
                  className="p-1.5 rounded-lg bg-slate-200 hover:bg-teal-600 hover:text-white transition-colors shrink-0"
                  title="Nghe đọc"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2 pt-2">
          <button
            onClick={onReplay}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi lại</span>
          </button>

          <button
            onClick={onNextPuzzle}
            className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Bài tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
