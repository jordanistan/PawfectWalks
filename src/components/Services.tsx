import { DogIcon, ShieldCheck } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: DogIcon,
      title: "Proposed walking pilot",
      status: "Concept only",
      features: [
        "Individual household walks",
        "Owner-attended introduction before care",
        "Approved leash and handling rules",
        "Clear visit updates",
        "Manual acceptance before any confirmation"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Readiness first",
      status: "Decisions pending",
      features: [
        "Verified insurance before paid care",
        "Approved launch boundary and schedule",
        "Reviewed intake and handling process",
        "Signed terms before a visit",
        "Tested payment and cancellation process"
      ]
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-3">
            This is the proposed shape of a small first pilot, not a menu of currently
            available visits.
          </p>
          <p className="text-sm text-amber-700 font-medium">
            Rates, availability, and the final scope will be published only after review.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 bg-amber-400 rounded-full">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-amber-700 bg-amber-50 rounded-full px-3 py-1">{service.status}</p>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-6">{service.title}</h3>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg className="h-5 w-5 text-amber-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
