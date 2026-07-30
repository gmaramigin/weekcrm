---
title: "How to Migrate from Highrise to HubSpot"
description: >-
  Highrise has been closed to new signups for years and receives no development. If
  you are still on it, the migration question is not whether — it is how to get the
  notes and email history out while the API still answers.
from: highrise
to: hubspot
date: 2026-07-30
difficulty: Easy
duration: "3–5 days"
downtime: "None — Highrise stays live during export"
nativeImport: "No — Highrise XML API export"
tldr: >-
  Highrise's model is small: contacts, companies, deals, cases, notes and tasks. All
  of it maps to HubSpot. Use the API rather than the UI export, because the value in
  a long-running Highrise account is the notes and email history, and the CSV export
  does not include them.
tags:
  - Highrise
  - HubSpot
  - Migration
  - CRM
objectMap:
  - from: "Company"
    to: "Company"
    notes: "Direct match. Highrise rarely captures a domain, so populate it during export — HubSpot dedupes companies on domain."
  - from: "Person"
    to: "Contact"
    notes: "The employer link becomes the HubSpot company association. Highrise permits people with no email; those need a rule."
  - from: "Deal"
    to: "Deal"
    notes: "Highrise deals have only three states — pending, won, lost. Map these onto a simple HubSpot pipeline rather than inventing stages that never existed."
  - from: "Case"
    to: "Ticket or note"
    notes: "Highrise Cases are lightweight containers for related notes. With Service Hub they become tickets; otherwise fold the notes onto the contact."
  - from: "Note"
    to: "Note"
    notes: "The most valuable data in the account, and the reason to use the API — the UI export omits note bodies."
  - from: "Email (dropbox-captured)"
    to: "Note or email engagement"
    notes: "Highrise captured email via a forwarding address and stores it. Pull via API and import as notes if the engagement import path is unavailable."
  - from: "Task"
    to: "Task"
    notes: "Direct, once the parent record exists."
  - from: "Tag"
    to: "Property value or list"
    notes: "Highrise tags are flat. Classify each as a property value or a list before import."
transfers:
  - "Companies and people with their contact details and custom fields."
  - "Deals with their pending/won/lost state and value."
  - "Notes and captured email bodies — via the API, not the UI export."
  - "Tasks attached to imported records."
  - "Tag data, once classified into properties or lists."
blockers:
  - "**The UI CSV export.** It omits note bodies and email history, which is usually the only reason the account still has value. Use the API."
  - "**Attachments.** Files attached to notes need a separate API pull and re-upload."
  - "**Highrise Cases as a concept.** Without Service Hub there is no clean destination; the notes survive, the grouping does not."
  - "**Deal stages.** Highrise never had them. Do not fabricate a detailed pipeline retroactively — it produces fake reporting history."
  - "**Any remaining integrations.** The Highrise ecosystem has largely disappeared; assume nothing third-party still works."
steps:
  - "Confirm API access is still working on your account before planning anything else."
  - "Pull companies, people, deals, cases, notes, emails and tasks via the API, preserving Highrise record IDs."
  - "Pull note and email attachments separately — they are not in the record payloads."
  - "Populate company domains and check for people with no email address; decide a rule for each gap."
  - "Create a minimal HubSpot pipeline reflecting Highrise's three deal states, plus properties for tags and custom fields."
  - "Import Companies, Contacts, Deals, then notes, emails and tasks in that order."
  - "Archive the raw API export somewhere durable — Highrise is end-of-life and there may not be a second chance."
faq:
  - q: "Is Highrise still running?"
    a: "It has been closed to new signups for years and receives no meaningful development. Existing accounts continue to work, but it should be treated as end-of-life software — which is the main reason to plan an exit rather than defer one."
  - q: "Why can't I just use the Highrise CSV export?"
    a: "Because it omits note bodies and captured email, which is where nearly all the value in a long-running Highrise account lives. Use the XML API to pull complete records."
  - q: "What happens to Highrise Cases in HubSpot?"
    a: "With Service Hub they become tickets. Without it, the notes inside each case are imported against the contact and the case grouping itself is lost — usually an acceptable trade for a lightly used feature."
  - q: "How long does a Highrise to HubSpot migration take?"
    a: "Three to five days. The data model is small and the volumes are modest. Most of the time goes into the API pull and into filling company domains that Highrise never asked for."
---

Highrise is a museum piece that still works. 37signals stopped taking new customers years ago and the product has not meaningfully changed since. Accounts still function, which is exactly why teams keep deferring the move — until one day the export matters and the tooling around it has decayed further.

If you are reading this, the useful advice is simple: do the export now, even if you are not ready to switch. An archived complete data pull costs you an afternoon and removes all the risk.

## Do not use the CSV export

This is the single thing that matters. Highrise's UI export gives you contact rows and not much else. The notes — the thread of "spoke to Dave, they are re-tendering in Q3" going back a decade — are what your account is actually worth, and they are not in it.

The XML API returns complete records including note bodies and captured emails. Pull everything, keep the raw response files, and store them somewhere that will outlive the subscription. Attachments need a separate pass; they are referenced from notes, not embedded in them.

## Do not invent a pipeline you never had

Highrise deals have three states: pending, won, lost. That is the whole model.

There is a temptation during migration to design the eight-stage pipeline you have always wanted and retro-fit historical deals into it. Resist it. You will be guessing, and the result is a HubSpot reporting history that looks precise and is fiction. Import to a three-stage pipeline that matches reality, then build the pipeline you want going forward and let it fill up with real data.

## Fill in what Highrise never asked for

HubSpot deduplicates companies on domain and contacts on email. Highrise required neither. Expect gaps — companies with no website, contacts with a phone number and nothing else.

Fix what you can during export while the surrounding notes still give you context clues about who these records are. Anything unresolvable gets a documented rule: placeholder domain, exclusion, or import as a contact with no company.

## Treat this as an archive project as much as a migration

Highrise is not coming back. Whatever you do not extract now is extracted never. Even if you only migrate active contacts into HubSpot, keep the complete raw API pull. It costs almost nothing and it is the only copy that will exist.
