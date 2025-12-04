# Reflection — AI Agent Usage (1 page)

Using AI agents (Copilot + ChatGPT) accelerated scaffolding and helped iterate on architecture diagrams and function ideas. Primary gains:
- **Speed:** instant boilerplate (Express + TS setup, React component skeletons) saved several hours.
- **Focus:** freed time to concentrate on domain modeling (CB formula correctness, pooling rules).

Limitations & lessons:
- Agents sometimes hallucinated DB/ORM field names or returned code missing edge-case handling. I always reviewed and wrote unit tests for critical math (CB, pooling allocation).
- Best pattern: use agents for scaffolding and drafts, then enforce domain correctness with tests and manual review.

What I'd improve next time:
- Add more integration tests, CI, and a database fixture for reproducible end-to-end tests.
- Use containerized DB and add GitHub Actions to run migrations and tests automatically.
