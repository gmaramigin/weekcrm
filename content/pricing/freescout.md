---
title: "FreeScout Pricing Explained (2026)"
description: >-
  FreeScout's core is free forever and its modules are one-time purchases from $2
  to $15 — a full-featured build lands under $100 once, with no per-agent fee ever.
vendor: freescout
date: 2026-07-24
tldr: >-
  FreeScout is free, open source and self-hosted with unlimited agents and mailboxes.
  Functionality beyond the core comes from one-time module purchases, typically $2
  to $15 each — Workflows $14.99, End-User Portal $12.99, Knowledge Base $12.00,
  Tags $6.99 — with lifetime updates included. There is no cloud tier; hosting is
  BYO, from roughly $2.30 to $13 a month on common providers.
tags:
  - FreeScout
  - Pricing
  - Help Desk
tiers:
  - name: Core application
    price: "$0"
    billing: "free and open source, self-hosted, unlimited agents and mailboxes"
    includes: "Shared inbox, ticketing, email threading, notes, saved replies, assignment, mobile-friendly UI"
    amount: 0
    unit: "per agent/month"
  - name: Workflows module
    price: "$14.99 one-time"
    billing: "one-time purchase, lifetime updates and support"
    includes: "Automation rules and triggers on incoming and updated conversations"
    amount: 14.99
    unit: "one-time"
  - name: End-User Portal module
    price: "$12.99 one-time"
    billing: "one-time purchase, lifetime updates and support"
    includes: "Customer-facing portal for viewing and tracking their own tickets"
    amount: 12.99
    unit: "one-time"
  - name: Knowledge Base module
    price: "$12.00 one-time"
    billing: "one-time purchase, lifetime updates and support"
    includes: "Public help centre with categories and articles"
    amount: 12
    unit: "one-time"
  - name: Tags module
    price: "$6.99 one-time"
    billing: "one-time purchase, lifetime updates and support"
    includes: "Conversation tagging and tag-based filtering"
    amount: 6.99
    unit: "one-time"
  - name: Small utility modules
    price: "$2.00–$3.00 one-time"
    billing: "one-time purchase each, lifetime updates"
    includes: "Ticket Number ($2.00), Inbox ($2.00), Global Mailbox ($3.00) and similar single-purpose extensions"
    amount: 2
    unit: "one-time"
  - name: Hosting (BYO)
    price: "$2.30–$13/mo"
    billing: "third-party hosting, not sold by FreeScout"
    includes: "One-click installs available on PikaPods ($2.30), AccuWebHosting ($4.29), Zeabur ($5), Hostinger ($6.49), AWS (~$7.20)"
    amount: 2.3
    unit: "per month"
hiddenCosts:
  - "Modules are priced per installation, and the ones most teams consider essential — Workflows, Knowledge Base, End-User Portal, Tags — total around $47 before you have a comparable feature set to a mainstream help desk. Still trivial, but not $0."
  - "There is no official cloud offering. Hosting, patching, backups, TLS and PHP version upgrades are yours, and FreeScout's own guidance points at third-party hosts rather than a managed service."
  - "Module compatibility is tied to core versions. Upgrading FreeScout across major versions occasionally requires waiting for module updates, which is the standard cost of an à-la-carte plugin architecture."
  - "No AI layer of any consequence. Against 2026 competitors bundling autonomous resolution, FreeScout is a shared inbox and ticketing system — the comparison is on workflow, not deflection."
  - "Email deliverability is self-managed. Without SPF, DKIM and DMARC on a warmed sending domain, outbound replies land in spam — usually solved by adding a transactional email provider at a few dollars a month."
faq:
  - q: "How much does a fully-featured FreeScout install actually cost?"
    a: "Roughly $50 to $100 once, plus hosting. Workflows at $14.99, End-User Portal at $12.99, Knowledge Base at $12.00, Tags at $6.99 and a handful of $2 to $3 utility modules gets you to about $50. Add a few niche modules and you are near $100. That is a one-time figure with lifetime updates, against $200 to $1,200 a month for an equivalent seat count on a commercial help desk."
  - q: "Is it really unlimited agents?"
    a: "Yes. FreeScout has no seat licensing at all — the core is free and the modules are licensed per installation, not per user. A thirty-person support team pays the same as a two-person one. At scale this is the single most compelling argument for it."
  - q: "What is FreeScout actually a replacement for?"
    a: "Help Scout, most directly — the interface, the shared-mailbox model and the terminology are deliberately familiar. Teams paying $50 to $65 a seat for Help Scout and using perhaps 60% of it are the classic FreeScout convert, and the annual saving on a ten-person team is well into five figures."
  - q: "What are the real risks?"
    a: "Two. You own the operations, so an unpatched public-facing PHP application is your liability, not a vendor's. And the module ecosystem, while healthy, is smaller than a commercial vendor's roadmap — if you need something niche, you may be writing it. Neither is disqualifying for a technical team; both are for a team without one."
---

## The pricing model has no per-seat line

FreeScout is free, open source and self-hosted, with unlimited agents and unlimited mailboxes. Extra functionality is bought as modules, one time, typically between $2 and $15, with lifetime updates included.

There is no subscription. There is no seat count. There is no annual renewal.

In a category where the standard question is "what does the tenth agent cost," FreeScout's answer is nothing, permanently. That is the whole proposition and it is worth stating before anything else.

## What a real build costs

The core alone is a competent shared inbox. Most teams add four modules to reach parity with a commercial help desk:

| Module | One-time cost |
|---|---|
| Workflows (automation rules) | $14.99 |
| End-User Portal | $12.99 |
| Knowledge Base | $12.00 |
| Tags | $6.99 |
| Ticket Number | $2.00 |
| Global Mailbox | $3.00 |
| **Total** | **$51.97** |

Fifty-two dollars, once. Add hosting at $2.30 to $13 a month depending on provider, and a transactional email service for deliverability.

Set that against ten Help Scout seats at roughly $50 each — $6,000 a year — and the comparison is not close. It is the same comparison every year thereafter, because FreeScout does not recur.

## The trade is operations, and it is real

You are running a PHP and MySQL application that faces the internet and stores customer conversations. Nobody else patches it. Nobody else renews the TLS certificate, verifies the backups restore, or tests the major-version upgrade before it breaks a module.

For an organisation with a sysadmin, that is a few hours a month and entirely reasonable given the savings. For an organisation without one, it is a slow-motion risk: the most common bad ending for a self-hosted help desk is an unattended install two major versions behind on a forgotten VM.

Be honest about which organisation you are before choosing $0.

## The module architecture cuts both ways

Buying only what you use is genuinely efficient — a team that does not need a public knowledge base does not pay for one, ever.

The cost is version coupling. Modules are built against core versions, so a major FreeScout upgrade occasionally means waiting for a module maintainer to catch up before you can move. That is the standard bargain of any plugin ecosystem, and FreeScout's is active and well maintained, but it means upgrades are a planned activity rather than an automatic one.

## Where FreeScout does not compete

There is no AI deflection layer worth the name. In 2026 that is a significant absence: BoldDesk bundles AI at $10 to $20 an agent, HelpDesk.com meters at $0.99 a resolution, eDesk charges per outcome.

If your business case is "resolve 40% of tickets without a human," FreeScout is not in that market and no amount of price advantage changes it.

If your business case is "stop paying $6,000 a year for a shared inbox my team uses at 60% capacity," FreeScout is arguably the best value in the entire category.

## Hosting choices matter more than they look

FreeScout does not sell hosting. Its own documentation points at one-click installs on PikaPods ($2.30/month), AccuWebHosting ($4.29), Zeabur ($5), Hostinger ($6.49) and AWS (~$7.20).

The cheap options are perfectly adequate for small teams and genuinely bad for large ones — a shared-hosting PHP install serving thirty agents and a public portal will feel it. Size the host to the team, and treat the difference between $2.30 and $20 a month as irrelevant next to what you are saving.

## Who should buy it

Technical teams and small businesses with server capability who want a shared-inbox help desk with no per-seat cost, permanently. Especially teams currently paying Help Scout or Front rates for functionality FreeScout covers — the payback period is measured in days.

It suits badly non-technical organisations with no one to run the infrastructure, and anyone whose evaluation is driven by AI deflection, where FreeScout does not compete at all. Check freescout.net for the current module catalogue and price your hosting and sysadmin time before treating this as free.
