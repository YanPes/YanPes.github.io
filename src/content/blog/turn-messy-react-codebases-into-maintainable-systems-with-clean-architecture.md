---
title: "Turn Messy React Codebases into Maintainable Systems with Clean Architecture"
description: ""
date: 2026-06-21
readTime: 7 min
tags:
  - Architecture
  - Microfrontends
  - Corporate Strategy
draft: true
---

![Article Banner Image](/images/articles/your-guide-to-architectural-decisions-in-enterprise-development-with-module-federation-1.webp)

## Introduction

Every frontend engineer has encountered a messy React codebase: components that fetch data, manipulate it, manage local state, and render everything — all at once.

That flexibility is great for prototypes, MVPs, or simple CRUD SPAs, but in big team compositions and large scale monorepos containing a truck load of complexity it mostly becomes a liability. Bugs accumu;ate, onboarding processes slow down, and maintenance turns into a guessing game.

I've seen teams stuck in this cycle: Features breaking seemingly unrelated areas, mysterious side effects appearing from nowhere, and new hires struggling to understand where business logic actually lives.

At my company, I help teams introduce a lightweight version of the Clean Architecture pattern tailored for React. The goal is not to add layers for the sake of architecture. The goal is to create predictable ownership, explicit boundaries, reduced coupling, easier testing, and faster onboarding.

The idea is simple: Give each part of the application a single responsibility and define clear boundaries between them. When responsibilities are predictable, developers know where to implement features, where to analyze the behavior of a bug, and how to make changes without fear of unintended consequences.

## Core Principles

- **Separation of Concerns:** Split responsibilities so each part of the system does one thing well.
- **Directional Dependencies:** Higher-level parts depend on abstractions rather than low-level implementation details.
- **Explicit Boundaries:** Define clear contracts between layers so data transformations remain predictable and easy to reason about
- **Predictable Ownership:** Every piece of logic should have an obvious home. When developers know where functionality belongs, collaboration becomes easier and maintenance becomes significantly less expensive.

## The Four-Layer Adaption for React

The following structure is a lightweight adaption tailored to React applications.

ProductPage (container) triggers loadProduct, the store calls ProductService, ProductService orchestrates API calls and domain rules then delegates normalization to ProductConverter, which returns a ProductDTO that the store stores and the UI renders via ProductView.


![The four layers](/images/articles/the-federated-design-system-manifesto-for-microfrontend-environments-2.webp)

This separation creates a common language across the team:

- UI problems belong in components
- State problems belong in stores
- Business logic belongs in servives
- Data shaping problems belong in normalization logic (E.g. converters)

As applications grow, this shared understanding becomes more valuable than any individual implementation detail.

## Service Layer - Business Logic and Orchestration

Responsibilities:

- API communication
- Retry strategies
- Caching orchestration
- Business logic

The Service layer should not know about component structure, UI concerns, or rendering behavior.

```ts
// services/ProductService.ts
import { ProductDTO } from '@/types/product';
import { ProductConverter } from '@/converters/product-converter';
import { ProductUnavailableError, mapToProductError } from '@/services/errors';

export class ProductService {
  constructor(
    private readonly apiClient: ApiClient,
    private readonly converter: ProductConverter
  ) {}

  // Returns a typed DTO. The store doesn't need to know API shapes or endpoints.
  public async getProductDto(productId: string): Promise<ProductDTO> {
    try {
      const rawData = await this.apiClient.endpoints.product.getProduct(productId);

      // Domain rule: treat discontinued products as unavailable
      if (rawData.isDiscontinued) {
        throw new ProductUnavailableError(productId);
      }

      return this.converter.toProductDTO(rawData);
    } catch (err) {
      // Map low-level errors to domain-level errors
      throw mapToProductError(err, productId);
    }
  }

  // Example of an orchestrated method that composes multiple endpoints
  public async getProductWithInventory(productId: string): Promise<ProductDTO & { inventory: number }> {
    try {
      const [rawProduct, rawInventory] = await Promise.all([
        this.apiClient.endpoints.product.getProduct(productId),
        this.apiClient.endpoints.inventory.getInventory(productId)
      ]);

      if (rawProduct.isDiscontinued) throw new ProductUnavailableError(productId);

      const dto = this.converter.toProductDTO(rawProduct);
      return { ...dto, inventory: rawInventory.count };
    } catch (err) {
      throw mapToProductError(err, productId);
    }
  }
}
```

## Data Normalization Layer - Consistent Application Contracts

Responsibilities:

- Transform external data into application DTOs
- Normalize inconsistent backend data fields
- Validate required properties
- Create stable contracts for the rest of the application

Many teams debate what is the best method of doing this. The best practices of yesterday are outdated tomorrow - but still the implementation is less important than the principle. Some teams do direct access to the DB and use Zod to validate schemas but still there are teams out there rocking complex backend projects that serve API data in a certain way that needs adaptations.

Each application benefits from having a dedicated place where external data becomes internal data.

By normalizing data at a single boundary, the rest of the application can rely on stable DTOs regardless of how backend contracts evolve.

```ts
// converters/ProductConverter.ts
import { ProductDTO } from '@/types/product';

export class ProductConverter {
  public toProductDTO(rawData: any): ProductDTO {
    if (!rawData || !rawData.id) throw new Error('Invalid product data');

    return {
      id: String(rawData.id),
      name: rawData.name ?? rawData.fullName ?? 'Untitled product',
      priceInCents: Math.round((rawData.price ?? 0) * 100),
      isDiscontinued: Boolean(rawData.isDiscontinued),
    };
  }
}
```

## Store Layer – State Management and Application Flows

Responsibilities:

- Managing application state
- Exposing selectors and hooks
- Coordinating asynchronous workflows
- Providing loading and error states

The Store layer interacts with Services but exposes domain-specific state to the UI.

Importantly, the Store layer is not always a dedicated state management library.

In modern React applications, solutions such as TanStack Query, framework-level data fetching, or React Server Components may already fulfill parts of this responsibility.

The underlying principle remains the same:

UI components should consume prepared application state rather than orchestrate fetching, transformations, and business workflows themselves.

Whether that state comes from Zustand, Redux, React Query, or Server Components is an implementation detail.

```ts
// stores/useProductStore.ts
import create from 'zustand';
import { ProductDTO, AsyncStatus } from '@/types/product';
import { ProductService } from '@/services/product-service';

type State = {
  product: ProductDTO | null;
  status: AsyncStatus;
  error: Error | null;
  loadProduct: (id: string) => Promise<void>;
};

export default function createProductStore(productService: ProductService) {
  return create<State>((set) => ({
    product: null,
    status: 'idle',
    error: null,

    loadProduct: async (id: string) => {
      set({ status: 'loading', error: null });
      try {
        const dto = await productService.getProductDto(id);
        set({ product: dto, status: 'success' });
      } catch (err) {
        set({ error: err as Error, status: 'error' });
      }
    },
  }));
}
```

## UI Layer – Rendering and Interaction

Responsibilities:

- Rendering data
- Handling user interaction
- Triggering actions
- Managing local UI state

The UI should remain focused on presentation.

When components only need to answer "what should be displayed?" rather than "how does the system work?", they become easier to test, reuse, and understand.

```ts
// pages/ProductPage.tsx
import React, { useEffect } from 'react';
import createProductStore from '@/stores/useProductStore';
import { ProductService } from '@/services/product-service';
import ApiClient from '@/infra/ApiClient';
import { ProductConverter } from '@/converters/product-converter';
import ProductView from '@/components/ProductView';

const productService = new ProductService(new ApiClient(), new ProductConverter());
const useProductStore = createProductStore(productService);

export default function ProductPage({ productId }: { productId: string }) {
  const { product, status, error, loadProduct } = useProductStore();

  useEffect(() => { loadProduct(productId); }, [productId, loadProduct]);

  if (status === 'loading') return <div>Loading…</div>;
  if (status === 'error') return <div>Error: {error?.message}</div>;
  if (!product) return <div>No product found</div>;

  return <ProductView product={product} />;
}
```

## Why this System helps

### Predictable Ownership

When a bug appears, developers know where to investigate.

- A rendering issue belongs in the UI.
- A state synchronization issue belongs in the Store.
- A business rule issue belongs in the Service.
- A data contract issue belongs in the normalization layer.
- This dramatically reduces the amount of code that must be inspected when troubleshooting.

### Reduced Coupling

- Each layer communicates through explicit contracts.
- Changes inside one layer are less likely to create unexpected side effects elsewhere.

### Easier Testing

- Services can be tested independently of React.
- Normalization logic can be tested with simple input/output assertions.
- Stores can be tested through state transitions.
- UI components can focus on rendering behavior.

### Faster Onboarding

New team members learn responsibilities quickly because there is a clear answer to a common question:  "Where does this logic belong?" The architecture itself becomes documentation.

### Dependency Injection and Testability

Dependency Injection often sparks debate in frontend development. For some teams, constructor injection feels unnecessary compared to simple imports. 

The important takeaway is not that every application needs full dependency injection. The goal is to avoid tightly coupling business logic to concrete implementations.

When dependencies can be swapped, mocked, or replaced easily, testing becomes simpler and architectural boundaries become more visible.

Use dependency injection where it provides clear value:

- Service testing
- Mocking APIs
- Feature-specific implementations
- Multi-tenant or environment-specific behavior

For smaller applications, straightforward module composition may be entirely sufficient. Choose the simplest approach that preserves clear boundaries.

## AI Coding Assistants Make Architecture More Important

AI-assisted development has significantly increased development speed.

However, many generated solutions naturally gravitate toward large components that fetch data, transform it, manage state, and render everything in a single file, if not guided by some Harness configuration.

These solutions often work initially but become difficult to maintain as the application grows. The reason for this is that our human brains can process structured data just in a limited way.

Clear architectural boundaries provide guardrails not only for developers but also for AI-generated code. Set up some instructions or skills that enable your AI agents to work accordingly so the human can stay in charge. In the end the developer is accountable and responsible for the code in the repository - not the AI Model.

Architecture becomes a shared framework that helps both humans and AI contribute consistently.

## Addressing Common Objections

**Isn't This Overengineering for Small Apps?**

For prototypes and small applications, the overhead may not be justified. Architecture should solve actual problems, not hypothetical ones. Introduce these patterns when complexity starts creating friction.

**Doesn't This Add Boilerplate?**

Some additional structure is inevitable. However, structure often scales better than flexibility in growing codebases. Many teams find that the investment pays for itself through reduced debugging time and increased confidence when making changes.

**How Can Teams Adopt It Gradually?**

Start with a single feature. Refactor one workflow using the pattern. Document the approach. Use it as a reference implementation for future development. Architecture succeeds when it evolves alongside the codebase rather than arriving all at once.

## Conclusion

Frontend architecture is not about adding layers or enforcing rigid rules.

It is about creating predictable ownership, explicit boundaries, and stable contracts that allow teams to work confidently as applications grow.

Whether you use Services, Converters, Stores, React Query, Server Components, or another variation entirely, the principle remains the same:

- Make responsibilities obvious
- Reduce coupling
- Create clear boundaries
- Help developers understand where code belongs

Start small. Refactor a single feature. Document the pattern. Over time, those guardrails can transform a React codebase from a collection of components into a maintainable system that scales with both the application and the team.

Thank you for reading and happy coding :-)
