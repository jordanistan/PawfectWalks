import { MessageCircleHeart, PawPrint, Send } from 'lucide-react';

const steps = [
  {
    icon: Send,
    title: 'Join the waitlist',
    description: 'Share only your name, email, general neighborhood, and the kind of timing you may need.',
  },
  {
    icon: PawPrint,
    title: 'We finish launch readiness',
    description: 'Insurance, operating policies, availability, agreements, and payment still need approval.',
  },
  {
    icon: MessageCircleHeart,
    title: 'We announce what is ready',
    description: 'Waitlist members can receive a clear update only after a safe pilot scope is approved.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">
            A simple first step
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Start with interest, not a reservation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The waitlist helps us understand general interest while the real operating decisions
            remain pending. It does not promise timing, coverage, or a confirmed visit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 mb-6">
                <step.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
