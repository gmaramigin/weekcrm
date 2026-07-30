---
title: "How to Migrate from Zendesk to Help Scout"
description: >-
  Help Scout deliberately does not have most of what makes Zendesk complicated — no
  organizations object, no ticket forms, far fewer business rules. Teams making this
  move are buying the simplification, not working around it.
from: zendesk
to: help-scout
date: 2026-07-30
difficulty: Moderate
duration: "2–4 weeks"
downtime: "None — run both inboxes in parallel, then switch mail routing"
nativeImport: "Partial — Help Scout migration assistance, plus the Help Scout API"
tldr: >-
  Zendesk tickets become Help Scout conversations, end users become customers and
  groups become mailboxes. There is no organizations object and no ticket-form concept,
  so account-level structure has to be re-expressed with tags and custom fields. Guide
  articles import into Docs as a separate pass.
tags:
  - Zendesk
  - Help Scout
  - Migration
  - Help Desk
objectMap:
  - from: "Ticket"
    to: "Conversation"
    notes: "Direct in substance. Help Scout conversations are email-shaped rather than form-shaped, so ticket-form fields become custom fields or tags."
  - from: "End user"
    to: "Customer"
    notes: "Clean match on email. Help Scout supports multiple email addresses per customer."
  - from: "Organization"
    to: "— (no equivalent)"
    notes: "The main structural gap. Help Scout has no account object. Company grouping is re-expressed with tags, custom fields, or a properties integration."
  - from: "Group"
    to: "Mailbox or Team"
    notes: "Groups that represent a queue become mailboxes; groups that represent a skill set become teams."
  - from: "Trigger / Automation"
    to: "Workflow"
    notes: "Help Scout workflows cover both immediate and time-based rules, but with fewer conditions. Complex triggers may need simplifying rather than porting."
  - from: "Macro"
    to: "Saved reply"
    notes: "Text macros map directly. Macros that also set fields need a workflow alongside the saved reply."
  - from: "View"
    to: "Folder or saved search"
    notes: "Help Scout folders are workflow-driven. Recreate the views agents actually live in, not all of them."
  - from: "Guide article"
    to: "Docs article"
    notes: "Separate import. Zendesk's category/section/article hierarchy flattens into Docs' collection/category structure."
transfers:
  - "Tickets as conversations with their full public and private thread history."
  - "Customers with email addresses and custom field data."
  - "Attachments on tickets and replies."
  - "Tags, which do more structural work in Help Scout than they did in Zendesk."
  - "Agent assignment, where Zendesk agents have Help Scout seats with matching emails."
blockers:
  - "**Organizations.** Help Scout has no account-level object. Anything that relied on organization-based routing, visibility or reporting needs redesigning."
  - "**Ticket forms and conditional fields.** No equivalent. Structured intake moves to a form tool that feeds the mailbox, or to custom fields set after the fact."
  - "**Zendesk Explore.** Help Scout reporting is simpler by design. Anything analytical belongs in a BI tool via the API."
  - "**Sunshine custom objects.** No equivalent."
  - "**Complex trigger chains.** Help Scout workflows have fewer conditions and actions. Expect to consolidate rather than port."
  - "**Talk call recordings.** Zendesk Talk audio stays behind; Help Scout has no native voice channel."
steps:
  - "Map what Zendesk organizations were doing for you — routing, visibility, reporting — and design the tag or custom-field replacement for each use."
  - "Inventory triggers, automations and macros, marking which still fire and which can be consolidated."
  - "Create Help Scout mailboxes, teams, custom fields and tags before importing anything."
  - "Import customers first, then conversations with their thread history, then attachments."
  - "Import Guide articles into Docs as a separate pass, and build a redirect map from the old help centre URLs."
  - "Rebuild the workflows that matter, accepting that some complex chains will need simplifying."
  - "Run both systems in parallel with mail still routing to Zendesk, then switch routing once agents are comfortable."
faq:
  - q: "Does Help Scout have an equivalent to Zendesk organizations?"
    a: "No. There is no account-level object. Company grouping is handled through tags, custom fields, or by pushing account data onto the customer record via an integration. If organization-based routing or reporting is central to how you work, prototype the replacement before committing."
  - q: "What happens to Zendesk ticket forms?"
    a: "They have no direct equivalent. Help Scout conversations are email-shaped rather than form-shaped. Structured intake usually moves to an external form tool that emails into the mailbox, with custom fields set by workflow afterwards."
  - q: "Can Help Scout workflows replace Zendesk triggers and automations?"
    a: "For most teams yes, but with fewer conditions and actions available. A trigger chain built up over years in Zendesk often consolidates into a handful of Help Scout workflows — which is usually an improvement, but it is a redesign rather than a port."
  - q: "How long does a Zendesk to Help Scout migration take?"
    a: "Two to four weeks. The conversation import is straightforward; most of the schedule goes into replacing what organizations and ticket forms were doing."
---

Nobody moves from Zendesk to Help Scout for extra capability. They move because Zendesk became an administration project — a thicket of triggers, forms, views and apps that needed an owner — and Help Scout offers a support tool that a small team can run without one.

Approach the migration in that spirit and it goes well. Try to reproduce your Zendesk configuration and it will not.

## Organizations are the real gap

Zendesk's organization object does quiet structural work: routing tickets by account, letting customers see their colleagues' tickets, grouping reporting by company, driving SLA policies for specific customers.

Help Scout has no equivalent. Not a weaker version — none.

Before anything else, list what organizations were actually doing in your instance. Each use has a different replacement. Routing becomes a workflow matching on email domain. Reporting by account becomes a tag applied by workflow. Shared ticket visibility largely has no answer, and if it is a contractual commitment to enterprise customers, that is a reason to reconsider the destination.

## Tags carry more weight than they used to

In Zendesk, tags are one mechanism among many. In Help Scout, tags do a lot of the structural work that Zendesk spread across organizations, forms, custom fields and views.

Design the tag taxonomy deliberately before importing, rather than letting it grow. A well-planned set of thirty tags is workable; an inherited set of four hundred is the thing people complain about eighteen months later.

## Consolidate the rules, do not port them

Help Scout workflows are less expressive than Zendesk triggers, which sounds like a problem and usually is not. The typical Zendesk instance has dozens of rules where a handful of outcomes are actually needed.

List the outcomes: this gets routed here, this gets escalated after four hours, this gets tagged and closed. Build the smallest set of workflows that produces them. Teams doing this typically end up with a fifth as many rules and no loss of function.

## Structured intake needs a new home

If you rely on Zendesk ticket forms with conditional fields to collect structured information at submission, Help Scout will not do that. The common pattern is an external form tool that emails into the Help Scout mailbox, with a workflow parsing and tagging the result.

It works, but it is an extra tool and an extra integration. Price it in during evaluation.

## Redirect the help centre

Guide articles move into Docs, but the URLs change. Established help centres earn real search traffic; build a redirect map before switching DNS rather than discovering the drop in analytics a month later.
