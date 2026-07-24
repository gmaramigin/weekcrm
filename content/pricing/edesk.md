---
title: "eDesk Pricing Explained (2026)"
description: >-
  eDesk charges $39, $89 or $119 per agent — but the number that decides your tier
  is how many marketplaces you sell on, and AI is metered at $0.99 per outcome on
  top of all of them.
vendor: edesk
date: 2026-07-24
tldr: >-
  eDesk runs Essential at $39, Growth at $89 and Professional at $119 per agent per
  month on annual billing, with 20% off against monthly. The tier gate is
  marketplace connections — 1, 5 and 10 respectively — not features or volume. AI
  Agent is included at every tier but billed at $0.99 per resolved outcome, so
  deflection is a variable cost rather than a saving.
tags:
  - eDesk
  - Pricing
  - Help Desk
tiers:
  - name: Essential
    price: "$39/agent/mo"
    billing: "per agent, billed annually (20% saving vs monthly), 14-day free trial"
    includes: "1 online store or marketplace, shared inbox, order data in-thread, AI Agent at $0.99 per outcome"
    amount: 39
    unit: "per agent/month"
  - name: Growth
    price: "$89/agent/mo"
    billing: "per agent, billed annually (20% saving vs monthly), 14-day free trial"
    includes: "5 stores or marketplaces, everything in Essential, AI Agent at $0.99 per outcome"
    amount: 89
    unit: "per agent/month"
  - name: Professional
    price: "$119/agent/mo"
    billing: "per agent, billed annually (20% saving vs monthly), 14-day free trial"
    includes: "10 stores or marketplaces, 2 free read-only users, everything in Growth, AI Agent at $0.99 per outcome"
    amount: 119
    unit: "per agent/month"
  - name: Enterprise
    price: "Tailored pricing"
    billing: "sales-quoted"
    includes: "Unlimited channels, multi-brand workflows, dedicated account manager, AI Agent at $0.99 per outcome"
  - name: AI Agent
    price: "$0.99 per outcome"
    billing: "usage-based, on every tier including Enterprise"
    includes: "Autonomous resolution of customer contacts across connected channels"
    amount: 0.99
    unit: "per resolved outcome"
hiddenCosts:
  - "The tier gate is marketplace count, not team size or ticket volume. A two-agent seller listed on Amazon UK, Amazon DE, eBay, Shopify and Walmart needs Growth at $89 — more than double Essential — purely because of channel count. Marketplace sellers expand channels faster than headcount, so the upgrade arrives sooner than expected."
  - "AI Agent is billed at $0.99 per resolved outcome on top of every seat price. Two thousand AI resolutions a month is $1,980 — potentially more than the entire agent licence bill. Deflection lowers headcount cost and raises usage cost simultaneously."
  - "Amazon and eBay each count as separate marketplace connections per region in most configurations. Sellers who think of 'Amazon' as one channel routinely undercount and land a tier too low."
  - "Monthly billing costs 20% more at every tier. On five Growth agents that is roughly $1,068 a year."
  - "Add-ons — AI Assist, Translate and Feedback — sit outside the tier price at all levels. The translation module in particular is close to mandatory for cross-border European marketplace selling, which is eDesk's core market."
faq:
  - q: "Does the AI Agent fee replace agent seats or add to them?"
    a: "It adds to them. Every tier includes access to AI Agent at $0.99 per outcome, and you still pay per human agent. The economics only work if AI resolutions genuinely remove headcount: at $0.99 a resolution, a thousand deflections a month costs $990, which is roughly eight Essential seats. Model deflection rate against seat reduction before assuming AI saves money."
  - q: "How do I count marketplaces correctly?"
    a: "Count every distinct storefront connection, not every brand. Amazon marketplaces are typically counted per region, so a seller on Amazon UK, DE, FR and IT plus a Shopify store is five connections and needs Growth, not Essential. This is the single most common tier mis-selection for eDesk buyers."
  - q: "Is eDesk worth it against a general help desk like Zendesk?"
    a: "For marketplace sellers, usually yes — and the reason is order data, not price. eDesk pulls order, refund and shipping status from Amazon, eBay, Walmart, Shopify and the rest into the ticket, which is the difference between a two-minute reply and a five-minute one across three browser tabs. A general help desk needs custom integration work to approximate that. For a non-marketplace ecommerce brand on Shopify alone, the case is much weaker."
  - q: "What do the two free read-only users on Professional actually get?"
    a: "Visibility without the ability to reply — useful for warehouse or finance staff who need to see customer context but should not be answering tickets. On lower tiers those people would need paid seats, so the allowance is worth roughly $78 to $238 a month depending on how you would otherwise licence them."
---

## Channel count sets your tier, not headcount

Most help desks price on agents and gate features by tier. eDesk prices on agents and gates *marketplaces*: one on Essential, five on Growth, ten on Professional, unlimited on Enterprise.

The feature set barely moves between them. What moves is how many storefronts you can connect.

That makes eDesk unusual to budget for, because marketplace count and team size grow independently. A two-person operation selling across four Amazon regions plus eBay and Shopify needs Growth — $89 per agent — while a ten-person team on a single Shopify store sits comfortably on Essential at $39.

## Count your connections properly

This is where buyers get it wrong. Amazon is not one channel. In most eDesk configurations each regional marketplace is a separate connection.

| Seller profile | Connections | Required tier | 3 agents/year |
|---|---|---|---|
| Single Shopify store | 1 | Essential | $1,404 |
| Shopify + eBay + Amazon US | 3 | Growth | $3,204 |
| Amazon UK/DE/FR/IT + eBay + Shopify | 6 | Professional | $4,284 |
| 12 marketplaces, multi-brand | 12 | Enterprise | Quote |

The middle rows are the trap. A modest European cross-border seller — a common eDesk customer — is on Professional at $119 an agent while running a three-person support team. That is $4,284 a year for three people, which is expensive per head and entirely justified by the integration work it replaces.

## AI at $0.99 an outcome cuts both ways

eDesk includes AI Agent at every tier, including Essential. It bills $0.99 per resolved outcome.

Usage pricing for AI resolution is increasingly the category norm, and it is honest — you pay for work done rather than for a capability you might not use. But it inverts the usual cost curve. Successful deflection *increases* your eDesk bill even as it decreases the work.

Run the arithmetic:

- 500 AI resolutions/month: $495 — roughly 12 Essential seats' worth of licence
- 2,000 AI resolutions/month: $1,980
- 5,000 AI resolutions/month: $4,950

Against that, an agent handling 500 tickets a month costs $39 to $119 in licence plus salary. The AI case is strong on salary and weak on licence, so the comparison has to include fully-loaded human cost or it is meaningless.

The practical test: if AI Agent lets you not hire the next support person, $0.99 an outcome is cheap. If it merely makes existing agents faster, you are paying twice for the same tickets.

## The add-ons are not optional for the core market

AI Assist, Translate and Feedback sit outside the tier price at every level.

Translate deserves particular attention. eDesk's strongest market is European cross-border marketplace selling, where customer messages arrive in German, French, Italian and Spanish. For those sellers translation is not an enhancement, it is the reason the tool works — and it is a separate line item at every tier including Professional.

Get it quoted during the trial rather than after.

## Annual billing and the 30-day guarantee

Annual saves 20% at every tier, and eDesk backs the purchase with a 30-day workload-reduction guarantee alongside a 14-day free trial. That combination makes the evaluation genuinely low-risk, which is more than most of this category offers.

Use the trial to establish two numbers: your true connection count, and your AI resolution rate on real traffic. Those set your tier and your variable cost respectively, and neither can be estimated reliably from outside.

## Who should buy it

Multi-marketplace ecommerce sellers — Amazon, eBay, Walmart, Shopify, Etsy in combination — where order context inside the ticket is the daily bottleneck. For that buyer the integration depth justifies a per-agent rate well above generic help desks.

It suits badly single-channel Shopify brands, who pay for marketplace machinery they never use, and anyone treating AI Agent as a cost saving without modelling $0.99 per outcome against actual deflection volume. Check edesk.com for current rates and count your regional marketplace connections before choosing a tier.
