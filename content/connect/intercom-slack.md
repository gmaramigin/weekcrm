---
title: "Intercom and Slack: Actually Replying From a Slack Thread"
description: >-
  Unusually among helpdesk chat integrations, Intercom lets a teammate reply to a
  customer from inside Slack. That single capability changes who can help.
vendor: intercom
platform: Slack
platformSlug: slack
date: 2026-07-31
method: "Native — Intercom's Slack integration, configured in Intercom app settings"
direction: "Two-way: conversations surface in Slack and replies from Slack reach the customer"
setupTime: "20 minutes"
availability: "Available on Intercom's paid plans; capability varies by plan"
tldr: >-
  Conversations can be mirrored into Slack channels, and a reply typed in the Slack
  thread is delivered to the customer as an Intercom reply. That makes it viable for
  engineers and founders to answer directly without an Intercom seat habit.
tags:
  - Intercom
  - Slack
  - Integrations
syncs:
  - what: "Conversation notifications"
    direction: "Intercom → Slack"
    notes: "New or assigned conversations post into a channel, with the customer's message and context."
  - what: "Reply from Slack"
    direction: "Slack → Intercom"
    notes: "A reply in the thread is delivered to the customer as an Intercom reply. The defining feature of this integration."
  - what: "Conversation state"
    direction: "Two-way"
    notes: "Closing or snoozing can be actioned from Slack, and state changes reflect back into the thread."
  - what: "Assignment"
    direction: "Two-way"
    notes: "Conversations can be assigned or claimed from Slack, which keeps ownership visible to people not watching the Intercom inbox."
  - what: "Customer context"
    direction: "Intercom → Slack"
    notes: "Key attributes render alongside the message — plan, company, signup date — so the person replying is not answering blind."
  - what: "Internal notes"
    direction: "Two-way"
    notes: "Notes added in Slack attach to the conversation as internal notes rather than reaching the customer, provided the convention is understood."
limits:
  - "**Formatting and attachments degrade.** A reply typed in Slack does not carry the rich formatting, macros or article links an Intercom reply would, and image handling is limited."
  - "**It encourages replies from people without support training.** The same feature that lets an engineer answer quickly lets them answer bluntly, and there is no review step."
  - "**Channel volume becomes unmanageable at scale.** Mirroring every conversation works for a startup and fails completely for a team handling hundreds a day."
  - "**Internal note versus customer reply is a convention people get wrong.** Somebody will eventually send an internal comment to a customer, and it is worth assuming that in advance."
  - "**Capability depends on plan.** Verify what your Intercom subscription includes before designing a process around Slack replies."
steps:
  - "Decide the scope first: all conversations, or a filtered subset such as those from a specific segment. Mirroring everything is only viable at low volume."
  - "Connect Slack from Intercom's app settings and choose the destination channel deliberately — a dedicated one, not a general team channel."
  - "Test the reply path yourself with a real customer-facing conversation before letting anyone else use it, and observe exactly how the formatting arrives."
  - "Establish and demonstrate the internal-note convention. Do this in a way people remember, because the failure mode is a customer receiving an internal comment."
  - "Brief anyone likely to reply — engineers, founders — on tone. The capability removes the friction that used to make them ask support to send it."
  - "Review volume weekly for the first month and narrow the filter as soon as the channel stops being read."
faq:
  - q: "Can I really answer a customer from Slack?"
    a: "Yes, and that is what distinguishes this from most helpdesk Slack integrations, which stop at notifications and links. A reply typed in the mirrored thread is delivered to the customer as an Intercom reply on the conversation. The caveat is that you are typing into Slack, so you do not get Intercom's macros, article inserts, or rich formatting, and attachments behave inconsistently. It is best suited to short, specific answers — precisely the kind an engineer or founder gives — rather than to routine support replies that benefit from saved responses."
  - q: "Is this a good idea for a large support team?"
    a: "Generally no, and the reason is volume rather than capability. Mirroring conversations into a channel scales badly: a team handling hundreds of conversations a day produces a channel nobody can read, and the reply-from-Slack path bypasses the queueing, assignment and reporting that a support operation depends on. The integration is at its best in small teams and in targeted configurations — conversations from enterprise accounts, or from a specific product area where the experts do not live in Intercom."
  - q: "How do we stop someone sending an internal note to the customer?"
    a: "Assume it will happen and make the consequence small. Demonstrate the convention explicitly during rollout rather than describing it, keep the channel scoped to conversations where a stray message would be survivable, and avoid mirroring anything sensitive. Some teams restrict who can post in the mirrored channel to people who have been briefed. The underlying issue is that Slack's interface gives no visual weight to the difference between a note and a reply, and no amount of documentation fully fixes that."
---

## Why this integration is different

Most helpdesk Slack apps notify you and hand you a link. Intercom's lets the person reading the notification answer the customer.

That sounds incremental and is not. It changes who can participate in support. The engineer who knows exactly why the webhook failed can answer in twenty seconds from a channel they already have open, instead of writing an explanation for a support agent to relay.

For a small product team, that is the difference between answers that are fast and correct and answers that are one of the two.

## Where it stops working

Volume. This model assumes a human is reading the channel and that the number of conversations is small enough for that to be reasonable.

A support team handling meaningful volume needs queues, assignment logic, SLA tracking and reporting — none of which a Slack channel provides. Teams that scale past the point where this works usually keep the integration but narrow it drastically, mirroring only a specific segment where expert input genuinely matters.

Recognising that transition is the main judgement call here. The integration does not degrade gracefully; it goes from excellent to unusable over a few months of growth.

## The tone problem nobody mentions

Removing friction from replying also removes the pause in which someone would have phrased it more carefully. Engineers answering directly from Slack are accurate and occasionally brusque, and the customer cannot tell that the reply came from a different person than the one they were talking to.

This is worth a five-minute conversation during rollout rather than a policy document. Most people adjust immediately once they realise the message goes straight to a customer with no intermediary.

## The setup detail worth extra care

The internal-note convention. Slack renders a note and a reply almost identically, and the failure mode — an internal comment about a customer reaching that customer — is the kind of mistake that gets an integration switched off permanently.

Demonstrate it, do not just document it, and keep the mirrored channel scoped so that the eventual mistake is survivable.
