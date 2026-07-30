---
title: "How to Migrate from Monday CRM to HubSpot"
description: >-
  Monday stores everything as boards, items and columns. HubSpot stores objects with
  typed properties. Translating a flexible board structure into a fixed object model
  is the entire migration.
from: monday
to: hubspot
date: 2026-07-30
difficulty: Moderate
duration: "2–3 weeks"
downtime: "None — export from Monday while it stays live"
nativeImport: "No — CSV export per board, or API"
tldr: >-
  Monday has no native CRM object model, so the first job is deciding which board is
  your Companies, which is Contacts and which is Deals. Export each board to CSV,
  rebuild the connect-board relationships as HubSpot associations, and accept that
  mirror columns, board automations and Monday dashboards do not survive.
tags:
  - Monday CRM
  - HubSpot
  - Migration
  - CRM
objectMap:
  - from: "Accounts board (items)"
    to: "Companies"
    notes: "Whichever board you used for organisations. Item name becomes company name; you will usually need to add a domain column before export because HubSpot dedupes companies on domain."
  - from: "Contacts board (items)"
    to: "Contacts"
    notes: "Requires an email column. Items without one will not create in HubSpot."
  - from: "Deals board (items)"
    to: "Deals"
    notes: "Monday groups often act as stages. Map each group to a HubSpot pipeline stage explicitly before import."
  - from: "Connect boards column"
    to: "Association"
    notes: "The critical translation. Export the linked item IDs and rebuild them as HubSpot associations after both objects exist."
  - from: "Status / Dropdown column"
    to: "Dropdown select property"
    notes: "Recreate every option in HubSpot first, including colours-as-meaning conventions your team relies on."
  - from: "Subitems"
    to: "Tasks or line items"
    notes: "No clean equivalent. Subitems used as checklists become Tasks; subitems used as products become line items."
  - from: "Updates (item conversation)"
    to: "Notes"
    notes: "Exportable via API only, not the CSV export. If your team's context lives in Updates, plan an API pull."
  - from: "Mirror / Formula column"
    to: "— (recompute)"
    notes: "Mirror columns are live lookups and formula columns are computed. Neither exports as durable data — snapshot the values you need before migrating."
transfers:
  - "Item names and standard column values for each board, via CSV export."
  - "Numeric, date, text and dropdown columns, once matching HubSpot properties exist."
  - "People-column owners, if Monday users have HubSpot seats with matching emails."
  - "Board-to-board relationships, if you export connect-board IDs and rebuild associations via API."
  - "Item Updates as HubSpot notes, but only through an API export."
blockers:
  - "**Mirror and formula columns.** These are computed at read time and do not export as values. Snapshot them to a static column before exporting or the numbers vanish."
  - "**Board automations.** Monday's automation recipes have no export path and a different trigger model. Rebuild the ones that fire as HubSpot workflows."
  - "**Dashboards and widgets.** Nothing carries. Rebuild in HubSpot reporting."
  - "**File columns.** Files attached to items need a separate API pull and re-upload; the CSV export gives you URLs, not files."
  - "**Board-level permissions.** Monday's per-board and per-item permissions have no HubSpot equivalent below Enterprise partitioning."
  - "**Multi-board sprawl.** Teams frequently run five or six boards that all contain 'contacts'. Consolidating those into one HubSpot contact database is a data-hygiene project of its own."
steps:
  - "Map your boards to HubSpot objects on paper first. Name the single board that will become each object, and list which other boards are duplicates to be merged."
  - "Add and populate an email column on the contact board and a domain column on the account board — HubSpot needs these as dedupe keys."
  - "Snapshot every mirror and formula column into a static column so the values survive export."
  - "Create HubSpot pipelines, stages and properties matching your Monday groups and columns."
  - "Export each board to CSV keeping the item IDs, then import to HubSpot in order: Companies, Contacts, Deals."
  - "Rebuild connect-board relationships as HubSpot associations using the exported IDs via the API."
  - "Pull item Updates via the Monday API and post them as HubSpot notes, then rebuild the automations that actually fire."
faq:
  - q: "Is there a native Monday to HubSpot migration tool?"
    a: "No first-party importer. You export each board to CSV or pull via the Monday API, then import into HubSpot. Board relationships have to be rebuilt as HubSpot associations afterwards."
  - q: "What happens to Monday mirror and formula columns?"
    a: "They do not export as data because they are computed at read time. Copy their values into a static column before exporting, otherwise those fields arrive empty in HubSpot."
  - q: "Do Monday item Updates transfer to HubSpot?"
    a: "Not through the CSV export. Updates are only reachable via the Monday API, so if your team's history lives in item conversations you need an API-based export to bring them across as HubSpot notes."
  - q: "How long does a Monday to HubSpot migration take?"
    a: "Two to three weeks. Data volumes are usually small; the time goes into deciding which board maps to which object and consolidating boards that hold overlapping contact data."
---

Monday is not a CRM that happens to be flexible — it is a flexible work platform that a CRM template was built on top of. That distinction is the whole story of this migration. HubSpot expects a company to be a company; Monday only knows that you have a board with items on it.

## Start with a board-to-object map, not an export

The most common failure here is exporting first and thinking later. Teams that have used Monday for a couple of years typically have contact data spread across a CRM board, a partnerships board, a support board and someone's personal pipeline board. HubSpot will happily accept all four and give you one contact database with four versions of the same person.

Write the mapping down before you touch anything: this board becomes Companies, this one becomes Contacts, this one becomes Deals, these three merge into Contacts, these two are retired. Everything downstream is mechanical once that document exists.

## Add the dedupe keys Monday never made you fill in

HubSpot keys companies on domain and contacts on email. Monday requires neither, so most boards have gaps — an account item called "Acme (renewal)" with no domain anywhere on it. Fill these in inside Monday before exporting, where you still have the board context to work out which Acme is which. Fixing it after import means merging records in HubSpot, which is slower and less reversible.

## Snapshot your computed columns

Mirror columns and formula columns are the silent data loss in this migration. They look like data in the UI, but they are calculated at read time and export as empty. If a deal board shows account revenue via a mirror column and your team reports on it, copy those values into a plain number column first. It takes ten minutes and it is unrecoverable afterwards.

## Expect the automations to be a rebuild, not a port

Monday's recipe-based automations and HubSpot workflows solve similar problems in genuinely different ways. Rather than translating recipe by recipe, list the outcomes you need — this notification, that stage change, this assignment — and build the shortest HubSpot workflow that produces each. Teams that try a one-to-one port end up with twice as many workflows as they need.
