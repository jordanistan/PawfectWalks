import { ShieldCheck, Clock, Heart, BadgeCheck } from 'lucide-react';
const features=[
 {icon:ShieldCheck,title:'A safety-minded approach',description:"Thoughtful introductions, clear handling standards, and attention to each dog's needs."},
 {icon:Clock,title:'Carefully coordinated',description:'A clear point of contact and practical communication throughout the visit process.'},
 {icon:Heart,title:'Personal by design',description:'We focus on routines, familiar details, and the small things that make dogs happy.'},
 {icon:BadgeCheck,title:'Attention to detail',description:'A considered approach to pairing dogs and people for the right kind of walk.'}
];
export default function About(){return <section id="about" className="bg-gray-50 py-20"><div className="mx-auto max-w-7xl px-6">
<div className="mb-14 text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-700">The Pawsfect Walks difference</p><h2 className="mb-4 text-4xl font-bold text-gray-900">Good care starts with understanding your dog</h2>
<p className="mx-auto max-w-2xl text-lg text-gray-600">Every dog has a personality. We believe great walking starts with attention, respect, and a routine that fits.</p></div>
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{features.map(f=><article key={f.title} className="text-center">
<div className="mb-5 inline-flex rounded-full bg-amber-400 p-4"><f.icon className="h-8 w-8 text-gray-900"/></div><h3 className="mb-3 text-lg font-semibold">{f.title}</h3><p className="text-gray-600">{f.description}</p></article>)}</div></div></section>}
