---
title: "Set Operations and Venn Diagrams"
semester: 1
subject: "Discrete Mathematics"
subjectSlug: "discrete-mathematics"
unit: "Unit 1: Set Theory"
unitSlug: "unit-1-set-theory"
order: 1
description: "Foundational set operations, union, intersection, complement, cartesian product, and formal set laws."
---

## 1. Core Set Definitions

> [!definition] Union of Sets ($A \cup B$)
> The union of two sets $A$ and $B$ is the set containing all elements that belong to $A$, or to $B$, or to both.
>
> Formally: $A \cup B = \{ x \mid x \in A \lor x \in B \}$

> [!definition] Intersection of Sets ($A \cap B$)
> The intersection of two sets $A$ and $B$ is the set containing only the elements common to both sets.
>
> Formally: $A \cap B = \{ x \mid x \in A \land x \in B \}$

---

## 2. Set Algebraic Laws & Validation

> [!valid] Identity & Idempotent Laws
> - **Identity:** $A \cup \emptyset = A$ and $A \cap U = A$
> - **Idempotent:** $A \cup A = A$ and $A \cap A = A$

> [!invalid] Common Set Notation Pitfalls
> - Writing duplicates in a set: $\{1, 2, 2, 3\}$ is redundant; sets contain only distinct elements.
> - Confusing $\emptyset$ (empty set) with $\{ \emptyset \}$ (a set containing one element, which is the empty set).

---

## 3. Comparison of Relations & Differences

> [!compare] Complement vs Set Difference
> - **Relative Difference ($A \setminus B$):** Elements in $A$ that are strictly not in $B$.
> - **Absolute Complement ($A'$ or $A^c$):** Elements in the Universal set $U$ that do not belong to $A$ ($U \setminus A$).

---

## 4. Cartesian Product Example

> [!example] Ordered Pairs in Cartesian Product
> Let $A = \{1, 2\}$ and $B = \{x, y\}$.
> The Cartesian product $A \times B$ is:
> $$A \times B = \{(1, x), (1, y), (2, x), (2, y)\}$$
> Note that $|A \times B| = |A| \cdot |B| = 2 \cdot 2 = 4$.

```c
// Example: Checking subset condition in C
#include <stdbool.h>

bool isSubset(int setA[], int sizeA, int setB[], int sizeB) {
    for (int i = 0; i < sizeA; i++) {
        bool found = false;
        for (int j = 0; j < sizeB; j++) {
            if (setA[i] == setB[j]) {
                found = true;
                break;
            }
        }
        if (!found) return false;
    }
    return true;
}
```

---

## 5. Summary Table of Properties

| Law Name | Union Formulation | Intersection Formulation |
| :--- | :--- | :--- |
| **Commutative** | $A \cup B = B \cup A$ | $A \cap B = B \cap A$ |
| **Associative** | $(A \cup B) \cup C = A \cup (B \cup C)$ | $(A \cap B) \cap C = A \cap (B \cap C)$ |
| **Distributive** | $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ | $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ |
| **De Morgan's** | $(A \cup B)' = A' \cap B'$ | $(A \cap B)' = A' \cup B'$ |
