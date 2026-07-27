import React, { useEffect, useState } from 'react';
import { Clock, Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface TimerBarProps {
  durationSeconds?: number; // default 30s
  isActive: boolean;
  onTimeUp: () => void;
  onReset: () => void;
}

export const TimerBar: React.FC<TimerBarProps> = ({
  durationSeconds = 30,
  isActive,
  onTimeUp,
  onReset,
}) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeLeft(durationSeconds);
    setIsPaused(false);
  }, [durationSeconds]);

  useEffect(() => {
    if (!isActive || isPaused) return;

    if (timeLeft <= 0) {
      soundFx.playWrong();
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 10 && next > 0) {
          soundFx.playTick();
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isPaused, timeLeft, onTimeUp]);

  const percentage = Math.max(0, (timeLeft / durationSeconds) * 100);
  const isUrgent = timeLeft <= 10;

  const handleReset = () => {
    setTimeLeft(durationSeconds);
    setIsPaused(false);
    onReset();
  };

  return (
    <div className={`p-3.5 rounded-2xl border transition-all duration-300 ${
      isUrgent
        ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/20'
        : 'bg-amber-50/80 border-amber-200'
    }`}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isUrgent ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-500 text-white'}`}>
            {isUrgent ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          </div>
          <div>
            <span className="text-xs font-bold text-slate-700 block">Thử thách 30 giây</span>
            <span className={`text-sm font-black ${isUrgent ? 'text-rose-600 animate-pulse' : 'text-amber-700'}`}>
              {timeLeft}s còn lại
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            title="Đếm lại"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            isUrgent ? 'bg-rose-500' : 'bg-amber-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
