import { MapPinned } from 'lucide-react';

const decisions = [
  {
    name: 'Starting boundary',
    detail: 'One initial Austin pilot boundary must be selected and tested before publication.',
  },
  {
    name: 'Schedule windows',
    detail: 'Days, times, response expectations, and realistic travel buffers remain pending.',
  },
  {
    name: 'Capacity',
    detail: 'A small daily limit must be based on real availability rather than a map or estimate.',
  },
  {
    name: 'Backup plan',
    detail: 'Every offered window needs an approved primary, backup, and safe cancellation path.',
  },
];

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">
            Availability is still under review
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Start small, then publish what is real</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pawsfect Walks has not published neighborhood coverage or operating hours. General
            waitlist interest will help inform planning, but every future request would still need
            manual review after launch readiness is complete.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {decisions.map((decision) => (
            <div key={decision.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <MapPinned className="h-6 w-6 text-amber-500 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">{decision.name}</h3>
              <p className="text-sm text-gray-600">{decision.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-8 text-center">
          No address is accepted or confirmed through this public page. Join the waitlist with only
          a general neighborhood if you would like a future update.
        </p>
      </div>
    </section>
  );
}
