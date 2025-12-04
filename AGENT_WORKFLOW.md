# AI Agent Workflow Log

## Agents Used
- GitHub Copilot (IDE inline generation)
- OpenAI ChatGPT (instruction drafting, architecture & code snippets)
- Local CLI tools (Prisma migrate, npm scripts) — not an agent but part of workflow

## Prompts & Outputs
- Example 1:
  - Prompt: "Generate TypeScript function to compute Compliance Balance given target intensity, actual intensity, and fuel consumption (t). Energy conversion 41,000 MJ/t."
  - Output (used): `computeCB(target, actual, fuelT) => (target - actual) * fuelT * 41000`

- Example 2 (refinement):
  - Prompt: "Create Express endpoint `GET /routes/comparison` that returns baseline vs others with percentDiff and compliant flag; baseline is identified by is_baseline flag."
  - Output: produced controller and unit-test. I revised types and edge cases (division by zero) manually.

## Validation / Corrections
- All agent outputs were reviewed and run locally.
- Verified formulas against the assignment doc and sample calculations.
- Fixed variable naming, added TypeScript strict types, adjusted Prisma schema for correct column names.

## Observations
- Where agent saved time:
  - Boilerplate (Express server scaffolding, TS types).
  - Quick generation of small helper functions and migration scripts.
- Where it failed or hallucinated:
  - Some generated SQL/ORM queries had incorrect column names — manual corrections required.
- How I combined tools:
  - Used Copilot for inline stubs, then used ChatGPT to design architecture and produce complete functions.
  - Manual integration/testing to ensure outputs worked end-to-end.

## Best Practices Followed
- Kept domain/core logic separated from framework-specific code (hexagonal).
- Strong typing in TS (`strict: true`).
- Unit tests for core computations (CB).
- Documented prompts and corrections to show agent reliance and verification.
