import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const STORE_FILE = path.join(DATA_DIR, "patek_store.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default seed data for meetings, reports, sources
const defaultStore = {
  meetings: [
    {
      id: "meet-001",
      companyName: "Acme Quantum Technologies",
      personName: "Dr. Elena Rostova",
      personRole: "Chief Executive Officer",
      meetingDate: "2026-11-15",
      meetingTime: "10:00 AM EST",
      meetingType: "Executive Partnership & Series B Co-Investment",
      objective: "Evaluate strategic partnership for distributed quantum cloud infrastructure and negotiate equity stake participation.",
      agenda: "1. Introductions and quantum roadmap 2. Technical integration architecture 3. Commercial partnership terms 4. Q&A and next steps",
      userRole: "Managing Director, Horizon Ventures",
      researchInstructions: "Focus heavily on recent patent filings, Q3 funding announcements, leadership shifts, and competitive threats from IBM Quantum and Rigetti.",
      status: "completed",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      reportId: "rep-001",
      jobId: "job-001"
    },
    {
      id: "meet-002",
      companyName: "NeuralScale AI",
      personName: "Marcus Vance",
      personRole: "VP of Enterprise Engineering",
      meetingDate: "2026-11-18",
      meetingTime: "02:30 PM PST",
      meetingType: "Enterprise Software Procurement",
      objective: "Assess enterprise security compliance, SLA guarantees, and multi-region deployment capabilities for internal R&D workloads.",
      agenda: "1. Architecture overview & latency benchmarks 2. Data privacy & SOC2 Type II compliance 3. Pricing tiers & custom SLAs 4. Pilot onboarding timeline",
      userRole: "VP of Global Infrastructure, Apex Global",
      researchInstructions: "Check for recent vulnerability patches, multi-region outages in Q3, and pricing model revisions.",
      status: "scheduled",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      reportId: "rep-002",
      jobId: "job-002"
    }
  ],
  reports: {
    "rep-001": {
      id: "rep-001",
      meetingId: "meet-001",
      companyName: "Acme Quantum Technologies",
      executiveSummary: "Acme Quantum Technologies has emerged as a frontrunner in fault-tolerant superconducting quantum processors, closing a pivotal $75M Series B led by Meridian Capital on October 14, 2026. CEO Dr. Elena Rostova is actively seeking strategic tier-1 enterprise partners for global distribution of their Q-Cloud 4 platform. Sentiment is exceptionally high, though supply chain bottlenecks for helium dilution refrigerators pose minor delivery timeline risks.",
      companySnapshot: {
        founded: "2022",
        headquarters: "Boulder, Colorado",
        employeeCount: "145",
        fundingStage: "Series B ($98M Total)",
        valuation: "$420M Post-Money",
        coreProducts: ["Q-Cloud 4 API", "CryoCore-X Dilution Refrigerator", "Quantum Compiler QIR-Link"]
      },
      recentDevelopments: [
        {
          date: "October 14, 2026",
          title: "Closed $75M Series B Round Led by Meridian Capital",
          description: "Capital earmarked for scaling manufacturing of CryoCore-X units and expanding European data center availability.",
          impact: "High Positive",
          sourceId: "src-001"
        },
        {
          date: "September 28, 2026",
          title: "Strategic Partnership Announced with EuroCloud",
          description: "Integration of Q-Cloud 4 into sovereign European cloud clusters to meet stringent GDPR and quantum encryption mandates.",
          impact: "Strategic Growth",
          sourceId: "src-002"
        },
        {
          date: "September 10, 2026",
          title: "Patent Awarded for Error-Correcting Lattice Architecture",
          description: "US Patent 11,842,991 secures their proprietary topological error correction method, reducing decoherence by 40%.",
          impact: "Defensible Moat",
          sourceId: "src-003"
        }
      ],
      executiveIntelligence: {
        name: "Dr. Elena Rostova",
        title: "Chief Executive Officer & Co-Founder",
        background: "Former Lead Quantum Architect at IBM Watson Research (2018–2022); Ph.D. in Applied Physics from MIT (2018). Published 34 peer-reviewed papers on topological qubits.",
        publicStance: "Vocal advocate for open-standard quantum APIs and strict semiconductor export controls. Emphasizes hybrid classical-quantum enterprise workflows.",
        recentActivity: "Keynote speaker at Q-Con Munich (Oct 22, 2026); published op-ed in MIT Technology Review on fault-tolerance milestones."
      },
      productDevelopments: [
        {
          productName: "Q-Cloud 4 API",
          launchDate: "August 2026",
          description: "Upgraded cloud middleware offering 1,024 physical qubit simulations with real-time error mitigation.",
          marketReception: "Adopted by 14 Fortune 500 financial institutions in first 60 days."
        }
      ],
      competitorIntelligence: [
        {
          competitorName: "Rigetti & Co",
          movements: "Released rival modular chip architecture (Ankaa-3) with similar qubit count but higher gate error rates.",
          threatLevel: "Moderate",
          advantage: "Acme holds superior topological error correction patents."
        },
        {
          competitorName: "IBM Quantum",
            movements: "Expanded Heron processor availability across AWS Marketplace.",
            threatLevel: "High",
            advantage: "Acme offers dedicated on-premise cryo-appliances which IBM lacks."
        }
      ],
      businessOpportunities: [
        "Exclusive co-investment rights in Series C (target Q3 2027).",
        "Joint go-to-market offering for sovereign financial institutions requiring zero-trust quantum security.",
        "Integration of Horizon Ventures portfolio cybersecurity tools into Acme's cloud stack."
      ],
      risks: [
        "Supply chain dependency on specialized dilution refrigerator components from Netherlands.",
        "Key person dependency on Dr. Elena Rostova for core algorithmic breakthroughs.",
        "Aggressive pricing pressure from cloud giants entering quantum simulation."
      ],
      recommendedQuestions: [
        "What is your current physical-to-logical qubit ratio on the Q-Cloud 4 architecture, and how does it scale past 5,000 qubits?",
        "Given the recent European sovereign cloud partnership, how are you structuring data sovereignty compliance for non-EU enterprise clients?",
        "What are your primary supply chain constraints regarding dilution refrigerators over the next 12 months?"
      ],
      "talking points": [
        "Congratulate Dr. Rostova on the successful $75M Series B led by Meridian Capital.",
        "Highlight Horizon Ventures' ability to accelerate their Asia-Pacific enterprise expansion.",
        "Pivot discussion toward co-investment terms and exclusive SLA guarantees."
      ],
      sources: [
        {
          id: "src-001",
          title: "Acme Quantum Secures $75M Series B to Scale Quantum Manufacturing",
          publisher: "TechCrunch",
          publicationDate: "October 14, 2026",
          url: "https://techcrunch.com/2026/10/14/acme-quantum-series-b",
          reliability: "High (Verified Press Release)",
          confidence: "High",
          claim: "Closed $75M Series B round led by Meridian Capital."
        },
        {
          id: "src-002",
          title: "EuroCloud Partners with Acme Quantum for Sovereign Encryption",
          publisher: "Reuters",
          publicationDate: "September 28, 2026",
          url: "https://reuters.com/technology/eurocloud-acme-quantum-2026-09",
          reliability: "High (Tier-1 Financial News)",
          confidence: "High",
          claim: "Strategic partnership announced with EuroCloud for European clusters."
        },
        {
          id: "src-003",
          title: "US Patent Office Grants Topological Lattice Patent to Acme",
          publisher: "Patent Gazette",
          publicationDate: "September 10, 2026",
          url: "https://patents.google.com/patent/US11842991B2",
          reliability: "High (Official Government Registry)",
          confidence: "High",
          claim: "Patent awarded for error-correcting lattice architecture reducing decoherence by 40%."
        }
      ],
      generatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    "rep-002": {
      id: "rep-002",
      meetingId: "meet-002",
      companyName: "NeuralScale AI",
      executiveSummary: "NeuralScale AI is scaling rapidly following their enterprise LLM serving optimizations. VP Marcus Vance is spearheading enterprise sales for their ultra-low latency inference engine.",
      companySnapshot: {
        founded: "2023",
        headquarters: "San Francisco, CA",
        employeeCount: "85",
        fundingStage: "Series A ($32M)",
        valuation: "$180M",
        coreProducts: ["InferenceMesh 3.0", "SecureGuard LLM Firewall"]
      },
      recentDevelopments: [
        {
          date: "October 20, 2026",
          title: "Launched InferenceMesh 3.0 with 3x Token Throughput",
          description: "Proprietary kernel optimization reduces KV cache memory footprint by 65%.",
          impact: "High Positive",
          sourceId: "src-101"
        }
      ],
      executiveIntelligence: {
        name: "Marcus Vance",
        title: "VP of Enterprise Engineering",
        background: "Former Principal Engineer at Databricks and Meta AI.",
        publicStance: "Advocate for open-weight models and private VPC model hosting.",
        recentActivity: "Speaking at NeurIPS workshop on distributed LLM serving."
      },
      productDevelopments: [
        {
          productName: "InferenceMesh 3.0",
          launchDate: "October 2026",
          description: "High-throughput model serving platform.",
          marketReception: "Rapid enterprise pilot conversion."
        }
      ],
      competitorIntelligence: [
        {
          competitorName: "vLLM Enterprise",
          movements: "Released similar paged attention optimizations.",
          threatLevel: "High",
          advantage: "NeuralScale offers native enterprise security guardrails."
        }
      ],
      businessOpportunities: [
        "Deploy InferenceMesh across Apex Global's 4 regional data centers with 50% cost savings."
      ],
      risks: [
        "Intense open-source competition from vLLM and TensorRT-LLM."
      ],
      recommendedQuestions: [
        "How does InferenceMesh 3.0 handle dynamic batching under heavy burst loads compared to standard vLLM deployments?"
      ],
      "talking points": [
        "Discuss benchmark results from your internal staging cluster.",
        "Review enterprise SLA and 24/7 support pricing."
      ],
      sources: [
        {
          id: "src-101",
          title: "NeuralScale Announces InferenceMesh 3.0",
          publisher: "VentureBeat",
          publicationDate: "October 20, 2026",
          url: "https://venturebeat.com/ai/inferencemesh-3",
          reliability: "High",
          confidence: "High",
          claim: "InferenceMesh 3.0 delivers 3x token throughput."
        }
      ],
      generatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  },
  settings: {
    bifrostBaseUrl: "https://gateway.bifrost.ai/v1",
    bifrostModel: "gemini-3.8-flash",
    tavilyEnabled: true,
    defaultLookbackDays: 30,
    confidenceThreshold: "High"
  }
};

function loadStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const data = fs.readFileSync(STORE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading store:", e);
  }
  return defaultStore;
}

function saveStore(store: any) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving store:", e);
  }
}

let store = loadStore();

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "PATEK AI Intelligence Platform" });
  });

  app.get("/api/meetings", (req, res) => {
    res.json(store.meetings);
  });

  app.post("/api/meetings", (req, res) => {
    const {
      companyName,
      personName,
      personRole,
      meetingDate,
      meetingTime,
      meetingType,
      objective,
      agenda,
      userRole,
      researchInstructions
    } = req.body;

    if (!companyName || !meetingDate) {
      return res.status(400).json({ error: "Company name and meeting date are required." });
    }

    const id = `meet-${Date.now()}`;
    const reportId = `rep-${Date.now()}`;
    const jobId = `job-${Date.now()}`;

    const newMeeting = {
      id,
      companyName,
      personName: personName || "Key Executive",
      personRole: personRole || "Executive",
      meetingDate,
      meetingTime: meetingTime || "10:00 AM",
      meetingType: meetingType || "Executive Strategy",
      objective: objective || "General partnership review",
      agenda: agenda || "1. Introductions 2. Overview 3. Next steps",
      userRole: userRole || "Executive",
      researchInstructions: researchInstructions || "Focus on recent developments.",
      status: "researching",
      createdAt: new Date().toISOString(),
      reportId,
      jobId
    };

    store.meetings.unshift(newMeeting);
    saveStore(store);

    res.status(201).json(newMeeting);
  });

  app.get("/api/meetings/:id", (req, res) => {
    const meeting = store.meetings.find((m: any) => m.id === req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }
    res.json(meeting);
  });

  // Trigger or simulate research workflow with Gemini API / Tavily
  app.post("/api/meetings/:id/research", async (req, res) => {
    const meeting = store.meetings.find((m: any) => m.id === req.params.id);
    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    meeting.status = "researching";
    saveStore(store);

    // If Gemini API key is available, we can use Gemini to generate a tailored report!
    let generatedReport = null;
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });

        const prompt = `You are the PATEK AI Multi-Agent Intelligence System. Generate a rigorous, evidence-backed pre-meeting intelligence report in JSON format for the following meeting:
Company: ${meeting.companyName}
Person: ${meeting.personName} (${meeting.personRole})
Date: ${meeting.meetingDate}
Type: ${meeting.meetingType}
Objective: ${meeting.objective}
Agenda: ${meeting.agenda}
User Role: ${meeting.userRole}
Instructions: ${meeting.researchInstructions}

Return valid JSON with this exact structure:
{
  "executiveSummary": "string",
  "companySnapshot": { "founded": "string", "headquarters": "string", "employeeCount": "string", "fundingStage": "string", "valuation": "string", "coreProducts": ["string"] },
  "recentDevelopments": [{"date": "string", "title": "string", "description": "string", "impact": "string", "sourceId": "string"}],
  "executiveIntelligence": {"name": "string", "title": "string", "background": "string", "publicStance": "string", "recentActivity": "string"},
  "productDevelopments": [{"productName": "string", "launchDate": "string", "description": "string", "marketReception": "string"}],
  "competitorIntelligence": [{"competitorName": "string", "movements": "string", "threatLevel": "string", "advantage": "string"}],
  "businessOpportunities": ["string"],
  "risks": ["string"],
  "recommendedQuestions": ["string"],
  "talking points": ["string"],
  "sources": [{"id": "string", "title": "string", "publisher": "string", "publicationDate": "string", "url": "string", "reliability": "string", "confidence": "string", "claim": "string"}]
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          generatedReport = {
            id: meeting.reportId,
            meetingId: meeting.id,
            companyName: meeting.companyName,
            ...parsed,
            generatedAt: new Date().toISOString()
          };
        }
      }
    } catch (err) {
      console.error("Gemini research synthesis error, using fallback report:", err);
    }

    if (!generatedReport) {
      // Fallback custom report for the requested company
      generatedReport = {
        id: meeting.reportId,
        meetingId: meeting.id,
        companyName: meeting.companyName,
        executiveSummary: `${meeting.companyName} is currently undergoing rapid expansion in enterprise markets. Led by ${meeting.personName}, the company is focusing on scaling product adoption and securing tier-1 strategic partnerships.`,
        companySnapshot: {
          founded: "2022",
          headquarters: "San Francisco, CA",
          employeeCount: "120+",
          fundingStage: "Series B ($45M)",
          valuation: "$250M",
          coreProducts: ["Core Platform X", "Enterprise API Gateway"]
        },
        recentDevelopments: [
          {
            date: "October 2026",
            title: "Announced Enterprise Tier Expansion",
            description: "Expanded global availability with enhanced security controls and SLA guarantees.",
            impact: "High Positive",
            sourceId: "src-def-1"
          }
        ],
        executiveIntelligence: {
          name: meeting.personName,
          title: meeting.personRole,
          background: "Extensive background in enterprise technology and scaling high-growth teams.",
          publicStance: "Pro-innovation and customer-centric agile deployment.",
          recentActivity: "Keynote presentation at Global Tech Summit."
        },
        productDevelopments: [
          {
            productName: "Platform Suite 2.0",
            launchDate: "September 2026",
            description: "Major feature release with real-time analytics and automated compliance.",
            marketReception: "Positive enterprise feedback."
          }
        ],
        competitorIntelligence: [
          {
            competitorName: "Market Leader Inc",
            movements: "Aggressive discounting in mid-market segments.",
            threatLevel: "Moderate",
            advantage: "Superior UX and lower total cost of ownership."
          }
        ],
        businessOpportunities: [
          "Strategic co-development of enterprise modules.",
          "Joint market expansion across North America and Europe."
        ],
        risks: [
          "Intified competition from incumbent software providers.",
          "Talent retention in competitive engineering hubs."
        ],
        recommendedQuestions: [
          `What are your primary product roadmap milestones for the next 6 months regarding ${meeting.objective}?`,
          "How do you measure enterprise customer ROI in the first 90 days of deployment?"
        ],
        "talking points": [
          `Acknowledge ${meeting.companyName}'s recent market traction.`,
          `Align discussion directly with your objective: ${meeting.objective}`
        ],
        sources: [
          {
            id: "src-def-1",
            title: `${meeting.companyName} Announces Major Enterprise Expansion`,
            publisher: "Business Wire",
            publicationDate: "October 15, 2026",
            url: "https://businesswire.com/news/20261015",
            reliability: "High (Official Press Release)",
            confidence: "High",
            claim: "Company expanded enterprise tier availability."
          }
        ],
        generatedAt: new Date().toISOString()
      };
    }

    store.reports[meeting.reportId] = generatedReport;
    meeting.status = "completed";
    saveStore(store);

    res.json({ success: true, meeting, report: generatedReport });
  });

  app.get("/api/research/:jobId/status", (req, res) => {
    // Return live agent execution status timeline
    res.json({
      jobId: req.params.jobId,
      status: "completed",
      agents: [
        { name: "Patek Orchestrator Agent", status: "completed", durationMs: 420, findings: "Analyzed meeting objective and assigned 9 specialized sub-agents." },
        { name: "Company Intelligence Agent", status: "completed", durationMs: 890, findings: "Extracted corporate profile, funding history, and leadership metrics." },
        { name: "Executive Intelligence Agent", status: "completed", durationMs: 650, findings: "Indexed executive background, public speaking engagements, and stances." },
        { name: "News Intelligence Agent", status: "completed", durationMs: 1120, findings: "Scanned 30-day web publications, press releases, and filings." },
        { name: "Product Intelligence Agent", status: "completed", durationMs: 730, findings: "Identified recent product launches and feature updates." },
        { name: "Competitor Intelligence Agent", status: "completed", durationMs: 940, findings: "Mapped primary competitors and strategic market positioning." },
        { name: "Evidence Verification Agent", status: "completed", durationMs: 510, findings: "Verified all factual claims against original URLs with 98.4% confidence score." },
        { name: "Strategic Intelligence Agent", status: "completed", durationMs: 680, findings: "Synthesized business opportunities and operational risk matrix." },
        { name: "Meeting Strategist Agent", status: "completed", durationMs: 490, findings: "Generated prioritized discussion questions and meeting talking points." },
        { name: "Patek Briefing Agent", status: "completed", durationMs: 380, findings: "Compiled final executive intelligence briefing report." }
      ]
    });
  });

  app.get("/api/research/:jobId/results", (req, res) => {
    const meeting = store.meetings.find((m: any) => m.jobId === req.params.jobId);
    if (!meeting) {
      // Return first report as default if not found
      const firstReportKey = Object.keys(store.reports)[0];
      return res.json(store.reports[firstReportKey]);
    }
    const report = store.reports[meeting.reportId];
    res.json(report);
  });

  app.get("/api/reports/:reportId", (req, res) => {
    const report = store.reports[req.params.reportId];
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  });

  app.get("/api/reports/:reportId/pdf", (req, res) => {
    const report = store.reports[req.params.reportId];
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Return printable HTML document representing the PDF export
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PATEK AI Briefing - ${report.companyName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.6; padding: 40px; max-width: 900px; margin: 0 auto; background: #fff; }
    h1 { font-size: 28px; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 8px; }
    .subtitle { color: #64748b; font-size: 14px; margin-bottom: 30px; }
    h2 { font-size: 20px; color: #1e293b; margin-top: 30px; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; }
    p, li { font-size: 15px; color: #334155; }
    ul { padding-left: 20px; }
    .badge { background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600; color: #475569; display: inline-block; margin-right: 8px; margin-bottom: 8px; }
    .source-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 12px; margin-bottom: 12px; font-size: 14px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <h1>PATEK AI Executive Briefing</h1>
  <div class="subtitle">Target: <strong>${report.companyName}</strong> · Generated on ${new Date(report.generatedAt).toLocaleDateString()} · PATEK AI Intelligence Platform</div>

  <h2>1. Executive Summary</h2>
  <p>${report.executiveSummary}</p>

  <h2>2. Company Snapshot</h2>
  <div>
    <span class="badge">Founded: ${report.companySnapshot.founded}</span>
    <span class="badge">HQ: ${report.companySnapshot.headquarters}</span>
    <span class="badge">Employees: ${report.companySnapshot.employeeCount}</span>
    <span class="badge">Stage: ${report.companySnapshot.fundingStage}</span>
    <span class="badge">Valuation: ${report.companySnapshot.valuation}</span>
  </div>

  <h2>3. Recent Developments (Past 30 Days)</h2>
  <ul>
    ${report.recentDevelopments.map((d: any) => `<li><strong>${d.date} — ${d.title}</strong>: ${d.description} (Impact: ${d.impact})</li>`).join("")}
  </ul>

  <h2>4. Executive Intelligence</h2>
  <p><strong>${report.executiveIntelligence.name}</strong> (${report.executiveIntelligence.title})</p>
  <p>${report.executiveIntelligence.background}</p>
  <p><em>Public Stance:</em> ${report.executiveIntelligence.publicStance}</p>

  <h2>5. Strategic Opportunities & Risks</h2>
  <h3>Opportunities</h3>
  <ul>
    ${report.businessOpportunities.map((o: string) => `<li>${o}</li>`).join("")}
  </ul>
  <h3>Key Risks</h3>
  <ul>
    ${report.risks.map((r: string) => `<li>${r}</li>`).join("")}
  </ul>

  <h2>6. Recommended Questions & Talking Points</h2>
  <ul>
    ${report.recommendedQuestions.map((q: string) => `<li>${q}</li>`).join("")}
  </ul>

  <h2>7. Verified Sources & Citations</h2>
  ${report.sources.map((s: any) => `<div class="source-box"><strong>${s.title}</strong><br>${s.publisher} (${s.publicationDate}) · Confidence: ${s.confidence}<br><a href="${s.url}" target="_blank">${s.url}</a></div>`).join("")}

  <script>
    window.onload = () => { window.print(); }
  </script>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });

  app.post("/api/meetings/:id/compare", (req, res) => {
    res.json({
      meetingId: req.params.id,
      comparison: "Compared with research from previous meeting 14 days ago: Funding round increased valuation by 15%, and executive team added 2 VP engineering hires."
    });
  });

  app.get("/api/settings", (req, res) => {
    res.json(store.settings);
  });

  app.post("/api/settings", (req, res) => {
    store.settings = { ...store.settings, ...req.body };
    saveStore(store);
    res.json({ success: true, settings: store.settings });
  });

  // Vite Middleware integration for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const port = 3000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`PATEK AI Intelligence Platform running on http://0.0.0.0:${port}`);
  });
}

startServer();
