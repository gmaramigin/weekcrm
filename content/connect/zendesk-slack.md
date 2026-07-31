---
title: "Zendesk and Slack: Tickets From Messages, Without Losing the Thread"
description: >-
  Two distinct use cases wearing one integration: internal alerting for agents, and
  turning Slack into a request channel for employees. The second is the one that
  changes how a support team works.
vendor: zendesk
platform: Slack
platformSlug: slack
date: 2026-07-31
method: "Native — Zendesk for Slack app, maintained by Zendesk"
direction: "Zendesk → Slack for notifications; Slack → Zendesk for ticket creation and replies"
setupTime: "30 minutes"
availability: "Available across Zendesk Suite plans; side conversations depend on tier"
tldr: >-
  Turn a Slack message into a ticket without leaving the channel, get ticket
  notifications where agents already are, and use side conversations to pull a
  colleague into a ticket via Slack. Anyone replying to customers still needs a
  Zendesk seat.
tags:
  - Zendesk
  - Slack
  - Integrations
syncs:
  - what: "Message → ticket"
    direction: "Slack → Zendesk"
    notes: "A message action creates a ticket with the message text and, where matched, the requester. The reason most teams install the app."
  - what: "Ticket notifications"
    direction: "Zendesk → Slack"
    notes: "New, assigned, escalated or breached tickets post to a channel or DM, driven by Zendesk triggers so criteria are available."
  - what: "Side conversations"
    direction: "Two-way"
    notes: "An agent pulls a colleague into a ticket through Slack and their replies attach to the ticket. The genuinely two-way part, and tier-dependent."
  - what: "Ticket updates in thread"
    direction: "Zendesk → Slack"
    notes: "Status changes post back into the originating Slack thread, so whoever raised it sees progress without asking."
  - what: "Ticket lookup"
    direction: "Slack → Zendesk"
    notes: "Search and preview tickets from a channel, useful for the \"has anyone else reported this\" question."
  - what: "Internal request intake"
    direction: "Slack → Zendesk"
    notes: "A dedicated channel where employee requests become tickets — the standard pattern for IT and HR service desks."
limits:
  - "**Replying to a customer requires a Zendesk seat.** Side conversations let colleagues contribute internally; they do not turn Slack into an agent licence."
  - "**Ticket creation from Slack loses the thread.** The originating message copies across once; subsequent Slack discussion stays in Slack unless someone acts."
  - "**Side conversation availability depends on your Suite tier**, and it is the feature most worth checking before designing a process around it."
  - "**Requester matching is imperfect.** A Slack user whose email does not match a Zendesk user creates a ticket with no proper requester."
  - "**Notification volume is a trap in shared channels.** Zendesk triggers make it easy to notify on everything, and a muted channel is worse than no channel."
steps:
  - "Decide which use case you are solving — agent alerting or Slack-as-intake — because the configuration for each is different and doing both badly is the common outcome."
  - "Install the Zendesk app from the Slack App Directory and connect it to your Zendesk instance."
  - "For intake, create a dedicated request channel and tell people to post there rather than DMing the support team. The channel is the process change; the app just makes it work."
  - "Build notifications as Zendesk triggers with real criteria — SLA breach, escalation, VIP organisation — rather than notifying on every new ticket."
  - "Confirm Slack user emails match Zendesk user emails, since requester matching depends on it and mismatches produce orphaned tickets."
  - "Enable side conversations if your tier supports them and train agents to use them instead of copy-pasting ticket content into channels."
faq:
  - q: "Can someone answer a customer from Slack?"
    a: "Not as an agent reply. Side conversations let a colleague contribute to a ticket from Slack and have their input attach to it, but an agent still has to send the customer-facing response from Zendesk. That boundary is deliberate — it keeps the licensed agent count meaningful and ensures customer communication goes through the tool with the audit trail, macros and SLA tracking. Practically it works well, because the people you pull in via Slack are usually subject-matter experts rather than support staff, and you want their answer reviewed before it reaches a customer."
  - q: "Is this good enough to run an internal helpdesk on?"
    a: "For IT and HR service desks it is a well-established pattern and generally works. Employees ask in a Slack channel, the request becomes a ticket, and the requester sees status updates in the thread they already know about — which is much better adoption than asking staff to use a portal they will never bookmark. The caveat is that the Slack conversation and the ticket are only loosely coupled, so agents need the discipline to keep the substantive record in Zendesk rather than resolving everything in a thread that no reporting can see."
  - q: "How do I keep the Slack channel from becoming noise?"
    a: "Notify on exceptions and route ownership to DMs. Because notifications are driven by Zendesk triggers, you have the full criteria language available — SLA about to breach, ticket from an enterprise organisation, ticket reopened, ticket unassigned for an hour. Those are worth a channel. New-ticket notifications in a busy support operation are not, and enabling them is the single most common reason a Zendesk Slack channel ends up muted within a fortnight."
---

## Two integrations, one app

The first is agent-facing: tell the support team when something needs attention. Useful, easy to overdo, and the configuration is entirely about restraint.

The second is requester-facing: let people ask for help where they already are. That is a bigger deal, because the alternative — a portal, a form, an email address nobody remembers — has an adoption problem that has never really been solved.

Companies running internal IT or HR support get most of their value from the second. Customer-facing support teams get most of theirs from the first.

## Why Slack intake works when portals do not

Because it requires no behaviour change. An employee with a broken laptop asks in a channel, which is what they would have done anyway. The difference is that the request now has a ticket number, an owner, an SLA and a place in a queue.

The reporting benefit is the quiet one. Support teams that run on DMs and hallway conversations have no data about their own workload, which means no argument for headcount. Routing the same requests through a channel with the app installed produces that data without asking anyone to fill in a form.

## The thread problem

A ticket created from a Slack message captures that message. The conversation that follows — clarifications, screenshots, the actual diagnosis — happens in Slack and does not reach the ticket.

That is fine for intake and bad for knowledge. Teams that care about building a searchable history need agents to move the substance into the ticket rather than resolving everything in the thread. It is a discipline problem, and worth naming explicitly during rollout rather than discovering when someone tries to write a knowledge base article from tickets containing one line each.

## Side conversations are the underrated feature

Pulling an engineer, a finance person or an account manager into a ticket through Slack, and having their reply land on the ticket, solves a genuinely annoying problem: the expert you need does not have a Zendesk seat and is never going to log in.

Where the tier allows it, this beats every workaround involving copy-paste, and it keeps the ticket as the complete record rather than a summary of a conversation that happened elsewhere.
