import React, { useState } from "react";
import { X, Sparkles, Building2, User, Calendar, Clock, Target, FileText, Shield } from "lucide-react";

interface CreateMeetingModalProps {
  onClose: () => void;
  onMeetingCreated: (meetingId: string, jobId: string) => void;
}

export const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({ onClose, onMeetingCreated }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    personName: "",
    personRole: "",
    meetingDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    meetingTime: "10:00 AM EST",
    meetingType: "Executive Partnership",
    objective: "Evaluate strategic alignment, product integration, and partnership terms.",
    agenda: "1. Introductions and strategic vision\n2. Technical architecture review\n3. Commercial partnership terms\n4. Q&A and next steps",
    userRole: "Managing Director",
    researchInstructions: "Focus heavily on recent 30-day funding announcements, product launches, executive statements, and competitive threats."
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName) return;

    setLoading(true);
    try {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const meeting = await res.json();
      
      // Trigger research execution
      await fetch(`/api/meetings/${meeting.id}/research`, {
        method: "POST"
      });

      onMeetingCreated(meeting.id, meeting.jobId);
    } catch (err) {
      console.error("Error creating meeting:", err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Schedule Research Meeting</h2>
              <p className="text-xs text-slate-400">Deploy 10 autonomous agents to research target before your meeting.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-purple-400" /> Target Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Anthropic, Stripe, Acme Quantum"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" /> Key Executive / Contact Name
              </label>
              <input
                type="text"
                placeholder="e.g., Dr. Elena Rostova"
                value={formData.personName}
                onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Executive Title / Role</label>
              <input
                type="text"
                placeholder="e.g., Chief Executive Officer"
                value={formData.personRole}
                onChange={(e) => setFormData({ ...formData, personRole: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Meeting Type</label>
              <select
                value={formData.meetingType}
                onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Executive Partnership">Executive Partnership</option>
                <option value="Series B Co-Investment">Series B Co-Investment</option>
                <option value="Enterprise Software Procurement">Enterprise Software Procurement</option>
                <option value="M&A Strategic Review">M&A Strategic Review</option>
                <option value="Board Advisory">Board Advisory</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Meeting Date
              </label>
              <input
                type="date"
                value={formData.meetingDate}
                onChange={(e) => setFormData({ ...formData, meetingDate: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Time & Timezone
              </label>
              <input
                type="text"
                value={formData.meetingTime}
                onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-red-400" /> Primary Meeting Objective
            </label>
            <input
              type="text"
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" /> Meeting Agenda
            </label>
            <textarea
              rows={3}
              value={formData.agenda}
              onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-purple-400" /> Specific Research Focus & Instructions
            </label>
            <input
              type="text"
              value={formData.researchInstructions}
              onChange={(e) => setFormData({ ...formData, researchInstructions: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-900 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-600/30 flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Initializing Agents...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Start Intelligence Research
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
