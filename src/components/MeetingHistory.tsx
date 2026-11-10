import React from "react";
import { Meeting } from "../types";
import { History, Calendar, Clock, ArrowUpRight, Search } from "lucide-react";

interface MeetingHistoryProps {
  meetings: Meeting[];
  onViewReport: (reportId: string) => void;
}

export const MeetingHistory: React.FC<MeetingHistoryProps> = ({ meetings, onViewReport }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto py-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <History className="w-4 h-4 text-amber-400" /> Historical Intelligence & Briefings
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">Meeting History</h1>
          <p className="text-xs text-slate-400 mt-1">
            Review previous pre-meeting intelligence reports and track historical developments over time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {meetings.map((m) => (
          <div key={m.id} className="glass-panel p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="text-purple-400 font-semibold">{m.meetingType}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {m.meetingDate}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{m.companyName}</h3>
              <p className="text-xs text-slate-300">
                Meeting with <strong className="text-white">{m.personName}</strong> ({m.personRole}) · Objective: {m.objective}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onViewReport(m.reportId)}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                View Report <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
