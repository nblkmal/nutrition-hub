---
name: 'fix-code-review'
description: 'Apply fixes to code review based on report'
---

Apply fixes to this code review based on the report. Only focus on the issue $ARGUMENTS.

### Report storage location

Check for the report file inside @docs/code-review-report/

### After fixing

After resolving the issue, mark any associated tasks or subtasks for $ARGUMENTS as complete in the report file. Additionally, update the story file with a brief summary of the fix and the rationale behind it without mentioning issue numbers.