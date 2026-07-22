---
title: "Missive Pricing Explained (2026)"
description: >-
  Missive costs $14/user/month on Starter, dropping to $11.20 on annual billing —
  but the 5-user cap on Starter is what pushes most teams onto the $24 tier.
vendor: missive
date: 2026-07-22
tldr: >-
  Missive's cheapest paid plan is Starter at $14 per user per month, or $11.20
  billed annually. There is no free tier, only a 30-day trial. The real cost
  driver is the hard user cap on each plan — Starter stops at 5 users, so
  hiring a sixth teammate raises your per-seat price by 71%.
tags:
  - Missive
  - Pricing
  - Shared Inbox
tiers:
  - name: Starter
    price: "$14/user/mo"
    billing: "billed monthly; $11.20/user/mo billed annually"
    includes: "Email, SMS and social accounts, team spaces, conversations, tasks, SOC 2 Type II. Up to 5 users."
    amount: 14
    currency: USD
    unit: "per user/month"
  - name: Productive
    price: "$24/user/mo"
    billing: "billed monthly; $19.20/user/mo billed annually"
    includes: "Everything in Starter plus integrations, rules and automations (up to 1,000), basic analytics, API access. Up to 50 users."
    amount: 24
    currency: USD
    unit: "per user/month"
  - name: Business
    price: "$36/user/mo"
    billing: "billed monthly; $28.80/user/mo billed annually"
    includes: "Everything in Productive plus SAML SSO, IP restrictions, advanced analytics, personalised team onboarding. Unlimited users."
    amount: 36
    currency: USD
    unit: "per user/month"
hiddenCosts:
  - "Each plan has a hard user ceiling — 5 on Starter, 50 on Productive. Hitting it forces a full-tier upgrade for every existing seat, not just the new one."
  - "Automation rules are capped at 1,000 on Productive. Heavy rule-builders hit that wall and the only exit is Business at $36 per user."
  - "Shared account allowance is derived from headcount (5 shared accounts per user). A small team managing many client inboxes runs out of allowance before it runs out of seats, and extra shared accounts are purchased separately."
  - "There is no free plan at all — only a 30-day trial. Unlike Hiver or Front, there is no permanent zero-cost fallback if the budget disappears."
  - "Analytics is a two-step gate: nothing on Starter, basic on Productive, advanced on Business. Reporting needs alone can drive a $22-per-user swing."
faq:
  - q: "Does Missive have a free plan?"
    a: "No. Missive offers a 30-day free trial with full feature access and no credit card required, but there is no permanent free tier. When the trial ends you either pay or lose access — which is a meaningful difference from Hiver and Zoho Desk, both of which keep a free plan running indefinitely."
  - q: "What is the cheapest way to run Missive?"
    a: "Starter on annual billing at $11.20 per user per month. For a three-person team that is about $403 a year. It is one of the lowest genuine entry points in the shared-inbox category."
  - q: "How much does annual billing save on Missive?"
    a: "A flat 20% on every tier. That works out to $2.80 per user per month on Starter, $4.80 on Productive and $7.20 on Business. The discount is proportional rather than front-loaded, so the bigger your plan the more absolute cash the commitment saves."
  - q: "What happens when my team outgrows Starter's 5-user limit?"
    a: "You move to Productive and every seat reprices, not just the sixth. A team going from 5 to 6 users goes from $70/month to $144/month on monthly billing — a 106% jump in bill for a 20% increase in headcount. Plan the transition deliberately."
  - q: "Do I need Business, or is Productive enough?"
    a: "Productive is enough for most teams under 50 people. Business exists for two reasons: SAML SSO with IP restrictions (a security-review requirement, not a productivity feature) and the removal of the 1,000-automation cap. If neither applies, the extra $12 per user buys you advanced analytics and onboarding."
---

## The user cap is the pricing model

Most shared-inbox tools gate you on features. Missive gates you on headcount, and that changes how you should think about the bill entirely.

Starter is capped at 5 users. Productive at 50. Business is unlimited. Those ceilings, not the feature lists, are what decide which tier you are on — and because a tier change reprices every existing seat, growth arrives as a step function rather than a slope.

Concretely: five people on Starter monthly is $70. Six people is $144. You added one teammate and your bill more than doubled. Nothing about the sixth person's usage justifies that; it is purely the cap. Teams sitting at four or five users should know exactly what the next hire costs before they make it.

## Where the automation ceiling bites

Productive includes up to 1,000 rules and automations. For most teams that number is effectively infinite — you will build twenty rules and forget the limit exists.

It becomes real for agencies and operations teams that use Missive as a routing engine: one rule per client, per inbound form, per SLA condition. Those setups compound fast, and when they hit 1,000 the only remedy is Business at $36 per user. If your Missive plan involves the phrase "a rule for each client", model that ceiling into your pricing now rather than discovering it in month fourteen.

## Shared accounts scale with people, not need

Missive allocates up to 10 personal and 5 shared accounts per user, pooled across the organisation — a 10-person team gets up to 50 shared accounts. That formula is generous for support teams and awkward for anyone whose inbox count is unrelated to their headcount.

A four-person agency managing thirty client mailboxes is fine at 20 pooled shared accounts only until it isn't. Additional shared accounts are purchasable, but they are priced separately from the seat, so this is a line item you should ask about during the trial rather than after.

## What it costs at real team sizes

Annual billing, showing the tier each team size is forced onto:

| Team | Plan required | Per user/mo | Annual total |
| --- | --- | --- | --- |
| 3 people | Starter | $11.20 | $403 |
| 5 people | Starter | $11.20 | $672 |
| 6 people | Productive | $19.20 | $1,382 |
| 20 people | Productive | $19.20 | $4,608 |
| 60 people | Business | $28.80 | $20,736 |

The 5-to-6 row is the one to internalise. Everything else in Missive's pricing is reasonable; that cliff is the thing that catches people.

## Annual versus monthly

A flat 20% off across all three tiers, with no seat minimum and no contract length games. That is a cleaner deal than most of the category — Freshdesk and Zendesk both vary their annual discount by tier in ways designed to steer you upward.

Missive's uniform 20% means the annual decision is purely about cash flow and confidence, not about being nudged. If you have run the 30-day trial and the team likes it, take the annual price; there is no downside beyond commitment.

## Who this suits and who it doesn't

Missive is priced for small collaborative teams that live in email — three to twenty people, handling shared customer conversations, wanting to co-write replies rather than pass tickets. At that size, $11.20 to $19.20 per user is well below what a full help desk costs and you get real collaboration features rather than a ticket queue.

It is a poor fit for two profiles. Teams hovering at exactly five users, who face a bill that doubles on their next hire. And organisations that want a permanent free tier as a safety net — Missive has none, and once the 30-day trial ends there is no unpaid mode to fall back to.

Prices and caps change, and Missive has adjusted both before. Check missiveapp.com/pricing for the current numbers before committing to a year.
