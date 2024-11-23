import React from 'react';
import { ShieldCheck, Clock, Heart } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Professional & Reliable",
      description: "Fully insured and Pet First Aid certified for your peace of mind."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Available 7 days a week with convenient booking options."
    },
    {
      icon: Heart,
      title: "Passionate Care",
      description: "Treating every pet with the love and attention they deserve."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're dedicated to providing exceptional care for your furry family members. 
            With years of experience and a genuine love for animals, we ensure your pets 
            receive the attention and exercise they need to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
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