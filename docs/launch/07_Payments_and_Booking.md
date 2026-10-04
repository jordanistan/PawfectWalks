# 07 — Payment method and booking controls

**Status: method, merchant activation and end-to-end tests unconfirmed.** A form submit, screenshot, invoice or calendar event does not establish a completed payment or booking.

## Proposed starting method

Use an owner-controlled hosted invoice processor, with **Square Invoices as a candidate** rather than an activated account. If Jordan already has another suitable merchant account, evaluate that first. Avoid a custom card form or a paid all-in-one booking subscription before manual operations are proven. Review current fees, supported services, refund/dispute terms, identity requirements and payout timing before selecting; no subscription/account purchase was made.

## Complete the setup

1. Jordan confirms legal seller, approved business contact, processor, bank destination and authorized users privately; completes merchant verification and 2FA. Do not paste banking/tax/identity details or API keys into GitHub.
2. Approve the rate card and scope. Native Services.tsx advertises $50/hour walking and from $50/hour sitting; ILL review uses a separate 30-minute estimator. Historic proposals are not an approved launch quote. Finance reconciles service time, travel, walker/manager compensation, processing, insurance, refunds and any applicable tax treatment privately. Do not claim $10 retained equals profit.
3. Ask an accountant/appropriate authority to verify applicable Texas business, tax and worker-payment duties for the actual managed service. No tax-free or 1099 conclusion is presumed from the website.
4. Invoice only an accepted scoped service after onboarding/agreement and availability checks. Proposed first pilot: per-visit prepayment, no subscription/card-on-file automation. Customer pays the business, not a public walker's personal account.
5. Verify payment inside the authenticated processor and reconcile invoice/visit ID. A manually marked-paid cash/check invoice does not mean processor settlement occurred. A pending or failed payment must not trigger confirmation automatically.
6. Perform sandbox tests if offered. With Jordan's explicit approval for the real charge, use a small controlled live transaction, verify receipt and settlement/payout, then initiate and verify a refund. Record refunded/pending/settled states accurately; do not mark a bank refund complete until evidence exists. Never use real cards/keys in test fixtures.
7. Test paid-then-cancelled, duplicated payment, failed payment, pending settlement, incorrect amount, refund failure and provider cancellation. Keep payment CTAs off until approved readiness and live tests pass.
8. Reconcile worker payment separately under the reviewed engagement model. Previously proposed completed-visit payment must be checked against the real classification and applicable obligations. No payment is withheld on the assumption all workers are contractors.

## Private visit ledger

Visit ID; client reference; agreed window/service/rate version; assigned worker; invoice ID; payment method/status; actual received/settled amount; refund ID/status; completion evidence; worker payable/status; reconciliation date/owner. Store no full card numbers, security codes or customer financial records in GitHub.

## Confirmation gate

Confirmed = insurer-approved scope + approved area/capacity + accepted care plan + signed agreement + competent insured primary/backup + verified payment + human confirmation. Agents may prepare a request but must not invent a confirmed booking.

**Done:** selected activated merchant account, reviewed rate card and tax/pay model, controlled live receipt/refund/payout evidence, reconciled ledger and working business response channel.

Source checked October 4, 2026: [Square accepting invoice payments](https://api.squareup.com/help/us/en/article/8508-accept-payment-for-an-invoice). Square documents that manually recorded outside payments are tracking entries, not deposits, and some outside-method refunds require an actual separate transfer. This does not establish Jordan has a Square account.
