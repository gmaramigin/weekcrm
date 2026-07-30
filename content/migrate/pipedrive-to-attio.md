---
title: "How to Migrate from Pipedrive to Attio"
description: >-
  Both are lightweight, opinionated sales CRMs, so the objects line up quickly. The
  interesting part is that Attio's Lists give you somewhere better to put the
  pipelines that were never really about revenue.
from: pipedrive
to: attio
date: 2026-07-30
difficulty: Easy
duration: "3–7 days"
downtime: "None — Pipedrive stays live during import"
nativeImport: "Partial — Attio CSV import with mapping, plus the Attio API"
tldr: >-
  Organizations become Companies, Persons become People and Deals become Deals. Attio
  enriches companies from the domain automatically, so you import less than you export.
  The design decision worth making is which Pipedrive pipelines belong on the Deals
  object and which are better modelled as Attio Lists.
tags:
  - Pipedrive
  - Attio
  - Migration
  - CRM
objectMap:
  - from: "Organization"
    to: "Company"
    notes: "Direct. Attio enriches from the domain, so the website field is the one that really matters in the export."
  - from: "Person"
    to: "Person"
    notes: "Attio keys and enriches on email. Pipedrive persons with multiple emails need a primary chosen before import."
  - from: "Deal"
    to: "Deal (or List entry)"
    notes: "Revenue pipelines fit the Deals object. Non-revenue pipelines — partnerships, onboarding, hiring — are better as Attio Lists with their own entry attributes."
  - from: "Lead (Leads Inbox)"
    to: "Person on a prospecting List"
    notes: "Attio has no separate lead object. The closest and cleanest equivalent is a List that holds unqualified prospects, keeping them out of the main person view."
  - from: "Activity"
    to: "Task / Calendar event"
    notes: "Pipedrive's single Activity object splits by type. Completed activities import as history; upcoming ones become tasks."
  - from: "Note"
    to: "Note"
    notes: "Imports after the parent record exists."
  - from: "Custom field"
    to: "Attribute"
    notes: "Attio's attribute types are richer. Pipedrive text fields holding a fixed set of values are worth upgrading to status or select attributes during the move."
  - from: "Product / Deal product"
    to: "Attribute or custom object"
    notes: "Attio has no built-in product catalogue. Simple cases become deal attributes; a real catalogue becomes a custom object."
transfers:
  - "Organizations, Persons and Deals with custom fields mapped onto Attio attributes."
  - "Deal values, currencies, stages and expected close dates."
  - "Notes and completed activities, imported after their parent records."
  - "Owner assignment, where Pipedrive users have Attio seats with matching emails."
  - "Ongoing email and calendar history, rebuilt automatically once mailboxes are connected."
blockers:
  - "**Pipedrive Workflow Automations.** Rebuild as Attio automations; the trigger models differ."
  - "**Products and price lists.** No built-in Attio equivalent — becomes attributes or a custom object."
  - "**Insights dashboards.** Attio reporting is lighter. Anything analytical belongs in a BI tool reading the Attio API."
  - "**Email templates and sequences.** Content does not transfer; rebuild in Attio or a dedicated outbound tool."
  - "**The Leads Inbox as a distinct surface.** Attio has no separate lead staging area — a List approximates it well but it is a different interaction."
steps:
  - "Sort your Pipedrive pipelines into revenue and non-revenue. The first group becomes Attio Deals; the second becomes Lists."
  - "Clean the Organization website field and Person email field — these drive Attio's matching and enrichment."
  - "Design the Attio workspace: objects, attributes, Lists and pipeline stages, before importing anything."
  - "Export Organizations, Persons and Deals from Pipedrive with record IDs preserved."
  - "Import Companies first, then People with their company reference, then Deals."
  - "Move Leads Inbox records onto a dedicated prospecting List rather than into the main person database."
  - "Connect every user's email and calendar, then keep Pipedrive read-only for a month."
faq:
  - q: "Should Pipedrive deals become Attio Deals or Lists?"
    a: "Split them. Revenue pipelines belong on the Deals object, which has amounts and forecasting. Pipelines that are really processes — partnerships, customer onboarding, hiring — work better as Attio Lists, because list entries carry their own attributes independent of the company record."
  - q: "What happens to the Pipedrive Leads Inbox in Attio?"
    a: "There is no separate lead object in Attio. The cleanest pattern is a dedicated prospecting List holding unqualified people, which keeps them out of your main person view while still giving them a home."
  - q: "Do I need to import all my Pipedrive company fields?"
    a: "Probably not. Attio enriches companies from the domain automatically, so industry, size and location tend to repopulate. Focus the import on fields holding your own judgement — account tier, owner, relationship context — and let Attio look up the rest."
  - q: "How long does a Pipedrive to Attio migration take?"
    a: "Three to seven days. Both products are lightweight and the object models align closely, so most of the effort is workspace design rather than data wrangling."
---

Pipedrive and Attio share an instinct: a CRM should be fast, opinionated, and stop short of becoming a platform. That makes this migration mechanically easy — organizations, persons and deals go where you expect — and leaves room to do something more interesting than a straight port.

## Split your pipelines before you import

Look at your Pipedrive pipelines and ask which ones are actually about revenue.

Most accounts have two or three. One is genuinely sales. The others are usually a process that needed stages and got put in a pipeline because that was the only tool available: partner development, customer onboarding, a recruiting funnel, an investor pipeline.

Attio handles this split properly. Revenue goes on the Deals object, with amounts, stages and forecasting. Everything else becomes a List, where each entry carries its own attributes — a partnership List entry can have a "contract status" and a "revenue share" that make no sense on the company record itself.

This is the one design decision worth taking a day over, and it is why the migration is an upgrade rather than a sideways move.

## Import less than you exported

Attio enriches companies continuously from the domain. Industry, headcount, location, description — it looks these up rather than storing whatever you typed in 2023.

So the export is bigger than the import needs to be. Bring across the fields that encode your own knowledge: account tier, owner, why this company matters, the note about their procurement cycle. Skip the descriptive firmographics.

That makes the Organization website field the most important column in your export. If it is patchy — and in Pipedrive it usually is — fix that before anything else, because it determines how much Attio can do for you afterwards.

## Leads need a List, not the person database

Pipedrive's Leads Inbox is a genuinely useful piece of hygiene: unqualified prospects stay out of your working contacts. Attio has no equivalent surface.

The pattern that works is a dedicated prospecting List. Leads become People, but they live on that List rather than being visible in your default person views. It is not identical to the Leads Inbox, but it preserves the discipline, and list entries can carry lead-specific attributes that would otherwise clutter the person object.

## Upgrade your field types on the way through

Pipedrive custom fields are often plain text holding what is really a fixed set of values. Attio's attribute types include status, select, multi-select, currency and record references.

Migration is the cheapest moment to fix this. A text field containing "Tier 1", "tier1" and "Tier One" becomes a status attribute with three clean options — and the reporting works from day one instead of never.
