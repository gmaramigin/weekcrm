---
title: "Unthread Pricing Explained (2026)"
description: >-
  Unthread's $50 Basic looks cheap until you read the two numbers beside it — a
  5-seat minimum and a 100-conversation monthly cap that push most real teams to
  $75 Pro.
vendor: unthread
date: 2026-07-24
tldr: >-
  Unthread charges $50 per agent per month on Basic and $75 on Pro, both with a
  5-seat minimum and a 14-day trial. Basic caps conversations at 100 a month and
  excludes the AI automation builder, so the practical entry price for a working
  deployment is $375 a month on Pro rather than $250 on Basic.
tags:
  - Unthread
  - Pricing
  - Help Desk
tiers:
  - name: Basic
    price: "$50/agent/mo"
    billing: "per agent, monthly or annual, 5-seat minimum, 14-day free trial"
    includes: "Conversation tracking, SLAs and assignments, Slack Inbox, Slack Broadcasts, basic integrations and API, up to 100 conversations/month"
    amount: 50
    unit: "per agent/month"
  - name: Pro
    price: "$75/agent/mo"
    billing: "per agent, monthly or annual, 5-seat minimum, 14-day free trial"
    includes: "Everything in Basic plus AI automation builder, self-learning docs, customer portal, knowledge base sync, custom analytics, NPS and CSAT, CRM integrations, bi-directional ticket sync and escalations"
    amount: 75
    unit: "per agent/month"
  - name: Enterprise
    price: "Custom quote"
    billing: "custom contract terms, 14-day free trial"
    includes: "Custom integrations, SSO, HRIS and directory sync, HIPAA and BAAs, dedicated hosting, Slack Enterprise Grid, LDAP and custom MSA"
hiddenCosts:
  - "The 5-seat minimum applies to both self-serve tiers. Basic's real entry price is $250 a month and Pro's is $375, regardless of whether you have five agents. A three-person support team pays for five."
  - "Basic's 100-conversation monthly ceiling is low enough to be an evaluation limit rather than an operating one. Roughly five customer conversations a working day exhausts it, which means most teams that buy Basic discover they bought Pro."
  - "The AI automation builder — the reason most 2026 buyers shortlist Unthread — is Pro-only. Basic is a Slack-native shared inbox with SLAs; it is not the automation product."
  - "Slack Enterprise Grid support sits in Enterprise. Organisations already on Grid cannot buy Pro at list and have to enter a sales-quoted contract, which removes the published price as a planning anchor."
  - "HIPAA and BAAs are Enterprise-only. Any healthcare-adjacent buyer should treat the published $50–$75 rates as irrelevant to their own quote."
faq:
  - q: "Is Basic ever the right plan?"
    a: "For a low-volume internal help desk — IT support for a company where a hundred requests a month is genuinely the ceiling — yes. For external customer support at any real scale, no. The conversation cap is the tell: Unthread has priced Basic as a foot in the door rather than as a plan a growing support team stays on."
  - q: "How does the 5-seat minimum work if I only have two agents?"
    a: "You pay for five. At $50 that is $250 a month with three unused licences, and at $75 it is $375. It makes Unthread a poor fit for solo or two-person support teams, and it is the single biggest reason a small team might land on a competitor with no floor."
  - q: "Pro versus Enterprise — what actually forces the upgrade?"
    a: "Four things, none of them about support workflow: SSO, Slack Enterprise Grid, HIPAA/BAA, and dedicated hosting. If your identity, compliance or Slack tier requires any of those, you are in a sales conversation and the list price stops applying. Otherwise Pro is the ceiling of what you need."
  - q: "Is annual billing cheaper?"
    a: "Unthread publishes both monthly and annual options at each tier without a headline discount percentage, so the saving is worth asking about directly rather than assuming. Given the 5-seat floor, negotiating the minimum down is usually worth more to a small team than an annual discount."
---

## Two numbers matter more than the tier prices

Unthread's rate card is simple: $50 per agent per month on Basic, $75 on Pro, custom on Enterprise. The two numbers that actually determine your bill are printed beside them — a five-seat minimum and, on Basic, a hundred-conversation monthly cap.

Together they mean the real entry price for a functioning external support deployment is $375 a month, not $50. Basic at $250 is a plan for internal IT queues and evaluations.

## The conversation cap is the design decision

A hundred conversations a month is about five a working day. Any B2B product with a few hundred paying customers clears that in a fortnight.

This is not an accident or a stingy limit — it is Unthread telling you which product it wants to sell. Basic is conversation tracking with SLAs. Pro is the automation platform: AI automation builder, self-learning documentation, knowledge base sync, customer portal, bi-directional ticket sync into your engineering tracker.

If AI deflection is why Unthread is on your shortlist, Basic is not a cheaper version of that product. It is a different one.

## Price the floor, not the seat

| Actual agents | Seats billed | Basic/mo | Pro/mo |
|---|---|---|---|
| 2 | 5 | $250 | $375 |
| 5 | 5 | $250 | $375 |
| 8 | 8 | $400 | $600 |
| 15 | 15 | $750 | $1,125 |

The first row is where teams get hurt. A two-person support function pays $187 a month for licences nobody logs into — 60% waste. Unthread is explicitly not built for that team, and a small shop should either negotiate the minimum or look at products without one.

From five agents up the model is clean and the per-seat rate is competitive for what Pro includes.

## Pro against the Slack-native field

| Product | Effective entry (5 agents) | AI included |
|---|---|---|
| Unthread Pro | $375/mo | Yes |
| Thena Standard | $395/mo (annual) | Yes |
| Pylon Professional | $445/mo (3 seats + AI) | Add-on, ~$50/seat |

These three land close enough that price should not decide it. What differs is emphasis: Pylon is strongest on the account-centric B2B relationship view, Thena on bundled AI depth across channels, Unthread on bi-directional sync with engineering tools and on the customer portal.

Buy on the workflow, not the ten-dollar spread.

## Enterprise is a compliance gate, not a feature tier

Read the Enterprise list and it is almost entirely infrastructure and legal: SSO, HRIS and directory sync, HIPAA and BAAs, dedicated hosting, LDAP, Slack Enterprise Grid, custom MSA.

The practical consequence is that Slack Enterprise Grid customers — which is most large organisations — cannot buy at list price at all. If your company is on Grid, treat $75 as a floor for negotiation rather than a price you will pay, and start the sales conversation early enough that procurement is not the bottleneck.

## What the 14-day trial should test

Two things, specifically. First, whether Unthread's conversation detection matches your definition of a ticket in a busy shared channel — over-detection inflates you toward the Basic cap and understates how well Pro's automation performs. Second, whether the bi-directional sync to your issue tracker actually closes the loop your engineers need; that integration is the strongest differentiator in Pro and the hardest to evaluate from a feature list.

## Who should buy it

Teams of five or more running B2B customer support in Slack who want tight two-way sync with engineering tooling and a customer portal, and who will use the AI automation builder. Pro at $75 is fairly priced for that combination.

It suits badly any support team under five people, anyone whose volume genuinely fits inside a hundred conversations a month and who therefore should not be paying $250, and Slack Enterprise Grid organisations expecting to self-serve at list. Check unthread.io for current rates and negotiate the seat minimum before you negotiate the rate.
