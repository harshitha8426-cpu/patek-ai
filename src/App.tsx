import React, { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { CreateMeetingModal } from "./components/CreateMeetingModal";
import { LiveResearchCenter } from "./components/LiveResearchCenter";
import { IntelligenceReportView } from "./components/IntelligenceReportView";
import { SourceExplorer } from "./components/SourceExplorer";
import { MeetingHistory } from "./components/MeetingHistory";
import { Settings } from "./components/Settings";
import { Meeting } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string>("");
  const [activeReportId, setActiveReportId] = useState<string>("rep-001");
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    try {
      const res = await fetch("/api/meetings");
      const data = await res.json();
      setMeetings(data);
      if (data.length > 0 && !activeReportId) {
        setActiveReportId(data[0].reportId);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching meetings:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleMeetingCreated = (meetingId: string, jobId: string) => {
    setShowCreateModal(false);
    setActiveJobId(jobId);
    setActiveTab("research");
    fetchMeetings();
  };

  const handleResearchComplete = (reportId: string) => {
    setActiveReportId(reportId);
    setActiveTab("report");
    fetchMeetings();
  };

  const handleViewReport = (reportId: string) => {
    setActiveReportId(reportId);
    setActiveTab("report");
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onNewMeeting={() => setShowCreateModal(true)}
    >
      {activeTab === "landing" && (
        <LandingPage
          onEnterApp={() => setActiveTab("dashboard")}
          onNewMeeting={() => setShowCreateModal(true)}
        />
      )}

      {activeTab === "dashboard" && (
        <Dashboard
          meetings={meetings}
          onNewMeeting={() => setShowCreateModal(true)}
          onViewReport={handleViewReport}
        />
      )}

      {activeTab === "research" && (
        <LiveResearchCenter
          jobId={activeJobId || (meetings[0]?.jobId ?? "job-001")}
          onResearchComplete={handleResearchComplete}
        />
      )}

      {activeTab === "report" && (
        <IntelligenceReportView reportId={activeReportId} />
      )}

      {activeTab === "sources" && <SourceExplorer />}

      {activeTab === "history" && (
        <MeetingHistory meetings={meetings} onViewReport={handleViewReport} />
      )}

      {activeTab === "settings" && <Settings />}

      {showCreateModal && (
        <CreateMeetingModal
          onClose={() => setShowCreateModal(false)}
          onMeetingCreated={handleMeetingCreated}
        />
      )}
    </Layout>
  );
}
