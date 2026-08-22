import React from "react";
import { Info, CheckCircle2, AlertTriangle, Code2, Columns } from "lucide-react";

export type CalloutType = "definition" | "valid" | "invalid" | "example" | "compare" | "note";

interface CalloutCardProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const CALLOUT_CONFIG: Record<
  CalloutType,
  { border: string; bg: string; text: string; icon: React.ComponentType<{ className?: string }> }
> = {
  definition: {
    border: "border-l-[#E5A93C]",
    bg: "bg-[#E5A93C]/[0.05]",
    text: "text-[#E5A93C]",
    icon: Info,
  },
  valid: {
    border: "border-l-[#10B981]",
    bg: "bg-[#10B981]/[0.05]",
    text: "text-[#10B981]",
    icon: CheckCircle2,
  },
  invalid: {
    border: "border-l-[#F43F5E]",
    bg: "bg-[#F43F5E]/[0.05]",
    text: "text-[#F43F5E]",
    icon: AlertTriangle,
  },
  example: {
    border: "border-l-[#60A5FA]",
    bg: "bg-[#60A5FA]/[0.05]",
    text: "text-[#60A5FA]",
    icon: Code2,
  },
  compare: {
    border: "border-l-white/40",
    bg: "bg-white/[0.03]",
    text: "text-text-primary",
    icon: Columns,
  },
  note: {
    border: "border-l-accent",
    bg: "bg-accent/[0.05]",
    text: "text-accent",
    icon: Info,
  },
};

export const CalloutCard: React.FC<CalloutCardProps> = ({ type, title, children }) => {
  const config = CALLOUT_CONFIG[type] || CALLOUT_CONFIG.note;
  const Icon = config.icon;

  return (
    <div
      className={`my-4 rounded-r-md border-l-[3px] ${config.border} ${config.bg} p-4 border-t border-r border-b border-white/[0.06] transition-all`}
    >
      {title && (
        <div className={`flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider mb-2 ${config.text}`}>
          <Icon className="w-4 h-4 flex-shrink-0" />
          <span>{title}</span>
        </div>
      )}
      <div className="text-sm text-text-primary leading-relaxed space-y-2 prose-p:my-1">
        {children}
      </div>
    </div>
  );
};
