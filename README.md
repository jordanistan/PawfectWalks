# Pawsfect Walks

Pawsfect Walks is a managed dog walking and sitting service for Austin, TX. A project manager owns the customer relationship, coordinates handoffs, and assigns each dog to a trusted walker in a location-based rotation.

Live domain: [pawsfectwalks.com](https://pawsfectwalks.com/)

## Local development

Requirements: Node.js 18+ and npm.

```bash
npm ci
npm run dev
```

The development server runs at `http://localhost:5173`.

## Checks

```bash
npm run lint
npm run build
npm audit --audit-level=high
```

## Docker preview

Build and run the production container locally:

```bash
docker build -t pawsfectwalks:local .
docker run --rm --name pawsfectwalks-local -p 8080:80 pawsfectwalks:local
```

Open [http://localhost:8080](http://localhost:8080) to review the production build. Nginx supplies the static files, SPA fallback, caching, and baseline security headers.

## Contact

Customer and career inquiries are currently handled by email at [hello@pawsfectwalks.com](mailto:hello@pawsfectwalks.com). The site runs a pre-launch waitlist (Contact section) rather than live booking while the local walker team is being staffed.

The contact form includes Netlify Forms metadata; receipt is unverified. Confirm build-time form detection and the actual deployed endpoint/inbox with synthetic data before relying on it. If a different hosting provider is selected, connect and test its form endpoint before launch.

## Launch readiness — P003

Start with [the launch dashboard](docs/launch/00_Launch_Dashboard.md). Ten Obsidian-compatible Markdown notes provide actionable insurance, capacity, intake, handling, service agreement, cancellation and payment tasks, blank templates, owner decisions and a launch rehearsal. They are **drafts**, not proof of active coverage, signed terms or working payments. Coordination: [illnetwork issue #29](https://github.com/jordanistan/illnetwork/issues/29). Keep completed operational/customer records private.
