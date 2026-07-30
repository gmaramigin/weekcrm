---
title: "How to Migrate from Freshsales to HubSpot"
description: >-
  Freshsales and HubSpot share an object model, so the records move easily. What does
  not move is the Freshworks context — sequences, territories, the built-in phone, and
  every link to Freshdesk.
from: freshsales
to: hubspot
date: 2026-07-30
difficulty: Moderate
duration: "1–2 weeks"
downtime: "None — Freshsales stays live during import"
nativeImport: "No — CSV export per module, or API"
tldr: >-
  Accounts, Contacts and Deals map one-to-one onto HubSpot Companies, Contacts and
  Deals, so the data transfer is fast. Plan instead for the surrounding Freshworks
  tooling — sales sequences, territory rules, the built-in dialler and any Freshdesk
  ticket linkage — none of which crosses over.
tags:
  - Freshsales
  - HubSpot
  - Migration
  - CRM
objectMap:
  - from: "Account"
    to: "Company"
    notes: "Direct match. Ensure the website field is populated — it is HubSpot's company dedupe key."
  - from: "Contact"
    to: "Contact"
    notes: "Clean one-to-one. Freshsales lifecycle stages map onto HubSpot lifecycle stages, but the default value sets differ, so define the mapping explicitly."
  - from: "Deal"
    to: "Deal"
    notes: "Freshsales supports multiple deal pipelines. Recreate each pipeline and every stage in HubSpot before importing."
  - from: "Sales Activity / Task / Appointment"
    to: "Task / Meeting / Call"
    notes: "Freshsales custom sales-activity types need explicit mapping or everything lands as a generic task."
  - from: "Product"
    to: "Product / Line item"
    notes: "Products map to the HubSpot product library; deal-level associations rebuild as line items."
  - from: "Custom Module"
    to: "Custom Object"
    notes: "HubSpot custom objects are Enterprise-tier only. Flatten into properties on Professional."
  - from: "Territory"
    to: "Team + rotation workflow"
    notes: "No direct equivalent. HubSpot approximates territories with teams plus property-based owner rotation."
  - from: "Sales Sequence"
    to: "Sequence (Sales Hub Pro+)"
    notes: "Not importable. Recreate step by step; HubSpot sequences require Sales Hub Professional or above."
transfers:
  - "Accounts, Contacts and Deals with custom fields, once matching HubSpot properties exist."
  - "Deal amounts, currencies, expected close dates and won/lost status."
  - "Notes and activity history, imported after their parent records."
  - "Owner assignment, where Freshsales users have HubSpot seats with matching emails."
  - "Contact lifecycle stage, if you define the value mapping before import."
blockers:
  - "**Sales sequences.** No export path. Rebuild in HubSpot Sequences, which needs Sales Hub Professional at minimum."
  - "**Built-in phone and call recordings.** Freshcaller recordings live in Freshworks. Export the audio you must retain before cancelling — HubSpot's calling is a separate integration."
  - "**Freshdesk linkage.** If Freshsales was tied to Freshdesk tickets, that relationship disappears. Recreating it means HubSpot Service Hub or a third-party integration."
  - "**Territory management and auto-assignment rules.** Approximate with teams and workflow-based rotation."
  - "**Freshsales reports and dashboards.** Nothing carries; rebuild what gets used."
  - "**Freddy AI scores.** Predictive contact and deal scores are model outputs, not portable data. HubSpot scoring starts from zero."
steps:
  - "Confirm what else in the Freshworks suite is wired to Freshsales — Freshdesk, Freshcaller, Freshmarketer — and plan a replacement for each link."
  - "Export call recordings and any Freshcaller audio you are required to retain, before the subscription lapses."
  - "Define the lifecycle-stage value mapping between the two systems; the defaults do not line up."
  - "Create HubSpot pipelines, stages and every custom property before importing."
  - "Export Accounts, Contacts and Deals to CSV with IDs, then import in that order followed by activities."
  - "Rebuild sequences and assignment rules in HubSpot, confirming your tier supports them."
  - "Keep Freshsales read-only for a month to reference sequence content and report definitions."
faq:
  - q: "Do Freshsales sequences transfer to HubSpot?"
    a: "No. Sequences have no export path and must be rebuilt step by step in HubSpot Sequences, which requires Sales Hub Professional or above. Copy the email bodies out before you cancel."
  - q: "What happens to my Freshcaller call recordings?"
    a: "They stay in Freshworks. If you have retention obligations, bulk-export the audio before the subscription lapses — there is no path that carries recordings into HubSpot."
  - q: "Does the Freshsales to Freshdesk link survive the move?"
    a: "No. Ticket linkage is internal to the Freshworks suite. Reproducing it means adopting HubSpot Service Hub or wiring a third-party integration between HubSpot and whichever helpdesk you keep."
  - q: "How long does a Freshsales to HubSpot migration take?"
    a: "One to two weeks. The object models align closely, so most of the schedule goes into rebuilding sequences and replacing the Freshworks tools that were connected to the CRM."
---

Freshsales is one of the easier sources to migrate from, because Freshworks and HubSpot broadly agree on what a CRM contains: accounts, contacts, deals, activities, products. Field-for-field mapping is quick and the imports are uneventful.

The risk in this migration is not the CRM. It is everything Freshworks attached to it.

## Inventory the suite before the CRM

Freshsales rarely sits alone. It is commonly wired to Freshdesk for support context, Freshcaller for telephony, and sometimes Freshmarketer for campaigns. Those connections are internal to the suite and none of them survive a move to HubSpot.

Write down each connection and its replacement before you plan the data work. A ticket link becomes HubSpot Service Hub or a third-party integration. The dialler becomes HubSpot's calling integration or a separate provider. If you cannot name a replacement for one of them, that is a scope item, not a detail.

## Get the recordings out while you still can

Call recordings are the one genuinely unrecoverable asset in this migration. They live in Freshworks, they are large, and once the subscription lapses they are gone. If you are in a regulated industry or you simply want the history, bulk-export the audio early — not in cutover week.

## Lifecycle stages look compatible and are not

Both products ship lifecycle-stage concepts, and the naming overlaps enough that people assume a straight pass-through. The default value sets differ, and lifecycle stage in HubSpot also drives marketing behaviour and pricing. Write the mapping explicitly: this Freshsales stage becomes this HubSpot stage. Ten minutes of mapping avoids a segmentation cleanup later.

## Sequences need a tier check

Freshsales includes sales sequences at relatively low tiers. HubSpot puts them behind Sales Hub Professional. Check your intended HubSpot tier against what your reps use daily before you sign — this is a common source of unbudgeted upgrade cost, and it is much cheaper to discover during evaluation than after migration.
