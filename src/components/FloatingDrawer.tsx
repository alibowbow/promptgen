import { useState } from 'react';
import { PresetManager } from './PresetManager';
import { ExperimentalFeatures } from './ExperimentalFeatures';
import { ExportImport } from './ExportImport';

export const FloatingDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('presets');

  const tabs = [
    { key: 'presets', label: '프리셋', icon: '📁' },
    { key: 'export', label: '내보내기', icon: '📤' },
    { key: 'laboratory', label: '실험실', icon: '🧪' }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
        aria-label="도구 패널 열기"
      >
        <div className="relative">
          <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
            ⚙️
          </div>
          {/* Badge */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer Panel */}
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-2xl transition-transform duration-300 transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-slate-700/30">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                고급 도구
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-slate-700/30 transition-colors duration-200"
                aria-label="패널 닫기"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/20 dark:border-slate-700/30">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/20 dark:hover:bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'presets' && (
                <div className="space-y-4">
                  <PresetManager />
                </div>
              )}
              
              {activeTab === 'export' && (
                <div className="space-y-4">
                  <ExportImport />
                </div>
              )}
              
              {activeTab === 'laboratory' && (
                <div className="space-y-4">
                  <ExperimentalFeatures />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};