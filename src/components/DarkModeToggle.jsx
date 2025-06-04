export const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-6 right-6 z-50 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 dark:border-slate-700/30 hover:scale-110 transition-all duration-300 group"
      aria-label={`${darkMode ? 'Light' : 'Dark'} mode로 전환`}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <div className={`absolute inset-0 transition-all duration-300 ${
          darkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`}>
          <div className="text-2xl">☀️</div>
        </div>
        
        {/* Moon Icon */}
        <div className={`absolute inset-0 transition-all duration-300 ${
          darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        }`}>
          <div className="text-2xl">🌙</div>
        </div>
      </div>
    </button>
  );
};