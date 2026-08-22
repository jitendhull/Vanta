import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Layers,
  ShieldCheck,
  Terminal,
  User,
  Sparkles,
  Heart,
  MessageCircle,
  Mail,
  Globe,
} from "lucide-react";

export const metadata = {
  title: "About — Vanta BCA Notes Archive",
  description: "About the Vanta Bachelor of Computer Applications digital reference library.",
};

export default function AboutPage() {
  return (
    <article className="max-w-[76ch] mx-auto space-y-8 animate-fade-in py-2">
      {/* Navigation link */}
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
          A free, fast, and structured digital notes archive for Bachelor of Computer Applications (BCA) students.
        </p>
      </header>

      {/* Purpose */}
      <section className="space-y-3">
        <h2 className="text-sm font-mono uppercase tracking-wider text-text-muted">
          Purpose
        </h2>
        <p className="text-sm text-text-primary/90 leading-relaxed font-sans">
          Vanta helps BCA students study effectively without distractions. The content aligns with the syllabus of Maharishi Dayanand University (MDU, Rohtak). Students can read curriculum topics online, check verified code examples, and download offline PDF study materials directly.
        </p>
      </section>

      {/* Creator Profile */}
      <section className="p-5 rounded-lg bg-surface border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2 text-text-primary">
            <User className="w-4 h-4 text-accent" />
            <h2 className="font-sans text-sm font-semibold">Creator & Maintainer</h2>
          </div>
          <span className="text-[11px] font-mono text-text-muted bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
            BCA 2026 // Sec A // Roll 22
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-base font-semibold text-text-primary">Jiten Dhull</h3>
            <p className="text-xs text-text-muted mt-0.5">
              BCA 1st Year Student, Maharishi Dayanand University (MDU), Rohtak (Hosteller)
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="https://jitendhull.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-text-primary hover:text-accent transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>jitendhull.tech</span>
            </a>
            <a
              href="https://github.com/jitendhull"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-text-primary hover:text-accent transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>jitendhull</span>
            </a>
            <a
              href="https://www.linkedin.com/in/jitendhull/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-text-primary hover:text-accent transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45m1.37 9.74v-8.37H5.09v8.37h2.74z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://instagram.com/jiten_dhull"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-text-primary hover:text-accent transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>@jiten_dhull</span>
            </a>
            <a
              href="mailto:jitendhull2009@gmail.com"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-text-primary hover:text-accent transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="space-y-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-text-muted">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <Terminal className="w-4 h-4" />
              <span className="font-mono text-xs font-semibold uppercase">Accurate Code Examples</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Read syntax-highlighted code in C, Java, and SQL with clear explanations and notes on complexity.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <Layers className="w-4 h-4" />
              <span className="font-mono text-xs font-semibold uppercase">Structured Curriculum</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Browse Semesters 1 through 6 organized logically by subject, unit, and exam topic.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <BookOpen className="w-4 h-4" />
              <span className="font-mono text-xs font-semibold uppercase">Direct Downloads</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Open source markdown files on GitHub or download printable PDF notes with one click.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 text-accent">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-mono text-xs font-semibold uppercase">Private and Fast</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              No ads, no tracking scripts, and no sign-up required. Pages load instantly as static content.
            </p>
          </div>
        </div>
      </section>

      {/* Contributions & Roadmap */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Contributions */}
        <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <MessageCircle className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold uppercase">How to Contribute</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Have corrections, new notes, or study guides? Reach out directly by sending a message or talking in person on campus or in the hostel.
          </p>
        </div>

        {/* Roadmap */}
        <div className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Sparkles className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold uppercase">Upcoming Additions</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Multiple-choice quizzes, AI summaries, interactive practice questions, and notes for higher semesters.
          </p>
        </div>
      </section>

      {/* Credits */}
      <section className="p-4 rounded-lg bg-surface border border-white/[0.08] space-y-2">
        <div className="flex items-center gap-2 text-accent">
          <Heart className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold uppercase">Credits</span>
        </div>
        <p className="text-xs text-text-muted leading-relaxed">
          Special thanks to <span className="text-text-primary font-medium">kern (Arjun Ahlawat)</span> for creating the original notes.
        </p>
      </section>

      {/* Maintainer Footer */}
      <footer className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-text-muted">
        <span>Vanta // BCA Digital Reference</span>
        <span>Version 1.0</span>
      </footer>
    </article>
  );
}
