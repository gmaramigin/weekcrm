---
title: "HubSpot and QuickBooks: Invoices on the Deal Record"
description: >-
  The integration closes the loop between closed-won and paid. It is genuinely useful
  and considerably narrower than most people assume — QuickBooks Online only, and
  accounting stays the system of record.
vendor: hubspot
platform: QuickBooks
platformSlug: quickbooks
date: 2026-07-31
method: "Native — Intuit-maintained app in the HubSpot App Marketplace"
direction: "Mostly QuickBooks → HubSpot for status; HubSpot → QuickBooks for invoice creation"
setupTime: "30 minutes, plus product mapping"
availability: "QuickBooks Online only — Desktop is not supported"
tldr: >-
  Create an invoice from a HubSpot deal, then see its payment status on the deal and
  contact record without opening the accounting system. Customers map to contacts and
  companies. Everything financial stays authoritative in QuickBooks.
tags:
  - HubSpot
  - QuickBooks
  - Integrations
syncs:
  - what: "Invoice creation"
    direction: "HubSpot → QuickBooks"
    notes: "Raised from the deal record, with line items drawn from the deal's products where the product mapping is set up."
  - what: "Invoice status"
    direction: "QuickBooks → HubSpot"
    notes: "Draft, sent, viewed, partially paid, paid and overdue all render on the deal and the associated contact timeline."
  - what: "Payments"
    direction: "QuickBooks → HubSpot"
    notes: "Payment received and amount outstanding appear against the invoice, which is what makes revenue-based workflows possible."
  - what: "Customers ↔ contacts and companies"
    direction: "Two-way"
    notes: "Matching is by email and name. QuickBooks customers that are legal entities rarely match HubSpot companies cleanly without a manual pass."
  - what: "Products and services"
    direction: "QuickBooks → HubSpot"
    notes: "The QuickBooks item list can populate the HubSpot product library so deal line items produce correct invoice lines."
  - what: "Workflow triggers"
    direction: "QuickBooks → HubSpot"
    notes: "Invoice paid and invoice overdue become workflow enrolment triggers — the basis for automated dunning and for handoff to onboarding."
limits:
  - "**QuickBooks Desktop is not supported.** This is the single biggest surprise. Desktop shops need a third-party middleware layer, and the good ones are not cheap."
  - "**One QuickBooks company per HubSpot account.** Multi-entity businesses running separate books per country or brand cannot consolidate through this connector."
  - "**Historical invoices do not fully backfill.** Expect the sync to start roughly from connection date. Reporting on last year's payment behaviour still happens in QuickBooks."
  - "**Customer matching is fragile.** \"Acme Ltd\" in QuickBooks and \"Acme\" in HubSpot are two records until someone reconciles them, and the connector will not guess."
  - "**Tax, currency and discount handling stays in QuickBooks.** Anything a HubSpot quote calculates is indicative; the invoice is authoritative, and the two can disagree if the product mapping drifts."
steps:
  - "Tidy the QuickBooks item list first. Every product you intend to invoice from a deal needs a clean, uniquely named item, because the mapping keys off it."
  - "Install the QuickBooks Online app from the HubSpot App Marketplace and authorise it against the production company file, not the sample company."
  - "Map the product library before mapping customers — line items are what makes an auto-generated invoice usable rather than something finance rewrites by hand."
  - "Run a customer reconciliation pass: export QuickBooks customers, export HubSpot companies, and fix the name mismatches before turning on two-way matching."
  - "Raise three test invoices from real deals of different shapes — one simple, one multi-line, one with a discount — and have finance check them in QuickBooks before rollout."
  - "Build the two workflows that justify the integration: invoice paid triggers the onboarding handoff, invoice overdue by fourteen days notifies the deal owner rather than only finance."
faq:
  - q: "Does this replace an accounting integration for revenue reporting?"
    a: "No, and treating it as one causes problems. QuickBooks remains the system of record for revenue, tax and reconciliation; what the integration gives HubSpot is visibility and triggers. Revenue reporting built on HubSpot deal amounts will diverge from the books the moment there is a partial payment, a credit note or a currency adjustment — all of which QuickBooks handles and HubSpot does not model."
  - q: "Can I use HubSpot quotes and QuickBooks invoices together?"
    a: "Yes, and it is the common pattern: quote in HubSpot for the sales motion, invoice in QuickBooks for the financial one. The thing to watch is that the two are calculated by different engines. If a HubSpot quote applies a discount the QuickBooks item does not, the invoice will not match the quote the customer signed. Keeping the product library synced from QuickBooks rather than maintained separately in HubSpot is what prevents this."
  - q: "What about QuickBooks Desktop?"
    a: "It is not supported by the native app. The realistic options are migrating to QuickBooks Online, or running a middleware connector that speaks to the Desktop file — which adds cost, a sync agent that has to stay running, and a support relationship with a third party. For most teams the cost of that setup exceeds the benefit of seeing payment status on a deal record."
---

## The loop this closes

Sales marks a deal closed-won. Somewhere between that click and the money arriving there is a gap, and the gap is where most CRMs stop caring. The QuickBooks integration fills it: the deal record shows whether the invoice was raised, sent, viewed and paid.

That matters for two workflows specifically. First, onboarding handoff — starting implementation on a signed-but-unpaid deal is a decision, and it should be a deliberate one. Second, collections — a deal owner chasing an overdue invoice gets a better response than a finance address nobody recognises.

## Where teams get it wrong

They connect it and skip the product mapping. Invoices then generate with a single generic line item, finance rewrites every one of them by hand, and within a month people are raising invoices directly in QuickBooks again and the connector is decorative.

The product library is the whole integration. Spend the afternoon on it.

## The multi-entity problem

One QuickBooks company per HubSpot account is a hard boundary. If you invoice from a UK entity and a US entity, you cannot see both on the same deal record through this connector. The workarounds are all unattractive: separate HubSpot portals, a middleware layer, or accepting that one entity's invoices are invisible in the CRM. Worth knowing before the finance team builds a process on it.
