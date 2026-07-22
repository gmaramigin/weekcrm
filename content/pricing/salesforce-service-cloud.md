---
title: "Salesforce Service Cloud Pricing Explained (2026)"
description: >-
  Service Cloud runs from $25 to $550 per user/month across five editions, and
  every tier above Starter Suite requires an annual contract you cannot exit early.
vendor: salesforce-service-cloud
date: 2026-07-22
tldr: >-
  Starter Suite is $25/user/month and is the only edition billed monthly.
  Everything serious starts at Enterprise, $175/user/month on an annual contract.
  Implementation labour and per-user add-ons, not the licence, are what blow up
  a Service Cloud budget.
tags:
  - Salesforce Service Cloud
  - Pricing
  - Help Desk
tiers:
  - name: Starter Suite
    price: "$25/user/mo"
    billing: "billed monthly or annually"
    includes: "Sales, service, marketing and commerce basics with built-in AI"
    amount: 25
    unit: "per user/month"
  - name: Pro Suite
    price: "$100/user/mo"
    billing: "billed annually, contract required"
    includes: "More marketing, sales, service and commerce tooling; added automation"
    amount: 100
    unit: "per user/month"
  - name: Enterprise
    price: "$175/user/mo"
    billing: "billed annually, contract required"
    includes: "Full customisation, advanced case management, sandboxes, APIs"
    amount: 175
    unit: "per user/month"
  - name: Unlimited
    price: "$350/user/mo"
    billing: "billed annually"
    includes: "Enterprise plus chat and bots, Salesforce Knowledge, Premier Success, full sandbox"
    amount: 350
    unit: "per user/month"
  - name: Agentforce 1 Service
    price: "$550/user/mo"
    billing: "billed annually"
    includes: "Everything in Unlimited, full AI suite, unmetered employee Agentforce, 2.5M Flex Credits per org/year"
    amount: 550
    unit: "per user/month"
hiddenCosts:
  - "Salesforce's own pricing footnote says transaction fees apply on Starter and Pro Suite in addition to the per-user price, so the headline figure is a floor rather than a total."
  - "API access is metered by edition. Pro Suite users pay an additional $25/user/month for web services API access that Enterprise includes outright."
  - "Some channel capabilities carry a further $75/user/month on lower editions — check exactly which features your routing plan depends on before choosing a tier."
  - "Implementation is the real budget line. Service Cloud above Pro Suite is almost never configured in-house, and partner engagements routinely cost more in year one than the licences do."
  - "Editions above Starter Suite require an annual contract, so mid-year headcount reductions do not reduce your bill."
faq:
  - q: "Which Service Cloud edition can I actually buy month-to-month?"
    a: "Only Starter Suite. Salesforce lists it as billed monthly or annually. Pro Suite, Enterprise, Unlimited and Agentforce 1 Service are all annual, and Salesforce explicitly notes a contract is required from Pro Suite up."
  - q: "Is Enterprise $165 or $175 per user?"
    a: "Salesforce's Service Cloud pricing page currently lists Enterprise at $175 USD per user per month billed annually. Older figures of $165 circulate widely in third-party guides; treat the Salesforce page as authoritative."
  - q: "What is Agentforce 1 Service and is it worth $550?"
    a: "It bundles Unlimited with Salesforce's full AI suite, unmetered Agentforce for employees, and 2.5 million Flex Credits per org per year. It is worth it only if AI-driven deflection is a board-level programme, not a pilot."
  - q: "Does Service Cloud have a free tier?"
    a: "No. There is a free trial, but no permanent free edition. The cheapest committed entry point is Starter Suite at $25 per user per month."
  - q: "Can I mix editions across my org?"
    a: "Generally no — Salesforce sells editions at the org level, so everyone lands on the same tier. That is a meaningful cost difference from per-seat-type vendors like HubSpot, where light users can sit on cheaper seats."
  - q: "How much should I budget for implementation?"
    a: "Salesforce does not publish a number because the work is done by partners. Plan for a discovery and build engagement scoped in weeks, not days, for anything at Enterprise or above."
---

## The licence is the small number

Five editions, a 22x spread between the cheapest and the most expensive, and a footnote on every one of them. Service Cloud pricing looks like a straightforward ladder — $25, $100, $175, $350, $550 per user per month — and then the actual invoice arrives with a partner statement of work attached.

Three things drive the total. Headcount is the obvious one. Edition is the second, and it is an org-wide decision rather than a per-person one, so the least-technical user in the building costs the same as your solutions architect. The third and largest, for most buyers above Pro Suite, is implementation labour. Salesforce sells a platform that models nearly any support process, which is exactly why nearly nobody configures it without help.

## Where each step up earns its money

Starter Suite to Pro Suite is a 4x jump for more automation and more of the suite. It is a reasonable move for a growing team that has outgrown out-of-the-box flows but has no appetite for customisation.

Pro Suite to Enterprise is the one that matters, and it is usually forced rather than chosen. Enterprise is where full customisation, deeper case management and sandbox environments live — and where API access stops costing an extra $25/user/month. Any team building integrations should model Pro Suite at $125 effective per user before comparing it with Enterprise at $175, which makes the gap $50 rather than $75.

Enterprise to Unlimited doubles the price for chat and bots, Salesforce Knowledge and the Premier Success plan. If you were going to buy Premier support anyway and you need native bots, the maths works. If you are buying Unlimited for the reassurance, you are paying $2,100 per user per year for reassurance.

## Worked cost, annual licences only

| Agents | Pro Suite | Enterprise | Unlimited | Agentforce 1 Service |
|---|---|---|---|---|
| 10 | $12,000 | $21,000 | $42,000 | $66,000 |
| 25 | $30,000 | $52,500 | $105,000 | $165,000 |
| 100 | $120,000 | $210,000 | $420,000 | $660,000 |

None of those figures include implementation, add-on channels, or the transaction fees Salesforce flags on the lower suites. A 25-agent Enterprise deployment landing at $52,500 in licences and a comparable amount again in year-one partner work is entirely ordinary.

## Contract terms you should read before the price list

Salesforce states that most of its products use annual contracts, and marks every edition above Starter Suite as requiring one. In practice that means you size your seat count for the year ahead and live with it. Support teams with seasonal volume — retail, tax, ticketing — should think hard about whether to licence to peak or to baseline and absorb the crunch with contractors on a lighter tool.

There is no free edition. There is a trial, and Starter Suite is cheap enough to pilot honestly, but Starter Suite is not a small version of Enterprise. It is a different product shape, and a pilot there tells you very little about what Enterprise will feel like.

## Who should and should not be here

Service Cloud earns its price at organisations that already run Salesforce for sales, have genuinely complex routing or compliance requirements, and have someone internally who owns the platform. At that profile, the integration depth is worth real money and no lighter tool substitutes for it.

It punishes small teams badly. Under roughly 20 agents, the licence cost is survivable but the configuration burden is not — you will spend months getting to a state that Zendesk or Freshdesk reach in a fortnight. It also punishes flat organisations where most users are light-touch, because there is no cheap seat class to put them in.

Prices and edition names change; Salesforce renamed and repackaged its top service tier around Agentforce recently. Check [salesforce.com/service/pricing](https://www.salesforce.com/service/pricing/) before you build a budget on any of these numbers, and get add-on pricing quoted in writing.
