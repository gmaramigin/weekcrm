---
title: Request Tracker (RT) vs Zammad (2026)
description: >-
  Two open-source ticketing systems with genuinely free self-hosted editions and
  very different paid paths. RT is the decades-old email-native workhorse of
  university and government IT; Zammad is the newer multi-channel desk with hard
  agent caps on cloud and flat-fee support subscriptions for self-hosters.
a: request-tracker
b: zammad
date: 2026-07-29
tags:
  - Request Tracker (RT)
  - Zammad
  - Comparison
---

## TL;DR

- Both self-hosted editions are genuinely free with no user or ticket limits. Neither is free of work.
- Cloud RT: $15/user (Starter, 5-user minimum, 250 tickets/month), $29 (Business, 10-user minimum, 1,000 tickets), $39 (Growth, 5,000 tickets), annual only. Tickets and seat floors move you, not features.
- Zammad cloud: €7/agent Starter (hard cap 5 agents), €16 Professional (cap 35), €25 Plus (uncapped), annual, ex-VAT. Headcount moves you, full stop.
- Zammad also sells flat-fee support on your own install — €2,999, €5,999, €9,999 a year regardless of agent count. RT has no published equivalent.
- Both rate 4.1 here. This is a fit question, not a quality one.

## The free editions, and what each demands

RT has run in university IT departments, research labs, non-profits, and government agencies since the late 1990s. Self-hosted it is complete: unlimited users, unlimited tickets, nothing held back, plus 400-plus community extensions and built-in asset management that tracks tangible and intangible assets alongside tickets. It is a Perl application, configuration lives closer to text files than admin panels, and running it means owning the mail gateway, the database, the upgrade path, and the patching.

Zammad's community edition is AGPLv3 with no agent limit and no feature crippling — full channel coverage, LDAP, Active Directory, SAML, OAuth and SSO out of the box, and a complete REST API. The operational load differs in texture rather than degree: sizing a server, keeping Elasticsearch healthy, testing backups, taking a maintenance window each release.

Neither is free once you price staff time honestly. The question is which administrator you already employ — Unix-habit shops find RT unremarkable to run; shops thinking in container images and search clusters find Zammad more familiar.

## Two paid paths that fail in opposite ways

Cloud RT's per-user rates look mild until you read the seat minimums. Starter is $15 with a five-user floor, so the cheapest real invoice is $900 a year even for two people. Business is $29 with a ten-user floor — $3,480. The advertised per-seat increase is 93%; the smallest possible bill grows 287%, because the floor doubles at the same moment the rate does.

Worse, headcount is not what pushes you across that line. Tickets are. Starter allows 250 a month, roughly a dozen per working day, and RT positions Starter for exactly the teams most likely to blow through it — small groups consolidating a shared inbox that turns out to hold 400 monthly threads once properly ticketed. Storage ladders alongside at 10, 30, and 75 GB. Support response is a paid ladder too: nothing published on Starter, two business days on Business, one on Growth, four business hours only at Enterprise. Academic buyers get 20% off and non-profits 10% — worth claiming, given where RT's installed base actually lives.

Zammad's cloud fails differently. No seat minimum, no ticket meter; instead the tiers are brackets your hiring plan grows out of. Starter physically refuses to hold more than five agents, Professional stops at 35. A four-person team on Starter that hires two people in Q3 does not pay €7 for the extra pair — it pays €16 for all six, a 33% headcount change for more than double the bill. Zammad's other variable is AI, metered at €0.03 per call rather than bundled, and every published price excludes VAT.

## The flat-fee option only one of them offers

Zammad's support subscriptions on a self-hosted install are flat annual fees — €2,999 Business (email, six-hour response), €5,999 Enterprise (email and phone, four-hour), €9,999 Corporation — with no per-agent component. A six-agent shop and a two-hundred-agent shop pay the same number.

That inverts the usual math at scale. Fifty agents on Zammad cloud Plus is €15,000 a year; the Corporation subscription covers unlimited agents at €9,999 with a faster response target. Below roughly ten agents the flat fee works against you; above twenty to thirty, self-hosting with paid support becomes a budget argument rather than a philosophical one.

RT publishes no comparable construct: self-hosted RT is free and unsupported, or you buy Cloud RT with per-user pricing and its own SLA ladder.

## What the work looks like day to day

RT is email-native to an unusual degree — staff can triage, respond, and resolve entirely from a mail client without touching the web UI. For infrastructure teams and academic departments where everyone already lives in email, that is a genuine productivity property rather than nostalgia. Customization goes deep: unlimited custom fields, queues, roles, and lifecycle scripts model workflows that would need a consultant elsewhere. Reporting is powerful and distinctly not point-and-click, and the dated interface makes onboarding non-technical users real work.

Zammad covers more channels — email, phone, live chat, Twitter/X, Facebook, and web forms into one queue — with strong automation and enterprise authentication. Its UI is also less polished than Zendesk's, but it is a modern web application rather than a decades-old one, and non-technical agents get productive faster. Its AI capabilities are thinner than newer SaaS competitors': neither product competes for deflection work.

## Who should pick what

- **Universities, research computing, government IT** → RT, self-hosted, and claim the 20% academic discount if you take cloud instead. This is its native habitat and the asset management is a real bonus.
- **European teams with data sovereignty requirements** → Zammad. AGPLv3, self-hostable, and the vendor's commitment to staying open source is part of the pitch.
- **Support desks needing social, chat, and phone in one queue** → Zammad. RT does not go there.
- **Teams that work primarily out of email and want ticketing to disappear into it** → RT, comfortably.
- **20+ agents wanting supported open source** → Zammad's flat self-hosted subscriptions, which get better per agent as you grow.
- **Small teams with high ticket volume and no sysadmin** → neither cloud offering fits well. Cloud RT's 250-ticket Starter cap and Zammad's five-agent Starter ceiling both bite early; price Freshdesk and Zendesk on merit before assuming open-source lineage means cheaper.

## Bottom line

Both are credible, both are free to run yourself, and both charge for the thing you were going to pay for anyway — somebody else's operational competence. Choose RT if your workflows are complex, your staff live in email, and you value a system that bends to your process over one that looks modern; its twenty-plus year track record is the whole argument. Choose Zammad if you need channel breadth, want enterprise authentication configured without ceremony, or expect to grow past the point where per-agent pricing stops making sense — the flat-fee support subscriptions are the best structural deal in this comparison. And model the caps before signing either annual contract: RT will move you on tickets, Zammad will move you on hires.
