import React, { useState } from 'react';
import { X, Sliders, Key, Code, Sparkles, Check, Link as LinkIcon, Info } from 'lucide-react';
import { AdSettings, RapidApiConfig } from '../types';

interface AdSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  adSettings: AdSettings;
  onSaveAdSettings: (settings: AdSettings) => void;
  rapidApiConfig: RapidApiConfig;
  onSaveRapidApiConfig: (config: RapidApiConfig) => void;
}

export const AdSettingsModal: React.FC<AdSettingsModalProps> = ({
  isOpen,
  onClose,
  adSettings,
  onSaveAdSettings,
  rapidApiConfig,
  onSaveRapidApiConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'ads' | 'api'>('ads');
  const [localAds, setLocalAds] = useState<AdSettings>(adSettings);
  const [localApi, setLocalApi] = useState<RapidApiConfig>(rapidApiConfig);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveAdSettings(localAds);
    onSaveRapidApiConfig(localApi);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handlePresetSampleAds = () => {
    setLocalAds({
      showAds: true,
      topBannerCode: `<!-- Adsterra Top Banner -->\n<script type="text/javascript">\n\tatOptions = {\n\t\t'key' : 'sample_top_banner_728x90',\n\t\t'format' : 'iframe',\n\t\t'height' : 90,\n\t\t'width' : 728,\n\t\t'params' : {}\n\t};\n</script>`,
      nativeAdCode: `<!-- Adsterra Native Banner -->\n<div id="container-native-adsterra"></div>`,
      resultBannerCode: `<!-- Adsterra Result Section Banner -->\n<div id="container-result-adsterra"></div>`,
      bottomBannerCode: `<!-- Adsterra Bottom Footer Banner -->\n<script type="text/javascript" src="//www.highperformanceformat.com/sample/invoke.js"></script>`,
      smartlinkUrl: 'https://www.highrevenuegate.com/sample_smartlink_redirect',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                Monetization & API Settings
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Configure Adsterra ad codes, Smartlink CTA, and RapidAPI keys
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 px-6 bg-zinc-50/30 dark:bg-zinc-950/30">
          <button
            type="button"
            onClick={() => setActiveTab('ads')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'ads'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Adsterra Ad Slots & Smartlink</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('api')}
            className={`py-3.5 px-4 font-bold text-xs sm:text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'api'
                ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>RapidAPI Configuration</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'ads' && (
            <div className="space-y-5">
              {/* Show / Hide Ad Placeholders Toggle */}
              <div className="p-4 rounded-xl bg-violet-50/60 dark:bg-violet-950/30 border border-violet-200/60 dark:border-violet-800/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                    Show Ad Slots in Preview
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Displays ad container placeholders when live scripts are empty.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={localAds.showAds}
                  onChange={(e) =>
                    setLocalAds({ ...localAds, showAds: e.target.checked })
                  }
                  className="w-5 h-5 accent-violet-600 rounded-md cursor-pointer"
                />
              </div>

              {/* Smartlink URL Input */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>Adsterra Smartlink Direct URL</span>
                </label>
                <input
                  type="text"
                  value={localAds.smartlinkUrl}
                  onChange={(e) =>
                    setLocalAds({ ...localAds, smartlinkUrl: e.target.value })
                  }
                  placeholder="https://www.highrevenuegate.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:border-violet-500 font-mono"
                />
                <p className="text-[11px] text-zinc-500 mt-1">
                  Triggered when users click the "Fast Speed Direct Server" mirror button.
                </p>
              </div>

              {/* 1. Top Banner Ad Code */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Top Banner Ad Script (728x90)
                </label>
                <textarea
                  rows={2}
                  value={localAds.topBannerCode}
                  onChange={(e) =>
                    setLocalAds({ ...localAds, topBannerCode: e.target.value })
                  }
                  placeholder="Paste Adsterra Top Banner HTML/Script code here..."
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-mono text-zinc-900 dark:text-white outline-none focus:border-violet-500"
                />
                <span className="text-[10px] text-zinc-400 font-mono">
                  Tag: &lt;!-- Adsterra Top Banner Ad Code Here --&gt;
                </span>
              </div>

              {/* 2. Top Native / Display Ad Code */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Top Native / Display Ad Script
                </label>
                <textarea
                  rows={2}
                  value={localAds.nativeAdCode}
                  onChange={(e) =>
                    setLocalAds({ ...localAds, nativeAdCode: e.target.value })
                  }
                  placeholder="Paste Adsterra Native Ad script code here..."
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-mono text-zinc-900 dark:text-white outline-none focus:border-violet-500"
                />
                <span className="text-[10px] text-zinc-400 font-mono">
                  Tag: &lt;!-- Adsterra Top Native/Display Ad Code Here --&gt;
                </span>
              </div>

              {/* 3. Result Banner Ad Code */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Result Section Banner Ad Script
                </label>
                <textarea
                  rows={2}
                  value={localAds.resultBannerCode}
                  onChange={(e) =>
                    setLocalAds({ ...localAds, resultBannerCode: e.target.value })
                  }
                  placeholder="Paste Adsterra Result Section Ad script code here..."
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-mono text-zinc-900 dark:text-white outline-none focus:border-violet-500"
                />
                <span className="text-[10px] text-zinc-400 font-mono">
                  Tag: &lt;!-- Adsterra Result Banner Ad Code Here --&gt;
                </span>
              </div>

              {/* 4. Bottom Banner Ad Code */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Bottom Footer Banner Ad Script
                </label>
                <textarea
                  rows={2}
                  value={localAds.bottomBannerCode}
                  onChange={(e) =>
                    setLocalAds({ ...localAds, bottomBannerCode: e.target.value })
                  }
                  placeholder="Paste Adsterra Bottom Banner HTML/Script code here..."
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-mono text-zinc-900 dark:text-white outline-none focus:border-violet-500"
                />
                <span className="text-[10px] text-zinc-400 font-mono">
                  Tag: &lt;!-- Adsterra Bottom Banner Ad Code Here --&gt;
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePresetSampleAds}
                  className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  Fill Sample Script Code Placeholders
                </button>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200 text-xs leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">RapidAPI TikTok Downloader Integration</p>
                  <p className="mt-0.5">
                    SSSTik automatically uses our server proxy with fallback endpoints (TikWM & Demo Engine). If you have your own RapidAPI subscription key, paste it below.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                  X-RapidAPI-Key
                </label>
                <input
                  type="password"
                  value={localApi.apiKey}
                  onChange={(e) =>
                    setLocalApi({ ...localApi, apiKey: e.target.value })
                  }
                  placeholder="e.g. 8a2f819472msh7a3..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:border-violet-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300 mb-1.5">
                  X-RapidAPI-Host
                </label>
                <input
                  type="text"
                  value={localApi.apiHost}
                  onChange={(e) =>
                    setLocalApi({ ...localApi, apiHost: e.target.value })
                  }
                  placeholder="tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white outline-none focus:border-violet-500 font-mono"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            Settings are saved locally in browser storage.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-all flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Settings</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
