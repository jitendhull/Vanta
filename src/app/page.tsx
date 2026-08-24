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
    <div className="max-w-[76ch] mx-auto space-y-10 animate-fade-in">
      {/* Hero header */}
      <div className="space-y-4 border-b border-border pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-text-primary">
          Vanta Notes Library
        </h1>

        <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">
          A free, fast, and structured digital notes archive for Bachelor of Computer Applications (BCA) students.
          Explore syllabus topics, verified code examples, and direct PDF downloads.
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
              : null;

            const CardContent = (
              <div
                className={`p-5 rounded-lg bg-surface border border-border transition-all duration-200 flex flex-col justify-between h-full group hover:border-accent hover:bg-surface-elevated hover:shadow-lg hover:shadow-accent/5 ${
                  targetUrl ? "cursor-pointer" : "opacity-85 hover:opacity-100"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded bg-surface-elevated border border-border group-hover:border-accent/30 group-hover:bg-accent-dim transition-colors">
                      {semesterIcons[sem.semester] || <BookOpen className="w-5 h-5 text-accent" />}
                    </div>
                    <span className="font-mono text-xs text-text-muted group-hover:text-text-subtle transition-colors">
                      {hasSubjects ? `${sem.subjects.length} Subjects` : "Coming Soon"}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans font-semibold text-base text-text-primary group-hover:text-accent transition-colors">
                      {sem.title}
                    </h3>
                    <p className="text-xs text-text-muted group-hover:text-text-primary/80 mt-1 line-clamp-2 transition-colors">
                      {hasSubjects
                        ? sem.subjects.map((s) => s.title).join(", ")
                        : "Curriculum indexing in progress."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-border group-hover:border-border-hover transition-colors">
                  {hasSubjects && firstNote ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Notes</span>
                      <span>→</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted group-hover:text-accent transition-colors">
                      <span>Under Preparation</span>
                      <span className="opacity-60 group-hover:opacity-100">⏳</span>
                    </span>
                  )}
                </div>
              </div>
            );

            if (targetUrl) {
              return (
                <Link key={sem.semester} href={targetUrl} className="block no-underline">
                  {CardContent}
                </Link>
              );
            }

            return (
              <div key={sem.semester}>
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature badges */}
      <div className="p-5 rounded-lg bg-surface border border-border space-y-3 font-mono text-xs text-text-muted">
        <div className="text-text-primary font-medium flex items-center gap-2">
          <span className="text-accent">✦</span>
          <span>KEY FEATURES</span>
        </div>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Callout boxes: clear highlights for definitions, verified rules, common mistakes, and practical examples.</li>
          <li>Dual theme support: refined light paper and dark obsidian color schemes.</li>
          <li>Fast and private: 100% static pages hosted on GitHub with zero tracking scripts.</li>
        </ul>
      </div>
    </div>
  );
}
