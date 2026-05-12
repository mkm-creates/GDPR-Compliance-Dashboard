import { CircularProgress } from "@/components/CircularProgress";
import { LaunchProbabilityChart } from "@/components/LaunchChart";
import { Clock, ShieldAlert, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComplianceArticle } from "@/data/compliance";

interface DashboardProps {
  onNavigate: (tab: string) => void;
  complianceData: ComplianceArticle[];
  readinessScore: number;
}

export function DashboardView({ onNavigate, complianceData, readinessScore }: DashboardProps) {
  return (
    <div className="p-8 animate-in fade-in duration-700 max-w-7xl mx-auto flex flex-col font-sans">
      <div className="flex justify-between items-end mb-8 border-b-2 border-bento-dark pb-4">
        <div>
           <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mb-1">
             Mission Critical: European Expansion
           </p>
           <h1 className="text-4xl font-serif italic font-medium text-bento-text">
             Launch Readiness
           </h1>
        </div>
        <div className="text-right">
           <div className="inline-flex items-center px-3 py-1 bg-bento-green text-white rounded-full text-xs font-bold uppercase">
             <span className="w-2 h-2 bg-bento-light-green rounded-full mr-2 animate-pulse"></span>
             Status: Active Preparation
           </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Countdown - Col span 1 */}
        <div className="col-span-1 border-2 border-bento-dark p-5 bg-bento-card-green shadow-[4px_4px_0px_0px_#2D2D2D] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
             <h3 className="text-xs font-bold uppercase tracking-wider text-bento-dark">EU Launch</h3>
             <Clock size={16} className="text-bento-dark opacity-50" />
          </div>
          <div className="flex items-baseline gap-1 mt-2">
             <div className="text-4xl font-mono text-bento-text">89</div>
             <span className="text-xs opacity-70">Days</span>
          </div>
          <div className="mt-4 px-2 py-1 border border-bento-dark text-[10px] font-bold text-center bg-white shadow-[2px_2px_0px_0px_#2D2D2D]">
             T-MINUS EXECUTION
          </div>
        </div>

        {/* Big circular progress - Col span 2, row span 2 */}
        <div className="col-span-2 row-span-2 border-2 border-bento-dark p-6 bg-white shadow-[4px_4px_0px_0px_#2D2D2D] flex flex-col items-center justify-center">
           <h2 className="text-2xl font-serif italic mb-6 w-full text-left">GDPR Readiness Indicator</h2>
           <CircularProgress 
             value={readinessScore} 
             label={`${readinessScore}%`} 
             sublabel="Readiness Level"
             size={200}
             strokeWidth={12}
           />
        </div>

        {/* Risk Index - Col span 1 */}
        <div className="col-span-1 border-2 border-bento-dark p-5 bg-bento-card-tan shadow-[4px_4px_0px_0px_#2D2D2D] flex flex-col justify-between">
           <div className="flex justify-between items-start mb-2">
             <h3 className="text-xs font-bold uppercase tracking-wider text-bento-dark">Risk Index</h3>
             <ShieldAlert size={16} className="text-bento-dark opacity-50" />
           </div>
           <div className="text-4xl font-mono text-bento-text mt-2">{(1 - readinessScore / 100).toFixed(2)}</div>
           <div className="mt-4 text-[10px] font-bold text-bento-green uppercase tracking-wider font-mono">
             ● {readinessScore >= 80 ? "Nominal Threat" : "Elevated Threat"}
           </div>
        </div>

        {/* Chart Column - Col Span z */}
        <div className="col-span-1 border-2 border-bento-dark p-5 bg-bento-dark text-bento-bg shadow-[4px_4px_0px_0px_#BF8B4D] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xs font-bold uppercase">Strategic Insight</h3>
               <Lightbulb size={16} className="text-bento-gold" />
            </div>
            <p className="text-xs opacity-80 font-serif italic leading-relaxed">
              "Schrems II supplementary measures pending for India support team. BYOK encryption prioritized."
            </p>
        </div>

        {/* Blockers - Col Span 1 */}
        <div className="col-span-1 border-2 border-bento-dark p-5 bg-white flex flex-col justify-between shadow-[4px_4px_0px_0px_#2D2D2D]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-bento-dark mb-3">Critical Blockers</h3>
            <div className="space-y-3">
               <div className="flex items-start gap-2 border-l-4 border-red-500 pl-2">
                 <AlertTriangle size={14} className="text-red-500 mt-0.5" />
                 <div>
                   <p className="text-[11px] font-bold text-bento-dark">Indian Processor DPA</p>
                   <p className="text-[10px] opacity-70">Resolve in 4.5h</p>
                 </div>
               </div>
               <div className="flex items-start gap-2 border-l-4 border-bento-green pl-2">
                 <CheckCircle2 size={14} className="text-bento-green mt-0.5" />
                 <div>
                   <p className="text-[11px] font-bold text-bento-dark">Encryption</p>
                   <p className="text-[10px] opacity-70">Secured</p>
                 </div>
               </div>
            </div>
        </div>

        {/* Article Implementation Status Tracker - Col Span 4 */}
        <div className="col-span-4 border-2 border-bento-dark p-6 bg-white shadow-[4px_4px_0px_0px_#2D2D2D] mb-8">
            <div className="flex justify-between items-start mb-6">
               <div>
                 <h2 className="text-2xl font-serif italic">Article Implementation Tracker</h2>
                 <span className="text-[10px] font-mono opacity-60">Live Compliance Percentage by Article</span>
               </div>
               <button onClick={() => onNavigate('matrix')} className="px-4 py-2 border-2 border-bento-dark bg-bento-bg text-bento-dark text-[10px] font-bold uppercase tracking-widest hover:bg-bento-dark hover:text-white transition-colors shadow-[2px_2px_0px_0px_#2D2D2D]">
                  View Full Matrix
               </button>
            </div>
            <div className="grid grid-cols-3 gap-y-4 gap-x-8">
               {complianceData.map(req => (
                 <div key={req.art} className="flex flex-col">
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-xs font-bold uppercase tracking-wider">{req.art}</span>
                       <span className="text-[10px] font-mono font-bold opacity-70">{req.completion}%</span>
                    </div>
                    <div className="text-[10px] opacity-70 mb-2 truncate" title={req.desc}>{req.desc}</div>
                    <div className="w-full h-1.5 border border-bento-dark/20 bg-bento-bg rounded-full overflow-hidden">
                       <div 
                         className={cn("h-full transition-all", req.status === "warn" ? "bg-red-500" : "bg-bento-green")}
                         style={{ width: `${req.completion}%` }}
                       />
                    </div>
                 </div>
               ))}
            </div>
        </div>
      </div>
    </div>
  );
}
