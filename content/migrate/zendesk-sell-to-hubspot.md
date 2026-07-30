---
title: "How to Migrate from Zendesk Sell to HubSpot"
description: >-
  Zendesk Sell stores people and organisations on the same Contact object, which
  breaks naive exports. Sort that out first, then decide what happens to the Zendesk
  Support link that probably justified the product in the first place.
from: zendesk-sell
to: hubspot
date: 2026-07-30
difficulty: Moderate
duration: "1–2 weeks"
downtime: "None — Sell stays live during import"
nativeImport: "No — CSV export or Zendesk Sell API"
tldr: >-
  Zendesk Sell keeps person and company records in one Contact object distinguished by
  a flag, so the first job is splitting that export into HubSpot Companies and
  Contacts. Deals map cleanly. The bigger question is the Zendesk Support connection,
  which needs Service Hub or an integration to survive.
tags:
  - Zendesk Sell
  - HubSpot
  - Migration
  - CRM
objectMap:
  - from: "Contact (is_organization = true)"
    to: "Company"
    notes: "Sell stores companies as contacts flagged as organisations. Split the export on this flag before importing anything."
  - from: "Contact (person)"
    to: "Contact"
    notes: "The parent-organisation reference on each person becomes the HubSpot company association."
  - from: "Lead"
    to: "Contact (Lifecycle Stage = Lead)"
    notes: "Sell Leads hold person and company data in one record. Unconverted leads become HubSpot contacts; company data on them is usually discarded."
  - from: "Deal"
    to: "Deal"
    notes: "Sell pipeline stages map to HubSpot stages. Recreate every stage first, and note that Sell's loss reasons need a matching HubSpot property."
  - from: "Task / Appointment"
    to: "Task / Meeting"
    notes: "Direct, after the parent record imports."
  - from: "Note / Call log"
    to: "Note / Call engagement"
    notes: "Transfers via API export. Call recordings from Sell Voice stay in Zendesk."
  - from: "Smart List"
    to: "Active list / saved view"
    notes: "Rebuild as HubSpot active lists — the filter syntax is different."
  - from: "Linked Zendesk Support ticket"
    to: "Ticket (Service Hub) or nothing"
    notes: "The Sell-Support link is internal to Zendesk. Preserving support context means Service Hub or a third-party HubSpot–Zendesk integration."
transfers:
  - "Organisations and people, once the Contact export is split on the organisation flag."
  - "Deals with value, currency, stage and expected close date."
  - "Custom field data, where matching HubSpot properties exist."
  - "Notes, tasks, appointments and call log entries via API export."
  - "Owner assignment, where Sell users have HubSpot seats with matching emails."
blockers:
  - "**The Zendesk Support link.** Sell's value for many teams is seeing support tickets on the sales record. That connection does not survive without Service Hub or an integration."
  - "**Sell Voice recordings.** Call audio stays in Zendesk. Export what you must retain before cancelling."
  - "**Sell sequences.** Rebuild in HubSpot Sequences, which requires Sales Hub Professional."
  - "**Smart Lists.** Saved filter logic must be recreated as HubSpot active lists."
  - "**Sell reports and forecasting.** Nothing carries over."
  - "**Products and price books.** Sell's catalogue maps to HubSpot products, but per-deal pricing history often needs manual reconstruction."
steps:
  - "Export Contacts and split the file on the organisation flag — one file becomes Companies, the other becomes Contacts."
  - "Decide what happens to the Zendesk Support relationship: Service Hub, an integration, or accept the loss."
  - "Export Sell Voice recordings you are required to keep, before the subscription ends."
  - "Create HubSpot pipelines, stages, loss-reason properties and all custom properties."
  - "Import Companies, then Contacts with their parent-organisation association, then Deals."
  - "Pull notes, tasks and call logs via the Sell API and attach them to the imported records."
  - "Rebuild Smart Lists as active lists and sequences in HubSpot, then keep Sell read-only for a month."
faq:
  - q: "Why does the Zendesk Sell contact export contain companies?"
    a: "Because Sell stores organisations and people on the same Contact object, distinguished by an is-organisation flag. Split the export on that flag before importing, or you will create companies as contacts in HubSpot."
  - q: "Can I keep seeing Zendesk Support tickets after moving to HubSpot?"
    a: "Only by adding HubSpot Service Hub or wiring a third-party HubSpot–Zendesk integration. The native Sell-to-Support link is internal to Zendesk and does not carry over."
  - q: "Do Zendesk Sell call recordings transfer?"
    a: "No. Call log entries can be imported as HubSpot engagements, but Sell Voice audio remains in Zendesk. Bulk-export anything you need to retain before cancelling."
  - q: "How long does a Zendesk Sell to HubSpot migration take?"
    a: "One to two weeks. Sell accounts are typically modest in size, so the schedule depends mostly on splitting the contact export correctly and deciding how to replace the Support integration."
---

Zendesk Sell is usually bought for one reason: the team already runs Zendesk Support and wants sales and support looking at the same customer. That context matters, because it means the hardest part of leaving is not the data.

## Split the contact export before you do anything else

Sell's data model puts people and organisations in the same Contact object, separated by a boolean flag. Every other CRM keeps them apart, and every naive migration from Sell produces the same result: a HubSpot contact database containing several hundred entries whose first name is "Acme Corporation".

The fix is trivial once you know: export Contacts, filter on the organisation flag, and treat the two halves as separate imports. Companies go first, then people, using the parent-organisation reference to build the association. Get this wrong and it is a full re-import, because the deduplication damage is not cleanly reversible.

## Decide the Support question honestly

If your reps rely on seeing open tickets while they are on a call, removing Sell removes that. HubSpot offers two paths: adopt Service Hub and migrate support too, which is a much larger project, or run a HubSpot–Zendesk integration that surfaces ticket data on the contact record.

The integration route is usually the right answer for teams that are happy with Zendesk Support and only want to leave Sell. Price and test it during evaluation, not after, because "we will figure out the ticket view later" tends to become a permanent gap that erodes adoption.

## Recordings and sequences leave with the subscription

Two assets are stranded on cancellation: Sell Voice call recordings and sequence content. Neither has an export path into HubSpot. Pull the audio you have obligations around, and copy sequence email bodies into a document before you cancel — rebuilding them from memory is worse than rebuilding them from text.

Also check your intended HubSpot tier. Sequences require Sales Hub Professional, and teams migrating from Sell's mid-tier plans sometimes budget for HubSpot Starter and then discover the feature they use daily is two tiers up.
