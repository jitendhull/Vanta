---
title: "Modern Web Architecture & REST APIs"
semester: 6
subject: "Web Technologies & Cloud"
subjectSlug: "web-technologies"
unit: "Unit 1: REST & HTTP Protocols"
unitSlug: "unit-1-rest-http"
order: 1
description: "Statelessness, idempotency, HTTP status codes, and cloud deployment principles."
---

## 1. REST Constraints

> [!definition] Architectural Principles of REST
> 1. **Client-Server Separation:** UI concerns separated from data storage.
> 2. **Stateless:** Every request contains all necessary context.
> 3. **Cacheable:** Explicit cache headers define freshness.
> 4. **Uniform Interface:** Standard URIs and HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`).

> [!valid] HTTP Method Idempotency
> - `GET`, `PUT`, `DELETE`: Idempotent (repeating produces identical server state).
> - `POST`: Non-idempotent (repeating creates multiple resources).
