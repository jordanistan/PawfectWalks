import React from 'react';
import { PawPrint } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PawPrint className="h-6 w-6 text-amber-400" />
              <span className="text-xl font-bold">Pawsfect Walks</span>
            </div>
            <p className="text-gray-400">
              Professional dog walking and sitting services in Austin, TX.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-amber-400 transition">About Us</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition">Services</a></li>
              <li><a href="#careers" className="hover:text-amber-400 transition">Careers</a></li>
              <li><a href="https://calendly.com/d/cr9k-n4r-p8f" className="hover:text-amber-400 transition">Book Now</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition">Contact</a></li>
              <li><a href="#policies" className="hover:text-amber-400 transition">Policies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Downtown Austin</li>
              <li>South Congress</li>
              <li>East Austin</li>
              <li>Round Rock</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Email Us</h4>
            <a href="mailto:hello@pawsfectwalks.com" className="text-gray-400 hover:text-amber-400 transition">hello@pawsfectwalks.com</a>
            <p className="text-gray-500 mt-2 text-sm">We’re currently available by email only.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Pawsfect Walks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
