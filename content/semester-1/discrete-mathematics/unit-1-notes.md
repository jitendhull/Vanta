---
title: "Study Notes"
subject: "discrete-mathematics"
unit: 1
semester: 1
tags: ["winget", "setup-log", "troubleshooting", "exit-code-3221225477"]
pdf: "/notes/semester-1/discrete-mathematics/unit-1-study-notes.pdf"
---

# Study Notes

> [!invalid] Content mismatch
Transcription = winget install log + chat panel dump. Zero discrete math material. Archived as-is. Re-transcribe source or fix metadata.

## Winget Batch Install Log

`winget` batch run, 13 packages total. Log starts mid-run — leading `successfully installed` line (confirmed in re-transcription) belongs to earlier package (≤ 3/13, not captured).

### 4/13 — NVIDIA GeForce NOW — FAILED

> [!invalid] Installer crash
- Package: `Nvidia.GeForceNow` v2.0.86.124
- Source: `https://aka.ms/nvidia-gfn-app/GeForceNOW-release-64EASC.exe` (170 MB / 170 MB)
- Hash verified OK
- Exit code: `3221225477` = `0xC0000005` (`STATUS_ACCESS_VIOLATION`) — installer process crashed. Not hash failure, not network failure.
- Fix path: retry; if persists, run installer standalone, check GPU driver + OS build, try newer package version.

### 5/13 — Git — OK

> [!valid] Installed clean
- Package: `Git.Git` v2.54.0
- Source: `https://github.com/git-for-windows/git/releases/download/v2.54.0.windows.1/Git-2.54.0-64-bit.exe` (62.1 MB / 62.1 MB)
- Hash verified, install succeeded.

### 6/13 — GitHub Desktop — IN PROGRESS

> [!example] Capture cut mid-download
- Package: `GitHub.GitHubDesktop` v3.5.12
- Source: `https://desktop.githubusercontent.com/releases/3.5.12-c6aad713/GitHubDesktopSetup-x64.exe`
- Progress: 99.4 MB / 181 MB — no completion status in log.

## Chat Panel Log

Verbatim capture. Session context = machine setup for gaming ("mc" = Minecraft implied).

- **nihalsingh0165_48189**
- **Rey** — "Will play mc, just a lot less"
- **FUSION PLAYZZ** 💤
- **voltorb**
- **JagguDon** ✨ SUDO — "to abhi game download nhi kari"
- **BuSTAR** ⚡ GZ<3 — 18:09 — "Abe saale"
- **JagguDon** ✨ SUDO — 18:09 — "abhi aur setup kar rha hu with custom script"