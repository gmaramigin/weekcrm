---
title: "How to Migrate from Pipedrive to Salesforce"
description: >-
  Pipedrive to Salesforce is a structural upgrade, not a lateral move. Persons need
  Accounts, Opportunities need Accounts, and you have to decide whether the Leads
  Inbox becomes the Salesforce Lead object.
from: pipedrive
to: salesforce
date: 2026-07-30
difficulty: Complex
duration: "4–6 weeks"
downtime: "None if loaded in parallel; freeze Pipedrive edits at cutover"
nativeImport: "No — Salesforce Data Loader or a third-party migration tool"
tldr: >-
  Organizations become Accounts, Persons become Contacts and Deals become
  Opportunities, but Salesforce enforces relationships Pipedrive never did. Design the
  org — record types, page layouts, sharing model — before loading anything, and use
  external ID fields holding the Pipedrive record IDs so reloads stay idempotent.
tags:
  - Pipedrive
  - Salesforce
  - Migration
  - CRM
objectMap:
  - from: "Organization"
    to: "Account"
    notes: "Direct match, and Salesforce supports deeper account hierarchies than Pipedrive's linked organizations."
  - from: "Person"
    to: "Contact"
    notes: "Salesforce contacts effectively require an Account. Persons with no organization need a placeholder account or must become Leads."
  - from: "Deal"
    to: "Opportunity"
    notes: "Opportunities require an AccountId. Any Pipedrive deal without an organization will fail the load until you assign one."
  - from: "Lead (Leads Inbox)"
    to: "Lead"
    notes: "Genuinely good news — Salesforce has a real Lead object, so the Leads Inbox has a proper destination rather than polluting Contacts."
  - from: "Activity"
    to: "Task / Event"
    notes: "Pipedrive's single Activity object splits by type. Calls and to-dos become Tasks, meetings become Events. Both WhoId and WhatId must resolve."
  - from: "Note"
    to: "Note / ContentNote"
    notes: "Loads after the parent record. Keep the Pipedrive parent ID to rebuild the link."
  - from: "Product / Deal product"
    to: "Product2 / OpportunityLineItem"
    notes: "Requires a Price Book in Salesforce, which Pipedrive has no equivalent of. Create a standard price book before loading line items."
  - from: "Custom field"
    to: "Custom field"
    notes: "Pipedrive per-pipeline fields become fields on Opportunity, optionally shown conditionally by record type."
transfers:
  - "Organizations, Persons, Leads and Deals with custom fields, once matching Salesforce fields exist."
  - "Deal values, currencies and close dates, preserving historical pipeline reporting."
  - "Activities and notes, loaded after their parent records with IDs mapped."
  - "Owner assignment, where Pipedrive users have Salesforce licences with matching emails."
  - "Won/lost status and lost reasons, mapped to Salesforce stage and a custom reason field."
blockers:
  - "**Pipedrive Workflow Automations.** Rebuild as Salesforce Flows. Different model, and Flow is considerably more capable — expect redesign rather than translation."
  - "**Insights dashboards.** Rebuild in Salesforce reports; nothing carries."
  - "**Email templates and sequences.** Pipedrive templates need recreating; Salesforce cadences are a separately licensed product."
  - "**Deals with no organization.** Salesforce will reject these. Decide a rule before loading."
  - "**Pipedrive's flat permission model.** Salesforce sharing is richer but must be designed. This is a project task, not a setting."
  - "**Products without a price book.** Line items cannot load until a price book exists."
steps:
  - "Design the Salesforce org first: record types, page layouts, picklists, and the role and sharing model."
  - "Run the gap queries in Pipedrive: deals with no organization, persons with no organization, persons with no email. Decide a rule for each."
  - "Create an external ID field on Account, Contact, Lead and Opportunity to hold the original Pipedrive record ID."
  - "Create a standard Price Book and load products before any line items."
  - "Load with Data Loader in dependency order — Accounts, Contacts, Leads, Opportunities, then Tasks, Events and Notes."
  - "Validate the entire load in a full sandbox, then repeat exactly in production."
  - "Rebuild automations as Flows, recreate reports, and keep Pipedrive read-only for a month."
faq:
  - q: "Does the Pipedrive Leads Inbox map to the Salesforce Lead object?"
    a: "Yes, and it is one of the cleaner parts of this migration. Both systems have a genuine pre-opportunity staging concept, so unconverted leads have a proper destination instead of being forced into the contact database."
  - q: "Why do my Pipedrive deals fail to load as Opportunities?"
    a: "Almost always because they have no linked organization. Salesforce Opportunities require an AccountId. Run that query in Pipedrive first and decide whether those deals get a placeholder account or are excluded."
  - q: "Should I use external ID fields?"
    a: "Yes. Put the original Pipedrive record ID into an external ID field on every object. It makes failed batches re-runnable without creating duplicates, and turns reconciliation into a simple join."
  - q: "How long does a Pipedrive to Salesforce migration take?"
    a: "Four to six weeks. The record volumes are usually small; the schedule is dominated by designing the Salesforce org and rebuilding automations as Flows."
---

Teams move from Pipedrive to Salesforce for one of two reasons: they have outgrown Pipedrive's reporting and permission model, or a new stakeholder has standardised on Salesforce. Either way, the important reframe is that this is not a data transfer. Pipedrive made almost no structural demands of you. Salesforce makes many, and satisfying them is the project.

## Salesforce enforces relationships Pipedrive did not

Run these three queries in Pipedrive before you plan anything:

- Deals with no linked organization
- Persons with no linked organization
- Persons with no email address

In a typical account each returns more rows than anyone expects. Salesforce Opportunities require an Account, and Contacts effectively do too. Every row in those results needs a rule — placeholder account, Lead conversion, or exclusion — and applying those rules consistently is a meaningful chunk of the data prep.

## Design the org before you load

Record types, page layouts, picklist values, the role hierarchy and the sharing model all have to exist before data lands. Loading into a half-modelled org means loading twice, and the second load is harder because you now have IDs and relationships to preserve.

This is where the four-to-six weeks goes. The Data Loader runs in an afternoon.

## External IDs pay for themselves immediately

Create a custom external ID field on Account, Contact, Lead and Opportunity, and populate each with the original Pipedrive record ID.

The benefits compound: failed batches become re-runnable without duplicating records, activity loads can resolve their parents by external ID instead of Salesforce ID, and reconciliation between the two systems is a join rather than a fuzzy name match. It costs four custom fields.

## Price books exist and Pipedrive has no concept of them

If you use Pipedrive products, note that Salesforce requires a Price Book before opportunity line items can be created. There is no Pipedrive equivalent, so nothing in your export will tell you this — it just fails at load time. Create a standard price book, load Product2 records, then load line items.

## Flows are a redesign, not a port

Pipedrive automations are simple by design: a trigger, a condition, an action. Salesforce Flow is a full orchestration engine. Translating recipe by recipe produces a sprawl of tiny Flows that nobody can maintain.

List the outcomes you need instead, and build the smallest set of Flows that delivers them. Teams that do this typically end up with a third as many automations as they started with.
