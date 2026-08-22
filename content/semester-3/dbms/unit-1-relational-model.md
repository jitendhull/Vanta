---
title: "Relational Algebra and SQL Joins"
semester: 3
subject: "Database Management Systems"
subjectSlug: "dbms"
unit: "Unit 1: Relational Model"
unitSlug: "unit-1-relational-model"
order: 1
description: "Select, Project, Cartesian Product, Natural Join, Outer Joins, and SQL query equivalents."
---

## 1. Relational Algebra Operators

> [!definition] Fundamental Operators
> - **Selection ($\sigma_p(R)$):** Selects tuples that satisfy predicate $p$.
> - **Projection ($\Pi_{A_1, A_2}(R)$):** Selects specified columns and eliminates duplicate tuples.
> - **Cartesian Product ($R \times S$):** Combines every tuple of $R$ with every tuple of $S$.

---

## 2. Join Types & Equivalents

> [!compare] Inner Join vs Left Outer Join
> - **Inner Join ($R \bowtie S$):** Returns only rows where the join condition matches in both relations.
> - **Left Outer Join ($R \ \unicode{x27D5} \ S$):** Returns all rows from the left relation, padding right-side attributes with `NULL` where matches are absent.
