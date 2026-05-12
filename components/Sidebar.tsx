import { cn } from "@/lib/utils";
import { sidebarItems } from "@/constants";
import { User } from "lucide-react";

interface SidebarProps {
  className?: string;
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function Sidebar({ className, activeTab, onTabChange }: SidebarProps) {
  return (
    <div className={cn("w-64 border-r-2 border-bento-dark bg-white flex flex-col h-screen shrink-0 relative shadow-[4px_0px_0px_0px_rgba(45,45,45,0.05)]", className)}>
      <div className="p-6 border-b-2 border-bento-dark bg-bento-card-tan">
        <h1 className="text-xl font-serif italic text-bento-text font-bold">
          NEURO_<span className="opacity-80">GDPR</span>_OS
        </h1>
        <p className="text-[10px] text-bento-text/60 font-mono tracking-widest mt-2 uppercase font-bold">
          <span className="inline-block w-2 h-2 rounded-full bg-bento-green mr-1 align-baseline"/> AI_Ready_Active
        </p>
      </div>

      <nav className="flex-1 px-4 mt-6 flex flex-col gap-2 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300",
                isActive 
                  ? "bg-bento-green text-white shadow-[2px_2px_0px_0px_#2D2D2D] border-2 border-bento-dark" 
                  : "text-bento-text/70 hover:text-bento-text hover:bg-bento-bg border-2 border-transparent"
              )}
            >
              <item.icon size={16} className={cn("shrink-0", isActive ? "text-white" : "text-bento-text/50")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t-2 border-bento-dark bg-white">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-10 h-10 border-2 border-bento-dark flex items-center justify-center shrink-0 bg-bento-bg shadow-[2px_2px_0px_0px_#2D2D2D]">
            <User size={18} className="text-bento-dark" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold text-bento-dark tracking-widest uppercase">Admin</span>
            <span className="text-[9px] text-bento-green tracking-wider font-mono">DPO - A. Mehta</span>
          </div>
        </div>
        <button className="w-full bg-bento-gold text-white border-2 border-bento-dark text-[10px] font-bold tracking-widest uppercase py-3 shadow-[2px_2px_0px_0px_#2D2D2D] hover:bg-yellow-600 hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px] transition-all">
          LAUNCH COMPLIANCE
        </button>
      </div>
    </div>
  );
}
