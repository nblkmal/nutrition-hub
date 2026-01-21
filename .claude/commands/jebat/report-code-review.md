---
name: 'report-code-review'
description: 'Create a report of the code review findings'
---

Create a report of this code review. Make sure the report is clear, easy to read, easy to understand and easy to execute. The report should be written in the style of task lists with details and steps. Each task should have number so that the task can be easily referenced.

### Numbering style

1. Critical issues - CRI-0001, CRI-0002, CRI-0003
2. Enhancements - EHN-0001, EHN-0002, EHN-0003
3. Nice to have - NTH-0001, NTH-0002, NTH-0003

### Report storage location

Store the report inside @docs/code-review-report/report-<filename>.md

### Report format

Report should be in markdown format.

```md
# Code Review Report - Story <story number>

## ISSUE - <issue number>

### Issue Description

Description of the issue

### Evidence

Evidence of the issue

### Reproduction Steps - Optional for enhancements and nice to haves

How to reproduce the issue

### Fix - Optional for enhancements and nice to haves

Steps to fix the issue

### Expected Outcome

Expected outcome after fixing the issue

### Tasks / Subtasks

- [ ] Task 1 (AC: #)
  - [ ] Subtask 1.1
- [ ] Task 2 (AC: #)
  - [ ] Subtask 2.1

```