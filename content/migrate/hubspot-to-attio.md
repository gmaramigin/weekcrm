---
title: "How to Migrate from HubSpot to Attio"
description: >-
  Attio's data model is more flexible than HubSpot's, so the records land easily. The
  work is on the other side — deciding what replaces marketing email, tickets and
  sequences, none of which Attio does.
from: hubspot
to: attio
date: 2026-07-30
difficulty: Moderate
duration: "1–2 weeks"
downtime: "None — HubSpot stays live during import"
nativeImport: "Partial — Attio CSV import with mapping, plus the Attio API"
tldr: >-
  Companies, Contacts and Deals map onto Attio's Companies, People and Deals with
  little friction, and Attio's reference attributes handle associations more gracefully
  than HubSpot does. Plan for the gaps: Attio has no marketing email, no landing pages
  and no ticketing, so name a replacement for each before you cancel.
tags:
  - HubSpot
  - Attio
  - Migration
  - CRM
objectMap:
  - from: "Company"
    to: "Company"
    notes: "Attio enriches companies automatically from the domain, so a clean domain column matters more than the rest of the firmographic fields you exported."
  - from: "Contact"
    to: "Person"
    notes: "Attio keys people on email and enriches from it. Contacts without an email address are far less useful in Attio than they were in HubSpot."
  - from: "Deal"
    to: "Deal (or a List)"
    notes: "Two valid designs. The Deals object suits a conventional sales pipeline; an Attio List with entry attributes suits anything with per-stage data that is not really a deal."
  - from: "Ticket"
    to: "— (no equivalent)"
    notes: "Attio is not a support tool. Service Hub tickets need a separate helpdesk or an archive."
  - from: "Custom property"
    to: "Attribute"
    notes: "Attio attribute types are richer — record references, multi-select, currency, status — so some HubSpot text properties can be upgraded during the move."
  - from: "Custom object"
    to: "Custom object"
    notes: "Easier here than in most destinations. Attio custom objects are available without an Enterprise tier."
  - from: "Active list"
    to: "List or saved view"
    notes: "Attio Lists are richer than HubSpot lists — they carry their own attributes per entry — so some active lists are better modelled as a List than a view."
  - from: "Note / Task / Meeting"
    to: "Note / Task / Calendar event"
    notes: "Import after the parent record. Email and calendar sync rebuilds ongoing history automatically once connected."
transfers:
  - "Companies, People and Deals with custom properties, mapped onto Attio attributes."
  - "Deal values, stages and close dates, once your Attio pipeline stages exist."
  - "Notes and tasks, imported after their parent records."
  - "Owner assignment, where HubSpot users have Attio seats with matching emails."
  - "Ongoing email and calendar history, rebuilt automatically once each user connects their mailbox."
blockers:
  - "**Marketing email, forms and landing pages.** Attio does not do these. A separate marketing tool is required, not optional."
  - "**Tickets and Service Hub.** No Attio equivalent — budget for a helpdesk."
  - "**HubSpot Workflows.** Rebuild as Attio automations, which are capable but structured differently."
  - "**Sequences.** Attio has sequencing capabilities that differ from HubSpot's; content and enrolment state do not transfer."
  - "**Attribution reporting.** HubSpot's multi-touch attribution has no counterpart."
  - "**Historical email engagement metrics.** Opens and clicks stay in HubSpot; Attio's history starts from mailbox connection."
steps:
  - "List every HubSpot hub in active use and name the replacement for each — this is the real decision in the project."
  - "Export marketing assets you want to keep (email bodies, form definitions, workflow logic) before cancelling."
  - "Design the Attio workspace: objects, attributes and whether deals live on the Deals object or in a List."
  - "Clean the company domain and contact email columns in HubSpot — these drive Attio's automatic enrichment."
  - "Import Companies first, then People with their company reference, then Deals."
  - "Connect every user's email and calendar so relationship history starts building immediately."
  - "Rebuild automations, then keep a free HubSpot seat for a month as a reference for anything you missed."
faq:
  - q: "Does Attio have marketing email like HubSpot?"
    a: "No. Attio is a CRM and data platform, not a marketing suite. There is no marketing email, no landing page builder and no forms product, so a separate marketing tool is a requirement of this migration rather than an optional extra."
  - q: "Should HubSpot deals become Attio Deals or an Attio List?"
    a: "Both work. The Deals object suits a conventional revenue pipeline with amounts and forecasting. An Attio List is better when the pipeline is really a process — partnerships, hiring, fundraising — because list entries carry their own attributes independent of the record."
  - q: "Do I need to export all my HubSpot company data?"
    a: "Less than you would think. Attio enriches companies automatically from the domain, so firmographic fields like industry, size and location often repopulate on their own. Prioritise the fields that hold your own judgement — account tier, notes, owner — over data Attio can look up."
  - q: "How long does a HubSpot to Attio migration take?"
    a: "One to two weeks for the CRM data. The schedule is usually set by standing up a marketing tool and a helpdesk to replace the HubSpot hubs you are leaving behind."
---

Attio and HubSpot are aimed at different things. HubSpot is a suite that happens to contain a CRM; Attio is a CRM that assumes you will bring your own everything else. Teams making this move are usually trading breadth for a data model that actually fits how they work.

## The gaps are the project

The record migration is genuinely quick. What takes time is replacing the parts of HubSpot that Attio deliberately does not build.

Marketing email, forms, landing pages, tickets, attribution. Attio has none of these. That is not a limitation to work around — it is the product's position. But it means the migration plan is really a procurement plan, and it needs to be done before you cancel rather than after.

Write the list. Name the replacement for each. Any blank row is a scope item.

## Let Attio enrich rather than importing everything

HubSpot exports carry a lot of firmographic data — industry, employee count, revenue band, location — much of it originally populated by HubSpot's own enrichment. Attio enriches companies automatically from the domain, so importing all of that is largely redundant and occasionally harmful, because a stale 2022 employee count will override a fresh lookup.

Prioritise differently. Import the fields that encode your own judgement: account tier, relationship owner, strategic notes, the reason you care about this company. Let Attio look up the rest.

This makes the domain column the single most important field in the export. Clean it first.

## Deals or Lists — decide deliberately

Attio gives you two reasonable homes for a HubSpot pipeline, and the choice is not obvious.

The **Deals object** is right for conventional revenue pipelines. Amounts, stages, close dates, forecasting.

An **Attio List** is right when the "pipeline" is really a process that happens to have stages — partnership development, recruiting, fundraising, customer onboarding. List entries carry their own attributes, separate from the underlying company or person record, which models these far better than forcing them into a deal.

Many teams migrating from HubSpot discover they had three deal pipelines and only one of them was actually about revenue.

## Connect mailboxes on day one

Attio builds relationship history from email and calendar sync, and it does this well. Historical engagement metrics from HubSpot do not transfer, but the underlying emails do — from the mailbox, not from HubSpot. Connect every user before cutover and the timeline populates itself.
