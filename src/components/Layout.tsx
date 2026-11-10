import React from "react";
import { Shield, Sparkles, LayoutDashboard, PlusCircle, Search, FileText, Database, History, Settings as SettingsIcon, LogOut } from "lucide-react";

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewMeeting: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, onNewMeeting, children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Top Bar Contract: Brand title (1 line) — 4-5 nav links — 1 primary action */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-8 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => setActiveTab("dashboard")} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
              PATEK AI
            </span>
            <span className="block text-[10px] text-purple-400 font-medium tracking-wider uppercase">
              Intelligence Platform
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (4-5 items) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${activeTab === 'dashboard' ? 'text-white font-semibold' : ''}`}
          >
            <LayoutDashboard className="w-4 h-4 text-purple-400" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("report")}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${activeTab === 'report' ? 'text-white font-semibold' : ''}`}
          >
            <FileText className="w-4 h-4 text-blue-400" />
            Active Briefing
          </button>
          <button 
            onClick={() => setActiveTab("sources")}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${activeTab === 'sources' ? 'text-white font-semibold' : ''}`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            Source Explorer
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${activeTab === 'history' ? 'text-white font-semibold' : ''}`}
          >
            <History className="w-4 h-4 text-amber-400" />
            Meeting History
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${activeTab === 'settings' ? 'text-white font-semibold' : ''}`}
          >
            <SettingsIcon className="w-4 h-4 text-slate-400" />
            Settings
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onNewMeeting}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            New Research Meeting
          </button>
        </div>
      </header>

      {/* Mobile Nav Bar */}
      <div className="flex lg:hidden items-center justify-around bg-slate-900 border-b border-slate-800 px-4 py-2 text-xs">
        <button onClick={() => setActiveTab("dashboard")} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-purple-400' : 'text-slate-400'}`}>
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
        <button onClick={() => setActiveTab("report")} className={`flex flex-col items-center gap-1 ${activeTab === 'report' ? 'text-purple-400' : 'text-slate-400'}`}>
          <FileText className="w-4 h-4" />
          Briefing
        </button>
        <button onClick={() => setActiveTab("sources")} className={`flex flex-col items-center gap-1 ${activeTab === 'sources' ? 'text-purple-400' : 'text-slate-400'}`}>
          <Database className="w-4 h-4" />
          Sources
        </button>
        <button onClick={() => setActiveTab("history")} className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-purple-400' : 'text-slate-400'}`}>
          <History className="w-4 h-4" />
          History
        </button>
        <button onClick={() => setActiveTab("settings")} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-purple-400' : 'text-slate-400'}`}>
          <SettingsIcon className="w-4 h-4" />
          Settings
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 px-8 text-center text-xs text-slate-500">
        <p>© 2026 PATEK AI Intelligence Platform. Research Smarter. Meet Better. Decide Confidently.</p>
      </footer>
    </div>
  );
};
