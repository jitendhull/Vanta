import { NoteMetadata } from "@/types/content";

export interface SearchResult {
  note: NoteMetadata;
  matchedField: "title" | "subject" | "unit" | "description";
  highlightSnippet?: string;
}

export function searchNotes(notes: NoteMetadata[], query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const note of notes) {
    const titleMatch = note.title.toLowerCase().includes(q);
    const subjectMatch = note.subject.toLowerCase().includes(q);
    const unitMatch = note.unit.toLowerCase().includes(q);
    const descMatch = (note.description || "").toLowerCase().includes(q);

    if (titleMatch) {
      results.push({ note, matchedField: "title" });
    } else if (subjectMatch) {
      results.push({ note, matchedField: "subject" });
    } else if (unitMatch) {
      results.push({ note, matchedField: "unit" });
    } else if (descMatch) {
      results.push({ note, matchedField: "description" });
    }
  }

  return results;
}
