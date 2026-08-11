import React from 'react';

export default function Policies() {
  return (
    <section id="policies" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">Good to know</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Policies</h2>
          <p className="text-gray-600">Clear expectations help us provide calm, consistent care for every dog and owner.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-gray-600">
          <article>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy</h3>
            <p>We use the information you send us to respond to inquiries, schedule care, and provide services. We do not sell your personal information. Booking links may take you to Calendly, which has its own privacy policy.</p>
          </article>
          <article>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Service terms</h3>
            <p>Owners are responsible for accurate information about their dog, including temperament, medical needs, access instructions, and emergency contacts. We may decline or pause care when safety information is incomplete or a situation is unsafe.</p>
          </article>
          <article>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancellations</h3>
            <p>Please email us as early as possible when plans change. Cancellation timing, credits, and fees will be confirmed during onboarding and included in the service agreement before recurring care begins.</p>
          </article>
        </div>

        <p className="text-xs text-gray-500 mt-10">These are introductory website policies, not a substitute for a reviewed service agreement or legal advice. Contact hello@pawsfectwalks.com with policy questions.</p>
      </div>
    </section>
  );
}
