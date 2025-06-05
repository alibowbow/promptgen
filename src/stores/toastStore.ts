import { create } from 'zustand';

export interface Toast {
  id: number;
  message: string;
  type: string;
  duration: number;
  timestamp: number;
}

export interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: string, duration?: number) => number;
  removeToast: (id: number) => void;
  clearToasts: () => void;
  success: (message: string, duration?: number) => number;
  error: (message: string, duration?: number) => number;
  warning: (message: string, duration?: number) => number;
  info: (message: string, duration?: number) => number;
}

export const useToastStore = create<ToastState>((set, get) => ({
  // Toast state
  toasts: [],
  
  // Add toast
  addToast: (message: string, type = 'info', duration = 3000) => {
    const toast = {
      id: Date.now() + Math.random(),
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration,
      timestamp: Date.now()
    };
    
    const currentToasts = get().toasts;
    set({ toasts: [...currentToasts, toast] });
    
    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(toast.id);
      }, duration);
    }
    
    return toast.id;
  },
  
  // Remove toast
  removeToast: (id: number) => {
    const currentToasts = get().toasts;
    const newToasts = currentToasts.filter(toast => toast.id !== id);
    set({ toasts: newToasts });
  },
  
  // Clear all toasts
  clearToasts: () => set({ toasts: [] }),
  
  // Helper methods for different toast types
  success: (message, duration) => get().addToast(message, 'success', duration),
  error: (message, duration) => get().addToast(message, 'error', duration),
  warning: (message, duration) => get().addToast(message, 'warning', duration),
  info: (message, duration) => get().addToast(message, 'info', duration)
}));
