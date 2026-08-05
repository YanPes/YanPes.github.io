---
title: "How Nx 10x'ed Our Development Team"
description: "What happened when we moved from a legacy monolith and polyrepo microfrontends to an Nx monorepo"
date: 2026-04-13
readTime: 9 min
tags:
  - Architecture
  - Microfrontends
  - Nx
  - Monorepo
draft: true
---

![Article Banner Image](/images/articles/how-nx-ten-xed-our-development-team.webp)

## Introduction

Some engineering challenges are genuinely rare. This is one of those stories.

As the platform architect responsible for the overall frontend architecture overhaul, I have been the main driver and contributor on infrastructure and platform level — designing the system, making the structural calls, and leading the migration work end to end.

You probably only get a chance like this once in your career.

The platform is a large-scale e-commerce system active in 55+ countries, with serious traffic and revenue behind it. When I took over the frontend architecture, the stack was about 10 years old and very much "solid but dusty":

- Java Spring MVC (XML config, no Spring Boot)
- JSP server-side rendering
- jQuery + SASS
- Custom React mounting hacks inside legacy pages

It had survived for years. But it was no longer built for the speed the business needed.

The first move was decoupling backend and frontend through REST APIs. That helped, but heavy frontend integration pain across distributed teams remained.

The next step was microfrontends with Module Federation — and that was the right strategic direction. As part of that shift, the frontend stack moved into the rsproject ecosystem: **rslib**, **rstest**, **rspress**, **modern.js**, and first-class support for **Module Federation**. That gave a modern baseline for building, testing, documenting, and composing microfrontends at scale.

But at scale, the polyrepo setup started taxing every team.

This article is about the next step: why the move to an Nx monorepo happened, what worked, what hurt, and what I'd recommend if your team is heading into the same territory.

## Before vs After (real impact)

Here's the short version of the impact from the migration:

- **Repositories:** 13 repos already migrated into one monorepo (target landscape ~20 repos)
- **Shared library sync work:** from multiple hours — including manual testing loops — down to **a few minutes**
- **Dependency updates:** centralized through **Nx + pnpm workspaces** instead of repeated per-repo churn
- **Developer experience:** less repetitive maintenance, less context switching, less "dull chore" work

That last point matters more than it sounds. This was before coding agents were part of a daily workflow. Repetitive maintenance consumed real engineering energy.

## Decision criteria: when polyrepo starts hurting at this scale

Polyrepo is not "wrong." In the early phase, it helped isolate teams quickly.

But for large federated frontend landscapes, there is a tipping point.

### Practical criteria I'd use today

If several of these are true for your setup, a monorepo should be on the table:

1. **You update the same dependency repeatedly across many repos** — weekly or even daily
2. **Release confidence depends on cross-repo coordination rituals** instead of predictable automation
3. **Version drift creates recurring integration bugs**
4. **Onboarding requires learning multiple repo conventions for one product domain**
5. **Teams spend more time on repo logistics than product work**

### What this looks like at enterprise scale

Imagine 15–20 repos, each with its own scripts, tsconfig flavor, test setup, and release habits. Now run a security-related dependency update across all of them. If that operation feels like an incident every time, the architecture is signaling operational misfit — not just tooling inconvenience.

## Migration pitfalls (and how I handled them)

This is where most of the real learning sits.

### Pitfall 1: Trying to migrate everything at once

The cognitive overload from moving many apps in one go is easy to underestimate. It sounds efficient on paper, but it overwhelms people and breaks feedback loops.

**What helped:**
- A **cookbook-style migration checklist**
- Migrating **application by application**
- Running several explicit **polishing passes** afterwards

That structure gave the process repeatability and calm.

A more sophisticated task-runner composition also helped reduce script chaos. Instead of repeating long npm script chains everywhere, commands were grouped into semantic chunks like:

- `start-infra`
- `start-mandatory-remotes`
- `start-optional-remotes`

That made the Nx setup feel modular — more like lego, less like script archaeology.

### Pitfall 2: Not running `nx reset` often enough

During large structural changes, the project graph can get stale or inconsistent. I lost time chasing ghost issues that disappeared after a reset.

**Lesson:** During heavy migration phases, treat `nx reset` as a standard troubleshooting step, not a last resort.

### Pitfall 3: Optimizing configs too early

Trying to optimize `tsconfig`, `.env`, test config, and `package.json` patterns while migration was still moving was a mistake.

That was premature.

**Better approach:** Stabilize structure first, then do a dedicated optimization pass at the end. It avoids rework and reduces noise significantly.

## The Nx operating model

This was not just "put code in one repo." A working operating model teams could trust was needed.

### Repository topology

- **apps/** for client-facing microfrontends, SPAs, and full-stack multi-page frontend frameworks
- **libs/** for shared internal code that previously lived as versioned npm packages in Artifactory

This removed constant package publishing and sync churn for static internal reusable code, and made app-lib collaboration much smoother.

### Ownership model

**CODEOWNERS** protects boundaries and prevents responsibility bleed.

That matters culturally, not just technically. Teams kept ownership of their frontends instead of depending on platform engineers to "own everything."

### Guardrails and quality gates

The enforced gates were:

- Biome
- TypeScript type checks
- Unit tests as mandatory for successful Nx builds

That gave confidence while moving fast.

### CI strategy in a zero-trust environment

Company policy made Nx remote cache unavailable due to zero-trust restrictions. The approach leaned on:

- Hard caching of redundant generated artifacts
- Heavy usage of `affected` to keep pipelines lean and semantically correct
- Dependency-aware quality flow: build and validate shared libs first, then remotes, then host apps

That sequence creates healthy quality entanglement and prevents loose ends from becoming production bugs.

## What I'd do differently

Two things, immediately:

1. **Build a generator for new apps from day one**
   - Consistency early beats cleanup later
2. **Plan a strict code freeze during core migration windows**
   - Syncing ongoing feature work into a migration branch was one of the highest stress multipliers

## Monorepo readiness checklist

If you are evaluating this move, here is a quick checklist:

- ✅ You have 10+ repos in one product ecosystem, or will soon
- ✅ Shared dependency updates consume significant recurring effort
- ✅ Version drift has caused real incidents or regressions
- ✅ Teams feel branch and release coordination fatigue
- ✅ Clear app/lib boundaries and ownership can be defined
- ✅ Guardrails (lint, typecheck, tests) can be enforced centrally
- ✅ Migration can be executed in phases with a cookbook or checklist
- ✅ Leadership support for temporary code freeze windows is in place

If most of these are true, the move is probably not "nice to have." It is operational risk reduction.

## Final thought

Microfrontends were still the right direction.

But at that scale, polyrepo created too much coordination tax. Nx helped keep team autonomy while restoring system coherence.

If architecture looks elegant in diagrams but feels exhausting in daily delivery, that is your signal.

Often the biggest acceleration is not adding more tech.
It is removing friction teams carry every day.

Happy coding 😎
