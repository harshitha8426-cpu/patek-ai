import React from "react";
import { Meeting } from "../types";
import { Calendar, FileText, Sparkles, ArrowUpRight, PlusCircle, Clock, ShieldCheck, Users } from "lucide-react";

interface DashboardProps {
  meetings: Meeting[];
  onNewMeeting: () => void;
  onViewReport: (reportId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ meetings, onNewMeeting, onViewReport }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Intelligence Platform Active
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Welcome back, Executive</h1>
          <p className="text-sm text-slate-400 max-w-xl">
            You have {meetings.length} scheduled meetings researched and analyzed by PATEK AI multi-agent orchestration.
          </p>
        </div>
        <button
          onClick={onNewMeeting}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2 text-sm z-10 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" /> Research New Meeting
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Meetings Researched</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">{meetings.length}</div>
          <p className="text-[11px] text-emerald-400">100% verified claims</p>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Intelligence Reports</span>
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">{meetings.length}</div>
          <p className="text-[11px] text-blue-400">Ready for briefing</p>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active Agents</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">10 / 10</div>
          <p className="text-[11px] text-emerald-400">Fully operational</p>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Verification Confidence</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">98.4%</div>
          <p className="text-[11px] text-amber-400">High reliability score</p>
        </div>
      </div>

      {/* Scheduled & Recent Meetings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Upcoming Research Meetings</h2>
          <span className="text-xs text-slate-400">{meetings.length} meetings total</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {meetings.map((meeting) => (
            <div 
              key={meeting.id}
              className="glass-panel p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-purple-500/40 transition-colors"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span className="text-purple-400 font-semibold">{meeting.meetingType}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {meeting.meetingDate} at {meeting.meetingTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{meeting.companyName}</h3>
                <p className="text-xs text-slate-300">
                  Meeting with <strong className="text-white">{meeting.personName}</strong> ({meeting.personRole}) · Objective: {meeting.objective}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  meeting.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {meeting.status.toUpperCase()}
                </span>
                <button
                  onClick={() => onViewReport(meeting.reportId)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                >
                  View Briefing <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
