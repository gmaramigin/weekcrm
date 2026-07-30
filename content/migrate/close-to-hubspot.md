---
title: "How to Migrate from Close to HubSpot"
description: >-
  Close calls the company a "Lead", which trips up every migration. Map that first,
  then plan for the calling data — recordings and SMS threads are the reason most
  teams keep a Close seat alive longer than they intended.
from: close
to: hubspot
date: 2026-07-30
difficulty: Moderate
duration: "1–2 weeks"
downtime: "None — Close stays live during import"
nativeImport: "No — CSV export or Close API"
tldr: >-
  In Close, a Lead is the company-level record, not a person. It becomes a HubSpot
  Company, its Contacts become Contacts and its Opportunities become Deals. Call
  recordings and SMS threads do not transfer, so export the audio you need to keep
  and connect HubSpot calling before cutover.
tags:
  - Close
  - HubSpot
  - Migration
  - CRM
objectMap:
  - from: "Lead"
    to: "Company"
    notes: "The mapping everyone gets wrong. A Close Lead is the organisation-level record. It becomes a HubSpot Company, not a contact with lifecycle stage Lead."
  - from: "Contact (inside a Lead)"
    to: "Contact"
    notes: "Close contacts are nested inside a Lead. Flatten them on export and associate each to the company created from its parent Lead."
  - from: "Opportunity"
    to: "Deal"
    notes: "Close opportunity statuses map to HubSpot pipeline stages. Create every status as a stage before importing."
  - from: "Call (with recording)"
    to: "Call engagement"
    notes: "The call log entry transfers as an engagement. The recording audio does not — it stays in Close and needs separate export."
  - from: "SMS thread"
    to: "— (no native equivalent)"
    notes: "HubSpot has no first-party SMS store. Threads export as text at best; plan a separate SMS tool if this is core to your motion."
  - from: "Email"
    to: "Email engagement"
    notes: "Transfers via API export. Connect HubSpot's inbox integration too, so ongoing mail keeps logging."
  - from: "Smart View"
    to: "Active list / saved view"
    notes: "Close Smart Views are saved queries. Recreate as HubSpot active lists — the query syntax is entirely different."
  - from: "Custom Activity"
    to: "Custom object or note"
    notes: "Close custom activities have no clean HubSpot counterpart below Enterprise custom objects. Most land as notes."
transfers:
  - "Leads as Companies and their nested Contacts, once flattened on export."
  - "Opportunities with value, status and close date."
  - "Email history and call log entries via the Close API export."
  - "Custom field data, where matching HubSpot properties exist."
  - "Owner assignment, if Close users have HubSpot seats with matching email addresses."
blockers:
  - "**Call recordings.** The audio lives in Close. Log entries transfer, recordings do not — bulk-export anything you need to retain."
  - "**SMS threads.** HubSpot has no native SMS object. If two-way texting is part of your process, budget for a separate tool."
  - "**Close's built-in Power Dialer and Predictive Dialer.** No HubSpot equivalent at parity. This is often the reason teams reconsider the move entirely."
  - "**Smart Views.** Saved-search logic must be rebuilt as HubSpot active lists; the operators do not map one to one."
  - "**Workflows and Sequences.** Close sequences rebuild in HubSpot Sequences, which needs Sales Hub Professional."
  - "**Custom Activities.** Close's flexible activity types largely flatten into notes unless you are on HubSpot Enterprise."
steps:
  - "Confirm the Lead-is-a-company mapping with whoever owns the data, and write it down. This single misunderstanding causes most failed Close migrations."
  - "Bulk-export call recordings and any SMS history you are obliged to keep, before touching anything else."
  - "Flatten the nested structure on export: one row per Lead for companies, one row per Contact with its parent Lead ID."
  - "Create HubSpot pipelines and stages matching Close opportunity statuses, plus all custom properties."
  - "Import Companies first, then Contacts with their company association, then Deals, then activities."
  - "Rebuild Smart Views as HubSpot active lists and sequences as HubSpot Sequences."
  - "Connect HubSpot calling and inbox integrations before cutover so activity logging never gaps."
faq:
  - q: "Why does a Close Lead become a HubSpot Company?"
    a: "Because in Close the Lead is the organisation-level record that contacts and opportunities hang off, not a person. Importing Close Leads as HubSpot contacts produces a duplicated, broken hierarchy — it is the most common mistake in this migration."
  - q: "Do Close call recordings transfer to HubSpot?"
    a: "No. The call log entry transfers as an engagement, but the recording audio stays in Close. Bulk-export anything you need to retain before the subscription ends."
  - q: "Can HubSpot replace the Close dialler?"
    a: "Not at parity. HubSpot calling covers click-to-call and logging, but Close's Power and Predictive Diallers are a different class of tool. High-volume outbound teams usually pair HubSpot with a dedicated dialler."
  - q: "How long does a Close to HubSpot migration take?"
    a: "One to two weeks of data work, plus however long the recording export takes. The object counts are usually modest; the flattening of Close's nested structure is the fiddly part."
---

Close is built for outbound teams that live on the phone, and its data model reflects that. Almost every difficulty in this migration traces back to two facts: Close nests contacts inside a company-level record it confusingly calls a Lead, and Close owns your calling infrastructure.

## Get the Lead mapping right or restart

In Close, "Lead" means the account. It holds the company name, the contacts, the opportunities and most of the activity. It is not a person and it is not a pre-qualified prospect.

Import Close Leads into HubSpot as contacts — which the name invites — and you get a contact database full of company names, opportunities attached to the wrong object, and no usable company hierarchy. Recovering from that is a full re-import. Close Lead becomes HubSpot Company. Write it at the top of the migration doc.

The nesting has a second consequence: Close contacts do not exist as a flat top-level export the way they do in most CRMs. You need one export pass for Leads and another for Contacts carrying their parent Lead ID, then rebuild the association in HubSpot after both objects load.

## Export the recordings first, not last

Call log entries transfer fine as HubSpot engagements. The audio does not. It sits in Close, it is often the most valuable coaching and compliance asset the team has, and it disappears with the subscription.

Do this in week one. Recording exports are slow at volume, and cutover week is the worst possible time to discover a rate limit.

## Be honest about the dialler

This is the point where some teams stop the migration. HubSpot's calling handles click-to-call and logging competently. Close's Power Dialer and Predictive Dialer are a genuinely different product category, and for a high-volume SDR team the productivity difference is measurable in dials per hour.

If outbound calling volume is the core motion, plan on pairing HubSpot with a dedicated dialler and price that in — or reconsider whether the move is solving the right problem.

## SMS needs a plan

Close treats two-way SMS as a first-class channel. HubSpot has no native equivalent store for it. Threads can be exported as text for the record, but the working capability needs a separate tool.
