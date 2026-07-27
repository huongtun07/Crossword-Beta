import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Smartphone, Users } from 'lucide-react';

interface QRCodeModalProps {
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://aistudio.google.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Generate clean QR code URL via free open API
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center mb-3">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-800">Quét Mã QR Lớp Học</h3>
        <p className="text-xs text-slate-500 mt-1">
          Học sinh có thể mở camera điện thoại quét mã QR để bắt đầu chơi trò chơi ngay lập tức!
        </p>

        {/* QR Code Image */}
        <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 inline-block shadow-inner">
          <img
            src={qrImageUrl}
            alt="Mã QR Ô Chữ Tiếng Anh"
            className="w-44 h-44 mx-auto rounded-lg"
          />
        </div>

        {/* Copy Link */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <span className="text-slate-600 truncate flex-1 font-mono text-[11px] text-left">
              {currentUrl}
            </span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-teal-600" />
            <span>Tối ưu Mobile</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>Thích hợp dạy trên lớp</span>
          </div>
        </div>
      </div>
    </div>
  );
};
