export interface NoteMetadata {
  title: string;
  semester: number; // 1 - 6
  subject: string; // e.g. "Discrete Mathematics"
  subjectSlug: string; // e.g. "discrete-mathematics"
  unit: string; // e.g. "Unit 1: Set Theory"
  unitSlug: string; // e.g. "unit-1-set-theory"
  slug: string[]; // ["semester-1", "discrete-mathematics", "unit-1-set-theory"]
  githubUrl: string; // Link to file in github repo
  rawGithubUrl: string; // Direct raw download link from github
  description?: string;
  order?: number;
}

export interface NoteItem extends NoteMetadata {
  content: string;
  filePath: string;
}

export interface UnitNode {
  title: string;
  slug: string;
  notes: NoteMetadata[];
}

export interface SubjectNode {
  title: string;
  slug: string;
  units: UnitNode[];
}

export interface SemesterNode {
  semester: number;
  title: string;
  subjects: SubjectNode[];
}

export type CatalogTree = SemesterNode[];
