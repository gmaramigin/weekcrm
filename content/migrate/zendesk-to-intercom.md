---
title: "How to Migrate from Zendesk to Intercom"
description: >-
  Zendesk is email-and-ticket shaped. Intercom is messaging-and-AI shaped. The records
  transfer, but the operating model changes underneath your team — including how you
  get billed.
from: zendesk
to: intercom
date: 2026-07-30
difficulty: Complex
duration: "4–8 weeks"
downtime: "None — run both in parallel, then switch mail routing"
nativeImport: "Partial — Intercom's Zendesk import, plus the Intercom API"
tldr: >-
  Zendesk tickets become Intercom conversations, end users become contacts and
  organizations become companies. The harder shift is conceptual: Intercom is built
  around live messaging and AI resolution, so ticket forms, views and trigger chains
  need rethinking rather than porting — and Fin's per-resolution pricing changes the
  cost model.
tags:
  - Zendesk
  - Intercom
  - Migration
  - Help Desk
objectMap:
  - from: "Ticket"
    to: "Conversation (or Ticket)"
    notes: "Intercom has both. Historic email tickets import as conversations; structured internal work is better modelled with Intercom's ticket type."
  - from: "End user"
    to: "Contact"
    notes: "Clean on email. Intercom distinguishes users from leads, so decide which imported contacts are which."
  - from: "Organization"
    to: "Company"
    notes: "Direct match, and Intercom's company object supports custom attributes for account-level segmentation."
  - from: "Group"
    to: "Team"
    notes: "Recreate before importing so assignment resolves."
  - from: "Trigger / Automation"
    to: "Workflow"
    notes: "Intercom Workflows are visual and more capable, but structured differently. Expect redesign rather than translation."
  - from: "Macro"
    to: "Saved reply / Macro"
    notes: "Text maps directly; field-setting macros need a workflow alongside."
  - from: "Guide article"
    to: "Help Center article"
    notes: "Separate import. Also the training corpus for Fin, so article quality matters more in Intercom than it did in Zendesk."
  - from: "Ticket form"
    to: "Workflow with data collection"
    notes: "No form object. Structured intake becomes a Messenger workflow that asks questions conversationally."
transfers:
  - "Tickets as conversations with their full thread history."
  - "Contacts and companies with custom attributes, once created in Intercom."
  - "Attachments on conversations."
  - "Tags, which carry into Intercom's tagging model."
  - "Agent assignment, where Zendesk agents have Intercom seats with matching emails."
blockers:
  - "**Zendesk views and the queue-driven workflow.** Intercom's inbox model is different enough that agent habits need retraining, not just re-pointing."
  - "**Ticket forms with conditional fields.** No equivalent object; intake becomes a conversational workflow."
  - "**Zendesk Explore.** Rebuild in Intercom reporting, which is oriented toward messaging and resolution metrics rather than ticket volume."
  - "**Sunshine custom objects.** Intercom has its own custom object model; data needs remapping rather than moving."
  - "**Talk call recordings.** Zendesk Talk audio stays behind; Intercom's voice story is different."
  - "**Marketplace apps.** Check each installed Zendesk app for an Intercom equivalent before committing."
steps:
  - "Model the cost first: Intercom's seat pricing plus Fin's per-resolution charge behaves very differently from Zendesk's per-agent model at your ticket volume."
  - "Audit help centre article quality — in Intercom these articles feed Fin, so weak documentation directly degrades AI resolution rates."
  - "Inventory triggers, automations, macros and views, marking which still fire and which outcomes actually matter."
  - "Create Intercom teams, custom attributes and company attributes before importing."
  - "Import companies, then contacts, then conversations with their thread history."
  - "Import Guide articles into the Help Center as a separate pass, with redirects mapped from the old URLs."
  - "Rebuild automations as Intercom Workflows, run in parallel with mail still routing to Zendesk, then switch routing after agent training."
faq:
  - q: "How does Intercom's pricing compare to Zendesk after migration?"
    a: "Differently enough to model properly. Zendesk charges per agent. Intercom charges per seat plus a per-resolution fee for Fin AI. At high ticket volume with good deflection the economics can favour Intercom; at low volume with complex tickets they often do not. Run the numbers against your actual ticket mix before committing."
  - q: "Do Zendesk ticket forms have an Intercom equivalent?"
    a: "Not as an object. Intercom collects structured information through Messenger workflows that ask questions conversationally, then write the answers to attributes. It works well for customer-facing intake but it is a genuine redesign, not a field mapping."
  - q: "Why does help centre quality matter more in Intercom?"
    a: "Because Help Center articles are the training corpus for Fin, Intercom's AI agent. In Zendesk a thin article is just a thin article; in Intercom it directly reduces AI resolution rates, which you are paying per resolution to achieve. Audit and improve articles before migrating them."
  - q: "How long does a Zendesk to Intercom migration take?"
    a: "Four to eight weeks. Data movement is a small part; the schedule is set by redesigning workflows for a messaging-first model and retraining agents away from queue-and-view habits."
---

This is not a like-for-like helpdesk swap. Zendesk was built around email tickets moving through queues; Intercom was built around live conversations and, increasingly, around an AI agent resolving them before a human sees them. Your data will move. Your operating model will change.

## Model the economics first

Zendesk's cost is straightforward: agents times price. Intercom's is seats plus a per-resolution charge for Fin.

That difference is not a detail — it inverts the incentive structure. In Zendesk, a spike in ticket volume costs nothing extra. In Intercom, high volume with good AI deflection can be cheaper than Zendesk, while high volume with poor deflection is more expensive.

Take your actual ticket mix — volumes, categories, how many are genuinely answerable from documentation — and model both. Teams that skip this step are the ones with an unpleasant invoice in month three.

## Your help centre is now infrastructure

In Zendesk, Guide articles are a self-service nicety. In Intercom, Help Center articles are what Fin reads to resolve tickets.

That changes their status entirely. A thin, outdated or contradictory article no longer just fails a customer who found it — it degrades the AI resolution rate you are paying for, on every ticket in that category.

Audit before you migrate. Fix the top twenty articles by traffic, retire the contradictory ones, and fill the obvious gaps. This is the highest-return work in the whole project and it is usually skipped because it does not look like migration work.

## Views and queues are a habit, not a feature

Zendesk agents live in views. A well-run instance has a view per queue, per priority, per escalation state, and agents work top-down through them.

Intercom's inbox is organised differently — assignment, conversation state, and workflow-driven routing rather than saved queries. It is not worse, but it is not the same, and experienced Zendesk agents will find it disorienting for a fortnight.

Budget training time explicitly. The most common cause of a rocky Intercom rollout is not data; it is agents who cannot find their work.

## Structured intake becomes conversational

Ticket forms with conditional fields have no Intercom counterpart. The equivalent is a Messenger workflow that asks the customer questions in sequence and writes the answers to attributes.

For consumer-facing support this is generally an improvement. For technical intake with fifteen required fields it can be worse, and it is worth prototyping the two or three most complex forms before you commit.

## Switch mail routing last

Import history, rebuild workflows, train agents, and only then repoint the email. The riskiest change should be the last one, not the first.
