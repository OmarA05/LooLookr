import React, { createContext, useContext, useMemo, useState } from 'react';

type Toast = {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
};

type ToastContextValue = {
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const value = useMemo(() => ({ toasts, showToast }), [toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const color =
          toast.type === 'error'
            ? 'bg-red-600'
            : toast.type === 'success'
              ? 'bg-emerald-600'
              : 'bg-gray-800';
        return (
          <div
            key={toast.id}
            className={`${color} text-white px-4 py-2 rounded shadow-lg text-sm`}
          >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
};
