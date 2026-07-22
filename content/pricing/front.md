---
title: "Front Pricing Explained (2026)"
description: >-
  Front lists $25/seat/mo for Starter, but single-channel limits and $20/seat AI
  add-ons mean most teams land on Professional at $65 or higher.
vendor: front
date: 2026-07-22
tldr: >-
  Front's cheapest real plan is Starter at $25/seat/mo, capped at 10 seats and
  one channel type. Omnichannel starts at Professional, $65/seat/mo. The bill
  inflates through AI add-ons — Copilot and Smart QA are $20/seat/mo each,
  Autopilot from $0.05 per conversation.
tags:
  - Front
  - Pricing
  - Help Desk
tiers:
  - name: Starter
    price: "$25/seat/mo"
    billing: "billed monthly, up to 10 seats; 24% off billed annually"
    includes: "Single channel type, shared inbox, up to 10 rules, 14-day free trial"
    amount: 25
    currency: USD
    unit: "per seat/month"
  - name: Professional
    price: "$65/seat/mo"
    billing: "billed monthly, up to 50 seats; 24% off billed annually"
    includes: "Omnichannel (email, SMS, social, WhatsApp), up to 20 rules, analytics"
    amount: 65
    currency: USD
    unit: "per seat/month"
  - name: Enterprise
    price: "$105/seat/mo"
    billing: "billed monthly, no published seat cap; 24% off billed annually"
    includes: "Unlimited macros and rules, Copilot, Smart QA and Smart CSAT included"
    amount: 105
    currency: USD
    unit: "per seat/month"
  - name: AI and channel add-ons
    price: "From $0.05/conversation"
    billing: "metered or per seat, on top of any plan"
    includes: "Autopilot from $0.05/conversation; Copilot $20/seat/mo; Smart QA $20/seat/mo; Smart CSAT $10/seat/mo"
hiddenCosts:
  - "Starter is single-channel only. The moment you add SMS, WhatsApp or social alongside email you are on Professional at $65/seat/mo — a 160% jump per seat, not an upgrade fee."
  - "Copilot and Smart QA are $20/seat/mo each and Smart CSAT is $10/seat/mo. Buying all three on Professional pushes effective cost to $115/seat/mo, above the Enterprise list price where they are bundled."
  - "Autopilot is metered from $0.05 per conversation, so deflection volume is a separate variable cost that scales with your busiest months rather than your headcount."
  - "Native WhatsApp is billed at Meta's message rates plus a 20% administrative fee to Front, which is invisible until your first high-volume campaign."
  - "Raising the API rate limit costs $200 per additional 100 requests/minute per month — relevant if you sync Front with an ERP or order system."
faq:
  - q: "What is the cheapest way to use Front?"
    a: "Starter at $25/seat/mo, capped at 10 seats. It only supports one channel type, so it works for an email-only shared inbox and stops working the day you add SMS or WhatsApp."
  - q: "Is there a free plan?"
    a: "No. Front offers a 14-day free trial with no credit card required, but there is no free forever tier. Every production use of Front is paid."
  - q: "How much does annual billing save on Front?"
    a: "24%, which is one of the steeper annual discounts in the shared inbox category. On a 20-seat Professional deployment that is roughly $3,700 a year against the monthly rate."
  - q: "Should I buy AI add-ons or move to Enterprise?"
    a: "Do the arithmetic. Professional at $65 plus Copilot ($20) plus the QA+CSAT bundle ($25) is $110/seat/mo. Enterprise lists at $105/seat/mo with those included. If you want more than one AI add-on, Enterprise is usually cheaper."
  - q: "Are there seat minimums or maximums?"
    a: "No published minimum. There are maximums: Starter tops out at 10 seats and Professional at 50. Crossing those thresholds forces a tier change regardless of which features you use."
  - q: "Does Front charge for light or occasional users?"
    a: "Front does not publish a discounted viewer seat. Anyone who needs access is a full seat at the plan rate, which is what makes cross-department collaboration expensive on Professional and above."
---

## The channel limit is the real pricing lever

Most shared inbox tools gate features. Front gates channels, and that decision drives the whole cost curve. Starter at $25/seat/mo supports a single channel type. If your customers only email you, that is a fair price for a well-built collaborative inbox.

The instant a second channel matters — SMS for delivery updates, WhatsApp for an international customer base, Instagram DMs for a consumer brand — you are on Professional at $65/seat/mo. That is not a 20% step up, it is 2.6x per seat. A 15-person team goes from $375/mo to $975/mo for the privilege of answering texts.

So the question to answer before you sign anything is not "which features do we need" but "how many channel types will we run in 18 months". Teams that answer honestly usually skip Starter entirely.

## Where the AI add-ons cross over

Front unbundles AI into four separately priced products, and the combination is where finance teams get caught:

- Autopilot: from $0.05 per resolved conversation
- Copilot: $20/seat/mo (included on Enterprise)
- Smart QA: $20/seat/mo (included on Enterprise)
- Smart CSAT: $10/seat/mo (included on Enterprise)
- QA + CSAT bundle: $25/seat/mo

Professional plus Copilot alone is $85/seat/mo. Professional plus Copilot plus the QA+CSAT bundle is $110/seat/mo — five dollars more per seat than Enterprise at $105, where all three ship in the box. If you want two or more AI products, Enterprise is the cheaper purchase and you also get unlimited rules and macros.

Autopilot stays metered on every tier, so deflection volume remains a variable cost no matter what you buy.

## Modelling 10, 25 and 60 seats

Monthly list rates, seats only, ignoring add-ons:

| Seats | Starter ($25) | Professional ($65) | Enterprise ($105) |
| --- | --- | --- | --- |
| 10 | $250/mo | $650/mo | $1,050/mo |
| 25 | not available (10-seat cap) | $1,625/mo | $2,625/mo |
| 60 | not available | not available (50-seat cap) | $6,300/mo |

Apply 24% for annual billing and the 60-seat Enterprise figure lands near $4,790/mo. The table's blank cells matter more than the numbers: Front's seat caps mean growth alone can force two tier changes on the way from 8 agents to 60, each with a price step you did not choose.

## Annual vs monthly, and negotiating room

Annual billing takes 24% off list, meaningfully better than the 15-20% most competitors offer. Front does not publish a minimum contract beyond the annual term, and the trial is 14 days with no card.

Enterprise carries a published $105/seat/mo figure but routes to a demo request rather than self-serve checkout. In practice that is a list price with negotiating room, particularly above 50 seats or on a multi-year term. If you are buying Enterprise at scale, treat $105 as the ceiling rather than the number.

## Who Front prices well for, and who should look elsewhere

Front earns its rate in operations-heavy businesses where a single customer request crosses teams — logistics, freight, financial services, wholesale. The collaboration model genuinely reduces internal email, and at 20-50 seats on Professional the per-seat cost is defensible against the coordination it removes.

It prices badly for two profiles. Small email-only support teams are paying a collaboration premium they will not use — Help Scout at $21-$37.80/user/mo annually does shared inbox and knowledge base for less. And any team with a lot of read-only stakeholders suffers, because Front has no cheap viewer seat: your account manager who checks a thread twice a week costs the same as your busiest agent.

High-volume consumer support is the other mismatch. When most tickets are repetitive order questions, per-seat pricing plus metered Autopilot is a worse fit than a ticket-volume model.

## Verify before you budget

Prices here reflect front.com/pricing in July 2026. Front re-bundles its AI products more often than it changes seat rates, so the add-on column is the part most likely to be stale by the time you read this. Confirm against Front's own page, and ask sales directly whether Copilot has moved into Professional before you buy it separately.
