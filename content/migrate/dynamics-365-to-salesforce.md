---
title: "How to Migrate from Dynamics 365 Sales to Salesforce"
description: >-
  Two enterprise platforms with near-identical object models and completely different
  extension stacks. The records move predictably. Power Automate flows, plugins and
  the Microsoft 365 dependencies are the migration.
from: dynamics-365
to: salesforce
date: 2026-07-30
difficulty: Complex
duration: "8–16 weeks"
downtime: "None if run in parallel; freeze Dynamics edits at cutover"
nativeImport: "No — Dataverse export plus Salesforce Data Loader or Bulk API"
tldr: >-
  Dynamics Accounts, Contacts, Leads and Opportunities map almost exactly onto their
  Salesforce equivalents, so the object mapping is the easy half. The schedule belongs
  to Power Automate flows, Dataverse plugins, business rules, and the Outlook and
  Teams integrations that reps use every day.
tags:
  - Dynamics 365
  - Salesforce
  - Migration
  - CRM
objectMap:
  - from: "Account"
    to: "Account"
    notes: "Direct match including parent hierarchies. Dynamics allows deeper nesting than most Salesforce orgs use in practice."
  - from: "Contact"
    to: "Contact"
    notes: "Both expect an account relationship, so this loads cleanly — one of the few migrations where that is true."
  - from: "Lead"
    to: "Lead"
    notes: "Both have a genuine Lead object with a qualification process. Map lead status and qualification outcomes explicitly."
  - from: "Opportunity"
    to: "Opportunity"
    notes: "Dynamics sales process stages map to Salesforce stages plus forecast categories. Recreate probability and forecast category per stage."
  - from: "Quote / Order / Invoice"
    to: "Quote / — / —"
    notes: "Dynamics has full order-to-invoice objects. Salesforce has Quotes only as standard — orders and invoices need CPQ, an ERP, or Revenue Cloud."
  - from: "Case"
    to: "Case"
    notes: "Requires Service Cloud. Entitlements and SLAs exist on both sides but are configured very differently."
  - from: "Custom Table (Dataverse)"
    to: "Custom Object"
    notes: "Conceptually equivalent. The difficulty is that Dataverse tables are often shared with Power Apps outside the CRM."
  - from: "Activity (Task / Phone Call / Appointment / Email)"
    to: "Task / Event"
    notes: "Dynamics' four activity types collapse into two Salesforce objects with a type field. Map each explicitly."
transfers:
  - "Accounts, Contacts, Leads and Opportunities including custom columns, once matching Salesforce fields exist."
  - "Opportunity amounts, currencies, close dates, probability and stage history."
  - "Activities of all four Dynamics types, mapped onto Task and Event."
  - "Notes and attachments, via Dataverse export and Salesforce ContentVersion upload."
  - "Owner assignment, where Dynamics users have Salesforce licences with matching emails."
blockers:
  - "**Power Automate flows.** No translation path. Every flow rebuilds as Salesforce Flow or an external integration, and Power Automate reaches far outside the CRM."
  - "**Dataverse plugins and custom workflow assemblies.** Server-side .NET code. None of it ports; the behaviour becomes Apex or an external service."
  - "**Business rules and business process flows.** Dynamics' declarative logic rebuilds as validation rules plus Flow. Conceptually similar, mechanically different."
  - "**Shared Dataverse tables.** If Power Apps or other Microsoft workloads read the same tables, removing Dynamics does not remove the dependency. Audit this early."
  - "**Outlook and Teams integration.** Deep and daily-used. Salesforce has equivalents, but the reps' habits are Microsoft-shaped and retraining is real."
  - "**Orders and Invoices.** No standard Salesforce object. Needs CPQ, Revenue Cloud, or an ERP."
steps:
  - "Audit the Dataverse environment for tables and flows used by anything other than Dynamics 365 Sales — Power Apps dependencies are the classic hidden scope."
  - "Inventory every Power Automate flow, plugin and business rule, marking each rebuild, replace externally, or retire."
  - "Decide where Orders and Invoices live post-migration; this frequently pulls in the finance team and its own timeline."
  - "Design the Salesforce org: record types, page layouts, forecast categories, sharing model, entitlements if using Service Cloud."
  - "Create external ID fields holding Dataverse GUIDs on every object, so reloads are idempotent and activity parents resolve."
  - "Export from Dataverse and load with Data Loader or Bulk API in order: Accounts, Contacts, Leads, Opportunities, then activities and notes."
  - "Validate in a full sandbox, run a parallel period of at least a month, then cut over and keep Dynamics read-only for a year."
faq:
  - q: "Is Dynamics 365 to Salesforce a like-for-like migration?"
    a: "At the object level, unusually close — both have Accounts, Contacts, Leads and Opportunities with similar semantics. The divergence is in the extension stack: Power Automate, Dataverse plugins and the Microsoft 365 integrations have no Salesforce counterpart and must be rebuilt."
  - q: "What happens to Power Automate flows?"
    a: "They have to be rebuilt as Salesforce Flow or external integrations. Complicating this, Power Automate flows frequently span beyond CRM into SharePoint, Teams and Outlook, so some may need to survive independently of the migration."
  - q: "Do Dynamics Orders and Invoices have a Salesforce equivalent?"
    a: "Not as standard. Salesforce ships a Quote object; orders and invoices require CPQ, Revenue Cloud, or an ERP integration. For teams using the full Dynamics order-to-cash chain this is usually the biggest scope item in the project."
  - q: "How long does a Dynamics 365 to Salesforce migration take?"
    a: "Eight to sixteen weeks for a typical enterprise deployment. Data loading is a small fraction of that; the schedule is set by rebuilding Power Automate logic and untangling shared Dataverse dependencies."
---

This is one of the few CRM migrations where the object mapping genuinely is straightforward. Microsoft and Salesforce arrived at the same core model — Accounts, Contacts, Leads, Opportunities, Activities — with similar semantics and similar relationship rules. Contacts expect accounts on both sides. Leads have a real qualification process on both sides. Data loads with fewer surprises than almost any other route into Salesforce.

The difficulty is entirely above the data layer.

## Dataverse is bigger than your CRM

Dynamics 365 Sales sits on Dataverse, and Dataverse is a general-purpose platform. In most organisations of any size, other things are reading and writing those tables: Power Apps built by a department, Power BI reports, Power Automate flows that fire on record changes, integrations with SharePoint or an internal portal.

Removing Dynamics does not remove those dependencies. Audit the environment for everything touching the tables you are migrating, before you scope anything else. Discovering in week ten that a warehouse app writes to the Account table is how this project doubles.

## Power Automate reaches outside the CRM

Flow inventories in Dynamics environments are long, and a meaningful share of them are not really CRM automations at all — they post to Teams, file documents in SharePoint, trigger approvals in Outlook.

Sort them into three buckets: pure CRM logic that becomes Salesforce Flow, cross-system logic that becomes an integration, and logic that should keep running in Power Automate reading from Salesforce instead. That third bucket is legitimate and often the cheapest answer.

## Plugins are invisible until they break

Dataverse plugins and custom workflow assemblies are compiled .NET running server-side. They do not appear in any user-facing list and they frequently encode business-critical validation. Get a directory listing from whoever owns the environment during discovery, not during testing.

## Order-to-cash needs a decision and a stakeholder

Dynamics ships Quote, Order and Invoice as first-class objects, and organisations that adopted the full chain are running a real order-to-cash process inside the CRM. Salesforce gives you Quotes and stops.

The replacement — CPQ, Revenue Cloud, or an ERP integration — is a separate purchase, a separate implementation and usually a separate budget owner. Raise it in week one. It is the single most common reason these projects slip.

## The Microsoft habit is a real cost

Reps in a Dynamics shop live in Outlook and Teams, with CRM surfaced inside them. Salesforce has capable equivalents, but the daily rhythm changes. Budget training time and expect a genuine adoption dip in the first month — planning for it is the difference between a dip and a rollback.
