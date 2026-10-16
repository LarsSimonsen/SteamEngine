---
name: commit-changes
description: Stage task-scoped files and create a validated Conventional Commit.
---

# Commit Changes

Use this workflow when the user explicitly asks for a commit. Keep the commit narrowly
scoped; never stage the whole working tree by default.

## Workflow

1. Inspect repository status and the unstaged/staged diff read-only.
2. Select files directly related to the task. Include tests, metadata, generated project
   files, or documentation only when they are direct consequences. Leave unrelated
   work and generated artifacts unstaged. Ask if scope cannot be determined safely.
3. Confirm that the selected files represent the intended commit. Do not silently stage all changes.
4. Before writing the Git index or committing, request elevated repository write
   permission. Do not first try an unprivileged index write: this workspace blocks
   `.git/index.lock` without that permission.
5. Stage explicit paths with `git add -- <path>...`. Never use `git add -A`,
   `git add .`, or broad globs.
6. Inspect `git diff --cached --stat`, `git diff --cached --check`, and
   `git diff --cached`. Stop for unrelated files, secrets, generated noise, or
   unexpected changes.
7. Run the relevant project validation after staging and before committing.
   Prefer repository-provided checks. For this Steam Engine repository, run the
   applicable translation metadata check, typecheck, focused tests, and the
   complete production build when the staged changes affect source or
   translation files. A scoped `npm run build:partial` run may supplement this
   validation for a focused route or locale, but never replaces the full build.
8. Derive a concise imperative Conventional Commit message from the staged diff. Use a
   valid type (`feat`, `fix`, `refactor`, `docs`, `test`, or `chore`) and an optional
   short scope. Do not claim unstaged work.
9. Create one commit. Do not amend, push, open a pull request, or alter unrelated work
   unless requested.
10. Verify with `git show --stat --oneline --summary HEAD` and `git status --short`.
    Report the hash, message, validation, and remaining unstaged changes.

## Safety Rules

- Stop and inspect for an existing `.git/index.lock`, active Git process, permission
  failure, hook failure, or validation failure. Never delete locks or bypass hooks.
- Preserve unrelated work already present in the working tree.
- Never commit credentials, tokens, private keys, secrets, or build output unless the
  task explicitly includes them.
- If a bare “commit” request has ambiguous scope, ask which files belong rather than
  staging broadly.
