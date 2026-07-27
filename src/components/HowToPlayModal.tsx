import React from 'react';
import { X, BookOpen, Key, Clock, Lightbulb, CheckCircle2, Sparkles } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center mb-2">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Hướng Dẫn Chơi Giải Mã Ô Chữ</h3>
          <p className="text-xs text-slate-500">Mẹo và luật chơi dành cho học sinh THCS</p>
        </div>

        <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="p-2 rounded-xl bg-teal-600 text-white font-bold shrink-0">1</div>
            <div>
              <strong className="text-slate-900 block font-bold">Giải các hàng ngang:</strong>
              Nhấp vào ô chữ để điền từng chữ cái Tiếng Anh hoặc gõ nhanh nguyên từ vào ô &quot;Nhập nhanh&quot;.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-900 font-bold shrink-0">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 block font-bold">Tìm Từ Khóa Hàng Dọc:</strong>
              Các ô màu vàng có biểu tượng chìa khóa ở mỗi hàng ngang sẽ ghép lại thành <strong className="text-amber-700">Từ Khóa Bí Mật Hàng Dọc</strong>!
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800 font-bold shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 block font-bold">Sử dụng Gợi Ý & Đọc Từ:</strong>
              Bấm nút &quot;Gợi ý 1 chữ&quot; nếu gặp từ khó, hoặc bấm &quot;Đọc từ 🔊&quot; để luyện phát âm chuẩn giọng Mỹ.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 font-bold shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-slate-900 block font-bold">Chế độ 30s Thử Thách:</strong>
              Bật chế độ đếm ngược 30 giây để tăng tính hấp dẫn và nhận thêm điểm thưởng tốc độ!
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Đã Hiểu - Bắt Đầu Chơi!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
