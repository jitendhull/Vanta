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

    // Generate direct GitHub repository URL for PDF
    // points to github repo blob viewer/downloader: https://github.com/jitendhull/Vanta/blob/main/public/notes/...
    const pdfRelPath = rel.replace(/\.mdx?$/, ".pdf").replace(/\\/g, "/");
    const githubPdfUrl = `https://github.com/jitendhull/Vanta/blob/main/public/notes/${pdfRelPath}`;

    const noteMeta: NoteMetadata = {
      title: data.title || parts[parts.length - 1].replace(/-/g, " "),
      semester,
      subject: data.subject || subjectSlug.replace(/-/g, " "),
      subjectSlug,
      unit: data.unit || unitSlug.replace(/-/g, " "),
      unitSlug,
      slug: parts,
      pdfUrl: (data.pdfUrl && !data.pdfUrl.startsWith("/"))
        ? data.pdfUrl
        : (data.pdf && !data.pdf.startsWith("/"))
        ? data.pdf
        : githubPdfUrl,
      githubUrl: `https://github.com/jitendhull/Vanta/blob/main/content/${rel}`,
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

export function getFirstNoteBySemester(semester: number): NoteItem | null {
  const notes = getAllNotes();
  return notes.find((n) => n.semester === semester) || null;
}

export function getFirstNoteBySubject(semester: number, subjectSlug: string): NoteItem | null {
  const notes = getAllNotes();
  return notes.find((n) => n.semester === semester && n.subjectSlug === subjectSlug) || null;
}

export function getFirstNoteByUnit(semester: number, subjectSlug: string, unitSlug: string): NoteItem | null {
  const notes = getAllNotes();
  return (
    notes.find(
      (n) => n.semester === semester && n.subjectSlug === subjectSlug && n.unitSlug === unitSlug
    ) || null
  );
}

// Official BCA Curriculum Definition for MDU (Semesters 1 - 6)
export const OFFICIAL_CURRICULUM: SemesterNode[] = [
  {
    semester: 1,
    title: "Semester 1",
    subjects: [
      {
        title: "Mathematics Foundation to Computer Science - I",
        slug: "math-foundation-1",
        units: [
          { title: "Unit I: Set, Relation and Function", slug: "unit-1-set-relation-function", notes: [] },
          { title: "Unit II: Counting and Recurrence Relation", slug: "unit-2-counting-recurrence", notes: [] },
          { title: "Unit III: Elementary Graph Theory", slug: "unit-3-elementary-graph-theory", notes: [] },
          { title: "Unit IV: Matrix Algebra", slug: "unit-4-matrix-algebra", notes: [] },
        ],
      },
      {
        title: "Problem Solving Techniques",
        slug: "problem-solving-techniques",
        units: [
          { title: "Unit I: Problem Solving & Computational Thinking", slug: "unit-1-problem-solving-steps", notes: [] },
          { title: "Unit II: Structured Programming & C Basics", slug: "unit-2-structured-programming", notes: [] },
          { title: "Unit III: Control Flow & Number Logic", slug: "unit-3-control-flow-number-logic", notes: [] },
          { title: "Unit IV: Modular Programming, Arrays & Strings", slug: "unit-4-modular-programming-arrays", notes: [] },
        ],
      },
      {
        title: "Computer Architecture",
        slug: "computer-architecture",
        units: [
          { title: "Unit I: Digital Principles & Number Systems", slug: "unit-1-digital-principles", notes: [] },
          { title: "Unit II: Combinational & Sequential Circuits", slug: "unit-2-circuits-and-registers", notes: [] },
          { title: "Unit III: Basic Computer Organization & CPU", slug: "unit-3-computer-organization-cpu", notes: [] },
          { title: "Unit IV: Pipeline, I/O & Memory Hierarchy", slug: "unit-4-pipeline-io-memory", notes: [] },
        ],
      },
      {
        title: "General English - I",
        slug: "general-english-1",
        units: [
          { title: "Unit I: Vocabulary & Basic Writing Skills", slug: "unit-1-vocabulary-writing", notes: [] },
          { title: "Unit II: Common Errors in Writing", slug: "unit-2-common-errors", notes: [] },
          { title: "Unit III: Styles of Sensible Writing", slug: "unit-3-sensible-writing-précis", notes: [] },
          { title: "Unit IV: Oral & Professional Communication", slug: "unit-4-oral-communication", notes: [] },
        ],
      },
      {
        title: "Indian Knowledge System (IKS-I)",
        slug: "indian-knowledge-system-1",
        units: [
          { title: "Module 1: Introduction to IKS", slug: "module-1-intro-to-iks", notes: [] },
          { title: "Module 2: Introduction to Creative Practices", slug: "module-2-creative-practices", notes: [] },
        ],
      },
      {
        title: "Environmental Science and Sustainability",
        slug: "environmental-science",
        units: [
          { title: "Unit I: Environment, Resources & Sustainability", slug: "unit-1-environment-sustainability", notes: [] },
          { title: "Unit II: Ecosystems & Biodiversity", slug: "unit-2-ecosystems-biodiversity", notes: [] },
          { title: "Unit III: Pollution & Sustainable Development", slug: "unit-3-pollution-management", notes: [] },
          { title: "Unit IV: Environmental Legislation & Social Issues", slug: "unit-4-social-issues-legislation", notes: [] },
        ],
      },
    ],
  },
  {
    semester: 2,
    title: "Semester 2",
    subjects: [
      {
        title: "Data Structures & Algorithms",
        slug: "data-structures",
        units: [
          { title: "Unit I: Linear Data Structures", slug: "unit-1-linear-structures", notes: [] },
          { title: "Unit II: Trees & Non-Linear Structures", slug: "unit-2-trees-graphs", notes: [] },
        ],
      },
    ],
  },
  {
    semester: 3,
    title: "Semester 3",
    subjects: [
      {
        title: "Database Management Systems",
        slug: "dbms",
        units: [
          { title: "Unit I: Relational Model & SQL", slug: "unit-1-relational-model", notes: [] },
        ],
      },
    ],
  },
  {
    semester: 4,
    title: "Semester 4",
    subjects: [
      {
        title: "Computer Networks",
        slug: "computer-networks",
        units: [
          { title: "Unit I: Network Architectures & Protocols", slug: "unit-1-network-architectures", notes: [] },
        ],
      },
    ],
  },
  {
    semester: 5,
    title: "Semester 5",
    subjects: [
      {
        title: "Java & Object Oriented Programming",
        slug: "java-oop",
        units: [
          { title: "Unit I: JVM Architecture & Core Java", slug: "unit-1-jvm-architecture", notes: [] },
        ],
      },
    ],
  },
  {
    semester: 6,
    title: "Semester 6",
    subjects: [
      {
        title: "Web Technologies & Cloud",
        slug: "web-technologies",
        units: [
          { title: "Unit I: Web Foundations & REST APIs", slug: "unit-1-rest-http", notes: [] },
        ],
      },
    ],
  },
];

export function getCatalogTree(): CatalogTree {
  const notes = getAllNotes();

  // Deep clone the official curriculum structure
  const catalog: CatalogTree = JSON.parse(JSON.stringify(OFFICIAL_CURRICULUM));

  for (const note of notes) {
    let semNode = catalog.find((s) => s.semester === note.semester);
    if (!semNode) {
      semNode = {
        semester: note.semester,
        title: `Semester ${note.semester}`,
        subjects: [],
      };
      catalog.push(semNode);
    }

    let subNode = semNode.subjects.find((s) => s.slug === note.subjectSlug);
    if (!subNode) {
      subNode = {
        title: note.subject,
        slug: note.subjectSlug,
        units: [],
      };
      semNode.subjects.push(subNode);
    }

    let unitNode = subNode.units.find((u) => u.slug === note.unitSlug);
    if (!unitNode) {
      unitNode = {
        title: note.unit,
        slug: note.unitSlug,
        notes: [],
      };
      subNode.units.push(unitNode);
    }

    unitNode.notes.push(note);
  }

  return catalog.sort((a, b) => a.semester - b.semester);
}
