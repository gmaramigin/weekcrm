---
title: "HubSpot and Slack: What the Integration Actually Syncs"
description: >-
  HubSpot's Slack app is three separate things wearing one name: a notifier, a
  lookup tool, and a workflow destination. Only one of them is free.
vendor: hubspot
platform: Slack
platformSlug: slack
date: 2026-07-31
method: "Native — HubSpot-built app, installed from the HubSpot App Marketplace or the Slack App Directory"
direction: "HubSpot → Slack for alerts; Slack → HubSpot for tasks, tickets and logged messages"
setupTime: "10 minutes"
availability: "App itself works on all HubSpot plans; workflow-triggered Slack messages need Professional or above"
tldr: >-
  The free half is useful: slash-command record lookup, turning a Slack message into
  a task or ticket, and channel alerts for deals and tickets. The half most teams
  actually want — "post to #sales when a deal hits Contract Sent" — runs on HubSpot
  workflows, which start at Professional.
tags:
  - HubSpot
  - Slack
  - Integrations
syncs:
  - what: "Deal and ticket notifications"
    direction: "HubSpot → Slack"
    notes: "Stage changes, new deals and ticket assignments post to a channel or DM. Basic per-user alerts are free; rule-based channel routing runs through workflows."
  - what: "Record lookup"
    direction: "Slack → HubSpot (read)"
    notes: "`/hs-search` returns contacts, companies and deals inline in the channel, with a link back to the record."
  - what: "Tasks"
    direction: "Slack → HubSpot"
    notes: "`/hs-task` or the message action creates a HubSpot task with the Slack message body as the description."
  - what: "Tickets"
    direction: "Slack → HubSpot"
    notes: "A message action opens a ticket in the Service Hub pipeline you pick, with the requester matched by email where possible."
  - what: "Conversations inbox routing"
    direction: "Two-way"
    notes: "Slack can be connected as a channel in the Conversations inbox, so internal Slack messages and external replies land in the same queue."
  - what: "Workflow-sent messages"
    direction: "HubSpot → Slack"
    notes: "Any workflow can post to a channel or a record owner's DM, with personalisation tokens. Professional and Enterprise only."
  - what: "Meeting and document notifications"
    direction: "HubSpot → Slack"
    notes: "Meeting bookings and document views can fire a DM to the owner — the highest-signal, lowest-noise alert on the list."
limits:
  - "**Slack threads are not a record timeline.** A message you turn into a ticket copies its text across once. The conversation that follows in Slack stays in Slack — nothing back-fills onto the HubSpot record."
  - "**Rule-based routing needs Professional.** On Free and Starter you get personal notifications only. \"Alert #revenue when an enterprise deal moves to Contract Sent\" is a workflow, and workflows are a paid tier."
  - "**One Slack workspace per HubSpot account.** Companies running separate workspaces per brand or region have to pick one, or split into separate HubSpot portals."
  - "**Every Slack user who wants alerts must connect their own HubSpot account.** The admin install does not carry the team with it, which is why alerting quietly stops working for half the team a month in."
  - "**No editing from Slack.** You can look up a deal and create a task; you cannot change an amount, move a stage or update a property without opening HubSpot."
steps:
  - "Install the HubSpot app from the Slack App Directory as a Slack admin, and authorise it against the HubSpot portal you actually sell out of — not a sandbox."
  - "Have every rep run `/hs-connect` once. This is the step teams skip, and it is why notifications look broken later."
  - "Decide the channel map before building anything: one channel for closed-won, one for at-risk, and DMs for everything owner-specific. Deal-stage alerts in a shared channel age into noise faster than any other alert type."
  - "Build the routing in HubSpot workflows, not in the Slack app's own notification settings — workflows give you enrolment criteria, so you can alert on deals above a threshold instead of all of them."
  - "Turn on the message action for tickets in the Service Hub pipeline your support team lives in, and tell people the Slack thread does not follow the ticket."
  - "Review the alert volume after two weeks and delete half of it. The integration's failure mode is muted channels, not missing data."
faq:
  - q: "Can I reply to a HubSpot ticket from inside Slack?"
    a: "No. You can create a ticket from a Slack message and receive notifications about it, but replies to the customer have to happen in HubSpot's Conversations inbox. Only the Conversations channel connection puts a genuine two-way surface in Slack, and it is scoped to that inbox rather than to the ticket record."
  - q: "Does the free HubSpot plan include the Slack integration?"
    a: "The app installs and works on the free plan — lookup, tasks, tickets and personal notifications all function. What free does not include is HubSpot workflows, which is where channel-level, criteria-based alerting is configured. Most teams describe that gap as \"the Slack integration doesn't work\" when the app is fine and the automation tier is the constraint."
  - q: "Will Slack conversations show up on the contact timeline?"
    a: "Only the single message you explicitly convert into a task or ticket. HubSpot does not index Slack channels, so treat Slack as a notification and capture surface, not as a system of record for customer conversation history."
---

## What this integration is for

The HubSpot Slack app gets installed for one of two reasons, and they pull in opposite directions.

The first is visibility: leadership wants deals to be visible without anyone opening the CRM. That version works well, right up to the point where the channel gets loud enough that people mute it — at which point you have less visibility than before, because everyone now assumes someone else is watching.

The second is capture: a customer asks something in a shared channel and somebody wants that to become a ticket without a copy-paste. That version works better than people expect, and it is the underused half of the app.

## The part that decides whether it works

Alert design, not setup. Installation takes ten minutes; the difference between a channel people read and a channel people mute is whether you enrolled every deal or only the ones that matter.

The practical rule: **shared channels get exceptions, DMs get ownership.** A deal slipping its close date twice is an exception and belongs in a channel. A deal moving from stage two to stage three belongs to its owner, in a DM, or nowhere.

## Where it sits against the alternatives

If you need genuine bidirectional conversation — the customer writes in Slack Connect, an agent replies from a support tool, and the whole thread lives on a record — HubSpot's Slack app is not that product. Slack-native support tools are built for that shape, and the HubSpot app is built for alerting a sales team that already has HubSpot open in another tab.

For teams on Starter that want criteria-based alerts without upgrading to Professional, a Zapier or Make scenario reading HubSpot's webhook events and posting to Slack does the same job at a fraction of the price difference — with the usual trade of another moving part to maintain.
