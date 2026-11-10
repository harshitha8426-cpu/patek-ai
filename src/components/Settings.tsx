import React, { useState } from "react";
import { Settings as SettingsIcon, Shield, CheckCircle2, Cpu, Key, Database, Save } from "lucide-react";

export const Settings: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    bifrostBaseUrl: "https://gateway.bifrost.ai/v1",
    bifrostModel: "gemini-3.8-flash",
    tavilyEnabled: true,
    defaultLookbackDays: 30,
    confidenceThreshold: "High"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <SettingsIcon className="w-4 h-4 text-slate-400" /> Platform Configuration
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Settings & Model Gateway</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure Bifrost Model Gateway, Tavily search integration, and agent confidence thresholds.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Settings successfully updated.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" /> Bifrost Model Gateway
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Bifrost Base URL</label>
              <input
                type="text"
                value={settings.bifrostBaseUrl}
                onChange={(e) => setSettings({ ...settings, bifrostBaseUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Active Model</label>
              <select
                value={settings.bifrostModel}
                onChange={(e) => setSettings({ ...settings, bifrostModel: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended)</option>
                <option value="gemini-4-argon">gemini-4-argon (Advanced Reasoning)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" /> Research Engine Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Default Lookback Window (Days)</label>
              <input
                type="number"
                value={settings.defaultLookbackDays}
                onChange={(e) => setSettings({ ...settings, defaultLookbackDays: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Minimum Claim Confidence</label>
              <select
                value={settings.confidenceThreshold}
                onChange={(e) => setSettings({ ...settings, confidenceThreshold: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="High">High Confidence Only</option>
                <option value="Medium">Medium & High</option>
                <option value="All">All Verified Claims</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 text-white font-semibold rounded-xl text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
