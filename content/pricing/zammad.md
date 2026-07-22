---
title: "Zammad Pricing Explained (2026)"
description: >-
  Zammad cloud starts at €7 per agent/month on annual billing, but agent caps on
  the lower tiers — not features — are what force most teams onto the €25 plan.
vendor: zammad
date: 2026-07-22
tldr: >-
  Zammad cloud runs €7/agent/month (Starter, annual) up to €25 (Plus). The
  self-hosted community edition is free under AGPLv3. What actually moves your
  bill is the hard agent cap: Starter stops at 5 agents and Professional at 35,
  so headcount, not feature envy, triggers every upgrade.
tags:
  - Zammad
  - Pricing
  - Help Desk
  - Open Source
tiers:
  - name: Self-hosted (community)
    price: "€0"
    billing: "Free, AGPLv3 — you run the server"
    includes: "Full ticketing, all channels, LDAP/SAML, REST API, no agent limit"
    amount: 0
    currency: EUR
    unit: "per year"
  - name: Starter v2 (cloud)
    price: "€7/agent/mo"
    billing: "billed annually (€9 monthly)"
    includes: "Email, web form and SMS channels — maximum 5 agents"
    amount: 7
    currency: EUR
    unit: "per agent/month"
  - name: Professional v2 (cloud)
    price: "€16/agent/mo"
    billing: "billed annually (€18 monthly)"
    includes: "Adds chat, Telegram, SLAs and knowledge base — maximum 35 agents"
    amount: 16
    currency: EUR
    unit: "per agent/month"
  - name: Plus v2 (cloud)
    price: "€25/agent/mo"
    billing: "billed annually (€27 monthly)"
    includes: "Adds phone, Facebook, WhatsApp, workflows, multilingual KB — unlimited agents"
    amount: 25
    currency: EUR
    unit: "per agent/month"
  - name: Self-hosted Business
    price: "€2,999/year"
    billing: "flat annual support subscription"
    includes: "Commercial support on your own install, email, 6-hour max response"
    amount: 2999
    currency: EUR
    unit: "per year"
  - name: Self-hosted Enterprise
    price: "€5,999/year"
    billing: "flat annual support subscription"
    includes: "Email and phone support, 4-hour max response; Corporation tier is €9,999"
    amount: 5999
    currency: EUR
    unit: "per year"
hiddenCosts:
  - "Starter caps at 5 agents and Professional at 35. Hire one more person and you move a whole tier, which is a price jump you did not plan for and cannot negotiate around."
  - "AI features on cloud are metered at €0.03 per AI call rather than bundled. Heavy summarisation or draft-reply use turns a fixed per-seat bill into a variable one."
  - "All published Zammad prices exclude VAT. EU customers should add their local rate before comparing against a US vendor's tax-inclusive-looking sticker."
  - "The free self-hosted edition costs nothing in licence and real money in infrastructure — a server, backups, Elasticsearch, TLS renewal and someone's time for upgrades every quarter."
  - "Self-hosted support subscriptions are flat annual fees, not per-agent, so a 6-agent shop pays the same €2,999 as a 200-agent one. Below roughly ten agents that maths works against you."
faq:
  - q: "Is Zammad really free?"
    a: "The self-hosted community edition is, under AGPLv3, with no agent limit and no feature crippling. You pay in server costs and admin time instead. The cloud product and the commercial support subscriptions are the paid paths."
  - q: "What is the cheapest paid Zammad plan?"
    a: "Starter v2 at €7 per agent per month on annual billing, €9 if you pay monthly. It caps at five agents and only covers email, web form and SMS — no live chat, no SLAs, no knowledge base."
  - q: "How much do you save by paying annually?"
    a: "Roughly €2 per agent per month on every cloud tier: €7 vs €9 on Starter, €16 vs €18 on Professional, €25 vs €27 on Plus. That is about 8-22% depending on tier — meaningful on Starter, marginal on Plus."
  - q: "At what team size does self-hosting beat the cloud?"
    a: "Plus costs €300 per agent per year. The Business support subscription is €2,999 flat, so the licence maths crosses over around ten agents. Add infrastructure and admin time and the honest break-even sits higher, nearer 20-30 agents."
  - q: "Is there a free trial of Zammad cloud?"
    a: "Yes — a 30-day trial on the Professional plan, no card required at signup. That is the tier most teams end up on, so it is a fair test rather than a stripped-down demo."
  - q: "Does Zammad charge for light users or collaborators?"
    a: "There is no separate cheap collaborator seat. Anyone who needs to work tickets is a full agent at full price, which makes Zammad simpler to forecast than Deskpro or Freshservice but worse value if you have a long tail of occasional responders."
---

## Headcount is the pricing model

Most help desks let you buy any tier at any team size and use features as the
upgrade lever. Zammad does not. Starter v2 refuses to hold more than five
agents. Professional v2 stops at 35. Plus v2 is the only tier with no ceiling.

That single design choice makes Zammad's bill unusually easy to predict and
unusually easy to get wrong. You are not really choosing between feature sets —
you are choosing a bracket that your hiring plan will eventually push you out
of. A four-person support team on Starter that adds two people in Q3 does not
pay €7 for the two extra seats. It pays €16 for all six, because it has been
moved onto Professional. The bill more than doubles for a headcount change of
33%.

Worth knowing before you sign an annual contract: budget against where the team
will be in twelve months, not where it is today.

## Cloud at 5, 20 and 50 agents

| Agents | Forced tier | Monthly | Annual |
| --- | --- | --- | --- |
| 5 | Starter v2 (at its cap) | €35 | €420 |
| 20 | Professional v2 | €320 | €3,840 |
| 50 | Plus v2 (Professional caps at 35) | €1,250 | €15,000 |

The 50-agent row is where the conversation changes. Fifteen thousand euros a
year for cloud hosting, against €9,999 for the Corporation self-hosted support
subscription, which covers unlimited agents and a two-hour response target. At
that size the open-source option stops being an ideology argument and starts
being a budget one.

## Where the Professional upgrade earns its money

The Starter to Professional jump is the one to say yes to. It buys live chat,
Telegram, SLA policies and the knowledge base — the four things that separate a
shared mailbox from an actual help desk. Nine euros more per agent for SLA
enforcement alone is cheap by the standards of this category.

Professional to Plus is a harder sell. You are paying €9 more per agent for
phone, Facebook and WhatsApp channels, workflow automation and a multilingual
knowledge base. If you do not take phone support and you operate in one
language, the only thing you are really buying is the removal of the 35-agent
cap. Teams in that position should price out a self-hosted install before
signing, because that is exactly the range where the flat support subscriptions
start winning.

## The free edition is free the way a puppy is free

The community edition carries no licence cost and no artificial limits — full
channel support, LDAP and SAML, the complete REST API. What it carries instead
is operational work: a server to size, Elasticsearch to keep healthy, backups to
test, and a maintenance window every time a release lands. Teams already running
Linux infrastructure absorb that easily. Teams whose IT function is one
overloaded generalist should price the cloud tiers and stop pretending
otherwise.

If you want the source-available deployment with somebody to call, the paid
support subscriptions at €2,999, €5,999 and €9,999 per year are flat, so their
value rises with every agent you add.

## Annual versus monthly, and VAT

Annual billing saves €2 per agent per month on every cloud tier. On Starter that
is a 22% discount and worth taking. On Plus it is under 8%, which is thin enough
that keeping monthly flexibility during a growth period is defensible.

Every price Zammad publishes excludes VAT. If you are comparing against a US
help desk's headline number, add your local rate before deciding anything.

## Who this suits

Zammad prices well for European technical teams of five to thirty agents who
want SLAs and multi-channel ticketing without Zendesk money, and for larger
organisations with the infrastructure competence to self-host. It prices badly
for teams that sit just above an agent cap, for anyone with a lot of occasional
responders who would benefit from a cheap collaborator seat, and for support
orgs that lean heavily on AI drafting — where €0.03 per call quietly stops being
a rounding error.

List prices move. Zammad's own pricing page is the authority, and the VAT and
currency treatment there will matter more to your actual invoice than anything
on this page.
