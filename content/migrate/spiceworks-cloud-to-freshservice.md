---
title: "How to Migrate from Spiceworks Cloud Help Desk to Freshservice"
description: >-
  Moving from a free ad-supported help desk to a real ITSM platform. The tickets are
  the easy part — the point of the exercise is the asset management, change control
  and service catalogue that Spiceworks never had.
from: spiceworks-cloud
to: freshservice
date: 2026-07-30
difficulty: Moderate
duration: "3–6 weeks"
downtime: "None — run both in parallel, then switch mail routing"
nativeImport: "No — Spiceworks CSV export plus the Freshservice API"
tldr: >-
  Spiceworks tickets become Freshservice tickets and users become requesters, which is
  a small job. The real project is standing up what Freshservice adds: an asset
  database, a service catalogue, change management and SLA policies — none of which
  exists in Spiceworks to migrate from.
tags:
  - Spiceworks
  - Freshservice
  - Migration
  - Help Desk
objectMap:
  - from: "Ticket"
    to: "Incident"
    notes: "Direct. Freshservice distinguishes incidents from service requests — decide whether historic tickets all import as incidents or get classified."
  - from: "Ticket comment"
    to: "Conversation / Private note"
    notes: "Spiceworks public and private comments map to Freshservice replies and private notes respectively."
  - from: "User"
    to: "Requester"
    notes: "Clean on email. Freshservice requesters can be linked to departments, which Spiceworks did not model."
  - from: "Organization / Site"
    to: "Department or Location"
    notes: "Spiceworks' lightweight grouping maps to either, depending on whether it represented a business unit or a physical site."
  - from: "Ticket category"
    to: "Category / Sub-category"
    notes: "Freshservice supports a deeper category tree. Design it properly rather than importing flat categories."
  - from: "Inventory device (Spiceworks Inventory)"
    to: "Asset (CMDB)"
    notes: "Only if you ran Spiceworks Inventory. The data is thinner than Freshservice expects — treat it as a seed, not a source of truth."
  - from: "Custom attribute"
    to: "Custom field"
    notes: "Spiceworks custom attributes are limited; most installations have few. Create matching Freshservice fields before import."
  - from: "— (no equivalent)"
    to: "Service catalogue, Change, Problem, Release"
    notes: "These are the reason to move. Nothing migrates into them; they are built from scratch."
transfers:
  - "Tickets with their comment history, imported as incidents."
  - "Users as requesters with email and basic contact details."
  - "Ticket categories, as a starting taxonomy to be refined."
  - "Attachments on tickets."
  - "Agent assignment, where Spiceworks admins have Freshservice seats with matching emails."
blockers:
  - "**Nothing to migrate into the ITSM modules.** Change, problem, release and the service catalogue are new capabilities, built from scratch. Budget project time, not migration time."
  - "**Spiceworks Inventory data quality.** Discovery data from Spiceworks is usually incomplete and stale. Re-run discovery with Freshservice's agent rather than importing a bad CMDB."
  - "**SLA policies.** Spiceworks has no real SLA engine. These are designed fresh, which means agreeing service targets with the business first."
  - "**Reporting history.** Spiceworks reporting is minimal and does not transfer. Treat Freshservice metrics as a new baseline."
  - "**Custom scripts and integrations.** Any local automation around the Spiceworks API needs rebuilding."
steps:
  - "Agree service targets with the business before configuring anything — Freshservice SLA policies need real numbers, and Spiceworks will not supply them."
  - "Export tickets, comments and users from Spiceworks as CSV; check the export includes full comment history."
  - "Design the Freshservice category tree, departments and locations before importing tickets."
  - "Create requesters first, then import tickets as incidents with their conversation history."
  - "Deploy the Freshservice discovery agent and build the CMDB from a fresh scan rather than importing Spiceworks Inventory."
  - "Build the service catalogue with the five or six request types that make up most of your volume, then expand."
  - "Introduce change management last, once incident handling is stable, and switch mail routing when agents are trained."
faq:
  - q: "Can I import Spiceworks Inventory data into the Freshservice CMDB?"
    a: "Technically yes, but it is usually a mistake. Spiceworks discovery data tends to be incomplete and out of date, and a CMDB seeded with bad data is worse than an empty one. Deploy the Freshservice discovery agent and build the asset database from a fresh scan."
  - q: "Should historic Spiceworks tickets import as incidents or service requests?"
    a: "Incidents, in almost all cases. Spiceworks does not distinguish the two, so any classification you apply retrospectively is guesswork. Import everything as incidents and start the distinction from go-live, where it can be accurate."
  - q: "How much of a Freshservice implementation is actually migration?"
    a: "A small fraction. Moving tickets and users takes days. Standing up the service catalogue, SLA policies, change management and the CMDB is the real work, and none of it has a Spiceworks source to migrate from."
  - q: "How long does a Spiceworks to Freshservice migration take?"
    a: "Three to six weeks, dominated by ITSM configuration rather than data transfer. Teams that treat it as a pure migration finish quickly and then spend three months discovering they configured nothing."
---

Calling this a migration undersells it. Spiceworks Cloud Help Desk is a free ticket queue with adverts; Freshservice is an ITSM platform. Moving your tickets across takes a few days. The reason you are moving takes considerably longer.

## The tickets are not the project

Be clear with whoever approved this that the migration and the implementation are two different things.

Migration: export tickets and users, import them, verify counts. Days.

Implementation: agree service targets, design the category taxonomy, build the service catalogue, configure SLA policies, deploy discovery and populate a CMDB, define change management. Weeks, and most of it has no Spiceworks equivalent to copy from.

Teams that plan only the first half declare victory in week two and then spend three months in an unconfigured ITSM tool wondering why it feels the same as Spiceworks.

## Do not seed the CMDB from Spiceworks Inventory

If you ran Spiceworks Inventory, you have device data. It is tempting to import it.

Resist. Spiceworks discovery data is typically partial — machines that have not checked in for a year, duplicates from re-imaged devices, missing everything virtual or cloud. A CMDB seeded with that is actively worse than an empty one, because people will trust it briefly and then stop trusting the whole system.

Deploy the Freshservice discovery agent and build the asset database from a current scan. You get accurate data and a clear starting point.

## SLA policies need a business conversation, not a configuration screen

Spiceworks has no meaningful SLA engine, so there are no existing targets to migrate. Freshservice will ask you for response and resolution times by priority.

Those numbers have to come from an agreement with the business, not from IT guessing. Have that conversation early — it is usually the longest-lead item in the project and it blocks meaningful configuration.

## Import everything as incidents

Freshservice separates incidents from service requests, which is genuinely useful going forward. Spiceworks does not make that distinction, so any retrospective classification of historic tickets is invention.

Import the history as incidents, and start classifying properly from go-live. Clean data from the switch-on date is worth more than a fabricated backfill.

## Build the catalogue narrow, then widen

The instinct with a new service catalogue is to model everything. Do not. Find the five or six request types that make up most of your ticket volume — password resets, new starter setup, software requests, hardware — and build those properly.

They will cover the majority of demand, agents will adopt them, and you can expand once the pattern is established. A catalogue with sixty half-configured items gets ignored.

## Introduce change management last

Get incident handling stable first. Change management is where ITSM implementations stall, because it requires process agreement across teams that do not report to you. Sequence it after the parts that only need IT.
