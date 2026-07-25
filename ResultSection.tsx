import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Music,
  Video,
  CheckCircle,
  Play,
  Share2,
  Eye,
  Heart,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { VideoData } from '../types';
import { AdContainer } from './AdContainer';

interface ResultSectionProps {
  video: VideoData;
  onDownloadAnother: () => void;
  adCode?: string;
  showAdPlaceholder?: boolean;
  smartlinkUrl?: string;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  video,
  onDownloadAnother,
  adCode,
  showAdPlaceholder,
  smartlinkUrl,
}) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [video]);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleProxyDownload = (downloadUrl: string, suffix: string) => {
    if (!downloadUrl) return;
    const cleanTitle = (video.title || 'tiktok_video')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 30);
    const filename = `SSSTik_${cleanTitle}_${suffix}`;
    const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(downloadUrl)}&filename=${encodeURIComponent(filename)}`;
    window.location.href = proxyUrl;
  };

  const handleSmartlinkClick = () => {
    if (smartlinkUrl && smartlinkUrl.trim()) {
      window.open(smartlinkUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback action if smartlink isn't set yet
      alert('Smartlink is ready! Customize your Adsterra Smartlink URL in the "Ad & API Settings" panel.');
    }
  };

  const formatNumber = (num: number) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <section
      ref={resultRef}
      className="max-w-4xl mx-auto px-4 sm:px-6 my-8 animate-in fade-in zoom-in-95 duration-300"
    >
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/10">
        {/* Header Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-bold text-zinc-900 dark:text-white">
              Video Ready to Download!
            </span>
          </div>

          <button
            onClick={onDownloadAnother}
            className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Download Another Video</span>
          </button>
        </div>

        {/* Video Card Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Video Thumbnail / Player Preview */}
          <div className="md:col-span-5 relative group">
            <div className="relative aspect-[9/16] max-h-[420px] mx-auto rounded-2xl overflow-hidden bg-zinc-950 shadow-lg border border-zinc-200 dark:border-zinc-800">
              {isPlaying && video.downloads.nowatermark ? (
                <video
                  src={video.downloads.nowatermark}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <>
                  <img
                    src={video.cover}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 rounded-full bg-white/90 text-violet-600 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                      title="Play Preview Video"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                    <span className="mt-3 text-xs font-medium text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs">
                      Preview Video
                    </span>
                  </div>
                </>
              )}

              {video.duration > 0 && (
                <span className="absolute bottom-3 right-3 text-[11px] font-mono font-bold bg-black/80 text-white px-2 py-0.5 rounded-md">
                  00:{video.duration < 10 ? `0${video.duration}` : video.duration}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Author Details, Title & Action Download Buttons */}
          <div className="md:col-span-7 space-y-5">
            {/* Author Profile */}
            <div className="flex items-center gap-3">
              <img
                src={video.author.avatar}
                alt={video.author.nickname}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/30"
              />
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                  {video.author.nickname}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  @{video.author.unique_id}
                </p>
              </div>
            </div>

            {/* Video Caption */}
            <p className="text-sm text-zinc-700 dark:text-zinc-200 line-clamp-3 leading-relaxed">
              {video.title || 'TikTok Video Without Watermark'}
            </p>

            {/* Video Stats */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-violet-500" />
                {formatNumber(video.play_count)} views
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                {formatNumber(video.digg_count)}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                {formatNumber(video.comment_count)}
              </span>
              <span className="flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-amber-500" />
                {formatNumber(video.share_count)}
              </span>
            </div>

            {/* Designated Action Download Buttons */}
            <div className="space-y-2.5 pt-2">
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Select Download Option:
              </p>

              {/* 1. ✅ Download Without Watermark (Primary) */}
              <button
                onClick={() =>
                  handleProxyDownload(
                    video.downloads.nowatermark || video.downloads.nowatermark_hd,
                    'NoWatermark.mp4'
                  )
                }
                className="w-full py-3.5 px-5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md shadow-violet-600/20 hover:shadow-violet-600/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>Download Without Watermark</span>
                </div>
                <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-md">
                  Server MP4
                </span>
              </button>

              {/* 2. ✅ Download HD Quality without watermark */}
              <button
                onClick={() =>
                  handleProxyDownload(
                    video.downloads.nowatermark_hd || video.downloads.nowatermark,
                    'HD_NoWatermark.mp4'
                  )
                }
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Download HD Quality (No Watermark)</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-zinc-950 px-2 py-0.5 rounded-md">
                  1080p HD
                </span>
              </button>

              {/* 3. ✅ Download with watermark */}
              {video.downloads.watermark && (
                <button
                  onClick={() =>
                    handleProxyDownload(video.downloads.watermark, 'WithWatermark.mp4')
                  }
                  className="w-full py-3 px-5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-sm transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <Video className="w-4 h-4 text-zinc-500" />
                    <span>Download With Watermark</span>
                  </div>
                  <span className="text-xs text-zinc-400">Original</span>
                </button>
              )}

              {/* 4. ✅ Download Audio (MP3) */}
              <button
                onClick={() =>
                  handleProxyDownload(
                    video.downloads.music || video.downloads.nowatermark,
                    'Audio.mp3'
                  )
                }
                className="w-full py-3 px-5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-sm transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Music className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Download Audio (MP3)</span>
                </div>
                <span className="text-[11px] font-mono font-semibold bg-emerald-200/60 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md">
                  320 kbps
                </span>
              </button>

              {/* 5. 🚀 Adsterra Smartlink High-Speed Mirror Button */}
              <button
                onClick={handleSmartlinkClick}
                className="w-full py-3 px-5 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700/80 font-bold text-xs sm:text-sm transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500 fill-current animate-bounce" />
                  <span>Fast Speed Direct Server (High-Speed Download Mirror)</span>
                </div>
                <ExternalLink className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Utility: Copy Direct Link */}
              <div className="pt-2 flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span>Trouble downloading?</span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyLink(
                      video.downloads.nowatermark_hd || video.downloads.nowatermark
                    )
                  }
                  className="inline-flex items-center gap-1 font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Direct Video Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Adsterra Result Banner Placement */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <AdContainer
            type="resultBanner"
            adCode={adCode}
            showAdPlaceholder={showAdPlaceholder}
          />
        </div>
      </div>
    </section>
  );
};
