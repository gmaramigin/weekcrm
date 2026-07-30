---
title: "How to Migrate from Intercom to Zendesk"
description: >-
  Intercom conversations become Zendesk tickets easily enough. What does not transfer
  is the Messenger — the in-product chat, tours and outbound messaging that were half
  of what you were paying for.
from: intercom
to: zendesk
date: 2026-07-30
difficulty: Complex
duration: "4–8 weeks"
downtime: "None — run both in parallel, then switch routing"
nativeImport: "Partial — Zendesk API, or a third-party migration tool"
tldr: >-
  Conversations become tickets, contacts become end users and companies become
  organizations. The structural change is going from a messaging-first model to a
  queue-and-ticket one, and the functional gap is the Intercom Messenger — in-app chat,
  product tours and outbound messaging have no single Zendesk equivalent.
tags:
  - Intercom
  - Zendesk
  - Migration
  - Help Desk
objectMap:
  - from: "Conversation"
    to: "Ticket"
    notes: "Direct in substance. Intercom conversations are often long and informal; expect Zendesk tickets that read differently from ones raised by email."
  - from: "Contact (user)"
    to: "End user"
    notes: "Clean on email. Intercom leads without an email address have no useful Zendesk destination."
  - from: "Company"
    to: "Organization"
    notes: "Direct, and Zendesk organizations can drive routing and SLA policies that Intercom handled through attributes."
  - from: "Team / Inbox"
    to: "Group / View"
    notes: "Intercom's inbox assignment model splits into Zendesk groups plus views. Design the view structure deliberately — it is how agents will work."
  - from: "Workflow"
    to: "Trigger / Automation"
    notes: "Intercom's visual workflows rebuild as Zendesk triggers and automations. More granular, less visual — expect redesign."
  - from: "Help Center article"
    to: "Guide article"
    notes: "Separate import. Structure maps well; plan URL redirects."
  - from: "Macro / Saved reply"
    to: "Macro"
    notes: "Text maps directly. Macros that set attributes need rebuilding with Zendesk field actions."
  - from: "Messenger, tours, outbound"
    to: "— (no single equivalent)"
    notes: "The real gap. Zendesk has chat and messaging, but Intercom's in-product engagement suite is a different product category."
transfers:
  - "Conversations as tickets with their full thread history."
  - "Contacts and companies with custom attributes, once matching Zendesk fields exist."
  - "Attachments on conversations."
  - "Tags, which map into Zendesk's tagging model."
  - "Agent assignment, where Intercom seats have Zendesk seats with matching emails."
blockers:
  - "**The Intercom Messenger.** In-product chat, product tours, checklists and outbound campaigns are not a helpdesk feature. Zendesk covers part of this; the rest needs a separate product engagement tool."
  - "**Fin AI resolution history.** Resolution records and AI performance data stay in Intercom."
  - "**Intercom Series and outbound campaigns.** No Zendesk equivalent — these move to a marketing or product-engagement tool."
  - "**Intercom custom objects.** Zendesk's equivalent is different; data needs remapping rather than moving."
  - "**Reporting continuity.** Intercom reports on messaging and resolution; Zendesk Explore reports on tickets and queues. Historical trends will not line up."
  - "**Leads without email addresses.** These have no meaningful Zendesk destination."
steps:
  - "List everything the Intercom Messenger does for you beyond support — tours, checklists, outbound, banners — and name a replacement for each."
  - "Decide which Intercom contacts are real users and which are leads; leads without emails generally should not migrate."
  - "Design the Zendesk group and view structure before importing. This is how agents will find work and it is the biggest day-one adoption factor."
  - "Create organizations, end users, custom fields and SLA policies in Zendesk first."
  - "Import companies, then end users, then conversations as tickets with their thread history."
  - "Import Help Center articles into Guide with a redirect map from the old URLs."
  - "Rebuild workflows as triggers and automations, run in parallel, then switch routing after agent training."
faq:
  - q: "What replaces the Intercom Messenger after moving to Zendesk?"
    a: "Only partly Zendesk. Zendesk has messaging and chat for support conversations, but Intercom's product tours, checklists, banners and outbound campaigns belong to a different category. Most teams add a dedicated product-engagement tool, and that cost belongs in the migration business case."
  - q: "Do Intercom conversations import cleanly as Zendesk tickets?"
    a: "The data does. The reading experience differs — Intercom conversations tend to be long, informal and multi-topic, whereas Zendesk tickets assume a discrete issue. Expect some historical tickets that look strange in the new interface."
  - q: "What happens to Fin AI resolution data?"
    a: "It stays in Intercom. Resolution counts, deflection rates and AI performance history are not portable, so your Zendesk reporting baseline starts fresh. Export any figures you need for reporting continuity before cancelling."
  - q: "How long does an Intercom to Zendesk migration take?"
    a: "Four to eight weeks. Conversation import is manageable; the schedule is set by replacing Messenger functionality and by retraining agents from an inbox model to a queue-and-view model."
---

Teams leave Intercom for Zendesk for two recurring reasons: the per-resolution pricing stopped making sense at their volume and ticket mix, or they need the structured routing, SLA management and reporting that a mature ticketing system provides and a messaging platform does not.

Both are legitimate. Both also mean giving up something Intercom does that Zendesk simply does not.

## The Messenger is the hidden scope

Intercom's in-product Messenger is not just a support widget. It runs product tours, onboarding checklists, in-app banners, proactive outbound campaigns and NPS surveys. In many companies, product and marketing depend on it as much as support does.

Zendesk covers the support conversation part. It does not cover the rest.

Before anyone signs anything, ask product and marketing what they use the Messenger for. The answer routinely uncovers workflows nobody in the support team knew existed, and the replacement — a dedicated product-engagement tool — is a real line item that belongs in the business case rather than surfacing in week six.

## Design the view structure before you import

This is the single biggest determinant of whether agents adopt Zendesk happily.

Intercom agents work from an inbox: assigned conversations, unassigned, mentions. Zendesk agents work from views — saved queries defining queues by priority, group, status, age.

Get this right and Zendesk feels like an upgrade in control. Get it wrong and agents spend their first week unable to find their work, which is where migration resentment comes from.

Design the views with the agents who will use them, before the import, not after.

## Historical reporting will not reconcile

Intercom measures conversations, response times and AI resolutions. Zendesk Explore measures tickets, queues and SLA attainment.

These are genuinely different frames, and any attempt to show a continuous trend line across the migration will be misleading. Export the Intercom figures you need for the record, then treat the Zendesk baseline as a fresh start and say so explicitly to whoever reads the reports.

## Decide what to do with leads

Intercom captures a lot of anonymous and semi-identified visitors as leads. Zendesk has no useful place for a contact with no email address.

Filter these out during export rather than importing them into an end-user database where they will never be actionable.

## Switch routing last

Import the history, rebuild the triggers, train the agents, then repoint email and messaging. The change that affects customers should be the final step, not the first.
