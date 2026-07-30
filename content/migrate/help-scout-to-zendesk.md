---
title: "How to Migrate from Help Scout to Zendesk"
description: >-
  Help Scout kept things deliberately simple, which means the migration is less about
  moving structure and more about inventing it. Zendesk will ask for organizations,
  ticket forms and views that you never had.
from: help-scout
to: zendesk
date: 2026-07-30
difficulty: Moderate
duration: "2–4 weeks"
downtime: "None — run both inboxes in parallel, then switch mail routing"
nativeImport: "No — Help Scout API export, then the Zendesk API"
tldr: >-
  Conversations become tickets, customers become end users and mailboxes become groups
  or brands. Because Help Scout has no organizations object and no ticket forms, the
  work is designing that structure in Zendesk and deriving it from tags and email
  domains rather than migrating it.
tags:
  - Help Scout
  - Zendesk
  - Migration
  - Help Desk
objectMap:
  - from: "Conversation"
    to: "Ticket"
    notes: "Direct. Help Scout conversation status maps onto Zendesk status — decide explicitly how Closed maps to Solved versus Closed."
  - from: "Customer"
    to: "End user"
    notes: "Clean on email. Help Scout supports multiple email addresses per customer, which Zendesk handles as user identities."
  - from: "Mailbox"
    to: "Group, or Brand"
    notes: "A mailbox that represents a team becomes a Zendesk group. A mailbox that represents a separate product with its own support address is better modelled as a brand."
  - from: "Tag"
    to: "Tag, custom field, or organization"
    notes: "The key translation. Help Scout tags do structural work — account names, categories, priority — that Zendesk expects in dedicated objects. Classify each tag before import."
  - from: "— (no source)"
    to: "Organization"
    notes: "Help Scout has no account object. Derive organizations from email domain or from the tags you were using as account labels."
  - from: "Workflow"
    to: "Trigger / Automation"
    notes: "Help Scout workflows cover both immediate and time-based rules. Split them: immediate becomes triggers, time-based becomes automations."
  - from: "Saved reply"
    to: "Macro"
    notes: "Text maps directly. Zendesk macros can also set fields, which is an upgrade worth using."
  - from: "Docs article"
    to: "Guide article"
    notes: "Separate import. Help Scout's collection/category structure maps to Zendesk's category/section hierarchy."
transfers:
  - "Conversations as tickets with their full thread history, including internal notes."
  - "Customers as end users with all their email addresses."
  - "Tags, though several will be better re-expressed as fields or organizations."
  - "Attachments on conversations."
  - "Agent assignment, where Help Scout users have Zendesk seats with matching emails."
blockers:
  - "**No organizations to migrate.** Zendesk's organization model is a capability you gain, not data you move. It has to be derived and built."
  - "**Help Scout reporting.** Rebuild in Zendesk Explore, which is considerably more capable but shares no history."
  - "**Beacon.** Help Scout's embedded widget has Zendesk equivalents but the configuration and behaviour differ."
  - "**Workflow splitting.** One Help Scout workflow may need to become both a trigger and an automation in Zendesk."
  - "**Tag sprawl.** Long-running Help Scout accounts accumulate hundreds of tags. Importing them all wastes the chance to build proper structure."
steps:
  - "Export the tag list with usage counts and classify each: stays a tag, becomes a custom field, becomes an organization, or is dropped."
  - "Decide which mailboxes become Zendesk groups and which are better as brands with their own help centre."
  - "Derive organizations from customer email domains, and reconcile against any account-name tags you were using."
  - "Create Zendesk brands, groups, organizations, custom fields, ticket forms and SLA policies before importing."
  - "Export conversations, customers and threads via the Help Scout API, preserving conversation numbers."
  - "Import organizations and end users first, then tickets with full thread history, then attachments."
  - "Import Docs into Guide with redirects mapped, design the agent view structure, then switch mail routing."
faq:
  - q: "How do I create Zendesk organizations when Help Scout has none?"
    a: "Derive them. The two usable sources are customer email domains, which group business customers automatically, and any tags you were using as account labels. Build the organization list before importing users so membership can be assigned during the load rather than afterwards."
  - q: "Should Help Scout mailboxes become Zendesk groups or brands?"
    a: "Depends what the mailbox represents. A mailbox for an internal team — billing, technical — becomes a group. A mailbox that serves a distinct product with its own support address and help content is better as a Zendesk brand, which gives it a separate help centre."
  - q: "What happens to my Help Scout tags?"
    a: "Classify them rather than importing them wholesale. Tags used as categories usually become a ticket field; tags used as account labels become organizations; tags used for genuine ad-hoc marking stay as tags. Long-running accounts often have hundreds, and importing all of them wastes the structure Zendesk offers."
  - q: "How long does a Help Scout to Zendesk migration take?"
    a: "Two to four weeks. Conversation import is straightforward; the schedule goes into designing organizations, ticket forms and agent views that had no Help Scout counterpart."
---

Most migration guides are about loss — what will not come across. This one is mostly the opposite. Help Scout is deliberately minimal, so almost everything in it has a Zendesk equivalent. The challenge is that Zendesk expects structure Help Scout never asked you to create.

## Your tags are carrying the structure

In Help Scout, tags do far more work than tags usually do. With no organizations object, no ticket forms and limited custom fields, teams end up encoding everything in tags: the customer's company name, the issue category, priority, product area, whether it needs follow-up.

Export the tag list with usage counts and sort every row into one of four buckets:

- **Becomes a ticket field.** Category, product area, issue type. Anything with a fixed set of values belongs in a field, where it can drive routing and reporting properly.
- **Becomes an organization.** Account-name tags. This is where a chunk of your organization list comes from.
- **Stays a tag.** Genuinely ad-hoc marking — "escalated to eng", "mentioned in QBR".
- **Dropped.** Everything used twice in 2023.

This exercise is the migration. Do it well and Zendesk is a real upgrade; skip it and you have Help Scout with a more complicated interface.

## Build organizations from email domains

Zendesk organizations unlock routing, SLA policies per account, and letting colleagues at the same company see each other's tickets. Help Scout has none of this, so there is nothing to import.

The practical source is customer email domains. Group your business customers by domain, reconcile against any account-name tags, and build the organization list before importing users — assignment during load is much easier than backfilling afterwards.

Filter out the consumer domains first, or you will create an organization called "gmail.com" with four thousand members.

## Mailboxes: group or brand?

A Help Scout mailbox is a queue. Zendesk offers two destinations and they are not interchangeable.

If the mailbox exists because a different internal team handles it — billing, technical support — it becomes a **group**.

If the mailbox exists because you support a distinct product with its own support address and its own documentation, it should be a **brand**, which gives it a separate help centre and its own branding on outbound email.

Decide this before importing. Restructuring after tickets and help content are in place is genuinely painful.

## Workflows split in two

A Help Scout workflow handles both immediate and time-based conditions. Zendesk separates these: triggers fire on ticket events, automations run on a schedule.

So some workflows become one trigger, some become one automation, and a few become both. Go through them individually rather than assuming a one-to-one mapping.

## Design the views before go-live

Zendesk agents work from views. Help Scout agents work from folders that mostly configure themselves.

Sit down with the agents and design the view structure before cutover — unassigned, mine, breaching soon, by group. This is the single biggest factor in whether the first week feels like an upgrade or a punishment.
