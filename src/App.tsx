import React, { useState, useEffect } from 'react';
import {
  Header,
  LanguageSelector,
  CategorySelector,
  StyleOptions,
  HistoryPanel,
  InputForm,
  StatusDisplay,
  ResultViewer,
  ToastContainer,
  FloatingDrawer,
  DarkModeToggle
} from './components';
import { useHistoryStore } from './stores/historyStore';

export default function App() {
  const { showHistory } = useHistoryStore();
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-all duration-500">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 font-sans">
        
        {/* Dark Mode Toggle */}
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        
        {/* Main Container - Desktop Optimized */}
        <div className="container mx-auto px-6 py-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-12 animate-fade-in">
              <Header />
            </div>

            {/* History Panel - Right below header when visible */}
            {showHistory && (
              <div className="mb-8 animate-slide-up">
                <HistoryPanel />
              </div>
            )}

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left Column - Controls */}
              <div className="xl:col-span-4 space-y-6">
                {/* Language & Category Selection */}
                <div className="glass-card">
                  <div className="glass-card-body space-y-8">
                    <LanguageSelector />
                    <CategorySelector />
                  </div>
                </div>
                
                {/* Style Options */}
                <div className="glass-card">
                  <StyleOptions />
                </div>
              </div>
              
              {/* Center Column - Main Input/Output */}
              <div className="xl:col-span-8 space-y-6">
                {/* Input Form */}
                <div className="glass-card">
                  <InputForm />
                </div>

                {/* Status & Results */}
                <StatusDisplay />
                <ResultViewer />
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 text-center border-t border-slate-200/50 dark:border-slate-700/50 pt-8">
              <div className="space-y-2">
                <p className="text-slate-600 dark:text-slate-400">
                  Made with <span className="text-red-500">♥</span> for AI Enthusiasts
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  © 2024 AI Prompt Optimizer - Powered by Advanced AI Technology
                </p>
              </div>
            </footer>
          </div>
        </div>

        {/* Floating Drawer for Presets & Export */}
        <FloatingDrawer />
        
        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </div>
  );
}