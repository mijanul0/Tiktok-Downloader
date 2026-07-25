import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ResultSection } from './components/ResultSection';
import { FeaturesSection } from './components/FeaturesSection';
import { InstructionsSection } from './components/InstructionsSection';
import { FaqSection } from './components/FaqSection';
import { HistoryDrawer } from './components/HistoryDrawer';
import { AdSettingsModal } from './components/AdSettingsModal';
import { Footer } from './components/Footer';
import { AdContainer } from './components/AdContainer';
import { VideoData, AdSettings, RapidApiConfig, DownloadHistoryItem } from './types';

const DEFAULT_AD_SETTINGS: AdSettings = {
  showAds: true,
  topBannerCode: '',
  nativeAdCode: '',
  resultBannerCode: '',
  bottomBannerCode: '',
  smartlinkUrl: '',
};

const DEFAULT_RAPIDAPI_CONFIG: RapidApiConfig = {
  apiKey: '',
  apiHost: 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com',
};

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [video, setVideo] = useState<VideoData | null>(null);

  // Settings & History state with LocalStorage persistence
  const [adSettings, setAdSettings] = useState<AdSettings>(() => {
    try {
      const saved = localStorage.getItem('ssstik_ad_settings');
      return saved ? JSON.parse(saved) : DEFAULT_AD_SETTINGS;
    } catch {
      return DEFAULT_AD_SETTINGS;
    }
  });

  const [rapidApiConfig, setRapidApiConfig] = useState<RapidApiConfig>(() => {
    try {
      const saved = localStorage.getItem('ssstik_rapidapi_config');
      return saved ? JSON.parse(saved) : DEFAULT_RAPIDAPI_CONFIG;
    } catch {
      return DEFAULT_RAPIDAPI_CONFIG;
    }
  });

  const [history, setHistory] = useState<DownloadHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ssstik_download_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state modals & theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Apply dark class to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist settings changes
  const handleSaveAdSettings = (newSettings: AdSettings) => {
    setAdSettings(newSettings);
    localStorage.setItem('ssstik_ad_settings', JSON.stringify(newSettings));
  };

  const handleSaveRapidApiConfig = (newConfig: RapidApiConfig) => {
    setRapidApiConfig(newConfig);
    localStorage.setItem('ssstik_rapidapi_config', JSON.stringify(newConfig));
  };

  const saveToHistory = (videoData: VideoData) => {
    const newItem: DownloadHistoryItem = {
      id: videoData.id,
      title: videoData.title,
      cover: videoData.cover,
      authorName: videoData.author.nickname,
      authorHandle: videoData.author.unique_id,
      downloadUrl: videoData.downloads.nowatermark || videoData.downloads.nowatermark_hd,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== newItem.id);
      const updated = [newItem, ...filtered].slice(0, 30);
      localStorage.setItem('ssstik_download_history', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('ssstik_download_history');
  };

  // Main download submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !url.trim()) {
      setError('Please enter a valid TikTok video URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setVideo(null);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
          customApiKey: rapidApiConfig.apiKey,
          customApiHost: rapidApiConfig.apiHost,
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success' && result.data) {
        setVideo(result.data);
        saveToHistory(result.data);
      } else {
        setError(
          result.message ||
            'Could not retrieve video from the provided link. Please ensure the TikTok account/video is public.'
        );
      }
    } catch (err: any) {
      console.error('Download submission error:', err);
      setError('Network error or server unavailable. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAnother = () => {
    setVideo(null);
    setUrl('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors selection:bg-violet-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        onOpenSettings={() => setShowSettings(true)}
        onOpenHistory={() => setShowHistory(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        historyCount={history.length}
      />

      {/* Top Banner Ad Container Below Header */}
      <div className="max-w-7xl mx-auto px-4">
        <AdContainer
          type="topBanner"
          adCode={adSettings.topBannerCode}
          showAdPlaceholder={adSettings.showAds}
        />
      </div>

      <main className="pb-12">
        {/* Hero Section with Input Box */}
        <HeroSection
          url={url}
          setUrl={setUrl}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          adCode={adSettings.nativeAdCode}
          showAdPlaceholder={adSettings.showAds}
        />

        {/* Download Result Section */}
        {video && (
          <ResultSection
            video={video}
            onDownloadAnother={handleDownloadAnother}
            adCode={adSettings.resultBannerCode}
            showAdPlaceholder={adSettings.showAds}
            smartlinkUrl={adSettings.smartlinkUrl}
          />
        )}

        {/* Feature Highlights Grid */}
        <FeaturesSection />

        {/* How To Download Instructions */}
        <InstructionsSection />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Footer & Bottom Ad Slot */}
      <Footer
        adCode={adSettings.bottomBannerCode}
        showAdPlaceholder={adSettings.showAds}
      />

      {/* Modals & Drawers */}
      <AdSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        adSettings={adSettings}
        onSaveAdSettings={handleSaveAdSettings}
        rapidApiConfig={rapidApiConfig}
        onSaveRapidApiConfig={handleSaveRapidApiConfig}
      />

      <HistoryDrawer
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onSelectHistoryItem={(item) => {
          setUrl(item.downloadUrl);
          setShowHistory(false);
        }}
      />
    </div>
  );
}
