import React from "react";
import { Database, ExternalLink, ShieldCheck, Search } from "lucide-react";

export const SourceExplorer: React.FC = () => {
  const sources = [
    {
      id: "src-001",
      title: "Acme Quantum Secures $75M Series B to Scale Quantum Manufacturing",
      publisher: "TechCrunch",
      date: "October 14, 2026",
      url: "https://techcrunch.com/2026/10/14/acme-quantum-series-b",
      reliability: "High (Verified Press Release)",
      confidence: "High",
      claim: "Closed $75M Series B round led by Meridian Capital."
    },
    {
      id: "src-002",
      title: "EuroCloud Partners with Acme Quantum for Sovereign Encryption",
      publisher: "Reuters",
      date: "September 28, 2026",
      url: "https://reuters.com/technology/eurocloud-acme-quantum-2026-09",
      reliability: "High (Tier-1 Financial News)",
      confidence: "High",
      claim: "Strategic partnership announced with EuroCloud for European clusters."
    },
    {
      id: "src-003",
      title: "US Patent Office Grants Topological Lattice Patent to Acme",
      publisher: "Patent Gazette",
      date: "September 10, 2026",
      url: "https://patents.google.com/patent/US11842991B2",
      reliability: "High (Official Government Registry)",
      confidence: "High",
      claim: "Patent awarded for error-correcting lattice architecture reducing decoherence by 40%."
    },
    {
      id: "src-101",
      title: "NeuralScale Announces InferenceMesh 3.0",
      publisher: "VentureBeat",
      date: "October 20, 2026",
      url: "https://venturebeat.com/ai/inferencemesh-3",
      reliability: "High",
      confidence: "High",
      claim: "InferenceMesh 3.0 delivers 3x token throughput."
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <Database className="w-4 h-4 text-emerald-400" /> Evidence Traceability & Source Explorer
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Verified Source Registry</h1>
          <p className="text-xs text-slate-400 mt-1">
            Every factual claim in PATEK AI intelligence briefings is anchored to verified primary sources.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sources.map((s) => (
          <div key={s.id} className="glass-panel p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-purple-400 font-semibold">{s.publisher}</span>
                <span aria-hidden="true">·</span>
                <span>{s.date}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-medium">Reliability: {s.reliability}</span>
              </div>
              <h3 className="text-base font-bold text-white">{s.title}</h3>
              <p className="text-xs text-slate-300">
                <strong className="text-slate-400">Substantiated Claim:</strong> {s.claim}
              </p>
            </div>

            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-medium flex items-center gap-2 border border-slate-700 shrink-0"
            >
              Open Source <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
