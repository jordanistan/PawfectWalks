import React from 'react';
import { Moon, ArrowRight } from 'lucide-react';

export default function NightOut() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 p-10 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-white/30 rounded-full shrink-0">
            <Moon className="h-10 w-10 text-gray-900" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Sometimes your dog just needs a night out
            </h3>
            <p className="text-gray-900/80 text-lg">
              Not every walk has to be about your schedule. When you're not up for it but your
              dog has energy to burn, a "Dog's Night Out" means a local walker takes them for an
              evening stroll, no leash in your hand required. Join the waitlist to be first in
              line once this is live in your neighborhood.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition whitespace-nowrap"
          >
            Join the waitlist <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
