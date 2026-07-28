---
title: "Bird Pricing Explained (2026)"
description: >-
  Bird prices by consumption — $0.00331 per outbound US SMS and pay-as-you-go
  from $0 — but real contracts tell a different story, with a median annual
  value of $38,146 once bundles and carrier fees stack up.
vendor: bird
date: 2026-07-28
tldr: >-
  Bird (formerly MessageBird) runs a consumption model: pay-as-you-go from $0, a
  Bundle plan starting at 50,000 contacts, and custom Enterprise terms. SMS
  starts at $0.00331 per outbound US message and $0.003 inbound. Real contract
  data shows a median annual value of $38,146, with SMB deals averaging $10,958
  and enterprise $139,908.
tags:
  - Bird
  - Pricing
  - Customer Engagement
tiers:
  - name: Pay-as-you-go
    price: "From $0"
    billing: "consumption only, no platform commitment"
    includes: "Access to messaging APIs and channels with no base fee — you pay per message and per feature used"
    amount: 0
    unit: "per month"
  - name: Bundle
    price: "From 50,000 contacts"
    billing: "committed bundle, quoted by contact volume"
    includes: "Contact-based packaging for marketing and engagement use, entered at the 50,000-contact level"
  - name: Enterprise
    price: "Custom quote"
    billing: "annual contract, negotiated"
    includes: "Enterprise volume terms across messaging, flows and platform features — average enterprise deal reported at $139,908"
    amount: 139908
    unit: "per year"
  - name: SMS (US outbound)
    price: "$0.00331/message"
    billing: "consumption, per message"
    includes: "Outbound US SMS at list rate; inbound US messages at $0.003"
    amount: 0.00331
    unit: "per message"
  - name: Typical annual contract
    price: "$38,146 median"
    billing: "annual, all-in across bundles, flows and carrier charges"
    includes: "Median from 38 real Bird deals — SMB deals average $10,958 and enterprise deals $139,908"
    amount: 38146
    unit: "per year"
hiddenCosts:
  - "The gap between list rates and real contracts is the story. Per-message pricing looks trivial at $0.00331, but median annual contract value across real deals is $38,146 once bundle fees, flow invocations and carrier charges are counted."
  - "Carrier pass-through charges sit on top of Bird's own rates and vary by destination country and route. A quoted per-message price is not your delivered cost."
  - "Flow invocations are metered separately from messages. Automation complexity, not just message volume, drives the bill."
  - "WhatsApp economics changed on 1 July 2025 when Meta moved from per-conversation to per-message pricing. Any WhatsApp cost model built before that date is wrong."
  - "Eight separate pricing plans spanning $0.005 to $150 means the effective structure depends entirely on which channels and features you switch on — there is no single number that describes Bird."
faq:
  - q: "How does Bird's pricing work?"
    a: "Consumption-based. There are three broad routes: pay-as-you-go starting at $0 with no commitment, a Bundle plan entered at 50,000 contacts, and custom Enterprise terms. Underneath sit per-message rates — $0.00331 for outbound US SMS, $0.003 inbound — plus charges for flows and platform features."
  - q: "Why do real contracts cost so much more than the per-message rate suggests?"
    a: "Because messages are only one line. Vendr data across 38 Bird deals shows a median annual contract value of $38,146, and the gap between list pricing and reality comes from bundle fees, flow invocations and carrier charges. Modelling on message volume alone reliably understates the bill."
  - q: "What do SMB and enterprise deals actually cost?"
    a: "Reported averages are $10,958 for SMB and $139,908 for enterprise, with the overall median at $38,146. That spread reflects how much of the platform each customer switches on rather than pure message volume."
  - q: "What changed with WhatsApp pricing?"
    a: "On 1 July 2025 Meta moved WhatsApp from per-conversation to per-message billing. That is an upstream change Bird passes through, and it materially alters cost for anyone running long multi-message WhatsApp threads. Any model built on the old conversation-based pricing needs redoing."
  - q: "Is pay-as-you-go genuinely free to start?"
    a: "Free to start, yes — there is no platform commitment on the pay-as-you-go route. But it is the most expensive per unit, which is the standard trade. The Bundle plan at 50,000 contacts exists because committed volume buys a better rate."
  - q: "What should I model before signing?"
    a: "Four things: message volume by channel and destination country, flow invocation count, carrier surcharges on your actual routes, and contact volume if you are considering the Bundle plan. Ask for a total annual cost estimate against those inputs rather than a per-message rate, because the per-message rate is the smallest part of the answer."
---

## A per-message price that does not predict your bill

Bird's list rates are genuinely low. Outbound US SMS at $0.00331 and inbound at $0.003 are competitive numbers, and the pay-as-you-go route starts at $0 with no platform commitment. Read the pricing page and you would conclude that messaging is nearly free.

Then look at contract data. Across 38 real Bird deals, the median annual value is $38,146. SMB agreements average $10,958; enterprise agreements average $139,908. The distance between $0.00331 a message and $38,146 a year is where the actual pricing model lives.

## Where the gap comes from

Three things, none of them message rates.

Bundle fees. The Bundle plan is entered at 50,000 contacts, and contact-based packaging is priced on your addressable audience rather than on how many messages you send them.

Flow invocations. Bird's automation layer is metered separately. A customer running sophisticated multi-step journeys pays for the orchestration as well as the delivery, which means complexity is a cost driver independent of volume.

Carrier charges. Telecom pass-through varies by destination country and route, and sits on top of Bird's own rate. A quoted per-message price is not a delivered cost, and the difference is largest exactly where you would least like it to be — international destinations.

## Eight plans and what that implies

Bird operates something like eight distinct pricing plans, with unit prices ranging from $0.005 to $150 depending on what is being metered. That is not disorganisation; it reflects a platform that spans SMS, WhatsApp, email, voice, flows and a CRM layer, each with its own economics.

The practical consequence is that no single number describes what Bird costs. Two companies sending identical message volumes can pay very differently depending on which channels and platform features they have switched on. Any comparison against a competitor has to be configuration-specific.

## The WhatsApp change

On 1 July 2025 Meta switched WhatsApp from per-conversation to per-message pricing. Bird passes that through, and it is the most consequential recent change to cost modelling on the platform.

Under the old model, a twenty-message support exchange inside a 24-hour window cost one conversation. Under the new one it costs twenty messages. For businesses running WhatsApp as a primary support or commerce channel, that is not a marginal adjustment — it can be a multiple. Any cost model built before July 2025 needs rebuilding from scratch.

## How to get a real number

Ask Bird for a total annual cost estimate against four specific inputs rather than a rate card: message volume broken down by channel and destination country, expected flow invocation count, contact volume if the Bundle plan is in scope, and carrier surcharges on your actual routes.

Then compare that against the reported medians. If a quote lands well below $10,958 for an SMB configuration, ask what is not included. If it lands near $139,908, you are being quoted enterprise terms and should be negotiating accordingly.

## Who should and should not buy this

Bird fits companies that need programmable messaging across many channels and countries — commerce, logistics, fintech, marketplaces — and that have the engineering capability to build on APIs rather than configure a packaged tool. The consumption model genuinely rewards low and variable volume, and the pay-as-you-go entry point means you can start without a commitment, which very few platforms at this scale offer.

It fits poorly for teams that need budget predictability, since every meaningful cost driver is variable. It fits poorly for organisations without the engineering resource to use the platform properly, who will pay platform prices for what amounts to a bulk SMS tool. And it fits poorly for anyone modelling costs on message rates alone — that approach has produced the gap between list price and the $38,146 median more reliably than anything else.

Bird's packaging spans many plans and changes with upstream carrier and Meta pricing. Confirm current rates and pass-through charges for your specific channels and destinations at bird.com before budgeting.
