---
title: "Close and Zapier: Filling the Gaps Around a Deliberately Focused CRM"
description: >-
  Close does sales activity extremely well and does not try to be everything else.
  Zapier is how most Close teams reach the rest of their stack, and the trigger you
  choose determines whether it stays affordable.
vendor: close
platform: Zapier
platformSlug: zapier
date: 2026-07-31
method: "Third-party — Close's official Zapier app, alongside Close's own Workflows and API"
direction: "Two-way: Close events trigger Zaps, and Zaps create or update leads, contacts and opportunities"
setupTime: "Minutes per Zap"
availability: "Any Close plan with API access; Zapier capability depends on your Zapier tier"
tldr: >-
  Triggers on new and updated leads, opportunities, calls and emails; actions to create
  or update leads, contacts, opportunities and tasks. Use Close's own Workflows for
  anything internal and Zapier only where the other end is outside Close.
tags:
  - Close
  - Zapier
  - Integrations
syncs:
  - what: "New lead trigger"
    direction: "Close → Zapier"
    notes: "The standard hook for notifying elsewhere or enriching a lead from an external source."
  - what: "Opportunity status change"
    direction: "Close → Zapier"
    notes: "More precise than a general lead-updated trigger and the right hook for anything tied to pipeline movement."
  - what: "Call and email activity"
    direction: "Close → Zapier"
    notes: "Because Close captures calls natively, these triggers give you activity data most CRMs cannot emit — useful for reporting outside the CRM."
  - what: "Create or update lead"
    direction: "Zapier → Close"
    notes: "The inbound path for form fills, signups and list imports. Matching on email or company prevents duplicates."
  - what: "Create task"
    direction: "Zapier → Close"
    notes: "Turning an external event into a follow-up assigned to the lead owner, which is how external signals become sales activity."
  - what: "Custom fields"
    direction: "Two-way"
    notes: "Addressable by ID. Renaming is safe; deleting and recreating a field breaks every Zap referencing it, silently."
  - what: "Notes"
    direction: "Zapier → Close"
    notes: "Writing external context onto the lead — product usage, survey responses, support summaries — which is the underused direction."
limits:
  - "**Close's own Workflows handle internal automation better.** Sequences, task creation and follow-up cadences belong there, not in Zapier."
  - "**Polling latency on lower Zapier plans** makes anything time-sensitive a poor fit."
  - "**Custom fields are referenced by ID**, so restructuring fields breaks Zaps with no obvious error."
  - "**No bulk backfill.** Zaps act from the moment they are switched on; historical data needs an import or an API script."
  - "**Zaps are invisible from inside Close.** A lead that appeared for no apparent reason means opening Zapier to find out why."
steps:
  - "Check whether Close Workflows can do the job first. If both ends are inside Close, build it there — no task cost, no latency, and visible to your team."
  - "Use the most specific trigger available, and add a filter step immediately after any broad one before the action runs."
  - "For inbound Zaps, match on email or company so you update the existing lead rather than creating a duplicate."
  - "Prefer creating a task over silently setting a field. A field change is invisible; a task assigned to the lead owner produces action."
  - "Name every Zap with its purpose and owner, and keep a shared list of what is live and which Close fields it touches."
  - "Review quarterly and delete what is unused. Automation accumulates faster than anyone removes it."
faq:
  - q: "When should I use Close Workflows instead of Zapier?"
    a: "Whenever both ends are inside Close. Workflows handle sequenced outreach, task creation, follow-up cadences and status-driven actions natively — they run instantly, cost no Zapier tasks, and any Close admin can see them. Building that logic in Zapier instead adds latency and cost and hides it from the people administering the CRM. Zapier's role is crossing boundaries: reaching a form builder, a billing system, a product database or an internal tool that Close has no native connector for."
  - q: "What is the most useful thing to build?"
    a: "Inbound context. Most teams use Zapier to push data out of the CRM, which mainly produces notifications. The more valuable direction is writing external signals in — a product usage milestone creating a task for the lead owner, a support ticket summary added as a note, a billing event updating a field. That turns Close from a record of what sales did into a record of what the customer is doing, which is a materially better thing to have open before a call."
  - q: "Why did my Zap stop working after I changed a custom field?"
    a: "Because Zapier references Close custom fields by internal ID rather than by label. Renaming a field is safe since the ID does not change. Deleting a field and creating a replacement — which is what people do when they want to change its type — produces a new ID, and every Zap pointing at the old one either errors or silently writes nothing. Before restructuring fields, list which Zaps touch them and re-map afterwards, because the silent-failure version of this is the one that goes unnoticed for weeks."
---

## Why Close teams reach for Zapier more than most

Close is unusually focused. It does calling, emailing, sequences and pipeline extremely well, and it deliberately does not attempt to be a marketing platform, a support desk or a project tool.

That focus is the product's strength and it means the surrounding stack is larger. Zapier is how most Close teams connect it — and because Close's own Workflows cover internal automation properly, the Zaps that remain are genuinely boundary-crossing rather than logic that should have lived in the CRM.

That is a healthier position than most CRM-plus-Zapier setups end up in.

## The direction worth prioritising

Inbound, not outbound.

Almost every team starts by building Zaps that push Close events elsewhere: notify a channel when a deal is won, add a row to a sheet. Those are easy and mostly produce noise.

The Zaps that change outcomes go the other way. A trial account hitting an activation milestone creating a task for the lead owner. A support conversation summary written as a note. A failed payment updating a field the rep can filter on.

Those turn external reality into sales activity, and they are the ones people wish they had built first.

## Tasks beat fields

A Zap that sets a custom field has done something no human will notice. A Zap that creates a task assigned to the lead owner has done something that appears in someone's day.

Close's interface is built around working a queue of leads and tasks, so writing into that queue is how an automation actually influences behaviour. It is a small design choice with a large difference in whether the automation matters.

## The maintenance habit

Zaps are invisible from inside Close, which means a year from now somebody will find data appearing with no explanation in the CRM's own configuration.

A naming convention including the owner, plus a one-page list of live Zaps and the fields they touch, is the entire fix. It takes ten minutes and it is the difference between automation you can safely change and automation nobody dares turn off.
