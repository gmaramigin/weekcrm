---
title: "How to Migrate from Zendesk to Freshdesk"
description: >-
  Two classic ticketing systems with near-identical vocabulary. Tickets, contacts and
  organizations move predictably — triggers, automations and Guide articles are where
  the rebuild happens.
from: zendesk
to: freshdesk
date: 2026-07-30
difficulty: Moderate
duration: "3–5 weeks"
downtime: "None — run both inboxes in parallel, then switch mail routing"
nativeImport: "Partial — Freshdesk migration service, plus the Freshdesk API"
tldr: >-
  Zendesk tickets become Freshdesk tickets, end users become contacts and organizations
  become companies. Business rules are the real work: every trigger, automation and
  macro has to be rebuilt as a Dispatch'r, Supervisor, Observer or canned response,
  and Guide articles need a separate Solutions import.
tags:
  - Zendesk
  - Freshdesk
  - Migration
  - Help Desk
objectMap:
  - from: "Ticket"
    to: "Ticket"
    notes: "Direct. Map status values explicitly — Zendesk's Solved/Closed distinction does not line up exactly with Freshdesk's Resolved/Closed."
  - from: "End user"
    to: "Contact"
    notes: "Clean match on email. Zendesk allows multiple identities per user; Freshdesk keeps one primary email plus secondary addresses."
  - from: "Organization"
    to: "Company"
    notes: "Direct. Organization-based ticket visibility rules need rebuilding as Freshdesk company settings."
  - from: "Group"
    to: "Group"
    notes: "Same concept. Recreate before importing tickets so assignment resolves."
  - from: "Trigger"
    to: "Dispatch'r or Observer"
    notes: "Zendesk triggers fire on create and update. Freshdesk splits this: Dispatch'r on create, Observer on update. Each trigger needs classifying."
  - from: "Automation"
    to: "Supervisor"
    notes: "Time-based rules. Freshdesk Supervisors run hourly, which differs from Zendesk's cadence — check anything with tight timing."
  - from: "Macro"
    to: "Canned response or Scenario Automation"
    notes: "Text-only macros become canned responses. Macros that also set fields become Scenario Automations."
  - from: "Guide article"
    to: "Solution article"
    notes: "Separate import. Category and section structure maps to Freshdesk's category/folder hierarchy, one level shallower."
transfers:
  - "Tickets with their full public and private comment threads."
  - "Contacts and companies with custom fields, once matching Freshdesk fields exist."
  - "Ticket custom field values, where you pre-create the fields with matching option sets."
  - "Attachments on tickets and comments."
  - "Agent assignment, where Zendesk agents have Freshdesk seats with matching emails."
blockers:
  - "**Triggers, automations and macros.** No export path. Every business rule is a manual rebuild, and the Dispatch'r/Supervisor/Observer split means a one-to-one port is not possible."
  - "**Zendesk Explore reports.** Rebuild in Freshdesk Analytics; nothing carries."
  - "**Sunshine custom objects.** No Freshdesk equivalent. Data needs flattening into custom fields or an external system."
  - "**Side conversations.** Freshdesk's collaboration model differs; side conversation threads usually import as private notes at best."
  - "**Marketplace apps.** Check every installed Zendesk app for a Freshdesk equivalent before committing — this is a common late surprise."
  - "**Talk call recordings.** Zendesk Talk audio stays in Zendesk. Export what you must retain."
steps:
  - "Inventory every trigger, automation, macro, view and SLA policy, and mark which are actually firing."
  - "List installed Zendesk apps and integrations, and confirm a Freshdesk equivalent exists for each."
  - "Create Freshdesk groups, agents, custom fields, ticket forms and SLA policies before importing anything."
  - "Map Zendesk statuses to Freshdesk statuses explicitly, especially Solved versus Closed."
  - "Import contacts and companies first, then tickets with their conversation threads, then attachments."
  - "Import Guide articles into Solutions as a separate pass, preserving category structure and URLs where possible."
  - "Run both systems in parallel with mail still routing to Zendesk, then switch routing once agents are trained."
faq:
  - q: "Does Freshdesk offer a Zendesk migration service?"
    a: "Freshworks provides migration assistance for tickets, contacts and companies, and there are established third-party tools as well. Business rules, reports and apps are not covered by any of them and must be rebuilt manually."
  - q: "How do Zendesk triggers map to Freshdesk?"
    a: "They split in two. Zendesk triggers fire on both ticket creation and update; Freshdesk uses Dispatch'r for creation and Observer for updates. Every trigger needs classifying before rebuild, and some become two rules."
  - q: "Will my Zendesk help centre URLs still work?"
    a: "Not automatically. Guide articles import into Freshdesk Solutions, but the URL structure differs. Plan a redirect map from the old article URLs to the new ones or you lose the search traffic those articles earned."
  - q: "How long does a Zendesk to Freshdesk migration take?"
    a: "Three to five weeks for a typical support team. Ticket import is the fast part; rebuilding business rules and validating SLA behaviour dominates the schedule."
---

Zendesk and Freshdesk are close competitors that converged on the same vocabulary, which makes this migration look simpler than it is. Tickets are tickets, groups are groups, and the ticket import is genuinely uneventful.

The work is in the automation layer, where the two products diverge more than the shared terminology suggests.

## Triggers do not map one to one

This is the detail that catches teams out. A Zendesk trigger fires on ticket creation *and* on update, with conditions deciding which. Freshdesk splits these responsibilities across two separate rule types: Dispatch'r runs on creation, Observer runs on update.

So a single Zendesk trigger handling both cases becomes two Freshdesk rules. Meanwhile Zendesk automations — the time-based ones — become Freshdesk Supervisors, which run on their own schedule rather than Zendesk's.

Anything with tight timing needs testing rather than assuming. An escalation that fired reliably at four hours in Zendesk may fire at a slightly different point in Freshdesk, which matters if it is tied to a contractual SLA.

## Audit the rules before rebuilding them

Pull the full list of triggers, automations, macros and views, and check which have actually fired recently. Support instances accumulate rules faster than almost any other kind of system — every escalation policy, every seasonal campaign, every one-off request from a team that no longer exists.

The set still doing useful work is usually a fraction of the set that exists. Rebuilding only that fraction is the single biggest schedule saving available.

## Check the apps before you commit

Zendesk's marketplace is larger than Freshdesk's. If your agents depend on a specific integration — a telephony provider, a translation tool, an e-commerce lookup — verify the Freshdesk equivalent exists and does the same job.

This is best done during evaluation. Discovering in week four that there is no Freshdesk app for your order-management system is an unpleasant way to learn it.

## Plan the help centre redirects

Guide articles import into Freshdesk Solutions cleanly enough, but the URL structure changes. If your help centre attracts organic search traffic — and for most established support operations it does — build a redirect map from old article URLs to new ones before switching DNS.

Skipping this quietly loses whatever search visibility those articles accumulated, and it is much harder to recover than to prevent.

## Switch mail routing last

Run both systems in parallel with email still flowing to Zendesk while agents learn Freshdesk on imported historical tickets. Flip the mail routing only when the rules are tested and the team is comfortable. This keeps the riskiest change — the one that affects customers — until everything else is proven.
