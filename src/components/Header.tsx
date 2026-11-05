import { PawPrint } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative min-h-[90vh] text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
          alt="Happy dogs enjoying the outdoors"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <nav className="relative z-10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2" aria-label="Pawsfect Walks home">
            <PawPrint className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold">Pawsfect Walks</span>
          </a>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold sm:text-base">
            <a href="#services" className="hover:text-amber-400">Services</a>
            <a href="#about" className="hover:text-amber-400">Our Approach</a>
            <a href="#service-areas" className="hover:text-amber-400">Austin</a>
            <a href="#careers" className="hover:text-amber-400">Walk With Us</a>
            <a href="#contact" className="rounded-full bg-amber-400 px-4 py-2 text-gray-900 hover:bg-amber-500">Waiting List</a>
          </div>
        </div>
      </nav>
      <div className="relative z-10 flex min-h-[calc(90vh-95px)] items-center justify-center px-6 py-16 text-center">
        <div className="max-w-4xl">
          <p className="mb-6 inline-block rounded-full bg-black/35 px-5 py-2 text-sm font-semibold tracking-wide text-amber-300">
            AUSTIN, TEXAS · PERSONAL DOG WALKS & DROP-INS
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Because Every Pup Deserves the Best!
          </h1>
          <p className="mx-auto mb-9 max-w-2xl text-lg text-gray-100 md:text-xl">
            Thoughtful dog care, happy routines, and more peace of mind for the people who love them.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="rounded-full bg-amber-400 px-7 py-3 font-semibold text-gray-900 hover:bg-amber-500">
              Join the Client Waiting List
            </a>
            <a href="#careers" className="rounded-full border border-white/70 bg-white/10 px-7 py-3 font-semibold text-white hover:bg-white/20">
              Become a Walker
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
