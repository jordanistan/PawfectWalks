import React from 'react';
import { MessageCircleHeart, PawPrint, Send } from 'lucide-react';

const steps = [
  {
    icon: Send,
    title: 'Tell us about your dog',
    description: 'A couple minutes: your dog, your neighborhood, and when you need someone.',
  },
  {
    icon: PawPrint,
    title: 'We match you with a local walker',
    description: 'A real person in your zone who already knows the neighborhood — not a stranger from across town.',
  },
  {
    icon: MessageCircleHeart,
    title: 'Relax — you\'ll get updates',
    description: 'Photos and a quick note while they\'re out, so you know your dog is having a great time.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">
            No apps to figure out, no guesswork
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Getting your dog a walker should feel as easy as getting a ride
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            You already know how this works from ordering a ride or dinner. This isn't
            different — just for your dog.
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
