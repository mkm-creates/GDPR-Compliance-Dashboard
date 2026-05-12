import { useState } from "react";
import { cn } from "@/lib/utils";
import { Network, Shield, Scale, ChevronRight, Cloud, FileText, Upload, Check } from "lucide-react";

interface OperationsProps {
  onNavigate: (tab: string) => void;
}

export function OperationsView({ onNavigate }: OperationsProps) {
  const [notification, setNotification] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = () => {
    setIsResolving(true);
    setTimeout(() => {
      setIsResolving(false);
      setNotification("Automated resolution failed. Manual escalation to legal required.");
      setTimeout(() => setNotification(""), 4000);
    }, 1500);
  };

  const handleNewTask = () => {
    setNotification("Task creation synced with Jira: JIRA-4091.");
    setTimeout(() => setNotification(""), 3000);
  };
  return (
    <div className="p-8 animate-in fade-in duration-700 max-w-7xl mx-auto flex flex-col font-sans">
      <div className="flex justify-between items-end mb-8 border-b-2 border-bento-dark pb-4">
        <div>
           <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">
             Critical Path Locked
           </p>
           <h1 className="text-4xl font-serif italic font-medium text-bento-text">
             Implementation Velocity
           </h1>
        </div>
        <div className="text-right">
           <div className="inline-flex gap-4">
              <div className="text-center">
                 <span className="block text-xl font-mono font-bold text-bento-green">84%</span>
                 <span className="text-[9px] uppercase tracking-widest font-bold">OS Momentum</span>
              </div>
              <div className="text-center">
                 <span className="block text-xl font-mono font-bold text-bento-dark">12</span>
                 <span className="text-[9px] uppercase tracking-widest font-bold">Blockers</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">

        {/* Dependency Mapping */}
        <div className="col-span-3 border-2 border-bento-dark p-6 bg-white shadow-[4px_4px_0px_0px_#2D2D2D] relative flex flex-col">
           <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase opacity-60 mb-1">Evidence Pipeline</h3>
                <h2 className="text-2xl font-serif italic">Dependency Mapping</h2>
              </div>
              <Network size={24} className="text-bento-dark opacity-50" />
           </div>
           
           <div className="flex-1 flex justify-between items-center relative px-8">
               <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-bento-dark border-t border-bento-dark opacity-20 border-dashed" />
               <div className="absolute left-[10%] right-[50%] top-1/2 -translate-y-1/2 h-[2px] bg-bento-green" />

               <div className="relative z-10 flex flex-col items-center gap-3">
                 <div className="w-14 h-14 rounded-full border-4 border-bento-green bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#4B5E40]">
                    <span className="text-bento-green font-mono text-lg font-bold">{"{}"}</span>
                 </div>
                 <span className="text-[10px] font-bold tracking-widest uppercase bg-white px-2 border border-bento-dark">Data_Arch</span>
               </div>

               <div className="relative z-10 flex flex-col items-center gap-3">
                 <div className="w-14 h-14 rounded-full border-4 border-bento-dark bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#2D2D2D]">
                    <Shield size={20} className="text-bento-dark" />
                 </div>
                 <span className="text-[10px] font-bold tracking-widest uppercase bg-white px-2 border border-bento-dark">Encrypt_V2</span>
               </div>

               <div className="relative z-10 flex flex-col items-center gap-3">
                 <div className="w-14 h-14 rounded-full border-4 border-bento-dark bg-bento-card-green opacity-70 flex items-center justify-center">
                    <Scale size={20} className="text-bento-dark" />
                 </div>
                 <span className="text-[10px] font-bold tracking-widest uppercase opacity-70 bg-white px-2">Privacy_Leg</span>
               </div>
           </div>
        </div>

        {/* Critical Blockers List */}
        <div className="col-span-1 border-2 border-bento-dark p-5 bg-bento-card-tan shadow-[4px_4px_0px_0px_#2D2D2D] flex flex-col relative">
           {notification && (
             <div className="absolute -top-12 left-0 right-0 bg-bento-dark text-white text-[10px] uppercase font-bold p-2 text-center animate-in fade-in slide-in-from-bottom-2">
               {notification}
             </div>
           )}
           <h3 className="text-xs font-bold tracking-widest uppercase text-red-600 mb-1">Urgent</h3>
           <h2 className="text-xl font-serif italic mb-6">Critical Blockers</h2>

           <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between border-b border-bento-dark/20 pb-2">
                 <span className="text-[11px] font-bold text-bento-dark">DPA_SIGN_OFF</span>
                 <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-300 text-[9px] font-bold uppercase">High</span>
              </div>
              <div className="flex items-center justify-between border-b border-bento-dark/20 pb-2">
                 <span className="text-[11px] font-bold text-bento-dark">CROSS_BORDER</span>
                 <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-300 text-[9px] font-bold uppercase">High</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                 <span className="text-[11px] font-bold text-bento-dark">RETENTION_POL</span>
                 <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 border border-yellow-300 text-[9px] font-bold uppercase">Med</span>
              </div>
           </div>

           <button onClick={handleResolve} disabled={isResolving} className="w-full mt-4 py-2 bg-bento-dark text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-50">
             {isResolving ? "Resolving..." : "Resolve Path"} <ChevronRight size={14} />
           </button>
        </div>

        {/* Active Workstreams */}
        <div className="col-span-4 border-2 border-bento-dark p-6 bg-white shadow-[4px_4px_0px_0px_#2D2D2D]">
           <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-serif italic">Active Workstreams</h2>
                <p className="text-[10px] opacity-60 tracking-widest uppercase mt-1 font-bold">Velocity Mode: Accelerated</p>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => setFilterActive(!filterActive)} className={cn("px-4 py-1.5 border-2 border-bento-dark text-[10px] font-bold tracking-widest uppercase transition-colors", filterActive ? "bg-bento-dark text-white" : "hover:bg-bento-dark hover:text-white")}>
                    {filterActive ? "Clear Filter" : "Filter: Ownership"}
                 </button>
                 <button onClick={handleNewTask} className="px-4 py-1.5 border-2 border-bento-dark bg-bento-gold text-white text-[10px] font-bold tracking-widest uppercase hover:bg-yellow-600 transition-colors shadow-[2px_2px_0px_0px_#2D2D2D]">
                    New Task
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
             <div className="border-2 border-bento-dark p-4 bg-bento-card-green shadow-[4px_4px_0px_0px_#2D2D2D] relative">
                <div className="absolute top-4 right-4 px-2 border border-bento-dark bg-white font-mono text-[9px] font-bold shadow-[2px_2px_0px_0px_#2D2D2D]">ETA: 48H</div>
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] opacity-70 font-bold">
                  <span className="w-2 h-2 rounded-full bg-bento-green"></span>
                  #OPS-204
                </div>
                <h4 className="text-lg font-bold font-serif mb-4 pr-16 bg-bento-card-green">By-Design Neural Encryption Layer</h4>
                
                <div className="flex justify-between items-end">
                   <div className="text-[9px] font-bold tracking-widest uppercase text-bento-dark">
                      Chain: Eng &gt; Sec &gt; Comp
                   </div>
                   <span className="text-[10px] font-bold tracking-widest uppercase text-bento-green border-b border-bento-dark">
                      Status: In_Flight
                   </span>
                </div>
             </div>

             <div className="border-2 border-bento-dark p-4 bg-white shadow-[4px_4px_0px_0px_#2D2D2D] relative opacity-80 border-dashed">
                <div className="absolute top-4 right-4 px-2 border border-red-500 bg-red-50 text-red-600 font-mono text-[9px] font-bold shadow-[2px_2px_0px_0px_#EF4444]">BLOCKER: #ENG-99</div>
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] opacity-70 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  #LGL-112
                </div>
                <h4 className="text-lg font-bold font-serif mb-4">Finalize Mental DPIA</h4>
                
                <div className="flex justify-between items-end">
                   <div className="text-[9px] font-bold tracking-widest uppercase text-bento-dark">
                      Chain: Legal
                   </div>
                   <span className="text-[10px] font-bold tracking-widest uppercase text-red-500 border-b border-red-500">
                      Status: Paused
                   </span>
                </div>
             </div>
           </div>
        </div>

        {/* Evidence Collection Pipelines */}
        <div className="col-span-4 border-2 flex items-center justify-between border-bento-dark p-6 bg-bento-dark text-white shadow-[4px_4px_0px_0px_#BF8B4D] mb-8">
           <div className="mr-8">
              <p className="text-bento-gold text-[10px] font-bold tracking-widest uppercase mb-1">Real_Time_Telemetry</p>
              <h2 className="text-2xl font-serif italic">Evidence Pipelines</h2>
           </div>
           
           <div className="flex-1 grid grid-cols-3 gap-6">
              <div className="border-l-2 border-bento-bg/20 pl-6">
                  <div className="flex items-center gap-2 mb-2">
                     <Cloud className="text-bento-gold" size={16} />
                     <span className="text-[9px] font-bold tracking-widest uppercase">Auto_Collect</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                     <h2 className="text-3xl font-mono">92%</h2>
                     <span className="text-[10px] opacity-60">Infrastructure</span>
                  </div>
                  <div className="w-full h-1 bg-white/20">
                     <div className="h-full bg-bento-gold w-[92%]" />
                  </div>
              </div>

              <div className="border-l-2 border-bento-bg/20 pl-6">
                  <div className="flex items-center gap-2 mb-2">
                     <FileText className="text-bento-light-green" size={16} />
                     <span className="text-[9px] font-bold tracking-widest uppercase">Docs_Ready</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                     <h2 className="text-3xl font-mono">45%</h2>
                     <span className="text-[10px] opacity-60">Policies</span>
                  </div>
                  <div className="w-full h-1 bg-white/20">
                     <div className="h-full bg-bento-light-green w-[45%]" />
                  </div>
              </div>

              <div className="border-l-2 border-bento-bg/20 pl-6">
                  <div className="flex items-center gap-2 mb-2">
                     <Upload className="text-red-400" size={16} />
                     <span className="text-[9px] font-bold tracking-widest uppercase">Manual_Req</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                     <h2 className="text-3xl font-mono">12</h2>
                     <span className="text-[10px] opacity-60">Pending</span>
                  </div>
                  <div className="w-full h-1 bg-white/20">
                     <div className="h-full bg-red-400 w-[15%]" />
                  </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
