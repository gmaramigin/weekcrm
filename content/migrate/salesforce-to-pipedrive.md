---
title: "How to Migrate from Salesforce to Pipedrive"
description: >-
  Downsizing from Salesforce to Pipedrive is mostly an exercise in deciding what to
  leave behind. Pipedrive has no Cases, no record types and no Flow engine — and for
  most teams making this move, that is the point.
from: salesforce
to: pipedrive
date: 2026-07-30
difficulty: Moderate
duration: "1–3 weeks"
downtime: "None — import into Pipedrive while Salesforce stays live"
nativeImport: "Yes — Pipedrive's Salesforce import wizard"
tldr: >-
  Accounts become Organizations, Contacts become Persons and Opportunities become
  Deals. Pipedrive's importer handles the core objects directly from Salesforce.
  The work is subtractive: cases, record types, formula fields, validation rules and
  Flows have no home in Pipedrive and need to be retired or moved to another tool.
tags:
  - Salesforce
  - Pipedrive
  - Migration
  - CRM
objectMap:
  - from: "Account"
    to: "Organization"
    notes: "Direct match. Pipedrive supports a linked-organization hierarchy, though it is shallower than Salesforce's account hierarchy."
  - from: "Contact"
    to: "Person"
    notes: "Clean. Pipedrive allows multiple emails and phone numbers per person, so Salesforce's separate phone fields consolidate neatly."
  - from: "Lead"
    to: "Lead (Leads Inbox)"
    notes: "Rare good news — Pipedrive actually has a Leads Inbox, so unconverted Salesforce leads have a genuine home rather than polluting your person database."
  - from: "Opportunity"
    to: "Deal"
    notes: "Build pipelines and stages in Pipedrive first. Salesforce stage probabilities map to Pipedrive stage probabilities but are not imported automatically."
  - from: "Case"
    to: "— (no equivalent)"
    notes: "Pipedrive is not a support tool. Cases either move to a separate helpdesk or stay archived in Salesforce."
  - from: "Task / Event"
    to: "Activity"
    notes: "Both collapse into Pipedrive's single Activity object with a type. Create matching activity types before import."
  - from: "Product / Opportunity Line Item"
    to: "Product / Deal product"
    notes: "Maps well. Pipedrive products support variations and per-deal pricing."
  - from: "Custom Object"
    to: "— (no equivalent)"
    notes: "Pipedrive has no custom objects. Low-volume custom objects flatten into custom fields; high-volume ones need an external tool."
transfers:
  - "Accounts, Contacts, Leads and Opportunities including most custom fields, once matching Pipedrive fields exist."
  - "Deal values, currencies and expected close dates."
  - "Notes and activity history through the import wizard."
  - "Owner assignment, provided Salesforce users have matching Pipedrive seats by email."
  - "Won/lost status with lost reasons, if you pre-create a Pipedrive lost-reason list."
blockers:
  - "**Cases and anything Service Cloud.** Pipedrive has no support object. Budget for a separate helpdesk if you were using Salesforce for tickets."
  - "**Record types and page layouts.** No equivalent. Two sales motions in one Salesforce org become two Pipedrive pipelines with a shared field set."
  - "**Formula fields, roll-up summaries and validation rules.** None of these exist in Pipedrive. Recalculate downstream or accept the loss."
  - "**Flows, Process Builder and Apex.** Pipedrive Workflow Automation is much simpler. Complex orchestration usually moves to an external automation tool."
  - "**Role hierarchy and sharing rules.** Pipedrive permissions are visibility groups — far coarser. Confirm this is acceptable before you commit."
  - "**Reports and dashboards.** Rebuild in Pipedrive Insights, which is capable but not comparable to Salesforce reporting."
steps:
  - "Audit what you actually use in Salesforce. This migration succeeds or fails on scope discipline — most orgs are moving because Salesforce did too much."
  - "Decide where Cases go: a separate helpdesk, a data warehouse, or a frozen Salesforce archive."
  - "Create Pipedrive pipelines, stages, custom fields and activity types before importing anything."
  - "Run Pipedrive's Salesforce import wizard against a small subset and verify associations end to end."
  - "Import in order: Organizations, Persons, Leads, Deals, then activities and notes."
  - "Rebuild the handful of automations that matter as Pipedrive workflows, and route the rest to an external automation tool."
  - "Keep a read-only Salesforce licence for at least a year — formula-field history and audit trails will not exist anywhere else."
faq:
  - q: "Does Pipedrive have an official Salesforce import?"
    a: "Yes. Pipedrive ships an import wizard that connects to Salesforce and maps Accounts, Contacts, Leads and Opportunities, which preserves associations better than assembling CSVs by hand."
  - q: "What happens to Salesforce Cases in Pipedrive?"
    a: "Nothing — Pipedrive has no Case or ticket object. Teams using Service Cloud need a separate helpdesk, or they archive case history in Salesforce and start clean."
  - q: "Can Pipedrive replace Salesforce formula fields?"
    a: "No. Pipedrive has no formula field type. Simple derived values can be maintained with a workflow writing to a custom field; anything genuinely computed needs to live in a reporting tool instead."
  - q: "How long does a Salesforce to Pipedrive migration take?"
    a: "One to three weeks. The data transfer is quick; the time goes into deciding what to abandon and finding homes for the Salesforce features Pipedrive does not have."
---

Teams leaving Salesforce for Pipedrive are almost never doing it for a feature. They are doing it because Salesforce grew an administration overhead that outweighed the value, and Pipedrive's constraint — a sales pipeline tool that refuses to be a platform — is the actual product being bought.

That framing matters, because it changes what a good migration looks like. This is not a project to reproduce your Salesforce org in a cheaper system. It is a project to decide what you stop doing.

## Do the subtraction audit first

Before touching data, list every Salesforce object, automation and report, and mark each one: *moves*, *moves elsewhere*, or *retires*. Cases go to a helpdesk. Formula-driven reporting goes to a BI tool or a spreadsheet. Complex Flows go to an external automation platform or get deleted. Anything you cannot assign to one of those three buckets is a reason to reconsider the move — and better discovered in week one than week five.

## Leads actually have somewhere to go

One genuinely pleasant surprise: unlike HubSpot, Pipedrive has a real Leads Inbox that sits before the pipeline. Unconverted Salesforce Leads land there rather than being dumped into your person database. If you were relying on the Lead/Contact split for hygiene, the equivalent survives the move.

## Permissions get coarser — check this early

Salesforce's role hierarchy, sharing rules and field-level security have no Pipedrive counterpart. Pipedrive offers visibility groups, which handle "reps see their own deals, managers see everything" comfortably and not much beyond that. If your Salesforce org uses field-level security for compliance reasons, verify with whoever owns that requirement before the project starts, not after.

## Keep Salesforce as an archive longer than you think

Cases, audit trails, formula-field history and campaign influence data will exist in exactly one place after this migration, and it is not Pipedrive. A minimal read-only licence for twelve months is the cheapest insurance in the project.
