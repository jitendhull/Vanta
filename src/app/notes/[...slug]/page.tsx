import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/lib/content";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { MarkdownViewer } from "@/components/viewer/MarkdownViewer";
import { PdfViewer } from "@/components/viewer/PdfViewer";

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

  return (
    <article className="max-w-[76ch] mx-auto space-y-6">
      {/* Top Breadcrumbs */}
      <Breadcrumbs note={note} />

      {/* Note Header Title */}
      <header className="border-b border-white/[0.08] pb-4 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-text-primary">
          {note.title}
        </h1>
        {note.description && (
          <p className="text-sm text-text-muted font-sans leading-relaxed">
            {note.description}
          </p>
        )}
      </header>

      {/* Direct PDF Access & Download Bar */}
      <PdfViewer pdfUrl={note.pdfUrl} title={note.title} />

      {/* Core Markdown Content */}
      <div className="py-2">
        <MarkdownViewer content={note.content} />
      </div>

      {/* Bottom orientation metadata */}
      <footer className="mt-12 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-text-muted">
        <span>Semester {note.semester} // {note.subject}</span>
        <span>Unit: {note.unit}</span>
      </footer>
    </article>
  );
}
