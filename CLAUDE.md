# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for **altrntv labs** — a specialist firm providing fixed-scope assessments for tokenized financial products.

- Stack: Next.js + Tailwind CSS + TypeScript
- Purpose: marketing site (not a product app)
- Two audiences with distinct needs and language:
  - **Issuers** — teams launching tokenized financial products who need an independent assessment before going to market.
  - **Allocators** — institutional capital deciding whether to allocate to a tokenized product, who need third-party diligence.
- Offering shape: **fixed-scope** assessments (not open-ended consulting). Copy and IA should reflect productized, well-defined engagements.

## Brand & voice

- Always render the brand name as lowercase **`altrntv labs`** — never capitalize, never "Altrntv Labs", never "ALTRNTV". This applies in copy, metadata, alt text, and component props.
- Tone: minimal, institutional, techy. Think specialist financial infrastructure firm, not consumer SaaS or crypto-native marketing.
- Avoid: emoji in UI copy, hype language ("revolutionary", "🚀"), gradients-as-decoration, generic startup illustrations.
- Prefer: restrained typography, generous whitespace, monospace accents for technical detail, neutral palette, precise language.
- When writing copy for a page, identify which audience (issuer vs. allocator) it primarily serves and tailor accordingly — don't blend both into vague text.

## Architecture notes

(Repo is currently empty — fill in as the codebase grows. Expected shape: Next.js App Router under `app/`, shared UI in `components/`, Tailwind config at the root, content/copy ideally colocated or in a typed `content/` module so issuer- and allocator-facing pages can share primitives without diluting voice.)
