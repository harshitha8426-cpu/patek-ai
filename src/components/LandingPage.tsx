import React from "react";
import { Shield, Sparkles, ArrowRight, Cpu, Search, CheckCircle2, Zap, Users, TrendingUp } from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
  onNewMeeting: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onNewMeeting }) => {
  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          Autonomous Multi-Agent Pre-Meeting Intelligence
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Research Smarter. Meet Better. <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">Decide Confidently.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          PATEK AI deploys 10 coordinated autonomous agents to investigate companies, executives, 30-day developments, and competitor moves before every meeting.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button 
            onClick={onNewMeeting}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 transition-all flex items-center gap-2 text-sm"
          >
            Start Intelligence Research <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={onEnterApp}
            className="px-8 py-4 bg-slate-900 border border-slate-700 text-slate-200 font-semibold rounded-xl hover:bg-slate-800 transition-all text-sm"
          >
            Open Dashboard
          </button>
        </div>
      </div>

      {/* 10-Agent Architecture Overview */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Coordinated Multi-Agent Architecture</h2>
          <p className="text-sm text-slate-400">Ten specialized agents working in parallel with strict evidence verification gates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: "01. Patek Orchestrator", desc: "Manages objectives and coordinates parallel sub-agent tasks." },
            { title: "02. Company Intel", desc: "Researches business models, financials, and strategic initiatives." },
            { title: "03. Executive Intel", desc: "Analyzes executive backgrounds, public stances, and leadership." },
            { title: "04. News Intel", desc: "Scans 30-day web developments, press releases, and filings." },
            { title: "05. Product Intel", desc: "Discovers recent product launches and technology updates." },
            { title: "06. Competitor Intel", desc: "Maps rival movements and competitive threat vectors." },
            { title: "07. Evidence Verification", desc: "Verifies claims against original sources with confidence ratings." },
            { title: "08. Strategic Intel", desc: "Analyzes business opportunities and operational risk matrix." },
            { title: "09. Meeting Strategist", desc: "Generates intelligent questions and tailored talking points." },
            { title: "10. Patek Briefing", desc: "Synthesizes final executive intelligence report with citations." }
          ].map((agent, i) => (
            <div key={i} className="glass-panel p-5 rounded-xl space-y-2 hover:border-purple-500/50 transition-colors">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">{agent.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{agent.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-slate-800">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">30-Day Deep Lookback</h3>
          <p className="text-sm text-slate-400">Thoroughly examines recent company announcements, funding rounds, leadership changes, and product updates preceding your meeting.</p>
        </div>

        <div className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Claim-Level Verification</h3>
          <p className="text-sm text-slate-400">Every factual claim is backed by traceable sources with reliability assessments and explicit confidence levels.</p>
        </div>

        <div className="space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Strategic Advantage</h3>
          <p className="text-sm text-slate-400">Equips you with high-impact discussion questions, risk matrices, and negotiation talking points tailored to your objective.</p>
        </div>
      </div>
    </div>
  );
};
