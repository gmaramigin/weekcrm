---
title: "OTRS Community Edition Pricing Explained (2026)"
description: >-
  OTRS Community Edition is free and always was — but it reached end of life
  after version 6 and no longer receives security fixes. Here is what replaced it.
vendor: otrs-community-edition
date: 2026-07-27
tldr: >-
  OTRS Community Edition costs nothing and never expired, but OTRS AG stopped
  maintaining it after version 6 and no longer issues updates or security fixes.
  Running it today is a security and compliance risk. The free path forward is
  Znuny, a maintained open-source fork; the commercial path is OTRS itself,
  which is quote-only.
tags:
  - OTRS
  - Pricing
  - Help Desk
tiers:
  - name: OTRS Community Edition
    price: "$0"
    billing: "free, open source — end of life, no longer maintained"
    includes: "The full ticketing application as of version 6. No updates, no security fixes, no vendor support. Free in cost and unsupported in practice."
    amount: 0
    unit: "per month"
  - name: Znuny (maintained fork)
    price: "$0"
    billing: "free, open source; actively maintained"
    includes: "A continuation of the OTRS 6 codebase under active open-source development, with ongoing updates and security fixes. Commercial support available from Znuny and third parties."
    amount: 0
    unit: "per month"
  - name: OTRS (commercial)
    price: "Custom quote"
    billing: "sales-negotiated; managed or on-premise deployment"
    includes: "The commercially developed OTRS platform with vendor support, maintenance and managed hosting options. Pricing is not published — a demo and sales conversation are required."
  - name: Third-party support
    price: "Varies by provider"
    billing: "quoted by the provider"
    includes: "Independent consultancies offering migration, hosting and support for OTRS-lineage deployments"
hiddenCosts:
  - "The real cost of Community Edition is not money — it is unpatched security exposure. OTRS AG states plainly that updates and security fixes are no longer released and that continued use may constitute a data protection violation."
  - "Migration is the hidden line item. Moving off Community Edition to Znuny or commercial OTRS means data migration, re-integration and retraining, none of which appears on any price list."
  - "Commercial OTRS pricing is not published at all. There is no rate card, no entry tier and no public benchmark — every deployment is a negotiation, which makes budgeting difficult before engaging sales."
  - "Free forks still cost operations. Znuny is a Perl application with the same administrative demands as OTRS: server management, upgrades, mail gateway configuration and database tuning."
  - "Compliance review is the trigger most organisations hit. Running end-of-life software with known vulnerabilities tends to fail security audits, which converts a free system into an urgent, unbudgeted migration project."
faq:
  - q: "Is OTRS Community Edition still free?"
    a: "Yes, and it always was — but 'free' is no longer the relevant question. OTRS AG ended maintenance after version 6. There are no updates and no security fixes, and the vendor itself warns that continued use may constitute a data protection violation. The licence costs nothing; the risk is the price."
  - q: "What happened to OTRS Community Edition?"
    a: "OTRS AG discontinued it after version 6 and shifted development to its commercial OTRS platform, offered as managed or on-premise deployments. The open-source edition was not sold or transferred — it was simply stopped, which is why the community forked it."
  - q: "What should I use instead if I want something free?"
    a: "Znuny, which continues the OTRS 6 codebase as actively maintained open source with ongoing updates and security fixes. It is the direct successor for organisations that want the OTRS model without cost, and commercial support is available from Znuny and third parties if you need a backstop."
  - q: "What does commercial OTRS cost?"
    a: "Nothing is published. OTRS operates entirely on quotes, with no rate card, no entry tier and no public benchmark. You will need a demo and a sales conversation to get a figure, which makes it hard to compare against vendors that publish pricing — budget time for that process."
  - q: "Can I just keep running Community Edition?"
    a: "Technically yes, and some organisations do. But you are running unmaintained software with unpatched vulnerabilities, typically holding customer correspondence and personal data. That combination fails most security audits and sits badly against GDPR obligations. If it is handling anything sensitive, treat migration as scheduled work rather than a someday project."
  - q: "Is migrating away expensive?"
    a: "The destination can be free; the move is not. Data migration, re-establishing integrations and retraining agents all cost time regardless of which target you pick. Znuny is the cheapest path because the codebase lineage is shared, which keeps migration relatively direct compared with moving to a different product entirely."
---

## A free product whose price was never the point

OTRS Community Edition was, for the better part of two decades, one of the most widely deployed open-source ticketing systems in the world — a fixture in European IT departments, universities and public-sector service desks. It cost nothing, it had no user limits, and it did serious work.

It is also, as of version 6, **end of life**.

OTRS AG's position is unambiguous: the Community Edition is no longer maintained, and updates and security fixes are no longer released. The company goes further in its own guidance, warning that continuing to use it may constitute a data protection violation and describing the security exposure in stark terms.

So the pricing question here is not "what does it cost?" — it is free, and it will remain free. The question is what it costs you to *keep running it*, and what the alternatives are.

## The real cost of running end-of-life ticketing

A ticketing system is an unusually bad place to accept unpatched vulnerabilities. It holds customer correspondence, personal data, internal notes and often credentials shared during support conversations. It is typically reachable by email and frequently exposed to the web.

Unmaintained software in that position creates three costs that never appear on a price list:

**Security exposure.** Vulnerabilities discovered after version 6 remain unfixed, permanently. There is no patch coming.

**Compliance failure.** Running known-vulnerable software holding personal data sits badly against GDPR obligations, and tends to be exactly what a security audit flags. For most organisations this is the trigger that forces action — not a considered technology decision but an urgent, unbudgeted remediation project.

**Migration under pressure.** Moving when you choose to is cheaper than moving when an auditor tells you to. The work is the same; the negotiating position and the timeline are not.

## The three paths forward

| Option | Cost | Maintained | Notes |
|---|---|---|---|
| Stay on Community Edition | $0 | No | Accumulating security and compliance risk |
| Migrate to Znuny | $0 | Yes | Direct fork of the OTRS 6 codebase |
| Commercial OTRS | Quote only | Yes | No published pricing at any level |

**Znuny** is the natural destination for anyone who chose OTRS because it was free and capable. It continues the same codebase under active open-source development with ongoing updates and security fixes, which makes migration comparatively direct — the data model and administrative concepts carry over rather than needing to be relearned. Commercial support is available from Znuny and third-party consultancies if you want a backstop.

**Commercial OTRS** is the vendor's own path, sold as managed or on-premise deployment with support and maintenance. It publishes no pricing whatsoever. There is no entry tier, no rate card and no public benchmark — every deployment is negotiated after a demo. That is a legitimate enterprise sales model, but it means you cannot compare OTRS against Freshservice, Jira Service Management or Zammad without first investing in a sales cycle. Budget the time.

## What free still costs

One caution applies to Znuny and to any self-hosted successor: free software is not free operations.

These are Perl applications with real administrative demands — server provisioning, upgrades, mail gateway configuration, database tuning, backups and security patching. Organisations that ran OTRS successfully already have those skills and will be fine. Organisations that inherited an OTRS instance nobody fully understands — a very common situation with software this long-lived — should be honest about whether they can maintain the replacement any better than they maintained the original.

If the answer is no, a hosted commercial help desk may be the cheaper option once staff time is priced properly, even against a licence cost of zero.

## Who should read this and what to do

If you are currently running OTRS Community Edition, the practical advice is straightforward: **treat migration as scheduled work, not a someday project.** The system is not going to break tomorrow, but the risk compounds quietly and the eventual trigger is usually external and inconvenient.

If you have the operational capability, Znuny is the lowest-friction destination and costs nothing. If you do not, price a hosted alternative honestly against the staff time your current setup consumes — and include commercial OTRS in that evaluation if you are willing to run a sales process to find out what it costs.

If you are evaluating OTRS Community Edition fresh in 2026, do not deploy it. Whatever attracted you to it is better served by Znuny, which is the same software still receiving security fixes.

Confirm the current status of Znuny releases and OTRS commercial offerings directly before planning a migration.
