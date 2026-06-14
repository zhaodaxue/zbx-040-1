import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useAppStore, ToastType } from '../store/useAppStore';
import { ToastMessage } from '../types';

const typeStyles: Record<ToastType, { bg: string; iconColor: string; border: string; icon: React.ReactNode }> = {
  success: {
    bg: 'bg-white',
    iconColor: 'text-green-500',
    border: 'border-l-4 border-green-500',
    icon: <CheckCircle2 className="w-5 h-5 shrink-0" />,
  },
  warn: {
    bg: 'bg-white',
    iconColor: 'text-orange-500',
    border: 'border-l-4 border-orange-500',
    icon: <AlertTriangle className="w-5 h-5 shrink-0" />,
  },
  info: {
    bg: 'bg-white',
    iconColor: 'text-primary-500',
    border: 'border-l-4 border-primary-500',
    icon: <Info className="w-5 h-5 shrink-0" />,
  },
};

const ToastItem: React.FC<{ toast: ToastMessage }> = ({ toast }) => {
  const dismissToast = useAppStore((s) => s.dismissToast);
  const style = typeStyles[toast.type] || typeStyles.info;

  return (
    <div
      className={`
        flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border border-gray-100
        animate-slide-in-right min-w-[260px] max-w-sm ${style.bg} ${style.border}
      `}
    >
      <div className={`mt-0.5 ${style.iconColor}`}>{style.icon}</div>
      <p className="flex-1 text-sm text-gray-700 leading-relaxed pt-0.5">
        {toast.text}
      </p>
      <button
        onClick={() => dismissToast(toast.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors -mr-1"
        aria-label="关闭提示"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const toasts = useAppStore((s) => s.toasts);

  return (
    <div className="fixed top-6 right-6 z-[10000] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} />
        </div>
      ))}
    </div>
  );
};
