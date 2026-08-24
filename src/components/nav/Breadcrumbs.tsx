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

  const isCurrentSubject = targetSubjectUrl === currentNoteUrl;
  const isCurrentUnit = targetUnitUrl === currentNoteUrl;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs font-mono text-text-muted overflow-x-auto whitespace-nowrap p-1.5 px-2.5 rounded-full bg-surface border border-border backdrop-blur-md mb-6 w-fit max-w-full"
    >
      <Link
        href="/"
        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-text-muted hover:text-accent hover:bg-surface-elevated transition-all font-medium"
        title="Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span>BCA</span>
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-text-muted/40" />

      <Link
        href={semUrl}
        className="px-2.5 py-1 rounded-full text-text-muted hover:text-accent hover:bg-surface-elevated transition-all"
        title={`Semester ${note.semester}`}
      >
        Sem-{note.semester}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-text-muted/40" />

      <Link
        href={targetSubjectUrl}
        className={`px-2.5 py-1 rounded-full max-w-[160px] sm:max-w-none truncate transition-all ${
          isCurrentSubject
            ? "text-text-primary bg-surface-elevated cursor-default pointer-events-none"
            : "text-text-muted hover:text-accent hover:bg-surface-elevated"
        }`}
        title={note.subject}
      >
        {note.subject}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-text-muted/40" />

      <Link
        href={targetUnitUrl}
        className={`px-2.5 py-1 rounded-full max-w-[160px] sm:max-w-none truncate transition-all ${
          isCurrentUnit
            ? "text-text-primary bg-surface-elevated cursor-default pointer-events-none"
            : "text-text-muted hover:text-accent hover:bg-surface-elevated"
        }`}
        title={note.unit}
      >
        {note.unit}
      </Link>

      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-text-muted/40" />

      <span
        className="px-2.5 py-1 rounded-full bg-accent-dim text-accent font-medium max-w-[200px] sm:max-w-none truncate"
        title={note.title}
      >
        {note.title}
      </span>
    </nav>
  );
};
