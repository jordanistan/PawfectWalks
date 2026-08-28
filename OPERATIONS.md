# Running Pawsfect Walks without paying for software (yet)

This is the zero-cost operating setup for pre-revenue stage. Upgrade to paid pet-care
software (scheduling, payments, walker app) once booking volume makes the manual process
the actual bottleneck — not before.

## Customer bookings
- **Inquiry**: Netlify Form on the Contact section (already wired, free on Netlify's tier).
- **Booking**: Calendly free tier (already linked in the header/hero).
- **Dog & owner records**: one Google Sheet, one row per dog — owner name/contact, address,
  zone, temperament, feeding/medication notes, emergency contact, assigned walker(s).

## Walker recruiting
- **Applications**: a free Google Form (name, zone/neighborhood, availability, experience,
  transportation, references) that feeds a Google Sheet automatically — no manual email
  parsing. Link the form from the "Apply by email" CTAs once it exists, or keep email as a
  fallback.
- **Roster**: a tab in the same Google Sheet — one row per walker, with a `Zone` column so
  the PM can filter to "who's available in South Austin" instantly.

## Daily dispatch
- One Google Sheet tab per zone (Central, South, East, North — see `ServiceAreas`
  component) with columns: Dog, Owner, Time, Walker assigned, Status, Notes. The PM updates
  it by hand each morning. This *is* the "automation" at this stage — a shared source of
  truth beats scattered texts and emails.
- Google Calendar (free), one calendar per zone, shared with that zone's walkers, for
  recurring visit times.

## Before taking on real walkers as contractors
Not a code problem — get a real read on these before your first hire, ideally from a
lawyer or a service like a local SCORE chapter (free) rather than guessing:
- **Contractor vs. employee classification.** Because a PM assigns schedules and routes
  rather than walkers picking their own jobs, this may look more like an employer-employee
  relationship under IRS/DOL tests, not 1099 gig work. Misclassification is the single
  most common legal trap for businesses run this way.
- **General liability insurance / bonding** before a walker is inside anyone's home.
- **Background checks** for walkers (many run for a low one-time fee per candidate).

## Design principle for when you build real automation
The goal later isn't "buy one all-in-one platform" — that recreates the same margin
problem (the more a vendor takes per booking, the less is left for walkers). Instead,
replace one manual piece at a time with something purpose-built or custom, and keep them
loosely connected (a shared dog/walker/zone database, not a monolith):
- Background checks and payroll can be one-off vendor integrations, swapped independently.
- A scheduling/dispatch agent can be built per zone and rolled out zone by zone, instead of
  a big-bang rewrite — matches the tiered/regional model you're already running manually.
- Payments should be the first thing you actually pay for once volume justifies it (a
  processor, not a full practice-management suite) — it's the one piece that's genuinely
  hard to do safely for free.

## When to start paying for software
Revisit "buy" once any of these is true: manual dispatch is regularly dropping a booking,
a walker or owner asks for something the spreadsheet genuinely can't do (live GPS tracking,
in-app payments), or there's enough revenue that a few hundred dollars a month is a rounding
error, not a risk.
