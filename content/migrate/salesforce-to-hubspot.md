---
title: "How to Migrate from Salesforce to HubSpot"
description: >-
  Salesforce and HubSpot agree on Accounts, Contacts and Opportunities. Everything
  built on top of those — Leads, record types, formula fields and Flows — is where
  the migration actually costs you time.
from: salesforce
to: hubspot
date: 2026-07-30
difficulty: Complex
duration: "3–6 weeks"
downtime: "None — run both systems in parallel via the native sync"
nativeImport: "Yes — HubSpot's Salesforce integration (bi-directional)"
tldr: >-
  Use HubSpot's native Salesforce integration rather than CSVs: it maps Accounts to
  Companies, Contacts to Contacts and Opportunities to Deals while both systems stay
  live. Budget the real effort for the things that have no counterpart — the Lead
  object, record types, formula fields, validation rules and every Flow — which all
  have to be re-modelled by hand.
tags:
  - Salesforce
  - HubSpot
  - Migration
  - CRM
objectMap:
  - from: "Account"
    to: "Company"
    notes: "Clean one-to-one. Parent/child account hierarchies map to HubSpot's parent-child company association, but only one level deep is well supported."
  - from: "Contact"
    to: "Contact"
    notes: "HubSpot keys contacts on email address. Salesforce contacts with no email will not create — export them separately and assign placeholder addresses or drop them."
  - from: "Lead"
    to: "Contact (Lifecycle Stage = Lead)"
    notes: "The biggest structural change. HubSpot has no standalone importable Lead object, so unconverted leads become contacts. Decide up front whether stale leads come across at all."
  - from: "Opportunity"
    to: "Deal"
    notes: "Map stages first — HubSpot pipelines need every stage to exist before import or records land in the default stage."
  - from: "Case"
    to: "Ticket"
    notes: "Requires Service Hub. Without it, cases have nowhere to go and should be archived in Salesforce or exported to a warehouse."
  - from: "Task / Event"
    to: "Task / Meeting"
    notes: "Salesforce Events become HubSpot Meetings, Tasks stay Tasks. Both need the associated record imported first or the activity orphans."
  - from: "Campaign / Campaign Member"
    to: "Marketing Campaign / list membership"
    notes: "Needs Marketing Hub. Campaign influence attribution does not survive — historical ROI reporting stays in Salesforce."
  - from: "Custom Object"
    to: "Custom Object"
    notes: "HubSpot custom objects are Enterprise-tier only. On Professional you flatten them into properties on an existing object or lose them."
transfers:
  - "Standard field data on Accounts, Contacts and Opportunities, including most custom fields once you pre-create matching HubSpot properties."
  - "Owner assignment, provided every Salesforce user has a HubSpot seat with a matching email address before you sync."
  - "Notes, logged calls and email history through the native integration — CSV imports will not carry these."
  - "Files and attachments up to HubSpot's per-file size cap, though they land on the record rather than in a folder structure."
  - "Open and closed deal history with original close dates, which keeps your win-rate reporting intact from day one."
blockers:
  - "**Formula fields.** HubSpot calculated properties are far more limited. Anything cross-object or multi-step has to be recreated as a workflow that writes to a plain property."
  - "**Record types and page layouts.** HubSpot has no record-type concept. Teams that used record types to run two sales motions in one org usually end up with two pipelines plus conditional property logic."
  - "**Validation rules and required-field logic.** These do not export. Rebuild the critical ones as required properties or workflow-based data-quality alerts."
  - "**Workflow Rules, Process Builder and Flows.** Every automation is a manual rebuild in HubSpot Workflows. Inventory them first — most orgs discover half are dormant."
  - "**Reports and dashboards.** Nothing carries over. Rebuild only the reports someone actually opened in the last quarter."
  - "**Role hierarchy and sharing rules.** HubSpot's permission model is teams and partitioning, and partitioning is Enterprise-only. Granular row-level sharing usually cannot be reproduced exactly."
steps:
  - "Freeze schema changes in Salesforce and export a full field inventory per object. This is your reconciliation baseline."
  - "Create every HubSpot property you need *before* touching data — including pipeline stages and lifecycle stages — so nothing lands in a default bucket."
  - "Provision HubSpot seats for all Salesforce users with identical email addresses, so ownership resolves automatically."
  - "Install the native Salesforce integration and run it in selective sync mode against a sandbox or a single test list first."
  - "Sync in dependency order: Companies, then Contacts, then Deals, then activities. Activities imported before their parent record will orphan."
  - "Run both systems in parallel for two to four weeks with Salesforce read-only for the sales team, and reconcile record counts per object weekly."
  - "Rebuild automations and reports in HubSpot, then cut Salesforce to a read-only archive licence rather than cancelling outright."
faq:
  - q: "Can I move from Salesforce to HubSpot without downtime?"
    a: "Yes. HubSpot's native Salesforce integration is bi-directional, so both systems stay live while records sync. Most teams keep Salesforce running read-only for a few weeks and cut over once record counts reconcile."
  - q: "What happens to Salesforce Leads in HubSpot?"
    a: "They become Contacts with a Lifecycle Stage of Lead. HubSpot does not have a separate importable Lead object, so the Lead/Contact split you relied on in Salesforce has to be re-expressed through lifecycle stages and lists."
  - q: "Do Salesforce formula fields work in HubSpot?"
    a: "Not directly. HubSpot calculated properties handle simple arithmetic on the same record. Cross-object or conditional formulas need to be rebuilt as workflows that write a value into a normal property."
  - q: "How long does a Salesforce to HubSpot migration take?"
    a: "Three to six weeks for a typical mid-market org. The data sync itself is days; the schedule is dominated by rebuilding automations, reports and permissions that have no direct equivalent."
---

Salesforce and HubSpot look closer than they are. The nouns line up — Accounts, Contacts, Opportunities — and that similarity is exactly what makes teams underestimate the move. The data transfer is the easy part. What takes three to six weeks is everything a mature Salesforce org accumulated *around* the data.

## Use the native integration, not a CSV

CSV exports are tempting because they are fast, but they strip the two things that matter most: activity history and record relationships. HubSpot's Salesforce integration syncs both, and because it is bi-directional you can run it while sales keeps working. Point it at a single test list first — a hundred accounts with their contacts, deals and activities — and reconcile the result field by field before you widen the scope.

## Decide the Lead question before anything else

This is the decision that shapes the whole project. Salesforce's Lead object has no importable counterpart in HubSpot; unconverted leads arrive as Contacts with a Lifecycle Stage of Lead. For most teams that is an improvement, because the artificial Lead/Contact wall disappears. But it means your list segmentation, routing rules and MQL definitions all have to be re-expressed in lifecycle stages and active lists. Teams that skip this step import three years of dead leads into their contact tier and get an unpleasant surprise on the next invoice, since HubSpot's marketing pricing scales with marketing contacts.

## Audit automations before you rebuild them

Export a list of every Workflow Rule, Process Builder and Flow in the org, then check the last-modified and last-run dates. In a Salesforce instance older than three years, a large share is dormant — built for a process that no longer exists. Rebuilding those in HubSpot Workflows is pure waste. Rebuild what fires, retire the rest, and you cut the longest phase of the project substantially.

## Keep Salesforce as an archive

Do not cancel the moment the sync completes. Historical campaign-influence attribution, audit trails and any report built on formula fields will not exist in HubSpot. A minimal read-only Salesforce licence for a year is cheap insurance, and it removes the pressure to migrate reporting perfectly on day one.
