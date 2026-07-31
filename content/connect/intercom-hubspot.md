---
title: "Intercom and HubSpot: Chat Data Where Marketing Can Use It"
description: >-
  Two tools that both think they own the contact. The integration is good; the useful
  part is deciding which one is allowed to be right about a person's attributes.
vendor: intercom
platform: HubSpot
platformSlug: hubspot
platformVendor: hubspot
date: 2026-07-31
method: "Native — HubSpot integration in the Intercom App Store"
direction: "Two-way: contact and company data sync, conversation events flow to HubSpot"
setupTime: "Half a day including attribute mapping"
availability: "Available on Intercom paid plans; HubSpot side works from most tiers, with workflow use requiring Professional"
tldr: >-
  Intercom contacts and companies sync with HubSpot, conversation events land on the
  HubSpot timeline, and HubSpot properties can render in the Intercom inbox. The
  mapping decision — which system owns which attribute — is the entire project.
tags:
  - Intercom
  - HubSpot
  - Integrations
syncs:
  - what: "Contacts"
    direction: "Two-way"
    notes: "Matched on email. Intercom leads and users both map to HubSpot contacts, which is where the lifecycle question starts."
  - what: "Companies"
    direction: "Two-way"
    notes: "Intercom companies map to HubSpot companies. Domain-based matching works reasonably; name-based matching does not."
  - what: "Conversation events"
    direction: "Intercom → HubSpot"
    notes: "Chat started, replied and closed appear on the HubSpot timeline, giving sales visibility of support contact without a seat."
  - what: "Attributes ↔ properties"
    direction: "Configurable per field"
    notes: "Intercom custom attributes map onto HubSpot properties. Direction should be set per field rather than left two-way."
  - what: "HubSpot data in the Intercom inbox"
    direction: "HubSpot → Intercom"
    notes: "Deal stage, owner and lifecycle render beside the conversation, so an agent knows they are talking to an open opportunity."
  - what: "Workflow triggers"
    direction: "Intercom → HubSpot"
    notes: "Conversation activity can enrol contacts in HubSpot workflows, which is where the marketing value sits. Requires HubSpot Professional."
limits:
  - "**Both systems want to own the contact.** Without explicit per-field direction, attributes ping-pong and neither team trusts what they see."
  - "**Intercom's lead-versus-user model does not map cleanly onto HubSpot's lifecycle stages**, and reconciling the two takes more thought than the setup screen implies."
  - "**Conversation events can clutter the HubSpot timeline** on high-volume chat products, burying the sales activity a rep is looking for."
  - "**Company matching by name produces duplicates.** Domain matching is the only reliable path, which means both systems need domains populated."
  - "**Workflow-based automation on the HubSpot side needs Professional**, so teams on Starter get visibility without the ability to act on it automatically."
steps:
  - "Decide field ownership before configuring anything. Product usage attributes belong to Intercom; marketing lifecycle and source belong to HubSpot. Write it down."
  - "Install the HubSpot integration from Intercom's App Store and authorise it against your production HubSpot portal."
  - "Map a deliberately small set of attributes first — plan, signup date, last seen — and confirm they behave before adding more."
  - "Set direction per field rather than leaving defaults on two-way. Two-way should be reserved for fields where a conflict genuinely does not matter."
  - "Decide which conversation events reach HubSpot. On a high-volume product, closed conversations only is usually enough and keeps the timeline readable."
  - "Configure the HubSpot data shown in the Intercom inbox, keeping it to what an agent can act on: deal stage, owner, lifecycle."
  - "Test with a contact that exists in both systems with conflicting values, which is the case that reveals whether your mapping is right."
faq:
  - q: "Which system should own the contact record?"
    a: "Split it by data type rather than choosing one system wholesale. Intercom knows things HubSpot cannot — last seen, sessions, feature usage, conversation history — and those attributes should originate in Intercom and flow outward. HubSpot knows things Intercom cannot — original source, lifecycle stage, marketing consent, deal association — and those should flow the other way. Setting everything to two-way is the common shortcut and produces fields that change value depending on which system last wrote to them, which is worse than having the data in only one place."
  - q: "Will chat conversations flood the HubSpot timeline?"
    a: "On a high-volume product, yes, if you sync every event. A contact who chats weekly generates a stream of started, replied and closed events, and a sales rep opening that record has to scroll past all of it to find the meeting they are looking for. The fix is selectivity: sync conversation closed rather than every message event, or restrict the sync to conversations from contacts above a certain lifecycle stage. Visibility of support contact is valuable; a complete chat log on the CRM timeline is not."
  - q: "Do I still need both tools?"
    a: "Often yes, because they solve genuinely different problems — Intercom is a customer messaging and support product, HubSpot is a CRM and marketing platform, and the overlap is narrower than the marketing from either suggests. Where the question becomes real is chat and email marketing, which both now offer. Running both chat tools or both email tools is the duplication worth eliminating; running Intercom for support and HubSpot for CRM is a normal, defensible stack."
---

## The overlap that causes trouble

Intercom and HubSpot both maintain a contact record with attributes, both support segmentation, both can send email, and both can run chat. The integration joins two systems that partially duplicate each other.

That is fine as long as you decide where each thing lives. It becomes a mess when both teams configure their own tool as if it were the only one, and the sync then fights over the same fields.

## The split that works

Intercom owns behaviour. Last seen, session count, feature adoption, plan, conversation history — Intercom observes these directly and HubSpot can only receive them.

HubSpot owns commerce and marketing. Lifecycle stage, original source, consent, deal association, owner — these are CRM concepts and Intercom should display rather than define them.

Set field direction accordingly, reserve two-way for fields where a conflict is harmless, and the integration becomes uncontroversial.

## What the sales team actually gets

The ability to see, before a call, that this account has opened four support conversations this month. That is a materially different meeting from one where the rep does not know.

It is also the argument for selectivity in what you sync. A rep needs to know support contact is happening and roughly what about; they do not need every chat message on the timeline, and burying the last meeting under forty chat events makes the record worse rather than better.

## What the support team actually gets

Knowing the person on the other end of a chat is an open opportunity worth a meaningful amount, with a named owner. Agents handle that conversation differently, and correctly so.

This direction of the integration is usually configured as an afterthought and delivers a surprising amount. Keep the fields visible in the inbox to a handful that an agent can act on — stage, owner, value — rather than mirroring the whole record.
