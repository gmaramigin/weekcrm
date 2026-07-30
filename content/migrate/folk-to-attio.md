---
title: "How to Migrate from folk to Attio"
description: >-
  folk organises everything around Groups with their own fields. Attio organises around
  typed objects with Lists on top. The translation is mostly about deciding which folk
  Groups are really segments and which are really pipelines.
from: folk
to: attio
date: 2026-07-30
difficulty: Easy
duration: "2–4 days"
downtime: "None — folk stays live during export"
nativeImport: "Partial — Attio CSV import with mapping, plus the Attio API"
tldr: >-
  folk contacts and companies map straight onto Attio People and Companies. The real
  work is folk Groups: each one is either a segment, which becomes an Attio List or
  saved view, or a pipeline, which becomes a List with stage attributes. Group-scoped
  custom fields need a home either way.
tags:
  - folk
  - Attio
  - Migration
  - CRM
objectMap:
  - from: "Company"
    to: "Company"
    notes: "Direct. Attio enriches from the domain automatically, so folk's manually maintained company fields are often redundant."
  - from: "Person (contact)"
    to: "Person"
    notes: "Attio keys on email. folk contacts captured via the browser extension sometimes lack one — check before importing."
  - from: "Group"
    to: "List (or saved view)"
    notes: "The central translation. Segment-style groups become saved views or simple Lists; pipeline-style groups become Lists with stage attributes on the entries."
  - from: "Group-scoped custom field"
    to: "List entry attribute"
    notes: "A close conceptual match — folk fields belong to a group, Attio entry attributes belong to a List. This maps better than it does to most other CRMs."
  - from: "Deal / Pipeline"
    to: "Deal (or List)"
    notes: "Use the Deals object where amounts and forecasting matter; use a List where the pipeline is a process."
  - from: "Note"
    to: "Note"
    notes: "Imports after the parent record exists."
  - from: "Reminder / Task"
    to: "Task"
    notes: "Straightforward once the parent record is in place."
  - from: "folkX-captured contact"
    to: "Person"
    notes: "Contacts scraped from social profiles often carry no email. Decide whether they import at all — Attio's value depends heavily on email."
transfers:
  - "Companies and People with their field data, mapped onto Attio attributes."
  - "Group membership, re-expressed as Attio List entries."
  - "Group-scoped custom fields, mapped to List entry attributes."
  - "Notes and reminders, imported after their parent records."
  - "Ongoing email and calendar history, once each user connects their mailbox."
blockers:
  - "**folk message sequences.** Content and enrolment state do not transfer; rebuild in Attio or a dedicated outbound tool."
  - "**The folkX browser extension workflow.** Attio has its own capture tooling but the interaction differs — expect a habit change."
  - "**Contacts with no email address.** These import but gain little, since Attio's enrichment and matching key on email."
  - "**folk dashboards.** Rebuild as Attio views; anything analytical belongs in a BI tool."
  - "**Overlapping group membership.** A contact in six folk groups becomes six Attio List entries. Consolidate before importing or the workspace starts noisy."
steps:
  - "Classify every folk Group: segment, pipeline, or dead. Only the first two need a destination."
  - "For each surviving group, note its custom fields — these become Attio List entry attributes."
  - "Check contact email coverage, especially for records captured through the browser extension."
  - "Design the Attio workspace: objects, attributes, and one List per surviving group."
  - "Export companies and contacts from folk, then import Companies first, People second."
  - "Create the Lists and import group membership as list entries, populating entry attributes from the group fields."
  - "Connect mailboxes and calendars, then keep folk live for a week while you verify group coverage."
faq:
  - q: "How do folk Groups map to Attio?"
    a: "It depends what the group is for. A segment — 'investors', 'newsletter', 'London' — becomes a saved view or a simple List. A pipeline — 'fundraising', 'partnerships' — becomes a List with stage attributes on each entry. Classify every group before designing the workspace."
  - q: "What happens to folk's group-scoped custom fields?"
    a: "They map unusually well. Attio List entry attributes are scoped to a List in the same way folk fields are scoped to a Group, so the concept survives intact rather than being flattened onto the record like it would be in most CRMs."
  - q: "Should I import folk contacts that have no email address?"
    a: "Usually not, or at least not into the main person database. Attio's enrichment and email matching depend on having an address, so contacts captured from social profiles without one add volume without adding capability."
  - q: "How long does a folk to Attio migration take?"
    a: "Two to four days. Both products are lightweight and modern, and the Group-to-List mapping is conceptually close enough that most of the work is classification rather than transformation."
---

folk and Attio are both reactions to the same problem: traditional CRMs are too heavy for teams that mostly need to keep track of relationships. They solve it differently — folk through flexible Groups, Attio through typed objects with Lists layered on — which makes this migration more of a translation than a rebuild.

## Classify your Groups first

Everything in this migration depends on one question asked of each folk Group: is this a *segment* or a *pipeline*?

A segment is a set of records that share something. Investors. Newsletter subscribers. Everyone in Berlin. These are best expressed in Attio as a saved view driven by attributes, or as a simple List where the membership is deliberately curated.

A pipeline is a process with stages. Fundraising. Partnership development. Hiring. These become Attio Lists where entries carry stage attributes — and this is where Attio is genuinely stronger than folk, because entry attributes are first-class and reportable.

A surprising number of groups turn out to be neither: created for a campaign in 2024 and never touched since. Those get dropped, and the workspace is better for it.

## Group fields translate unusually well

Most CRM migrations flatten scoped fields onto the record, losing the scoping. Not here.

folk's custom fields belong to a Group. Attio's entry attributes belong to a List. The concepts line up almost exactly, so a "warmth" field on your investors group becomes a "warmth" entry attribute on your investors List — still scoped, still separate from the person record, still not cluttering every other contact.

Take advantage of it. This is the rare case where the destination model is a superset of the source.

## Watch the email coverage

folk's browser extension makes it easy to capture people from social profiles, and those records frequently arrive with a name, a company and no email address.

That is fine in folk, where a contact is just a row. It matters more in Attio, where email drives matching, enrichment and the automatic relationship history from mailbox sync. A contact without an email address is inert.

Run the count before importing. If a large share of your database has no email, decide deliberately: import them to a separate List for enrichment later, or leave them behind.

## Consolidate overlapping membership

A well-used folk account has contacts sitting in five or six groups at once. Import that literally and you get a person with six List entries, which is technically correct and practically noisy.

Merge the groups that overlap heavily before you import. The workspace you start with sets the habits, and a clean one is much easier to maintain than one you intend to tidy up later.
