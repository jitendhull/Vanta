import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { NoteMetadata } from "@/types/content";

interface BreadcrumbsProps {
  note: NoteMetadata;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ note }) => {
  // Compute breadcrumb path links
  // slug e.g. ["semester-1", "discrete-mathematics", "unit-1-set-theory"]
  const [semSlug, subSlug] = note.slug;
  const noteUrl = `/notes/${note.slug.join("/")}/`;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted overflow-x-auto whitespace-nowrap py-1.5 scrollbar-none">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors p-1 rounded hover:bg-white/[0.04]"
      >
        <Home className="w-3.5 h-3.5" />
        <span>BCA</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-white/20" />

      <Link
        href="/"
        className="hover:text-accent transition-colors px-1.5 py-0.5 rounded hover:bg-white/[0.04]"
      >
        Sem-{note.semester}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-white/20" />

      <Link
        href={noteUrl}
        className="hover:text-accent transition-colors px-1.5 py-0.5 rounded hover:bg-white/[0.04] max-w-[150px] sm:max-w-none truncate"
      >
        {note.subject}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-white/20" />

      <Link
        href={noteUrl}
        className="hover:text-accent transition-colors px-1.5 py-0.5 rounded hover:bg-white/[0.04] max-w-[150px] sm:max-w-none truncate"
      >
        {note.unit}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-white/20" />

      <span className="text-text-primary font-medium px-1.5 py-0.5 max-w-[180px] sm:max-w-none truncate">
        {note.title}
      </span>
    </nav>
  );
};
