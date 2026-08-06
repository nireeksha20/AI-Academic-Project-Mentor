import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function AgentAccordion({ title, icon, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        </div>

        {open ? (
          <ChevronDown className="text-cyan-400" size={22} />
        ) : (
          <ChevronRight className="text-slate-400" size={22} />
        )}
      </button>

      {open && <div className="border-t border-white/10 p-5">{children}</div>}
    </div>
  );
}
