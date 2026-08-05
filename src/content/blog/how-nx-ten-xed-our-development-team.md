---
title: "How Nx 10x’ed Our Development Team"
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

## Introduction

you probably only get a chance like this once in your career.

we were working on a huge e-commerce platform active in 55+ countries, with serious traffic and revenue behind it. the system was about 10 years old and very much “solid but dusty”:

- Java Spring MVC (XML config, no Spring Boot)
- JSP server-side rendering
- jQuery + SASS
- custom React mounting hacks inside legacy pages

it had survived for years. but it was no longer built for the speed we needed.

as part of the relaunch, we also moved into the rsproject ecosystem on the frontend side, using **rslib**, **rstest**, **rspress**, **modern.js**, and first-class support for **Module Federation**. this gave us a modern baseline for building, testing, documenting, and composing microfrontends at scale.

our first move was decoupling backend and frontend through REST APIs. that helped, but we still had heavy frontend integration pain across distributed teams.

so we moved into microfrontends with Module Federation.

that was the right strategic direction. but at scale, our polyrepo setup started taxing every team.

this article is about the next step: why we moved to an Nx monorepo, what worked, what hurt, and what i’d recommend if your team is heading into the same territory.

## Before vs After (real impact)

here’s the short version of impact from our migration:

- **repositories:** 13 repos already migrated into one monorepo (target landscape ~20 repos)
- **shared library sync work:** from multiple hours (including manual testing loops) down to **a few minutes**
- **dependency updates:** centralized through **Nx + pnpm workspaces** instead of repeated per-repo churn
- **developer experience:** less repetitive maintenance, less context switching, less “dull chore” work

that last point matters more than it sounds. this was before coding agents were part of our daily workflow. repetitive maintenance consumed real engineering energy.

## Decision criteria: when polyrepo starts hurting at this scale

polyrepo is not “wrong.” in our early phase, it helped us isolate teams quickly.

but for large federated frontend landscapes, there’s a tipping point.

### practical criteria i’d use today

if several of these are true for your setup, monorepo should be on the table:

1. **you update the same dependency repeatedly across many repos** (weekly or even daily)
2. **release confidence depends on cross-repo coordination rituals** instead of predictable automation
3. **version drift creates recurring integration bugs**
4. **onboarding requires learning multiple repo conventions for one product domain**
5. **teams spend more time on repo logistics than product work**

### example at enterprise scale

imagine 15–20 repos, each with its own scripts, tsconfig flavor, test setup, and release habits. now run a security-related dependency update across all of them. if that operation feels like an incident every time, your architecture is signaling operational misfit—not just tooling inconvenience.

## Migration pitfalls (and how we handled them)

this is where most of the real learning sits.

### Pitfall 1: trying to migrate everything at once

we initially underestimated cognitive overload. moving many apps in one go sounds efficient, but it overwhelms people and breaks feedback loops.

**what helped:**
- we created a **cookbook-style migration checklist**
- we migrated **application by application**
- we ran several explicit **polishing passes** afterwards

that structure gave us repeatability and calm.

we also built a more sophisticated task-runner composition to reduce script chaos. instead of repeating long npm script chains everywhere, we grouped commands into semantic chunks like:

- `start-infra`
- `start-mandatory-remotes`
- `start-optional-remotes`

that made the Nx setup feel modular—more like lego, less like script archaeology.

### Pitfall 2: not running `nx reset` often enough

during large structural changes, the project graph can get stale or inconsistent. we lost time chasing ghost issues that disappeared after a reset.

**lesson:** during heavy migration phases, treat `nx reset` as a standard troubleshooting step, not a last resort.

### Pitfall 3: optimizing configs too early

we tried to optimize `tsconfig`, `.env`, test config, and `package.json` patterns while migration was still moving.

that was premature.

**better approach:** stabilize structure first, then do a dedicated optimization pass at the end. you’ll avoid rework and reduce noise.

## Our Nx operating model

this was not just “put code in one repo.” we needed an operating model teams could trust.

### Repository topology

- **apps/** for client-facing microfrontends, SPAs, and full-stack multi-page frontend frameworks
- **libs/** for shared internal code that previously lived as versioned npm packages in Artifactory

this removed constant package publishing/sync churn for static internal reusable code and made app-lib collaboration much smoother.

### Ownership model

we used **CODEOWNERS** to protect boundaries and prevent responsibility bleed.

that was important culturally, not just technically: teams kept ownership of their frontends instead of depending on platform engineers to “own everything.”

### Guardrails and quality gates

we enforced:
- biome
- TypeScript type checks
- unit tests as mandatory for successful Nx builds

this gave us confidence while moving fast.

### CI strategy in a zero-trust environment

our company policy made Nx remote cache unavailable (zero-trust restrictions), so we leaned on:

- hard caching of redundant generated artifacts
- heavy usage of `affected` to keep pipelines lean and semantically correct
- dependency-aware quality flow: build/validate shared libs first, then remotes, then host apps

that sequence created healthy quality entanglement and prevented loose ends from becoming production bugs.

## What i’d do differently today

two things, immediately:

1. **build a generator for new apps from day one**
   - consistency early beats cleanup later
2. **plan a strict code freeze during core migration windows**
   - syncing ongoing feature work into a migration branch was one of the highest stress multipliers

## Monorepo readiness checklist (recommended)

if you’re evaluating a move, use this quick checklist:

- we have 10+ repos in one product ecosystem (or will soon)
- shared dependency updates consume significant recurring effort
- version drift has caused real incidents or regressions
- teams feel branch/release coordination fatigue
- we can define clear app/lib boundaries and ownership
- we can enforce guardrails (lint, typecheck, tests) centrally
- we can execute migration in phases with a cookbook/checklist
- we have leadership support for temporary code freeze windows

if you check most of these, the move is probably not “nice to have.” it’s operational risk reduction.

## Final thought

microfrontends were still the right direction for us.

but at our scale, polyrepo created too much coordination tax. Nx helped us keep team autonomy while restoring system coherence.

if architecture looks elegant in diagrams but feels exhausting in daily delivery, that’s your signal.

often the biggest acceleration is not adding more tech.
it’s removing friction teams carry every day.

