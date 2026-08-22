import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { NoteMetadata } from "@/types/content";

interface BreadcrumbsProps {
  note: NoteMetadata;
  semUrl?: string;
  subjectUrl?: string;
  unitUrl?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  note,
  semUrl = "/",
  subjectUrl,
  unitUrl,
}) => {
  const currentNoteUrl = `/notes/${note.slug.join("/")}/`;
  const targetSubjectUrl = subjectUrl || currentNoteUrl;
  const targetUnitUrl = unitUrl || currentNoteUrl;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs font-mono text-text-muted overflow-x-auto whitespace-nowrap py-2 border-b border-white/[0.06] mb-4"
    >
      <Link
        href="/"
        className="flex items-center gap-1 px-2 py-1 rounded bg-white/[0.03] hover:bg-accent/15 text-text-muted hover:text-accent border border-white/[0.06] hover:border-accent/30 transition-all font-semibold"
        title="Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span>BCA</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-white/20" />

      <Link
        href={semUrl}
        className="px-2 py-1 rounded bg-white/[0.03] hover:bg-accent/15 text-text-muted hover:text-accent border border-white/[0.06] hover:border-accent/30 transition-all"
        title={`Semester ${note.semester}`}
      >
        Sem-{note.semester}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-white/20" />

      <Link
        href={targetSubjectUrl}
        className="px-2 py-1 rounded bg-white/[0.03] hover:bg-accent/15 text-text-muted hover:text-accent border border-white/[0.06] hover:border-accent/30 transition-all max-w-[160px] sm:max-w-none truncate"
        title={note.subject}
      >
        {note.subject}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-white/20" />

      <Link
        href={targetUnitUrl}
        className="px-2 py-1 rounded bg-white/[0.03] hover:bg-accent/15 text-text-muted hover:text-accent border border-white/[0.06] hover:border-accent/30 transition-all max-w-[160px] sm:max-w-none truncate"
        title={note.unit}
      >
        {note.unit}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-white/20" />

      <span
        className="px-2 py-1 rounded bg-accent/10 text-accent font-medium border border-accent/20 max-w-[200px] sm:max-w-none truncate"
        title={note.title}
      >
        {note.title}
      </span>
    </nav>
  );
};
