---
title: "HubSpot and Zoom: Meetings, Webinars and What Lands on the Timeline"
description: >-
  Two integrations sharing a name. The meetings half is straightforward plumbing.
  The webinar half is the one with marketing value, and it needs a Zoom add-on most
  teams do not have.
vendor: hubspot
platform: Zoom
platformSlug: zoom
date: 2026-07-31
method: "Native — Zoom app in the HubSpot App Marketplace, plus a per-user connection"
direction: "Zoom → HubSpot for attendance and recordings; HubSpot → Zoom for meeting creation"
setupTime: "20 minutes for the account, 2 minutes per user"
availability: "Meetings work on any Zoom plan; registrant and attendance sync requires Zoom Webinars"
tldr: >-
  Booking a HubSpot meeting generates a Zoom link automatically, and the meeting lands
  on the contact timeline with a recording link afterwards. Separately, Zoom webinar
  registrants and attendees sync into HubSpot as contacts with attendance data you
  can segment on.
tags:
  - HubSpot
  - Zoom
  - Integrations
syncs:
  - what: "Meeting links"
    direction: "HubSpot → Zoom"
    notes: "A HubSpot meetings link can generate the Zoom room at booking time, so the invite the prospect receives already contains the join URL."
  - what: "Meeting records"
    direction: "Zoom → HubSpot"
    notes: "The meeting appears on the contact and deal timeline with attendees and duration once it ends."
  - what: "Cloud recording links"
    direction: "Zoom → HubSpot"
    notes: "A link to the recording attaches to the timeline entry. The link, not the file — permissions still live in Zoom."
  - what: "Webinar registrants"
    direction: "Two-way"
    notes: "HubSpot forms can register people directly into a Zoom webinar, and registrants created in Zoom flow back as contacts."
  - what: "Webinar attendance"
    direction: "Zoom → HubSpot"
    notes: "Attended versus registered-but-no-show, plus duration. This is the field worth building segmentation on."
  - what: "Workflow enrolment"
    direction: "Zoom → HubSpot"
    notes: "Attendance becomes a workflow trigger, so the follow-up for attendees and the follow-up for no-shows can genuinely differ."
limits:
  - "**Registrant and attendance sync requires the Zoom Webinars product**, which is a paid add-on on top of a Zoom licence. A Zoom Meetings plan syncs meetings and nothing webinar-shaped."
  - "**Each user connects their own Zoom account.** The admin-level app install does not authorise individual reps, so meeting links silently fail to generate for anyone who skipped it."
  - "**Recordings are linked, not stored.** When Zoom's retention policy deletes the recording, the HubSpot timeline keeps a link to nothing."
  - "**No transcript or call intelligence.** Attendance and duration only. If you want talk-time ratios, keyword tracking or coaching, that is a conversation intelligence tool, not this connector."
  - "**Panellists are not registrants.** Internal speakers do not appear in the attendance sync, which surprises people building post-webinar reports."
steps:
  - "Install the Zoom app from the HubSpot App Marketplace as an admin on both sides, and confirm which Zoom account it authorised — the personal one is a common mistake."
  - "Have each rep connect their own Zoom account under their HubSpot user settings, then test one booking end to end before announcing it."
  - "For webinars, connect the specific webinar in HubSpot and use a HubSpot form as the registration page rather than Zoom's, so you own the registration data and the consent record."
  - "Build two follow-up workflows immediately — attended and registered-no-show — because sending the same email to both is the fastest way to make a webinar programme underperform."
  - "Set a HubSpot property for attendance duration if you run long sessions; ten minutes and fifty minutes are different levels of intent and worth treating differently."
  - "Check your Zoom recording retention policy against how long you expect timeline links to work."
faq:
  - q: "Do I need Zoom Webinars, or will Zoom Meetings do?"
    a: "For sales meetings booked through HubSpot, Zoom Meetings is sufficient — links generate, the meeting logs, the recording link attaches. For the marketing use case, registrant and attendance sync is specific to Zoom Webinars, which is a separate paid product. Teams that run large sessions on Meetings rather than Webinars to save money find the attendance data simply is not there to sync, and end up uploading CSVs by hand."
  - q: "Does HubSpot store the Zoom recording?"
    a: "No — it stores a link to the recording in Zoom cloud. That means access is governed by Zoom's permissions and lifetime is governed by Zoom's retention settings. If your Zoom plan deletes cloud recordings after 30 or 120 days, the HubSpot timeline entry outlives the thing it points at. Teams that need durable call records export to storage they control and attach that instead."
  - q: "Can I see who attended a webinar directly on the contact record?"
    a: "Yes, once the webinar is connected — attendance writes to contact properties, so you can see it on the record and, more usefully, segment on it. The pattern that pays off is building the two follow-ups differently: attendees get the deeper next step, no-shows get the recording and a second chance. Both audiences exist as lists automatically once the attendance property is populated."
---

## The meetings half

Unremarkable and worth having. A HubSpot meetings link that produces a Zoom room removes the small daily friction of creating a room, pasting a link, and hoping the prospect got the right one. The meeting then logs itself, so nobody is manually recording that a call happened.

That is the entire value proposition, and it is enough.

## The webinar half is where the money is

Webinar attendance is one of the highest-intent signals a marketing team gets, and it is routinely wasted by sending everyone the same "thanks for joining" email — including the people who did not join.

With attendance syncing into HubSpot, the split is trivial to build and the difference in response is not subtle. Attendees get the next step. No-shows get the recording with a genuine reason to watch it. Anyone who stayed past the halfway mark gets routed to a rep.

## The gap this integration does not fill

Anything about what was said. Attendance, duration, join and leave times — that is the data. If your goal is coaching reps, tracking competitor mentions, or getting call summaries onto the deal record, you need a conversation intelligence tool sitting alongside this. The Zoom connector tells you a meeting happened; it has no opinion about how it went.
