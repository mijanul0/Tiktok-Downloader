import React, { useState } from 'react';
import { Clipboard, Download, X, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AdContainer } from './AdContainer';

interface HeroSectionProps {
  url: string;
  setUrl: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
  adCode?: string;
  showAdPlaceholder?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  url,
  setUrl,
  onSubmit,
  loading,
  error,
  adCode,
  showAdPlaceholder,
}) => {
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          setCopiedSuccess(true);
          setTimeout(() => setCopiedSuccess(false), 2000);
        }
      }
    } catch (err) {
      console.warn('Clipboard read permission denied or not supported', err);
    }
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
  };

  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-tr from-violet-500/10 via-indigo-500/10 to-fuchsia-500/10 blur-3xl -z-10 pointer-events-none rounded-full"></div>

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/80 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-6 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
        <span>No Watermark • HD Quality • 100% Free & Unlimited</span>
      </div>

      {/* Hero Heading */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
        TikTok Video Downloader <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
          Without Watermark
        </span>
      </h1>

      <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto font-normal">
        Download TikTok videos in HD MP4 or extract MP3 audio in seconds. Works on iPhone, iPad, Android, PC, and Mac without installing software.
      </p>

      {/* Top Native / Display Ad Placement */}
      <AdContainer type="native" adCode={adCode} showAdPlaceholder={showAdPlaceholder} />

      {/* Download Input Form Box */}
      <div className="mt-6 max-w-3xl mx-auto">
        <form onSubmit={onSubmit} className="relative group">
          <div className="relative flex flex-col sm:flex-row items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 shadow-xl shadow-indigo-500/5 focus-within:border-violet-500 dark:focus-within:border-violet-500 transition-all">
            <div className="relative flex-1 w-full flex items-center pl-3">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste TikTok video link here (e.g. https://www.tiktok.com/@user/video/...)"
                className="w-full py-3 text-sm sm:text-base bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none pr-16"
                disabled={loading}
              />

              {/* Paste or Clear Button Inside Input */}
              <div className="absolute right-2 flex items-center gap-1">
                {url ? (
                  <button
                    type="button"
                    onClick={() => setUrl('')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Clear input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-violet-100 dark:hover:bg-violet-900/40 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                    title="Paste link from clipboard"
                  >
                    {copiedSuccess ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Pasted</span>
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Paste</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Submit Download Button */}
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-600 hover:from-violet-500 hover:via-indigo-500 hover:to-fuchsia-500 text-white font-bold text-base shadow-lg shadow-violet-500/25 hover:shadow-violet-500/35 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Alert Box */}
        {error && (
          <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs sm:text-sm text-left flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to process link</p>
              <p className="mt-0.5 text-rose-600 dark:text-rose-300/90">{error}</p>
            </div>
          </div>
        )}

        {/* Sample Links for Instant Testing */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-medium">Try a sample link:</span>
          <button
            type="button"
            onClick={() => handleSampleClick('https://www.tiktok.com/@japan_foodie/video/72101928301')}
            className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 hover:bg-violet-100 dark:hover:bg-violet-950 hover:text-violet-600 dark:hover:text-violet-300 transition-colors text-[11px] font-mono"
          >
            tiktok.com/@japan_foodie/video/...
          </button>
          <button
            type="button"
            onClick={() => handleSampleClick('https://vt.tiktok.com/ZS2x9q1P/')}
            className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 hover:bg-violet-100 dark:hover:bg-violet-950 hover:text-violet-600 dark:hover:text-violet-300 transition-colors text-[11px] font-mono"
          >
            vt.tiktok.com/ZS2x9q1P/
          </button>
        </div>
      </div>
    </section>
  );
};
