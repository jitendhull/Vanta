---
title: "Stack and Queue ADTs"
semester: 2
subject: "Data Structures & Algorithms"
subjectSlug: "data-structures"
unit: "Unit 1: Linear Data Structures"
unitSlug: "unit-1-linear-structures"
order: 1
description: "LIFO vs FIFO abstract data types, array and linked list implementations, and overflow/underflow checks."
---

## 1. Stack Abstract Data Type (LIFO)

> [!definition] Stack (Last-In First-Out)
> A linear data structure in which insertions and deletions take place at a single end, called the **Top**.

### Fundamental Operations

> [!valid] Time Complexity of Stack Primitives
> - `push(element)`: $O(1)$
> - `pop()`: $O(1)$
> - `peek() / top()`: $O(1)$
> - `isEmpty()`: $O(1)$

---

## 2. Queue Abstract Data Type (FIFO)

> [!definition] Queue (First-In First-Out)
> A linear structure with two ends: elements are enqueued at the **Rear** and dequeued from the **Front**.

> [!compare] Linear Queue vs Circular Queue
> - **Linear Queue:** Suffers from false overflow (memory wasted at front after deletions).
> - **Circular Queue:** Wraps indices modulo $N$ (`(rear + 1) % capacity`), utilizing vacated positions.
