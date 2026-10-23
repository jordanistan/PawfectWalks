
export default function Policies() {
  return (
    <section id="policies" className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">Good to know</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Policies</h2>
          <p className="text-gray-600">The public page is a waitlist for updates, not an active care agreement.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-gray-600">
          <article>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy</h3>
            <p>Keep the initial message minimal. Do not include a street address, entry information, financial details, identity documents, or health records. We do not sell personal information.</p>
          </article>
          <article>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Service terms</h3>
            <p>The service agreement, intake process, handling policy, and accepted pilot scope remain pending. A reviewed agreement would be required before any future visit.</p>
          </article>
          <article>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancellations</h3>
            <p>No cancellation or refund term applies to the free waitlist because it is not a reservation or purchase. Future terms must be approved and shown before paid care.</p>
          </article>
        </div>

        <p className="text-xs text-gray-500 mt-10">These are introductory website policies, not a substitute for a reviewed service agreement or legal advice. Contact hello@pawsfectwalks.com with policy questions.</p>
      </div>
    </section>
  );
}
