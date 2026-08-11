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

Customer and career inquiries are currently handled by email at [hello@pawsfectwalks.com](mailto:hello@pawsfectwalks.com). Booking is handled through the Calendly link in the site navigation.

The contact form uses Netlify Forms metadata and will collect submissions when deployed on Netlify. If a different hosting provider is selected, connect the form to that provider's form endpoint before launch.
