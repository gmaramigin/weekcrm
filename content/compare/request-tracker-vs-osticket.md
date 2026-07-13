---
title: "Request Tracker (RT) vs osTicket (2026)"
description: >-
  Two open-source ticketing veterans with two decades each in production. RT bends
  to any workflow you can script; osTicket does the common case with far less
  administration. Pick based on the skills you actually have on staff.
a: request-tracker
b: osticket
date: 2026-07-13
tags:
  - Request Tracker (RT)
  - osTicket
  - Comparison
---

## TL;DR

- **Pick Request Tracker (RT)** if you need the ticket system to model your process rather than the reverse — custom fields, queues, roles, lifecycle scripts, fine-grained permissions — and you have Linux administration skills on the team.
- **Pick osTicket** if your process is ordinary (email or form comes in, gets routed to a department, an agent works it, it closes) and you'd rather run a PHP/MySQL app than maintain a scriptable workflow engine.

## Same license model, very different demands

Both are free, open-source, self-hosted, and both have been in production for over twenty years. Neither is going to disappear. Neither will charge you per seat if you run it yourself. On the surface they occupy the same square on the board.

The difference is in what they ask of you.

osTicket is a help desk. It funnels email, phone-logged, and web-form requests into one queue, auto-assigns by help topic, applies SLA targets with escalation alerts, and gives customers a knowledgebase. Its scope is well-defined and its configuration surface is finite. You can get it doing useful work quickly.

RT is closer to a workflow engine that ships with a ticketing UI. Unlimited custom fields, queues, roles, and lifecycle scripts mean you can model almost any process — which is a way of saying you *will* be modeling your process. There are 400+ community extensions, which is wonderful if you know what you need and a sprawl if you don't. Best Practical has kept it under active development for two decades, and the deployments that prove it out — universities, government agencies, non-profits, IT operations — are precisely the ones with unusual requirements and technical staff on hand.

## The customization ceiling is the whole argument

If your requirement is "route tickets to the right department and don't miss the SLA," osTicket clears it and RT's extra power is dead weight you'll pay for in administration.

If your requirement contains the words "except when," RT is the one that survives. Fine-grained access controls and scriptable automation let you express rules that osTicket's help-topic routing simply cannot represent. Approval chains, conditional lifecycles, per-queue permission models, ticket states that don't fit new/open/closed — this is RT's home turf and it is not close.

Two more RT capabilities worth naming because osTicket doesn't match them:

**Asset management is built in.** RT tracks tangible and intangible assets alongside tickets in the same system. For an IT operations team, that's a second product you don't have to buy or integrate.

**Email is a first-class interface, not an intake channel.** In RT, staff can triage, respond, and resolve tickets entirely by email without ever loading the web UI. osTicket does email piping — mail comes *in* — but the agent workflow lives in the browser. If your senior engineers live in mutt or Outlook and resent being dragged into a web app, that's a genuine adoption difference, not a preference.

## The staffing question decides it

Both self-hosted options come with the same non-negotiable bill: you own the server, the backups, the TLS, the upgrades, and the security patches. There is no version of this where "free" means free.

But the skills differ. osTicket asks for PHP/MySQL server management — a common, hireable, well-documented skill set. RT asks for Linux administration, and the deeper you go into lifecycle scripts and extensions the more it asks for someone who can read and write code against it. That person is more expensive and harder to replace.

Be honest about whether that person exists on your team and will still be there in three years. RT deployments that outlive their maintainer become archaeology.

## Where each genuinely disappoints

**RT's weakness is onboarding.** The UI is functional and dated, and putting non-technical users in front of it takes real effort. The reporting is powerful but not point-and-click — you'll build what you need rather than pick it from a menu. RT rewards technical staff and punishes everyone else.

**osTicket's weakness is the ceiling.** The interface is also dated, but the harder limit is analytical: reporting is basic, and complex analytics mean exporting data somewhere else entirely. Where RT's constraint is "you'll have to build it," osTicket's is "you can't." When you outgrow osTicket's routing model, there's no extension ecosystem to rescue you.

## The cloud editions cancel the main advantage

Both offer a hosted way out, and both cost you the reason you were here. osTicket cloud starts at $12/agent/mo; RT cloud starts at $15/user/mo. In both cases the per-seat fee erases the free-software advantage for any team of meaningful size, and you're now paying SaaS rates for a dated UI.

If self-hosting isn't viable for you, the honest move isn't hosted RT or hosted osTicket — it's shopping the SaaS help desk market properly, where the same money buys a far more polished product.

## Bottom line

This comes down to whether your process is normal. If it is, osTicket is the pragmatic choice — less to administer, less to learn, and it does the common case competently for zero license cost. If your process is genuinely idiosyncratic, or you need real asset tracking, or your team wants to work tickets from their mail client, RT is the only one of the two that can be made to fit, and its twenty-year track record in exactly those environments is not an accident. Choose osTicket for simplicity, RT for control — and in both cases, name the person who owns the server before you install anything.
