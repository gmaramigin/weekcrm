---
title: "Freshservice Pricing Explained (2026)"
description: >-
  Freshservice lists $19 per agent/month at Starter, but the ITSM features most
  IT teams came for sit on Growth at $49, and Freddy AI is a $29 add-on on top.
vendor: freshservice
date: 2026-07-22
tldr: >-
  Freshservice runs $19, $49 and $99 per agent per month on annual billing, with
  Enterprise on a custom quote. Starter is a ticket queue rather than an ITSM
  tool, so the real entry price for most IT teams is Growth at $49 — and Freddy
  AI Copilot adds $29 per agent on top of that.
tags:
  - Freshservice
  - Pricing
  - ITSM
  - Service Desk
tiers:
  - name: Starter
    price: "$19/agent/mo"
    billing: "billed annually"
    includes: "Incident management, self-service portal, basic knowledge base and SLAs"
    amount: 19
    unit: "per agent/month"
  - name: Growth
    price: "$49/agent/mo"
    billing: "billed annually"
    includes: "Asset management and CMDB, service catalogue, orchestration, custom workflows"
    amount: 49
    unit: "per agent/month"
  - name: Pro
    price: "$99/agent/mo"
    billing: "billed annually"
    includes: "Problem, change and release management, project management, advanced analytics"
    amount: 99
    unit: "per agent/month"
  - name: Enterprise
    price: "Custom quote"
    billing: "contact sales"
    includes: "Freddy AI included, sandbox, audit logging and enterprise governance controls"
hiddenCosts:
  - "Freddy AI Copilot is a separate $29 per agent per month on Growth and Pro. On Pro that is a 29% increase on a bill you have already agreed, and it is the feature Freshworks markets hardest."
  - "Freshworks advertises 'Save 20% annually', which means the monthly-billing price on every tier is meaningfully higher than the $19/$49/$99 you see by default on the pricing page."
  - "Enterprise pricing is not published at all. If you need the sandbox environment or full AI entitlements you are entering a negotiation with no public anchor to argue from."
  - "Asset management lives on Growth, not Starter. Any team that bought Freshservice specifically for the auto-discovering CMDB is on a $49 seat from day one, whatever the $19 headline suggested."
  - "Agents and requesters are billed differently, and orchestration and integration transaction volumes can carry their own limits — confirm both against your ticket volume before signing an annual term."
faq:
  - q: "Does Freshservice have a free plan?"
    a: "No. There is a 14-day free trial on every tier, but no permanent free plan. Unlike Freshdesk, its customer-support sibling, Freshservice has never offered a free forever tier."
  - q: "What is the real entry price for Freshservice?"
    a: "Officially $19 per agent per month on Starter. Practically $49 on Growth, because asset management, the CMDB, the service catalogue and orchestration all sit on Growth, and those are the reasons IT teams choose an ITSM tool over a shared inbox."
  - q: "How much does Freddy AI cost?"
    a: "Freddy AI Copilot is $29 per agent per month as an add-on to Growth and Pro. Enterprise includes Freddy in its custom quote, which is one of the few concrete reasons to take the Enterprise conversation."
  - q: "Is Freshservice cheaper than ServiceNow?"
    a: "Substantially, and it publishes its prices, which ServiceNow does not. Freshservice Pro at $99 per agent sits roughly where ServiceNow's entry ITSM tier is estimated to start, and Freshservice implementations are measured in weeks rather than quarters."
  - q: "Are there agent minimums?"
    a: "Freshworks does not publish a minimum agent count on the pricing page, which in practice means small teams can buy a handful of Starter or Growth seats. Confirm at checkout, since enterprise terms sometimes carry commitments the self-serve flow does not."
  - q: "What triggers the upgrade from Growth to Pro?"
    a: "Formal ITIL process. Problem, change and release management are Pro features. If your team is still doing change control in a spreadsheet, Growth holds up fine; the day an auditor asks for a change record, Pro is the answer."
---

## What you are actually paying for: agents, and then AI

Freshservice bills per agent — the people who work tickets — and does not charge
for requesters, the employees raising them. That is the right model for internal
IT, where a ten-person service desk might serve three thousand staff, and it is
the main reason Freshservice reads as cheap next to per-endpoint or per-asset
licensing.

The complication is that the published per-agent number is no longer the whole
bill. Freddy AI Copilot sits outside the tier structure at $29 per agent per
month, applied to Growth and Pro. Freshworks builds most of its marketing around
Freddy — the deflection rates, the assisted resolutions — and then prices it as
an extra. A Pro seat with the AI story intact is $128 per agent per month, not
$99. Budget from that number or you will re-budget in month two.

## The tier that matters is Growth, not Starter

Starter at $19 gives you incident management, a self-service portal, a basic
knowledge base and SLAs. That is a competent ticketing system. It is not ITSM.

Everything that distinguishes Freshservice from a help desk — the
auto-discovering CMDB, asset lifecycle management, the service catalogue,
orchestration and custom workflows — begins at Growth. Teams evaluating
Freshservice almost always arrived because of asset management, which means the
$19 tier is a marketing floor rather than a real option for them. Treat $49 as
the entry price and the product looks honest; treat $19 as the entry price and
you will feel misled at the first demo.

## Three team sizes, priced out

| Agents | Growth (annual) | Pro (annual) | Pro + Freddy AI |
| --- | --- | --- | --- |
| 5 | $2,940 | $5,940 | $7,680 |
| 20 | $11,760 | $23,760 | $30,720 |
| 50 | $29,400 | $59,400 | $76,800 |

Two things fall out of that table. First, the Growth-to-Pro step doubles the
bill — it is the single largest proportional jump in the lineup, and it buys
process maturity rather than capability. Second, at fifty agents on Pro with
Freddy, Freshservice is a $76,800 annual line item, which is the range where
ServiceNow will happily quote you and the "lightweight alternative to
ServiceNow" positioning starts to wobble.

## When Pro is worth double, and when it is not

Pro adds problem, change and release management, project management and
advanced analytics. The honest test is whether anyone outside your team asks for
change records. Regulated industries, anyone carrying SOC 2 or ISO 27001,
anyone with a real CAB — Pro, immediately, and the doubled bill is cheaper than
a failed audit finding.

Everyone else should stay on Growth longer than a Freshworks rep will suggest.
Incident, asset and request management cover the daily work of most internal IT
teams. Formal change management adopted before the organisation is ready becomes
a rubber-stamping ritual that costs $50 per agent per month.

## Annual commitment, and the missing monthly number

Freshworks displays annual pricing by default and flags "Save 20% annually" at
the top of the page. Monthly billing exists and costs more; the pricing page
does not put a figure on it in the default view, so treat any monthly estimate
you see elsewhere — including a derived one — with suspicion and confirm it at
checkout.

The 14-day trial covers all tiers. Fourteen days is short for an ITSM
evaluation, since a meaningful test means importing assets and running at least
one real change. Ask for an extension; Freshworks grants them routinely.

## Who this pricing punishes

It punishes small IT teams who need asset management: five agents on Growth is
$2,940 a year for a function two people perform part-time. It punishes anyone
who took the $19 headline into a budget meeting. And it punishes teams that
adopt Freddy across a large agent pool, where a 29% uplift compounds against
every seat regardless of who actually uses the AI.

It suits mid-market IT organisations of fifteen to sixty agents supporting a
much larger employee base — the shape where per-agent billing, an included
CMDB and a genuinely fast implementation combine into a lower total cost than
anything at the enterprise end of the market.

Prices change, tiers get repackaged, and Freshworks moves its add-on boundaries
more often than most. The Freshservice pricing page is the authority on what you
will actually be charged.
