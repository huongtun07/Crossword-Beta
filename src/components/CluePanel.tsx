import React, { useState, useEffect } from 'react';
import { CrosswordRow } from '../types';
import { 
  Volume2, 
  CheckCircle2, 
  Lightbulb, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  Send,
  HelpCircle
} from 'lucide-react';
import { soundFx } from '../utils/sound';

interface CluePanelProps {
  activeRow: CrosswordRow;
  activeRowIndex: number; // 0-based index
  totalRows: number;
  currentWordInput: string;
  isRowSolved: boolean;
  onCheckRowAnswer: () => void;
  onQuickSubmitAnswer: (word: string) => void;
  onGiveHint: () => void;
  onClearRow: () => void;
  onNextRow: () => void;
  onPrevRow: () => void;
}

export const CluePanel: React.FC<CluePanelProps> = ({
  activeRow,
  activeRowIndex,
  totalRows,
  currentWordInput,
  isRowSolved,
  onCheckRowAnswer,
  onQuickSubmitAnswer,
  onGiveHint,
  onClearRow,
  onNextRow,
  onPrevRow,
}) => {
  const [quickInput, setQuickInput] = useState('');

  useEffect(() => {
    setQuickInput(currentWordInput);
  }, [currentWordInput, activeRow.id]);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onQuickSubmitAnswer(quickInput.trim().toUpperCase());
    }
  };

  const handleSpeak = () => {
    soundFx.speakWord(activeRow.word);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-full">
      {/* Top Clue Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
              {activeRowIndex + 1}
            </span>
            <span className="font-bold text-slate-800 text-sm sm:text-base">
              Gợi ý Hàng {activeRowIndex + 1} / {totalRows}
            </span>
          </div>

          {/* Previous / Next Row Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={onPrevRow}
              disabled={activeRowIndex === 0}
              className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              Trước
            </button>
            <button
              onClick={onNextRow}
              disabled={activeRowIndex === totalRows - 1}
              className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
            >
              Sau
            </button>
          </div>
        </div>

        {/* Clue Details */}
        <div className="mt-4 space-y-3">
          {/* Main Vietnamese Clue */}
          <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-100/80">
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              <span>Câu hỏi gợi ý (Tiếng Việt)</span>
            </div>
            <p className="text-slate-800 font-bold text-sm sm:text-base leading-relaxed">
              {activeRow.clueVi}
            </p>
          </div>

          {/* Grammar & Example Sentence */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-700">
                Từ loại: {activeRow.partOfSpeech || 'Danh từ'}
              </span>
              {activeRow.ipa && (
                <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-mono font-medium">
                  {activeRow.ipa}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold">
                Độ dài: {activeRow.word.length} chữ cái
              </span>
            </div>

            {/* Example Sentence with Blank */}
            {activeRow.exampleSentence && (
              <div className="text-xs sm:text-sm text-slate-600 font-medium italic pt-1 border-t border-slate-200/60">
                &ldquo;{activeRow.exampleSentence}&rdquo;
              </div>
            )}
          </div>

          {/* Pronunciation audio TTS button */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs">
            <span className="text-slate-600 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Luyện phát âm từ Tiếng Anh:
            </span>
            <button
              onClick={handleSpeak}
              className="px-3 py-1 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Đọc từ 🔊</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Word Answer Input Form */}
      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
        <form onSubmit={handleQuickSubmit} className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Nhập nhanh nguyên từ (Option):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value.toUpperCase())}
              placeholder={`Nhập ${activeRow.word.length} chữ cái...`}
              maxLength={activeRow.word.length + 2}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-slate-800 font-bold uppercase tracking-wider text-sm transition-all focus:outline-none"
              disabled={isRowSolved}
            />
            <button
              type="submit"
              disabled={isRowSolved || !quickInput.trim()}
              className="px-3 py-2 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 disabled:opacity-50 transition-colors flex items-center gap-1 text-xs shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi</span>
            </button>
          </div>
        </form>

        {/* Main Control Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={onCheckRowAnswer}
            disabled={isRowSolved}
            className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm shadow-teal-600/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Kiểm tra đáp án</span>
          </button>

          <button
            onClick={onGiveHint}
            disabled={isRowSolved}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm transition-all shadow-sm shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Lightbulb className="w-4 h-4 text-amber-100 fill-amber-200" />
            <span>Gợi ý 1 chữ (-5đ)</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <button
            onClick={onClearRow}
            disabled={isRowSolved}
            className="text-slate-500 hover:text-slate-700 flex items-center gap-1 font-medium cursor-pointer disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa làm lại hàng này</span>
          </button>

          <button
            onClick={onNextRow}
            className="text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Hàng tiếp theo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
