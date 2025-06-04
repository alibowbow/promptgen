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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 font-sans">
      {/* Mobile-first responsive container */}
      <div className="w-full min-h-screen flex flex-col lg:flex-row lg:items-start lg:justify-center">
        
        {/* Main Content Area */}
        <main className="flex-1 max-w-none lg:max-w-2xl xl:max-w-3xl mx-auto">
          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-12 space-y-6">
            
            {/* Header Section */}
            <div className="text-center space-y-4 animate-fade-in">
              <Header />
              <div className="body-text max-w-2xl mx-auto">
                아이디어나 주요 내용을 입력하고, 원하는 용도와 언어에 맞게 최적화된 프롬프트를 받아보세요.
                <br className="hidden sm:block" />
                <span className="caption block sm:inline mt-2 sm:mt-0 sm:ml-2">
                  * 민감한 정보는 입력하지 마세요.
                </span>
              </div>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              
              {/* Left Column - Primary Controls */}
              <div className="space-y-4">
                <div className="panel-expandable">
                  <LanguageSelector />
                </div>
                
                <div className="panel-expandable">
                  <CategorySelector />
                </div>
                
                <div className="panel-expandable">
                  <StyleOptions />
                </div>
              </div>
              
              {/* Right Column - Secondary Controls */}
              <div className="space-y-4">
                <div className="panel-expandable">
                  <HistoryPanel />
                </div>
                
                <div className="panel-expandable">
                  <PresetManager />
                </div>
                
                <div className="panel-expandable">
                  <ExperimentalFeatures />
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="panel-expandable">
              <InputForm />
            </div>

            {/* Status & Results */}
            <div className="space-y-4">
              <StatusDisplay />
              <ResultViewer />
            </div>

            {/* Footer */}
            <footer className="text-center pt-8 border-t border-slate-200">
              <p className="caption">
                Made with <span className="text-error-400">♥</span> for AI Enthusiasts
              </p>
              <p className="caption mt-2">
                © 2024 Prompt Optimizer - Powered by Advanced AI
              </p>
            </footer>
          </div>
        </main>

        {/* Optional Sidebar for larger screens */}
        <aside className="hidden xl:block w-80 bg-white/60 backdrop-blur-sm border-l border-white/20 min-h-screen">
          <div className="sticky top-6 p-6 space-y-6">
            
            {/* Quick Stats */}
            <div className="card">
              <div className="card-header">
                <h3 className="heading-4">사용 통계</h3>
              </div>
              <div className="card-body space-y-3">
                <div className="flex justify-between items-center">
                  <span className="caption">총 변환 횟수</span>
                  <span className="label">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="caption">저장된 프리셋</span>
                  <span className="label">-</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="caption">히스토리</span>
                  <span className="label">-</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="card">
              <div className="card-header">
                <h3 className="heading-4">💡 팁</h3>
              </div>
              <div className="card-body">
                <ul className="space-y-2 caption">
                  <li>• 구체적인 스타일과 색상을 명시하세요</li>
                  <li>• 원하는 분위기나 감정을 포함하세요</li>
                  <li>• 기술적 세부사항을 추가하세요</li>
                  <li>• 프리셋으로 자주 쓰는 설정을 저장하세요</li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}