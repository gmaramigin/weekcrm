---
title: "HubSpot and Salesforce: Running Both Without Fighting Over Records"
description: >-
  The most consequential integration HubSpot ships. Two-way sync between two systems
  that both think they own the contact — which means the field-level sync rules are
  the whole project, not a settings screen.
vendor: hubspot
platform: Salesforce
platformSlug: salesforce
platformVendor: salesforce
date: 2026-07-31
method: "Native — HubSpot-built managed package installed in Salesforce"
direction: "Two-way, configurable per object and per field"
setupTime: "Two to six weeks including field mapping and a staged rollout"
availability: "HubSpot Professional or Enterprise; Salesforce Enterprise, Unlimited, or Professional with the API add-on"
tldr: >-
  Contacts, companies/accounts, deals/opportunities, tasks and activities sync
  bidirectionally. The real work is deciding, field by field, which system wins a
  conflict — and using inclusion lists so you sync the records that matter rather
  than the whole database.
tags:
  - HubSpot
  - Salesforce
  - Integrations
syncs:
  - what: "Contacts ↔ Contacts and Leads"
    direction: "Two-way"
    notes: "HubSpot has one contact object; Salesforce has Leads and Contacts. You choose which Salesforce object new HubSpot contacts create, and conversions flow back."
  - what: "Companies ↔ Accounts"
    direction: "Two-way"
    notes: "Association is by the contact's account relationship. Companies HubSpot auto-created from a domain but Salesforce has never seen are the usual source of duplicates."
  - what: "Deals ↔ Opportunities"
    direction: "Two-way"
    notes: "Stage values have to be mapped explicitly. Pipelines that exist in only one system are the most common cause of a stalled rollout."
  - what: "Tasks and activities"
    direction: "Two-way"
    notes: "Emails, calls and meetings can flow both ways. Sending marketing email activity into Salesforce is optional and worth thinking hard about before enabling."
  - what: "Field values"
    direction: "Configurable per field"
    notes: "Each mapping is set to two-way, prefer-Salesforce, or always-use-HubSpot. This is the setting that determines whether the integration is trusted."
  - what: "Inclusion list"
    direction: "HubSpot → Salesforce (gate)"
    notes: "An active HubSpot list that decides which contacts are eligible to sync at all. Without one, every form fill on the website becomes a Salesforce record."
  - what: "Salesforce campaigns"
    direction: "HubSpot → Salesforce"
    notes: "HubSpot can add contacts to campaigns and write member status, giving marketing attribution inside Salesforce reporting."
limits:
  - "**Deletes do not propagate.** Deleting a record in one system leaves it alive in the other. Every team discovers this the first time they clean up a duplicate and it reappears within the hour."
  - "**Salesforce API call limits are a real constraint.** A large initial sync plus ongoing activity can eat a meaningful share of a daily quota. Stage the first sync; do not point it at 400,000 records on a Friday afternoon."
  - "**Custom object sync requires HubSpot Enterprise.** On Professional you get the standard objects and nothing else, which is the ceiling most mid-market rollouts hit."
  - "**One Salesforce org per HubSpot portal.** Companies with multiple orgs from acquisitions have to consolidate, pick one, or run separate portals."
  - "**Marketing email activity can flood the Salesforce timeline.** Syncing every open and click into activity history technically works and makes the record unreadable. Sync enrolment and engagement scores instead."
steps:
  - "Audit both databases before installing anything. Count duplicates, list the fields each team actually uses, and identify which system is authoritative for each one. This is the project; the rest is configuration."
  - "Install the HubSpot managed package in a Salesforce sandbox first and run a full sync against representative data. Sandbox testing is skippable right up until it isn't."
  - "Build the inclusion list in HubSpot before enabling the sync. Start narrow — marketing qualified leads only — and widen it once you trust the mapping."
  - "Map field by field and set the conflict rule on each one deliberately. The defaults are two-way, which is the setting most likely to cause a sales team to stop trusting a field."
  - "Map deal stages to opportunity stages explicitly, including the closed-lost reasons, or reporting will diverge within a quarter."
  - "Turn the sync on for a small segment, let it run for a week, and reconcile counts on both sides before opening it up."
  - "Document the field ownership decisions somewhere both teams can find. Six months later, nobody remembers why lifecycle stage is HubSpot-wins."
faq:
  - q: "Do we still need HubSpot's own contact ownership if Salesforce is the system of record?"
    a: "Yes, and keeping them aligned matters. HubSpot contact owner and Salesforce record owner are separate fields that sync but do not automatically stay identical — reassignments made in one system with the mapping set the wrong way will bounce back. Pick Salesforce as the owner of ownership in almost every case, set the mapping to prefer-Salesforce, and let HubSpot follow."
  - q: "What happens to HubSpot form submissions from people who already exist in Salesforce?"
    a: "They update the existing record rather than creating a new one, provided email matching finds it. The complication is Leads versus Contacts: a form fill from someone who exists as a converted Lead can create a second record if the mapping points new contacts at the Lead object. This is the single most common source of duplicates in a HubSpot–Salesforce rollout, and it is worth testing explicitly in sandbox."
  - q: "Can we sync only some records instead of everything?"
    a: "That is exactly what the inclusion list is for, and using one should be the default rather than the exception. Point it at an active list with real qualification criteria and only those contacts become eligible to sync. It protects your Salesforce API quota, keeps the sales database clean, and gives you a single lever to widen or narrow scope later without re-mapping anything."
---

## The decision underneath the integration

Running HubSpot and Salesforce together is not a technical problem. It is an agreement about who owns what, encoded in field mappings.

The pattern that works: **Salesforce owns the deal, HubSpot owns the person's marketing history.** Ownership, opportunity amount, close date, forecast category — Salesforce wins. Lifecycle stage, original source, email engagement, form history — HubSpot wins. Anything set to two-way should be a field where a conflict genuinely does not matter.

The pattern that fails is leaving everything on two-way sync because it sounds cooperative. Two-way means last-write-wins, and last-write is usually an automation neither team remembers building.

## Why the inclusion list is not optional

HubSpot creates a contact from every form fill, every chat, every content download. Salesforce is where a sales team works a finite list of accounts. Syncing the first thing directly into the second is how you end up with a sales team that filters your leads out by default.

An inclusion list is a gate: only contacts on this active list are eligible. Start with marketing qualified leads, widen later. It costs one list and saves the rollout.

## When to not do this

If Salesforce exists only because it was bought three years ago and nobody uses it for pipeline, the honest answer is to consolidate rather than integrate. Two systems of record with a sync between them costs a permanent share of somebody's attention forever. Occasionally the right move is a migration instead — the field mapping work is broadly the same, and you only do it once.
