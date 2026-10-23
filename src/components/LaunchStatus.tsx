import { ClipboardCheck, ShieldCheck, Users } from 'lucide-react';

const checks = [
  {
    icon: ShieldCheck,
    title: 'Operating safeguards',
    description: 'Insurance and the handling, intake, agreement, cancellation, and payment policies are still pending.',
  },
  {
    icon: ClipboardCheck,
    title: 'Pilot scope',
    description: 'The initial boundary, schedule, capacity, and backup plan have not been approved for public availability.',
  },
  {
    icon: Users,
    title: 'People and readiness',
    description: 'The people and operating model remain under review; this page accepts only customer-interest waitlist messages.',
  },
];

export default function LaunchStatus() {
  return (
    <section id="launch-status" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-700 mb-3">Launch status</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Building the foundation before offering care</h2>
          <p className="text-lg text-gray-600">
            Paid care is not available yet. Recruiting is not open. Pawsfect Walks will remain a
            waitlist-only concept until its operating safeguards and small pilot scope are approved.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {checks.map((check) => (
            <article key={check.title} className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
              <div className="inline-flex p-3 bg-amber-400 rounded-xl mb-5">
                <check.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{check.title}</h3>
              <p className="text-sm text-gray-600">{check.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
