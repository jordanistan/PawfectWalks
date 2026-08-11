import React from 'react';
import { ArrowRight, ClipboardCheck, MapPinned, ShieldCheck, Users } from 'lucide-react';

const roles = [
  {
    icon: Users,
    title: 'Dog Walker',
    label: 'Part-time · Location-based',
    description: 'Bring calm, dependable energy to every visit. Walkers join a local rotation and focus on safe, attentive care for the dogs assigned to them.',
    skills: ['Dog handling and body-language awareness', 'Reliable transportation and punctuality', 'Comfort with larger, energetic, or senior dogs', 'Clear photo and visit updates'],
    localRequirement: 'Applicants must live in or near their assigned service area and have a current government-issued state ID with a U.S. address.',
  },
  {
    icon: ClipboardCheck,
    title: 'Project Manager',
    label: 'Operations · Small team lead',
    description: 'Own the daily care operation and become the familiar face owners can trust. You will coordinate a small walker team and make sure every handoff is covered.',
    skills: ['Highly organized scheduling and dispatch', 'Confident owner communication', 'Team leadership and follow-through', 'Good judgment when matching dogs and walkers'],
    localRequirement: 'Applicants must live in or near Austin and have a current government-issued state ID with a U.S. address.',
  },
];

export default function Careers() {
  return (
    <section id="careers" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-700 mb-3">Join the pack</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Help us make dog care feel effortless</h2>
          <p className="text-lg text-gray-600">
            We are building a dependable local care team around one simple promise: owners should
            always know who is responsible for their dog. Our project manager coordinates the
            operation; our walkers deliver the care in a consistent location-based rotation.
          </p>
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
              <h3 className="text-xl font-semibold mb-1">How the team works</h3>
              <p className="text-gray-300">Walkers are assigned to a consistent service area. The PM handles the schedule, owner updates, and every dog-to-walker match.</p>
            </div>
          </div>
          <a href="mailto:hello@pawsfectwalks.com?subject=Careers at Pawsfect Walks" className="inline-flex items-center justify-center gap-2 bg-amber-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition whitespace-nowrap">
            Tell us about yourself <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
