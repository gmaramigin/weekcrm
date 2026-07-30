---
title: "How to Migrate from Salesforce to Close"
description: >-
  Close is built for teams that live on the phone, and its data model reflects that —
  starting with the fact that a Close "Lead" is the company. Get that mapping right and
  the rest is a deliberate exercise in leaving Salesforce behind.
from: salesforce
to: close
date: 2026-07-30
difficulty: Moderate
duration: "2–3 weeks"
downtime: "None — Salesforce stays live during import"
nativeImport: "Partial — Close's CSV importer and API"
tldr: >-
  A Close Lead is the company-level record, so Salesforce Accounts become Leads,
  Contacts become nested Contacts and Opportunities become Opportunities. Everything
  Salesforce added around that — record types, formula fields, Flows, Cases — has no
  destination, which is the point of the move.
tags:
  - Salesforce
  - Close
  - Migration
  - CRM
objectMap:
  - from: "Account"
    to: "Lead"
    notes: "The mapping to get right. In Close, a Lead is the organisation-level record holding contacts and opportunities — not a person and not a prospect stage."
  - from: "Contact"
    to: "Contact (nested inside a Lead)"
    notes: "Close contacts live inside a Lead rather than as top-level records. Import the account first, then contacts against it."
  - from: "Lead (unconverted)"
    to: "Lead with a single Contact"
    notes: "Salesforce leads carry person and company data on one row. In Close they become a Lead with one Contact — a better fit than most CRMs offer."
  - from: "Opportunity"
    to: "Opportunity"
    notes: "Close opportunity statuses are simpler than Salesforce stages. Map deliberately rather than recreating a ten-stage pipeline."
  - from: "Case"
    to: "— (no equivalent)"
    notes: "Close is a sales tool. Support history moves to a helpdesk or stays archived in Salesforce."
  - from: "Task"
    to: "Task"
    notes: "Direct once the parent Lead exists."
  - from: "Custom field"
    to: "Custom field (Lead / Contact / Opportunity)"
    notes: "Decide the level for each field. Salesforce Account fields become Lead fields; Contact fields stay on the contact."
  - from: "Report / List view"
    to: "Smart View"
    notes: "Close Smart Views are saved searches with their own query language. Rebuild the ones reps actually work from."
transfers:
  - "Accounts as Leads with their custom fields."
  - "Contacts nested under the correct Lead, with all phone numbers and emails."
  - "Opportunities with value, status and close date."
  - "Tasks and notes attached to imported Leads."
  - "Owner assignment, where Salesforce users have Close seats with matching emails."
blockers:
  - "**Cases and Service Cloud.** No Close equivalent. Support needs a separate tool."
  - "**Record types, page layouts and validation rules.** None of these exist in Close. Data quality becomes convention rather than enforcement."
  - "**Formula and roll-up summary fields.** No formula field type in Close. Derived values need recomputing elsewhere."
  - "**Flow, Process Builder and Apex.** Close's workflow automation is much simpler. Complex orchestration moves to an external tool."
  - "**Salesforce reports and dashboards.** Rebuild as Smart Views plus Close's reporting, which is oriented toward activity and outcomes rather than analysis."
  - "**Custom objects.** Close has no custom object model. Low-volume objects flatten into fields; anything substantial needs an external home."
steps:
  - "Write down the Account-becomes-Lead mapping and confirm everyone involved understands it — this is where these migrations go wrong."
  - "Decide where Cases go: a helpdesk, a warehouse, or a frozen Salesforce archive."
  - "Audit what your validation rules and required fields were enforcing, since Close will not reproduce them."
  - "Create Close custom fields at the right level — Lead, Contact or Opportunity — and set up opportunity statuses before importing."
  - "Import Leads (from Accounts) first, then Contacts against them, then Opportunities, then tasks and notes."
  - "Rebuild the list views reps used as Close Smart Views."
  - "Connect calling and email so activity logging starts from day one, and keep a read-only Salesforce licence for history."
faq:
  - q: "Why does a Salesforce Account become a Close Lead?"
    a: "Because in Close, Lead means the organisation-level record that contacts and opportunities attach to — not a person or a qualification stage. Importing Salesforce Accounts as anything else produces a broken hierarchy, and it is the most common mistake in this migration."
  - q: "What happens to unconverted Salesforce Leads?"
    a: "They become Close Leads with a single Contact attached, since a Salesforce Lead holds both person and company data on one record. This maps better in Close than in most destinations, where unconverted leads get dumped into the contact database."
  - q: "Can Close replace Salesforce validation rules?"
    a: "No. Close does not block saves on data quality conditions. If your Salesforce org relies on validation rules for compliance or for keeping forecasting honest, understand that this becomes a matter of team discipline rather than software enforcement."
  - q: "How long does a Salesforce to Close migration take?"
    a: "Two to three weeks. The data volumes are usually modest and the model is simpler than the source, so most of the schedule goes into deciding what to leave behind and rebuilding the views reps work from."
---

Teams move from Salesforce to Close for a specific reason: they run a high-volume outbound motion, their reps live on the phone, and Salesforce was slowing that down with clicks, page loads and administration.

Close is unapologetically built for that. Calling, emailing and SMS are first-class, the interface assumes speed, and almost everything that makes Salesforce configurable is absent by design.

## Account becomes Lead — say it out loud

Close's terminology is genuinely confusing on first contact. A **Lead** in Close is the company. It holds the contacts, the opportunities and most of the activity history. It is not a person, and it is not a pre-qualified prospect the way "lead" means everywhere else.

So the mapping is: Salesforce Account → Close Lead. Salesforce Contact → Close Contact, nested inside that Lead.

Write this at the top of the migration document and confirm it with everyone involved. Teams that import Salesforce Accounts as Close Contacts — which the naming invites — end up with a contact list full of company names and opportunities attached to nothing useful. It is a full re-import to fix.

## Unconverted leads actually fit well

One pleasant surprise: a Salesforce Lead record carries person data and company data on the same row, which is awkward in most destinations. In Close it maps naturally to a Lead (the company part) with one Contact (the person part).

You lose nothing and you gain a structure that reflects how the record was always really shaped.

## Do not rebuild your ten-stage pipeline

Salesforce orgs accumulate stages. Close's opportunity model is deliberately lighter, and reps who chose Close generally did so because stage bureaucracy was the problem.

Map to the stages that represent real decisions in your sales process, not the ones that existed so a dashboard would look granular. Four or five is usually right. You can always add.

## Understand what you are giving up on enforcement

Salesforce validation rules, required fields and record types were doing work: keeping close dates sane, forcing a reason on lost deals, preventing a rep from skipping a step.

Close does not do this. There is no save-blocking validation. Data quality becomes a management practice rather than a software guarantee.

For a small, high-trust sales team this is fine and often liberating. For a larger team with variable discipline it is a real risk, and it is worth being explicit about before the decision is final rather than discovering it in the first forecast meeting.

## Cases need a destination

Close is a sales tool with no support object. If you were using Service Cloud, budget for a helpdesk. If you were using Cases lightly, archive them in a read-only Salesforce licence.

Either way, decide before exporting.

## Connect the phone on day one

Close's value is in the calling and emailing being native. Get the phone numbers provisioned, the mailboxes connected and the reps trained on the dialler before cutover — otherwise you have migrated to a simpler CRM without gaining the thing you bought it for.
