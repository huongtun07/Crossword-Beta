import React, { useState } from 'react';
import { CrosswordPuzzle, CrosswordRow, GradeLevel } from '../types';
import { X, Plus, Trash2, CheckCircle2, AlertCircle, Sparkles, Key } from 'lucide-react';

interface CustomPuzzleModalProps {
  onSave: (puzzle: CrosswordPuzzle) => void;
  onClose: () => void;
}

export const CustomPuzzleModal: React.FC<CustomPuzzleModalProps> = ({
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('Grade6');
  const [topic, setTopic] = useState('');
  const [secretKeyword, setSecretKeyword] = useState('ENGLISH');
  const [secretKeywordClueVi, setSecretKeywordClueVi] = useState('Môn Ngoại ngữ quốc tế (7 chữ cái)');

  const [rows, setRows] = useState<Array<{
    word: string;
    keyLetterIndex: number;
    clueVi: string;
  }>>([
    { word: 'ENVIRONMENT', keyLetterIndex: 0, clueVi: 'Môi trường sống xung quanh con người.' },
    { word: 'NEIGHBOR', keyLetterIndex: 0, clueVi: 'Hàng xóm sống cạnh nhà bạn.' },
    { word: 'GLOBAL', keyLetterIndex: 0, clueVi: 'Mang tính toàn cầu.' },
    { word: 'LIBRARY', keyLetterIndex: 0, clueVi: 'Thư viện trường học có nhiều sách.' },
    { word: 'INTERNET', keyLetterIndex: 0, clueVi: 'Mạng máy tính toàn cầu kết nối tri thức.' },
    { word: 'SUBJECT', keyLetterIndex: 0, clueVi: 'Môn học ở trường.' },
    { word: 'HISTORY', keyLetterIndex: 0, clueVi: 'Môn Lịch sử học về quá khứ.' },
  ]);

  const [errorMsg, setErrorMsg] = useState('');

  const handleAddRow = () => {
    setRows([
      ...rows,
      { word: '', keyLetterIndex: 0, clueVi: '' }
    ]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length <= 3) {
      setErrorMsg('Ô chữ cần tối thiểu 3 từ hàng ngang!');
      return;
    }
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index: number, field: string, val: unknown) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: val };
    setRows(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập Tên bài ô chữ!');
      return;
    }
    if (!secretKeyword.trim()) {
      setErrorMsg('Vui lòng nhập Từ khóa bí mật hàng dọc!');
      return;
    }

    const cleanSecret = secretKeyword.trim().toUpperCase();

    // Validate rows
    const formattedRows: CrosswordRow[] = [];
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const cleanWord = r.word.trim().toUpperCase();
      if (!cleanWord) {
        setErrorMsg(`Hàng ${i + 1} chưa nhập từ Tiếng Anh!`);
        return;
      }
      if (!r.clueVi.trim()) {
        setErrorMsg(`Hàng ${i + 1} chưa nhập Gợi ý Tiếng Việt!`);
        return;
      }
      if (r.keyLetterIndex < 0 || r.keyLetterIndex >= cleanWord.length) {
        setErrorMsg(`Vị trí chữ khóa của Hàng ${i + 1} không hợp lệ!`);
        return;
      }

      formattedRows.push({
        id: i + 1,
        word: cleanWord,
        keyLetterIndex: r.keyLetterIndex,
        clueVi: r.clueVi.trim(),
        partOfSpeech: 'Danh từ',
      });
    }

    const newPuzzle: CrosswordPuzzle = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      grade,
      gradeLabel: grade === 'Custom' ? 'Tự Tạo' : grade.replace('Grade', 'Lớp '),
      topic: topic.trim() || 'Đề tự thiết kế',
      description: 'Bài ô chữ do giáo viên / học sinh tự sáng tạo.',
      secretKeyword: cleanSecret,
      secretKeywordClueVi: secretKeywordClueVi.trim() || 'Từ khóa bí mật hàng dọc',
      rows: formattedRows,
    };

    onSave(newPuzzle);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Tạo Ô Chữ Mới (Dành cho Giáo viên & Học sinh)</h2>
            <p className="text-xs text-slate-500">Tự thiết kế bộ ô chữ Tiếng Anh riêng cho lớp học</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* General Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tên bài ô chữ *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Ô chữ Lớp 6 - Unit 1 Vocabulary"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 text-sm focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Khối lớp</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as GradeLevel)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 text-sm focus:outline-none"
              >
                <option value="Grade6">Lớp 6</option>
                <option value="Grade7">Lớp 7</option>
                <option value="Grade8">Lớp 8</option>
                <option value="Grade9">Lớp 9</option>
                <option value="Custom">Tự tạo khác</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Từ khóa hàng dọc (Secret Keyword) *</label>
              <input
                type="text"
                value={secretKeyword}
                onChange={(e) => setSecretKeyword(e.target.value.toUpperCase())}
                placeholder="VD: ENGLISH"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 font-bold uppercase text-sm focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gợi ý Từ khóa hàng dọc</label>
              <input
                type="text"
                value={secretKeywordClueVi}
                onChange={(e) => setSecretKeywordClueVi(e.target.value)}
                placeholder="VD: Môn học ngoại ngữ phổ biến..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-teal-500 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Horizontal Rows List */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-500" />
                <span>Danh sách các từ hàng ngang ({rows.length} từ):</span>
              </h3>
              <button
                type="button"
                onClick={handleAddRow}
                className="px-3 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 font-bold text-xs hover:bg-teal-100 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm hàng</span>
              </button>
            </div>

            <div className="space-y-3">
              {rows.map((row, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Hàng {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1 rounded-md hover:bg-rose-50 transition-colors"
                      title="Xóa hàng"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={row.word}
                        onChange={(e) => handleRowChange(idx, 'word', e.target.value.toUpperCase())}
                        placeholder="Từ Tiếng Anh (VD: TEACHER)"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-teal-500 font-bold uppercase text-xs focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <select
                        value={row.keyLetterIndex}
                        onChange={(e) => handleRowChange(idx, 'keyLetterIndex', parseInt(e.target.value))}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-300 focus:border-teal-500 text-xs focus:outline-none font-semibold"
                      >
                        {row.word ? (
                          row.word.split('').map((char, cIdx) => (
                            <option key={cIdx} value={cIdx}>
                              Chữ khóa: {char} (Vị trí {cIdx + 1})
                            </option>
                          ))
                        ) : (
                          <option value={0}>Vị trí chữ khóa: 1</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={row.clueVi}
                      onChange={(e) => handleRowChange(idx, 'clueVi', e.target.value)}
                      placeholder="Gợi ý Tiếng Việt (VD: Người dạy học ở trường)"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-teal-500 text-xs focus:outline-none"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Lưu và Chơi Ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
