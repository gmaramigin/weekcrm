---
title: "HubSpot and Shopify: Orders as Deals, and Whether That's a Good Idea"
description: >-
  The connector turns store customers into contacts and orders into deals. That
  modelling choice is the integration's biggest strength and its most common
  regret — a pipeline with four thousand deals in it is not a pipeline.
vendor: hubspot
platform: Shopify
platformSlug: shopify
date: 2026-07-31
method: "Native — HubSpot-built app installed from the Shopify App Store"
direction: "Mostly Shopify → HubSpot; HubSpot writes back very little"
setupTime: "30 minutes to connect, a day to decide the data model"
availability: "Connector works on all HubSpot tiers; abandoned-cart and ecommerce automation need Marketing Hub Professional"
tldr: >-
  Customers become contacts, orders become deals in a dedicated ecommerce pipeline,
  and products sync into the HubSpot product library. Abandoned checkouts arrive as
  deals too, which is the feature people actually install it for.
tags:
  - HubSpot
  - Shopify
  - Integrations
syncs:
  - what: "Customers → contacts"
    direction: "Shopify → HubSpot"
    notes: "Matched on email. Marketing consent from Shopify maps to HubSpot subscription status, which matters for compliance and is easy to get wrong."
  - what: "Orders → deals"
    direction: "Shopify → HubSpot"
    notes: "Each order becomes a deal in a separate ecommerce pipeline with stages like Checkout Pending, Checkout Abandoned, Processed and Shipped."
  - what: "Abandoned checkouts"
    direction: "Shopify → HubSpot"
    notes: "Land as deals in the abandoned stage — the trigger for recovery email. The commercially useful half of the integration."
  - what: "Products → HubSpot product library"
    direction: "Shopify → HubSpot"
    notes: "SKUs, prices and product names sync so line items on the deal are meaningful and segmentation by product bought is possible."
  - what: "Line items"
    direction: "Shopify → HubSpot"
    notes: "Attached to the order deal, enabling segmentation like \"bought product X but not the refill\"."
  - what: "Refunds and cancellations"
    direction: "Shopify → HubSpot"
    notes: "Reflected on the deal status. Revenue reporting in HubSpot that ignores refunds will read high."
  - what: "Multi-store"
    direction: "Shopify → HubSpot"
    notes: "Several stores can connect to one HubSpot account, each with its own pipeline — essential for anyone running regional storefronts."
limits:
  - "**Your deal pipeline stops being a sales pipeline.** Thousands of order deals swamp deal-based reporting unless you keep the ecommerce pipeline strictly separate and exclude it from every sales dashboard."
  - "**Abandoned cart recovery email needs Marketing Hub Professional.** The sync is available lower down; the automation that makes it worth anything is not."
  - "**HubSpot does not write back to Shopify.** No order edits, no customer updates, no fulfilment. Treat Shopify as authoritative and HubSpot as the marketing layer on top."
  - "**Marketing consent mapping deserves a careful read.** Shopify's accepts-marketing flag and HubSpot's subscription types are not the same model, and getting it wrong means emailing people who did not opt in."
  - "**Historical order backfill is partial.** Expect roughly recent history rather than the store's full lifetime, which limits first-purchase-date cohort analysis."
steps:
  - "Create a dedicated ecommerce pipeline in HubSpot before connecting, and confirm every existing sales dashboard filters by pipeline rather than looking at all deals."
  - "Install the HubSpot app from the Shopify App Store and authorise it against the live store. Do the connection outside a sale period — the initial sync is not free of load."
  - "Review the marketing consent mapping in the app settings first, before any contact syncs. This is a compliance decision, not a preference."
  - "Confirm the product library populated properly, then build one segmentation list on a line item to prove line-item data is usable."
  - "Build the abandoned checkout workflow — enrol on the abandoned stage, exit on order created, and cap it at two emails. Recovery sequences that run to five emails train people to ignore you."
  - "Exclude the ecommerce pipeline from forecast reporting and from any deal-count metric leadership looks at."
faq:
  - q: "Should orders really be deals?"
    a: "For a store with a few hundred orders a month and a genuine post-purchase sales motion, yes — it gives you line items, revenue and lifecycle in one object. For a high-volume store it is the wrong shape: the deal object was designed for something a human works, and a pipeline with tens of thousands of entries makes every deal-based report meaningless. High-volume stores are usually better served treating HubSpot purely as the contact and email layer and leaving order analytics in Shopify."
  - q: "Can HubSpot update an order in Shopify?"
    a: "No. The connector is effectively one-directional for transactional data — Shopify is authoritative for orders, customers and fulfilment, and HubSpot receives. If you need writeback, such as tagging a Shopify customer based on HubSpot behaviour, that is a Zapier, Make or custom API job rather than something the native app does."
  - q: "Does this work with multiple Shopify stores?"
    a: "Yes. Several stores can be connected to a single HubSpot account, and each gets its own pipeline so the order deals stay separable. What you do not get automatically is deduplication of a customer who shops in two of your stores under the same email — they merge into one HubSpot contact with orders from both, which is usually what you want but occasionally is not, particularly where regional entities have separate consent bases."
---

## What the integration is really selling

Abandoned checkout recovery. Everything else — customers, products, line items — is infrastructure supporting the one workflow with an obvious payback.

Shopify's own abandoned-cart email exists and is fine. What HubSpot adds is the ability to treat an abandoned checkout as one signal among many: this person also opened the last two campaigns, has bought twice before, and browsed the pricing page. That is a different email than the generic reminder, and it converts differently.

## The modelling trap

Orders as deals is a defensible choice for a considered-purchase store — furniture, B2B supplies, anything with an average order value that justifies a human following up. It is a bad choice for a store selling a £12 product a thousand times a month.

Nothing in the setup flow asks you which one you are. Decide before connecting, because unwinding a pipeline full of order deals afterwards is genuinely annoying.

## The consent detail worth an extra ten minutes

Shopify records whether a customer accepted marketing at checkout. HubSpot models subscriptions by type. Mapping the first onto the second casually is how a store ends up sending a newsletter to people who only ticked a transactional box. Read that screen properly the first time; it is the only part of this integration with a regulatory consequence.
