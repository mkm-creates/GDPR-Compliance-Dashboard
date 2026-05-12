import { useState } from "react";
import { Check, AlertTriangle, Search, ChevronRight, CheckSquare, Square, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComplianceArticle } from "@/data/compliance";

interface ComplianceMatrixProps {
  complianceData: ComplianceArticle[];
  onToggleStep: (artId: string, stepId: string) => void;
}

export function ComplianceMatrixView({ complianceData, onToggleStep }: ComplianceMatrixProps) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArt, setSelectedArt] = useState<string | null>(null);

  const filteredData = complianceData.filter(d => {
    const matchesFilter = filter === "all" || d.status === filter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      d.art.toLowerCase().includes(searchLower) || 
      d.desc.toLowerCase().includes(searchLower) ||
      d.steps.some(s => s.task.toLowerCase().includes(searchLower));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8 animate-in fade-in duration-700 max-w-7xl mx-auto flex flex-col font-sans">
      <div className="flex justify-between items-end mb-8 border-b-2 border-bento-dark pb-4">
        <div>
           <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">
             Regulatory Tracker
           </p>
           <h1 className="text-4xl font-serif italic font-medium text-bento-text">
             GDPR Article Matrix
           </h1>
        </div>
        <div className="flex flex-col items-end gap-3">
           <div className="relative">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
             <input 
               type="text" 
               placeholder="Search articles or tasks..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-9 pr-4 py-1.5 border-2 border-bento-dark text-xs font-medium w-64 bg-white focus:outline-none focus:ring-2 focus:ring-bento-green/50"
             />
           </div>
           <div className="flex gap-4">
              <button onClick={() => setFilter('all')} className={cn("px-4 py-1.5 border-2 text-[10px] font-bold tracking-widest uppercase transition-colors", filter === 'all' ? "bg-bento-dark text-white border-bento-dark" : "border-bento-dark text-bento-dark hover:bg-black/5")}>All</button>
              <button onClick={() => setFilter('warn')} className={cn("px-4 py-1.5 border-2 text-[10px] font-bold tracking-widest uppercase transition-colors", filter === 'warn' ? "bg-yellow-100 text-yellow-700 border-yellow-500" : "border-bento-dark text-bento-dark hover:bg-black/5")}>Action Required</button>
              <button onClick={() => setFilter('ok')} className={cn("px-4 py-1.5 border-2 text-[10px] font-bold tracking-widest uppercase transition-colors", filter === 'ok' ? "bg-bento-green text-white border-bento-dark shadow-[2px_2px_0px_0px_#2D2D2D]" : "border-bento-dark text-bento-dark hover:bg-black/5")}>Compliant</button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
         <div className="col-span-2 space-y-4">
           {filteredData.length === 0 ? (
             <div className="p-8 border-2 border-dashed border-bento-dark/30 text-center opacity-60">
                <Search size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm font-bold uppercase tracking-widest">No articles found</p>
             </div>
           ) : filteredData.map(req => (
             <button 
                key={req.art} 
                onClick={() => setSelectedArt(req.art)}
                className={cn("w-full text-left p-4 border-2 border-bento-dark transition-all flex items-center justify-between",
                  selectedArt === req.art ? "ring-2 ring-bento-dark ring-offset-2" : "",
                  req.status === "warn" ? "bg-bento-card-tan shadow-[4px_4px_0px_0px_#BF8B4D]" : "bg-white shadow-[2px_2px_0px_0px_#2D2D2D] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#2D2D2D]"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn("w-10 h-10 border-2 border-bento-dark flex items-center justify-center shrink-0 mt-1", req.status === "warn" ? "bg-white" : "bg-bento-green text-white")}>
                    {req.status === "warn" ? <AlertTriangle size={18} className="text-yellow-600" /> : <Check size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <div title={`${req.riskLevel} Risk Area`} className="flex items-center gap-2">
                        {req.riskLevel === 'Critical' ? (
                          <ShieldAlert size={16} className="text-red-600 animate-[pulse_1.5s_ease-in-out_infinite]" />
                        ) : req.riskLevel === 'High' ? (
                          <ShieldAlert size={16} className="text-orange-500" />
                        ) : req.riskLevel === 'Medium' ? (
                          <ShieldAlert size={16} className="text-blue-500" />
                        ) : (
                          <Check size={16} className="text-bento-green" />
                        )}
                        <h3 className="font-bold text-sm tracking-wider uppercase">{req.art}</h3>
                      </div>
                      <span className={cn("text-[8px] px-1.5 py-0.5 uppercase tracking-widest font-bold border", 
                        req.riskLevel === 'Critical' ? 'bg-red-100 text-red-700 border-red-300' :
                        req.riskLevel === 'High' ? 'bg-orange-100 text-orange-700 border-orange-300' :
                        'bg-blue-100 text-blue-700 border-blue-300'
                      )}>
                        {req.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-xs opacity-70 font-medium my-1">{req.desc}</p>
                    <div className="w-48 h-1.5 flex gap-[1px] mt-1">
                      {req.steps.map(step => (
                        <div 
                          key={step.id} 
                          className={cn("h-full flex-1", step.done ? (req.status === "warn" ? "bg-yellow-500" : "bg-bento-green") : "bg-bento-dark/10 border border-bento-dark/20")} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Completion</span>
                    <span className="font-mono text-sm font-bold">{req.completion}%</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50" />
                </div>
             </button>
           ))}
         </div>

         <div className="col-span-1">
            {selectedArt ? (
              <div className="border-2 border-bento-dark p-6 bg-white shadow-[4px_4px_0px_0px_#2D2D2D] sticky top-28 overflow-y-auto max-h-[calc(100vh-140px)]">
                {(() => {
                   const item = complianceData.find(d => d.art === selectedArt);
                   if (!item) return null;
                   return (
                     <>
                       <div className="flex justify-between items-start mb-6 border-b-2 border-bento-dark pb-4">
                         <h3 className="text-2xl font-serif italic text-bento-dark">{item.art}</h3>
                         <span className={cn("px-2 py-1 border-2 border-bento-dark text-[10px] font-bold uppercase", item.status === "warn" ? "bg-yellow-200" : "bg-bento-green text-white")}>{item.status === "warn" ? "Pending" : "Secured"}</span>
                       </div>
                       
                       <div className="flex gap-4 mb-4">
                          <div className="bg-bento-bg p-3 border-2 border-bento-dark flex-1">
                             <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-1">Risk Profile</div>
                             <div className="text-xs font-bold flex items-center gap-1">
                               <ShieldAlert size={12} className={item.riskLevel === 'Critical' ? 'text-red-500' : 'text-orange-500'} />
                               {item.riskLevel}
                             </div>
                          </div>
                          <div className="bg-bento-bg p-3 border-2 border-bento-dark flex-1">
                             <div className="text-[9px] font-bold uppercase tracking-widest opacity-60 mb-1">Max Penalty</div>
                             <div className="text-xs font-bold leading-tight">{item.penalty}</div>
                          </div>
                       </div>

                       <p className="text-sm font-bold tracking-widest uppercase mb-2">Description</p>
                       <p className="text-xs opacity-80 mb-6">{item.desc}</p>
                       
                       <p className="text-sm font-bold tracking-widest uppercase mb-2">Owner Workflow</p>
                       <div className="px-3 py-2 bg-bento-bg border-l-4 border-bento-dark text-xs font-mono font-bold mb-6 flex justify-between">
                         <span>Team: {item.owner}</span>
                         <span>{item.completion}% Done</span>
                       </div>

                       <p className="text-sm font-bold tracking-widest uppercase mb-4">Implementation Steps</p>
                       <div className="space-y-3 mb-6">
                          {item.steps.map(step => (
                            <div 
                              key={step.id} 
                              className={cn("flex flex-start gap-3 p-3 border-2 transition-all cursor-pointer", step.done ? "border-bento-green bg-bento-green/5" : "border-bento-dark/20 hover:border-bento-dark bg-white")}
                              onClick={() => onToggleStep(item.art, step.id)}
                            >
                               <div className="mt-0.5 shrink-0">
                                 {step.done ? <CheckSquare size={16} className="text-bento-green" /> : <Square size={16} className="text-bento-dark/50" />}
                               </div>
                               <p className={cn("text-xs font-medium leading-tight", step.done ? "opacity-70 line-through" : "text-bento-dark")}>{step.task}</p>
                            </div>
                          ))}
                       </div>

                       {item.status === 'warn' && (
                         <div className="mt-8 border-2 border-red-500 bg-red-50 p-4">
                           <h4 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Required Action</h4>
                           <p className="text-[10px] opacity-80 mb-4">Immediate attention required to close the compliance gap before Q3 Launch Window.</p>
                           <button onClick={() => alert("Delegation prompt opened.")} className="w-full py-2 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition">
                             Delegate to {item.owner} Lead
                           </button>
                         </div>
                       )}

                       {item.art === "Art. 44-49" && (
                          <div className="mt-8 border-2 border-bento-dark p-6 bg-bento-card-green shadow-[4px_4px_0px_0px_#2D2D2D]">
                            <h4 className="text-lg font-serif italic text-bento-dark mb-4">Cross-Border Transfer Map</h4>
                            
                            <div className="space-y-4">
                               <div className="bg-white p-3 border-2 border-bento-dark text-xs font-medium">
                                 <div className="flex justify-between items-center mb-2">
                                     <strong className="text-sm flex items-center gap-2"><span className="text-lg mt-0.5">🇮🇳</span> India</strong>
                                     <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 border border-yellow-500 text-[9px] uppercase tracking-widest font-bold">Action Required</span>
                                 </div>
                                 <p className="opacity-80 mb-3">External ML Analytics processing (Cognitive Engine).</p>
                                 <div className="flex flex-wrap gap-2">
                                     <span className="text-[10px] bg-bento-bg px-2 py-1 border border-bento-dark/20 text-bento-dark font-mono">Standard Contractual Clauses (SCCs)</span>
                                     <span className="text-[10px] bg-bento-bg px-2 py-1 border border-bento-dark/20 text-bento-dark font-mono">Transfer Impact Assessment (TIA)</span>
                                 </div>
                               </div>

                               <div className="bg-white p-3 border-2 border-bento-dark text-xs font-medium opacity-80">
                                 <div className="flex justify-between items-center mb-2">
                                     <strong className="text-sm flex items-center gap-2"><span className="text-lg mt-0.5">🇺🇸</span> United States</strong>
                                     <span className="px-2 py-0.5 bg-bento-green/20 text-bento-green border border-bento-green text-[9px] uppercase tracking-widest font-bold">Adequacy</span>
                                 </div>
                                 <p className="opacity-80 mb-3">Cloud hosting region (AWS us-east-1) for redundant backups.</p>
                                 <div className="flex flex-wrap gap-2">
                                     <span className="text-[10px] bg-bento-bg px-2 py-1 border border-bento-dark/20 text-bento-dark font-mono">EU-US Data Privacy Framework (DPF)</span>
                                 </div>
                               </div>
                            </div>
                          </div>
                       )}

                       {item.art === "Art. 33-34" && (
                          <div className="mt-8 border-2 border-bento-dark p-6 bg-bento-card-green shadow-[4px_4px_0px_0px_#2D2D2D]">
                            <h4 className="text-lg font-serif italic text-bento-dark mb-6">Breach Response Protocol</h4>
                            
                            <div className="mb-6">
                              <h5 className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Lead Supervisory Authority</h5>
                              <div className="bg-white p-3 border-2 border-bento-dark text-xs font-medium">
                                <strong>Dutch DPA (Autoriteit Persoonsgegevens)</strong>
                                <p className="mt-1 opacity-80">Report within 72h via <a href="#" className="underline font-bold text-bento-green">Meldloket Datalekken</a></p>
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h5 className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Internal Escalation Path</h5>
                              <div className="bg-white border-2 border-bento-dark p-3 text-[11px] font-mono leading-relaxed">
                                <span className="text-bento-dark/50">L1:</span> SOC Alerts <span className="px-1">→</span> InfoSec Lead (T+1h)<br/>
                                <span className="text-bento-dark/50">L2:</span> InfoSec Lead <span className="px-1">→</span> DPO [A. Mehta] (T+4h)<br/>
                                <span className="text-bento-dark/50">L3:</span> DPO initiates Crisis Comm. & Legal (T+12h)
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">72h Evidence Checklist</h5>
                              <ul className="text-xs space-y-3 bg-white border-2 border-bento-dark p-3 mb-6">
                                <li className="flex items-start gap-2">
                                  <CheckSquare size={14} className="text-bento-green shrink-0 mt-0.5" /> 
                                  <span className="font-medium opacity-80">Log dumps demonstrating scope of exfiltrated data.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckSquare size={14} className="text-bento-green shrink-0 mt-0.5" /> 
                                  <span className="font-medium opacity-80">List of affected data subjects & encrypted notification drafts.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Square size={14} className="text-bento-dark shrink-0 opacity-40 mt-0.5" /> 
                                  <span className="font-medium opacity-80">Initial forensics report with precise Indicators of Compromise.</span>
                                </li>
                              </ul>

                              <h5 className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Evidence Collection Log</h5>
                              <div className="bg-white border-2 border-bento-dark p-3 text-[11px] font-mono leading-relaxed max-h-40 overflow-y-auto">
                                <div className="border-l-2 border-bento-dark pl-2 mb-2">
                                  <span className="text-bento-dark/50 inline-block w-24">2026-05-11 04:12Z</span> 
                                  <span className="text-bento-green font-bold">SUCCESS</span> DB access logs extracted (node-1a)
                                </div>
                                <div className="border-l-2 border-bento-dark pl-2 mb-2">
                                  <span className="text-bento-dark/50 inline-block w-24">2026-05-11 04:45Z</span> 
                                  <span className="text-bento-green font-bold">SUCCESS</span> Affected user cohort identified (3,241 users)
                                </div>
                                <div className="border-l-2 border-yellow-500 pl-2 mb-2">
                                  <span className="text-bento-dark/50 inline-block w-24">2026-05-11 05:05Z</span> 
                                  <span className="text-yellow-600 font-bold">PENDING</span> Generating breach notification drafts...
                                </div>
                                <div className="border-l-2 border-bento-dark/20 pl-2">
                                  <span className="text-bento-dark/50 inline-block w-24">--:--Z</span> 
                                  <span className="text-bento-dark/50">WAITING</span> Forensics report (Mandiant)
                                </div>
                              </div>
                            </div>
                          </div>
                       )}
                     </>
                   )
                })()}
              </div>
            ) : (
              <div className="border-2 border-bento-dark border-dashed p-6 bg-bento-bg text-center text-bento-dark/50 sticky top-28">
                 <Search size={24} className="mx-auto mb-4 opacity-30" />
                 <p className="text-xs font-bold tracking-widest uppercase mb-2">Select an article</p>
                 <p className="text-xs opacity-70">Review details, adjust compliance steps, and find missing capabilities.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
