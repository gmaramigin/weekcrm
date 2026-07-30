---
title: "How to Migrate from osTicket to Freshdesk"
description: >-
  Leaving self-hosted osTicket means trading a MySQL database you control for a SaaS
  API you do not. The upside is that direct database access makes extraction unusually
  clean — if you handle osTicket's custom forms correctly.
from: osticket
to: freshdesk
date: 2026-07-30
difficulty: Moderate
duration: "2–4 weeks"
downtime: "None — run both in parallel, then switch mail routing"
nativeImport: "No — extract from the osTicket MySQL database, load via the Freshdesk API"
tldr: >-
  osTicket tickets, users, organizations and departments map onto Freshdesk tickets,
  contacts, companies and groups. Because osTicket is self-hosted you can extract via
  SQL, which is far more reliable than any export UI. The tricky part is osTicket's
  custom forms, which store field values in a separate entity table.
tags:
  - osTicket
  - Freshdesk
  - Migration
  - Help Desk
objectMap:
  - from: "Ticket"
    to: "Ticket"
    notes: "Direct. osTicket ticket numbers should be preserved in a Freshdesk custom field so old customer references still resolve."
  - from: "Thread entry"
    to: "Ticket conversation"
    notes: "osTicket stores messages, responses and internal notes as thread entries with a type. Map each type to the right Freshdesk conversation type."
  - from: "User"
    to: "Contact"
    notes: "Clean on email. osTicket allows multiple emails per user, so pick a primary."
  - from: "Organization"
    to: "Company"
    notes: "Direct match. osTicket organizations are lightly used in most installations — check before assuming they carry meaning."
  - from: "Department"
    to: "Group"
    notes: "Departments become Freshdesk groups. Team assignments map to agent group membership."
  - from: "Help Topic"
    to: "Ticket type or category field"
    notes: "Help topics drive routing in osTicket. In Freshdesk this splits between a ticket field and Dispatch'r rules."
  - from: "Custom form field"
    to: "Custom field"
    notes: "The fiddly part. osTicket stores custom field values in a separate entity/value table, not on the ticket row. Extraction needs a join, and forms scoped to help topics flatten into global Freshdesk fields."
  - from: "FAQ / Knowledgebase"
    to: "Solution article"
    notes: "Separate import. osTicket's category/FAQ structure maps to Freshdesk categories and folders."
transfers:
  - "Tickets with their full thread history, including internal notes as private notes."
  - "Users and organizations with contact details."
  - "Custom form field values, once extracted from the entity tables and mapped to pre-created Freshdesk fields."
  - "Attachments, which are stored on the filesystem or in the database depending on your osTicket configuration."
  - "Agent assignment, where osTicket staff have Freshdesk seats with matching emails."
blockers:
  - "**Ticket filters.** osTicket's routing rules do not export. Rebuild as Freshdesk Dispatch'r rules."
  - "**Help-topic-scoped forms.** osTicket forms attach to help topics; Freshdesk custom fields are global with optional per-form visibility. Expect field consolidation."
  - "**SLA plans and business hours.** Rebuild in Freshdesk; verify the escalation timing matches rather than assuming."
  - "**Canned responses.** Straightforward to move but must be recreated by hand."
  - "**Plugins and local modifications.** Self-hosted osTicket installs often carry patched files or plugins. None of it survives; identify the behaviour and reproduce it in Freshdesk."
  - "**Attachment storage mode.** If attachments live in the database rather than the filesystem, extraction needs a different query path — check your configuration first."
steps:
  - "Take a full backup of the osTicket database and the attachment directory before anything else."
  - "Check whether attachments are stored on disk or in the database — this determines the extraction approach."
  - "Map the custom form structure: which forms attach to which help topics, and which fields still hold data."
  - "Create Freshdesk groups, agents, companies, custom fields and SLA policies before importing."
  - "Extract via SQL — tickets joined to thread entries, users, organizations, and custom field values from the entity tables."
  - "Load through the Freshdesk API in order: companies, contacts, tickets with conversations, then attachments."
  - "Rebuild ticket filters as Dispatch'r rules, import the knowledgebase, then switch mail routing."
faq:
  - q: "Can I export osTicket data without database access?"
    a: "Not reliably. osTicket's built-in export is limited and does not carry full thread history or custom form values. Since osTicket is self-hosted, direct SQL extraction is both available and the better route — it handles volume and gives you full control over the joins."
  - q: "Why are my osTicket custom field values missing from the ticket table?"
    a: "Because osTicket stores them in separate entity and value tables rather than as columns on the ticket. Extracting them requires joining those tables back to the ticket, keyed by the form entry. This is the single most common thing missed in an osTicket migration."
  - q: "Where are osTicket attachments stored?"
    a: "It depends on configuration — either on the filesystem in the attachments directory, or inside the database as binary chunks. Check before planning extraction, because the two require completely different approaches."
  - q: "How long does an osTicket to Freshdesk migration take?"
    a: "Two to four weeks. The SQL extraction is quick once the schema is understood; most of the time goes into custom form mapping, rebuilding ticket filters, and validating attachment integrity."
---

Moving off self-hosted osTicket is usually driven by one of three things: nobody left in the company wants to maintain a PHP application, the security patching has fallen behind, or the team has outgrown what osTicket does.

Whatever the reason, self-hosting hands you one significant advantage over most migrations — you own the database.

## Use SQL, not the export screen

osTicket's built-in export is limited and does not carry what matters. Direct database extraction does: full thread history including internal notes, custom form values, organization assignments, attachment references.

It also lets you profile the data before you move it. Count tickets per department. Find the help topics nobody has used since 2022. Check how many users share an email address. Every one of these is cheaper to resolve in a query than in Freshdesk.

Take a full backup first — database and attachment directory both — and work from a copy.

## Custom fields are not on the ticket

This is the thing that catches every first-time osTicket extraction. The ticket table does not contain your custom field values. osTicket stores form definitions and their values in separate entity and value tables, linked back to the ticket through a form entry.

Pull only the ticket table and everything looks fine until someone asks where the "account number" field went.

Map the form structure first: which forms attach to which help topics, which fields still hold data, and which were abandoned. Then write the join. And note that because osTicket scopes forms to help topics while Freshdesk custom fields are global, several similar fields across different forms usually need consolidating into one.

## Check how attachments are stored

osTicket can store attachments on the filesystem or inside the database, depending on configuration. These require completely different extraction approaches, and assuming the wrong one wastes a day.

Check the setting before you plan. Then verify a sample of extracted files actually open — attachment integrity is the most common thing declared complete and later found broken.

## Preserve the ticket numbers

Customers reference old ticket numbers in email threads for years, and internal documentation links to them. Put the original osTicket number into a Freshdesk custom field during import so searches still find the right ticket. It costs one field and saves a lot of confusion.

## Look for local modifications

Self-hosted osTicket installations frequently carry patched core files, custom plugins, or a cron job someone wrote in 2019. None of it moves, and none of it is visible in the admin interface.

Ask whoever runs the server for a diff against a clean osTicket install before you scope the project. Behaviour that everyone assumes is standard sometimes turns out to be a local patch, and finding that out during testing is much better than after cutover.
