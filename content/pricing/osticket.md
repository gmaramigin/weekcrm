---
title: "osTicket Pricing Explained (2026)"
description: >-
  osTicket is free to self-host and $11 to $24 per agent in the cloud — but the
  free version's real cost is measured in sysadmin hours, not dollars.
vendor: osticket
date: 2026-07-24
tldr: >-
  osTicket Community Edition is free, open source and self-hosted with no agent
  limit. The managed cloud service, SupportSystem, runs roughly $11 per agent per
  month on annual billing at the Basic tier up to $24 on Premium, including
  hosting, uptime guarantees, daily backups and vendor support. There is no
  per-agent charge on the free edition at any scale.
tags:
  - osTicket
  - Pricing
  - Help Desk
tiers:
  - name: Community Edition
    price: "$0"
    billing: "free and open source, self-hosted, GPL licensed, unlimited agents"
    includes: "Full ticketing, custom fields and forms, ticket filters, SLA plans, canned responses, agent collision avoidance, knowledge base"
    amount: 0
    unit: "per agent/month"
  - name: Cloud Basic
    price: "~$11/agent/mo"
    billing: "per agent, billed annually via SupportSystem hosting"
    includes: "Managed hosting, guaranteed uptime, daily backups, official email and phone support, automatic updates"
    amount: 11
    unit: "per agent/month"
  - name: Cloud Premium
    price: "~$24/agent/mo"
    billing: "per agent, billed monthly or annually via SupportSystem hosting"
    includes: "Everything in Basic plus higher resource allocation, priority support and advanced hosting options"
    amount: 24
    unit: "per agent/month"
hiddenCosts:
  - "The free edition costs sysadmin time, not licence fees. A PHP and MySQL stack that faces the internet and holds customer data needs patching, TLS renewal, backup verification and upgrade testing. Priced at even a modest hourly rate, four hours a month exceeds a ten-agent cloud subscription."
  - "There is no published volume discount on the cloud tiers. A 50-agent team on Basic pays roughly $660 a month, or $6,600 a year, scaling linearly — so osTicket's cost advantage narrows sharply at scale against banded competitors."
  - "osTicket has no native AI layer. In a 2026 field where deflection is bundled or metered everywhere else, the comparison against modern help desks is a capability gap, not just a price gap."
  - "Community Edition upgrades are manual. Major-version migrations on a customised install can take a day or more of engineering time, and skipping them leaves known vulnerabilities on a public-facing application."
  - "Email deliverability is your problem on self-hosted. Getting outbound ticket replies past spam filters typically means adding a transactional email provider — another small recurring cost outside the $0 headline."
faq:
  - q: "Is Community Edition genuinely free with no agent limit?"
    a: "Yes. osTicket is GPL-licensed open source with no seat cap, no feature gate and no time limit. A hundred-agent deployment costs nothing in licence fees. That is a real and unusual proposition in 2026, and it is why osTicket persists in universities, government departments and IT shops with server capability."
  - q: "What does the cloud version actually add?"
    a: "Operations, not features. SupportSystem provides managed hosting, uptime guarantees, daily backups, automatic updates and official vendor support by email and phone. You are buying the removal of sysadmin responsibility, which for most teams is precisely what the free version costs them."
  - q: "At what team size does self-hosting stop making sense?"
    a: "It is not team size, it is whether you have server operations capability. A three-person IT department that already runs Linux, PHP and MySQL should self-host. A twenty-person support team at a company with no infrastructure staff should not, regardless of how attractive $0 looks — the cloud tier at $11 an agent is cheaper than the first outage."
  - q: "How does $11 an agent compare to the market?"
    a: "It is at the very bottom. Mainstream 2026 help desks start around $19 to $25 a seat and reach $79 to $119 for AI-capable tiers. osTicket Cloud at $11 undercuts all of them — with the caveat that it is a conventional ticketing system without AI, live chat or the omnichannel breadth that justifies the higher prices elsewhere."
---

## Free is a real price, and it is not zero

osTicket Community Edition costs nothing. It is GPL open source, self-hosted, with no agent limit, no feature gating and no expiry. That has been true for two decades and remains the reason it is still installed in thousands of universities, councils and IT departments.

The cost is elsewhere. You are running a public-facing PHP application that holds customer data on infrastructure you maintain. That means patching, TLS certificate renewal, database backups you have actually tested restoring, upgrade planning, and email deliverability configuration.

Four hours of competent sysadmin time a month, valued honestly, exceeds what ten agents would cost on the managed cloud tier. The free edition is free in licence terms and cheap-but-not-free in total cost.

## What the cloud tier buys

| | Community | Cloud Basic | Cloud Premium |
|---|---|---|---|
| Licence cost | $0 | ~$11/agent/mo | ~$24/agent/mo |
| Hosting | Yours | Managed | Managed |
| Backups | Yours | Daily, automated | Daily, automated |
| Updates | Manual | Automatic | Automatic |
| Vendor support | Community forums | Email and phone | Priority |
| Uptime guarantee | None | Yes | Yes |

Nothing in that table is a feature. Every row is an operational responsibility moving from your team to the vendor, which is the correct way to evaluate the upgrade.

## The scaling maths inverts at size

Self-hosted osTicket has one extraordinary property: the licence cost of the hundredth agent is the same as the first. Zero.

The cloud tier does not share it. At roughly $11 an agent with no published volume discount, fifty agents is $6,600 a year and a hundred is $13,200.

That flips the usual calculus. For a small team, cloud is obviously right — $11 times five agents is $660 a year, less than one day of engineering time. For a large team with existing infrastructure, self-hosting saves five figures annually and the sysadmin overhead is amortised across many more agents.

Somewhere around fifteen to twenty-five agents, depending on your infrastructure maturity, the decision genuinely tips.

## The capability gap is the real trade

osTicket does ticketing well and does not pretend otherwise. Custom fields and forms, ticket filters, SLA plans, canned responses, agent collision avoidance, a knowledge base — a complete, conventional help desk.

It has no AI agent, no autonomous deflection, no bundled live chat, no WhatsApp or Instagram channel. The 2026 field has moved: BoldDesk bundles AI at $10 to $20 an agent, HelpDesk.com meters resolutions at $0.99, eDesk charges per AI outcome.

So the comparison is not "osTicket Cloud at $11 versus BoldDesk at $20." It is "a mature classic ticketing system at $11 versus an AI deflection platform at $20." For an internal IT queue where every ticket needs a human anyway, the classic system may be the better purchase. For customer-facing support at volume, the deflection layer is where the savings live and osTicket cannot participate.

## Email deliverability deserves a line of its own

The most common self-hosted osTicket failure is not a security incident. It is outbound replies landing in spam.

Running your own mail from a small server, without SPF, DKIM, DMARC and a warmed sending reputation, produces exactly that. The practical fix is a transactional email provider, which adds a modest recurring cost and some configuration — real, small, and consistently omitted from the "$0" comparison.

## Who should buy it

IT departments and technical organisations with existing Linux, PHP and MySQL capability who want a permanently free, unlimited-agent ticketing system they fully control. At scale that is a genuinely unbeatable proposition, and osTicket's longevity means it is stable and well understood.

Small teams without server operations experience should take the cloud tier at roughly $11 an agent, which is still the cheapest managed help desk worth naming — and anyone whose business case depends on AI deflection should look at a modern platform instead, because osTicket is not competing for that work. Check osticket.com for current cloud tiers and price your own sysadmin hours honestly before choosing free.
