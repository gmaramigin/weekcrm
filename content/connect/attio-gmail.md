---
title: "Attio and Gmail: The Integration the CRM Is Built Around"
description: >-
  In most CRMs, email sync is a feature. In Attio it is the foundation — connect a
  mailbox and the CRM populates itself from your existing conversation history.
vendor: attio
platform: Gmail
platformSlug: gmail
date: 2026-07-31
method: "Native — Google account connection at the user level, core to the product"
direction: "Two-way: mail and calendar sync in, records and relationship data build out"
setupTime: "5 minutes per user, then wait for the backfill"
availability: "Core functionality on all Attio plans"
tldr: >-
  Connecting Gmail does not just log emails onto records — it creates the records.
  Attio reads who you have been emailing and meeting, builds people and companies
  from it, and derives relationship strength from real interaction history.
tags:
  - Attio
  - Gmail
  - Integrations
syncs:
  - what: "Email history"
    direction: "Gmail → Attio"
    notes: "Backfilled, not just captured going forward. A new workspace populates with years of existing relationships within hours of connecting."
  - what: "Automatic record creation"
    direction: "Gmail → Attio"
    notes: "People and companies are created from correspondents and their email domains, with company enrichment from the domain."
  - what: "Calendar events"
    direction: "Two-way"
    notes: "Meetings attach to the people and companies who attended, which is where much of Attio's relationship data comes from."
  - what: "Threads on records"
    direction: "Gmail → Attio"
    notes: "Full conversation threads render on the person and company record, visible according to your workspace's email sharing settings."
  - what: "Relationship strength"
    direction: "Derived"
    notes: "Attio computes who in your team has the strongest connection to a contact from actual message and meeting frequency."
  - what: "Sending"
    direction: "Attio → Gmail"
    notes: "Email sent from Attio goes through your connected Gmail account, so it appears in Sent and threads normally for the recipient."
  - what: "Last-interaction fields"
    direction: "Derived"
    notes: "Automatically maintained timestamps that power the \"nobody has spoken to this account in 60 days\" views most teams end up living in."
limits:
  - "**The automatic record creation is aggressive by design.** Without configuration you will have companies for your accountant, your landlord and every SaaS vendor that has ever emailed you."
  - "**Email visibility is a real decision.** Attio's sharing settings determine how much of a connected mailbox colleagues can see, and the permissive option surprises people."
  - "**Backfill depth depends on the mailbox**, and very large or heavily archived accounts take longer than the five-minute setup implies."
  - "**Enrichment is domain-based.** Free-mail contacts — Gmail, Outlook.com addresses — do not resolve to a company, which matters if you sell to sole traders or consumers."
  - "**A shared alias should not be connected as a personal mailbox.** Support and sales aliases sync everything under one user and distort the relationship data the product is built on."
steps:
  - "Connect your own Google account first and let the backfill run before adding the team. Seeing what it produces changes how you configure it."
  - "Set the workspace email sharing policy before other users connect. This is the conversation to have once, up front."
  - "Configure which domains should not create companies — your own, common free-mail providers, and your suppliers — so the company object stays meaningful."
  - "Have every commercial team member connect, not just sales. Attio's relationship data is only as good as its coverage, and a founder's mailbox is usually the richest source in the company."
  - "Connect calendars at the same time. Meeting data contributes disproportionately to relationship strength and to the last-interaction fields."
  - "Build one list on last-interaction date — accounts with no contact in 60 days — within the first week. It is the view that demonstrates why the email sync matters."
faq:
  - q: "Does Attio really read my whole mailbox?"
    a: "It syncs your mail and calendar in order to build the relationship graph the product is based on, which is a genuinely different posture from CRMs that log only what you explicitly mark. That is the trade Attio asks you to make: significantly less manual data entry, in exchange for connecting a mailbox properly. Workspace sharing settings control what colleagues see rather than what is synced, so teams with sensitive correspondence should review those settings first and consider which mailboxes to connect at all."
  - q: "Why is my Attio workspace full of companies I've never sold to?"
    a: "Because automatic creation is doing exactly what it is designed to do — every domain you have corresponded with becomes a company. That is a feature when it surfaces a forgotten conversation with a prospect from two years ago, and clutter when it creates records for your bank and your office supplier. The fix is configuring excluded domains early and using lists rather than the raw company object as your working surface. Attio's model assumes the database is broad and your lists are narrow."
  - q: "Can I send email from Attio and have it appear in Gmail?"
    a: "Yes — sending goes through your connected Google account, so the message lands in your Gmail Sent folder and threads normally for the recipient. There is no separate sending domain to warm and no deliverability penalty from a third-party sender. Replies come back into both Gmail and the Attio record automatically, which is the behaviour that makes it practical to work from either surface depending on what you are doing."
---

## Why this integration is different in kind

Most CRM email integrations answer the question "how do I get this conversation onto the record". Attio's answers a bigger one: "what does my company's relationship history actually look like".

Connect a founder's mailbox to a fresh Attio workspace and it fills with several years of real relationships — who you have spoken to, how recently, how often, and which colleague knows them best. No import, no data entry, no CSV.

That is genuinely the product, and it explains why Attio's setup flow pushes email connection so hard while other CRMs treat it as an optional extra.

## The configuration that determines whether you like it

Excluded domains. The automatic creation that produces the impressive first-run experience is the same mechanism that produces a company object containing your dentist.

Ten minutes spent excluding your own domain, free-mail providers and known supplier domains is the difference between a database that feels intelligent and one that feels like a mailbox someone tipped into a CRM.

## Coverage beats configuration

The single biggest lever on how useful Attio is turns out to be how many mailboxes are connected. Relationship strength, last-interaction dates and the whole warm-intro capability degrade quickly when half the commercial team has not connected.

That includes people who do not think of themselves as CRM users — founders, technical leads who talk to customers, whoever handles partnerships. Their inboxes are frequently where the most valuable relationships are recorded, and they are the ones most likely to skip setup.

## The view to build first

Companies your team has not contacted in sixty days, sorted by whatever you use for value. It requires no manual data entry, it is accurate the moment email is connected, and it typically finds something in the first week that pays for the CRM.
