import { create } from 'zustand';

export const useToastStore = create((set, get) => ({
  // Toast state
  toasts: [],
  
  // Add toast
  addToast: (message, type = 'info', duration = 3000) => {
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
  removeToast: (id) => {
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