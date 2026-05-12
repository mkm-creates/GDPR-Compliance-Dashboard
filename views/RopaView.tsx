import { useState } from "react";
import { Network, Database, Cloud, FileText, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function RopaView() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isGeneratingDPIA, setIsGeneratingDPIA] = useState(false);
  const [dpiaGenerated, setDpiaGenerated] = useState(false);

  const handleExportROPA = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      
      // Simulate file download
      const blob = new Blob(["ROPA Export Data\nNode,Type,Data\nTemple Headband,Edge,Raw EEG"], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'temple_ropa_export.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1500);
  };

  const handleGenerateDPIA = () => {
    setIsGeneratingDPIA(true);
    setTimeout(() => {
      setIsGeneratingDPIA(false);
      setDpiaGenerated(true);
    }, 2000);
  };

  const flows = [
    { id: "node-1", name: "Temple Headband (Device)", type: "Edge", data: "Raw EEG, Heart Rate, Acceleration", dest: "Mobile App (Local)" },
    { id: "node-2", name: "Mobile Application", type: "Gateway", data: "Encrypted Telemetry stream", dest: "EU Cloud Entry" },
    { id: "node-3", name: "EU Cloud Entry (Frankfurt)", type: "Storage", data: "Pseudonymized Neurodata", dest: "ML Analytics Engine" },
    { id: "node-4", name: "ML Analytics Engine (India)", type: "Processor", data: "Aggregated Insights & Fatigue scores", dest: "App Dashboard" },
  ];

  return (
    <div className="p-8 animate-in fade-in duration-700 max-w-7xl mx-auto flex flex-col font-sans">
      <div className="flex justify-between items-end mb-8 border-b-2 border-bento-dark pb-4">
        <div>
           <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">
             Art. 30 & Data Transfer
           </p>
           <h1 className="text-4xl font-serif italic font-medium text-bento-text">
             Data Flow Mapping
           </h1>
        </div>
        <div className="text-right">
           <button 
             onClick={handleExportROPA} 
             disabled={isExporting}
             className={cn("px-4 py-2 border-2 border-bento-dark text-[10px] font-bold uppercase shadow-[2px_2px_0px_0px_#2D2D2D] transition-colors", isExporting ? "bg-bento-dark text-white opacity-70" : "bg-bento-gold text-white hover:bg-yellow-600")}
           >
             {isExporting ? "Compiling Excel..." : "Export ROPA Report"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
         <div className="col-span-2 border-2 border-bento-dark p-8 bg-white shadow-[4px_4px_0px_0px_#2D2D2D]">
            <h2 className="text-xl font-serif italic mb-6">Interactive Data Lineage</h2>
            
            <div className="space-y-4">
              {flows.map((flow, index) => (
                <div key={flow.id} className="flex items-center gap-4 relative">
                   {index !== flows.length - 1 && (
                     <div className="absolute left-6 top-12 bottom-[-16px] w-[2px] bg-bento-dark border-l-2 border-dashed border-bento-dark opacity-20" />
                   )}
                   <button 
                     onClick={() => setActiveNode(flow.id)}
                     className={cn("w-12 h-12 rounded-full border-2 border-bento-dark flex items-center justify-center shrink-0 z-10 bg-white transition-all", activeNode === flow.id ? "ring-4 ring-bento-green/30 border-bento-green text-bento-green" : "hover:bg-bento-bg")}
                   >
                     {flow.type === "Edge" && <Network size={20} />}
                     {flow.type === "Gateway" && <Cloud size={20} />}
                     {flow.type === "Storage" && <Database size={20} />}
                     {flow.type === "Processor" && <Database size={20} />}
                   </button>
                   
                   <div 
                     className={cn("flex-1 border-2 border-bento-dark p-4 flex justify-between items-center transition-all cursor-pointer", activeNode === flow.id ? "bg-bento-card-green shadow-[2px_2px_0px_0px_#4B5E40]" : "bg-bento-bg hover:-translate-y-0.5")}
                     onClick={() => setActiveNode(flow.id)}
                   >
                     <div>
                       <h3 className="text-sm font-bold tracking-wider">{flow.name}</h3>
                       <p className="text-[10px] opacity-70 font-mono uppercase mt-1">{flow.type}</p>
                     </div>
                     <div className="flex items-center gap-3 text-bento-dark opacity-60">
                        <ArrowRight size={16} />
                        <span className="text-[10px] font-bold tracking-widest uppercase">{flow.dest}</span>
                     </div>
                   </div>
                </div>
              ))}
            </div>
         </div>

         <div className="col-span-1">
            {activeNode ? (
               <div className="border-2 border-bento-dark bg-white shadow-[4px_4px_0px_0px_#2D2D2D] p-6 sticky top-28">
                 {(() => {
                    const node = flows.find(f => f.id === activeNode)!;
                    return (
                      <>
                        <h3 className="text-lg font-serif italic mb-1">{node.name}</h3>
                        <span className="px-2 py-0.5 bg-bento-dark text-white text-[9px] font-bold tracking-widest uppercase mb-6 inline-block">Node Profile</span>

                        <div className="space-y-4">
                           <div>
                             <p className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-1">Data In Transit</p>
                             <div className="px-3 py-2 border-l-2 border-bento-dark bg-bento-bg text-xs font-mono">
                               {node.data}
                             </div>
                           </div>

                           <div>
                             <p className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-1">Transfer Destination</p>
                             <p className="text-sm font-bold">{node.dest}</p>
                           </div>

                           {node.id === "node-4" && (
                             <div className="mt-8 pt-4 border-t-2 border-red-500 border-dashed">
                               <div className="flex items-center gap-2 mb-2 text-red-600">
                                 <FileText size={16} />
                                 <h4 className="text-xs font-bold tracking-widest uppercase">SCC Flag: High Risk</h4>
                               </div>
                               <p className="text-[11px] opacity-80 mb-4">Data transferred to non-EEA jurisdiction (India) requires supplementary measures under Schrems II.</p>
                               {dpiaGenerated ? (
                                 <div className="p-3 bg-bento-green/10 border-2 border-bento-green text-bento-green text-[10px] font-bold uppercase flex items-center justify-center gap-2">
                                    <Check size={14} />
                                    TIA & SCC Document Generated
                                 </div>
                               ) : (
                                 <button 
                                   onClick={handleGenerateDPIA}
                                   disabled={isGeneratingDPIA} 
                                   className="w-full py-2 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 disabled:opacity-70 transition-all"
                                 >
                                   {isGeneratingDPIA ? "Synthesizing DPIA..." : "Generate Transfer DPIA"}
                                 </button>
                               )}
                             </div>
                           )}
                           
                           {node.id !== "node-4" && (
                             <div className="mt-8 pt-4 border-t-2 border-bento-dark/20 border-dashed">
                               <div className="flex items-center gap-2 mb-2 text-bento-green">
                                 <Check size={16} />
                                 <h4 className="text-xs font-bold tracking-widest uppercase">Compliant Node</h4>
                               </div>
                               <p className="text-[11px] opacity-80">Local encryption and EEA storage requirements are fulfilled.</p>
                             </div>
                           )}
                        </div>
                      </>
                    )
                 })()}
               </div>
            ) : (
               <div className="border-2 border-bento-dark border-dashed bg-bento-bg p-6 text-center text-bento-dark/50 sticky top-28 h-64 flex flex-col items-center justify-center">
                  <Database size={24} className="mb-2 opacity-30" />
                  <p className="text-xs font-bold tracking-widest uppercase">Select a node to inspect payload & transfers</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
