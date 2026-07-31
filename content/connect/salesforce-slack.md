---
title: "Salesforce and Slack: The Integration Salesforce Owns Both Ends Of"
description: >-
  Salesforce bought Slack, which changed what this integration is. It is no longer
  a connector — it is a product line, and the free app is deliberately the thin end
  of it.
vendor: salesforce
platform: Slack
platformSlug: slack
date: 2026-07-31
method: "Native — Salesforce for Slack app, plus Flow actions and paid Slack Sales Elevate"
direction: "Salesforce → Slack for alerts and record cards; Slack → Salesforce for record updates on supported objects"
setupTime: "1 hour for the base app; a project for Sales Elevate"
availability: "Base app included with Sales Cloud; Slack Sales Elevate is a separately licensed product"
tldr: >-
  The free app gives you record search, record cards in channels and Flow-triggered
  alerts. Editing pipeline from inside Slack, deal rooms and rep dashboards are Slack
  Sales Elevate, which is a per-user licence on top of both products.
tags:
  - Salesforce
  - Slack
  - Integrations
syncs:
  - what: "Record search and unfurls"
    direction: "Salesforce → Slack"
    notes: "Pasting a Salesforce link expands into a record card in the channel. Search returns accounts, opportunities and cases inline."
  - what: "Flow-triggered alerts"
    direction: "Salesforce → Slack"
    notes: "Any Flow can post to a channel or DM. This is the workhorse — record-triggered Flows on opportunity stage, case escalation or amount thresholds."
  - what: "Record updates from Slack"
    direction: "Slack → Salesforce"
    notes: "Supported objects can be edited from the record card without leaving the channel. Coverage is narrower than people expect and depends on the app version."
  - what: "Channel-to-record association"
    direction: "Two-way"
    notes: "A Slack channel can be linked to an account or opportunity, so the conversation is discoverable from the record."
  - what: "Approvals"
    direction: "Two-way"
    notes: "Approval requests can route to Slack and be actioned there, which is the single fastest win in most Salesforce–Slack rollouts."
  - what: "Digests and pipeline views"
    direction: "Salesforce → Slack"
    notes: "Scheduled summaries of pipeline changes. Rich versions of this are Slack Sales Elevate rather than the base app."
  - what: "Case notifications"
    direction: "Salesforce → Slack"
    notes: "Service Cloud escalations into a channel with swarm-style collaboration on the case."
limits:
  - "**The good version costs money.** Slack Sales Elevate is a licensed product. Teams that install the free app expecting in-Slack pipeline management find a search tool and a notifier."
  - "**Setup is admin work, not app-store work.** Connected app configuration, Flow building and permission sets are all involved. This is not a ten-minute install."
  - "**Object coverage for in-Slack editing is uneven.** Standard objects are well supported; custom objects and heavily customised page layouts often are not."
  - "**Alert volume kills adoption faster here than anywhere else**, because Flow makes it trivially easy to notify on everything. Every Salesforce–Slack rollout over-notifies in month one."
  - "**Slack Connect channels with customers need a governance decision** before you link them to accounts — record cards containing internal fields can render in a channel a customer is sitting in."
steps:
  - "Install Salesforce for Slack from the Slack App Directory and complete the connected app setup in Salesforce. Do this in a sandbox-connected workspace first if you have one."
  - "Assign the permission set to a pilot group of five to ten reps rather than the whole org. Adoption problems here are behavioural, and small groups surface them early."
  - "Build alerts as record-triggered Flows with tight entry criteria — opportunity amount above a threshold, or stage regressing rather than every stage change."
  - "Route approvals to Slack early. It is the feature with the clearest payoff and it makes the rest of the rollout easier to sell internally."
  - "Decide your Slack Connect policy before linking any customer-facing channel to an account record, and check what a record card actually renders to an external member."
  - "Evaluate Slack Sales Elevate only after the free app has been in use for a month, so you are buying against observed gaps rather than a demo."
faq:
  - q: "Is Slack Sales Elevate necessary, or is the free app enough?"
    a: "The free app is enough if what you want is visibility and search — reps looking up an account without switching tabs, and managers getting alerted when a large deal moves. Sales Elevate is for teams that want Slack to be where pipeline is actually managed: rep-level dashboards, deal rooms tied to opportunities, and update flows designed for daily use. It is a per-user cost on top of Sales Cloud and Slack, so the honest test is whether your reps currently update Salesforce reliably. If they do not, Sales Elevate can genuinely fix that; if they do, it is a convenience purchase."
  - q: "Can I update an opportunity from Slack without opening Salesforce?"
    a: "On supported objects and with the right permissions, yes — the record card exposes editable fields. The caveat is that coverage depends heavily on how customised your org is. Orgs with required custom fields, validation rules or complex page layouts often find the in-Slack edit fails validation, and the rep ends up in Salesforce anyway. Test against your real page layouts, not a clean demo org."
  - q: "Does linking a Slack channel to an account expose internal data?"
    a: "It can, and this is the part worth reviewing before rollout. Record cards render fields the viewer has access to, but Slack Connect channels contain external members whose access model is not your Salesforce permission model. The safe pattern is to link internal channels to records freely and to treat any customer-facing Slack Connect channel as a place where record cards are posted deliberately rather than automatically."
---

## What changed when Salesforce bought Slack

Before the acquisition, this was a connector: alert Slack when Salesforce changes. After it, Slack became a surface Salesforce sells into, and the integration split into a free tier that demonstrates the idea and a paid tier that delivers it.

That is not a criticism, but it does mean the answer to "does the Salesforce Slack integration do X" is usually "which one".

## The feature nobody mentions and everybody uses

Approvals. Discount approvals, quote approvals, anything sitting in a queue waiting on a manager who is in meetings all day — routing those to Slack and letting them be actioned from a message removes hours of latency from deal cycles.

It is unglamorous, it works in the free app, and it delivers more measurable value in the first month than pipeline visibility usually does.

## The Flow discipline problem

Flow makes it a two-minute job to notify a channel on any record change. That is the danger. Every rollout goes through a phase where #sales receives forty messages a day and everybody mutes it, at which point the alert that mattered arrives to nobody.

Set the rule early: channels receive exceptions, owners receive their own records, and anything that fires more than a handful of times a day gets its criteria tightened or gets deleted.

## Where it does not compete

Salesforce for Slack is an internal collaboration layer. If your customers live in shared Slack channels and you need those conversations triaged, tracked with SLAs and reported on, that is a Slack-native support product rather than this. The Salesforce app assumes Slack is where your team is, not where your customers are.
