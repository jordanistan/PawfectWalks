# 03 — Intake and meet-and-greet

**Status: template ready; secure intake implementation and rehearsal pending.**

## Process

Inquiry → initial fit check → owner-attended meet-and-greet → written acceptance/decline → signed agreement and completed care plan → payment verified → explicit booking confirmation → visit/update → reconciliation.

1. Initial inquiry asks only contact method, neighborhood, requested window and brief care needs. Say not to submit access codes, ID/payment images or detailed medical records. Ask for exact addresses only in the restricted onboarding step.
2. Verify area, timing, proposed scope and walker availability before scheduling a proposed complimentary 20-minute meet-and-greet. Complimentary duration is a draft owner decision. Owner remains present and responsible for the dog; no unattended care before readiness gates.
3. Meet the owner and dog with the proposed walker; review behavior history, mobility, equipment fit, triggers, routine and building handoff. Observe only safe controlled handling with owner consent. Decline/defer if safe control or appropriate coverage cannot be established.
4. Document accepted scope, limitations, designated walker/backup and customer communication privately. Ask for explicit consent to emergency veterinary care, approved contacts, spending authority and photos. Marketing photo consent is optional and separate.
5. Obtain reviewed agreement signatures and all required care-plan fields. Payment alone must never bypass safety acceptance. A submitted form or calendar event does not confirm a booking.
6. Send confirmation with approved window, service, price, arrival/access procedure and cancellation terms after all gates pass. Never put lock codes in confirmation email.

## Blank restricted intake schema

| Group | Fields |
|---|---|
| Owner | Name, contact channel, service address, alternate authorized contact |
| Dog | Name, age, size, identification/microchip information where useful, vet-provided care limitations |
| Behavior | Bite/escape history, reactivity/triggers, interactions with dogs/people, separation response |
| Care | Routine, food/allergies, mobility restrictions, approved walk/drop-in scope; medication only for information/referral, not an offered pilot service |
| Equipment | Approved fitted harness/collar, fixed-length leash, owner supply location |
| Emergency | Regular/emergency vet, contact order, consent, privately recorded spending limit and payer |
| Access | Authorized entry method and key custody reference; **codes stored separately**, never in a shared dispatch sheet |
| Permission | Service terms/version, photo-update consent, separate optional marketing consent, signature/date |
| Decision | Assigned walker, approved backup, fit decision/reason, follow-up needed, approver/date |

## Storage and security

Use a restricted Google Form/Sheet only after owner review; no new live intake form is configured by this pack. Share the minimum assigned-client care plan with each walker, not the full roster or all clients. A public calendar uses a nonidentifying visit ID and window, not addresses or dog medical notes. Keep access secrets in a dedicated restricted store; log key handoff/return without labeling keys with addresses.

Set 2FA, access removal on walker departure, a written retention/deletion policy and an incident contact. Proposed unconverted-inquiry retention is 90 days; completed records need a legally/insurer-reviewed retention period. Do not purge signed contracts or claim records arbitrarily.

## Verify receipt

Native `Contact.tsx` includes Netlify metadata. That does **not** prove the chosen host receives submissions. Verify the real deployment, required form detection/endpoint, notification, spam/error handling and restricted storage with synthetic data. Verify inbound and outbound `hello@pawsfectwalks.com` separately. An email link in source does not prove routing or a sender exists.

**Done:** synthetic inquiry reaches the actual controlled inbox/storage; meet-and-greet checklist rehearsed; acceptance/decline and permissions tested; no sensitive fields exposed publicly.
