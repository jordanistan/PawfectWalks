import React from 'react';
import { ArrowRight, ClipboardCheck, DollarSign, MapPinned, Mic2, ShieldCheck, Users } from 'lucide-react';

const steps = [
  { title: 'Apply in minutes', description: 'Tell us your neighborhood, your availability, and a bit about your experience with dogs.' },
  { title: 'Get matched to your zone', description: 'You only ever walk close to home — no driving across town for a booking.' },
  { title: 'Walk dogs, get paid', description: 'We handle the scheduling and the owners. You just show up and do what you already love.' },
];

const roles = [
  {
    icon: Users,
    title: 'Dog Walker',
    label: 'Part-time · Pick your zone',
    description: 'Flexible, part-time work you can build around a day job, school, or driving for Uber/DoorDash. We line up the bookings in your neighborhood — you bring the energy.',
    skills: ['Dog handling and body-language awareness', 'Reliable transportation and punctuality', 'Comfort with larger, energetic, or senior dogs', 'Clear photo and visit updates'],
    localRequirement: 'Applicants must live in or near their assigned service area and have a current government-issued state ID with a U.S. address.',
  },
  {
    icon: ClipboardCheck,
    title: 'Project Manager',
    label: 'Contract · Hiring now',
    description: 'Our top priority hire right now. Own the daily care operation, become the familiar face owners trust, and build the local walker team from the ground up. Contract-based, with commission on every walker you recruit and onboard — the more great walkers you bring on, the more you earn. (Commission structure is still being finalized.)',
    skills: ['Recruiting and vetting local walkers', 'Highly organized scheduling and dispatch', 'Confident owner communication', 'Good judgment when matching dogs and walkers'],
    localRequirement: 'Applicants must live in or near Austin and have a current government-issued state ID with a U.S. address.',
  },
];

export default function Careers() {
  return (
    <section id="careers" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-700 mb-3">Join the pack</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get paid to walk dogs in your own neighborhood</h2>
          <p className="text-lg text-gray-600">
            Jobs are tough right now, and a lot of good people in Austin are juggling two or three
            of them just to cover rent. If you've got open hours and want to spend them outside
            getting paid instead of scrolling, this is built for you — no cold calling for clients,
            no building your own profile from scratch. We bring the bookings, you bring the good
            energy.
          </p>
        </div>

        <div className="rounded-2xl bg-gray-900 text-white p-8 mb-14 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="p-4 bg-amber-400 rounded-full shrink-0">
            <DollarSign className="h-7 w-7 text-gray-900" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Austin is expensive. This is one of the easiest ways to close the gap.</h3>
            <p className="text-gray-300">
              Local dog walkers typically make around $17–19/hour on other apps. We're not handing
              20% of every booking to a platform, so local walkers here can earn roughly 30% more
              — about $22–25/hour — for the same walks around the same neighborhood.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-gray-900 font-bold mb-4">
                {index + 1}
              </span>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {roles.map((role) => (
            <article key={role.title} className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="p-3 bg-amber-400 rounded-xl">
                  <role.icon className="h-7 w-7 text-white" />
                </div>
                <span className="text-sm font-medium text-amber-700 bg-amber-100 rounded-full px-3 py-1">{role.label}</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{role.title}</h3>
              <p className="text-gray-600 mb-6">{role.description}</p>
              <ul className="space-y-3 mb-8">
                {role.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-3 text-gray-700">
                    <ShieldCheck className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 border-t border-gray-100 pt-4 mb-6">{role.localRequirement}</p>
              <a
                href={`mailto:hello@pawsfectwalks.com?subject=${encodeURIComponent(`${role.title} application`)}`}
                className="inline-flex items-center gap-2 font-semibold text-gray-900 hover:text-amber-700 transition"
              >
                Apply by email <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-gray-900 text-white p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <MapPinned className="h-7 w-7 text-amber-400 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-1">No hustling for clients</h3>
              <p className="text-gray-300">The PM handles the schedule, owner updates, and every dog-to-walker match — you just show up to your zone and walk.</p>
            </div>
          </div>
          <a href="mailto:hello@pawsfectwalks.com?subject=Careers at Pawsfect Walks" className="inline-flex items-center justify-center gap-2 bg-amber-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition whitespace-nowrap">
            Tell us about yourself <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 rounded-2xl bg-white border border-amber-100 p-8 flex flex-col md:flex-row items-start gap-6">
          <div className="p-4 bg-amber-100 rounded-full shrink-0">
            <Mic2 className="h-7 w-7 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Walk dogs. Build your own thing, too.</h3>
            <p className="text-gray-600">
              A lot of our best walkers are already building something else — a comedy set, a band,
              a small business. Self-promotion is welcome here: if an owner shows interest, tell
              them about your show, your art, your page. Dogs are funny, neighbors talk, and good
              stories travel. We just ask that the dog's care always comes first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
