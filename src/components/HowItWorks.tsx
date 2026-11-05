import { ClipboardList, MessageCircleHeart, PawPrint } from 'lucide-react';

const steps = [
  {icon: ClipboardList, title:'Tell us about your dog',description:'Share your name, general Austin neighborhood, and preferred walk times.'},
  {icon: MessageCircleHeart, title:'We get in touch',description:'Our team follows up about your routine and the next available openings.'},
  {icon: PawPrint, title:'Start a happier routine',description:'When a suitable opening is confirmed, we guide you through the next steps.'}
];
export default function HowItWorks(){
 return <section id="how-it-works" className="bg-gray-50 py-20"><div className="mx-auto max-w-7xl px-6">
 <div className="mb-14 text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-700">How it works</p><h2 className="mb-4 text-4xl font-bold text-gray-900">A thoughtful beginning for every good walk</h2><p className="mx-auto max-w-2xl text-lg text-gray-600">We make it easy to tell us what you're looking for and keep in touch about your dog's care.</p></div>
 <div className="grid gap-8 md:grid-cols-3">{steps.map((s,i)=><article key={s.title} className="rounded-2xl bg-white p-7 text-center shadow-sm">
 <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400"><s.icon className="h-7 w-7 text-gray-900"/></span>
 <h3 className="mb-3 text-xl font-semibold text-gray-900">{i+1}. {s.title}</h3><p className="text-gray-600">{s.description}</p></article>)}</div></div></section>;
}
