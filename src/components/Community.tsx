import { Handshake, ArrowRight } from 'lucide-react';

export default function Community() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex p-4 bg-white rounded-full shadow-md mb-6">
          <Handshake className="h-8 w-8 text-amber-500" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">A good neighbor, not just a service</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Austin has no shortage of places where dog owners build community. If the walking pilot
          becomes launch-ready, Pawsfect Walks would like to participate as a careful local neighbor
          with clear boundaries and straightforward communication.
        </p>
        <p className="text-gray-500 mb-8">
          Run a dog-focused business in Austin and want to share general feedback on the concept?
          A conversation does not create a partnership or make care available.
        </p>
        <a
          href="mailto:hello@pawsfectwalks.com?subject=Partnership%20inquiry"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
        >
          Share feedback <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
