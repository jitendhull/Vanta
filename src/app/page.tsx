import Link from "next/link";
import { BookOpen, Sparkles, Terminal, Cpu, Database, Network } from "lucide-react";
import { getCatalogTree } from "@/lib/content";

export default function HomePage() {
  const catalog = getCatalogTree();

  const semesterIcons: Record<number, React.ReactNode> = {
    1: <Terminal className="w-5 h-5 text-accent" />,
    2: <Cpu className="w-5 h-5 text-accent" />,
    3: <Database className="w-5 h-5 text-accent" />,
    4: <Network className="w-5 h-5 text-accent" />,
    5: <BookOpen className="w-5 h-5 text-accent" />,
    6: <Sparkles className="w-5 h-5 text-accent" />,
  };

  return (
    <div className="max-w-[76ch] mx-auto space-y-10">
      {/* Hero header */}
      <div className="space-y-4 border-b border-white/[0.08] pb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-accent/10 border border-accent/20 text-accent font-mono text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BCA ARCHIVE // 100% STATIC & OFFLINE-READY</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-text-primary">
          Vanta Notes Library
        </h1>

        <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">
          A minimalist digital repository and design system for Bachelor of Computer Applications students.
          Explore formal definitions, syntax guides, comparison charts, and download complete verified PDF notes.
        </p>
      </div>

      {/* Curriculum Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider text-text-muted">
            Curriculum Structure (Semesters 1 - 6)
          </h2>
          <span className="text-xs font-mono text-accent">6 Semesters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {catalog.map((sem) => {
            const hasSubjects = sem.subjects.length > 0;
            const firstNote = hasSubjects && sem.subjects[0].units[0]?.notes[0];
            const targetUrl = firstNote
              ? `/notes/${firstNote.slug.join("/")}/`
              : "#";

            return (
              <div
                key={sem.semester}
                className="p-5 rounded-lg bg-surface border border-white/[0.08] hover:border-accent/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
                      {semesterIcons[sem.semester] || <BookOpen className="w-5 h-5 text-accent" />}
                    </div>
                    <span className="font-mono text-xs text-text-muted">
                      {hasSubjects ? `${sem.subjects.length} Subjects` : "Coming Soon"}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-base text-text-primary group-hover:text-accent transition-colors">
                      {sem.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">
                      {hasSubjects
                        ? sem.subjects.map((s) => s.title).join(", ")
                        : "Curriculum indexing in progress."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.05]">
                  {hasSubjects && firstNote ? (
                    <Link
                      href={targetUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline"
                    >
                      <span>Explore Notes</span>
                      <span>→</span>
                    </Link>
                  ) : (
                    <span className="text-xs font-mono text-text-muted/60">Under Preparation</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature badges */}
      <div className="p-5 rounded-lg bg-surface/60 border border-white/[0.08] space-y-3 font-mono text-xs text-text-muted">
        <div className="text-text-primary font-medium flex items-center gap-2">
          <span>✦</span>
          <span>FEATURES & DESIGN CONSTRAINTS</span>
        </div>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Obsidian callouts support: Amber (definition), Green (valid), Red (pitfall), Blue (example).</li>
          <li>Zero dynamic servers: 100% static export on GitHub Pages with instant navigation.</li>
          <li>WebGL2 fluid backdrop running on throttled low-power GPU mode.</li>
        </ul>
      </div>
    </div>
  );
}
