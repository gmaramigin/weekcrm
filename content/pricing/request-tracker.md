---
title: "Request Tracker (RT) Pricing Explained (2026)"
description: >-
  Request Tracker is free to self-host forever. The hosted Cloud RT plans start
  at $15/user/month — but the seat minimums, not the rate, set the real floor.
vendor: request-tracker
date: 2026-07-27
tldr: >-
  Request Tracker remains free and open source for self-hosting. Cloud RT runs
  $15/user/month (Starter, 5-user minimum), $29 (Business, 10-user minimum) and
  $39 (Growth), all billed annually, with ticket-volume and storage caps per
  tier. Academic buyers get 20% off, non-profits 10%.
tags:
  - Request Tracker
  - Pricing
  - Help Desk
tiers:
  - name: Self-hosted (open source)
    price: "$0"
    billing: "free forever; you provide infrastructure and administration"
    includes: "The complete RT application under an open-source licence — unlimited users, unlimited tickets, no feature restrictions"
    amount: 0
    unit: "per user/month"
  - name: Cloud RT Starter
    price: "$15/user/mo"
    billing: "billed annually; minimum 5 users"
    includes: "250 tickets/month, 10 GB storage, complete RT feature set. Aimed at small teams consolidating from shared inboxes."
    amount: 15
    unit: "per user/month"
  - name: Cloud RT Business
    price: "$29/user/mo"
    billing: "billed annually; minimum 10 users"
    includes: "1,000 tickets/month, 30 GB storage, 2 business day support SLA"
    amount: 29
    unit: "per user/month"
  - name: Cloud RT Growth
    price: "$39/user/mo"
    billing: "billed annually; flexible user count, pricing customised"
    includes: "5,000 tickets/month, 75 GB storage, 1 business day support SLA. Positioned for multi-team organisations."
    amount: 39
    unit: "per user/month"
  - name: Cloud RT Enterprise
    price: "Custom quote"
    billing: "sales-negotiated"
    includes: "Unlimited tickets, 1 TB+ storage, 4 business hour support SLA"
  - name: Free trial
    price: "$0"
    billing: "14 days, no credit card required"
    includes: "Full Cloud RT access before committing to an annual term"
    amount: 0
    unit: "per user/month"
hiddenCosts:
  - "Seat minimums, not the per-user rate, set the entry price. Starter's five-user floor makes the cheapest real Cloud RT bill $900/year, and Business's ten-user floor means that tier starts at $3,480/year — a 3.9x jump from Starter's floor, not the 1.9x the per-seat rates suggest."
  - "Tickets are metered per month and the caps are tight. Starter allows 250 tickets — roughly a dozen a working day. A team consolidating a busy shared inbox can breach that in week one and be pushed to a tier costing nearly four times as much."
  - "Everything is billed annually. There is no monthly Cloud RT option published, so the commitment is a full year at every tier."
  - "'Free' self-hosted RT is free in licence only. RT is a Perl application with real administrative demands — installation, upgrades, mail gateway configuration, database tuning and security patching. Budget sysadmin hours, not dollars, and be honest about whether you have them."
  - "The support SLA is a paid feature ladder: nothing guaranteed on Starter, two business days on Business, one on Growth, four business hours only at Enterprise. If response time matters, the relevant price is much higher than $15."
faq:
  - q: "Is Request Tracker actually free?"
    a: "The self-hosted open-source version genuinely is, with no user cap, no ticket cap and no feature restrictions — it has been that way for over two decades and remains one of the most capable free ticketing systems available. What it costs is competence: RT is a Perl application that expects an administrator who can run it."
  - q: "What is the cheapest realistic Cloud RT bill?"
    a: "$900 a year. Starter is $15/user/month with a five-user minimum billed annually, so even a two-person team pays for five seats. That is still inexpensive for hosted ticketing, but it is not $15."
  - q: "Why is the jump from Starter to Business so expensive?"
    a: "Because the minimum doubles at the same time the rate does. Starter is $15 with a five-user floor ($900/year); Business is $29 with a ten-user floor ($3,480/year). The per-seat increase is 93%, but the smallest possible invoice increases by 287%. Model the floor, not the rate."
  - q: "What happens if I exceed the monthly ticket allowance?"
    a: "The caps — 250, 1,000 and 5,000 tickets per month — are the primary upgrade trigger, and they are easy to underestimate. A support desk handling 15 tickets a day exceeds Starter within a month. Count your current inbox volume before choosing a tier, because this is the number that will move you, not headcount."
  - q: "Are there discounts?"
    a: "Yes, and they are worth claiming. Academic institutions receive 20% off and non-profits 10% — meaningful given RT's long history in university and research environments, where much of its installed base lives."
  - q: "Self-host or Cloud?"
    a: "If you have a competent sysadmin and existing infrastructure, self-hosting is free and unlimited, and RT is stable enough to justify it. If you do not, Cloud RT's real cost is the annual commitment plus ticket caps — and at that point compare it against Freshdesk and Zendesk on features rather than assuming open-source heritage makes it cheaper."
---

## Two products wearing one name

Request Tracker has been a fixture of university IT departments, research labs and infrastructure teams since the late 1990s, and its pricing reflects a split personality. There is RT the open-source project, which is free, unlimited and yours to run. And there is Cloud RT, a hosted commercial service with tiers, seat minimums and metered tickets.

Confusing the two is the most expensive mistake buyers make here, because the free version's generosity has nothing to do with what the hosted version costs.

## The self-hosted case

Downloaded and run on your own servers, RT costs nothing. Not a limited community edition, not a seat-capped free tier — the complete application, unlimited users, unlimited tickets, no features held back. For an organisation with infrastructure and an administrator, this remains one of the best value propositions in support tooling, and its longevity is not an accident.

The cost is real but denominated in skill rather than money. RT is Perl, its configuration is text-file territory, and running it properly means owning the mail gateway, the database, the upgrade path and the security patches. Teams that have that capability already know it. Teams that do not should price the hosted option rather than discovering the gap during an incident.

## What Cloud RT actually costs

The per-user rates look approachable. The minimums are what set the price.

| Plan | Rate | Minimum seats | Smallest annual bill | Tickets/month |
|---|---|---|---|---|
| Starter | $15/user/mo | 5 | $900 | 250 |
| Business | $29/user/mo | 10 | $3,480 | 1,000 |
| Growth | $39/user/mo | flexible | negotiated | 5,000 |
| Enterprise | custom | — | — | unlimited |

Read the fourth column, not the second. Moving from Starter to Business is advertised as a 93% per-seat increase; in practice the smallest invoice grows 287%, from $900 to $3,480, because the seat floor doubles at the same moment the rate does. A six-person team that outgrows Starter does not get a 93% rise — it gets a bill nearly four times larger, and pays for four seats it does not staff.

## Tickets are the real meter

Headcount is not what moves teams between tiers. Ticket volume is.

Starter's 250 tickets per month works out to roughly a dozen per working day. RT's own positioning for Starter — "small teams consolidating from shared inboxes" — describes exactly the scenario most likely to blow through it, because a shared inbox that felt manageable often turns out to contain 400 monthly threads once it is properly ticketed.

Count your actual volume before choosing. This single number determines your tier more reliably than user count, and getting it wrong means an upgrade that quadruples the bill rather than adding to it.

Storage follows the same ladder — 10 GB, 30 GB, 75 GB — which matters for desks that receive attachments as a matter of course.

## Support is the other ladder

Cloud RT sells response time as a tier feature, and the progression is steep: no published SLA on Starter, two business days on Business, one business day on Growth, and four business hours only at Enterprise.

For a system running internal IT support, a two-business-day guarantee on your own vendor is a governance question worth asking out loud. If your desk carries commitments to its users, the tier that lets you meet them may be considerably above the one your headcount and ticket volume suggest.

## Discounts that are genuinely worth claiming

Academic institutions get 20% off and non-profits 10%. Given where RT's installed base actually lives — universities, research institutes, public-sector infrastructure teams — this applies to a large share of realistic buyers and is not a token gesture. Ask for it before signing.

## Who should and should not buy this

Self-hosted RT suits organisations with sysadmin capability and a preference for owning their stack: IT departments, research computing groups, infrastructure teams handling high ticket volume where per-seat SaaS pricing becomes punitive. At sufficient scale, free-and-self-run beats every commercial option on cost by a wide margin.

Cloud RT suits smaller teams that want RT's model without the operations burden, and who fit comfortably inside a ticket cap. It fits badly for teams near a tier boundary, where the minimum-seat cliff makes growth disproportionately expensive, and for anyone who needs fast vendor response without Enterprise budget.

If you are evaluating Cloud RT purely as hosted ticketing rather than for RT specifically, compare it against Freshdesk and Zendesk on merit — the open-source lineage is a reason to run RT yourself, not a reason to assume the hosted product is the cheapest option.

Check requesttracker.com for current tiers and confirm ticket allowances against your real volume.
