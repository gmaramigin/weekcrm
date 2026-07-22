---
title: "Dynamics 365 Sales Pricing Explained (2026)"
description: >-
  Dynamics 365 Sales runs $65 to $150 per user per month. The licence is the small part — Copilot
  credits and the Power Platform around it decide the real number.
vendor: dynamics-365
date: 2026-07-22
tldr: >-
  Dynamics 365 Sales costs $65 per user per month for Professional, $105 for Enterprise and $150 for
  Premium, all billed annually. Premium is the only tier with Copilot credits included, at 1,000 per
  user per month, and extra credits are bought separately once teams start leaning on the AI.
tags:
  - Dynamics 365 Sales
  - Pricing
  - CRM
tiers:
  - name: Sales Professional
    price: "$65/user/mo"
    billing: "per user, billed annually"
    includes: "Core sales force automation with limited customisation and automation depth"
    amount: 65
    unit: "per user/month"
  - name: Sales Enterprise
    price: "$105/user/mo"
    billing: "per user, billed annually"
    includes: "Full customisation, conversation intelligence, sales engagement and Copilot in Dynamics 365"
    amount: 105
    unit: "per user/month"
  - name: Sales Premium
    price: "$150/user/mo"
    billing: "per user, billed annually"
    includes: "Everything in Enterprise plus 1,000 Copilot Credits per user per month and AI-powered data enrichment"
    amount: 150
    unit: "per user/month"
  - name: Microsoft Relationship Sales
    price: "Custom quote"
    billing: "Contact sales, 10-seat minimum"
    includes: "Sales Enterprise bundled with LinkedIn Sales Navigator"
  - name: Additional Copilot Credits
    price: "Custom quote"
    billing: "Pay-as-you-go or prepaid commit, up to 20% saving on prepaid"
    includes: "Capacity beyond the 1,000 credits per user included with Premium"
hiddenCosts:
  - "Microsoft Relationship Sales carries a ten-seat minimum. Even if only four reps need LinkedIn Sales Navigator inside Dynamics, the bundle is sold from ten licences up."
  - "Copilot Credits are included only on Premium. Enterprise gets Copilot in Dynamics 365 but heavy AI usage draws on credit capacity that is purchased separately, so AI cost is a variable line item rather than part of the seat price."
  - "Sales Professional's ceiling is licensing, not software. Its customisation and automation entitlements are deliberately capped, and outgrowing them means moving every seat to Enterprise at $105, not adding a module."
  - "Dynamics rarely arrives alone. Power BI, Power Automate premium connectors, Customer Insights and Dataverse capacity beyond the included entitlement are separate purchases, and most real deployments need at least one of them."
  - "Implementation is a partner engagement for anything beyond a small team. Microsoft publishes no onboarding fee because that work is normally quoted by an implementation partner and can exceed the first year of licences."
faq:
  - q: "Does Dynamics 365 Sales have a free plan?"
    a: "No. Microsoft offers a trial of Dynamics 365 Sales, but there is no free tier. The cheapest permanent entry point is Sales Professional at $65 per user per month on annual billing."
  - q: "What is the difference between Sales Professional and Sales Enterprise?"
    a: "Professional at $65 covers core sales force automation with limited customisation and automation. Enterprise at $105 removes those caps and adds conversation intelligence and sales engagement. The split is about how far you can extend the system, not whether you can track deals."
  - q: "Is Sales Premium worth $45 more than Enterprise?"
    a: "It depends entirely on AI usage. Premium's distinguishing entitlement is 1,000 Copilot Credits per user per month plus AI-powered data enrichment. If your team will genuinely use Copilot for research, summarisation and forecasting every day, Premium prices that in. If not, Enterprise is the better buy."
  - q: "How much does Microsoft Relationship Sales cost?"
    a: "Microsoft does not publish a price. It bundles Sales Enterprise with LinkedIn Sales Navigator, requires a minimum of ten seats and is quoted by Microsoft sales. Price it against buying Sales Navigator licences separately before assuming the bundle saves money."
  - q: "Do I need other Microsoft licences to run Dynamics 365 Sales?"
    a: "Not strictly, but the value case usually assumes them. Teams already paying for Microsoft 365 get the Outlook and Teams integration that makes Dynamics worth its price; teams without it are buying an expensive CRM whose main advantage they cannot use."
  - q: "Is there a seat minimum on Dynamics 365 Sales?"
    a: "The published Sales plans have no stated minimum, so small teams can license Professional, Enterprise or Premium seat by seat. The ten-seat minimum applies specifically to the Microsoft Relationship Sales bundle."
---

## The licence is the floor, not the cost

Every other CRM on this site can be budgeted from its pricing page. Dynamics 365 cannot, and pretending otherwise is how organisations end up with a business case that misses by a factor of two.

The published numbers are clear enough: $65, $105 and $150 per user per month on annual billing for Professional, Enterprise and Premium. Twenty reps on Enterprise is $25,200 a year in licences. That figure is real, and it is also the smallest line in most Dynamics budgets.

What sits around it: Copilot capacity beyond what your tier includes, Power BI licences if you want the reporting people expect, Power Automate premium connectors when your workflows touch systems outside the Microsoft estate, Dataverse capacity as your data grows, and an implementation partner to configure it. None of that is hidden exactly — it is all documented across Microsoft's licensing material — but none of it appears next to the $105.

Treat the seat price as the entry fee. Model the surrounding platform separately, and get a partner quote before you commit to a rollout date.

## Choosing between the three tiers

Professional at $65 is a genuine product rather than a stripped decoy, but its limits are licensing limits: customisation and automation entitlements are capped. That is fine for a straightforward pipeline where reps log deals and managers pull forecasts. It becomes a problem the moment someone asks for a custom entity, a complex approval flow, or an integration that reshapes records — and the fix is not an add-on, it is relicensing every seat at $105.

Enterprise at $105 is the standard buy and where most deployments should start if there is any prospect of customisation. It removes the caps and adds conversation intelligence and sales engagement, which are the features that distinguish Dynamics from a cheaper per-seat CRM.

Premium at $150 turns on 1,000 Copilot Credits per user per month plus AI-driven data enrichment. The $45 premium only pays back if the AI is used daily. A useful test: if you cannot name three specific tasks your reps would hand to Copilot this quarter, buy Enterprise and revisit at renewal.

## Licence cost at three deployment sizes

| Seats | Professional | Enterprise | Premium |
| --- | --- | --- | --- |
| 10 | $7,800/yr | $12,600/yr | $18,000/yr |
| 50 | $39,000/yr | $63,000/yr | $90,000/yr |
| 200 | $156,000/yr | $252,000/yr | $360,000/yr |

At ten seats Dynamics is competitive with mid-market CRMs on licence cost alone, but the implementation overhead is disproportionate at that size — small teams pay enterprise setup costs for enterprise software. At fifty and above, the numbers start to look like what they are: a platform commitment, where the per-seat rate is negotiable through a Microsoft agreement and the real conversation is about the surrounding estate.

## Contracts, minimums and where discounting lives

Published Dynamics prices are annual-commitment rates. There is no published seat minimum on the three Sales plans, so a small team can license them individually — the ten-seat minimum applies only to Microsoft Relationship Sales, the bundle that adds LinkedIn Sales Navigator to Sales Enterprise and is quoted rather than listed.

The discounting that matters at scale does not appear on the pricing page. Enterprise agreements, existing Microsoft 365 commitments and multi-product bundles all move the effective rate, as do prepaid Copilot credit commitments, which Microsoft describes as saving up to 20% over pay-as-you-go. If you are buying more than a handful of seats, the list price is a starting position.

## Who this pricing rewards

Dynamics 365 Sales makes financial sense for organisations already standardised on Microsoft: Microsoft 365 for mail, Teams for collaboration, Power BI for reporting, Entra for identity. In that context the seat price buys deep integration and a single security and compliance model, and the platform costs are mostly already sunk. Regulated industries and companies with genuinely complex sales processes get value here that lighter CRMs cannot deliver at any price.

It punishes small teams and non-Microsoft shops hardest. A twelve-person sales team on Google Workspace buying Enterprise is paying $105 a seat for integration depth it cannot access and configurability it will not use — the same money buys a fully deployed alternative with change to spare. The break-even is less about headcount than about whether the rest of your stack is already Microsoft.

Microsoft revises Dynamics pricing and packaging regularly, and regional prices differ. All figures above were checked against Microsoft's own Dynamics 365 Sales pricing page in July 2026 — verify there, and against your own agreement, before budgeting.
