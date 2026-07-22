---
title: "Freshdesk Pricing Explained (2026)"
description: >-
  Freshdesk starts at $19/agent/month on annual billing, but Freddy AI Copilot at
  $29/agent and metered AI Agent sessions are what actually decide your invoice.
vendor: freshdesk
date: 2026-07-22
tldr: >-
  Freshdesk costs $19/agent/month (Growth), $55 (Pro) or $89 (Enterprise) on
  annual billing. There is no permanent free plan — just a 14-day Enterprise
  trial. The real cost driver is AI: Freddy Copilot adds $29/agent/month and
  extra AI Agent sessions run $49 per 100.
tags:
  - Freshdesk
  - Pricing
  - Helpdesk
tiers:
  - name: Free trial
    price: "$0"
    billing: "14 days, no card required"
    includes: "Full Enterprise feature set for 14 days, then you pick a paid plan"
    amount: 0
    unit: "trial"
  - name: Growth
    price: "$19/agent/mo"
    billing: "per agent, billed annually"
    includes: "Ticketing, shared inbox, customer portal, knowledge base, analytics, first 500 Freddy AI Agent sessions"
    amount: 19
    unit: "per agent/month"
  - name: Pro
    price: "$55/agent/mo"
    billing: "per agent, billed annually"
    includes: "Everything in Growth plus multilingual helpdesk, custom dashboards, intelligent routing, multiple SLA policies, external collaborators"
    amount: 55
    unit: "per agent/month"
  - name: Enterprise
    price: "$89/agent/mo"
    billing: "per agent, billed annually"
    includes: "Everything in Pro plus Freddy AI Insights, skill-based routing, sandbox, audit logs, IP whitelisting"
    amount: 89
    unit: "per agent/month"
  - name: Freddy AI Copilot
    price: "$29/agent/mo"
    billing: "add-on, Pro and Enterprise only"
    includes: "Agent-side AI assist — reply drafting, summarisation, suggested actions"
    amount: 29
    unit: "per agent/month"
hiddenCosts:
  - "Freddy AI Copilot is a separate $29/agent/month line item and it is only sold on Pro and Enterprise — on a 20-agent Pro team that is $580/month on top of the $1,100 seat cost."
  - "AI Agent sessions are metered. Growth includes the first 500; beyond that you buy blocks at $49 per 100 sessions, and a busy chat deflection setup burns through those fast."
  - "Freshdesk publishes annual rates by default with a 20% annual discount, so month-to-month billing is materially more expensive than the numbers on the page suggest."
  - "Day passes exist for occasional agents at $2 (Growth), $7 (Pro) and $12 (Enterprise) — cheap individually, but seasonal support teams often find these quietly outrun a full seat."
  - "Connector app tasks for third-party integrations are billed at $80 per 5,000 tasks, which turns a chatty Jira or Shopify sync into a recurring charge."
faq:
  - q: "Does Freshdesk still have a free plan?"
    a: "Not as a standing tier on the pricing page. Signing up gets you 14 days on the Enterprise plan, after which you have to choose Growth, Pro or Enterprise. Freshworks has run limited free programs for very small teams in the past, so check the current offer before assuming you can stay at zero."
  - q: "What is the cheapest real Freshdesk plan?"
    a: "Growth at $19/agent/month billed annually. For a three-agent team that is $57/month. It covers ticketing, a knowledge base, the customer portal and 500 Freddy AI Agent sessions — enough for a small support desk that does not need SLA tiers or routing rules."
  - q: "Is the jump from Growth to Pro worth $36 an agent?"
    a: "Only if you need routing or multiple SLAs. Pro's headline additions — intelligent routing, multiple SLA policies, custom dashboards, multilingual support — matter once you have enough ticket volume that manual assignment breaks down. Under roughly eight agents, most teams do not."
  - q: "How much does Freshdesk AI actually cost?"
    a: "Two ways. Freddy AI Copilot is $29/agent/month and only available on Pro and Enterprise. Freddy AI Agent runs on sessions: 500 included on Growth, then $49 per 100 additional sessions. The session meter, not the Copilot seat fee, is what surprises people."
  - q: "Is annual billing required?"
    a: "No, but the pricing page quotes annual rates and advertises a 20% annual saving, so monthly billing costs about a fifth more per agent. If you are confident in the tool past three months, annual is the obvious call."
  - q: "Does Freshdesk charge for extra ticket volume?"
    a: "The core plans are priced per agent, not per ticket, so ticket count itself is not billed. The metered items are AI Agent sessions and connector app tasks — both of which scale with volume even though your seat count does not."
---

## Agents are the meter, AI is the multiplier

Freshdesk prices the way most help desks do: you pay per agent, per month, and the plan you pick decides which features those agents get. The three published tiers are $19, $55 and $89 per agent on annual billing. That part is simple and predictable.

What is not predictable is the AI layer sitting on top of it, and in 2026 that layer is where most of the budget variance lives. Freshworks split its AI into two products with two completely different billing models. Freddy AI Copilot — the agent-facing assistant that drafts replies and summarises threads — is a flat $29/agent/month, and it is locked to Pro and Enterprise. Freddy AI Agent, the customer-facing bot that deflects tickets before a human sees them, is metered by session. Growth includes 500 sessions, and past that you buy them in blocks at $49 per 100.

That second number deserves attention. A session is not a resolved ticket; it is a conversation the bot participates in. Deflection tools work by touching a lot of conversations, most of which end without saving you anything. If your chat widget is busy, session consumption can outrun the seat bill, and it does so without a headcount change to warn you.

## What a real invoice looks like

Seat prices in isolation are misleading, so here is the same team at three sizes, on annual billing, with and without Copilot.

| Team size | Growth (seats only) | Pro (seats only) | Pro + Freddy Copilot |
|---|---|---|---|
| 5 agents | $95/mo | $275/mo | $420/mo |
| 20 agents | $380/mo | $1,100/mo | $1,680/mo |
| 50 agents | $950/mo | $2,750/mo | $4,200/mo |

Two things fall out of that table. First, the Growth-to-Pro step is a 2.9x price increase, which is a much larger jump than the tier layout implies. Second, Copilot adds roughly 53% to a Pro bill — it is not a rounding-error add-on, it is a meaningful second subscription. Neither line includes AI Agent sessions or connector tasks.

## Where the tier jumps earn their money

Growth to Pro is worth it at the point where ticket assignment stops working by hand. The specific unlocks are intelligent routing, multiple SLA policies, custom dashboards and external collaborators. Those are volume features. A five-agent desk handling a few hundred tickets a month assigns work informally and does not need them; a fifteen-agent desk with tiered support contracts genuinely cannot run without them. If you are debating this jump on features alone rather than on operational pain, you are not ready for it.

Pro to Enterprise is the softer sell. The additions — Freddy AI Insights, skill-based routing, sandbox, audit logs, IP whitelisting — are mostly governance and compliance. If a procurement or security team is asking about audit trails and IP restrictions, Enterprise is not optional and the $34/agent delta is not the argument. If nobody is asking, Pro plus Copilot usually delivers more day-to-day value than Enterprise without Copilot for a similar spend.

## Billing terms and commitment

Freshdesk leads with annual pricing and advertises a 20% saving for committing, which means the monthly-billed equivalent is materially higher than the numbers you see first. There is no published seat minimum, so a two-agent team can genuinely start on Growth for $38/month. The onboarding path is a 14-day trial with full Enterprise access — worth using deliberately, because it lets you test routing and SLA behaviour you would otherwise have to buy Pro to see.

## Who this suits, and who should look elsewhere

Freshdesk fits small-to-mid support teams with steady headcount and email-plus-portal as the primary channels. Growth at $19 is one of the better entry prices among established help desks, and a team of three to eight agents gets a real ticketing system for under $160/month.

It punishes two profiles. The first is a small team that wants modern AI deflection: Copilot is gated behind Pro, so getting agent-side AI means paying $55 + $29 = $84/agent, and at that price the value comparison against Intercom or Zendesk gets uncomfortable. The second is any team with spiky, seasonal conversation volume — the session meter turns a busy quarter into a bill you did not forecast.

List prices move, promotional programs come and go, and regional pricing differs. Treat the figures here as a decision aid and confirm against Freshdesk's own pricing page before you sign anything.
