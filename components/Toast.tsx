import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  subMessage?: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, subMessage, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div aria-live="polite" className="fixed bottom-6 right-6 bg-surface-dark border border-white/10 shadow-2xl rounded-lg p-3 flex items-center gap-3 animate-slide-in z-50 max-w-sm ring-1 ring-primary/20">
      <div className="bg-primary/20 p-1.5 rounded-full shrink-0">
        <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
      </div>
      <div>
        <p className="text-white text-sm font-bold">{message}</p>
        {subMessage && <p className="text-text-secondary text-xs">{subMessage}</p>}
      </div>
      <button aria-label="Dismiss" className="ml-2 text-text-secondary hover:text-white rounded focus:ring-2 focus:ring-primary p-1 hover:bg-white/5 transition-colors" onClick={onClose}>
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};

export default Toast;