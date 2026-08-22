---
title: "Equivalence Relations and Posets"
semester: 1
subject: "Discrete Mathematics"
subjectSlug: "discrete-mathematics"
unit: "Unit 2: Relations & Functions"
unitSlug: "unit-2-relations-functions"
order: 2
description: "Reflexivity, symmetry, transitivity, equivalence classes, and partial order relations."
---

## 1. Properties of Binary Relations

> [!definition] Binary Relation on Set $A$
> A binary relation $R$ from set $A$ to set $A$ is any subset of the Cartesian product $A \times A$.
> If $(a, b) \in R$, we write $a R b$.

### Fundamental Properties

> [!valid] The Three Axioms of Equivalence
> 1. **Reflexive:** $\forall a \in A, (a, a) \in R$.
> 2. **Symmetric:** If $(a, b) \in R$, then $(b, a) \in R$.
> 3. **Transitive:** If $(a, b) \in R$ and $(b, c) \in R$, then $(a, c) \in R$.

> [!invalid] Common Relation Fallacy
> Assuming that a relation which is not symmetric must be anti-symmetric. A relation can be neither, or both (e.g. equality on a set).

---

## 2. Partial Order Relations (Posets)

> [!definition] Partially Ordered Set (Poset)
> A relation $R$ on set $A$ is a partial ordering if it satisfies:
> 1. **Reflexivity**
> 2. **Anti-symmetry:** $(a, b) \in R \land (b, a) \in R \implies a = b$
> 3. **Transitivity**

The pair $(A, R)$ is called a **Poset**.
