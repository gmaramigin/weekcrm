---
title: "Close and Gmail: A CRM That Assumes You Live in Email"
description: >-
  Close was built around the inbox rather than bolting email onto a record system.
  Connecting Gmail is not an integration step so much as the setup step.
vendor: close
platform: Gmail
platformSlug: gmail
date: 2026-07-31
method: "Native — Google account connection, two-way IMAP-based sync"
direction: "Two-way: mail syncs both ways, and Close is a viable place to send from"
setupTime: "5 minutes per user"
availability: "Core functionality across Close plans; sequence and bulk email limits vary by tier"
tldr: >-
  Connect the Google account and email syncs two-way automatically — no bcc, no
  extension required, no per-message logging decision. Everything to and from a lead
  appears on the lead, and sending from Close goes out through your Gmail account.
tags:
  - Close
  - Gmail
  - Integrations
syncs:
  - what: "Inbound and outbound email"
    direction: "Two-way"
    notes: "Automatic and complete for connected accounts. There is no per-message log decision, which is the point."
  - what: "Lead association"
    direction: "Gmail → Close"
    notes: "Messages attach to the lead by contact email, so the full thread history sits on the record without anyone maintaining it."
  - what: "Sending from Close"
    direction: "Close → Gmail"
    notes: "Mail sent from Close goes through your connected account and appears in Gmail Sent, threading normally for the recipient."
  - what: "Email sequences"
    direction: "Close → Gmail"
    notes: "Multi-step outbound sequences send from your own address rather than a shared sending domain, which helps deliverability."
  - what: "Templates and snippets"
    direction: "Close → Gmail"
    notes: "Available when composing in Close with lead field merging, which is the main reason to compose there rather than in Gmail."
  - what: "Open and click tracking"
    direction: "Close → Gmail"
    notes: "On mail sent through Close, with the usual caveat that corporate scanners generate false opens."
  - what: "Calendar"
    direction: "Two-way"
    notes: "Google Calendar connects alongside, so meetings appear on the lead and Close activity reflects real scheduling."
limits:
  - "**Full mailbox sync means full mailbox exposure**, subject to Close's sharing settings. Decide the team visibility policy before people connect."
  - "**Matching is by email address.** A prospect writing from a personal address does not attach, which is the same constraint every CRM has."
  - "**Shared aliases need Close's shared inbox handling**, not a personal account connection, or the whole team's mail lands under one user."
  - "**Sequence and bulk sending limits vary by plan**, and Gmail's own sending limits sit underneath them regardless."
  - "**Deliverability is your domain's problem.** Sending through your own Gmail account is good for reputation and means a poorly warmed domain is entirely your issue."
steps:
  - "Connect your Google account in Close's settings — this is one step, not an extension install plus a connection."
  - "Set the team email visibility policy before rolling out, since Close syncs full mailboxes rather than selected messages."
  - "Connect Google Calendar at the same time so meetings land on leads automatically."
  - "Move any shared address such as sales@ into Close's shared inbox handling rather than connecting it as an individual's account."
  - "Build two or three templates with lead field merging early. The reason to compose in Close rather than Gmail is the merging, and without templates there is no reason."
  - "Before running sequences, check your domain's sending reputation and warm it properly. Close will happily send more mail than an unwarmed domain should."
faq:
  - q: "Do I need a Chrome extension or a bcc address?"
    a: "No, and this is the practical difference from CRMs that treat email as an add-on. Close connects the mailbox directly and syncs two-way, so there is no per-message decision about whether to log, no extension to install on every machine, and no bcc address for reps to forget. Everything to and from a lead's address appears on the lead. That removes the most common cause of incomplete CRM data, which is a rep who was busy and did not tick the box."
  - q: "Should reps work in Close or in Gmail?"
    a: "Close, for anything sales-related, and the integration is designed to make that comfortable rather than mandatory. Composing in Close gives you templates with lead field merging, sequence enrolment, call context and the ability to move through a queue of leads without switching applications. Since sending goes out through the connected Gmail account, the recipient sees a normal email from a normal address, and the message appears in the rep's own Sent folder. Reps who insist on staying in Gmail still get complete sync — they just lose the composing advantages."
  - q: "Who can see synced email?"
    a: "That depends on the visibility settings, and it deserves a decision before anyone connects rather than after. Close syncs whole mailboxes, which is what makes the data complete and also means a rep's non-sales correspondence is in scope. Set a conservative team default, explain what is synced, and let people share upward. The alternative — a rep discovering that colleagues can see conversations they considered private — damages trust in the CRM in a way that is slow to repair."
---

## Why this pairing is different in kind

Most CRMs treat email as something to capture. Close treats the inbox as the primary sales surface and builds the CRM around it.

The practical consequence is that email data in Close is complete by default rather than complete when reps remember. That single difference explains most of why Close-using teams report better data quality than teams on CRMs with optional logging — the discipline requirement has been designed out rather than trained in.

## The setting to decide before rollout

Visibility. Full-mailbox sync is what makes the data complete, and it also means a rep's mailbox — including whatever is in it — enters the CRM's scope.

Set a conservative team default, explain clearly what is synced and who can see it, and let individuals share specific threads upward. Reps who discover the answer after the fact stop trusting the tool, and that is very hard to undo.

## Where sending from Close earns its place

Templates with lead field merging, and sequences that go out from a rep's real address.

The second matters more than it sounds. Outbound sent through a dedicated sending platform's infrastructure carries that platform's reputation; outbound sent through your own Gmail account carries yours. For small teams doing moderate volume, that is usually the better position — provided you warm the domain properly and do not treat sequence capacity as a target.

## The shared inbox distinction

sales@ and hello@ should go through Close's shared inbox handling, not be connected as somebody's personal account. Connecting a group address as an individual mailbox puts the entire team's correspondence under one user, which destroys ownership reporting and makes the activity data misleading.

It is a five-minute distinction at setup and a genuinely annoying thing to unwind later.
