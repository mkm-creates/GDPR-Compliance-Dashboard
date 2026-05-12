import { Activity, ShieldCheck, FileText, CheckSquare, UserCog, Network, Database } from "lucide-react";

export const navItems = [
  { id: "dashboard", label: "EU LAUNCH READINESS", icon: ShieldCheck },
  { id: "operations", label: "PRIVACY OPS", icon: Activity },
];

export const sidebarItems = [
  { id: "dashboard", label: "GDPR DASHBOARD", icon: Activity },
  { id: "matrix", label: "COMPLIANCE MATRIX", icon: Database },
  { id: "ropa", label: "ROPA & DPIA", icon: Network },
  { id: "policy", label: "PRIVACY POLICY", icon: FileText },
  { id: "consent", label: "CONSENT MANAGER", icon: CheckSquare },
  { id: "rights", label: "DSAR OPERATIONS", icon: UserCog },
];

