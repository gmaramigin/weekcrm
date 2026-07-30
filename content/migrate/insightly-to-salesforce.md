---
title: "How to Migrate from Insightly to Salesforce"
description: >-
  Insightly's CRM objects load into Salesforce without much drama. Projects, Activity
  Sets and Insightly's anything-links-to-anything relationship model are where the
  design work lives.
from: insightly
to: salesforce
date: 2026-07-30
difficulty: Moderate
duration: "3–5 weeks"
downtime: "None if loaded in parallel; freeze Insightly edits at cutover"
nativeImport: "No — Insightly API export plus Salesforce Data Loader"
tldr: >-
  Organisations become Accounts, Contacts become Contacts, Leads become Leads and
  Opportunities become Opportunities — a clean four-way match. Insightly Projects have
  no standard Salesforce object, so they become a custom object, a second opportunity
  record type, or move to a delivery tool.
tags:
  - Insightly
  - Salesforce
  - Migration
  - CRM
objectMap:
  - from: "Organisation"
    to: "Account"
    notes: "Direct match. Insightly's parent-organisation link maps to Salesforce ParentId."
  - from: "Contact"
    to: "Contact"
    notes: "Salesforce contacts need an AccountId. Insightly contacts without an organisation need a placeholder account or load as Leads."
  - from: "Lead"
    to: "Lead"
    notes: "Clean match — both keep unconverted leads separate with their own conversion process."
  - from: "Opportunity"
    to: "Opportunity"
    notes: "Insightly pipeline stages map to Salesforce stages. Set probability and forecast category per stage before loading."
  - from: "Project"
    to: "Custom object (recommended)"
    notes: "No standard equivalent. A custom object preserves the model best; a second opportunity record type is cheaper but distorts pipeline reporting."
  - from: "Activity Set"
    to: "Flow that creates Tasks"
    notes: "Insightly's templated task generation rebuilds as a Flow triggered by a stage or milestone change."
  - from: "Task / Event"
    to: "Task / Event"
    notes: "Direct, but WhoId and WhatId must both resolve or the activity orphans."
  - from: "Custom Object"
    to: "Custom Object"
    notes: "Straightforward — Salesforce custom objects are more capable than Insightly's."
transfers:
  - "Organisations, Contacts, Leads and Opportunities with custom fields, once Salesforce fields exist."
  - "Opportunity value, forecast close date and win/loss state."
  - "Tasks, events, notes and file attachments, loaded after their parent records."
  - "Owner assignment, where Insightly users have Salesforce licences with matching emails."
  - "Project data, if you build a custom object to receive it."
blockers:
  - "**Projects.** No standard Salesforce object. Custom object, second record type, or an external delivery tool — pick one before exporting."
  - "**Activity Sets.** Rebuild each as a Flow. Audit which ones still run first; most Insightly accounts carry dead sets."
  - "**Insightly's free-form linking.** Insightly lets nearly anything link to anything with a text label. Salesforce relationships are typed. Some links will only survive as notes."
  - "**Insightly reports and dashboards.** Nothing carries over."
  - "**Insightly's built-in mass email.** Salesforce needs Account Engagement or a third-party tool for equivalent functionality."
  - "**Contacts with no organisation.** Salesforce needs a rule for these before loading."
steps:
  - "Decide the Projects destination — custom object, opportunity record type, or external tool — before exporting anything."
  - "Run the gap queries in Insightly: contacts with no organisation, opportunities with no organisation, contacts with no email."
  - "Inventory Activity Sets and mark which are actually applied to live records."
  - "Design the Salesforce org: record types, page layouts, picklists, sharing model, and the Project custom object if you chose that route."
  - "Create external ID fields on each Salesforce object holding the original Insightly record IDs."
  - "Export via the Insightly API and load with Data Loader: Accounts, Contacts, Leads, Opportunities, Projects, then activities."
  - "Rebuild Activity Sets as Flows, validate in a sandbox, then repeat in production and keep Insightly read-only for a quarter."
faq:
  - q: "Where do Insightly Projects go in Salesforce?"
    a: "There is no standard object for them. The cleanest option is a custom object that mirrors the Project model, which preserves milestones and relationships. A cheaper alternative is a second Opportunity record type, but that pollutes pipeline reporting with non-sales records."
  - q: "Can Salesforce replicate Insightly Activity Sets?"
    a: "Yes, using Flow. A record-triggered Flow can create the same series of tasks with the same relative due dates when a stage or milestone changes. Audit which sets are still in use before rebuilding — most accounts carry several that no longer fire."
  - q: "Do Insightly Leads map to Salesforce Leads?"
    a: "Yes, directly. Both products keep unconverted leads in a dedicated object with their own conversion flow, so this is one of the cleaner parts of the migration."
  - q: "How long does an Insightly to Salesforce migration take?"
    a: "Three to five weeks. The CRM objects load quickly thanks to the close model match; the schedule is set by the Projects decision and by rebuilding Activity Sets as Flows."
---

Insightly and Salesforce agree on the four objects that matter most, which makes the sales side of this migration unusually predictable. Organisations, Contacts, Leads and Opportunities all have direct counterparts with compatible semantics, including the Lead-to-Contact conversion process that trips up so many other routes.

The interesting question is the half of Insightly that Salesforce has no standard answer for.

## Projects: three options, pick early

**Custom object.** The right answer for teams that genuinely run delivery in Insightly. A Project custom object with milestones, an account lookup and an opportunity lookup reproduces the model faithfully and keeps reporting clean. It costs a few days of configuration.

**Second opportunity record type.** Cheaper and faster. It works if projects are essentially a linear sequence of stages. The cost is that every pipeline report now has to filter out non-sales records, forever, and someone will eventually forget.

**External delivery tool.** Honest about what a CRM is for, and appropriate if your project management needs have outgrown Insightly anyway. Adds a subscription and an integration.

Make this call in week one. It determines what you export and whether Project-to-Opportunity links need preserving.

## Insightly links loosely; Salesforce does not

Insightly's relationship model is deliberately permissive — most objects can link to most others with a free-text label describing the relationship. Salesforce relationships are typed lookups defined at the schema level.

Export the relationship data with record IDs early, then sort it: relationships that correspond to a real Salesforce lookup get rebuilt properly, and the rest survive as a note on the record if they matter at all. Trying to model every free-text relationship as a custom lookup produces an unmaintainable schema.

## Activity Sets become Flows

An Activity Set drops a templated batch of tasks onto a record. A record-triggered Flow does the same thing with more control.

The useful discipline is auditing first. Pull the list of Activity Sets with their last-applied date; accounts more than two years old typically have several built for a process that has since been replaced. Rebuild what fires, delete the rest, and the longest task in the project gets considerably shorter.

## Fill the gaps before you load

Salesforce Contacts want an AccountId and Opportunities require one. Insightly is more relaxed. Run those queries first and decide a consistent rule — placeholder account, Lead conversion, or exclusion — rather than resolving them record by record during a failed load.
