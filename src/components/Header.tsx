"use client";

import Link from 'next/link';
import { HoverBorderGradient } from './ui/hover-gradient';
import { ThemeSwitcher } from './mode-toggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between max-w-full mx-auto px-10 py-6">
      <h1 className="text-2xl font-semibold ">SitePulse</h1>
      <nav className="flex flex-1 justify-between items-center">
        <div className="flex space-x-4 ml-10">
          <Link href="#features" className="hover:text-muted-foreground text-lg">Features</Link>
          <Link href="#testimonials" className="hover:text-muted-foreground text-lg">Testimonials</Link>
          <Link href="#cta" className="hover:text-muted-foreground text-lg">Pricing</Link>
        </div>
        
        <div className="flex items-center justify-center space-x-4 ml-auto">
          <ThemeSwitcher />
          <Link href="/api/auth/signin" className="rounded-full px-4 py-2 text-lg hover:bg-muted">Log In</Link>
          <Link href="/api/auth/signup">
            <HoverBorderGradient className="text-lg text-white px-4 py-2">Sign Up</HoverBorderGradient>
          </Link>
        </div>
      </nav>
    </header>
  );
}
