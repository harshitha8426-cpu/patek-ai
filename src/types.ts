export interface Meeting {
  id: string;
  companyName: string;
  personName: string;
  personRole: string;
  meetingDate: string;
  meetingTime: string;
  meetingType: string;
  objective: string;
  agenda: string;
  userRole: string;
  researchInstructions: string;
  status: 'scheduled' | 'researching' | 'completed' | 'failed';
  createdAt: string;
  reportId: string;
  jobId: string;
}

export interface Source {
  id: string;
  title: string;
  publisher: string;
  publicationDate: string;
  url: string;
  reliability: string;
  confidence: string;
  claim: string;
}

export interface Development {
  date: string;
  title: string;
  description: string;
  impact: string;
  sourceId: string;
}

export interface Executive {
  name: string;
  title: string;
  background: string;
  publicStance: string;
  recentActivity: string;
}

export interface ProductDev {
  productName: string;
  launchDate: string;
  description: string;
  marketReception: string;
}

export interface Competitor {
  competitorName: string;
  movements: string;
  threatLevel: string;
  advantage: string;
}

export interface IntelligenceReport {
  id: string;
  meetingId: string;
  companyName: string;
  executiveSummary: string;
  companySnapshot: {
    founded: string;
    headquarters: string;
    employeeCount: string;
    fundingStage: string;
    valuation: string;
    coreProducts: string[];
  };
  recentDevelopments: Development[];
  executiveIntelligence: Executive;
  productDevelopments: ProductDev[];
  competitorIntelligence: Competitor[];
  businessOpportunities: string[];
  risks: string[];
  recommendedQuestions: string[];
  "talking points": string[];
  sources: Source[];
  generatedAt: string;
}

export interface AgentStatus {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  durationMs: number;
  findings: string;
}
