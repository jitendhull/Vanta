"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Search,
  BookOpen,
  GraduationCap,
  FileText,
  Layers,
  X
} from "lucide-react";
import { CatalogTree, NoteMetadata } from "@/types/content";
import { searchNotes } from "@/lib/search";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface SidebarProps {
  catalog: CatalogTree;
  allNotes: NoteMetadata[];
  onSelectNote?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ catalog, allNotes, onSelectNote }) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  // State for expanded semesters & subjects
  const [expandedSemesters, setExpandedSemesters] = useState<Record<number, boolean>>({
    1: true,
  });
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!pathname || !pathname.startsWith("/notes/")) return;
    const parts = pathname.replace(/^\/notes\//, "").replace(/\/$/, "").split("/");
    if (parts.length >= 1) {
      const semMatch = parts[0].match(/semester-(\d+)/i);
      if (semMatch) {
        const semNum = parseInt(semMatch[1], 10);
        setExpandedSemesters((prev) => ({ ...prev, [semNum]: true }));
      }
    }
    if (parts.length >= 2) {
      setExpandedSubjects((prev) => ({ ...prev, [parts[1]]: true }));
    }
    if (parts.length >= 3) {
      setExpandedUnits((prev) => ({ ...prev, [parts[2]]: true }));
    }
  }, [pathname]);

  const handleNoteClick = (note: NoteMetadata) => {
    setExpandedSemesters((prev) => ({ ...prev, [note.semester]: true }));
    setExpandedSubjects((prev) => ({ ...prev, [note.subjectSlug]: true }));
    setExpandedUnits((prev) => ({ ...prev, [note.unitSlug]: true }));
    if (searchQuery) setSearchQuery("");
    if (onSelectNote) onSelectNote();
  };

  const toggleSemester = (sem: number) => {
    setExpandedSemesters((prev) => ({ ...prev, [sem]: !prev[sem] }));
  };

  const toggleSubject = (slug: string) => {
    setExpandedSubjects((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const toggleUnit = (slug: string) => {
    setExpandedUnits((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  // Search Results
  const searchResults = useMemo(() => {
    return searchNotes(allNotes, searchQuery);
  }, [allNotes, searchQuery]);

  return (
    <aside className="w-80 md:w-84 flex flex-col h-full bg-surface/95 backdrop-blur-md border-r border-border select-none">
      {/* Header / Brand */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Link
          href="/"
          onClick={onSelectNote}
          className="flex items-center gap-3 text-text-primary hover:text-accent transition-colors group"
        >
          <div className="w-8 h-8 rounded-md bg-accent-dim border border-accent/30 flex items-center justify-center text-accent text-sm font-mono font-bold group-hover:bg-accent/25 transition-all">
            ✦
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide font-mono flex items-center gap-1.5">
              <span>VANTA</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-accent-dim text-accent border border-accent/20">BCA</span>
            </div>
            <div className="text-[11px] text-text-muted font-mono tracking-tight">DIGITAL ARCHIVE</div>
          </div>
        </Link>

        {/* Theme switcher */}
        <ThemeToggle />
      </div>

      {/* Filter / Search Bar */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search notes, units, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border focus:border-accent rounded-md px-3 py-2 pl-9 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tree Content / Search Results */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 text-sm">
        {searchQuery ? (
          <div className="space-y-1.5 py-1">
            <div className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-text-muted">
              Matching Notes ({searchResults.length})
            </div>
            {searchResults.length === 0 ? (
              <div className="px-3 py-6 text-center text-text-muted font-mono text-sm">
                No matching topics found.
              </div>
            ) : (
              searchResults.map(({ note }) => {
                const noteUrl = `/notes/${note.slug.join("/")}/`;
                const isActive = pathname === noteUrl || pathname === `/notes/${note.slug.join("/")}`;

                return (
                  <Link
                    key={note.slug.join("/")}
                    href={noteUrl}
                    onClick={() => handleNoteClick(note)}
                    className={`flex flex-col gap-1 px-3.5 py-2.5 rounded-md transition-colors ${
                      isActive
                        ? "bg-accent-dim text-accent border-l-2 border-accent font-medium"
                        : "text-text-primary hover:bg-surface-elevated"
                    }`}
                  >
                    <div className="font-sans font-medium text-sm truncate">{note.title}</div>
                    <div className="text-xs font-mono text-text-muted truncate">
                      Sem-{note.semester} › {note.subject} › {note.unit}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        ) : (
          catalog.map((sem) => {
            const isSemExpanded = !!expandedSemesters[sem.semester];
            const hasSubjects = sem.subjects.length > 0;

            return (
              <div key={sem.semester} className="space-y-1">
                {/* Semester Row */}
                <button
                  onClick={() => toggleSemester(sem.semester)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-surface-elevated text-text-primary transition-colors text-left group"
                >
                  <div className="flex items-center gap-2.5 font-mono font-medium text-sm tracking-tight">
                    <GraduationCap className="w-4 h-4 text-accent" />
                    <span>{sem.title}</span>
                  </div>
                  {hasSubjects ? (
                    isSemExpanded ? (
                      <ChevronDown className="w-4 h-4 text-text-muted" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-text-muted" />
                    )
                  ) : (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-elevated text-text-muted border border-border">
                      soon
                    </span>
                  )}
                </button>

                {/* Subjects List */}
                {isSemExpanded && hasSubjects && (
                  <div className="pl-3 space-y-1 border-l border-border ml-4 my-1">
                    {sem.subjects.map((subject) => {
                      const isSubExpanded = !!expandedSubjects[subject.slug];

                      return (
                        <div key={subject.slug} className="space-y-1">
                          {/* Subject Row */}
                          <button
                            onClick={() => toggleSubject(subject.slug)}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-surface-elevated text-text-primary transition-colors text-left"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <BookOpen className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                              <span className="truncate font-sans font-medium text-[13px]">{subject.title}</span>
                            </div>
                            {isSubExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                            )}
                          </button>

                          {/* Units List */}
                          {isSubExpanded && (
                            <div className="pl-3 space-y-0.5 border-l border-border ml-3 my-0.5">
                              {subject.units.map((unit) => {
                                const isUnitExpanded = !!expandedUnits[unit.slug];

                                return (
                                  <div key={unit.slug} className="space-y-0.5">
                                    {/* Unit Row */}
                                    {unit.notes.length > 0 ? (
                                      <button
                                        onClick={() => toggleUnit(unit.slug)}
                                        className="w-full flex items-center justify-between px-2.5 py-1 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors text-left"
                                      >
                                        <div className="flex items-center gap-1.5 truncate">
                                          <Layers className="w-3 h-3 flex-shrink-0" />
                                          <span className="truncate font-mono text-xs">{unit.title}</span>
                                        </div>
                                        {isUnitExpanded ? (
                                          <ChevronDown className="w-3 h-3 flex-shrink-0" />
                                        ) : (
                                          <ChevronRight className="w-3 h-3 flex-shrink-0" />
                                        )}
                                      </button>
                                    ) : (
                                      <div className="flex items-center justify-between px-2.5 py-1 text-text-muted/60 text-left">
                                        <div className="flex items-center gap-1.5 truncate">
                                          <Layers className="w-3 h-3 flex-shrink-0 opacity-40" />
                                          <span className="truncate font-mono text-xs">{unit.title}</span>
                                        </div>
                                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-surface-elevated text-text-muted border border-border">soon</span>
                                      </div>
                                    )}

                                    {/* Notes Links */}
                                    {isUnitExpanded && (
                                      <div className="pl-3 space-y-0.5 border-l border-border ml-2.5 my-0.5">
                                        {unit.notes.map((note) => {
                                          const noteUrl = `/notes/${note.slug.join("/")}/`;
                                          const isActive =
                                            pathname === noteUrl ||
                                            pathname === `/notes/${note.slug.join("/")}`;

                                          return (
                                            <Link
                                              key={note.slug.join("/")}
                                              href={noteUrl}
                                              onClick={() => handleNoteClick(note)}
                                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors text-xs ${
                                                isActive
                                                  ? "bg-accent-dim text-accent font-medium border-l-2 border-accent"
                                                  : "text-text-muted hover:text-text-primary hover:bg-surface-elevated"
                                              }`}
                                            >
                                              <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                                              <span className="truncate">{note.title}</span>
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-border text-xs font-mono text-text-muted flex items-center justify-between">
        <span>BCA 2026 // ED.</span>
        <Link
          href="/about/"
          onClick={onSelectNote}
          className={`hover:text-accent transition-colors flex items-center gap-1 ${
            pathname === "/about/" || pathname === "/about"
              ? "text-accent font-semibold"
              : "text-text-muted"
          }`}
        >
          <span>About Us</span>
          <span>→</span>
        </Link>
      </div>
    </aside>
  );
};
