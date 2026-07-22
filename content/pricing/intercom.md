---
title: "Intercom Pricing Explained (2026)"
description: >-
  Intercom seats run $29 to $132 per month on annual billing, but Fin's $0.99
  per resolution is the line that decides whether your bill is flat or elastic.
vendor: intercom
date: 2026-07-22
tldr: >-
  Intercom is $29/seat/month (Essential), $85 (Advanced) and $132 (Expert) on
  annual billing. Every plan includes access to Fin, but Fin is charged at $0.99
  per resolution on top of seats — so support volume, not headcount, is what
  drives the invoice.
tags:
  - Intercom
  - Pricing
  - Customer Support
tiers:
  - name: Essential
    price: "$29/seat/mo"
    billing: "per seat, billed annually ($39 monthly)"
    includes: "Shared inbox, ticketing, help center, basic automation, access to Fin"
    amount: 29
    unit: "per seat/month"
  - name: Advanced
    price: "$85/seat/mo"
    billing: "per seat, billed annually ($99 monthly)"
    includes: "Everything in Essential plus multiple team inboxes, workflow automation, multiple help centers"
    amount: 85
    unit: "per seat/month"
  - name: Expert
    price: "$132/seat/mo"
    billing: "per seat, billed annually ($139 monthly)"
    includes: "Everything in Advanced plus SLAs, advanced permissions, HIPAA support, multibrand messenger"
    amount: 132
    unit: "per seat/month"
  - name: Fin AI Agent
    price: "$0.99 per resolution"
    billing: "usage-based, on top of any plan"
    includes: "Autonomous AI answers across chat, email, SMS and social — charged only when a customer's issue is resolved"
    amount: 0.99
    unit: "per resolution"
  - name: Copilot
    price: "$29/agent/mo"
    billing: "add-on, billed annually"
    includes: "Unlimited AI assistance inside the agent inbox — drafting, lookups, summaries"
    amount: 29
    unit: "per agent/month"
  - name: Proactive Support Plus
    price: "$99/mo"
    billing: "add-on, includes 500 sent messages/month"
    includes: "Outbound product tours, banners, checklists and campaign messaging"
    amount: 99
    unit: "per month"
hiddenCosts:
  - "Fin is not a seat feature. Every plan can use it, but each resolution costs $0.99 — a desk deflecting 2,000 tickets a month adds $1,980 that no seat count predicts."
  - "Copilot, the agent-side AI, is a separate $29/agent/month subscription. Buying both Copilot and Fin means paying for AI twice under two different meters."
  - "Proactive Support Plus is $99/month for only 500 sent messages. Outbound campaigns to a decent-sized user base overshoot that allowance quickly."
  - "The advanced analytics add-on is $99/month and covers analysis of 1,000 conversations — a cap that a mid-size support team clears in days, not months."
  - "Monthly billing costs meaningfully more per seat than annual on Essential and Advanced ($39 vs $29, $99 vs $85), so short commitments are penalised hardest at the entry tier."
faq:
  - q: "Is there a free Intercom plan?"
    a: "No. Intercom offers a 14-day free trial with no credit card and all features enabled, then you move to a paid plan. Early-stage startups can apply to the Early Stage program, which has advertised discounts of up to 93% plus a year of Fin included."
  - q: "How does Fin's $0.99 per resolution actually work?"
    a: "You are charged when Fin resolves the issue — the customer confirms it, stops asking for help, or Fin completes the workflow it was given. Conversations that escalate to a human are not billed as resolutions. It is a genuinely outcome-linked price, which also means it scales directly with your ticket volume."
  - q: "Which plan do most teams actually need?"
    a: "Advanced at $85/seat. Essential is a single-inbox product; the moment you split support into two teams, need real workflow automation, or want more than one help center, you are on Advanced. Expert is for SLAs, granular permissions and compliance requirements like HIPAA."
  - q: "Do I have to pay for Fin?"
    a: "No — Fin is included on every plan in the sense that you can turn it on, but usage is billed per resolution. If you leave it off, you pay seats only. Many teams underestimate how much of their bill Fin becomes once it is switched on."
  - q: "Is annual billing worth it?"
    a: "On Essential and Advanced, clearly: $29 vs $39 and $85 vs $99 per seat. On Expert the gap narrows to $132 vs $139, so a team unsure about commitment loses little by staying monthly at the top tier."
  - q: "Is there a seat minimum?"
    a: "Intercom does not publish a hard seat floor on its standard plans, so a solo founder can run Essential for one seat. The practical floor is Fin usage, which has no seat relationship at all."
---

## The bill has two halves, and only one of them is a seat

Most support platforms make you forecast headcount. Intercom makes you forecast conversations. Seats are the flat, boring half of the invoice: $29, $85 or $132 per seat per month on annual billing, depending on tier. The elastic half is Fin, the AI agent, priced at $0.99 for every issue it resolves.

That split is the single most important thing to understand before pricing Intercom. Two companies with identical support teams — say six agents on Advanced, $510/month in seats — can end up with wildly different invoices depending on whether they run 500 or 5,000 Fin resolutions. At 5,000, Fin costs $4,950 and dwarfs the entire seat line nearly tenfold.

To Intercom's credit, $0.99 per resolution is honest pricing. You are not charged for conversations Fin fumbles and hands to a human. But "honest" and "predictable" are different words, and finance teams tend to care about the second one.

## Modelling it at three volumes

Take a six-seat team on Advanced annual and vary only the AI usage.

| Monthly Fin resolutions | Seats (6 × $85) | Fin cost | Total |
|---|---|---|---|
| 500 | $510 | $495 | $1,005/mo |
| 2,000 | $510 | $1,980 | $2,490/mo |
| 5,000 | $510 | $4,950 | $5,460/mo |

The counter-argument Intercom makes is that resolutions Fin handles are tickets your agents did not, so heavy usage should let you keep headcount flat. That argument holds up if — and only if — you actually resist hiring as volume grows. Teams that turn Fin on and hire anyway pay for both.

Add Copilot at $29/agent and that six-seat team gains another $174/month, which is where the double-AI-meter problem bites. Copilot makes agents faster; Fin means fewer tickets reach agents at all. Buying both is defensible for a high-volume desk and wasteful for a small one.

## Where the tier jumps are and are not worth it

Essential to Advanced is a $56/seat increase and it is the jump most teams eventually have to make. Essential is a single-inbox product with basic automation. Advanced adds multiple team inboxes, real workflow automation and multiple help centers. The trigger is structural: the day you need to route billing questions somewhere different from technical questions, Essential stops being viable regardless of headcount.

Advanced to Expert is $47/seat and is a much narrower proposition. You are buying SLAs, advanced permission granularity, multibrand messenger and HIPAA support. That is a compliance and contractual-obligation purchase. If your customers do not have SLAs in their agreements and your legal team is not asking about HIPAA, Expert is money spent on features you will never open.

## Contract terms and the startup escape hatch

Annual commitment saves the most at the bottom: $10/seat on Essential and $14/seat on Advanced. At Expert the annual saving shrinks to $7/seat, which makes monthly billing a reasonable choice for teams that want flexibility at the top tier.

The genuine outlier in Intercom's pricing is the Early Stage program, which advertises up to 93% off plus a year of Fin at no cost. For a qualifying startup that changes the calculus entirely — a tool that would otherwise be one of the most expensive options in the category becomes one of the cheapest for the first year. The catch is the cliff: year two arrives at list price, with a support workflow already built around Fin and a resolution volume that has grown since you signed up.

## Who it fits and who it burns

Intercom suits product-led software companies with high self-serve conversation volume and a genuine appetite for deflection. If a large share of your tickets are repetitive how-do-I questions, Fin's per-resolution model can be cheaper than the agents you would otherwise hire, and the in-product messenger is still the best in the category.

It punishes low-volume, high-complexity support. If your team handles fifty hard tickets a month that all need a human, you are paying Expert-tier seat prices for a chat widget and getting nothing back from the AI meter. It also punishes anyone who needs firm budget numbers a year out — usage pricing and annual finance planning are natural enemies.

Prices and program terms shift, and Intercom has repriced its plans and promotions more than once in recent years. Confirm against Intercom's own pricing page before committing.
