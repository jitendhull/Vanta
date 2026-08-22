import React from "react";
import { Download, FileText, ExternalLink } from "lucide-react";

interface PdfViewerProps {
  pdfUrl?: string;
  title: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, title }) => {
  if (!pdfUrl) return null;

  return (
    <div className="my-6 p-4 rounded-lg bg-surface border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded bg-accent/10 border border-accent/20 text-accent">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-semibold text-text-primary font-sans">{title} (Complete PDF)</div>
          <div className="text-xs text-text-muted font-mono">Curated Offline Notes & Handwritten Resource</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded text-xs font-mono font-medium bg-white/[0.05] hover:bg-white/[0.1] text-text-primary border border-white/[0.08] transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Open Tab</span>
        </a>

        <a
          href={pdfUrl}
          download
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono font-semibold bg-accent hover:bg-accent/90 text-black transition-all shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download PDF</span>
        </a>
      </div>
    </div>
  );
};
