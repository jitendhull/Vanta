---
title: "Array Memory Representation and Pointers"
semester: 1
subject: "Programming in C"
subjectSlug: "programming-in-c"
unit: "Unit 2: Arrays & Pointers"
unitSlug: "unit-2-arrays-pointers"
order: 2
description: "Contiguous memory allocation, pointer arithmetic, array-decay, and dynamic memory allocation."
---

## 1. Contiguous Allocation & Address Calculation

> [!definition] 1D Array Address Formula
> For an array $A$ with base address $B$ and element size $S$:
> $$\text{Address}(A[i]) = B + (i - \text{lower\_bound}) \cdot S$$

```c
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr; // Array decays to pointer to first element

    for (int i = 0; i < 5; i++) {
        printf("Value: %d, Address: %p\n", *(ptr + i), (void*)(ptr + i));
    }
    return 0;
}
```

---

## 2. Dynamic Memory Management

> [!compare] malloc() vs calloc()
> - **`malloc(size_t size)`:** Allocates uninitialized memory block. Contains garbage values.
> - **`calloc(size_t num, size_t size)`:** Allocates memory block and zero-initializes all bytes.

> [!invalid] Memory Leak & Dangling Pointer
> Failing to call `free()` causes memory leaks. Accessing a pointer after calling `free(ptr)` without assigning `ptr = NULL` creates a dangling pointer.
