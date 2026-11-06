import type { FormEvent } from 'react';
import { Mail, MapPin } from 'lucide-react';

// No form backend yet: submitting opens a pre-filled email to the waitlist inbox.
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const body = [
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    '',
    'General interest:',
    `${data.get('interest')}`,
  ].join('\n');
  window.location.href = `mailto:jordan.robison@gmail.com?subject=${encodeURIComponent('Waitlist request')}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join the Waitlist</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pawsfect Walks is a Pre-launch concept. Share only general interest and we can send an
            update if an approved pilot becomes available. Submitting this waitlist request does not create a booking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form name="contact" onSubmit={handleSubmit} className="space-y-6 pt-6">
              <div>
                <label htmlFor="waitlist-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  name="name"
                  id="waitlist-name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  id="waitlist-email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="waitlist-interest" className="block text-sm font-medium text-gray-700 mb-2">
                  General Interest
                </label>
                <textarea
                  name="interest"
                  id="waitlist-interest"
                  aria-describedby="waitlist-privacy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  rows={4}
                  placeholder="General neighborhood and timing only — no street address or private records"
                ></textarea>
              </div>
              <p id="waitlist-privacy" className="text-sm text-gray-600">
                Do not send addresses, access codes, payment details, IDs, or medical records.
                Submitting opens your email app; this site does not store the form.
              </p>
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
                  <a href="mailto:jordan.robison@gmail.com" className="text-gray-600 hover:text-amber-600 transition">jordan.robison@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-400 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Launch location</h3>
                  <p className="text-gray-600">Austin pilot boundary pending review</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="font-semibold mb-4">Current boundaries</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Waitlist interest only</li>
                <li>✓ No reservation or payment on this page</li>
                <li>✓ No sensitive details in the initial message</li>
                <li>✓ Launch updates only after readiness review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
