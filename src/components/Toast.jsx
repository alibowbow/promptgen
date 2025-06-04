import { useEffect } from 'react';
import { useToastStore } from '../stores/toastStore.js';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
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

const ToastItem = ({ toast, onRemove }) => {
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
    const baseStyles = "transform transition-all duration-300 ease-in-out translate-x-full opacity-0";
    
    switch (toast.type) {
      case 'success':
        return `${baseStyles} bg-green-500 text-white border-green-600`;
      case 'error':
        return `${baseStyles} bg-red-500 text-white border-red-600`;
      case 'warning':
        return `${baseStyles} bg-yellow-500 text-white border-yellow-600`;
      case 'info':
      default:
        return `${baseStyles} bg-blue-500 text-white border-blue-600`;
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
      className={`${getToastStyles()} max-w-sm w-full shadow-lg rounded-lg pointer-events-auto flex items-center p-4 border`}
    >
      <div className="flex items-center flex-1">
        <span className="text-lg mr-3">{getIcon()}</span>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      
      <button
        onClick={handleRemove}
        className="ml-3 text-white hover:text-gray-200 transition-colors"
      >
        <span className="text-lg">×</span>
      </button>
    </div>
  );
};