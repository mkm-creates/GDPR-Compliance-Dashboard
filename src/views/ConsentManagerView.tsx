import { useState } from "react";
import { Check, Shield, Activity, Bell, FileText, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  state: {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    biometric: boolean;
  };
}

interface ConsentManagerProps {
  onNavigate?: (tab: string) => void;
}

export function ConsentManagerView({ onNavigate }: ConsentManagerProps) {
  const [consents, setConsents] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    biometric: false,
  });

  const [auditLog, setAuditLog] = useState<AuditEntry[]>([
    {
       id: "TN-8492-BX",
       timestamp: new Date(Date.now() - 3600 * 1000).toISOString().replace('T', ' ').substring(0, 19),
       action: "Initialized",
       state: { essential: true, analytics: false, marketing: false, biometric: false }
    }
  ]);

  const [saved, setSaved] = useState(false);

  const handleSave = (newConsents: typeof consents = consents) => {
    setSaved(true);
    
    const newEntry: AuditEntry = {
      id: "TN-8492-BX",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: "Updated",
      state: { ...newConsents }
    };
    setAuditLog(prev => [newEntry, ...prev]);

    setTimeout(() => setSaved(false), 3000);
  };

  const handleRejectAll = () => {
    const newConsents = { essential: true, analytics: false, marketing: false, biometric: false };
    setConsents(newConsents);
    handleSave(newConsents);
  };

  const handleExportCSV = () => {
    const headers = "Timestamp,SessionID,Action,Essential,Analytics,Marketing,Biometric\\n";
    const rows = auditLog.map(entry => 
      `${entry.timestamp},${entry.id},${entry.action},${entry.state.essential},${entry.state.analytics},${entry.state.marketing},${entry.state.biometric}`
    ).join("\\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'consent-audit-log.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 animate-in fade-in duration-700 max-w-7xl mx-auto flex flex-col font-sans mb-12">
      <div className="flex justify-between items-end mb-8 border-b-2 border-bento-dark pb-4">
        <div>
           <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">
             User Preference Core
           </p>
           <h1 className="text-4xl font-serif italic font-medium text-bento-text">
             Consent Management
           </h1>
        </div>
        <div className="text-right">
           <div className="inline-flex items-center px-3 py-1 bg-bento-dark text-white rounded-full text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#BF8B4D]">
             GDPR Art. 7 Module
           </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
         <div className="col-span-2 border-2 border-bento-dark p-8 bg-white shadow-[4px_4px_0px_0px_#2D2D2D] relative">
            {saved && (
               <div className="absolute top-4 right-4 bg-bento-green text-white px-4 py-2 border-2 border-bento-dark text-[10px] font-bold uppercase tracking-widest flex items-center animate-in fade-in slide-in-from-top-4">
                  <Check size={14} className="mr-2" /> Preferences Synced
               </div>
            )}
            
            <h2 className="text-2xl font-serif italic mb-2">Your Privacy Choices</h2>
            <p className="text-sm font-medium opacity-70 mb-8 border-b border-bento-dark/20 pb-6">
              Temple believes in total transparency. We request data solely to power your neurotech experience and improve product performance. Manage your consent below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                 <div className="pt-1"><Shield className="text-bento-dark" /></div>
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                       <h3 className="text-sm font-bold uppercase tracking-wider">Essential Functions</h3>
                       <span className="text-[10px] bg-black/10 px-2 py-0.5 font-bold uppercase">Required</span>
                    </div>
                    <p className="text-xs opacity-80 mb-1"><strong>Benefit:</strong> Necessary for core application functionality, device pairing, and basic account services. Cannot be disabled.</p>
                    <p className="text-xs opacity-80 mb-2"><strong>Data Processed:</strong> Account identifiers, pairing credentials, and authentication tokens.</p>
                    <button onClick={() => onNavigate && onNavigate('policy')} className="text-[10px] uppercase font-bold text-bento-dark underline underline-offset-2 hover:text-bento-green">See Privacy Policy</button>
                 </div>
                 <div className="pt-1">
                   <div className="w-12 h-6 bg-bento-green border-2 border-bento-dark flex justify-end items-center px-1">
                     <div className="w-4 h-4 bg-white border-2 border-bento-dark" />
                   </div>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="pt-1"><Activity className="text-bento-dark" /></div>
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                       <h3 className="text-sm font-bold uppercase tracking-wider">Telemetry & Analytics</h3>
                    </div>
                    <p className="text-xs opacity-80 mb-1"><strong>Benefit:</strong> Helps us improve device connectivity and app stability by sharing anonymized usage and diagnostic data from your Temple headband.</p>
                    <p className="text-xs opacity-80 mb-2"><strong>Data Processed:</strong> Crash logs, app interaction events, and device performance metrics.</p>
                    <button onClick={() => onNavigate && onNavigate('policy')} className="text-[10px] uppercase font-bold text-bento-dark underline underline-offset-2 hover:text-bento-green">See Privacy Policy</button>
                 </div>
                 <div className="pt-1 cursor-pointer" onClick={() => setConsents(prev => ({ ...prev, analytics: !prev.analytics }))}>
                   <div className={cn("w-12 h-6 border-2 border-bento-dark flex items-center px-1 transition-colors", consents.analytics ? "bg-bento-green justify-end" : "bg-bento-bg/50 justify-start")}>
                     <div className="w-4 h-4 bg-white border-2 border-bento-dark" />
                   </div>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="pt-1"><Bell className="text-bento-dark" /></div>
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                       <h3 className="text-sm font-bold uppercase tracking-wider">Product Communications</h3>
                    </div>
                    <p className="text-xs opacity-80 mb-1"><strong>Benefit:</strong> Stay informed. Receive product updates, new research findings, algorithm updates, and feature announcements directly.</p>
                    <p className="text-xs opacity-80 mb-2"><strong>Data Processed:</strong> Email address and interaction history with our communications.</p>
                    <button onClick={() => onNavigate && onNavigate('policy')} className="text-[10px] uppercase font-bold text-bento-dark underline underline-offset-2 hover:text-bento-green">See Privacy Policy</button>
                 </div>
                 <div className="pt-1 cursor-pointer" onClick={() => setConsents(prev => ({ ...prev, marketing: !prev.marketing }))}>
                   <div className={cn("w-12 h-6 border-2 border-bento-dark flex items-center px-1 transition-colors", consents.marketing ? "bg-bento-green justify-end" : "bg-bento-bg/50 justify-start")}>
                     <div className="w-4 h-4 bg-white border-2 border-bento-dark" />
                   </div>
                 </div>
              </div>

              <div className="flex items-start gap-4 pb-6 border-b border-bento-dark/20">
                 <div className="pt-1"><Database className="text-bento-gold" /></div>
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                       <h3 className="text-sm font-bold uppercase tracking-wider text-bento-gold">Special Category: Neurodata</h3>
                    </div>
                    <p className="text-xs opacity-80 mb-1"><strong>Benefit:</strong> Enable personalized cognitive insights by synchronizing physiological and neural signals (stress, focus, and fatigue) from your Temple device.</p>
                    <p className="text-xs opacity-80 mb-2"><strong>Data Processed:</strong> Raw EEG, heart rate variance, acceleration, and derived cognitive states under strict Art. 9 GDPR safeguards.</p>
                    <button onClick={() => onNavigate && onNavigate('policy')} className="text-[10px] uppercase font-bold text-bento-gold underline underline-offset-2 hover:text-bento-green">See Privacy Policy</button>
                 </div>
                 <div className="pt-1 cursor-pointer" onClick={() => setConsents(prev => ({ ...prev, biometric: !prev.biometric }))}>
                   <div className={cn("w-12 h-6 border-2 border-bento-dark flex items-center px-1 transition-colors", consents.biometric ? "bg-bento-gold justify-end" : "bg-bento-bg/50 justify-start")}>
                     <div className="w-4 h-4 bg-white border-2 border-bento-dark" />
                   </div>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                 <span className="text-xs opacity-60 font-mono">Session ID: TN-8492-BX</span>
                 <div className="flex gap-4">
                    <button onClick={handleRejectAll} className="px-6 py-2 border-2 border-bento-dark text-[10px] font-bold uppercase tracking-widest hover:bg-bento-bg">
                       Reject All Optional
                    </button>
                    <button onClick={() => handleSave()} className="px-6 py-2 border-2 border-bento-dark bg-bento-dark text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black shadow-[2px_2px_0px_0px_#BF8B4D]">
                       Save Preferences
                    </button>
                 </div>
              </div>

            </div>

            <div className="mt-12 pt-8 border-t-2 border-bento-dark">
               <h3 className="text-lg font-serif italic mb-4">Your Consent History</h3>
               <p className="text-xs opacity-70 mb-4">A record of your past privacy decisions and when they were made.</p>
               <div className="space-y-3">
                 {auditLog.map((log, i) => (
                   <div key={i} className="flex justify-between items-center p-3 border border-bento-dark/20 bg-bento-bg">
                     <div className="text-[10px] font-mono opacity-60">{log.timestamp}</div>
                     <div className="flex gap-2">
                       <span className={cn("text-[9px] px-1.5 py-0.5 border border-bento-dark/20", log.state.essential ? "bg-bento-green/20" : "")}>Essential</span>
                       <span className={cn("text-[9px] px-1.5 py-0.5 border border-bento-dark/20", log.state.analytics ? "bg-bento-green/20" : "")}>Analytics</span>
                       <span className={cn("text-[9px] px-1.5 py-0.5 border border-bento-dark/20", log.state.marketing ? "bg-bento-green/20" : "")}>Marketing</span>
                       <span className={cn("text-[9px] px-1.5 py-0.5 border border-bento-dark/20", log.state.biometric ? "bg-bento-gold/20" : "")}>Neurodata</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
         </div>

         <div className="col-span-1 border-2 border-bento-dark p-6 bg-bento-card-tan shadow-[4px_4px_0px_0px_#2D2D2D] flex flex-col h-[600px]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest">Audit Registry Log</h3>
                <FileText size={16} />
             </div>

             <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {auditLog.map((log, i) => (
                  <div key={i} className="bg-white border-2 border-bento-dark p-3 shadow-[2px_2px_0px_0px_#2D2D2D]">
                     <div className="flex justify-between mb-1">
                        <span className="text-[9px] font-mono opacity-60">{log.timestamp}</span>
                        <span className={cn("text-[9px] font-bold tracking-widest uppercase", log.action === "Updated" ? "text-bento-green" : "text-bento-dark")}>
                          {log.action}
                        </span>
                     </div>
                     <p className="text-xs font-bold font-mono text-bento-dark mb-2">ID: {log.id}</p>
                     <div className="flex gap-2 flex-wrap">
                        <span className="text-[8px] border border-bento-dark px-1 bg-black/5">ESSN: {log.state.essential ? "Y" : "N"}</span>
                        <span className="text-[8px] border border-bento-dark px-1 bg-black/5">ANLY: {log.state.analytics ? "Y" : "N"}</span>
                        <span className="text-[8px] border border-bento-dark px-1 bg-black/5">MKTG: {log.state.marketing ? "Y" : "N"}</span>
                        <span className={cn("text-[8px] border border-bento-dark px-1", log.state.biometric ? "bg-bento-gold/20" : "bg-black/5")}>BIOM: {log.state.biometric ? "Y" : "N"}</span>
                     </div>
                  </div>
                ))}
             </div>

             <button onClick={handleExportCSV} className="w-full mt-4 py-2 border-2 border-bento-dark bg-white text-bento-dark text-[10px] font-bold uppercase tracking-widest hover:bg-bento-bg transition-colors">
               Export CSV Audit
             </button>
         </div>
      </div>
    </div>
  );
}
