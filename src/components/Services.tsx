import React from 'react';
import { DogIcon, Home } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: DogIcon,
      title: "Dog Walking",
      price: "$50",
      duration: "per hour",
      features: [
        "One-on-one attention",
        "Flexible scheduling options",
        "GPS tracked walks",
        "Photo updates",
        "Customized routes",
        "Fresh water refills"
      ]
    },
    {
      icon: Home,
      title: "Dog Sitting",
      price: "From $50",
      duration: "per hour",
      features: [
        "In-home care",
        "Feeding & medication",
        "Regular updates",
        "Playtime & exercise",
        "Plant watering",
        "Mail collection"
      ]
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our professional pet care services, tailored to meet your dog's 
            unique needs and personality.
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
                  <p className="text-3xl font-bold text-gray-900">{service.price}</p>
                  <p className="text-gray-600">{service.duration}</p>
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