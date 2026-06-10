---
title: osTicket vs Zammad (2026)
description: >-
  osTicket and Zammad are both free, self-hostable open-source help desks, but
  they differ in tech stack, polish, and enterprise authentication. Here's how
  to choose between them.
a: osticket
b: zammad
date: 2026-06-10
tags:
  - osTicket
  - Zammad
  - Comparison
---

## TL;DR

- **Pick osTicket** if you want a battle-tested, lightweight PHP/MySQL ticketing system that's easy to stand up on commodity hosting and covers the support basics well.
- **Pick Zammad** if you want a more modern open-source help desk with strong enterprise authentication, broader channels, and you can run a Ruby-based stack.

## Pricing and licensing

Both are genuinely free to self-host, which is the whole point. osTicket is GPL-licensed with source on GitHub and offers a managed cloud starting around $12/agent/month if you'd rather not run servers. Zammad is licensed under AGPLv3 — a stronger copyleft that requires sharing modifications even for networked use — and its managed cloud starts cheaper, around €5/agent/month, with a Plus tier near €24/agent/month that covers features rivals lock behind far pricier plans. For pure self-hosting, both cost nothing in licensing; the only spend is infrastructure and your team's time. On hosted plans, Zammad's entry price undercuts osTicket's cloud.

## Tech stack and self-hosting

This is the most practical difference for whoever runs the server. osTicket is a classic PHP/MySQL application — it installs on virtually any LAMP host, which makes it cheap and familiar to deploy, and its modest footprint runs happily on small servers. Zammad is built on Ruby, with heavier dependencies (typically Elasticsearch, a database, and a background job system), so it asks more of your infrastructure and your ops knowledge. If your team is comfortable with PHP and wants the simplest possible install, osTicket is lighter. If you can support a Ruby stack, Zammad rewards the effort with a more capable platform.

## Features and channels

Zammad is the broader product. It funnels email, phone, live chat, Twitter/X, Facebook, and web forms into one queue with strong automation and reporting. osTicket covers email piping, web forms, and API submission with auto-assignment by help topic, SLA timers with escalation, and a built-in knowledgebase — solid fundamentals, but a narrower channel set and basic reporting that often pushes you to export data for real analysis. For multi-channel social support out of the box, Zammad is ahead; for straightforward email-and-web ticketing, osTicket is entirely sufficient.

## Authentication and enterprise fit

Zammad clearly targets technical teams with data-sovereignty needs: LDAP, Active Directory, SAML, OAuth, and SSO are supported out of the box, plus a full REST API for deep integration. osTicket has an API and integrations but doesn't match that enterprise auth breadth natively. If you need to plug the help desk into corporate identity infrastructure, Zammad fits more cleanly.

## Community versus support and polish

osTicket's long deployment history means a large community and plenty of documentation, but its interface is noticeably dated. Zammad's UI is more modern though still less polished than commercial SaaS, and its commercial cloud/support options give you a clearer paid escalation path. Both put ongoing patching, upgrades, and security on you when self-hosted.

## Bottom line

Choose osTicket for a lightweight, low-cost, easy-to-host ticketing system on a familiar PHP stack when your needs are mostly email and web forms. Choose Zammad when you want broader channels, enterprise authentication, a stronger API, and a more modern feel — provided you can run and maintain a Ruby-based deployment. Both are excellent free options; the deciding factors are your tech stack and how much help desk you actually need.
