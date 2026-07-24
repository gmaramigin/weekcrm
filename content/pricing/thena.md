---
title: "Thena Pricing Explained (2026)"
description: >-
  Thena starts at $29 per user on Starter, but the plan caps out at five users and
  1,000 tickets a month — the jump to $79 Standard is a headcount decision, not a
  feature one.
vendor: thena
date: 2026-07-24
tldr: >-
  Thena publishes three annual-billed tiers: Starter at $29/user/month (up to 5
  users, 1,000 tickets/month), Standard at $79 and Enterprise at $119. AI is
  bundled at every tier rather than sold as an add-on, which is the key structural
  difference against Pylon. The constraint on Starter is its ceiling, not its
  feature set.
tags:
  - Thena
  - Pricing
  - Customer Support
tiers:
  - name: Starter
    price: "$29/user/mo"
    billing: "per user, billed annually; up to 5 users, up to 1,000 tickets/month"
    includes: "Slack and email channels, AI ticket detection, AI summaries, AI tagging and AI assistant"
    amount: 29
    unit: "per user/month"
  - name: Standard
    price: "$79/user/mo"
    billing: "per user, billed annually"
    includes: "Everything in Starter plus AI web chat, AI agent studio, MCP, APIs, AI auto-responses, AI co-pilot and AI-powered workflows"
    amount: 79
    unit: "per user/month"
  - name: Enterprise
    price: "$119/user/mo"
    billing: "per user, billed annually"
    includes: "Everything in Standard plus custom AI agent deployments, Microsoft Teams, enterprise APIs, unlimited MCP and enterprise security"
    amount: 119
    unit: "per user/month"
hiddenCosts:
  - "Starter's 1,000-ticket monthly ceiling is the real limit, not the 5-user cap. A three-person team handling 40 tickets a day crosses it inside a month and is pushed to Standard — a 172% per-seat increase driven by volume, not by any feature request."
  - "Every tier is billed annually. There is no published monthly option, so the entry commitment on Starter is $1,740 for five seats up front rather than a month-to-month trial of the paid product."
  - "Microsoft Teams support sits in Enterprise. Any organisation whose customers are on Teams rather than Slack is on the $119 tier from day one, regardless of team size — the channel your customers happen to use sets your price."
  - "The AI agent studio and MCP access arrive at Standard. If the reason you are buying Thena is to build custom AI agents, Starter is not an evaluation tier for that work, and the real entry price is $79."
  - "AI is bundled rather than metered, which is genuinely favourable — but it also means heavy AI usage cannot lower your seat count. The cost lever is headcount only, so teams that automate successfully still pay per human on the licence."
faq:
  - q: "Is AI really included, or is there a usage fee?"
    a: "Thena's published position is that AI is the baseline across all tiers, with no separate AI add-on pricing. That is the sharpest contrast with Pylon, where AI Assistants cost roughly $50 per seat on top of a $59–$139 seat. On a five-seat team the two products land far closer together than their headline numbers suggest once AI is priced in."
  - q: "What happens if I exceed 1,000 tickets on Starter?"
    a: "The ceiling is the upgrade trigger. Thena publishes the cap as a plan limit rather than an overage rate, so the practical answer is that sustained volume above it moves you to Standard. Model your current monthly ticket count against 1,000 before assuming Starter is your tier."
  - q: "Why is Standard nearly three times Starter?"
    a: "Because it is two upgrades in one: the volume and seat caps come off, and the automation layer — AI web chat, agent studio, MCP, auto-responses, AI workflows — arrives. Starter is a working shared inbox with AI assistance; Standard is where the deflection story starts. Buyers evaluating Thena for automation should treat $79 as the entry price."
  - q: "Do I need Enterprise?"
    a: "Only for Microsoft Teams, custom AI agent deployments, enterprise APIs or a security review that demands the enterprise controls. The everyday support workflow is the same as Standard. If your customers are all on Slack and your security team is not blocking, Standard does the job for 34% less."
---

## The cheap tier has a volume ceiling, not a feature gate

Thena's Starter tier at $29 per user per month reads like a genuine small-team plan, and in feature terms it largely is — Slack and email channels, AI ticket detection, summaries, tagging and an AI assistant are all in it.

The constraint is elsewhere. Starter tops out at five users **and** 1,000 tickets a month. For a B2B support team that is roughly 45 tickets a working day, which a three-person team can clear comfortably. Cross it and the next stop is Standard at $79 — a 172% increase per seat driven purely by how many customers wrote in.

That is a different failure mode from most help desks, where growth is a seat-count problem. Here it is a demand problem, and demand is the thing you least control.

## AI bundled is the structural argument

Thena's clearest pricing decision is that AI is not an add-on. Ticket detection, summaries, tagging and the assistant are in Starter; auto-responses, co-pilot and AI workflows are in Standard. Nothing is metered per resolution.

Set that against the obvious comparison:

| Product | Seat price (annual) | AI cost |
|---|---|---|
| Thena Standard | $79/user | Included |
| Pylon Professional | $89/seat | ~$50/seat add-on + agent usage |
| Unthread Pro | $75/agent | Included, 5-seat minimum |

On paper Pylon Professional and Thena Standard are ten dollars apart. With AI switched on they are roughly $139 against $79 — a gap of 76%, in Thena's favour, for a comparable Slack-native workflow.

The counter-argument is that bundled AI cannot be turned off to save money, and that metered models reward teams with low automation needs. That is real, but it applies to a shrinking set of buyers.

## Annual-only changes the evaluation

There is no published monthly option at any tier. Starter for five seats is $1,740 committed up front.

For a product whose whole pitch is that it slots into how your team already works in Slack, that is a meaningful friction point. Run the trial hard before signing, and specifically test whether ticket auto-detection correctly identifies what counts as a ticket in your channels — that single behaviour determines whether the volume cap is comfortable or tight.

## Teams support is an Enterprise paywall

Microsoft Teams sits in Enterprise at $119 per user. Slack sits in Starter at $29.

This is worth stating plainly because it is not a capability decision on the buyer's side. If your customers are enterprises standardised on Teams, your entry price for Thena is four times what a Slack-native startup pays for the same support workflow. That is a defensible commercial choice by Thena — Teams-first customers skew enterprise — but it means mid-market teams serving Teams customers should price alternatives carefully.

## Model the three-year shape

A support team rarely stays still. The useful exercise is to price where you expect to be in eighteen months rather than where you are:

- Five users, under 1,000 tickets: $1,740/year on Starter
- Five users, 1,500 tickets: $4,740/year on Standard
- Ten users, any volume: $9,480/year on Standard
- Ten users on Teams: $14,280/year on Enterprise

The step from row one to row two costs $3,000 a year and is triggered by nothing you did — just more customers writing in. Budget for it rather than being surprised by it.

## Who should buy it

B2B software teams running customer support in shared Slack channels who want AI included in the seat price rather than metered, and who are comfortable with an annual commitment. For that profile Thena is priced aggressively against Pylon and Unthread once AI is in the comparison.

It suits badly teams whose customers are on Microsoft Teams below enterprise scale, anyone who needs month-to-month billing, and small teams with high ticket volume — that combination hits Starter's ceiling immediately and pays Standard rates on a startup headcount. Check thena.ai for current tiers and confirm the ticket cap against your own last three months of volume.
