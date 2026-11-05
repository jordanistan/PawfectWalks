import { Briefcase, Dog, Mail } from 'lucide-react';

const openings = [
  {
    title: 'Dog Walker',
    schedule: 'Part-time · Austin-area assignments',
    icon: Dog,
    description: 'Help dogs enjoy calm, engaging walks with attention to their individual routines.',
    duties: ['Individual dog walks and thoughtful visit updates', 'Reliable arrivals and careful handling', 'Clear communication with the coordinating team'],
    qualifications: 'Dog-handling experience, dependable transportation, punctuality, and a caring, safety-minded approach.',
    subject: 'Dog Walker Interview Interest',
  },
  {
    title: 'Project Manager / Dispatch',
    schedule: 'Operations · Austin-based coordination',
    icon: Briefcase,
    description: 'Help coordinate schedules, thoughtful walker assignments, and communication with pet owners.',
    duties: ['Manage schedules and service-area coordination', 'Track visit updates and changes', 'Support a consistent customer experience'],
    qualifications: 'Strong organization, scheduling experience, good judgment, and excellent communication skills.',
    subject: 'Project Manager Interview Interest',
  },
];

function applicationLink(subject: string) {
  const body = [
    'I would like to be considered for an interview.',
    '',
    'Name:',
    'Email:',
    'Phone (optional):',
    'General Austin area:',
    'Relevant experience:',
    'General availability:',
    '',
    'Please contact me about next steps.',
  ].join('\n');
  return 'mailto:hello@pawsfectwalks.com?subject=' +
    encodeURIComponent('Pawsfect Walks — ' + subject) +
    '&body=' + encodeURIComponent(body);
}

export default function Careers() {
  return (
    <section id="careers" className="bg-gray-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-300">Join our team</p>
          <h2 className="mb-4 text-4xl font-bold">Love dogs? Let's talk.</h2>
          <p className="text-lg text-gray-200">
            We're connecting with dependable dog lovers and experienced organizers in Austin.
            Tell us about yourself to be considered for an introductory interview.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {openings.map((role) => (
            <article key={role.title} className="rounded-2xl bg-gray-800 p-8">
              <div className="mb-5 inline-flex rounded-xl bg-amber-400 p-3 text-gray-900"><role.icon className="h-8 w-8" /></div>
              <h3 className="mb-2 text-2xl font-bold">{role.title}</h3>
              <p className="mb-5 text-sm font-medium text-amber-300">{role.schedule}</p>
              <p className="mb-5 text-gray-200">{role.description}</p>
              <ul className="mb-5 space-y-2 text-gray-200">
                {role.duties.map((d) => <li key={d}>• {d}</li>)}
              </ul>
              <p className="mb-7 text-sm text-gray-300"><strong>We're looking for:</strong> {role.qualifications}</p>
              <a href={applicationLink(role.subject)} className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-semibold text-gray-900 hover:bg-amber-500">
                <Mail className="h-4 w-4" /> Request an Interview
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-300">The interview link opens your email app. Send the pre-filled email to submit your interest. Compensation and work arrangements are discussed during the interview process.</p>
      </div>
    </section>
  );
}
