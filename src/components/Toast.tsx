import { useEffect } from 'react';
import { useToastStore } from '../stores/toastStore';
import type { Toast } from '../stores/toastStore';

export const ToastContainer = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div
      className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 z-50 space-y-2 safe-area-top"
      role="region"
      aria-label="알림"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  useEffect(() => {
    // Add entrance animation
    const timer = setTimeout(() => {
      const element = document.getElementById(`toast-${toast.id}`);
      if (element) {
        element.classList.remove('translate-x-full', 'opacity-0');
        element.classList.add('translate-x-0', 'opacity-100');
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [toast.id]);

  const getToastStyles = () => {
    const baseStyles = "transform transition-all duration-300 ease-in-out translate-x-full opacity-0 shadow-strong backdrop-blur-sm";
    
    // Darker fills so white text meets WCAG AA contrast.
    switch (toast.type) {
      case 'success':
        return `${baseStyles} bg-success-700 text-white border border-success-800`;
      case 'error':
        return `${baseStyles} bg-error-700 text-white border border-error-800`;
      case 'warning':
        return `${baseStyles} bg-warning-700 text-white border border-warning-800`;
      case 'info':
      default:
        return `${baseStyles} bg-primary-700 text-white border border-primary-800`;
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const handleRemove = () => {
    const element = document.getElementById(`toast-${toast.id}`);
    if (element) {
      element.classList.remove('translate-x-0', 'opacity-100');
      element.classList.add('translate-x-full', 'opacity-0');
      setTimeout(onRemove, 300);
    } else {
      onRemove();
    }
  };

  return (
    <div
      id={`toast-${toast.id}`}
      role={toast.type === 'error' ? 'alert' : 'status'}
      className={`${getToastStyles()} max-w-sm w-full shadow-lg rounded-lg pointer-events-auto flex items-center p-4 border`}
    >
      <div className="flex items-center flex-1">
        <span className="text-lg mr-3" aria-hidden="true">{getIcon()}</span>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>

      <button
        type="button"
        onClick={handleRemove}
        aria-label="알림 닫기"
        className="ml-3 text-white hover:text-gray-200 transition-colors"
      >
        <span className="text-lg" aria-hidden="true">×</span>
      </button>
    </div>
  );
};