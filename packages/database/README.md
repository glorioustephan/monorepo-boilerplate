# @monorepo-boilerplate/database

Placeholder for the data layer. It will hold schema definitions, typed queries,
migrations, and seed scripts once an ORM is selected (see **roadmap Phase 2**).

Planned structure:

- `schema/` — table/model definitions
- `queries/` — reusable, typed query functions
- `migrations/` — generated migration files

`db:generate` and `db:migrate` scripts are wired into Turborepo as no-ops today
so the task graph is stable; they will gain real implementations in Phase 2.
