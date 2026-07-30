---
title: "How to Migrate from Salesforce to Attio"
description: >-
  Salesforce to Attio is a deliberate simplification. Accounts, Contacts and
  Opportunities land cleanly; record types, Flows, validation rules and Apex do not
  come with you — and for most teams making this move, that is the point.
from: salesforce
to: attio
date: 2026-07-30
difficulty: Moderate
duration: "2–4 weeks"
downtime: "None — Salesforce stays live during import"
nativeImport: "Partial — Attio CSV import with mapping, plus the Attio API"
tldr: >-
  Accounts become Companies, Contacts become People and Opportunities become Deals or
  List entries. Attio's flexible attributes absorb most Salesforce custom fields, but
  there is no equivalent for record types, validation rules, Flow or Apex. Audit what
  those were enforcing before you assume you can drop them.
tags:
  - Salesforce
  - Attio
  - Migration
  - CRM
objectMap:
  - from: "Account"
    to: "Company"
    notes: "Direct. Attio auto-enriches from the domain, so a clean website field matters more than the firmographic fields you are exporting."
  - from: "Contact"
    to: "Person"
    notes: "Attio keys and enriches people on email. Salesforce contacts with no email are much less useful in Attio."
  - from: "Lead"
    to: "Person, or a List entry"
    notes: "Attio has no separate Lead object. Unconverted leads become People — often better modelled as entries on a prospecting List than mixed into the main person database."
  - from: "Opportunity"
    to: "Deal (or List)"
    notes: "Use the Deals object for revenue pipelines; use a List when the pipeline is really a non-revenue process with its own per-entry data."
  - from: "Case"
    to: "— (no equivalent)"
    notes: "Attio is not a support tool. Case history moves to a helpdesk or stays archived in Salesforce."
  - from: "Custom field"
    to: "Attribute"
    notes: "Attio's attribute types are expressive — record references, status, multi-select, currency — so some Salesforce text fields can be upgraded during the move."
  - from: "Custom object"
    to: "Custom object"
    notes: "Available in Attio without an Enterprise tier, which is a rare case of the smaller product being more permissive."
  - from: "Report / Dashboard"
    to: "View / Report"
    notes: "Attio reporting is lighter. Anything genuinely analytical belongs in a BI tool reading from Attio's API."
transfers:
  - "Accounts, Contacts and Opportunities with custom fields mapped onto Attio attributes."
  - "Opportunity amounts, stages and close dates, once your Attio pipeline exists."
  - "Notes and tasks, imported after their parent records."
  - "Owner assignment, where Salesforce users have Attio seats with matching emails."
  - "Email and calendar history going forward, once each user connects their mailbox."
blockers:
  - "**Record types and page layouts.** No Attio equivalent. Two sales motions in one Salesforce org become two Attio Lists or two pipeline stages sets."
  - "**Validation rules.** Attio does not block saves the way Salesforce does. Data quality becomes convention plus automation rather than enforcement."
  - "**Flow, Process Builder and Apex.** Rebuild as Attio automations, or move the logic to an external tool. Apex has no counterpart at all."
  - "**Formula and roll-up summary fields.** Attio has no formula field type; derived values need an automation writing a plain attribute, or a BI layer."
  - "**Cases and Service Cloud.** A separate helpdesk is required."
  - "**Sharing rules and field-level security.** Attio's permission model is far simpler. Verify this is acceptable before committing."
steps:
  - "Audit what your validation rules and required fields were actually enforcing — that is the data quality you are about to make voluntary."
  - "Decide which Opportunities become Attio Deals and which are better as Lists; Salesforce orgs often carry non-revenue pipelines in the Opportunity object."
  - "Clean the Account website field and Contact email field — these drive Attio's enrichment and matching."
  - "Design the Attio workspace: objects, attributes, Lists and pipeline stages, before importing."
  - "Export from Salesforce with record IDs, then import Companies, People and Deals in that order."
  - "Rebuild the automations that matter in Attio and route anything complex to an external automation tool."
  - "Connect mailboxes and calendars for every user, then keep a read-only Salesforce licence for a year of history."
faq:
  - q: "Does Attio support custom objects like Salesforce?"
    a: "Yes, and without requiring a top tier. Attio custom objects with typed attributes and record references cover most of what teams used Salesforce custom objects for, though without validation rules or Apex triggers."
  - q: "What replaces Salesforce validation rules in Attio?"
    a: "Nothing that blocks a save. Attio does not enforce data quality at write time the way Salesforce does. You can flag problems with automations and views, but if hard enforcement is a compliance requirement, test this carefully before committing."
  - q: "Where do Salesforce Leads go in Attio?"
    a: "Attio has no separate Lead object, so they become People. The better pattern is usually to put unqualified leads on a dedicated prospecting List rather than mixing them into the main person database, which keeps the working set clean."
  - q: "How long does a Salesforce to Attio migration take?"
    a: "Two to four weeks. Record loading is fast; the schedule goes into deciding what your Salesforce customisation was actually protecting and finding homes for cases and reporting."
---

Teams leaving Salesforce for Attio have usually concluded that their org became a maintenance project. Every field, every validation rule, every Flow was added for a reason, and collectively they now cost more attention than the CRM returns.

Attio is the opposite bet: a flexible data model, fast interface, automatic enrichment, and almost no enforcement machinery. Whether that trade works depends entirely on what your enforcement machinery was doing.

## Audit the rules before you drop them

Pull a list of every validation rule, required field and record-type restriction in the Salesforce org, and for each one ask what breaks if it disappears.

Some exist to prevent genuine data corruption — a close date before an open date, a currency mismatch. Some encode a compliance requirement. And a great many exist because someone in 2019 was annoyed about blank fields and nobody has revisited it since.

Attio will not reproduce the first two categories. If they matter, you need a plan — automations that flag violations, a review view, or accepting the risk deliberately. Discovering this after cutover is how teams end up with a fast CRM full of unusable data.

## Not every Opportunity is a deal

Salesforce orgs accumulate pipelines. Sales, obviously — but also renewals, partnerships, sometimes recruitment, all crammed into the Opportunity object with record types keeping them apart.

Attio splits this cleanly. Revenue pipelines belong on the Deals object. Everything else is usually better as a List, where each entry carries its own attributes independent of the underlying company or person. This is the part of the migration where the new model genuinely improves on the old one, and it is worth the design time.

## Let go of the firmographic fields

A mature Salesforce Account record carries dozens of descriptive fields, many populated by a data provider years ago and never refreshed. Attio enriches companies from the domain continuously.

Import the fields that hold your own judgement — tier, owner, relationship context, strategic notes — and let Attio look up industry, headcount and location. This shrinks the mapping exercise substantially and produces fresher data than you had.

Which makes the Account website field the most important column in the export. Clean it before anything else.

## Keep Salesforce as an archive

Cases, audit history, formula-field values and campaign influence will exist in exactly one place after this migration. A minimal read-only licence for a year is inexpensive and removes any pressure to migrate reporting perfectly.
