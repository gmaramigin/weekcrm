---
title: "Lansweeper Pricing Explained (2026)"
description: >-
  Lansweeper prices by assets discovered, not by admins — $239/month for 2,000
  assets on Starter and $439 on Pro, with a discovery engine that finds more
  than you expected and bills you for it.
vendor: lasweeper
date: 2026-07-28
tldr: >-
  Lansweeper has a free tier, Starter at $239/month for 2,000 assets, Pro at
  $439/month, and Enterprise starting at 10,000 assets on custom pricing.
  Enterprise contracts in the 10,000–30,000 asset range typically run €50,000 to
  €150,000 a year. All paid plans require annual billing.
tags:
  - Lansweeper
  - Pricing
  - IT Asset Management
tiers:
  - name: Free
    price: "$0"
    billing: "free tier, limited asset count"
    includes: "Core discovery and inventory for very small environments — enough to see what the scanning engine finds before you pay for it"
    amount: 0
    unit: "per month"
  - name: Starter
    price: "$239/mo"
    billing: "annual billing required, 2,000 assets included"
    includes: "Network discovery and inventory across 2,000 assets, roughly €1.19 per asset per year at the derived rate"
    amount: 239
    unit: "per month"
  - name: Pro
    price: "$439/mo"
    billing: "annual billing required, scales to ~9,000 assets"
    includes: "Everything in Starter plus the expanded capability set, supporting up to around 9,000 assets at roughly €2.15 per asset per year"
    amount: 439
    unit: "per month"
  - name: Enterprise
    price: "Custom quote"
    billing: "annual, starts at 10,000 assets"
    includes: "Large-estate discovery with enterprise support; contracts in the 10,000–30,000 asset range typically run €50,000–€150,000 per year"
hiddenCosts:
  - "The discovery engine is the billing engine. Lansweeper's core competence is finding assets you did not know you had — every one of which counts toward the tier you are paying for."
  - "Asset counts include far more than laptops. Servers, VMs, network gear, printers, IoT devices and cloud instances all register, so the number that lands after the first full scan is routinely well above the estate you estimated."
  - "The jump from Pro's ~9,000 assets to Enterprise's 10,000 floor is a cliff, not a slope. Crossing it moves you from a $439 monthly plan to a negotiated annual contract that can start in the tens of thousands."
  - "All paid plans require annual billing, so there is no monthly escape route once your asset count has grown into a higher tier."
  - "Per-asset economics get worse as you climb from Starter to Pro — roughly €1.19 per asset per year against €2.15 — because Pro is sold on capability, not on volume discount."
faq:
  - q: "How does Lansweeper decide what I pay?"
    a: "Assets discovered, not administrators. Starter covers 2,000 assets at $239 a month, Pro reaches around 9,000 at $439, and Enterprise starts at 10,000 on custom pricing. How many people log in to Lansweeper is irrelevant to the bill."
  - q: "What counts as an asset?"
    a: "More than you think. Workstations and servers obviously, but also virtual machines, network hardware, printers, IoT devices and cloud instances. Because Lansweeper's whole value is discovering shadow IT, the first full scan routinely returns a number well above the estate people estimated — and that number is what you are billed against."
  - q: "Is the free tier useful?"
    a: "As a scoping exercise, very. Run it on your network and let it tell you your real asset count before you choose a tier. That single step prevents the most common Lansweeper budgeting error, which is buying Starter for a 2,000-asset estate that turns out to be 3,400."
  - q: "Why is Pro nearly twice the price of Starter?"
    a: "Capability plus headroom. Pro roughly quadruples the asset ceiling and adds functionality, but the per-asset rate goes up rather than down — about €2.15 per asset per year against Starter's €1.19. You are buying features and room to grow, not a volume discount."
  - q: "What happens when I pass 9,000 assets?"
    a: "You move to Enterprise, and the pricing model changes entirely. Enterprise starts at 10,000 assets on custom terms, with contracts in the 10,000–30,000 range typically running €50,000 to €150,000 a year. That is a step change from a $439 monthly plan and it should be modelled well before you approach the ceiling."
  - q: "Can I pay monthly?"
    a: "No. All paid plans require annual billing. Combined with asset-based pricing, that means a growing estate can push you into a higher tier mid-contract with no short-term way out — worth confirming how mid-term overage is handled before signing."
---

## The product that finds assets is the product that bills for them

Lansweeper's reputation rests on one thing: it discovers hardware and software across your network that nobody had documented. Forgotten servers, unmanaged VMs, a print server from 2019, cloud instances someone spun up and never decommissioned.

Its pricing rests on the same thing. You pay by asset count. That alignment is honest — you are billed in proportion to the estate you are managing — but it creates a dynamic worth naming plainly: the better the tool works, the higher the number it bills you against. Teams that estimate their asset count from a spreadsheet and buy accordingly are frequently surprised by the first scan.

## What the tiers cost, and what they cost per asset

| Plan | Monthly | Annual | Asset ceiling | Approx. per asset/year |
|---|---|---|---|---|
| Free | $0 | $0 | small environments | — |
| Starter | $239 | $2,868 | 2,000 | ~€1.19 |
| Pro | $439 | $5,268 | ~9,000 | ~€2.15 |
| Enterprise | custom | €50k–€150k typical | 10,000–30,000 | negotiated |

The per-asset column runs the wrong way between Starter and Pro. Normally more volume means a better unit rate; here it nearly doubles, because Pro is priced on capability with the asset headroom attached rather than as a bulk discount.

The practical reading: do not upgrade to Pro because you are approaching 2,000 assets and assume you are getting a better deal per device. You are buying features. Check that you want them.

## The 10,000-asset cliff

Pro tops out around 9,000 assets. Enterprise begins at 10,000. There is nothing in between, and the gap between the two is not a price increase — it is a change of pricing model, from a published monthly plan to a negotiated annual contract that commonly starts in the tens of thousands of euros.

For a growing organisation this is the single most important number in the whole pricing structure. An estate at 7,500 assets and expanding at 15% a year hits the cliff inside two years. Model that before you sign a Pro contract, and raise the Enterprise conversation early enough to negotiate rather than to be quoted under time pressure.

## Use the free tier as a measuring instrument

The free plan's real purpose is scoping. Deploy it, run a full discovery sweep, and read the resulting asset count. That number — not your CMDB, not your procurement records — is what you will be billed against, and it is the only reliable input to a tier decision.

This is a five-minute step that routinely changes the answer. Estates with heavy virtualisation, a lot of network gear, or any meaningful IoT footprint reliably come in above expectation.

## Annual-only, and what that implies

Every paid plan requires annual billing. Combined with asset-based metering, that has a specific consequence: if your estate grows past your tier mid-contract, you cannot simply drop back a plan next month. Ask explicitly how mid-term overage is handled — whether it triggers a true-up, an immediate upgrade, or a grace allowance — because asset counts move on their own in a way seat counts do not.

## Who should and should not buy this

Lansweeper fits IT operations, security and asset management teams in organisations large enough to have lost track of their own estate, and specifically those where discovery is the problem. If your driver is a licence audit, a security posture review, or a hardware refresh cycle you cannot plan because you do not know what you own, the asset-based price is aligned with the value.

It fits poorly for small, tightly-controlled environments where you already know every device — there the free tier is likely sufficient and the paid plans are solving a problem you do not have. It also fits poorly for organisations near the 9,000-asset boundary that want budget certainty, because the next step is a negotiation rather than a price.

Lansweeper prices in both USD and EUR and revises tier capacities periodically. Confirm current asset ceilings and rates at lansweeper.com before budgeting.
