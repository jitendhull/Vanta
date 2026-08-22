---
title: "OSI Reference Model vs TCP/IP"
semester: 4
subject: "Computer Networks"
subjectSlug: "computer-networks"
unit: "Unit 1: Network Architectures"
unitSlug: "unit-1-network-architectures"
order: 1
description: "7-layer OSI stack, encapsulation, decapsulation, and TCP/IP 4-layer protocol suite comparison."
---

## 1. The 7 Layers of OSI

> [!definition] Layer Roles
> 1. **Application:** User interface & network services (HTTP, DNS, SSH).
> 2. **Presentation:** Encryption, compression, data format serialization.
> 3. **Session:** Dialog control and session synchronization.
> 4. **Transport:** End-to-end reliability, flow control (TCP, UDP).
> 5. **Network:** Logical addressing and routing (IP, ICMP, OSPF).
> 6. **Data Link:** Framing, physical addressing, error detection (Ethernet, MAC).
> 7. **Physical:** Transmission of raw bitstream over physical media.

> [!compare] TCP vs UDP
> - **TCP:** Connection-oriented, 3-way handshake, guaranteed delivery, ordered packet arrival.
> - **UDP:** Connectionless, low latency, no retransmissions (ideal for real-time video/DNS).
