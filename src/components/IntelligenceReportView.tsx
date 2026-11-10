import React, { useEffect, useState } from "react";
import { IntelligenceReport } from "../types";
import { FileText, Download, ShieldCheck, Building2, User, TrendingUp, AlertTriangle, HelpCircle, CheckCircle2, ExternalLink, RefreshCw } from "lucide-react";

interface IntelligenceReportViewProps {
  reportId: string;
}

export const IntelligenceReportView: React.FC<IntelligenceReportViewProps> = ({ reportId }) => {
  const [report, setReport] = useState<IntelligenceReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`/api/reports/${reportId}`);
        const data = await res.json();
        setReport(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching report:", err);
        setLoading(false);
      }
    };
    if (reportId) fetchReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-white">No active briefing found.</h2>
        <p className="text-sm text-slate-400">Please select or schedule a new meeting to generate an intelligence report.</p>
      </div>
    );
  }

  const handlePrintPdf = () => {
    window.open(`/api/reports/${report.id}/pdf`, "_blank");
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Executive Intelligence Briefing
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">{report.companyName}</h1>
          <p className="text-xs text-slate-400 mt-1">
            Generated on {new Date(report.generatedAt).toLocaleDateString()} · 100% Claim-Level Source Verification
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintPdf}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 text-white font-semibold rounded-xl text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" /> Export Printable PDF
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="glass-panel p-8 rounded-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" /> Executive Summary
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          {report.executiveSummary}
        </p>
      </div>

      {/* Company Snapshot */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-400" /> Company Snapshot
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-xs text-slate-400">Founded</span>
            <div className="text-base font-bold text-white">{report.companySnapshot.founded}</div>
          </div>
          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-xs text-slate-400">Headquarters</span>
            <div className="text-base font-bold text-white">{report.companySnapshot.headquarters}</div>
          </div>
          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-xs text-slate-400">Funding Stage</span>
            <div className="text-base font-bold text-white">{report.companySnapshot.fundingStage}</div>
          </div>
          <div className="glass-panel p-4 rounded-xl space-y-1">
            <span className="text-xs text-slate-400">Valuation</span>
            <div className="text-base font-bold text-white">{report.companySnapshot.valuation}</div>
          </div>
        </div>
      </div>

      {/* Recent Developments (30 Days) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Recent Developments (Past 30 Days)
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {report.recentDevelopments.map((dev, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-purple-400 font-semibold">{dev.date}</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-medium">{dev.impact}</span>
              </div>
              <h3 className="text-base font-bold text-white">{dev.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{dev.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Intelligence */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-400" /> Executive Intelligence: {report.executiveIntelligence.name}
        </h2>
        <div className="glass-panel p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">{report.executiveIntelligence.name}</h3>
              <p className="text-xs text-purple-400 font-medium">{report.executiveIntelligence.title}</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{report.executiveIntelligence.background}</p>
          <div className="border-t border-slate-800/80 pt-3 space-y-1">
            <span className="text-xs font-semibold text-slate-400">Public Stance & Recent Activity:</span>
            <p className="text-xs text-slate-300">{report.executiveIntelligence.publicStance} — {report.executiveIntelligence.recentActivity}</p>
          </div>
        </div>
      </div>

      {/* Business Opportunities & Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl space-y-4">
          <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Strategic Opportunities
          </h2>
          <ul className="space-y-2">
            {report.businessOpportunities.map((opp, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span> {opp}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-4">
          <h2 className="text-base font-bold text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Operational Risks
          </h2>
          <ul className="space-y-2">
            {report.risks.map((risk, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span> {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Questions & Talking Points */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" /> Recommended Questions & Talking Points
        </h2>
        <div className="glass-panel p-6 rounded-xl space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider">High-Impact Discussion Questions</h3>
            <ul className="space-y-3">
              {report.recommendedQuestions.map((q, i) => (
                <li key={i} className="text-xs md:text-sm text-slate-200 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <strong className="text-purple-400">Q{i+1}:</strong> {q}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 border-t border-slate-800 pt-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Meeting Talking Points</h3>
            <ul className="space-y-2">
              {report["talking points"].map((tp, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> {tp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Source Citations */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> Verified Sources & Citations
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {report.sources.map((source, i) => (
            <div key={i} className="glass-panel p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-purple-400 font-semibold">{source.publisher}</span>
                  <span aria-hidden="true">·</span>
                  <span>{source.publicationDate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-medium">Confidence: {source.confidence}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{source.title}</h3>
                <p className="text-xs text-slate-300"><strong className="text-slate-400">Claim:</strong> {source.claim}</p>
              </div>

              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-700 shrink-0"
              >
                View Source <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
