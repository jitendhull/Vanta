import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NoteMetadata } from "@/types/content";

interface BreadcrumbsProps {
  note: NoteMetadata;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ note }) => {
  return (
    <nav className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted overflow-x-auto whitespace-nowrap py-1">
      <Link href="/" className="hover:text-accent transition-colors">
        BCA
      </Link>
      <ChevronRight className="w-3 h-3 flex-shrink-0 text-white/20" />
      <span className="text-text-muted">Sem-{note.semester}</span>
      <ChevronRight className="w-3 h-3 flex-shrink-0 text-white/20" />
      <span className="text-text-muted">{note.subject}</span>
      <ChevronRight className="w-3 h-3 flex-shrink-0 text-white/20" />
      <span className="text-text-muted">{note.unit}</span>
      <ChevronRight className="w-3 h-3 flex-shrink-0 text-white/20" />
      <span className="text-text-primary font-medium">{note.title}</span>
    </nav>
  );
};
