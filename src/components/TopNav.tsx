import { cn } from "@/lib/utils";
import { navItems } from "@/constants";
import { Bot, Bell } from "lucide-react";

interface TopNavProps {
  className?: string;
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function TopNav({ className, activeTab, onTabChange }: TopNavProps) {
  return (
    <header className={cn("h-20 flex items-center justify-between px-8 bg-bento-bg border-b-2 border-bento-dark shrink-0 shadow-[0_4px_0px_0px_rgba(45,45,45,0.05)]", className)}>
      <nav className="flex items-center gap-8 pl-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "text-[11px] font-bold tracking-widest uppercase transition-colors relative pb-2",
              activeTab === item.id ? "text-bento-green after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-bento-green" : "text-bento-text/50 hover:text-bento-text"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <button className="w-10 h-10 border-2 border-bento-dark bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_#2D2D2D] hover:bg-bento-bg hover:translate-y-[2px] transition-all">
          <Bot size={18} className="text-bento-dark" />
        </button>
        <button className="w-10 h-10 border-2 border-bento-dark bg-bento-gold flex items-center justify-center shadow-[2px_2px_0px_0px_#2D2D2D] hover:bg-yellow-600 hover:translate-y-[2px] transition-all">
          <Bell size={18} className="text-white" />
        </button>
      </div>
    </header>
  );
}
