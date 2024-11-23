import React from 'react';
import { PawPrint, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PawPrint className="h-6 w-6 text-amber-400" />
              <span className="text-xl font-bold">Pawfect Walks</span>
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
              <li><a href="#booking" className="hover:text-amber-400 transition">Book Now</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition">Contact</a></li>
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
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Pawfect Walks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}