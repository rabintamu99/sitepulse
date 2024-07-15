"use client";

import Link from 'next/link';
import { HoverBorderGradient } from './ui/hover-gradient';

export default function Header() {
  return (
    <header className="flex items-center justify-between max-w-full mx-auto px-10 py-6 z-100 bg-[#0a0a0a]">
      <h1 className="text-2xl font-semibold text-white">SitePulse</h1>
      <nav className="flex flex-1 justify-between items-center">
        <div className="flex space-x-4 ml-10">
          <Link href="#features" className="text-white hover:text-gray-900 hover:underline">Features</Link>
          <Link href="#testimonials" className="text-white hover:text-gray-900 hover:underline">Testimonials</Link>
          <Link href="#cta" className="text-white hover:text-gray-900 hover:underline">Pricing</Link>
        </div>
        <div className="flex space-x-4">
          <button className="text-white hover:text-gray-9000 hover:bg-slate-200">Signin</button>
          <HoverBorderGradient className="text-sm text-white" >Sign Up</HoverBorderGradient>
        </div>
      </nav>
    </header>
  );
}