import { Dog, HeartHandshake } from 'lucide-react';
const services=[
 {icon:Dog,title:'Personal Dog Walks',subtitle:'Fresh air, exercise, and plenty of sniff time.',features:['Individual attention','Comfortable, leashed outings','A pace that fits your dog','Thoughtful walk updates']},
 {icon:HeartHandshake,title:'Dog Drop-In Visits',subtitle:'A little extra care when you cannot be there.',features:['A familiar check-in','Water and routine care','Potty and outdoor breaks','Practical visit notes']}
];
export default function Services(){return <section id="services" className="py-20"><div className="mx-auto max-w-7xl px-6">
<div className="mb-14 text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-700">Our services</p><h2 className="mb-4 text-4xl font-bold text-gray-900">More than just a walk</h2>
<p className="mx-auto max-w-2xl text-lg text-gray-600">Explore thoughtful dog-walking and drop-in care in Austin. Join our waiting list to hear about openings that fit your neighborhood and schedule.</p></div>
<div className="grid gap-8 md:grid-cols-2">{services.map(s=><article key={s.title} className="rounded-2xl bg-white p-8 shadow-xl">
<div className="mb-6 inline-flex rounded-2xl bg-amber-400 p-4"><s.icon className="h-8 w-8 text-gray-900"/></div>
<h3 className="mb-2 text-2xl font-bold">{s.title}</h3><p className="mb-6 text-gray-600">{s.subtitle}</p>
<ul className="space-y-3 text-gray-700">{s.features.map(f=><li key={f} className="flex gap-2"><span className="font-bold text-amber-600">✓</span>{f}</li>)}</ul></article>)}</div></div></section>}
