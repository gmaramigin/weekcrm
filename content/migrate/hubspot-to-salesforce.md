---
title: "How to Migrate from HubSpot to Salesforce"
description: >-
  Moving up-market to Salesforce means inventing structure HubSpot never asked you
  for: record types, the Lead object, sharing rules and validation. The data moves
  in days; the data model takes weeks.
from: hubspot
to: salesforce
date: 2026-07-30
difficulty: Complex
duration: "4–8 weeks"
downtime: "None if you sync in parallel, but freeze HubSpot edits at cutover"
nativeImport: "Partial — Salesforce Data Loader plus the HubSpot-Salesforce connector"
tldr: >-
  Companies become Accounts, Contacts become Contacts and Deals become Opportunities,
  but Salesforce will demand decisions HubSpot never forced: whether you use the Lead
  object at all, what your record types are, and how sharing works. Model the org
  first, load with Data Loader in dependency order, and expect four to eight weeks.
tags:
  - HubSpot
  - Salesforce
  - Migration
  - CRM
objectMap:
  - from: "Company"
    to: "Account"
    notes: "Direct match. HubSpot parent/child companies map to Salesforce parent accounts, and Salesforce supports deeper hierarchies than HubSpot did."
  - from: "Contact"
    to: "Contact (or Lead)"
    notes: "The core decision. Salesforce contacts must be attached to an Account. Unattached HubSpot contacts either become Leads or need a placeholder account."
  - from: "Deal"
    to: "Opportunity"
    notes: "Opportunities require an Account. Any HubSpot deal with no associated company will fail the load until you assign one."
  - from: "Ticket"
    to: "Case"
    notes: "Requires Service Cloud. Ticket pipelines map to Case record types plus status picklists."
  - from: "Task / Meeting / Call"
    to: "Task / Event"
    notes: "HubSpot meetings become Salesforce Events; calls and tasks become Tasks with an activity type. WhoId and WhatId must both resolve or the activity orphans."
  - from: "Custom object"
    to: "Custom object"
    notes: "Easier in this direction — Salesforce custom objects are available on far more editions than HubSpot's Enterprise-only equivalent."
  - from: "List (active/static)"
    to: "Report / Campaign / List View"
    notes: "Active lists have no true equivalent. Dynamic membership becomes a report or a scheduled Flow that maintains a campaign."
  - from: "Lifecycle Stage"
    to: "Lead Status + Account/Contact fields"
    notes: "One HubSpot property splits across several Salesforce fields, and the split depends on whether you adopt the Lead object."
transfers:
  - "Company, Contact and Deal records with their custom fields, once matching Salesforce fields exist."
  - "Open and closed deal history including original close dates and amounts."
  - "Notes and logged activities, provided the parent record loads first and IDs are mapped."
  - "Owner assignment, if every HubSpot user has a Salesforce licence with a matching email."
  - "Email engagement history, through the HubSpot-Salesforce connector rather than a flat export."
blockers:
  - "**HubSpot Workflows.** No export. Rebuild as Salesforce Flows, which is a genuinely different mental model — declarative but far more explicit."
  - "**Marketing email, landing pages and forms.** These are HubSpot product features, not data. Salesforce has no like-for-like unless you also buy Marketing Cloud or Account Engagement."
  - "**Active lists.** Salesforce list views and reports are query-time, not membership-based. Anything depending on list membership as a trigger needs redesign."
  - "**HubSpot sequences.** Rebuild in Salesforce Engagement/Cadences, which is a separate licensed product."
  - "**Reports and dashboards.** Nothing carries over, and Salesforce reporting is object-relationship-driven rather than property-driven."
  - "**Free-form contacts with no company.** Salesforce's data model is stricter. Every Contact needs an Account or must become a Lead."
steps:
  - "Design the Salesforce org first: objects, record types, page layouts, picklists and the sharing model. This is the real project."
  - "Decide the Lead question — whether HubSpot contacts below a lifecycle threshold become Leads or all become Contacts on a placeholder Account."
  - "Export HubSpot data with record IDs intact, so you can rebuild associations after load."
  - "Load in strict dependency order with Data Loader: Accounts, Contacts, Opportunities, then activities. Keep the external-ID mapping file."
  - "Use an external ID field on each Salesforce object holding the original HubSpot record ID — this makes re-runs idempotent and reconciliation trivial."
  - "Validate in a full sandbox before touching production, then repeat the exact load in production."
  - "Rebuild Flows, reports and permissions, and keep a HubSpot seat live for marketing assets you did not replace."
faq:
  - q: "Is moving from HubSpot to Salesforce harder than the reverse?"
    a: "Usually yes. Salesforce enforces structure HubSpot does not — Contacts need Accounts, Opportunities need Accounts, and you must decide record types and a sharing model up front. The data volume is rarely the constraint; the org design is."
  - q: "What happens to my HubSpot marketing emails and landing pages?"
    a: "They do not migrate. They are product features rather than records. Salesforce needs Marketing Cloud or Account Engagement to replace them, which is a separate purchase and a separate project."
  - q: "Do I have to use the Salesforce Lead object?"
    a: "No, but you should decide deliberately. Many teams coming from HubSpot skip Leads entirely and run a contact-only model, which keeps the HubSpot mental model intact at the cost of some standard Salesforce reporting."
  - q: "How long does a HubSpot to Salesforce migration take?"
    a: "Four to eight weeks. Loading records takes days; designing the org, rebuilding automations as Flows and reproducing reporting is what consumes the schedule."
---

Most CRM migrations are a lateral move. This one is not — teams leave HubSpot for Salesforce because they have outgrown a system that made decisions for them, and Salesforce will hand every one of those decisions back.

## The org design is the migration

It is tempting to treat this as a data-loading exercise. It is not. Before a single record moves, you need to have settled record types, page layouts, picklist values, the sharing and role model, and whether you adopt the Lead object. Loading data into an unmodelled org just means loading it twice.

## Salesforce is stricter about relationships

HubSpot lets a contact float with no company and a deal exist with no company attached. Salesforce does not: Opportunities require an Account, and Contacts effectively do too. Run that query in HubSpot before you start — the count of unassociated contacts and deals is usually higher than anyone expects, and each one needs a rule. Placeholder account, Lead conversion, or exclusion. Pick one and apply it consistently.

## Use external IDs and thank yourself later

Create a custom external-ID field on each Salesforce object and populate it with the original HubSpot record ID. It costs nothing at load time and it makes everything downstream easier: re-running a failed batch becomes idempotent, reconciliation is a join rather than a fuzzy match, and if you need to re-pull an object six weeks later the associations still line up.

## Marketing is a separate project

The hardest conversation in this migration is usually not technical. HubSpot's marketing email, forms and landing pages are product features that simply have no Salesforce counterpart at the Sales Cloud tier. Either budget for Account Engagement or Marketing Cloud, or plan to keep a reduced HubSpot Marketing subscription running alongside Salesforce. Discovering this at cutover week is a bad time.
