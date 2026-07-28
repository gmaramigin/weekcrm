---
title: "Capacity Pricing Explained (2026)"
description: >-
  Capacity publishes tiers but no prices — the structure is a platform fee plus
  usage-based AI agent charges metered four different ways, per response, per
  minute and per message.
vendor: capacity
date: 2026-07-28
tldr: >-
  Capacity has three platform tiers — Core, Pro and Enterprise — with no
  published rates, distinguished largely by capability and storage (100GB, 1TB,
  2TB). Cost is a platform fee plus usage-based AI agent pricing: Chat and Email
  agents per response, Voice per minute, SMS per message. Volume discounts apply
  as usage rises.
tags:
  - Capacity
  - Pricing
  - AI Support Automation
tiers:
  - name: Core
    price: "Talk to sales"
    billing: "platform fee plus usage, quoted"
    includes: "Knowledge base, helpdesk, AI Agent Builder, data indexing, 250+ integrations, analytics and up to 100GB storage"
  - name: Pro
    price: "Talk to sales"
    billing: "platform fee plus usage, quoted"
    includes: "Everything in Core plus live chat, inbox, real-time Agent Assist, conversation intelligence, AQA, the developer platform and up to 1TB storage"
  - name: Enterprise
    price: "Talk to sales"
    billing: "platform fee plus usage, quoted"
    includes: "Everything in Pro plus campaigns, CRM, advanced workflows, an optional HIPAA package and up to 2TB storage"
  - name: Chat and Email AI Agents
    price: "Per response"
    billing: "usage-based, volume discounts available"
    includes: "Metered on responses generated rather than conversations received or agents employed"
  - name: Voice AI Agent
    price: "Per minute"
    billing: "usage-based, volume discounts available"
    includes: "Voice automation metered by minute — the meter most likely to dominate for phone-heavy operations"
  - name: SMS AI Agent
    price: "Per message"
    billing: "usage-based, volume discounts available"
    includes: "SMS automation metered per message, separate from chat and email response pricing"
hiddenCosts:
  - "Four different AI meters run simultaneously — per response for chat, per response for email, per minute for voice, per message for SMS. A multichannel deployment is being billed four ways at once, and the channels do not share an allowance."
  - "No published rates on any tier or any meter means there is no anchor for negotiation and no way to model cost before a sales conversation."
  - "Storage tiers of 100GB, 1TB and 2TB are among the few concrete differentiators between plans. On a product built around indexing your document corpus, storage is a functional limit rather than a technicality."
  - "The HIPAA package is optional and Enterprise-only, so any healthcare deployment is on the top tier by default regardless of size or feature needs."
  - "Volume discounts are stated but not quantified. 'The more you use, the less you pay per interaction' is a negotiating position, not a rate card."
faq:
  - q: "What does Capacity cost?"
    a: "There is no published figure. All three tiers — Core, Pro and Enterprise — say talk to sales. The stated structure is a platform fee plus usage-based pricing for AI agents, with volume discounts as consumption rises. Any number you find elsewhere is a third-party estimate, and several circulating figures appear to be other vendors' pricing mislabelled."
  - q: "How is the AI actually metered?"
    a: "Four different ways depending on channel. Chat AI Agent and Email AI Agent are billed per response, Voice AI Agent per minute, and SMS AI Agent per message. Those meters run independently — there is no shared pool — so a multichannel deployment accrues four separate usage lines."
  - q: "What separates Core, Pro and Enterprise?"
    a: "Core is the knowledge and automation base: knowledge base, helpdesk, AI Agent Builder, data indexing, 250+ integrations and 100GB storage. Pro adds live chat, inbox, real-time Agent Assist, conversation intelligence, AQA, the developer platform and 1TB. Enterprise adds campaigns, CRM, advanced workflows, optional HIPAA and 2TB."
  - q: "Why does storage matter here?"
    a: "Because Capacity's core function is indexing your documents and knowledge to answer questions from them. Storage is not incidental infrastructure — it is the size of the corpus the AI can reason over. A large document estate can push tier choice on storage grounds alone."
  - q: "What if I need HIPAA compliance?"
    a: "It is an optional package on Enterprise only. That means a small healthcare support team needing HIPAA is buying the top tier regardless of whether it needs campaigns, CRM or advanced workflows — a common pattern and one worth raising directly in negotiation."
  - q: "How should I approach the quote?"
    a: "Model your volumes per channel before the call: chat responses, email responses, voice minutes and SMS messages, monthly. Then ask for the platform fee and each of the four unit rates separately, plus the volume discount thresholds. A blended quote hides which meter is driving your cost, and with four running at once that is the thing you most need to see."
---

## A platform fee and four meters

Capacity states its pricing structure clearly even though it publishes no numbers: your investment includes a platform fee plus usage-based pricing for AI Agents, so you pay for what you use.

What makes it more complicated than that sentence suggests is that "usage" is measured four different ways. Chat AI Agent bills per response. Email AI Agent bills per response. Voice AI Agent bills per minute. SMS AI Agent bills per message. These are separate meters with separate rates, and they do not share an allowance.

For a single-channel deployment that is simple enough. For an organisation running automated support across chat, email, voice and SMS — which is the deployment Capacity is designed for — there are four independent usage lines accruing at once, plus the platform fee underneath.

## What the tiers actually contain

| | Core | Pro | Enterprise |
|---|---|---|---|
| Knowledge base, helpdesk, AI Agent Builder | ✓ | ✓ | ✓ |
| Data indexing, 250+ integrations, analytics | ✓ | ✓ | ✓ |
| Live chat, inbox, real-time Agent Assist | — | ✓ | ✓ |
| Conversation intelligence, AQA, developer platform | — | ✓ | ✓ |
| Campaigns, CRM, advanced workflows | — | — | ✓ |
| Optional HIPAA package | — | — | ✓ |
| Storage | 100GB | 1TB | 2TB |

The storage row deserves more attention than it usually gets. Capacity's function is indexing your knowledge — documents, policies, product data — so the AI can answer from it. Storage is therefore a measure of how much corpus the system can reason over, not a background infrastructure detail. Organisations with large document estates may find storage, rather than features, is what sets their tier.

Agent Assist is the second dividing line. Core automates customer-facing interactions; Pro adds real-time assistance to your human agents. Those are different value propositions, and knowing which one you are buying determines whether Core is sufficient.

## The HIPAA problem

The optional HIPAA package is available only on Enterprise. That is a common packaging pattern and it produces a specific outcome: a small healthcare support team that needs nothing from Enterprise except compliance still buys Enterprise.

If that is you, raise it explicitly and early. Vendors frequently have room to move on compliance packaging for customers who are otherwise a Pro-sized deployment, but only if you ask before the quote is written.

## Negotiating against no published price

Capacity's volume discount language — the more you use, the less you pay per interaction — is a statement of intent rather than a rate. Nothing is quantified publicly, on any tier or any meter.

That makes preparation the only leverage available. Before the sales call, model four numbers: monthly chat responses, monthly email responses, monthly voice minutes and monthly SMS messages. Then ask for the platform fee and each of the four unit rates as separate figures, along with the volume thresholds where discounts begin.

A blended monthly quote is easy to accept and impossible to evaluate. With four meters running, you need to know which one is driving your cost, because that is the one to negotiate and the one that will grow.

## Beware the figures floating around

Third-party pricing pages carry numbers attributed to Capacity that on inspection belong to other vendors — per-agent rates and session-bundle prices that match competitors' published pricing rather than anything Capacity has stated. Treat any specific figure you find online with suspicion unless it comes from Capacity directly.

## Who should and should not buy this

Capacity fits mid-sized and larger organisations with a substantial knowledge estate and genuine multichannel support volume — the profile where indexing documents and automating across chat, email, voice and SMS produces measurable deflection. The AI Agent Builder and 250+ integrations point at teams that want to configure rather than code.

It fits poorly for small teams with single-channel support, where the platform fee plus a usage meter is more structure than the problem requires. It fits poorly for buyers who need to compare prices before engaging with sales, since none exist publicly. And it fits poorly for anyone who needs a predictable flat monthly cost, because four simultaneous usage meters is the opposite of that.

Capacity publishes tier contents but no rates. Confirm the platform fee, all four unit rates and volume thresholds directly with Capacity before budgeting.
