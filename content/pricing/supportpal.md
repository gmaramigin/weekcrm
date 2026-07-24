---
title: "SupportPal Pricing Explained (2026)"
description: >-
  SupportPal charges by brand, not by operator — $24.95 a month for unlimited
  agents, rising to $29.95 on 1 September 2026. At ten agents that is under $3 a
  head.
vendor: supportpal
date: 2026-07-24
tldr: >-
  SupportPal is self-hosted help desk software licensed per brand with unlimited
  operators, at $24.95 a month or $249.95 a year. A price change takes effect on
  1 September 2026, moving the monthly rate to $29.95 and the annual to $299.95.
  Because seats are unlimited, the effective per-agent cost collapses as the team
  grows.
tags:
  - SupportPal
  - Pricing
  - Help Desk
tiers:
  - name: Monthly licence (current)
    price: "$24.95/mo"
    billing: "per brand, monthly, unlimited operators, self-hosted"
    includes: "Full help desk: ticketing, multi-channel intake, knowledge base, automation, self-service portal, API"
    amount: 24.95
    unit: "per month"
  - name: Annual licence (current)
    price: "$249.95/yr"
    billing: "per brand, annual, unlimited operators, self-hosted — roughly 2 months free vs monthly"
    includes: "Identical feature set; annual commitment"
    amount: 249.95
    unit: "per year"
  - name: Monthly licence (from 1 Sep 2026)
    price: "$29.95/mo"
    billing: "per brand, monthly, unlimited operators — new rate for existing and new customers"
    includes: "Identical feature set at the updated rate"
    amount: 29.95
    unit: "per month"
  - name: Annual licence (from 1 Sep 2026)
    price: "$299.95/yr"
    billing: "per brand, annual, unlimited operators — new rate"
    includes: "Identical feature set at the updated rate"
    amount: 299.95
    unit: "per year"
hiddenCosts:
  - "A price increase lands on 1 September 2026 — monthly moves from $24.95 to $29.95 and annual from $249.95 to $299.95, applying to existing customers as well as new ones. Buying an annual licence before that date locks the current rate for a further year."
  - "Licensing is per brand. Companies running two distinct customer-facing brands need two licences, which doubles a cost model that otherwise scales beautifully."
  - "Self-hosted means you own the stack: server, PHP and MySQL, TLS, backups, patching and upgrades. That is a genuine recurring cost in time, and it is not in the $24.95."
  - "Email deliverability is your responsibility. Outbound ticket replies from a self-hosted install need SPF, DKIM and DMARC properly configured, usually with a transactional email provider added on top."
  - "There is no bundled AI deflection layer comparable to the 2026 SaaS field. The value case is cost and control, not automation."
faq:
  - q: "Unlimited operators — really?"
    a: "Yes. SupportPal licenses by brand rather than by seat, which is the whole reason it is interesting. Two agents and twenty agents cost the same. At twenty agents the effective rate is roughly $1.25 each per month, against $19 to $79 on mainstream SaaS help desks. For a large support team with server capability, the saving is enormous."
  - q: "Should I buy before the September 2026 increase?"
    a: "If you are already decided, yes — an annual licence purchased before 1 September 2026 locks $249.95 rather than $299.95, saving $50 on the first renewal cycle. It is a small sum, but the decision costs nothing if you were buying anyway. Do not rush an evaluation over it."
  - q: "How does per-brand licensing work if we support multiple products?"
    a: "Products under one brand are fine on one licence. Genuinely separate customer-facing brands each need their own. If your company runs three brands, model three licences — $749.85 a year at current rates — which is still trivial against per-seat SaaS, but it is triple what the headline suggests."
  - q: "What is the realistic total cost including hosting?"
    a: "A modest VPS capable of running SupportPal for a small team runs $10 to $30 a month. Add a transactional email service at a few dollars. So a realistic all-in figure is roughly $40 to $60 a month at current licence rates, for unlimited agents — still far below a five-seat SaaS subscription."
---

## Per brand, not per seat

Almost every help desk in this market charges by agent. SupportPal charges by brand, with unlimited operators, and self-hosts on your infrastructure.

The licence is $24.95 a month or $249.95 a year today. From 1 September 2026 those become $29.95 and $299.95, for existing customers as well as new ones.

That single structural choice — brand rather than seat — is the entire reason to consider it, and it produces cost curves that look nothing like the rest of the category.

## The per-agent maths gets absurd quickly

| Agents | SupportPal/month | At $19/seat SaaS | At $50/seat SaaS |
|---|---|---|---|
| 3 | $24.95 ($8.32 each) | $57 | $150 |
| 10 | $24.95 ($2.50 each) | $190 | $500 |
| 25 | $24.95 ($1.00 each) | $475 | $1,250 |
| 50 | $24.95 ($0.50 each) | $950 | $2,500 |

At three agents SupportPal saves you a modest amount. At fifty it saves roughly $30,000 a year against a mid-priced SaaS competitor.

This is the same shape as osTicket and FreeScout — unlimited-seat self-hosted software wins decisively at scale — with the difference that SupportPal is commercially maintained and supported rather than community-driven, for a small recurring fee.

## The September 2026 change is worth acting on

The increase is 20%: $24.95 to $29.95 monthly, $249.95 to $299.95 annually, effective 1 September 2026 and applying to the existing base.

For anyone already through evaluation, buying an annual licence before that date locks the current rate for another year and saves $50. That is not a reason to rush a decision, but it is a reason not to dawdle over paperwork if the decision is made.

For everyone else, budget from the new numbers. Any comparison built on $249.95 will be wrong from September.

## Per-brand licensing is the constraint to check

The unlimited-operator model has one boundary, and it is brands.

One company, one brand, twelve products: one licence. One company, three distinct customer-facing brands each with its own portal and identity: three licences, $749.85 a year at current rates.

That is still cheap — three brands at three licences costs less than five seats on most SaaS help desks — but it triples the headline, and multi-brand operations routinely miss it when building a business case. Confirm your brand count before quoting a number to finance.

## The self-hosting bill is real but small

SupportPal runs on a conventional PHP and MySQL stack. A capable VPS for a small-to-mid team is $10 to $30 a month. Add a transactional email provider for deliverability — outbound replies from an unwarmed self-hosted mail server land in spam with grim reliability.

So the honest all-in is roughly $40 to $60 a month at current licence rates, for unlimited agents, on infrastructure you control.

The non-monetary cost is attention: patching, TLS renewal, backup verification and upgrade testing on a public-facing application holding customer data. For an organisation with technical staff that is routine. For one without, it is the reason to buy SaaS instead, regardless of the arithmetic above.

## Where it does not compete

There is no AI deflection layer to speak of. SupportPal is a mature, capable, conventional help desk — multi-channel intake, knowledge base, automation, self-service portal, solid API — and the 2026 competitive frontier of autonomous resolution is not where it plays.

If the board deck says "reduce ticket volume 40% with AI," this is not the product. If it says "stop paying $30,000 a year in per-seat licensing for a support team that is growing," it is close to unbeatable.

## Who should buy it

Support organisations of ten or more agents with server operations capability, running one or two brands, who want commercially maintained software without per-seat licensing. The savings against SaaS at that size are large enough to fund the infrastructure several times over.

It suits badly very small teams — at three agents the saving is modest and the operational burden is not — organisations with no technical staff, multi-brand groups who have not counted their licences, and anyone whose evaluation is driven by AI deflection. Check supportpal.com for current rates, and note the 1 September 2026 increase when building a budget.
