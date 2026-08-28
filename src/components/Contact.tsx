import React from 'react';
import { Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join the Waitlist</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're building out our local walker team now. Tell us about your dog and your
            neighborhood, and we'll reach out the moment we're serving your area.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="space-y-6">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Do not fill this out: <input name="bot-field" /></label>
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About Your Dog
                </label>
                <textarea
                  name="dog_details"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  rows={4}
                  placeholder="Tell us about your dog's breed, age, and any special needs..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-amber-500 transition"
              >
                Join the Waitlist
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-amber-400 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:hello@pawsfectwalks.com" className="text-gray-600 hover:text-amber-600 transition">hello@pawsfectwalks.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-400 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Service Area</h3>
                  <p className="text-gray-600">Austin, TX and surrounding areas</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="font-semibold mb-4">Our care standards</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Practical dog-care onboarding for every walker</li>
                <li>✓ Local team members assigned by service area</li>
                <li>✓ Clear handoff and visit-update procedures</li>
                <li>✓ Project manager oversight from pickup to return</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
