---
title: "Salesforce and Outlook: Einstein Activity Capture and Its Trade-off"
description: >-
  Salesforce for Outlook is retired. What replaced it is a side panel plus Einstein
  Activity Capture — and EAC stores activity somewhere that does not behave like the
  rest of your Salesforce data.
vendor: salesforce
platform: Outlook
platformSlug: outlook
date: 2026-07-31
method: "Native — Outlook Integration add-in plus Einstein Activity Capture"
direction: "Outlook → Salesforce for email and event capture; Salesforce → Outlook for record context in the side panel"
setupTime: "A day for admin setup, minutes per user"
availability: "Outlook Integration is broadly available; Einstein Activity Capture entitlement and retention vary by edition and add-on"
tldr: >-
  The side panel shows Salesforce records next to the email and lets reps log manually.
  Einstein Activity Capture automates the logging — but captured activity is stored
  outside standard Task and Event objects, which changes what you can report on.
tags:
  - Salesforce
  - Outlook
  - Integrations
syncs:
  - what: "Emails → activity timeline"
    direction: "Outlook → Salesforce"
    notes: "With EAC on, sent and received mail is captured automatically and matched to contacts and leads by address."
  - what: "Calendar events"
    direction: "Two-way"
    notes: "Meetings sync and appear on related records. Two-way calendar sync is configurable and needs a policy on private events."
  - what: "Manual logging"
    direction: "Outlook → Salesforce"
    notes: "The side panel's log button writes a standard Task, which is the reportable, automatable option EAC is not."
  - what: "Record context in Outlook"
    direction: "Salesforce → Outlook"
    notes: "Contact, account, opportunity and case details render beside the message, including related open opportunities."
  - what: "Record creation"
    direction: "Outlook → Salesforce"
    notes: "Create a contact, lead, opportunity or case directly from an email without leaving the inbox."
  - what: "Activity metrics"
    direction: "Outlook → Salesforce"
    notes: "EAC rolls captured activity into Activity Metrics fields — first and last activity dates — which are reportable even though the raw activity is not stored as Tasks."
limits:
  - "**EAC activity is not stored as standard Task records.** It lives in a separate store surfaced on the timeline. Reports, list views, triggers and workflow rules built on Tasks will not see it, which is the single most consequential fact about this integration."
  - "**Captured data has a retention window.** Depending on entitlement, EAC activity ages out. It is a visibility layer, not a permanent archive."
  - "**Salesforce for Outlook is retired.** Anyone still searching for it needs the Outlook Integration plus EAC combination, and the migration is not purely cosmetic."
  - "**Automatic capture pulls in everything.** Personal mail, recruiters, vendors — anything to a matched address gets captured unless excluded. Exclusion rules are day-one work, not cleanup."
  - "**Shared mailboxes are not a good fit.** The model assumes a personal mailbox belonging to a Salesforce user; team aliases behave badly."
steps:
  - "Confirm your EAC entitlement and retention period before designing anything on top of it. This determines whether captured activity is a permanent record or a rolling window."
  - "Deploy the Outlook Integration add-in centrally through Microsoft 365 admin rather than asking reps to install it individually."
  - "Configure EAC exclusion rules first — your own domain, recruiters, personal addresses — then enable capture for a pilot group."
  - "Decide the calendar policy explicitly: which events sync, whether private events are excluded, and who can see a rep's calendar on a record."
  - "Tell the team the difference between captured activity and logged activity, and mandate manual logging for anything that must be reportable — a demo, a negotiation call, a commitment."
  - "Rebuild any report or automation that assumed all activity is a Task before switching off the old logging behaviour, not after."
faq:
  - q: "Why can't I report on Einstein Activity Capture data the way I used to?"
    a: "Because EAC does not create standard Task and Event records. Captured emails and meetings are stored separately and rendered on the activity timeline, which makes them visible to a human looking at a record but invisible to the reporting layer that queries Tasks. Salesforce surfaces Activity Metrics fields — such as last activity date — that are reportable and cover most management questions. But bespoke reports on activity volume by rep, or automation that fires on a logged call, need rebuilding around Activity Metrics or around manually logged Tasks."
  - q: "Should reps still log emails manually if EAC is on?"
    a: "For anything consequential, yes. The pragmatic split is that EAC handles the long tail — the routine back-and-forth that nobody would ever log by hand and that is genuinely useful context on a record — while manual logging handles the moments that need to be permanent and reportable. A discovery call, a pricing conversation, a commitment to a date: log those as Tasks so they survive retention and appear in reports."
  - q: "What happened to Salesforce for Outlook?"
    a: "It reached end of life and was replaced by the Outlook Integration add-in alongside Einstein Activity Capture. The two are not equivalent. Salesforce for Outlook did a genuine sync of contacts, events and tasks into standard objects; the replacement splits that into a UI layer inside Outlook and a capture service with different storage semantics. Teams migrating late are usually surprised less by the new interface than by the reporting change underneath it."
---

## The thing to understand before anything else

Einstein Activity Capture is not a sync. It is a capture-and-display service.

That distinction sounds academic until a sales operations manager tries to build the activity report they have run every quarter for five years and finds it empty. Activity is on the timeline. It is not in the Task object. Reports query the Task object.

Everything else about this integration is straightforward. This part is the one that causes a rollout to be described as a failure six weeks in.

## What the side panel is actually good at

Context at the moment of writing. A rep replying to a customer sees the open opportunity, the amount, the close date and any open case without leaving the message. That reduces the number of emails that say something contradicting what support told the same customer yesterday.

It also makes record creation cheap. A new contact from an inbound email is two clicks rather than a context switch, which is the difference between it happening and not.

## The exclusion rules deserve real thought

Automatic capture is indiscriminate by design. Left open, it pulls internal mail, supplier correspondence and anything else touching a matched address onto records. Beyond the noise, there is a privacy dimension: reps are often unaware how much of their mailbox becomes visible to colleagues on a shared record.

Set exclusions before enabling capture, tell the team what is being captured, and revisit the list a month in. It is a five-minute configuration that prevents an awkward conversation.
