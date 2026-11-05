import type { FormEvent } from 'react';
import { Mail, MapPin } from 'lucide-react';

const CONTACT_EMAIL = 'hello@pawsfectwalks.com';

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const body = [
    'Client waiting list request',
    'Name: ' + data.get('name'),
    'Email: ' + data.get('email'),
    'Austin neighborhood: ' + data.get('neighborhood'),
    'Preferred walk timing: ' + data.get('timing'),
    'Message: ' + (data.get('message') || 'No additional message'),
  ].join('\n');
  window.location.href = 'mailto:' + CONTACT_EMAIL +
    '?subject=' + encodeURIComponent('Pawsfect Walks — Client Waiting List') +
    '&body=' + encodeURIComponent(body);
}

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-700">Stay in the loop</p>
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Join the Client Waiting List</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Tell us a little about your dog's routine. We'll reach out as openings become available in your area.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="rounded-2xl bg-white p-8 shadow-xl lg:col-span-3">
            <form name="client-waiting-list" onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="client-name" className="mb-2 block font-medium text-gray-700">Your name</label>
                <input id="client-name" name="name" required autoComplete="name" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-400 focus:outline-none" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="client-email" className="mb-2 block font-medium text-gray-700">Email address</label>
                <input id="client-email" name="email" type="email" required autoComplete="email" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-400 focus:outline-none" placeholder="you@example.com" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="client-neighborhood" className="mb-2 block font-medium text-gray-700">General Austin neighborhood</label>
                  <input id="client-neighborhood" name="neighborhood" required className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-400 focus:outline-none" placeholder="e.g. Clarksville" />
                </div>
                <div>
                  <label htmlFor="client-timing" className="mb-2 block font-medium text-gray-700">Preferred timing</label>
                  <select id="client-timing" name="timing" required defaultValue="" className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-400 focus:outline-none">
                    <option value="" disabled>Select a time</option>
                    <option>Weekday mornings</option>
                    <option>Weekday afternoons</option>
                    <option>Evenings</option>
                    <option>Weekends</option>
                    <option>Flexible / recurring</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="client-message" className="mb-2 block font-medium text-gray-700">Anything else? <span className="text-sm font-normal text-gray-500">(optional)</span></label>
                <textarea id="client-message" name="message" rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-amber-400 focus:outline-none" placeholder="Tell us what kind of walks you're interested in." />
              </div>
              <button type="submit" className="w-full rounded-full bg-amber-400 px-6 py-3 font-bold text-gray-900 hover:bg-amber-500">
                Send My Waiting List Request
              </button>
              <p className="text-sm text-gray-500">
                This opens your email app with your request ready to send. Send the email to complete your request. Please do not include home access codes or medical records.
              </p>
            </form>
          </div>
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-white p-7 shadow-lg">
              <Mail className="mb-4 h-8 w-8 text-amber-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Prefer email?</h3>
              <a href={'mailto:' + CONTACT_EMAIL} className="break-all font-medium text-amber-700 hover:underline">{CONTACT_EMAIL}</a>
            </div>
            <div className="rounded-2xl bg-white p-7 shadow-lg">
              <MapPin className="mb-4 h-8 w-8 text-amber-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Proudly Austin-focused</h3>
              <p className="text-gray-600">Share your neighborhood and we'll follow up about availability.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
