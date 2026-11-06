import { ShieldCheck, Clock, Heart, BadgeCheck } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Walking-first plan",
      description: "The proposed first pilot is intentionally narrow while its operating details are reviewed."
    },
    {
      icon: Clock,
      title: "Manual review",
      description: "A future request would be reviewed by a person before any visit could be confirmed."
    },
    {
      icon: Heart,
      title: "Safety before service",
      description: "Insurance, handling, intake, agreements, cancellation terms, and payment must be settled first."
    },
    {
      icon: BadgeCheck,
      title: "Honest updates",
      description: "The site will say clearly when the pilot is ready; joining the waitlist does not reserve care."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">Care built around consistency</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">A better walk starts with a better system</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pawsfect Walks is still being shaped. The goal is a small, walking-first Austin pilot
            with clear handoffs and human communication, but the operating details must be approved
            before anyone can reserve or pay for care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-4 bg-amber-400 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
