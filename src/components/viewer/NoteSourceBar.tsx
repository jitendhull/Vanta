import React from "react";
import { FileText, Download, ExternalLink } from "lucide-react";

interface NoteSourceBarProps {
  pdfUrl: string;
  githubUrl: string;
  title: string;
}

export const NoteSourceBar: React.FC<NoteSourceBarProps> = ({
  pdfUrl,
  githubUrl,
  title,
}) => {
  return (
    <div className="my-5 p-3.5 sm:p-4 rounded-lg bg-surface border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded bg-accent/10 border border-accent/20 text-accent flex-shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-semibold text-text-primary font-sans">{title}</div>
          <div className="text-xs text-text-muted font-mono">Course Material & Reference Notes</div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-mono font-medium bg-white/[0.05] hover:bg-white/[0.1] text-text-primary border border-white/[0.08] transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
          <span>View Source</span>
        </a>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded text-xs font-mono font-semibold bg-accent hover:bg-accent/90 text-black transition-all shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download PDF</span>
        </a>
      </div>
    </div>
  );
};
