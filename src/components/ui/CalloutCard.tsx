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
    border: "border-l-callout-def",
    bg: "bg-callout-def/[0.08]",
    text: "text-callout-def",
    icon: Info,
  },
  valid: {
    border: "border-l-callout-valid",
    bg: "bg-callout-valid/[0.08]",
    text: "text-callout-valid",
    icon: CheckCircle2,
  },
  invalid: {
    border: "border-l-callout-invalid",
    bg: "bg-callout-invalid/[0.08]",
    text: "text-callout-invalid",
    icon: AlertTriangle,
  },
  example: {
    border: "border-l-callout-example",
    bg: "bg-callout-example/[0.08]",
    text: "text-callout-example",
    icon: Code2,
  },
  compare: {
    border: "border-l-text-muted",
    bg: "bg-surface-elevated",
    text: "text-text-primary",
    icon: Columns,
  },
  note: {
    border: "border-l-accent",
    bg: "bg-accent-dim",
    text: "text-accent",
    icon: Info,
  },
};

export const CalloutCard: React.FC<CalloutCardProps> = ({ type, title, children }) => {
  const config = CALLOUT_CONFIG[type] || CALLOUT_CONFIG.note;
  const Icon = config.icon;

  return (
    <div
      className={`my-4 rounded-r-md border-l-[3px] ${config.border} ${config.bg} p-4 border-t border-r border-b border-border transition-all`}
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
