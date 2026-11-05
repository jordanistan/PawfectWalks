import { PawPrint } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a href="#" className="mb-4 flex items-center gap-2">
              <PawPrint className="h-7 w-7 text-amber-400" />
              <span className="text-xl font-bold">Pawsfect Walks</span>
            </a>
            <p className="text-gray-300">A little more joy in every walk. Proudly Austin-focused.</p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Explore</h3>
            <div className="flex flex-col gap-2 text-gray-300">
              <a href="#services" className="hover:text-amber-400">Dog Walking & Drop-Ins</a>
              <a href="#about" className="hover:text-amber-400">Our Approach</a>
              <a href="#contact" className="hover:text-amber-400">Client Waiting List</a>
              <a href="#careers" className="hover:text-amber-400">Walker Opportunities</a>
              <a href="#privacy" className="hover:text-amber-400">Privacy</a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Get in touch</h3>
            <p className="mb-2 text-gray-300">Austin, Texas</p>
            <a href="mailto:hello@pawsfectwalks.com" className="break-all text-amber-300 hover:text-amber-200">
              hello@pawsfectwalks.com
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Pawsfect Walks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
