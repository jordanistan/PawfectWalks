import React from 'react';
import { PawPrint } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
          alt="Happy dogs running"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold text-white">Pawsfect Walks</span>
          </div>
          <div className="hidden md:flex space-x-8 text-white">
            <a href="#about" className="hover:text-amber-400 transition">About</a>
            <a href="#services" className="hover:text-amber-400 transition">Services</a>
            <a href="#careers" className="hover:text-amber-400 transition">Earn Money</a>
            <a href="#contact" className="hover:text-amber-400 transition">Join the Waitlist</a>
            <a href="#contact" className="hover:text-amber-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 h-[calc(100vh-80px)] flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <p className="inline-block text-sm font-semibold tracking-wide text-amber-400 bg-black/30 rounded-full px-4 py-1.5 mb-6">
            Coming soon to Austin — building our local walker team now
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Because Every Pup Deserves the Best!
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Reliable dog care, coordinated by a real person and delivered by a trusted local team in Austin, TX
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="#contact"
              className="bg-amber-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-amber-500 transition"
            >
              Join the Waitlist
            </a>
            <a
              href="#services"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition"
            >
              Our Services
            </a>
          </div>
          <a href="#careers" className="inline-block mt-6 text-sm text-gray-200 hover:text-amber-400 transition">
            Rather walk dogs for cash? See openings →
          </a>
        </div>
      </div>
    </header>
  );
}
