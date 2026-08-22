import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CatalogTree, NoteItem, NoteMetadata, SemesterNode, SubjectNode, UnitNode } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Helper to recursively find all markdown files
function getMarkdownFiles(dir: string, baseDir = dir): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getMarkdownFiles(fullPath, baseDir));
    } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getAllNotes(): NoteItem[] {
  const files = getMarkdownFiles(CONTENT_DIR);
  const notes: NoteItem[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(raw);

    // Compute slug relative to content dir
    const rel = path.relative(CONTENT_DIR, file).replace(/\\/g, "/");
    // e.g. "semester-1/discrete-mathematics/unit-1-set-theory.md"
    const parts = rel.replace(/\.mdx?$/, "").split("/");

    const semMatch = parts[0]?.match(/semester-(\d+)/i);
    const semester = semMatch ? parseInt(semMatch[1], 10) : (data.semester || 1);

    const subjectSlug = parts[1] || data.subjectSlug || "general";
    const unitSlug = parts[2] || data.unitSlug || "unit-1";

    const noteMeta: NoteMetadata = {
      title: data.title || parts[parts.length - 1].replace(/-/g, " "),
      semester,
      subject: data.subject || subjectSlug.replace(/-/g, " "),
      subjectSlug,
      unit: data.unit || unitSlug.replace(/-/g, " "),
      unitSlug,
      slug: parts,
      githubUrl: `https://github.com/jitendhull/Vanta/blob/main/content/${rel}`,
      rawGithubUrl: `https://raw.githubusercontent.com/jitendhull/Vanta/main/content/${rel}`,
      description: data.description || "",
      order: data.order !== undefined ? data.order : 0,
    };

    notes.push({
      ...noteMeta,
      content,
      filePath: file,
    });
  }

  // Sort notes by semester, subject, unit, order
  return notes.sort((a, b) => {
    if (a.semester !== b.semester) return a.semester - b.semester;
    if (a.subjectSlug !== b.subjectSlug) return a.subjectSlug.localeCompare(b.subjectSlug);
    if (a.unitSlug !== b.unitSlug) return a.unitSlug.localeCompare(b.unitSlug);
    return (a.order || 0) - (b.order || 0);
  });
}

export function getNoteBySlug(slugArray: string[]): NoteItem | null {
  const notes = getAllNotes();
  const slugPath = slugArray.join("/");
  return notes.find((n) => n.slug.join("/") === slugPath) || null;
}

export function getCatalogTree(): CatalogTree {
  const notes = getAllNotes();
  const semesterMap = new Map<number, Map<string, Map<string, NoteMetadata[]>>>();

  // Ensure default semesters 1 through 6 exist
  for (let sem = 1; sem <= 6; sem++) {
    if (!semesterMap.has(sem)) {
      semesterMap.set(sem, new Map());
    }
  }

  for (const note of notes) {
    const sem = note.semester;
    if (!semesterMap.has(sem)) {
      semesterMap.set(sem, new Map());
    }

    const subMap = semesterMap.get(sem)!;
    if (!subMap.has(note.subjectSlug)) {
      subMap.set(note.subjectSlug, new Map());
    }

    const unitMap = subMap.get(note.subjectSlug)!;
    if (!unitMap.has(note.unitSlug)) {
      unitMap.set(note.unitSlug, []);
    }

    unitMap.get(note.unitSlug)!.push(note);
  }

  const catalog: CatalogTree = [];

  for (const [semNum, subMap] of Array.from(semesterMap.entries()).sort(([a], [b]) => a - b)) {
    const subjects: SubjectNode[] = [];

    for (const [subSlug, unitMap] of subMap.entries()) {
      const units: UnitNode[] = [];
      let subjectTitle = subSlug.replace(/-/g, " ");

      for (const [uSlug, noteList] of unitMap.entries()) {
        if (noteList.length > 0) {
          subjectTitle = noteList[0].subject;
        }
        const unitTitle = noteList.length > 0 ? noteList[0].unit : uSlug.replace(/-/g, " ");

        units.push({
          title: unitTitle,
          slug: uSlug,
          notes: noteList,
        });
      }

      subjects.push({
        title: subjectTitle,
        slug: subSlug,
        units,
      });
    }

    catalog.push({
      semester: semNum,
      title: `Semester ${semNum}`,
      subjects,
    });
  }

  return catalog;
}
