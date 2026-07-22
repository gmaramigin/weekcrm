---
title: "Trengo Pricing Explained (2026)"
description: >-
  Trengo sells bundles, not seats: €299/mo buys 10 users and 6,000 conversations
  a year. Overage on conversations is where the bill quietly grows.
vendor: trengo
date: 2026-07-22
tldr: >-
  Trengo's entry plan is Boost at €299/month billed annually (€349 monthly),
  which includes 10 users and 6,000 conversations per year. Extra conversations
  cost €15 per 100 on annual billing, and AI-handled conversations bill
  separately at €0.25 each.
tags:
  - Trengo
  - Pricing
  - Omnichannel
  - WhatsApp
tiers:
  - name: Boost
    price: "€299/mo"
    billing: "billed annually, 10 users included"
    includes: "6,000 conversations/year (~500/month), omnichannel inbox, WhatsApp Business API, automation"
    amount: 299
    currency: EUR
    unit: "per account/month"
  - name: Boost (monthly)
    price: "€349/mo"
    billing: "billed monthly, 10 users included"
    includes: "Same as annual Boost, no commitment"
    amount: 349
    currency: EUR
    unit: "per account/month"
  - name: Pro
    price: "€499/mo"
    billing: "billed annually, 20 users included (€599 monthly)"
    includes: "18,000 conversations/year (~1,500/month), advanced integrations, deeper reporting"
    amount: 499
    currency: EUR
    unit: "per account/month"
  - name: Enterprise
    price: "Custom quote"
    billing: "contact sales"
    includes: "Custom user count, custom conversation volume, enterprise onboarding and SLAs"
hiddenCosts:
  - "Conversation allowances are annual, not monthly. 6,000 a year averages 500 a month, but a seasonal spike burns through the pool early and you pay overage for the rest of the contract year."
  - "Overage is €15 per 100 conversations on annual billing and €18 per 100 monthly. That is €0.15-€0.18 per conversation with no published volume tiering."
  - "AI-enhanced conversations bill on top of the normal conversation count: €0.25 each on annual, €0.30 on monthly. Turning AI on across the inbox changes the unit economics of every ticket."
  - "The 11th user on Boost costs €25/month annually (€30 monthly). Pro's extra users are €40 annually (€50 monthly) — the per-user add-on price goes up as you move up a tier, not down."
  - "Meta charges its own WhatsApp Business API fees for marketing and utility template messages. Trengo includes service conversations, but Meta's template billing sits outside your Trengo invoice entirely."
faq:
  - q: "Is Trengo priced per user?"
    a: "No, and this is the main thing to understand. You buy a bundle: Boost is €299/month for 10 users, Pro is €499/month for 20. Extra users are add-ons on top. A three-person team pays the same €299 as a ten-person team."
  - q: "How much does Trengo cost per month on the cheapest plan?"
    a: "€299/month on annual billing, or €349/month if you pay monthly — a €600/year premium for the flexibility. Both include 10 users and the same 6,000-conversation annual allowance."
  - q: "What counts as a conversation?"
    a: "A customer thread handled in the inbox, across any channel — WhatsApp, email, chat, SMS, social. Trengo's allowances are expressed annually (6,000 on Boost, 18,000 on Pro), which means you can front-load usage but cannot carry unused volume beyond the year."
  - q: "When is Pro worth €200 more per month?"
    a: "When you exceed roughly 6,000 conversations a year or need more than about 14 users. At 12,000 conversations, Boost plus overage costs €299 plus €900/year in top-ups; Pro at €499 covers 18,000 outright and is the cheaper answer."
  - q: "Does Trengo charge extra for WhatsApp?"
    a: "Trengo includes WhatsApp service conversations in your plan allowance. Meta's own template-message fees for marketing and utility sends are billed by Meta and are not part of Trengo's list price."
  - q: "Is there a free plan?"
    a: "Trengo does not publish a free tier on its pricing page. Entry is via a paid plan or a sales conversation; check with Trengo directly for current trial terms."
---

## Bundles, not seats — and conversations are the meter

Most omnichannel inbox tools charge per agent. Trengo does not. You buy a
package with users bundled in, and the number that actually governs your bill
is **conversations**: 6,000 a year on Boost, 18,000 on Pro.

That inverts the usual sizing exercise. Adding a fourth agent to a Boost
account costs nothing. Adding 2,000 conversations a year costs €300 in
overage. If you are evaluating Trengo against a per-seat tool like Front or
Intercom, model your ticket volume first and your headcount second — headcount
is close to free until you hit the bundle limit.

The annual framing of the allowance matters more than it looks. 6,000 a year is
not "500 a month, use it or lose it" — it is a pool. Retailers with a Q4 spike
can lean on the pool early, but if January to March eats half your year's
conversations, everything from April onward is billed at €0.15 apiece.

## Where Boost stops making sense

The Boost-to-Pro decision has two independent triggers, and hitting either one
is enough.

**Volume.** Once you are reliably over 6,000 conversations a year, run the
arithmetic. At 12,000 conversations, Boost costs €3,588/year in subscription
plus 6,000 conversations of overage at €15/100 — €900 — for €4,488. Pro covers
18,000 conversations for €5,988 and leaves you headroom. The crossover sits
somewhere near 13,000-14,000 conversations; below that, Boost plus overage
wins.

**Users.** Boost's add-on users are €25/month annually. Five extra users on
Boost is €299 + €125 = €424/month for 15 users. Pro at €499 gives you 20 users
and triple the conversation pool for €75 more. If you are buying more than
about four add-on seats, you are already most of the way to Pro.

## Annual versus monthly

Annual billing is worth roughly 15-17% depending on plan: Boost drops from €349
to €299, Pro from €599 to €499. It also cuts the overage rate — €15 per 100
conversations instead of €18, and AI conversations at €0.25 instead of €0.30.

That second effect is the one people miss. On a high-volume account the annual
discount on overage can be worth more than the discount on the subscription
itself. A team burning 8,000 extra conversations a year saves €240 on overage
alone by being on annual terms.

## The AI line item

AI-enhanced conversations are metered separately at €0.25-€0.30 each. This is
not a flat platform fee you can amortise — it scales linearly with how much of
your inbox the AI touches. At 1,000 AI conversations a month on annual billing
that is €250/month, which is most of another Boost subscription.

Trengo also notes AI Journeys as being in beta. Beta features that are already
metered deserve a hard look before you build a workflow that depends on them.

## Who fits this model

Trengo suits European SMBs where WhatsApp is a primary support channel, with
five to twenty people who need shared visibility on the same threads and
moderate, predictable volume. If your team is larger than your ticket load —
say twelve people fielding 400 conversations a month — the bundled-user model
is unusually kind to you.

It punishes two profiles. Small teams with heavy volume: three agents handling
2,000 conversations a month pay €299 for ten seats they will never use, plus
substantial overage. And any team with unpredictable seasonality that cannot
forecast an annual conversation pool with confidence.

## A note on the numbers

Prices above are in euros, read from Trengo's public pricing page in July 2026.
Trengo does not publish a USD list price, so anything you see quoted in dollars
elsewhere is a conversion, not a rate card. Conversation and AI unit costs are
the most volatile part of this pricing; confirm current terms at
[trengo.com/pricing](https://trengo.com/pricing) before signing.
