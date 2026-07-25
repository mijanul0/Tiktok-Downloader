import React from 'react';
import { Download, Heart, Shield } from 'lucide-react';
import { AdContainer } from './AdContainer';

interface FooterProps {
  adCode?: string;
  showAdPlaceholder?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ adCode, showAdPlaceholder }) => {
  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Bottom Banner Ad Slot */}
        <AdContainer
          type="bottomBanner"
          adCode={adCode}
          showAdPlaceholder={showAdPlaceholder}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-xs">
                <Download className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                SSS<span className="text-violet-600 dark:text-violet-400">tik</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
              SSSTik is the leading free online TikTok video downloader allowing you to download MP4 videos without watermark in HD quality and extract MP3 audio.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Legal & Info
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400">
                  DMCA & Copyright
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-violet-500" />
              <span>Disclaimer</span>
            </h4>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
              SSSTik is not affiliated, endorsed, or associated with TikTok, ByteDance, or any social media platform. All video media belongs to their respective owners.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900 text-center text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} SSSTik Downloader. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for social media creators & viewers.
          </p>
        </div>
      </div>
    </footer>
  );
};
