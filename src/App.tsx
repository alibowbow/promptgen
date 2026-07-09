import { useState, useEffect, lazy, Suspense } from 'react';
import { ToastContainer, FloatingDrawer, DarkModeToggle } from './components';
import { AppNav } from './components/nav/AppNav';
import { useViewStore } from './stores/viewStore';

// Lazy-load each mode so its code + content chunk loads on demand.
const LearnView = lazy(() =>
  import('./components/learn/LearnView').then((m) => ({ default: m.LearnView }))
);
const LibraryView = lazy(() =>
  import('./components/library/LibraryView').then((m) => ({ default: m.LibraryView }))
);
const GenerateView = lazy(() =>
  import('./components/generate/GenerateView').then((m) => ({ default: m.GenerateView }))
);

const ViewFallback = () => (
  <div className="flex justify-center py-24" role="status" aria-live="polite">
    <div
      className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"
      aria-hidden="true"
    />
    <span className="sr-only">불러오는 중...</span>
  </div>
);

export default function App() {
  const view = useViewStore((s) => s.view);

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-all duration-500">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 font-sans">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="max-w-6xl mx-auto">
            <AppNav />

            <main>
              <Suspense fallback={<ViewFallback />}>
                {view === 'learn' && <LearnView />}
                {view === 'library' && <LibraryView />}
                {view === 'generate' && <GenerateView />}
              </Suspense>
            </main>

            <footer className="mt-16 text-center border-t border-slate-200/50 dark:border-slate-700/50 pt-8">
              <p className="text-sm text-slate-500 dark:text-slate-500">
                프롬프트 랩 · 프롬프트를 체계적으로 배우는 학습 플랫폼 · ©{' '}
                {new Date().getFullYear()}
              </p>
            </footer>
          </div>
        </div>

        {view === 'generate' && <FloatingDrawer />}
        <ToastContainer />
      </div>
    </div>
  );
}
