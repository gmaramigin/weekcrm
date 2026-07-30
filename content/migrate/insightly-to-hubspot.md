---
title: "How to Migrate from Insightly to HubSpot"
description: >-
  Insightly is a CRM with project management bolted on. HubSpot is not. The Projects
  object, and the pipelines attached to it, is where this migration gets interesting.
from: insightly
to: hubspot
date: 2026-07-30
difficulty: Moderate
duration: "2–3 weeks"
downtime: "None — Insightly stays live during import"
nativeImport: "No — CSV export per object, or API"
tldr: >-
  Organisations become Companies, Contacts become Contacts and Opportunities become
  Deals. The hard part is Insightly Projects and their activity sets, which have no
  HubSpot counterpart below Enterprise custom objects. Decide where post-sale delivery
  lives before you export a single record.
tags:
  - Insightly
  - HubSpot
  - Migration
  - CRM
objectMap:
  - from: "Organisation"
    to: "Company"
    notes: "Direct match. Populate the website field before export — HubSpot dedupes companies on domain."
  - from: "Contact"
    to: "Contact"
    notes: "Clean. Insightly permits contacts with no email; those fail HubSpot import and need a decision."
  - from: "Lead"
    to: "Contact (Lifecycle Stage = Lead)"
    notes: "Insightly Leads hold person and company data on one record. Unconverted leads become contacts; lead-only fields need matching contact properties."
  - from: "Opportunity"
    to: "Deal"
    notes: "Insightly opportunity pipelines map to HubSpot deal pipelines. Recreate stages first, including probability."
  - from: "Project"
    to: "— (no equivalent)"
    notes: "The central gap. HubSpot has no project object below Enterprise custom objects. Options are a second deal pipeline, a real project tool, or retirement."
  - from: "Activity Set"
    to: "Workflow-created tasks"
    notes: "Insightly activity sets bulk-create tasks against a milestone. Rebuild as a HubSpot workflow that creates the same task series."
  - from: "Task / Event"
    to: "Task / Meeting"
    notes: "Straightforward, but each needs its parent record imported first."
  - from: "Custom Object"
    to: "Custom Object"
    notes: "HubSpot custom objects are Enterprise only. On Professional, low-volume custom objects flatten into properties."
transfers:
  - "Organisations, Contacts, Leads and Opportunities with custom fields, once HubSpot properties exist."
  - "Opportunity value, forecast close date and win/loss state."
  - "Tasks, events and notes imported after their parent records."
  - "Owner assignment, where Insightly users have matching HubSpot seats by email."
  - "Linked-record relationships, if you export Insightly record IDs and rebuild associations via API."
blockers:
  - "**Projects and Milestones.** No HubSpot equivalent. This is the single decision that determines the shape of the migration."
  - "**Activity Sets.** The template-driven task generation has no direct port — rebuild each set as a HubSpot workflow."
  - "**Insightly reports and dashboards.** Nothing carries over."
  - "**Insightly's linking model.** Insightly lets almost anything link to anything. HubSpot associations are typed and stricter, so some relationships have nowhere to go."
  - "**Email templates and mass email.** Insightly's built-in emailing differs from HubSpot's marketing tools; templates need rebuilding and contacts need marketing-status decisions."
steps:
  - "Decide the Projects question first: second deal pipeline, dedicated project tool, or archive in Insightly."
  - "Populate website on Organisations and email on Contacts — HubSpot's dedupe keys — while still in Insightly."
  - "Inventory Activity Sets and note which ones actually run; rebuild only those."
  - "Create HubSpot pipelines, stages and every custom property including lead-only fields."
  - "Export objects to CSV with record IDs preserved, then import as Companies, Contacts, Deals, then activities."
  - "Rebuild links between records as HubSpot associations using the exported IDs."
  - "Set marketing-contact status deliberately after import, then keep Insightly read-only for Project history."
faq:
  - q: "What happens to Insightly Projects when I move to HubSpot?"
    a: "HubSpot has no project object below Enterprise custom objects. Teams either model delivery as a second deal pipeline, move it to a dedicated project tool, or keep a read-only Insightly account for historical project records."
  - q: "Can HubSpot replicate Insightly Activity Sets?"
    a: "Not as a feature, but the outcome is reproducible. A HubSpot workflow triggered by a stage change can create the same series of tasks with the same relative due dates. Rebuild only the sets that are actually in use."
  - q: "Is there a native Insightly to HubSpot importer?"
    a: "No first-party connector. Export each Insightly object to CSV or use the API, then import into HubSpot in dependency order and rebuild associations from the exported record IDs."
  - q: "How long does an Insightly to HubSpot migration take?"
    a: "Two to three weeks. The CRM objects move quickly; the schedule is dominated by finding a home for Projects and rebuilding Activity Sets as workflows."
---

Insightly sells itself as one system for sales and delivery, and teams that bought it for that reason use both halves. That is the complication: HubSpot is a very good replacement for the sales half and has no answer at all for the other one.

## Answer the Projects question before anything else

There are three viable outcomes and they lead to different migrations.

**A second deal pipeline.** If your projects are essentially a linear sequence of stages — kickoff, build, review, live — a HubSpot pipeline reproduces the workflow adequately. It is the cheapest option and it keeps everything in one system. It falls apart if projects need per-task assignment and dependencies.

**A dedicated project tool.** More work and more subscriptions, but honest about what HubSpot is. This is where most services businesses end up.

**Archive.** If Projects were used lightly, keep a read-only Insightly seat for history and start clean.

Whichever you choose, decide it in week one. It determines whether you need to snapshot Project-to-Opportunity relationships, which is not recoverable after cancellation.

## Activity Sets are a workflow, not a feature

Insightly's Activity Sets generate a templated batch of tasks against a milestone — the kind of thing services teams build once and rely on for years. HubSpot has no equivalent feature, but a workflow triggered by a stage change can create the same tasks with the same relative due dates. Audit which sets actually fire first; accounts several years old usually carry sets built for a process nobody runs.

## Insightly links loosely, HubSpot links strictly

Insightly's relationship model is permissive: most objects can link to most other objects, with a free-text relationship label. HubSpot associations are typed and constrained. Export the relationship data with record IDs before you migrate, then map what you can to real associations and accept that some cross-links will only survive as a note.

## Watch the marketing-contact count

Insightly bills by seat. HubSpot's marketing tier bills by marketing contacts. Importing every lead Insightly ever captured as a marketing contact is an expensive default. Import as non-marketing, then promote the segments you genuinely email.
