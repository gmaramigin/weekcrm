---
title: "Helpshift Pricing Explained (2026)"
description: >-
  Helpshift charges by issue, not by agent — $150/month for 250 issues on
  Starter and about $0.45 for every issue beyond the allowance, which makes a
  busy month cost more than a big team does.
vendor: helpshift
date: 2026-07-28
tldr: >-
  Helpshift prices on issues rather than seats. Starter is $150/month including
  250 issues, with overage at roughly $0.45 per issue. Growth and Enterprise are
  quoted by sales. Agent headcount does not change the bill; ticket volume is
  the only meter that matters.
tags:
  - Helpshift
  - Pricing
  - Customer Support
tiers:
  - name: Starter
    price: "$150/mo"
    billing: "monthly, includes 250 issues"
    includes: "In-app and web messaging, bot-driven self-service, knowledge base and the agent desk — priced on issue volume rather than seats"
    amount: 150
    unit: "per month"
  - name: Overage
    price: "~$0.45 per issue"
    billing: "charged on every issue beyond the plan allowance"
    includes: "The variable half of the model — the rate that decides whether Helpshift is cheap or expensive for your volume"
    amount: 0.45
    unit: "per issue"
  - name: Growth
    price: "Custom quote"
    billing: "sales-negotiated, larger issue allowances"
    includes: "Higher included issue volume plus expanded automation, routing and integration capability"
  - name: Enterprise
    price: "Custom quote"
    billing: "sales-negotiated, annual"
    includes: "Enterprise issue volumes, advanced compliance, SLAs and dedicated support"
hiddenCosts:
  - "The overage rate is the whole risk. At roughly $0.45 an issue, going 1,000 issues over your Starter allowance adds $450 — three times the base plan — in a single month."
  - "Issue-based pricing means a marketing campaign, an outage or a bad app release costs you twice: once in support load, once on the invoice."
  - "Because agents are free, there is no pricing signal telling you to staff efficiently — but there is a strong one telling you to deflect. The model only pays off if your bots and self-service actually work."
  - "Published tier detail beyond Starter is thin. Growth and Enterprise are negotiated, so the effective per-issue rate at volume is whatever you manage to agree rather than a published discount curve."
  - "Definitions matter enormously here. Confirm in writing what counts as an 'issue' — a conversation, a ticket, a reopened thread — because that definition is the meter."
faq:
  - q: "How is Helpshift's pricing different from a normal help desk?"
    a: "Almost every competitor charges per agent per month. Helpshift charges a flat plan fee that includes a set number of issues, then bills roughly $0.45 for each one beyond it. Your headcount is irrelevant to the bill; your ticket volume is everything."
  - q: "What does Starter actually cost in a real month?"
    a: "$150 if you stay inside 250 issues. At 500 issues it is roughly $262. At 1,000 issues it is roughly $487. At 2,500 issues it is roughly $1,162. The base fee stops being the number that matters somewhere around your third month of growth."
  - q: "Is issue-based pricing cheaper?"
    a: "It depends on the ratio of agents to tickets. A team of fifteen agents handling low volume — complex, high-touch support — wins enormously, because fifteen seats elsewhere would cost far more. A team of three agents fielding thousands of simple tickets loses, because seat pricing would have capped their cost and issue pricing does not."
  - q: "Does deflection actually reduce my bill?"
    a: "That is the design intent, and it is the strongest argument for the model. Every question your bot or knowledge base resolves without creating an issue is money you do not spend. On seat-based pricing, deflection saves you headcount eventually; here it saves you cash immediately. Confirm with Helpshift whether bot-resolved conversations count as issues, because that single answer changes the economics."
  - q: "What are Growth and Enterprise?"
    a: "Larger issue allowances with expanded automation, routing and compliance, both quoted by sales. There is no published rate, which means the per-issue economics at scale are a negotiation rather than a published discount table."
  - q: "What should I nail down before signing?"
    a: "The definition of an issue, whether bot-only conversations count, what happens to unused allowance at month end, and the overage rate in writing. Those four answers determine your bill far more than the tier name does."
---

## Volume is the meter, not headcount

Helpshift made a structural choice that puts it in a different category from every per-agent help desk it competes with: you pay for issues. Starter is $150 a month and includes 250 of them. Everything past that costs roughly $0.45.

Agents are free. Hire twenty and the bill does not move. Field 5,000 tickets instead of 250 and it moves a great deal.

This is not a gimmick — it is a coherent bet on where support value comes from. Helpshift is built around in-app messaging and bot-driven deflection, and issue pricing aligns its revenue with the thing it wants customers to reduce. It also transfers volume risk from the vendor to you, which is the part to model carefully.

## What a month actually costs

| Monthly issues | Included | Overage | Total | Effective per issue |
|---|---|---|---|---|
| 250 | 250 | $0 | $150 | $0.60 |
| 500 | 250 | ~$112 | ~$262 | $0.52 |
| 1,000 | 250 | ~$337 | ~$487 | $0.49 |
| 2,500 | 250 | ~$1,012 | ~$1,162 | $0.46 |
| 5,000 | 250 | ~$2,137 | ~$2,287 | $0.46 |

Two things fall out of that table. The effective per-issue cost converges on the overage rate almost immediately, so at any real volume the $150 base fee is noise and $0.45 is your actual price. And Starter is clearly not a plan for a growing support operation — it is an entry point that pushes you into a Growth conversation by design.

## The seat-versus-issue comparison

The right way to evaluate Helpshift is a ratio: tickets per agent per month.

A specialist support team — fifteen agents handling complex, low-volume cases at 60 tickets each — fields 900 issues. On Helpshift that is roughly $442. On a $50-per-seat competitor it is $750. Helpshift wins comfortably.

A high-volume consumer team — three agents at 800 tickets each — fields 2,400 issues. On Helpshift that is roughly $1,117. On the same $50-per-seat competitor it is $150. Helpshift loses by a factor of seven.

The crossover sits around 110 issues per agent per month against a $50 seat. Calculate your own number before anything else; it decides the whole question.

## Deflection changes from a nice-to-have to a line item

On per-seat pricing, a knowledge base that answers 30% of questions saves you a hire eventually. On issue pricing, it saves you 30% of your bill this month. That is a genuinely different incentive, and it is Helpshift's best argument.

It rests entirely on one definitional question: does a conversation the bot resolves count as an issue? If it does not, deflection is pure margin and the model is compelling. If it does, you are paying $0.45 to have a bot answer a question, and the incentive inverts. Get the answer in writing before you sign — it is the single highest-leverage clause in the contract.

## What to negotiate

Growth and Enterprise are unpublished, which means the per-issue rate at volume is whatever you agree. Come with twelve months of actual ticket data and ask for a tiered rate that steps down as volume rises, plus a defined position on seasonal spikes. Consumer apps with a December surge should specifically ask whether unused allowance from quiet months can offset busy ones — the answer is usually no by default and occasionally yes when asked.

## Who should and should not buy this

Helpshift fits mobile-first and in-app support operations — games, consumer apps, fintech — where the SDK-based messaging experience is the reason to buy and where bot deflection has enough repetitive volume to work on. It fits teams with many agents and moderate ticket loads, where free seats are a real saving.

It fits poorly for lean teams with heavy volume, which is exactly the profile per-seat pricing protects and issue pricing punishes. It fits poorly for anyone who needs a predictable monthly number, since the bill tracks demand you do not control. And it fits poorly if your deflection is weak — the model assumes self-service works, and charges you when it does not.

Helpshift quotes Growth and Enterprise individually and its issue definitions have changed over time. Confirm current allowances, overage rates and what counts as an issue directly with Helpshift before budgeting.
