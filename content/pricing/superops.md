---
title: "SuperOps Pricing Explained (2026)"
description: >-
  SuperOps has moved to per-endpoint pricing with volume tiers and hard minimums,
  which changes the comparison against per-technician RMM platforms completely.
vendor: superops
date: 2026-07-23
tldr: >-
  SuperOps now prices per endpoint, not per technician. Prime runs $1.50/endpoint
  monthly with a 100-endpoint minimum, falling to $1.20 above 1,000. Prime Plus
  adds Apple and Android MDM from $3.00/endpoint with a 150-endpoint minimum, and
  annual billing takes 15% off.
tags:
  - SuperOps
  - Pricing
  - RMM
  - MSP
tiers:
  - name: Prime (100–100 endpoints)
    price: "$1.50/endpoint/mo"
    billing: "monthly, 100-endpoint minimum; 15% off annual"
    includes: "Unified endpoint management for Windows, Mac and Linux, integrated ticketing and asset management, automated patch management and compliance, network monitoring and alerting"
    amount: 1.50
    unit: "per endpoint/month"
  - name: Prime (volume tiers)
    price: "$1.40 / $1.30 / $1.20 per endpoint"
    billing: "101–500, 501–1,000 and 1,000+ endpoints respectively"
    includes: "Same Prime feature set with volume discounting as endpoint count rises"
    amount: 1.20
    unit: "per endpoint/month at 1,000+"
  - name: Prime Plus
    price: "$3.00/endpoint/mo"
    billing: "monthly, 150-endpoint minimum; promotional rate of $2.50 advertised"
    includes: "Everything in Prime plus MDM for Apple devices and MDM for Android devices"
    amount: 3.00
    unit: "per endpoint/month"
  - name: Prime Plus (volume tiers)
    price: "$2.30 / $2.10 / $2.00 per endpoint"
    billing: "151–500, 501–1,000 and 1,000+ endpoints respectively"
    includes: "Full Prime Plus feature set with volume discounting"
    amount: 2.00
    unit: "per endpoint/month at 1,000+"
hiddenCosts:
  - "The minimums are the real floor. Prime requires 100 endpoints ($150/month) and Prime Plus 150 ($450/month at list) — an MSP managing 60 devices pays for 100 either way."
  - "Per-endpoint pricing inverts the usual MSP economics. A lean team managing many devices now pays more than it would on a per-technician model; a large team managing few devices pays less."
  - "Volume discounts only bite at real scale. The step from $1.50 to $1.20 requires crossing 1,000 endpoints — most small MSPs sit permanently in the top two price bands."
  - "MDM is Prime Plus only, at double the Prime rate. Any MSP supporting managed Apple or Android fleets is paying $2.00–$3.00 per endpoint, not $1.20–$1.50."
  - "The advertised $2.50 Prime Plus rate is a limited-time early-bird offer against a $3.00 list price. Model renewals at list unless the discount is written into the contract."
faq:
  - q: "Did SuperOps change its pricing model?"
    a: "Yes, and it matters. SuperOps historically priced per technician — figures around $89/tech/month for PSA and $149 for PSA plus RMM circulate widely in older comparisons. The current published model is per endpoint, with Prime and Prime Plus tiers and volume bands. Any comparison built on the per-technician numbers is out of date."
  - q: "What is the minimum I can spend?"
    a: "$150/month on Prime, because of the 100-endpoint minimum, and $450/month at Prime Plus list because of the 150-endpoint minimum. Annual billing takes 15% off both. If you manage fewer devices than the minimum, you still pay it."
  - q: "How does per-endpoint pricing compare to per-technician?"
    a: "It depends entirely on your device-to-technician ratio. An MSP with two technicians managing 800 endpoints pays $1,040/month on Prime — far more than two per-tech seats would have cost. An MSP with six technicians managing 300 endpoints pays $420, far less. Work out your own ratio before assuming either model is cheaper."
  - q: "When is Prime Plus worth double?"
    a: "When you manage Apple or Android devices under MDM. That is the entire difference between the tiers. If your fleet is Windows and Linux desktops and servers, Prime covers it and Prime Plus is money spent on capability you will not deploy."
  - q: "Do the volume discounts help a small MSP?"
    a: "Not much. The bands are 100, 101–500, 501–1,000 and 1,000+, and the total spread on Prime is $1.50 down to $1.20 — 20%. Meaningful at scale, marginal below 500 endpoints. Most small MSPs should budget at the $1.40–$1.50 band and treat the discount as a growth benefit rather than a negotiating lever."
  - q: "Is PSA included?"
    a: "Integrated ticketing and asset management are in Prime, so the service-desk basics come with the endpoint price rather than as a separate PSA subscription. That bundling is the strongest argument for SuperOps against buying an RMM and a PSA separately."
---

## The model changed — check your comparison

If you have been shortlisting SuperOps against Syncro, NinjaOne and Atera on the basis of a per-technician price, start again. SuperOps now publishes per-endpoint pricing: Prime from $1.50 per endpoint per month, Prime Plus from $3.00, both with volume bands and hard minimums.

The older per-technician figures — roughly $89/tech for PSA and $149/tech for PSA plus RMM — still circulate widely in comparison articles and review sites. They are not the current model, and building a budget from them will be wrong in one direction or the other by a large margin.

This is not a cosmetic change. Per-endpoint and per-technician pricing reward opposite operating models, and switching between them can move an MSP's software cost by a factor of two or three in either direction.

## Work out your device-to-technician ratio first

The single number that determines whether SuperOps is cheap or expensive for you is endpoints per technician.

| MSP profile | Endpoints | Techs | Prime cost | Per tech |
|---|---|---|---|---|
| Lean, high automation | 800 | 2 | $1,040/mo | $520 |
| Balanced | 500 | 4 | $700/mo | $175 |
| Service-heavy | 300 | 6 | $420/mo | $70 |
| Below minimum | 60 | 2 | $150/mo | $75 |

The lean, highly automated MSP — precisely the profile SuperOps markets to — pays the most under this model. That is not a criticism of the product, but it is an irony worth pricing before you sign. A two-technician shop running 800 endpoints is paying over $12,000 a year, where a per-technician competitor might charge a third of that.

Conversely, a service-heavy MSP with more hands and fewer devices does very well here, as does anyone whose contracts are priced per endpoint themselves — in that case SuperOps' cost scales in lockstep with revenue, which is a genuinely clean way to run the business.

## The minimums bite at the bottom

Prime requires 100 endpoints. Prime Plus requires 150. An MSP managing 60 devices pays the 100-endpoint price of $150 a month regardless — an effective $2.50 per managed device.

For a new or small MSP, that is a real barrier, and it puts SuperOps at a disadvantage against competitors that will sell you a single technician seat. The minimum stops mattering the moment you cross it, but below it the effective rate can be double the headline.

## Prime versus Prime Plus is a single question

The entire difference between the two tiers is mobile device management — Apple MDM and Android MDM. Everything else, including unified endpoint management across Windows, Mac and Linux, ticketing, asset management, patch management, compliance and network monitoring, is in Prime.

So the decision is binary. Do you manage mobile fleets under MDM? If yes, you are paying $2.00 to $3.00 per endpoint. If no, Prime at $1.20 to $1.50 covers your entire stack and Prime Plus is waste.

Note also that Prime Plus's advertised $2.50 is an early-bird promotion against a $3.00 list price. Model renewals at list unless the discounted rate is contractually locked — a 20% increase at renewal on a 500-endpoint account is $2,500 a year.

## The bundled PSA is the real value argument

Ticketing and asset management sit inside Prime rather than as a separate PSA product. For an MSP currently paying for an RMM and a service desk separately, that consolidation is where the value case actually lives — not in the per-endpoint rate, which is competitive but not remarkable.

Against buying Syncro at $129 to $179 per technician (which also bundles PSA and RMM with unlimited endpoints), the comparison again comes down to the ratio: Syncro's unlimited-endpoint model favours device-heavy MSPs, SuperOps' per-endpoint model favours technician-heavy ones. Run both numbers against your actual book before deciding.

## Who should buy it

MSPs whose own contracts are priced per endpoint, so software cost tracks revenue directly. Growing MSPs between 100 and 1,000 devices that want RMM and service desk in one product without running two vendors. Teams that value modern tooling and are willing to pay per device for it.

It suits badly the very small MSP below the 100-endpoint minimum, and the lean, heavily automated shop managing thousands of devices with a handful of technicians — that profile is systematically penalised by per-endpoint pricing and should price per-technician alternatives carefully. Check superops.com/pricing for current bands and confirm whether promotional rates apply at renewal.
