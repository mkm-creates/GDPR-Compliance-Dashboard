import { useState, useMemo } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopNav } from "./components/TopNav";
import { DashboardView } from "./views/DashboardView";
import { OperationsView } from "./views/OperationsView";
import { PrivacyPolicyView } from "./views/PrivacyPolicyView";
import { ConsentManagerView } from "./views/ConsentManagerView";
import { SubjectRightsView } from "./views/SubjectRightsView";
import { ComplianceMatrixView } from "./views/ComplianceMatrixView";
import { RopaView } from "./views/RopaView";
import { initialComplianceData, ComplianceArticle } from "./data/compliance";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [complianceData, setComplianceData] = useState<ComplianceArticle[]>(initialComplianceData);

  const handleToggleComplianceStep = (artId: string, stepId: string) => {
    setComplianceData(prev => prev.map(art => {
      if(art.art === artId) {
        const newSteps = art.steps.map(s => s.id === stepId ? { ...s, done: !s.done } : s);
        const completion = Math.round((newSteps.filter(s => s.done).length / newSteps.length) * 100);
        const status = completion === 100 ? "ok" : "warn";
        return { ...art, steps: newSteps, completion, status };
      }
      return art;
    }));
  };

  const launchReadiness = useMemo(() => {
    return Math.round(complianceData.reduce((acc, curr) => acc + curr.completion, 0) / complianceData.length);
  }, [complianceData]);

  return (
    <div className="flex h-screen overflow-hidden bg-bento-bg text-bento-text">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <TopNav activeTab={activeTab} onTabChange={setActiveTab} className="z-10 bg-bento-bg sticky top-0" />
        
        <main className="flex-1 z-10">
          {activeTab === "dashboard" && <DashboardView onNavigate={setActiveTab} complianceData={complianceData} readinessScore={launchReadiness} />}
          {activeTab === "operations" && <OperationsView onNavigate={setActiveTab} readinessScore={launchReadiness} />}
          {activeTab === "matrix" && <ComplianceMatrixView complianceData={complianceData} onToggleStep={handleToggleComplianceStep} />}
          {activeTab === "ropa" && <RopaView />}
          {activeTab === "policy" && <PrivacyPolicyView />}
          {activeTab === "consent" && <ConsentManagerView onNavigate={setActiveTab} />}
          {activeTab === "rights" && <SubjectRightsView />}
        </main>

        <footer className="py-8 text-center text-[10px] text-bento-text/50 tracking-widest font-bold uppercase border-t-2 border-bento-text/10 z-10 bg-bento-bg mt-auto">
           <div className="flex items-center justify-center gap-8 mb-4">
              <button onClick={() => alert('Secure session terminated.')} className="hover:text-bento-text transition-colors">Secure_Logout</button>
              <button onClick={() => setActiveTab('policy')} className="hover:text-bento-text transition-colors">Legal_Framework</button>
              <button onClick={() => alert('Opening encrypted support channel...')} className="hover:text-bento-text transition-colors">Support_Encrypted</button>
           </div>
           <p className="font-mono">Temple Neurotechnology &copy; 2026. High-Precision Compliance.</p>
        </footer>
      </div>
    </div>
  );
}
