---
title: "HelpDesk Pricing Explained (2026)"
description: >-
  HelpDesk.com is $19 or $79 per user on annual billing, and the gap between them is
  AI resolutions — 10 a month against 200. Extra packs cost $49.50 for 50, which is
  where the real bill forms.
vendor: helpdesk
date: 2026-07-24
tldr: >-
  HelpDesk charges $19/user/month on Essential and $79 on Growth when billed
  annually ($25 and $99 monthly), with a 14-day trial and no card required. AI
  resolutions are the metering mechanism: 10 a month on Essential, 200 on Growth,
  and $49.50 for each additional 50 — roughly $0.99 per resolution, matching the
  category rate.
tags:
  - HelpDesk
  - Pricing
  - Help Desk
tiers:
  - name: Essential
    price: "$19/user/mo"
    billing: "per user, billed annually ($25 monthly), 14-day free trial"
    includes: "1 AI Agent, 10 monthly AI resolutions, 3 ticketing rules, email/chat/Messenger/SMS channels, 50 live visitors tracked, 3 proactive campaigns, basic reporting"
    amount: 19
    unit: "per user/month"
  - name: Growth
    price: "$79/user/mo"
    billing: "per user, billed annually ($99 monthly), 14-day free trial"
    includes: "10 AI Agents, 200 monthly AI resolutions, 20 custom fields, 10 ticketing rules, up to 10 teams, chat and ticket summaries, tag suggestions, 400 live visitors, 30 proactive campaigns, advanced reporting"
    amount: 79
    unit: "per user/month"
  - name: Enterprise
    price: "Custom quote"
    billing: "sales-quoted"
    includes: "Custom AI Agents, tailored workflows, multiple brands, custom roles, dedicated account manager, SOC 2 Type 2, HIPAA, white-label widget, SSO and audit logs"
  - name: Extra AI resolutions
    price: "$49.50 per 50"
    billing: "add-on pack, available on Essential and Growth"
    includes: "50 additional AI resolutions per month (~$0.99 each)"
    amount: 49.5
    unit: "per 50 resolutions"
hiddenCosts:
  - "Essential's 10 AI resolutions a month is a demo allowance, not an operating one. Any real deflection workload needs resolution packs at $49.50 per 50, and four packs a month ($198) already exceeds ten Essential seats' licence cost."
  - "The jump from Essential to Growth is 316% per seat. It buys 20x the AI resolutions, 10 AI Agents instead of 1, and advanced reporting — but on a five-person team that is $3,600 a year of difference for capabilities most small teams only partly use."
  - "SSO, audit logs, HIPAA and SOC 2 Type 2 all sit in Enterprise with no published price. Regulated buyers cannot plan from the rate card at all."
  - "Live visitor tracking is capped at 50 on Essential and 400 on Growth. For an ecommerce site with real traffic, 50 concurrent visitors is exhausted during any normal business hour, which quietly makes the proactive-chat features unusable on the entry tier."
  - "Monthly billing costs 32% more on Essential ($25 vs $19) and 25% more on Growth ($99 vs $79) — a steeper penalty than the category average."
faq:
  - q: "Is Essential at $19 a real plan?"
    a: "For traditional ticketing, yes — email, chat, Messenger and SMS channels with three automation rules is a working small-team help desk, and $19 a seat is genuinely cheap. For anything AI-led, no. Ten resolutions a month is roughly one every two working days, which is an evaluation allowance. Treat Essential as a classic help desk and Growth as the AI product."
  - q: "How much do extra AI resolutions actually cost?"
    a: "$49.50 buys 50, so $0.99 each — the same rate eDesk charges per outcome and close to the emerging category standard. The useful comparison is against Growth: 200 resolutions are bundled at $79 a seat, so on a team of three, Growth includes $198 of resolutions inside a $237 licence. Above roughly 200 resolutions a month, Growth is cheaper than stacking packs onto Essential."
  - q: "When is the jump to Growth worth $60 more per seat?"
    a: "Three triggers, in order of frequency: AI resolution volume above 200 a month, needing more than three ticketing rules, and needing more than 50 tracked live visitors. Advanced reporting and multiple teams matter to larger operations but rarely force the move on their own."
  - q: "What forces Enterprise?"
    a: "Compliance and identity, almost always. SSO, audit logs, SOC 2 Type 2 and HIPAA are all Enterprise-only, as is white-labelling the widget and running multiple brands. If any of those are hard requirements, the published prices are not your prices."
---

## Two tiers, one metering mechanism

HelpDesk.com prices at $19 per user on Essential and $79 on Growth, annually. That is a 316% gap, which is unusually wide for a two-tier self-serve product.

The gap is almost entirely AI. Essential gets one AI Agent and ten resolutions a month. Growth gets ten agents and two hundred. Everything else — extra ticketing rules, more custom fields, chat summaries, better reporting — is real but secondary.

Read the rate card that way and it resolves cleanly: Essential is a cheap, competent ticketing tool; Growth is an AI deflection platform. They happen to share a product.

## Ten resolutions is not a plan

Ten AI resolutions a month is one every other working day. No support operation runs on that.

So the honest Essential question is whether you want AI at all. If you do not — if you want a $19 shared inbox with SMS, Messenger and live chat, three automation rules and basic reporting — Essential is well priced and the AI allowance is irrelevant.

If you do, the arithmetic is:

| Monthly AI resolutions | Essential + packs (3 seats) | Growth (3 seats) |
|---|---|---|
| 50 | $57 + $49.50 = $106.50 | $237 |
| 200 | $57 + $198 = $255 | $237 |
| 500 | $57 + $495 = $552 | $237 |
| 1,000 | $57 + $990 = $1,047 | $237 + packs |

The crossover sits near 200 resolutions a month on a small team. Below it, Essential plus packs is cheaper. Above it, Growth's bundled 200 make it the better buy — and well above it, you are buying packs on Growth anyway.

Note the bundled resolutions are per plan, not per seat, so larger teams reach the crossover on fewer resolutions each.

## The live visitor cap is the quiet limit

Essential tracks 50 live visitors; Growth tracks 400.

For a B2B SaaS site with modest traffic, fifty concurrent visitors is fine. For any consumer ecommerce store during business hours, it is not — and the proactive campaign features that Essential advertises (three of them) depend on visitor tracking to fire.

This is the most commonly overlooked constraint on the entry tier, because it does not appear in the AI conversation that dominates the rest of the comparison.

## Monthly billing is expensive here

Essential is $25 monthly against $19 annual — a 32% premium. Growth is $99 against $79 — 25%.

Both are above the category norm of roughly 20%. On a five-seat Growth deployment, monthly billing costs $1,200 a year more than annual. If you are confident enough to buy at all, commit annually; if you are not confident, use the 14-day trial harder rather than paying the monthly premium for optionality.

## Enterprise is where compliance lives

SSO, audit logs, SOC 2 Type 2, HIPAA, custom roles, multi-brand and white-labelling are all Enterprise-only, with no published price.

That is a common structure and a defensible one, but it has a practical consequence: any buyer with a security questionnaire cannot use HelpDesk's published rates for planning. If procurement requires SSO — and most companies above about fifty employees do — start the sales conversation on day one rather than trialling Growth and discovering the gap later.

## Where it sits in the market

At $19, Essential undercuts most of the mainstream field for basic ticketing. At $79, Growth is priced against Zendesk Suite Professional and Freshdesk Pro, both of which meter AI separately — so Growth's bundled 200 resolutions are a genuine differentiator rather than marketing.

The weakness is the missing middle. There is no tier between $19 and $79, so a team needing 100 AI resolutions and five ticketing rules has to choose between two plans that both fit badly.

## Who should buy it

Small teams wanting cheap, capable multichannel ticketing at $19 a seat with no AI ambitions, and mid-sized teams doing 200-plus AI resolutions a month who benefit from Growth's bundling. Both are well served.

It suits badly anyone landing between those profiles, ecommerce sites that will exhaust the 50-visitor tracking cap on Essential, and regulated buyers who need SSO or HIPAA and will find neither published price applies. Check helpdesk.com for current rates and measure your AI resolution volume during the trial before picking a tier.
