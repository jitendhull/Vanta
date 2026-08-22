import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, ShieldCheck, Terminal } from "lucide-react";

export const metadata = {
  title: "About — Vanta BCA Notes Archive",
  description: "About the Vanta Bachelor of Computer Applications digital reference library.",
};

export default function AboutPage() {
  return (
    <article className="max-w-[76ch] mx-auto space-y-8 animate-fade-in py-2">
      {/* Navigation back link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Library</span>
        </Link>
      </div>

      {/* Header */}
      <header className="border-b border-white/[0.08] pb-6 space-y-2">
        <h1 className="text-3xl font-bold font-sans tracking-tight text-text-primary">
          About Vanta
        </h1>
        <p className="text-sm text-text-muted font-sans leading-relaxed">
          A minimalist digital reference system and note archive built for BCA students.
        </p>
      </header>

      {/* Mission statement */}
      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-text-muted">
          Philosophy & Mission
        </h2>
        <p className="text-sm text-text-primary/90 leading-relaxed font-sans">
          Vanta is designed to make computer application coursework straightforward and distraction-free.
          Instead of cluttered course portals or broken downloads, it provides direct access to structured
          curriculum topics, syntax references, core mathematical foundations, and verified offline PDF study material.
        </p>
      </section>

      {/* Grid of Core Pillars */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold uppercase">Clean Syntax & Code</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Practical C, Java, and Database scripts formatted with precise syntax highlighting and runtime complexity notes.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Layers className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold uppercase">Structured Curriculum</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Indexed across Semesters 1 through 6, organized strictly by subjects, units, and exam-relevant topics.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <BookOpen className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold uppercase">Direct Repository Access</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Every note connects directly to its version-controlled GitHub repository source for instant raw reading and offline PDF downloads.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold uppercase">100% Static & Private</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Zero trackers, zero analytics, zero external API delays. High performance static pages delivered via GitHub Pages.
          </p>
        </div>
      </section>

      {/* Maintainer Footer */}
      <footer className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-text-muted">
        <span>Vanta // BCA Digital Reference</span>
        <span>Version 1.0</span>
      </footer>
    </article>
  );
}
