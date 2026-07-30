---
title: "How to Migrate from OTRS Community Edition to Zammad"
description: >-
  OTRS Community Edition is end of life and receives no security fixes. Zammad ships an
  official OTRS migration tool, which makes this one of the few helpdesk migrations
  with a supported path — and one of the few that is genuinely urgent.
from: otrs-community-edition
to: zammad
date: 2026-07-30
difficulty: Moderate
duration: "2–4 weeks"
downtime: "A short freeze during the final sync is usual"
nativeImport: "Yes — Zammad's official OTRS migration tool"
tldr: >-
  Zammad provides a migration package that reads directly from an OTRS installation and
  transfers tickets, articles, customers, agents, groups and states. Because OTRS
  Community Edition no longer receives security patches, the migration should be treated
  as remediation work rather than an upgrade project.
tags:
  - OTRS
  - Zammad
  - Migration
  - Help Desk
objectMap:
  - from: "Ticket"
    to: "Ticket"
    notes: "Direct. Ticket numbers can be preserved, which matters when customers reference them in existing correspondence."
  - from: "Article"
    to: "Article"
    notes: "OTRS calls each message in a ticket an article, and so does Zammad. The threading model matches closely."
  - from: "Customer / Customer User"
    to: "Customer / Organization"
    notes: "OTRS separates the customer company from the customer user. Zammad maps these to organizations and users respectively."
  - from: "Queue"
    to: "Group"
    notes: "OTRS queues become Zammad groups. Nested queue hierarchies flatten, so plan the naming."
  - from: "State"
    to: "State"
    notes: "Custom OTRS states map to Zammad states, but the state-type semantics differ slightly — verify anything driving escalation."
  - from: "Agent"
    to: "Agent"
    notes: "Transfers with the migration tool. Permissions and role assignments need reviewing afterwards."
  - from: "Dynamic Field"
    to: "Object attribute"
    notes: "OTRS dynamic fields become Zammad object attributes. Create matching types before running the migration where possible."
  - from: "Generic Agent job"
    to: "Trigger / Scheduler"
    notes: "OTRS's automation jobs have no automatic path. Rebuild as Zammad triggers or scheduled jobs."
transfers:
  - "Tickets with their full article history, including original ticket numbers."
  - "Customers, customer users and organization assignments."
  - "Queues as groups, and agents with their basic details."
  - "Ticket states, priorities and dynamic field values."
  - "Attachments on ticket articles."
blockers:
  - "**Generic Agent jobs.** OTRS's automation engine does not migrate. Every job needs rebuilding as a Zammad trigger or scheduler entry."
  - "**ACLs.** OTRS access control lists have no direct Zammad equivalent. Permissions are rebuilt with roles and group access."
  - "**Custom OTRS modules and Perl code.** Anything customised at the code level stays behind. Re-express as Zammad triggers or an external service."
  - "**OTRS process management (ticket workflows).** No direct counterpart; simplify into Zammad triggers or handle procedurally."
  - "**Statistics and reports.** OTRS statistics do not transfer. Zammad reporting is different and lighter."
  - "**Nested queue structures.** Zammad groups are flat, so deep OTRS queue trees need renaming rather than restructuring."
steps:
  - "Confirm your OTRS version — the migration tool supports specific ranges, and very old installations may need an intermediate upgrade first."
  - "Take a full backup of the OTRS database and filesystem before touching anything."
  - "Stand up Zammad and run the migration tool against a copy of the OTRS instance first, never the live one."
  - "Review the trial migration: ticket counts per queue, article counts, attachment integrity, customer-to-organization assignment."
  - "Rebuild Generic Agent jobs as Zammad triggers and schedulers, and rebuild ACLs as roles and group permissions."
  - "Freeze OTRS briefly, run the final migration, and verify counts against the frozen source."
  - "Repoint mail routing to Zammad and keep the OTRS database backup archived — do not leave the old instance internet-facing."
faq:
  - q: "Is OTRS Community Edition still safe to run?"
    a: "No. It reached end of life and no longer receives security fixes, which makes an internet-facing installation a standing risk. That is the main reason to treat this migration as remediation rather than an optional upgrade."
  - q: "Does Zammad have an official OTRS migration tool?"
    a: "Yes. Zammad ships a migration package that reads from an OTRS installation and transfers tickets, articles, customers, agents, queues and states — including original ticket numbers. It is one of the few genuinely supported helpdesk migration paths."
  - q: "What is the difference between Zammad and Znuny?"
    a: "Znuny is a maintained fork of OTRS Community Edition, so it is the lower-effort route if you want to stay on the same codebase. Zammad is a separate modern rewrite with a different interface and data model — more work to move to, and a bigger change in day-to-day use."
  - q: "How long does an OTRS to Zammad migration take?"
    a: "Two to four weeks including testing. The migration tool does the heavy lifting quickly; the schedule goes into rebuilding Generic Agent jobs and ACLs, and into validating a trial run before the real one."
---

This migration is different from the others on this site, because it is not really a preference decision. OTRS Community Edition is end of life. It receives no security patches, and a helpdesk is by definition internet-facing and full of customer data.

If you are running it today, the question is not whether to move but where to, and how soon.

## Zammad or Znuny — pick deliberately

There are two sensible destinations and they represent different amounts of work.

**Znuny** is a maintained fork of the OTRS Community Edition codebase. Moving there is closer to an upgrade than a migration: same concepts, same interface lineage, same administrative model. If your priority is getting off unpatched software with minimum disruption, this is the pragmatic choice.

**Zammad** is a separate product, written from scratch by OTRS's original founder. Modern interface, cleaner data model, active development, and an official OTRS migration tool. More change for your agents, more benefit over the next five years.

This guide covers the Zammad route. If your team is large, change-averse, or heavily invested in OTRS process management, price out Znuny before deciding.

## The migration tool is real, and you should still test it

Zammad's OTRS migration package reads directly from an OTRS installation and brings across tickets with their full article history, customers, organizations, agents, queues, states and dynamic field values. It can preserve original ticket numbers, which matters more than it sounds — customers reference old numbers in email threads for years.

Run it against a *copy* of your OTRS instance first. Never point it at the live system for a trial. Then check the numbers properly: ticket counts per queue, article counts on a sample of long tickets, attachment integrity, and whether customer users landed under the right organizations.

## Generic Agent and ACLs are the manual work

Two things the tool does not bring: OTRS Generic Agent jobs, which are the automation engine, and ACLs, which control who can see and do what.

Inventory both before you start. Generic Agent jobs become Zammad triggers or scheduler entries — usually simpler than the original, because OTRS jobs tend to accumulate. ACLs become Zammad roles plus group permissions, which is a coarser model and normally a welcome simplification.

Neither is difficult. Both are invisible until someone notices a rule that stopped running.

## Flatten the queue tree deliberately

Deep nested queue hierarchies are common in long-running OTRS instances. Zammad groups are flat. Decide the naming convention before migrating rather than accepting whatever the tool produces, or you will end up with thirty groups whose names are truncated paths nobody can read.

## Do not leave the old instance running

Once the final migration is verified and mail is repointed, take the OTRS installation off the network. Keep a database backup archived for reference, but an unpatched, internet-facing helpdesk with historical customer data is exactly the thing you just spent a month fixing.
