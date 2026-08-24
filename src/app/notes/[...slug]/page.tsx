import { notFound } from "next/navigation";
import {
  getAllNotes,
  getNoteBySlug,
  getFirstNoteBySemester,
  getFirstNoteBySubject,
  getFirstNoteByUnit,
} from "@/lib/content";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { MarkdownViewer } from "@/components/viewer/MarkdownViewer";
import { NoteSourceBar } from "@/components/viewer/NoteSourceBar";

interface NotePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const semNote = getFirstNoteBySemester(note.semester);
  const subjectNote = getFirstNoteBySubject(note.semester, note.subjectSlug);
  const unitNote = getFirstNoteByUnit(note.semester, note.subjectSlug, note.unitSlug);

  const semUrl = semNote ? `/notes/${semNote.slug.join("/")}/` : "/";
  const subjectUrl = subjectNote ? `/notes/${subjectNote.slug.join("/")}/` : undefined;
  const unitUrl = unitNote ? `/notes/${unitNote.slug.join("/")}/` : undefined;

  return (
    <article className="max-w-[76ch] mx-auto space-y-6 animate-fade-in">
      {/* Top Breadcrumbs */}
      <Breadcrumbs
        note={note}
        semUrl={semUrl}
        subjectUrl={subjectUrl}
        unitUrl={unitUrl}
      />

      {/* Note Header Title */}
      <header className="border-b border-border pb-4 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-text-primary">
          {note.title}
        </h1>
        {note.description && (
          <p className="text-sm text-text-muted font-sans leading-relaxed">
            {note.description}
          </p>
        )}
      </header>

      {/* GitHub Source Access & Download Bar */}
      <NoteSourceBar
        pdfUrl={note.pdfUrl}
        githubUrl={note.githubUrl}
        title={note.title}
      />

      {/* Core Markdown Content */}
      <div className="py-2">
        <MarkdownViewer content={note.content} />
      </div>

      {/* Bottom orientation metadata */}
      <footer className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs font-mono text-text-muted">
        <span>Semester {note.semester} // {note.subject}</span>
        <span>Unit: {note.unit}</span>
      </footer>
    </article>
  );
}
