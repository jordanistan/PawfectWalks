import React from 'react';
import { ShieldCheck, Clock, Heart, BadgeCheck } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Organized Care",
      description: "A project manager coordinates schedules, matching, and every handoff."
    },
    {
      icon: Clock,
      title: "Local Rotations",
      description: "Walkers are assigned by service area so the team can serve each neighborhood consistently."
    },
    {
      icon: Heart,
      title: "Practical Training",
      description: "Every walker completes dog-care onboarding before taking visits."
    },
    {
      icon: BadgeCheck,
      title: "Walkers Who Earn It",
      description: "Every walker on the team is here because the work pays real money — they show up and work hard for it, so your dog gets genuine attention every visit."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">Care built around consistency</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">A better walk starts with a better system</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pawsfect Walks pairs thoughtful planning with genuinely attentive care. A dedicated
            project manager coordinates each visit, matches your dog with the right local walker,
            and stays accountable from handoff to return home.
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
