import React, { useEffect, useState } from "react";
import { Cpu, CheckCircle2, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { AgentStatus } from "../types";

interface LiveResearchCenterProps {
  jobId: string;
  onResearchComplete: (reportId: string) => void;
}

export const LiveResearchCenter: React.FC<LiveResearchCenterProps> = ({ jobId, onResearchComplete }) => {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [reportId, setReportId] = useState<string>("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/research/${jobId}/status`);
        const data = await res.json();
        setAgents(data.agents || []);
        
        const resResults = await fetch(`/api/research/${jobId}/results`);
        const reportData = await resResults.json();
        if (reportData && reportData.id) {
          setReportId(reportData.id);
          setCompleted(true);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching research status:", err);
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="glass-panel p-8 rounded-2xl space-y-4 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 mx-auto flex items-center justify-center shadow-lg shadow-purple-600/30">
          {completed ? (
            <CheckCircle2 className="w-8 h-8 text-white" />
          ) : (
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          )}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">
            {completed ? "Intelligence Research Completed" : "Autonomous Agents Researching Target..."}
          </h1>
          <p className="text-sm text-slate-400">
            {completed
              ? "All 10 specialized agents have verified findings and assembled your executive briefing."
              : "Executing coordinated research pipelines, 30-day web scanning, and claim-level verification."}
          </p>
        </div>

        {completed && (
          <div className="pt-4">
            <button
              onClick={() => onResearchComplete(reportId)}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 text-white font-semibold rounded-xl text-sm shadow-xl shadow-purple-600/30 flex items-center gap-2 mx-auto"
            >
              View Final Executive Briefing <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Agent Execution Timeline</h2>
        
        <div className="grid grid-cols-1 gap-3">
          {agents.map((agent, index) => (
            <div key={index} className="glass-panel p-5 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{agent.name}</h3>
                  <p className="text-xs text-slate-400">{agent.findings}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-mono text-slate-400 tabular-nums">{agent.durationMs}ms</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> COMPLETED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
