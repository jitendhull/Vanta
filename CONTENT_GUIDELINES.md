# Vanta Content & Note Creation Guidelines

Official specification for generating and organizing curriculum notes in the Vanta BCA digital archive (MDU Rohtak syllabus).

---

## 1. Directory Structure & File Locations

All notes and matching companion PDF files live under `content/`.

```text
content/
└── semester-[1-6]/
    └── [subject-slug]/
        ├── [unit-slug]-[topic-slug].md
        └── [unit-slug]-[topic-slug].pdf
```

### Exact Folder & File Mappings (Semester 1)

#### 1. Mathematics Foundation to Computer Science - I
- **Subject folder:** `content/semester-1/math-foundation-1/`
- **Unit 1:** `unit-1-set-relation-function/` or file prefix `unit-1-*.md`
  - Syllabus: Sets, Operations, Venn Diagrams, Cartesian Products, Relations (properties, matrices, Warshall's alg), Functions (composition, bijection, inverse).
- **Unit 2:** `unit-2-counting-recurrence/` or file prefix `unit-2-*.md`
  - Syllabus: Pigeonhole principle, Permutations, Combinations, Binomial theorem, Linear recurrence relations (Fibonacci, Hanoi).
- **Unit 3:** `unit-3-elementary-graph-theory/` or file prefix `unit-3-*.md`
  - Syllabus: Graph types, paths, cycles, Euler/Hamiltonian graphs, Trees, Spanning trees, Planar graphs.
- **Unit 4:** `unit-4-matrix-algebra/` or file prefix `unit-4-*.md`
  - Syllabus: Matrix operations, Determinants, Rank, Inverse, Eigenvalues/Eigenvectors, Cayley-Hamilton.

#### 2. Problem Solving Techniques
- **Subject folder:** `content/semester-1/problem-solving-techniques/`
- **Unit 1:** `unit-1-problem-solving-steps/` or `unit-1-*.md` (Computational problems, analysis, algorithm efficiency, correctness, subproblems, I/O validation).
- **Unit 2:** `unit-2-structured-programming/` or `unit-2-*.md` (Structured programming, pseudocode/flowcharts, data representation signed/IEEE-754, C intro).
- **Unit 3:** `unit-3-control-flow-number-logic/` or `unit-3-*.md` (Number algorithms: prime, palindrome, Armstrong, base conversion; C control flow).
- **Unit 4:** `unit-4-modular-programming-arrays/` or `unit-4-*.md` (Modular programming, recursion, 1D/2D arrays, string handling, debugging in C).

#### 3. Computer Architecture
- **Subject folder:** `content/semester-1/computer-architecture/`
- **Unit 1:** `unit-1-digital-principles/` or `unit-1-*.md` (Digital principles, Von Neumann, Boolean algebra, K-Maps, Number systems, binary codes).
- **Unit 2:** `unit-2-circuits-and-registers/` or `unit-2-*.md` (Combinational adders/decoders/MUX; Flip-flops SR/D/JK/T, Registers, Counters).
- **Unit 3:** `unit-3-computer-organization-cpu/` or `unit-3-*.md` (Instruction codes, CPU register organization, stack, addressing modes, RISC vs CISC).
- **Unit 4:** `unit-4-pipeline-io-memory/` or `unit-4-*.md` (Pipelining, DMA, interrupts, Memory hierarchy, Cache, Virtual memory).

#### 4. General English - I
- **Subject folder:** `content/semester-1/general-english-1/`
- **Unit 1:** `unit-1-vocabulary-writing/` or `unit-1-*.md` (Vocabulary, prefixes/suffixes, synonyms/antonyms, paragraph writing).
- **Unit 2:** `unit-2-common-errors/` or `unit-2-*.md` (Subject-verb agreement, noun-pronoun, misplaced modifiers, prepositions).
- **Unit 3:** `unit-3-sensible-writing-précis/` or `unit-3-*.md` (Précis writing, defining, classifying, essay composition).
- **Unit 4:** `unit-4-oral-communication/` or `unit-4-*.md` (Pronunciation, listening comprehension, interview & presentation skills).

#### 5. Indian Knowledge System (IKS-I)
- **Subject folder:** `content/semester-1/indian-knowledge-system-1/`
- **Module 1:** `module-1-intro-to-iks/` or `module-1-*.md` (Ancient Indian math, astronomy, chemistry, architecture, Ayurveda, Vedangas).
- **Module 2:** `module-2-creative-practices/` or `module-2-*.md` (Traditional 64 arts: Dhatuvada, Vastuvidya, Yantramatrika, etc.).

#### 6. Environmental Science and Sustainability
- **Subject folder:** `content/semester-1/environmental-science/`
- **Unit 1:** `unit-1-environment-sustainability/` or `unit-1-*.md` (Man-environment relation, natural resource conservation).
- **Unit 2:** `unit-2-ecosystems-biodiversity/` or `unit-2-*.md` (Ecosystem balance, biodiversity conservation).
- **Unit 3:** `unit-3-pollution-management/` or `unit-3-*.md` (Pollution control, waste management, sustainable development).
- **Unit 4:** `unit-4-social-issues-legislation/` or `unit-4-*.md` (Environmental laws, social issues, fieldwork).

---

## 2. YAML Frontmatter Specification

Every note file must start with valid YAML frontmatter:

```yaml
---
title: "Set Operations and Venn Diagrams"
semester: 1
subject: "Mathematics Foundation to Computer Science - I"
subjectSlug: "math-foundation-1"
unit: "Unit I: Set, Relation and Function"
unitSlug: "unit-1-set-relation-function"
order: 1
description: "Foundational set operations, union, intersection, complement, cartesian product, and formal set laws."
---
```

### Required Fields
| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `title` | string | Exact display title of note | `"Combinational Circuits & Decoders"` |
| `semester` | number | Semester integer (1 to 6) | `1` |
| `subject` | string | Full official subject name | `"Computer Architecture"` |
| `subjectSlug` | string | Matching folder slug | `"computer-architecture"` |
| `unit` | string | Full unit title | `"Unit II: Combinational & Sequential Circuits"` |
| `unitSlug` | string | URL-friendly unit slug | `"unit-2-circuits-and-registers"` |
| `order` | number | Order index in unit | `1` |
| `description` | string | 1-2 sentence plain summary | `"Logic gates, Half/Full adders, decoders, and multiplexers."` |

---

## 3. Obsidian Callouts Support

Vanta supports 6 custom callout styles formatted with standard blockquotes (`> [!type] Custom Title`):

### 1. Definition (`[!definition]`)
```markdown
> [!definition] Formal Definition Title
> Definition statement or mathematical formula.
```

### 2. Valid / Best Practices (`[!valid]`)
```markdown
> [!valid] Core Rules & Laws
> - Point 1
> - Point 2
```

### 3. Invalid / Common Pitfalls (`[!invalid]`)
```markdown
> [!invalid] Common Exam Mistakes
> - Mistake 1: Why it fails
> - Mistake 2: Fix
```

### 4. Examples (`[!example]`)
```markdown
> [!example] Solved Problem / Code Walkthrough
> Step-by-step calculation or program execution.
```

### 5. Comparisons (`[!compare]`)
```markdown
> [!compare] Concept A vs Concept B
> - **Concept A:** Key attributes.
> - **Concept B:** Key attributes.
```

### 6. Notes / Remarks (`[!note]`)
```markdown
> [!note] Important Note
> Exam tip or key takeaway.
```

---

## 4. Markdown Formatting Guidelines

1. **Headings:**
   - Use `## 1. Major Section` for primary sections.
   - Use `### Subsection Title` for smaller parts.
   - Never place an `# H1` inside the markdown body (the frontmatter `title` serves as H1).

2. **Code Blocks:**
   - Always tag languages: `c`, `java`, `sql`, `cpp`, `python`, `html`, `bash`.
   - Add concise comments and time/space complexity where applicable.

3. **Tables:**
   - Use standard markdown pipe tables for summaries and truth tables.

4. **Math Formulas:**
   - Inline math: `$A \cap B$`
   - Display math: `$$\sum_{i=0}^{n} i = \frac{n(n+1)}{2}$$`

---

## 5. AI Note Generation Prompt

Copy and paste this prompt to generate ready-to-paste notes:

```text
You are an expert computer science lecturer creating official reference notes for the Vanta BCA archive (MDU Rohtak syllabus).

Task:
Generate a complete, exam-ready study note in Markdown for:
- Semester: [1-6]
- Subject: [e.g. Computer Architecture]
- Subject Slug: [e.g. computer-architecture]
- Unit: [e.g. Unit I: Digital Principles & Number Systems]
- Unit Slug: [e.g. unit-1-digital-principles]
- Topic: [e.g. K-Maps and Boolean Minimization]
- Order: [e.g. 1]

Requirements:
1. Include exact YAML frontmatter at top with title, semester, subject, subjectSlug, unit, unitSlug, order, description.
2. Structure sections logically with numbered H2 headers (## 1. ..., ## 2. ...).
3. Use Obsidian callouts (> [!definition], > [!valid], > [!invalid], > [!example], > [!compare]) where appropriate.
4. Include syntax-highlighted code blocks with complexity notes if programming topic.
5. Include summary table or comparison table.
6. Target syllabus: MDU BCA curriculum.

Output raw markdown only without conversational filler.
```

