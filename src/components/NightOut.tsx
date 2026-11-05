import { Moon, ArrowRight } from 'lucide-react';
export default function NightOut(){return <section className="bg-gray-900 py-16"><div className="mx-auto max-w-5xl px-6"><div className="flex flex-col items-center gap-8 rounded-3xl bg-linear-to-br from-amber-400 to-amber-500 p-10 md:flex-row md:p-12">
<div className="shrink-0 rounded-full bg-white/30 p-4"><Moon className="h-10 w-10 text-gray-900"/></div>
<div className="flex-1 text-center md:text-left"><h3 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Make room for the evening you have planned</h3><p className="text-lg text-gray-900/85">Busy days and special evenings happen. Tell us when a dog walk would help, and we'll be in touch about opportunities to join our care schedule.</p></div>
<a className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800" href="#contact">Join the Waiting List <ArrowRight className="h-4 w-4"/></a>
</div></div></section>}
