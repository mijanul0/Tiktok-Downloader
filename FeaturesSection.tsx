import React from 'react';
import { ShieldCheck, Zap, Sparkles, Smartphone, Music, Download, Globe2, Lock } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-violet-600 dark:text-violet-400" />,
      title: 'No Watermark',
      description: 'Remove TikTok logo and username watermark cleanly from any public video.',
    },
    {
      icon: <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Ultra Fast Conversion',
      description: 'High-speed cloud processing delivers instant download links in 1-2 seconds.',
    },
    {
      icon: <Music className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />,
      title: 'Extract MP3 Audio',
      description: 'Convert trending TikTok video sound tracks directly into high quality MP3 audio.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'All Devices Supported',
      description: 'Works seamlessly on iPhone, iPad, Android mobile, Windows PC, Mac, and Linux.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: '100% Free & Unlimited',
      description: 'No account registration, no hidden fees, and zero download daily limits.',
    },
    {
      icon: <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: 'Safe & Secure',
      description: 'We do not store downloaded videos or track user history on our servers.',
    },
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Why Choose <span className="text-violet-600 dark:text-violet-400">SSSTik</span> Downloader?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          The simplest and most reliable online tool to save TikTok videos without watermark in HD quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:border-violet-300 dark:hover:border-violet-800/80 hover:shadow-lg hover:shadow-violet-500/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
