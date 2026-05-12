export interface ComplianceStep {
  id: string;
  task: string;
  done: boolean;
}

export interface ComplianceArticle {
  art: string;
  desc: string;
  status: "ok" | "warn";
  owner: string;
  completion: number;
  steps: ComplianceStep[];
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  penalty: string;
}

export const initialComplianceData: ComplianceArticle[] = [
  {
    art: "Art. 6 & 9",
    desc: "Lawfulness & Special Category Data",
    status: "ok",
    owner: "Legal",
    completion: 100,
    riskLevel: "Critical",
    penalty: "Up to €20M or 4% of Global Turnover",
    steps: [
      { id: "s1", task: "Document lawful basis for generic data (Legitimate Interest/Contract)", done: true },
      { id: "s2", task: "Implement explicit 'opt-in' consent for biometric neurodata (Art. 9)", done: true },
      { id: "s3", task: "Isolate Article 9 biometric streams in separate encrypted DB clusters", done: true }
    ]
  },
  {
    art: "Art. 12-22",
    desc: "Data Subject Rights (DSAR Workflows)",
    status: "warn",
    owner: "Ops",
    completion: 33,
    riskLevel: "High",
    penalty: "Up to €20M or 4% of Global Turnover",
    steps: [
      { id: "s4", task: "Automated Data Access (Art. 15) JSON export pipeline", done: true },
      { id: "s5", task: "Mathematical verification for irreversible biometric data erasure (Art. 17)", done: false },
      { id: "s6", task: "Identity Verification via OTP before fulfilling DSAR", done: false }
    ]
  },
  {
    art: "Art. 25",
    desc: "Privacy by Design & Default",
    status: "ok",
    owner: "Eng",
    completion: 100,
    riskLevel: "High",
    penalty: "Up to €10M or 2% of Global Turnover",
    steps: [
      { id: "s7", task: "Default device telemetry settings to 'Off' for new Temple headbands", done: true },
      { id: "s8", task: "Pseudonymize headband diagnostic streams at mobile gateway level", done: true }
    ]
  },
  {
    art: "Art. 28",
    desc: "Processor Vendor DPAs",
    status: "warn",
    owner: "Legal",
    completion: 50,
    riskLevel: "Medium",
    penalty: "Up to €10M or 2% of Global Turnover",
    steps: [
      { id: "s9", task: "Execute Data Processing Agreement with Cloud EU Hosting Provider", done: true },
      { id: "s10", task: "Execute DPA with external ML Analytics Vendor (India)", done: false }
    ]
  },
  {
    art: "Art. 30",
    desc: "Record of Processing Activities (ROPA)",
    status: "ok",
    owner: "DPO",
    completion: 100,
    riskLevel: "Medium",
    penalty: "Up to €10M or 2% of Global Turnover",
    steps: [
      { id: "s11", task: "Map device-to-cloud data flows for cognitive APIs", done: true },
      { id: "s12", task: "Document strict data retention schedules for neuro-insights", done: true }
    ]
  },
  {
    art: "Art. 32",
    desc: "Security of Processing",
    status: "ok",
    owner: "Sec",
    completion: 100,
    riskLevel: "Critical",
    penalty: "Up to €10M or 2% of Global Turnover (plus Breach costs)",
    steps: [
      { id: "s13", task: "AES-256 Encryption at Rest for all biometric databases", done: true },
      { id: "s14", task: "TLS 1.3 for data in transit (Headband -> App -> Cloud)", done: true },
      { id: "s15", task: "Zero-trust IAM policy review for engineering access", done: true }
    ]
  },
  {
    art: "Art. 33-34",
    desc: "Data Breach Notification",
    status: "warn",
    owner: "Sec",
    completion: 67,
    riskLevel: "Critical",
    penalty: "Up to €10M or 2% of Global Turnover (Failure to notify)",
    steps: [
      { id: "s16", task: "Internal incident response playbook established", done: true },
      { id: "s17", task: "72-hour regulatory notification template prepared for Supervisory Authority", done: true },
      { id: "s18", task: "Automated communication trigger for high-risk biometric breaches to users", done: false }
    ]
  },
  {
    art: "Art. 35",
    desc: "Data Protection Impact Assessments",
    status: "warn",
    owner: "Legal",
    completion: 33,
    riskLevel: "High",
    penalty: "Up to €10M or 2% of Global Turnover",
    steps: [
      { id: "s19", task: "Identify high-risk processing operations (AI stress algorithms)", done: true },
      { id: "s20", task: "Draft DPIA for core ML Analytics Engine processing EU data", done: false },
      { id: "s21", task: "Consult DPO and document risk mitigation strategies", done: false }
    ]
  },
  {
    art: "Art. 44-49",
    desc: "Cross-Border Transfers",
    status: "warn",
    owner: "Legal",
    completion: 33,
    riskLevel: "High",
    penalty: "Up to €20M or 4% of Global Turnover (Repatriation of data)",
    steps: [
      { id: "s22", task: "Identify non-EEA data flows (e.g., India ML Engine offloading)", done: true },
      { id: "s23", task: "Execute Standard Contractual Clauses (SCCs)", done: false },
      { id: "s24", task: "Implement Transfer Impact Assessment (TIA) matching Schrems II", done: false }
    ]
  },
];
