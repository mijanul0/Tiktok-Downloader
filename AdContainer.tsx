import React, { useEffect, useRef } from 'react';
import { Tag, ExternalLink } from 'lucide-react';

interface AdContainerProps {
  type: 'topBanner' | 'native' | 'resultBanner' | 'bottomBanner';
  adCode?: string;
  showAdPlaceholder?: boolean;
}

export const AdContainer: React.FC<AdContainerProps> = ({
  type,
  adCode,
  showAdPlaceholder = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adCode && containerRef.current) {
      containerRef.current.innerHTML = '';
      try {
        const range = document.createRange();
        range.selectNode(containerRef.current);
        const fragment = range.createContextualFragment(adCode);
        containerRef.current.appendChild(fragment);
      } catch (e) {
        console.error('Failed to inject Adsterra code:', e);
      }
    }
  }, [adCode]);

  const getAdLabel = () => {
    switch (type) {
      case 'topBanner':
        return 'Top Banner Ad (728x90 / Mobile Responsive)';
      case 'native':
        return 'Top Native / Display Ad';
      case 'resultBanner':
        return 'Result Section Banner Ad';
      case 'bottomBanner':
        return 'Bottom Banner Ad (728x90)';
    }
  };

  return (
    <div className="w-full my-4 text-center overflow-hidden">
      {/* Exact Comment Placeholders for user export / inspection */}
      {type === 'topBanner' && (
        /* <!-- Adsterra Top Banner Ad Code Here --> */
        <span data-comment="Adsterra Top Banner Ad Code Here" />
      )}
      {type === 'native' && (
        /* <!-- Adsterra Top Native/Display Ad Code Here --> */
        <span data-comment="Adsterra Top Native/Display Ad Code Here" />
      )}
      {type === 'resultBanner' && (
        /* <!-- Adsterra Result Banner Ad Code Here --> */
        <span data-comment="Adsterra Result Banner Ad Code Here" />
      )}
      {type === 'bottomBanner' && (
        /* <!-- Adsterra Bottom Banner Ad Code Here --> */
        <span data-comment="Adsterra Bottom Banner Ad Code Here" />
      )}

      {/* Injected Script Container */}
      <div ref={containerRef} id={`adsterra-slot-${type}`} className="inline-block max-w-full"></div>

      {/* Visual Placeholder when no ad code or in inspection mode */}
      {(!adCode || adCode.trim() === '') && showAdPlaceholder && (
        <div className="border border-dashed border-indigo-200 dark:border-zinc-800 bg-indigo-50/50 dark:bg-zinc-900/40 rounded-xl p-3 sm:p-4 text-center max-w-3xl mx-auto transition-all hover:border-indigo-300">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
            <Tag className="w-3.5 h-3.5" />
            <span>Adsterra Ad Placement Slot</span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {getAdLabel()}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-white dark:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 shadow-2xs">
            <span>&lt;!-- {getAdLabel()} Code Here --&gt;</span>
          </div>
        </div>
      )}
    </div>
  );
};
