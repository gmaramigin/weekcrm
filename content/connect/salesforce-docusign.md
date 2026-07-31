---
title: "Salesforce and DocuSign: Sending Contracts Without Leaving the Opportunity"
description: >-
  A managed package that pulls Salesforce data into an envelope and writes the signed
  result back. Straightforward to install, and the field merge is where the actual
  project lives.
vendor: salesforce
platform: DocuSign
platformSlug: docusign
date: 2026-07-31
method: "Native — DocuSign eSignature for Salesforce managed package from the AppExchange"
direction: "Salesforce → DocuSign for envelope data; DocuSign → Salesforce for status and completed documents"
setupTime: "A few hours for basic sending; days to weeks with document generation and templates"
availability: "Requires a DocuSign plan that includes the Salesforce integration; DocuSign Gen for document generation is a separate product"
tldr: >-
  Send an envelope from an opportunity with recipients and merge fields drawn from
  Salesforce, then get envelope status, signed date and the completed PDF written
  back onto the record. Generating the document itself from Salesforce data is a
  different DocuSign product.
tags:
  - Salesforce
  - DocuSign
  - Integrations
syncs:
  - what: "Envelope creation"
    direction: "Salesforce → DocuSign"
    notes: "Launched from an opportunity, account, contract or custom object, with the recipient list pre-populated from related contacts."
  - what: "Merge fields"
    direction: "Salesforce → DocuSign"
    notes: "Salesforce field values populate document tags — names, amounts, dates, terms. Configured per template and the main source of setup effort."
  - what: "Envelope status"
    direction: "DocuSign → Salesforce"
    notes: "Sent, delivered, viewed, signed, completed, declined and voided all write back to the record in near real time."
  - what: "Completed document"
    direction: "DocuSign → Salesforce"
    notes: "The executed PDF attaches to the Salesforce record, so the contract lives with the opportunity rather than in someone's inbox."
  - what: "Signer data writeback"
    direction: "DocuSign → Salesforce"
    notes: "Values a signer typed into the envelope can map back onto Salesforce fields — useful for capturing a PO number or a start date at signature."
  - what: "Status-driven automation"
    direction: "DocuSign → Salesforce"
    notes: "Completed envelopes can trigger Flow — move the opportunity to closed-won, create the onboarding record, notify finance."
limits:
  - "**Document generation is a separate product.** The eSignature package sends and tracks; building the contract itself from Salesforce data is DocuSign Gen, licensed separately. Teams routinely conflate the two when budgeting."
  - "**Managed package upgrades are real maintenance.** Version updates need testing in sandbox, particularly where custom objects and Flows depend on envelope status fields."
  - "**Template and tag configuration is fiddly.** Anchor tags shifting when a document is edited is the most common cause of a broken send, and the failure surfaces to the customer rather than internally."
  - "**Recipient routing complexity lives in DocuSign, not Salesforce.** Multi-party signing orders, counter-signing and conditional routing are configured on the DocuSign side, which splits the process across two admin surfaces."
  - "**Licensing counts senders.** Every rep who sends needs an entitlement, which is a per-seat cost separate from Salesforce."
steps:
  - "Confirm which DocuSign products you actually have — eSignature for Salesforce and DocuSign Gen are different line items, and the plan you need depends on whether you are generating documents or only sending them."
  - "Install the managed package in a sandbox and test against real opportunity data, including a multi-line deal and a multi-signer scenario."
  - "Build one template properly before building five. Anchor tags, merge fields and signing order all have edge cases that only appear on real documents."
  - "Map the writeback fields deliberately: envelope status, completed date, and any signer-entered values you want on the record."
  - "Assign permission sets to the sending group, and confirm document visibility follows your record sharing model rather than exposing contracts more widely than intended."
  - "Build the post-signature Flow — stage change, notification, onboarding record creation — because the automation after completion is where most of the time saving actually comes from."
  - "Set a sandbox test as part of your release process for managed package upgrades. Envelope failures are customer-visible."
faq:
  - q: "Can DocuSign generate the contract from Salesforce data, or do I upload a document?"
    a: "The eSignature package expects a document — you either upload one or pull a stored template, and Salesforce data populates the fields within it. Generating the document itself from Salesforce records, with conditional clauses and dynamic line-item tables, is DocuSign Gen, a separate product with its own licence. This is the most common budgeting surprise in a Salesforce–DocuSign project, because the demo that sold the idea usually showed generation and sending as one continuous flow."
  - q: "Does the signed contract stay in Salesforce permanently?"
    a: "The completed PDF attaches to the record, so yes, subject to your Salesforce storage limits and retention policy. That is worth checking on volume: executed contracts are not small files, and orgs sending hundreds a month notice file storage consumption. The alternative pattern is keeping DocuSign as the document store and Salesforce holding the status, link and metadata — cheaper on storage, but it means the contract is one system away when someone needs it."
  - q: "What breaks most often?"
    a: "Anchor tags. If a template's underlying document is edited — a paragraph added, formatting changed — the anchor positions shift and signature blocks land in the wrong place or fail to render. The failure appears to the customer in an envelope you have already sent, which makes it worse than an internal error. The discipline that prevents it is treating templates as versioned artefacts: any document change goes through a test send before it goes near a real deal."
---

## Why this integration is usually worth doing

Contract sending is one of the few sales workflows where the manual version has a measurable cost. Rekeying names, amounts and dates from an opportunity into a document is slow and produces errors that land in front of a customer at the worst possible moment.

Pulling those values from the record removes an entire class of embarrassment, and the status writeback removes the daily "has it been signed yet" question.

## The part people underestimate

Template configuration. The install is genuinely easy — a managed package, some permission sets, a connection. What takes the time is getting one document to merge correctly, route to the right signers in the right order, and write the right values back.

Budget for one template done properly rather than five done approximately. The second template takes a fraction of the time once the patterns are established.

## The automation that pays for it

Envelope completed is the highest-quality trigger in a sales process. It is unambiguous, it is timestamped, and it means something specific happened.

Wire it to the things that should happen next: stage change, finance notification, onboarding record creation, provisioning request. Teams that stop at "the PDF is on the record" get half the value; teams that treat completion as the start of an automated handoff get the rest.
