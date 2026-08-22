---
title: "Data Types, Operators, and Memory Model"
semester: 1
subject: "Programming in C"
subjectSlug: "programming-in-c"
unit: "Unit 1: Fundamentals of C"
unitSlug: "unit-1-fundamentals-of-c"
order: 1
pdfUrl: "/notes/bca-sem1-c-programming.pdf"
description: "Core primitive data types, memory layout, operator precedence, and formatted I/O operations."
---

## 1. C Memory Model & Primitive Types

> [!definition] Primitive Type Sizes (Standard 64-bit Architecture)
> - `char`: 1 byte ($-128$ to $127$ or $0$ to $255$)
> - `int`: 4 bytes ($-2^{31}$ to $2^{31}-1$)
> - `float`: 4 bytes (Single precision IEEE 754)
> - `double`: 8 bytes (Double precision IEEE 754)
> - `pointer`: 8 bytes on 64-bit platforms

```c
#include <stdio.h>

int main(void) {
    printf("Size of int: %zu bytes\n", sizeof(int));
    printf("Size of pointer: %zu bytes\n", sizeof(void*));
    return 0;
}
```

---

## 2. Operator Precedence and Evaluation

> [!valid] Standard Precedence Hierarchy
> 1. Postfix operators: `()`, `[]`, `->`, `.` (Left to Right)
> 2. Unary operators: `!`, `~`, `++`, `--`, `*`, `&`, `sizeof` (Right to Left)
> 3. Multiplicative: `*`, `/`, `%` (Left to Right)
> 4. Additive: `+`, `-` (Left to Right)
> 5. Relational: `<`, `<=`, `>`, `>=` (Left to Right)
> 6. Equality: `==`, `!=` (Left to Right)
> 7. Logical AND: `&&` (Left to Right)
> 8. Logical OR: `||` (Left to Right)

> [!invalid] Undefined Behavior with Sequence Points
> Modifying a variable multiple times without an intervening sequence point produces undefined behavior:
> ```c
> int i = 5;
> int result = i++ + ++i; // UNDEFINED BEHAVIOR: Do not write this!
> ```

---

## 3. Formatted I/O

> [!example] Safe Formatted Input with Bounds
> Always specify maximum field width when reading strings using `scanf`:
> ```c
> char buffer[32];
> // Read at most 31 characters to avoid buffer overflow
> scanf("%31s", buffer);
> ```
