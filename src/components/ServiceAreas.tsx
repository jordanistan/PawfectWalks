import React from 'react';
import { MapPinned } from 'lucide-react';

const zones = [
  {
    name: 'Central & Downtown',
    neighborhoods: 'Downtown, Zilker, Bouldin, Travis Heights',
  },
  {
    name: 'South Austin',
    neighborhoods: 'South Congress, South Lamar, Southpark Meadows',
  },
  {
    name: 'East Austin',
    neighborhoods: 'East Cesar Chavez, Mueller, MLK',
  },
  {
    name: 'North Austin',
    neighborhoods: 'The Domain, North Loop, Round Rock corridor',
  },
];

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-3">
            One neighborhood at a time
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Built zone by zone across Austin</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Instead of one big pool of walkers, we run a small, dedicated team in each zone. Owners
            get the same familiar faces walking their dog; walkers only ever work close to home.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {zones.map((zone) => (
            <div key={zone.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <MapPinned className="h-6 w-6 text-amber-500 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">{zone.name}</h3>
              <p className="text-sm text-gray-600">{zone.neighborhoods}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-8 text-center">
          Don't see your neighborhood yet? We're adding zones as new local walkers join —
          <a href="#careers" className="text-amber-700 font-medium hover:underline"> apply to start one</a>.
        </p>
      </div>
    </section>
  );
}
