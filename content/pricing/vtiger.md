---
title: "Vtiger CRM Pricing Explained (2026)"
description: >-
  Vtiger's free One Pilot plan covers 10 users, and paid One Growth is $12 per
  user per month annually — but a 15-user cap makes Professional the real floor.
vendor: vtiger
date: 2026-07-22
tldr: >-
  Vtiger costs $0 to $50 per user per month. One Pilot is genuinely free for up
  to 10 users and 3,000 records; One Growth is $12 annually but caps at 15 users
  and 100,000 records. Growth is what pushes you to the $30 Professional tier.
tags:
  - Vtiger CRM
  - Pricing
  - CRM
tiers:
  - name: One Pilot
    price: "$0"
    billing: "Free forever"
    includes: "Up to 10 users, 3,000 records, core CRM across sales, help desk and marketing modules"
    amount: 0
    currency: USD
    unit: "per user/month"
  - name: One Growth
    price: "$12/user/mo"
    billing: "Standard User, billed annually"
    includes: "Up to 15 users and 100,000 records, workflow automation, pipeline management, multi-module access"
    amount: 12
    currency: USD
    unit: "per user/month"
  - name: One Professional
    price: "$30/user/mo"
    billing: "Standard User, billed annually"
    includes: "Unlimited users and records, deeper automation, expanded reporting, help desk and project modules"
    amount: 30
    currency: USD
    unit: "per user/month"
  - name: One Enterprise
    price: "$42/user/mo"
    billing: "Standard User, billed annually"
    includes: "Everything in Professional plus enterprise governance, advanced customization and higher platform limits"
    amount: 42
    currency: USD
    unit: "per user/month"
  - name: One AI
    price: "$50/user/mo"
    billing: "Standard User, billed annually"
    includes: "Top tier with Vtiger's AI capabilities layered over the full Enterprise feature set"
    amount: 50
    currency: USD
    unit: "per user/month"
  - name: Open Source edition
    price: "$0 licence"
    billing: "self-hosted, you supply infrastructure"
    includes: "Full source, no per-seat licence fee — you carry hosting, upgrades, security patching and support yourself"
    amount: 0
    currency: USD
    unit: "licence"
hiddenCosts:
  - "One Growth caps at 15 users and 100,000 records. Hit either ceiling and the only way up is One Professional at $30 — a 150% jump per seat with no intermediate step."
  - "Vtiger sells two seat types. A Single App User on One Growth is $20/user/month, more than the $12 Standard User, because the cheap Growth rate assumes multi-module access. Read which column your quote is priced from."
  - "Monthly billing exists but costs more; Vtiger advertises savings of up to 34% for paying yearly. The $12 figure is the annual rate, not what you pay month to month."
  - "The free open-source edition has no licence cost and no vendor support. You are buying server time, an upgrade path you maintain yourself, and someone on staff who can read PHP."
  - "Booster Packs let you bolt individual features onto a lower edition rather than upgrading it. Useful, but two or three boosters can quietly cost more than the tier above."
faq:
  - q: "Is Vtiger's free plan actually usable?"
    a: "For a small team, yes. One Pilot gives 10 users and 3,000 records with access to the core modules — enough for a startup running a real pipeline rather than a crippled demo. The 3,000-record ceiling is what you hit first, usually within a year of doing consistent outbound."
  - q: "What happens when I exceed One Growth's 15-user limit?"
    a: "You move to One Professional at $30 per user per month, and the increase applies to every existing seat, not just the new ones. A team going from 15 to 16 people sees its bill jump from $180 to $480 a month at list price."
  - q: "What is the difference between Standard User and Single App User?"
    a: "Standard User pricing covers the full Vtiger One platform. Single App User is a per-module licence for someone who only needs, say, help desk. On Growth it is $20 versus $12; on Enterprise and One AI it is $38, which is cheaper than the Standard rate. Check which one your quote uses."
  - q: "Is the free open-source edition the same product?"
    a: "No. The self-hosted open-source edition shares lineage with the cloud product but lags on features, particularly AI and newer automation. It removes licence cost and replaces it with operational cost — hosting, patching, upgrades and your own support."
  - q: "How long is the free trial?"
    a: "Fifteen days, no credit card required. That is short for a CRM you intend to customize, so plan your evaluation before you start the clock rather than after."
  - q: "Is One AI worth $8 more than Enterprise?"
    a: "Only if you have a specific AI workflow in mind — call summarization, lead scoring, drafted follow-ups — and volume to justify it. At fifty seats the difference is $4,800 a year, which buys a lot of nothing if the features go unused."
---

## Record counts, not seats, decide your tier

Most CRMs make you upgrade when you hire. Vtiger makes you upgrade when your
database fills up. One Pilot stops at 3,000 records. One Growth stops at
100,000. Professional and above are unlimited. For a team doing steady
outbound, that record ceiling arrives well before the user ceiling does — a
two-person sales team importing a prospect list can burn through Pilot's 3,000
in a single afternoon.

So the honest way to price Vtiger is to forecast your record volume for the
next eighteen months and pick the tier that survives it. Counting seats first
gives you the wrong answer.

## The Growth-to-Professional cliff

One Growth is the plan people fall in love with: $12 per user per month for
sales, help desk, marketing and projects in one subscription is genuinely
cheap. It is also capped at fifteen users and 100,000 records, and there is
nothing between it and $30 Professional.

What that looks like in practice:

| Team size | One Growth ($12) | One Professional ($30) |
| --- | --- | --- |
| 5 users | $720/yr | $1,800/yr |
| 15 users (Growth max) | $2,160/yr | $5,400/yr |
| 16 users | not available | $5,760/yr |
| 40 users | not available | $14,400/yr |

Adding a sixteenth person costs you $3,600 a year, because the higher rate
reprices everyone. If you are at thirteen or fourteen seats and hiring, model
Professional now — the surprise is worse than the expense.

## Two seat types, and which one you get quoted

Vtiger prices a Standard User (full platform) separately from a Single App User
(one module). The relationship between the two is not consistent across tiers.
On One Growth, Single App is $20 against Standard's $12 — the multi-app plan
is the cheaper one, because Growth's whole pitch is bundling. On Enterprise and
One AI the order flips: Single App is $38 against $42 and $50.

The practical takeaway is that a support-only team belongs on Single App at the
top end and on Standard at the bottom end, and nobody will tell you that unless
you ask. Check the column your quote was built from.

## Annual versus monthly

The published per-user rates are annual. Vtiger advertises savings of up to 34%
for yearly billing, so monthly costs meaningfully more. There is no seat
minimum, which matters more than it sounds — a solo founder can pay for exactly
one Professional seat, something SugarCRM's fifteen-user floor makes
impossible.

## The open-source question

The self-hosted edition costs nothing to licence and this is the single most
misread line in Vtiger's pricing. It is not a free version of the cloud
product. It trails on features, especially the newer AI and automation work,
and it hands you hosting, upgrades, security patching and support. If you have
a sysadmin with spare capacity and a strong reason to keep data on your own
hardware, it is a legitimate saving. If you are choosing it purely to avoid
$12 a seat, you will spend more in engineer hours than you save in licence
fees inside six months.

## Who this pricing rewards

Small teams under fifteen people with modest data volume get an unusually good
deal — the all-in-one bundle at $12 undercuts buying a separate CRM and help
desk, which is exactly the trade Vtiger is selling against Zoho CRM and
Freshsales. Mid-size teams past the Growth cap pay Professional rates that are
competitive but no longer remarkable.

It punishes teams sitting right on the boundary. Fourteen users and 95,000
records is the worst place to be in Vtiger's pricing, because every bit of
growth triggers a step change rather than a slope.

## Verify before you budget

These are Vtiger's published list rates as of July 2026, taken from the
company's own pricing page. Editions and caps get revised, Booster Pack
contents shift, and regional pricing varies — confirm on vtiger.com before you
commit a number to a spreadsheet.
