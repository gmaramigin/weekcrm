---
title: "How to Migrate from Kayako Classic to Zendesk"
description: >-
  Kayako Classic sells no new licences and lives on annual maintenance. If you are
  still running it, the export path narrows every year — and self-hosted installs still
  have the one advantage that matters: database access.
from: kayako-classic
to: zendesk
date: 2026-07-30
difficulty: Moderate
duration: "3–5 weeks"
downtime: "None — run both in parallel, then switch mail routing"
nativeImport: "No — database or API extraction, then the Zendesk API"
tldr: >-
  Kayako Classic tickets, users, organizations and departments map onto Zendesk tickets,
  end users, organizations and groups. Self-hosted installations should extract via SQL.
  Treat this as an end-of-life exit rather than a feature upgrade, and get a complete
  archive out regardless of when you cut over.
tags:
  - Kayako
  - Zendesk
  - Migration
  - Help Desk
objectMap:
  - from: "Ticket"
    to: "Ticket"
    notes: "Direct. Preserve the original Kayako ticket mask ID in a Zendesk custom field so old customer references still resolve."
  - from: "Ticket post"
    to: "Ticket comment"
    notes: "Kayako stores each message as a post with a visibility flag. Map private posts to Zendesk internal notes and the rest to public comments."
  - from: "User"
    to: "End user"
    notes: "Clean on email. Kayako user organisations map to Zendesk organization membership."
  - from: "User Organization"
    to: "Organization"
    notes: "Direct match, and Zendesk organizations can do more — routing, SLA policies and shared ticket visibility."
  - from: "Department"
    to: "Group (or Brand)"
    notes: "Departments that represent teams become groups. Departments representing separate customer-facing products may be better as Zendesk brands."
  - from: "Staff"
    to: "Agent"
    notes: "Recreate before importing so assignment resolves. Kayako staff teams map to Zendesk group membership."
  - from: "Custom field"
    to: "Custom field"
    notes: "Kayako custom fields are scoped to departments. Zendesk fields are global with ticket-form visibility, so expect consolidation."
  - from: "Knowledgebase article"
    to: "Guide article"
    notes: "Separate import. Kayako's category structure maps to Zendesk's category/section hierarchy."
transfers:
  - "Tickets with their full post history, including private staff posts as internal notes."
  - "Users and user organizations with contact details."
  - "Custom field values, once matching Zendesk fields are pre-created."
  - "Attachments, whether stored on the filesystem or in the database."
  - "Staff assignment, where Kayako staff have Zendesk seats with matching emails."
blockers:
  - "**Kayako macros, SLA plans and escalation rules.** No export path. Rebuild as Zendesk macros, SLA policies, triggers and automations."
  - "**Department-scoped custom fields.** Zendesk fields are global. Similar fields across departments need consolidating into one, with ticket forms controlling visibility."
  - "**Kayako reports.** Nothing carries. Rebuild in Zendesk Explore."
  - "**Local modifications.** Self-hosted Kayako Classic installs frequently carry patched files or custom PHP. None of it survives."
  - "**Live chat transcripts.** Kayako Classic chat history may need a separate extraction path from tickets."
  - "**Ageing infrastructure.** Old Kayako installations often run on unsupported PHP or MySQL versions, which can complicate extraction tooling."
steps:
  - "Take a complete backup — database and attachment storage — before anything else. This is the archive you may need years from now."
  - "Confirm where attachments live: filesystem or database. The extraction approach differs entirely."
  - "Map department-scoped custom fields and decide how they consolidate into global Zendesk fields."
  - "Create Zendesk groups, agents, organizations, custom fields, ticket forms and SLA policies before importing."
  - "Extract via SQL if self-hosted — tickets joined to posts, users, organizations and custom field values."
  - "Load through the Zendesk API: organizations, end users, tickets with comments, then attachments."
  - "Import the knowledgebase into Guide with redirects mapped, rebuild rules, then switch mail routing."
faq:
  - q: "Is Kayako Classic still supported?"
    a: "No new licences are sold and it exists on annual maintenance only. It should be treated as end-of-life software, which means the practical advice is to extract a complete archive now even if the cutover is months away."
  - q: "How should I extract data from Kayako Classic?"
    a: "If you are self-hosted, via SQL. Direct database extraction handles the ticket-to-post join, custom field values and attachment references far more reliably than the API, and it works even on ageing installations where API tooling struggles."
  - q: "What happens to Kayako's department-scoped custom fields?"
    a: "They consolidate. Zendesk custom fields are global to the account, with ticket forms controlling which are visible when. Several similar fields across different Kayako departments usually merge into one Zendesk field — plan the mapping before import."
  - q: "How long does a Kayako Classic to Zendesk migration take?"
    a: "Three to five weeks. Extraction is the straightforward part on a self-hosted install; rebuilding SLA plans, escalation rules and macros, plus validating attachment integrity, sets the schedule."
---

Kayako Classic is in the awkward category of software that still works and has no future. New licences are not sold, development stopped long ago, and existing installations run on annual maintenance. Many are self-hosted on infrastructure that has quietly aged past its supported versions.

## Take the archive now, migrate later

Whatever your cutover timeline, do the complete extraction this month.

Full database backup, full attachment storage backup, verified restorable. Old self-hosted systems fail in unglamorous ways — a disk, a PHP upgrade that breaks the application, a server nobody has documented. Once the application will not start, extracting a decade of customer history becomes a data-recovery project rather than a migration task.

The archive costs an afternoon. It removes the entire category of worst-case outcome.

## Self-hosted means SQL, and SQL is better here

Kayako Classic's API is workable but slow and, on older installations, sometimes fragile. If you have database access, use it.

The ticket-to-post join gives you full conversation history including staff-only posts. Custom field values, user organisation membership and attachment references all come out cleanly. And you can profile the data first — how many tickets per department, how many users share an email, which custom fields are still populated.

Watch for one configuration detail: attachments may live on the filesystem or inside the database depending on how the instance was set up. Check before writing extraction code, because the two paths share nothing.

## Department fields consolidate into global fields

Kayako scopes custom fields to departments. Zendesk custom fields are global to the account, with ticket forms controlling visibility.

In practice this means the three slightly different "account reference" fields that exist across your sales, billing and technical departments should become one Zendesk field. Do that mapping deliberately during planning. Importing them as three separate global fields works, but you inherit a mess that gets harder to fix as ticket volume grows.

## Departments might be brands, not groups

Most Kayako departments represent internal teams and become Zendesk groups. But if a department exists because you support two distinct customer-facing products with different support addresses and different help centres, Zendesk brands model that better.

Decide per department. Getting this right at the start avoids restructuring later, which is painful once tickets and help centre content are in place.

## Rebuild rules from behaviour, not from configuration

Kayako's SLA plans, escalation rules and macros have no export path. Rather than trying to transcribe them from the admin screens, list the outcomes your support process actually needs — this escalates at four hours, this routes to billing, this gets the standard refund reply — and build the smallest set of Zendesk triggers, automations, SLA policies and macros that delivers them.

Instances this old have usually accumulated rules that no longer fire. Migration is the moment to leave them behind.
