import React from 'react';
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
          Austin has no shortage of places dog owners already love spending time — membership dog
          parks, indoor dog clubs, dog-friendly cafés. Almost none of them offer walking or pickup,
          because it's outside what they do. That's exactly where we'd like to fit in — as the
          walk before or after your dog's time there.
        </p>
        <p className="text-gray-500 mb-8">
          Run a dog-focused business in Austin and want to offer your members an easy way to get
          their dog picked up or walked? We'd love to talk.
        </p>
        <a
          href="mailto:hello@pawsfectwalks.com?subject=Partnership%20inquiry"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
        >
          Partner with us <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
