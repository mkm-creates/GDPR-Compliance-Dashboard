import { useState, useEffect } from "react";
import { Download, Trash2, Search, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QueueItem {
  id: string;
  type: string;
  progress: number;
  timeRemSeconds: number;
  status: "pending" | "processing" | "completed";
  createdAt: string;
  completedAt?: string;
}

export function SubjectRightsView() {
  const [activeForm, setActiveForm] = useState<"access" | "erasure" | null>(null);
  
  const [email, setEmail] = useState("");
  const [exportFormat, setExportFormat] = useState("JSON Standard Export");
  
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: "REQ-890-ACC", type: "Access", progress: 65, timeRemSeconds: 345600, status: "processing", createdAt: "04:30Z" },
    { id: "REQ-891-ERS", type: "Erasure", progress: 12, timeRemSeconds: 1555200, status: "processing", createdAt: "04:12Z" },
    { id: "REQ-885-ACC", type: "Access", progress: 100, timeRemSeconds: 0, status: "completed", createdAt: "03:15Z", completedAt: "05:10Z" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQueue(prev => prev.map(item => {
        if (item.status === "completed") return item;

        // Speed multiplier to make the UI look alive for demo purposes
        const speedMultiplier = 1500; 
        const newRem = Math.max(0, item.timeRemSeconds - speedMultiplier);
        
        // Smoothly increase progress
        const newProgress = Math.min(100, item.progress + 6.1);

        if (newProgress >= 100 || newRem <= 0) {
           return { 
             ...item, 
             progress: 100, 
             timeRemSeconds: 0, 
             status: "completed",
             completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) + "Z"
           };
        }
        
        const newStatus = newProgress > 0 && newProgress < 100 ? "processing" : "pending";
        return { ...item, progress: newProgress, timeRemSeconds: newRem, status: newStatus };
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "Completing...";
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (days > 0) return `${days}d ${hrs}h rem.`;
    if (hrs > 0) return `${hrs}h ${mins}m rem.`;
    if (mins > 0) return `${mins}m ${secs}s rem.`;
    return `${secs}s rem.`;
  };

  const [notification, setNotification] = useState("");
  
  const handleErasure = () => {
    if (!email.includes("@")) {
      setNotification("Error: Please enter a valid email address.");
      setTimeout(() => setNotification(""), 3000);
      return;
    }
    
    setQueue(prev => [
      { id: `REQ-${Math.floor(Math.random() * 1000)}-ERS`, type: "Erasure", progress: 0, timeRemSeconds: 2592000, status: "pending", createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) + "Z" },
      ...prev
    ]);
    setEmail("");
    setActiveForm(null);
    setNotification("Success: Erasure protocol requested. You will receive an SMS OTP to confirm.");
    setTimeout(() => setNotification(""), 5000);
  };
  
  const handleAccess = () => {
    setQueue(prev => [
      { id: `REQ-${Math.floor(Math.random() * 1000)}-ACC`, type: "Access", progress: 0, timeRemSeconds: 2592000, status: "pending", createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) + "Z" },
      ...prev
    ]);
    setActiveForm(null);
    setNotification(`Success: Data access requested for format: ${exportFormat}.`);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleAdminOverride = () => {
    setNotification("Administrative Override Initiated - Awaiting Manager Approval.");
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="p-8 animate-in fade-in duration-700 max-w-7xl mx-auto flex flex-col font-sans mb-12">
      <div className="flex justify-between items-end mb-8 border-b-2 border-bento-dark pb-4">
        <div>
           <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">
             GDPR Governance Center
           </p>
           <h1 className="text-4xl font-serif italic font-medium text-bento-text">
             Data Subject Rights
           </h1>
        </div>
        <div className="text-right">
           <div className="inline-flex items-center px-3 py-1 bg-bento-green text-white rounded-full text-xs font-bold hover:bg-green-700 transition cursor-pointer shadow-[2px_2px_0px_0px_#2D2D2D]">
             Identity Verified
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
         <div className="col-span-1 border-2 border-bento-dark p-8 bg-bento-card-green shadow-[4px_4px_0px_0px_#2D2D2D] relative min-h-[600px]">
            {notification && (
              <div className={cn("absolute top-4 left-4 right-4 border-2 border-bento-dark p-3 text-center text-xs font-bold shadow-[2px_2px_0px_0px_#2D2D2D] animate-in fade-in slide-in-from-top-2 z-10", 
                 notification.startsWith("Error:") ? "bg-red-100 text-red-700" : "bg-white text-bento-dark"
              )}>
                {notification}
              </div>
            )}
            <h2 className="text-2xl font-serif italic mb-2">Submit a Request</h2>
            <p className="text-sm font-medium opacity-70 mb-8 border-b-2 border-bento-dark/10 pb-6">
              Exercise your rights under the GDPR. We endeavor to fulfill all requests within 30 days. Action requires identity verification via SMS OTP.
            </p>

            <div className="space-y-6">
               <button 
                  onClick={() => setActiveForm("access")}
                  className={cn("w-full flex items-center justify-between p-4 border-2 hover:-translate-y-1 transition-all shadow-[2px_2px_0px_0px_#2D2D2D]", activeForm === "access" ? "border-bento-green bg-white ring-2 ring-bento-green/20" : "border-bento-dark bg-white")}
               >
                 <div className="flex flex-col items-start">
                   <div className="flex items-center gap-2 mb-1">
                      <Download size={18} />
                      <span className="font-bold uppercase tracking-widest text-xs">Request Data Access</span>
                   </div>
                   <span className="text-[11px] opacity-70">Receive a copy of your personal data.</span>
                 </div>
                 <div className="text-[10px] font-bold font-mono px-2 py-1 bg-black/5 border border-bento-dark">ART. 15</div>
               </button>

               <button 
                  onClick={() => setActiveForm("erasure")}
                  className={cn("w-full flex items-center justify-between p-4 border-2 hover:-translate-y-1 transition-all shadow-[2px_2px_0px_0px_#2D2D2D]", activeForm === "erasure" ? "border-red-500 ring-2 ring-red-500/20 bg-[#FFF5F5]" : "border-bento-dark bg-[#FFF5F5]")}
               >
                 <div className="flex flex-col items-start">
                   <div className="flex items-center gap-2 mb-1 text-red-600">
                      <Trash2 size={18} />
                      <span className="font-bold uppercase tracking-widest text-xs">Request Erasure</span>
                   </div>
                   <span className="text-[11px] opacity-70 text-red-800">Complete deletion of account & records.</span>
                 </div>
                 <div className="text-[10px] font-bold font-mono px-2 py-1 bg-red-100 text-red-700 border border-red-300">ART. 17</div>
               </button>
            </div>

            {activeForm === "erasure" && (
               <div className="mt-8 p-6 border-2 border-red-500 bg-white animate-in slide-in-from-top-4">
                 <h4 className="font-bold text-red-600 text-sm mb-2 flex items-center gap-2"><AlertCircle size={16}/> Warning: Irreversible Action</h4>
                 <p className="text-xs opacity-80 mb-4 font-medium leading-relaxed">
                   Erasure covers all identity data, payment histories, and derived biometric datasets. Deletion is mathematically verified and irreversible.
                 </p>
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Confirm your account email" className="w-full p-2 border-2 border-bento-dark bg-bento-bg text-xs mb-4 outline-none focus:border-red-500 font-mono" />
                 <button onClick={handleErasure} className="w-full py-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest border-2 border-bento-dark shadow-[2px_2px_0px_0px_#2D2D2D] hover:bg-red-700">
                   Confirm Erasure Protocol
                 </button>
               </div>
            )}
            
            {activeForm === "access" && (
               <div className="mt-8 p-6 border-2 border-bento-dark bg-white animate-in slide-in-from-top-4">
                 <h4 className="font-bold text-bento-dark text-sm mb-2">Select Export Format</h4>
                 <select 
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-full p-2 border-2 border-bento-dark bg-bento-bg text-xs mb-4 outline-none font-mono">
                    <option>JSON Standard Export</option>
                    <option>CSV (No Neural Datasets)</option>
                    <option>BIDS / EDF+ (Full Export)</option>
                 </select>
                 <button onClick={handleAccess} className="w-full py-3 bg-bento-dark text-white text-[10px] font-bold uppercase tracking-widest border-2 border-bento-dark shadow-[2px_2px_0px_0px_#BF8B4D] hover:bg-black">
                   Initiate Data Compilation
                 </button>
               </div>
            )}
         </div>

         <div className="col-span-1 border-2 border-bento-dark p-8 bg-white shadow-[4px_4px_0px_0px_#2D2D2D] flex flex-col min-h-[600px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif italic">Active Queue</h2>
              <div className="flex items-center gap-2 text-bento-dark/50 hover:text-bento-dark cursor-pointer" onClick={() => alert("Search capability connected to production logs.")}>
                 <Search size={18} />
              </div>
            </div>

            <div className="space-y-4 flex-1 h-[400px] overflow-y-auto pr-2">
               {queue.map(item => (
                 <div key={item.id} className={cn("border-2 p-4", 
                    item.status === "completed" ? "border-bento-dark bg-bento-green text-white" :
                    item.type === "Erasure" ? "border-red-500 bg-red-50" : "border-bento-dark bg-bento-bg"
                 )}>
                     <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                         <span className={cn("text-[10px] font-bold font-mono",
                            item.status === "completed" ? "opacity-80" :
                            item.type === "Erasure" ? "text-red-600 opacity-80" : "text-bento-dark opacity-70"
                         )}>{item.id}</span>
                         <span className={cn("text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 border", 
                            item.status === "completed" ? "border-white/50 text-white" :
                            item.status === "processing" ? "border-orange-500 text-orange-600 bg-white" :
                            item.type === "Erasure" ? "border-red-500 text-red-600 bg-white" : "border-bento-dark/50 bg-white text-bento-dark/80"
                         )}>{item.status}</span>
                       </div>
                       <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border", 
                          item.status === "completed" ? "border-white text-white" :
                          item.type === "Erasure" ? "border-red-500 text-red-600 bg-white" : "border-bento-dark bg-white text-bento-dark"
                       )}>{item.type}</span>
                    </div>
                    {item.status !== "completed" ? (
                      <div className="flex justify-between items-center mt-4">
                         <div className={cn("w-32 h-1.5 rounded-full overflow-hidden border",
                            item.type === "Erasure" ? "bg-red-200 border-red-300" : "bg-bento-dark/10 border-bento-dark/20"
                         )}>
                            <div className={cn("h-full transition-all duration-1000 ease-linear", 
                               item.type === "Erasure" ? "bg-red-500" : "bg-bento-gold"
                            )} style={{width: `${item.progress}%`}} />
                         </div>
                         <div className="flex flex-col items-end gap-1">
                           <span className={cn("text-[8px] uppercase tracking-widest opacity-60", item.type === "Erasure" && "text-red-600")}>
                             Created: {item.createdAt}
                           </span>
                           <span className={cn("text-[9px] font-bold font-mono opacity-70", item.type === "Erasure" && "text-red-600 opacity-80")}>
                             {formatTime(item.timeRemSeconds)}
                           </span>
                         </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center mt-3">
                         <div className="flex flex-col gap-1">
                            <span className="text-[8px] uppercase tracking-widest opacity-60">Created: {item.createdAt}</span>
                            <span className="text-[8px] uppercase tracking-widest opacity-80 font-bold">Completed: {item.completedAt}</span>
                         </div>
                         <button onClick={() => alert(`Showing log for ${item.id}\\nExport generated and available in immutable storage.`)} className="text-[9px] font-bold tracking-widest uppercase border-b border-white hover:text-bento-light-green hover:border-bento-light-green transition-colors mt-2 pb-0.5">
                           View Log
                         </button>
                      </div>
                    )}
                 </div>
               ))}
            </div>

            <button onClick={handleAdminOverride} className="mt-6 w-full py-2 bg-bento-bg border-2 border-bento-dark text-[10px] font-bold uppercase tracking-widest text-bento-dark hover:bg-bento-dark hover:text-white transition-colors">
              Administrative Override
            </button>
         </div>

      </div>
    </div>
  );
}
