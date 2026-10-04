# 09 — Launch tests, tasks and agent handoff

## GitHub tasks

Parent: [P003 / illnetwork #29](https://github.com/jordanistan/illnetwork/issues/29).

- [ ] [[P003-01] Insurance verification](https://github.com/jordanistan/illnetwork/issues/39) — [01_Insurance_Verification.md](01_Insurance_Verification.md)
- [ ] [[P003-02] Service area and availability](https://github.com/jordanistan/illnetwork/issues/40) — [02_Service_Area_and_Availability.md](02_Service_Area_and_Availability.md)
- [ ] [[P003-03] Intake and meet-and-greet](https://github.com/jordanistan/illnetwork/issues/41) — [03_Intake_and_Meet_and_Greet.md](03_Intake_and_Meet_and_Greet.md)
- [ ] [[P003-04] Dog handling and transportation policy](https://github.com/jordanistan/illnetwork/issues/42) — [04_Handling_and_Transportation.md](04_Handling_and_Transportation.md)
- [ ] [[P003-05] Service agreement working draft](https://github.com/jordanistan/illnetwork/issues/43) — [05_Service_Agreement_Draft.md](05_Service_Agreement_Draft.md)
- [ ] [[P003-06] Cancellation and refund policy](https://github.com/jordanistan/illnetwork/issues/44) — [06_Cancellation_and_Refunds.md](06_Cancellation_and_Refunds.md)
- [ ] [[P003-07] Payment method and booking controls](https://github.com/jordanistan/illnetwork/issues/45) — [07_Payments_and_Booking.md](07_Payments_and_Booking.md)

Issues describe remaining execution. Preparing this documentation does not close the seven readiness gates. Do not send insurer/customer messages, spend money, sign agreements or collect real client data solely because a task exists.

## Small execution sequence

1. **Operations/lead:** prepare D01–D07 decision packet, operating description and restricted blank intake. Jordan confirms initial model/zone/rate direction. Quotes and classification review can then use the correct facts.
2. **Jordan + external reviewers:** obtain actual insurance scope, classification/business/tax advice and agreement review; approve final policies and merchant choice. Agents track precise blockers and continue independent documentation/testing.
3. **Care/QA:** verify real walker capacity/vetting, rehearse handling/emergencies/access, and test intake/dispatch with synthetic data.
4. **Web engineer:** reconcile native website with approved service/rate/area/policy. Verify commercial host/form/email. Preserve native design/history. ILL preview remains a review and must not advertise a separate conflicting paid offer.
5. **Finance/QA:** verify payment/refund/payout, document status transitions and reconcile. Live charge needs explicit owner authorization.
6. **Lead + Jordan:** run go/no-go checklist, cap first pilot, confirm each client individually, and review after the first completed visits before expansion.

## Synthetic launch rehearsal

| Scenario | Pass criteria |
|---|---|
| Qualified inquiry | Real controlled endpoint receives synthetic inquiry; no sensitive data leaked; factual response path works |
| Outside area / no capacity | Request declined or waitlisted accurately; no charge or false booking |
| Meet-and-greet fails safety assessment | No care/payment booking; acceptance decision and follow-up recorded |
| Ready client | Agreement/care plan/insured assigned walker/capacity verified before payment and written confirmation |
| Payment fails or remains pending | No automatic confirmed visit or success message |
| Worker unavailable | Approved ready backup or customer notified and full company-cancellation refund |
| Unsafe weather / no access | Approved SOP followed; no forced entry/unattended dog; policy applied correctly |
| Injury or escape | Contact/containment/escalation drill completed with synthetic details; report private |
| Late cancellation / refund failure | Correct signed policy, amounts, original-method action and exception path |
| Complete visit | Arrival/completion/photo permission, secure return and reconciled payment/worker record |
| Client/worker offboarding | Access/key revocation and restricted-record permissions tested |

Do not simulate a real emergency by calling emergency services or send messages to real customers. Use controlled test channels and fictional records. Save real operational evidence privately and publish only pass/fail, date, build and test limitations.

## Source QA commands

This change is documentation only; verify links/placeholders/privacy and Git diff. For later native website changes run the repository's current `npm ci`, `npm run lint`, `npm run build`, and `npm audit --audit-level=high`; record existing failures without hiding them. Use an appropriate supported Node release, inspect lockfile changes and perform actual browser checks. ILL generator changes also require its documented boundary tests and artifact checks. No npm/site behavior changes were made by this pack.

## Obsidian workflow

Open `00_Launch_Dashboard.md`; Markdown links navigate the ten notes. A fresh folder may be opened as an Obsidian vault or the notes copied into a verified existing business folder. Do not create another vault at an assumed local path or overwrite a note with the same name. Drive synchronization to a laptop/desktop is not confirmed by an upload. GitHub is authoritative for these generic templates; actual owner approvals and sensitive evidence stay private.

## Coordination and checkpoint

Use the current `.github/portfolio/TEAM.md` and claim state in illnetwork. One lead owns P003; scoped child tasks must have explicit nonoverlapping file ownership before parallel edits. No two machines edit the same policy or shared status file together.

Documentation session: ChatGPT; task P003; claim `claims/P003` at `69b36376f2fb7d24dda339ea3958812a091188f3`; native task branch `codex/paws-launch-readiness-20261004`; coordinator branch of the same name. Public files are generic drafts only. Owner gate remains pending.

Connector lacks claim-ref deletion; the claim is retained for an explicit handoff, not abandoned. After inspecting that documentation PRs are complete and the remote claim still matches this SHA, an owner-authenticated local Codex is authorized to release this session's completed-documentation claim with:

```bash
git push --force-with-lease=refs/heads/claims/P003:69b36376f2fb7d24dda339ea3958812a091188f3 origin :refs/heads/claims/P003
```

Run in the `illnetwork` checkout, never in the native repo. If the expected ref changed, stop and coordinate; do not remove another session's claim. Then acquire a fresh local record with `python3 portfolio/claim.py P003 --device laptop` before the next writing task. Do not bypass a different active lease.

Checkpoint format: task/device/owner/branch/commit/owned paths/claim SHA/document approvals/test evidence/remaining blockers/next exact action. Close P003 only after operational readiness evidence and the real inquiry/booking path are verified.
