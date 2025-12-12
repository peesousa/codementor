import React, { createContext, useContext, useState, useCallback } from 'react';
import { IconCheckCircle, IconXCircle, IconAlertTriangle, IconZap } from '../components/Icons';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove após 3 segundos
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success': return <IconCheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <IconXCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <IconAlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <IconZap className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-slate-900 border border-slate-700 shadow-2xl rounded-lg p-4 min-w-[300px] flex items-center gap-3 animate-fade-in pointer-events-auto"
          >
            {getIcon(toast.type)}
            <p className="text-sm text-slate-200 font-medium">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};