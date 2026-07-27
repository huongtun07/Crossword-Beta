import React from 'react';
import { GradeLevel, GameMode } from '../types';
import { 
  BookOpen, 
  Clock, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  QrCode, 
  HelpCircle, 
  Trophy,
  GraduationCap,
  Sparkles,
  Award
} from 'lucide-react';

interface HeaderProps {
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  gameMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  score: number;
  totalSolved: number;
  onOpenCreateModal: () => void;
  onOpenQRModal: () => void;
  onOpenHowToPlayModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentGrade,
  onSelectGrade,
  gameMode,
  onSelectMode,
  soundMuted,
  onToggleSound,
  score,
  totalSolved,
  onOpenCreateModal,
  onOpenQRModal,
  onOpenHowToPlayModal,
}) => {
  const grades: { id: GradeLevel; label: string; desc: string }[] = [
    { id: 'Grade6', label: 'Lớp 6', desc: 'THCS KNTT' },
    { id: 'Grade7', label: 'Lớp 7', desc: 'THCS KNTT' },
    { id: 'Grade8', label: 'Lớp 8', desc: 'THCS KNTT' },
    { id: 'Grade9', label: 'Lớp 9', desc: 'THCS KNTT' },
    { id: 'Custom', label: 'Tự Tạo ⭐', desc: 'Đề riêng' },
  ];

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top Row: App Logo & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md shadow-teal-600/20 ring-2 ring-teal-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
                  <span>Crossword Master</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold border border-teal-200">
                    THCS 6-9
                  </span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Giải mã ô chữ Tiếng Anh • Rèn luyện từ vựng mỗi ngày
                </p>
              </div>
            </div>

            {/* Mobile Sound & Help */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                onClick={onToggleSound}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                title={soundMuted ? 'Mở âm thanh' : 'Tắt âm thanh'}
              >
                {soundMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-teal-600" />}
              </button>
              <button
                onClick={onOpenHowToPlayModal}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                title="Hướng dẫn"
              >
                <HelpCircle className="w-4 h-4 text-teal-600" />
              </button>
            </div>
          </div>

          {/* Center/Right Stats & Utilities */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 sm:gap-3">
            {/* Score & Solved Counter */}
            <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-amber-600 font-bold text-sm">
                <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{score} điểm</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5 text-teal-700 font-semibold text-xs sm:text-sm">
                <Award className="w-4 h-4 text-teal-600" />
                <span>Đã giải: {totalSolved} từ</span>
              </div>
            </div>

            {/* Game Mode Selector */}
            <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => onSelectMode('practice')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  gameMode === 'practice'
                    ? 'bg-white text-teal-700 shadow-xs border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                <span>Luyện tập</span>
              </button>

              <button
                onClick={() => onSelectMode('timed')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  gameMode === 'timed'
                    ? 'bg-amber-500 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>30s Đếm ngược</span>
              </button>
            </div>

            {/* Action Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onOpenCreateModal}
                className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-teal-600" />
                <span>Tạo đề riêng</span>
              </button>

              <button
                onClick={onOpenQRModal}
                className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium text-xs flex items-center gap-1 transition-colors"
                title="Quét QR cho Học sinh"
              >
                <QrCode className="w-4 h-4 text-teal-600" />
                <span className="hidden lg:inline">QR Lớp học</span>
              </button>

              <button
                onClick={onToggleSound}
                className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                title={soundMuted ? 'Mở âm thanh' : 'Tắt âm thanh'}
              >
                {soundMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-teal-600" />}
              </button>

              <button
                onClick={onOpenHowToPlayModal}
                className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                title="Hướng dẫn chơi"
              >
                <HelpCircle className="w-4 h-4 text-teal-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Grade Selector Tabs */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {grades.map((g) => {
              const active = currentGrade === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => onSelectGrade(g.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${active ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Creator Button for mobile */}
          <button
            onClick={onOpenCreateModal}
            className="md:hidden px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center gap-1 shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Tạo đề</span>
          </button>
        </div>
      </div>
    </header>
  );
};
