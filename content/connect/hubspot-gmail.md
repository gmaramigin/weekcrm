---
title: "HubSpot and Gmail: What Gets Logged and What Gets Missed"
description: >-
  The Gmail integration is two features with confusingly similar names — logging
  and tracking — plus a sidebar that quietly becomes the reason reps stop opening
  the CRM at all.
vendor: hubspot
platform: Gmail
platformSlug: gmail
date: 2026-07-31
method: "Native — HubSpot Sales Chrome extension plus an inbox connection in HubSpot settings"
direction: "Two-way: outbound mail logs to the CRM, CRM context renders inside Gmail"
setupTime: "15 minutes per user"
availability: "Logging, tracking and the sidebar are free; sequences and some template limits require Sales Hub Starter or above"
tldr: >-
  Log writes the email onto the contact record. Track tells you when it was opened.
  They are separate checkboxes and reps routinely tick the wrong one. The sidebar is
  the actual win — contact history, deals and templates without leaving the compose window.
tags:
  - HubSpot
  - Gmail
  - Integrations
syncs:
  - what: "Outbound email"
    direction: "Gmail → HubSpot"
    notes: "With **Log** ticked, the message body lands on the contact's timeline and the associated company and deal. Untick it and the email happens invisibly."
  - what: "Open and click events"
    direction: "Gmail → HubSpot"
    notes: "**Track** is a separate checkbox that inserts a pixel and rewrites links. Notifications fire in the browser and optionally in Slack."
  - what: "Inbound replies"
    direction: "Gmail → HubSpot"
    notes: "Replies to a logged thread attach to the same record automatically, provided the thread is unbroken and the reply comes from a known address."
  - what: "Contact creation"
    direction: "Gmail → HubSpot"
    notes: "New recipients can auto-create contacts. Left on by default it fills the CRM with vendors, recruiters and your own colleagues."
  - what: "CRM sidebar"
    direction: "HubSpot → Gmail"
    notes: "Company, deal stage, recent activity and open tasks render beside the thread, plus one-click task and meeting creation."
  - what: "Templates and snippets"
    direction: "HubSpot → Gmail"
    notes: "Inserted straight into the compose window with personalisation tokens resolved from the contact record."
  - what: "Meetings links"
    direction: "HubSpot → Gmail"
    notes: "The scheduling link inserts inline; bookings create a meeting on the contact timeline and on the connected Google Calendar."
  - what: "Sequence enrolment"
    direction: "Gmail → HubSpot"
    notes: "Reps can enrol a contact into a sequence from the sidebar. Sales Hub Starter and above."
limits:
  - "**Log and Track are independent, and the defaults are per-user.** A rep who unticks Log to send a personal note and forgets to re-tick it stops logging entirely, silently, for weeks."
  - "**Tracking breaks on plain-text and on some corporate mail gateways.** Security scanners fetch images and rewrite links, which produces phantom opens seconds after send. Treat single opens as noise and repeat opens as signal."
  - "**Auto-create contacts needs a blocklist on day one.** Without one, your contact count — and on paid tiers your marketing contact bill — grows from every recruiter who emails a rep."
  - "**Forwarded threads and altered subject lines lose their association.** HubSpot matches on thread ID; break the thread and the reply lands nowhere."
  - "**A shared team alias is not a Gmail connection.** support@ or sales@ belongs in the Conversations inbox as a shared channel. Connecting it as a personal inbox logs the whole team's mail under one user."
steps:
  - "Install the HubSpot Sales Chrome extension, then connect the personal inbox in HubSpot under Settings → General → Email. Both halves are required; installing only the extension is the most common half-setup."
  - "Set the account-wide default for Log and Track before rolling out to reps, and explain the difference once, clearly, because nobody reads the tooltip."
  - "Configure the never-log blocklist immediately — your own domain, recruiting domains, and any vendor domains — under the email logging settings."
  - "Connect Google Calendar in the same settings screen so meetings booked from Gmail write back to the contact timeline rather than sitting only in Calendar."
  - "Move any shared alias (support@, hello@, sales@) into the Conversations inbox instead, and connect it as a team email channel."
  - "Audit a week later: filter contacts created in the last seven days by source and see what the blocklist missed."
faq:
  - q: "What is the difference between Log and Track in the HubSpot Gmail extension?"
    a: "Log writes a copy of the email onto the CRM record, so the history is visible to everyone on the team. Track adds an open-and-click pixel and notifies the sender when the recipient opens it. You can use either, both or neither, and the two checkboxes sit next to each other in the compose window — which is exactly why they get confused. If you only enable one across the team, make it Log; open data is interesting, but a CRM with no email history is a CRM nobody trusts."
  - q: "Does HubSpot read my whole Gmail inbox?"
    a: "Only what you log, plus replies on threads that are already logged. HubSpot requests Gmail scopes broad enough to send and read messages in order to associate replies, but it does not index and store your entire mailbox onto records by default. Teams with strict data policies usually restrict this further by turning off auto-create and by blocklisting internal domains."
  - q: "Can two reps log the same thread?"
    a: "Yes, and it deduplicates on the record — the email appears once on the timeline. Where it gets messy is ownership: the activity is attributed to whoever logged it, so shared prospecting threads can skew activity reporting. Teams that care about attribution usually assign a single owner per thread rather than relying on the integration to sort it out."
---

## Why this integration matters more than it looks

Every CRM rollout has the same failure mode: reps live in the inbox and the CRM slowly becomes a place data goes to die. The Gmail integration is HubSpot's answer to that, and the thing that makes it work is not logging — it is the sidebar.

Logging is a compliance feature. It makes the manager's reporting real. The sidebar is what makes a rep prefer having the integration on, because deal stage, last touch, open tasks and templates are right there in the thread they were already reading.

## The setting that decides your data quality

Auto-create contacts. It is on by default, it feels harmless, and six months later your database has three thousand contacts nobody ever intended to market to. On Marketing Hub, where pricing keys off marketing contacts, that becomes an invoice rather than an inconvenience.

Set the blocklist first, then turn logging on. In that order.

## Where the tracking data actually helps

Not on individual opens — corporate security gateways generate too many false positives for a single open to mean anything. Where it earns its place is pattern: a proposal opened four times across two days, by a thread that then goes quiet, is a genuine signal that it is circulating internally. That is the moment a follow-up lands, and it is the one thing the integration tells you that the CRM alone cannot.
