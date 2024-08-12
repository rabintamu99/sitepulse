"use client";

import Link from 'next/link';
import { HoverBorderGradient } from './ui/hover-gradient';

export default function Header() {
  return (
    <header className="flex items-center justify-between max-w-full mx-auto px-10 py-6">
      <h1 className="text-2xl font-semibold ">SitePulse</h1>
      <nav className="flex flex-1 justify-between items-center">
        <div className="flex space-x-4 ml-10">
          <Link href="#features" className="hover:underline">Features</Link>
          <Link href="#testimonials" className="hover:underline">Testimonials</Link>
          <Link href="#cta" className="hover:underline">Pricing</Link>
        </div>
        
        <div className="flex space-x-4">
          <Link href="/api/auth/signin" className="rounded-full px-2 py-1 mt-1">Signin</Link>
          <Link href="/api/auth/signup">
            <HoverBorderGradient className="text-sm text-white">Sign Up</HoverBorderGradient>
          </Link>
        </div>
      </nav>
    </header>
  );
}
