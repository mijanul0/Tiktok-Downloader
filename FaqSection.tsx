import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do I need to pay to download TikTok videos without watermark?',
      answer:
        'No, SSSTik is 100% free online TikTok downloader. You can save unlimited videos without watermark, HD clips, and MP3 songs without paying anything or creating an account.',
    },
    {
      question: 'Where are TikTok videos saved after downloading?',
      answer:
        'Files are automatically saved in your browser’s default "Downloads" folder. On PC/Mac, check your Downloads directory. On Android or iOS, check your Files app or Chrome/Safari Download manager.',
    },
    {
      question: 'How to download TikTok videos on iPhone or iPad (iOS)?',
      answer:
        'Open Safari browser on iOS 13 or later, paste your TikTok link into SSSTik, and tap "Download Without Watermark". Safari will prompt you to save the file directly to your Files app, where you can save it to Camera Roll.',
    },
    {
      question: 'Can I extract MP3 audio sound from TikTok videos?',
      answer:
        'Yes! After pasting your TikTok link, click the "Download Audio (MP3)" button. Our converter will instantly convert the video track into a high-quality 320kbps MP3 audio file.',
    },
    {
      question: 'Do I need to install any software or browser extensions?',
      answer:
        'No installation is required. SSSTik is a web-based downloader that works directly inside any web browser (Chrome, Safari, Firefox, Edge, Opera).',
    },
    {
      question: 'Does SSSTik keep a copy of downloaded videos or track history?',
      answer:
        'No. SSSTik does not host or store any downloaded videos on its servers. All videos are hosted on TikTok servers and fetched directly for your browser.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Everything you need to know about downloading TikTok videos on SSSTik.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-violet-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 border-t border-zinc-100 dark:border-zinc-800/60 leading-relaxed animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
