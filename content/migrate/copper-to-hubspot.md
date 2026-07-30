---
title: "How to Migrate from Copper to HubSpot"
description: >-
  Copper lives inside Gmail and quietly derives half its data from your inbox. Moving
  to HubSpot means re-establishing that email relationship — and deciding what happens
  to Copper Projects, which HubSpot has no object for.
from: copper
to: hubspot
date: 2026-07-30
difficulty: Moderate
duration: "1–2 weeks"
downtime: "None — Copper stays live during import"
nativeImport: "No — CSV export per object, or API"
tldr: >-
  Copper's People, Companies and Opportunities map cleanly to HubSpot Contacts,
  Companies and Deals. The two things that need real decisions are Copper Projects,
  which have no HubSpot counterpart, and email history, which Copper reads live from
  Gmail rather than storing — so connect HubSpot's inbox integration on day one.
tags:
  - Copper
  - HubSpot
  - Migration
  - CRM
objectMap:
  - from: "Company"
    to: "Company"
    notes: "Direct match. Copper's domain field becomes the HubSpot dedupe key, so check it is populated before exporting."
  - from: "Person"
    to: "Contact"
    notes: "Clean. Copper allows people without email addresses; those will not create in HubSpot and need handling separately."
  - from: "Lead"
    to: "Contact (Lifecycle Stage = Lead)"
    notes: "Copper leads are pre-conversion records holding both person and company data on one row. Split them into contact plus company on export, or import as contacts only."
  - from: "Opportunity"
    to: "Deal"
    notes: "Copper pipelines map to HubSpot pipelines. Create every stage in HubSpot first, including stage win probability."
  - from: "Project"
    to: "— (no equivalent)"
    notes: "The real gap. HubSpot has no project object below Enterprise custom objects. Post-sale delivery tracking usually moves to a separate tool."
  - from: "Task"
    to: "Task"
    notes: "Maps directly, but requires the parent record to import first."
  - from: "Activity / logged call"
    to: "Call / Note"
    notes: "Copper activity types need mapping to HubSpot engagement types explicitly."
  - from: "Email (Gmail-derived)"
    to: "Email engagement"
    notes: "Copper reads email from Gmail rather than owning it. Connect HubSpot's Gmail integration and history rebuilds from the mailbox — it does not come from the Copper export."
transfers:
  - "Companies, People and Opportunities with custom fields, once matching HubSpot properties exist."
  - "Pipeline stage, deal value, close date and win/loss status."
  - "Tasks and logged activities, when imported after their parent records."
  - "Owner assignment, if Copper users have HubSpot seats with matching email addresses."
  - "Email history indirectly — by connecting HubSpot to the same Google Workspace mailboxes Copper was reading."
blockers:
  - "**Copper Projects.** HubSpot has no project object outside Enterprise custom objects. Delivery and onboarding tracking needs a new home."
  - "**The Gmail sidebar workflow.** HubSpot has a Gmail extension, but the interaction model differs enough that reps need retraining, not just reinstallation."
  - "**Copper workflow automations.** No export path. Rebuild in HubSpot Workflows."
  - "**Reports and dashboards.** Rebuild in HubSpot reporting; nothing carries over."
  - "**Related-record links between Projects and Opportunities.** These disappear along with Projects — snapshot them if the mapping matters."
steps:
  - "Check that every Copper company has a domain and every person has an email. These are HubSpot's dedupe keys and gaps cause duplicates."
  - "Decide where Copper Projects go — a project tool, a HubSpot Enterprise custom object, or retired — before you export anything."
  - "Create HubSpot pipelines, stages and custom properties, including a property for any Copper lead-only field."
  - "Export Companies, People, Leads and Opportunities from Copper as CSV, keeping the record IDs."
  - "Import into HubSpot in order: Companies, Contacts, Deals, then tasks and activities."
  - "Connect HubSpot's Gmail integration for every rep on day one so email history starts rebuilding from the mailbox."
  - "Rebuild automations and reports, then keep Copper read-only for a month for Project history."
faq:
  - q: "Does email history transfer from Copper to HubSpot?"
    a: "Not through the export. Copper reads email live from Gmail rather than storing its own copy, so the way to recover history is to connect HubSpot's Gmail integration to the same mailboxes and let it log against the matching contacts."
  - q: "What happens to Copper Projects in HubSpot?"
    a: "There is no equivalent object below HubSpot Enterprise custom objects. Most teams move delivery tracking to a dedicated project tool, or rebuild it as a second HubSpot pipeline if the workflow is simple enough."
  - q: "Is there a native Copper to HubSpot importer?"
    a: "No first-party connector. You export each Copper object to CSV or pull via the Copper API, then use HubSpot's standard import in dependency order."
  - q: "How long does a Copper to HubSpot migration take?"
    a: "One to two weeks for most teams. Copper accounts tend to be small and clean, so the schedule is driven by the Projects decision and by getting the Gmail integration rolled out to every rep."
---

Copper's defining feature is that it does not feel like a separate application. It lives in the Gmail sidebar, it derives contacts and email history from Google Workspace, and it asks for very little manual data entry. That design makes Copper pleasant to use and slightly awkward to leave, because a meaningful share of what you see in Copper is not stored in Copper.

## Email history is not in the export

This surprises almost everyone. When you export from Copper, you get records and fields — not the email threads displayed on those records. Copper is reading them from Gmail in real time. The good news is that HubSpot works similarly: connect its Gmail integration and it will log email against matching contacts from the same mailboxes.

The practical consequence is that the inbox connection is not a nice-to-have you schedule for week three. It is part of the data migration, and it needs to be live for every rep on the day you cut over, otherwise there is a visible gap in the record history.

## Projects are the decision that shapes the project

Copper includes a Projects object for post-sale work — onboarding, delivery, implementation. HubSpot has nothing equivalent unless you are on Enterprise and willing to build a custom object. Teams tend to land in one of three places: move delivery into a real project tool, model it as a second HubSpot pipeline if the stages are simple, or accept that historical project data stays in a read-only Copper account.

Make this call before exporting, because the answer determines whether Project-to-Opportunity links need snapshotting.

## Fill the dedupe keys while you still have Copper's context

HubSpot matches companies on domain and contacts on email. Copper is more permissive. Run the gap report in Copper — companies with no domain, people with no email — and fix it there, where you can still see which record is which. Post-import merging in HubSpot is slower and harder to reverse.

## Budget for retraining, not just reinstallation

HubSpot has a Gmail extension, so on paper the workflow survives. In practice Copper reps do most of their work in the sidebar and HubSpot expects more time in the main application. This is the most common source of adoption complaints after a Copper migration, and it is a training problem rather than a data one.
