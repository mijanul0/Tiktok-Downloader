import React from 'react';
import { Copy, Download, Play, CheckCircle2, Share2, MousePointerClick } from 'lucide-react';

export const InstructionsSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: <Share2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />,
      title: 'Copy TikTok Link',
      description: 'Open the TikTok app or website. Find the video you want to save, tap the "Share" icon, and select "Copy Link".',
    },
    {
      step: '02',
      icon: <MousePointerClick className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Paste Video Link',
      description: 'Paste the copied URL into the SSSTik search box at the top of this page and click the "Download" button.',
    },
    {
      step: '03',
      icon: <Download className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />,
      title: 'Save MP4 or MP3',
      description: 'Select your preferred download quality: "Without Watermark", "HD Quality", or "MP3 Audio" to save the file.',
    },
  ];

  return (
    <section id="how-to-download" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-violet-50/50 dark:bg-zinc-900/30 rounded-3xl border border-violet-100 dark:border-zinc-800 my-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950 px-3 py-1 rounded-full border border-violet-200 dark:border-violet-800">
          Easy 3-Step Guide
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mt-4">
          How to Download TikTok Videos Without Watermark
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Follow these simple instructions to save your favorite TikTok clips on any device.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="relative p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center group hover:border-violet-500 transition-colors"
          >
            <div className="absolute top-4 right-4 text-2xl font-black text-zinc-200 dark:text-zinc-800 font-mono">
              {item.step}
            </div>

            <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-950/80 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
