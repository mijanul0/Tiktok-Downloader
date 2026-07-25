import React from 'react';
import { Download, Sliders, History, Moon, Sun, Shield, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  onOpenHistory,
  darkMode,
  setDarkMode,
  historyCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Download className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                  SSS<span className="text-violet-600 dark:text-violet-400">tik</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded-full border border-violet-200 dark:border-violet-800">
                  HD
                </span>
              </div>
              <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 -mt-1 hidden sm:block">
                TikTok Downloader Without Watermark
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <button
            onClick={() => scrollToSection('how-to-download')}
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            How to Download
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="relative p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Download History"
          >
            <History className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 w-4 h-4 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>

          {/* Adsterra & API Settings Modal Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/60 border border-violet-200/60 dark:border-violet-800/60 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Adsterra & API Configuration"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">Ad & API Settings</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3">
          <button
            onClick={() => scrollToSection('how-to-download')}
            className="block w-full text-left py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-violet-600"
          >
            How to Download
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-violet-600"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-violet-600"
          >
            FAQ
          </button>
        </div>
      )}
    </header>
  );
};
