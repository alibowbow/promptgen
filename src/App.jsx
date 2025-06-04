import React from 'react';
import {
  Header,
  LanguageSelector,
  CategorySelector,
  StyleOptions,
  HistoryPanel,
  PresetManager,
  ExperimentalFeatures,
  InputForm,
  StatusDisplay,
  ResultViewer,
  ToastContainer
} from './components';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl bg-white/80 shadow-xl rounded-2xl p-6 sm:p-8 backdrop-blur-lg border border-slate-100">
        <Header />
        
        <p className="text-center text-gray-600 mb-4 text-sm">
          아이디어나 주요 내용을 입력하고, 원하는 용도와 언어에 맞게 최적화된 프롬프트를 받아보세요.<br /> 
          * 민감한 정보는 입력하지 마세요.
        </p>

        <LanguageSelector />
        <HistoryPanel />
        <PresetManager />
        <ExperimentalFeatures />
        <CategorySelector />
        <StyleOptions />
        <InputForm />
        <StatusDisplay />
        <ResultViewer />
        
        <div className="mt-8 text-xs text-center text-gray-400">
          Made with <span className="text-pink-400">♥</span> for Gemini
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}