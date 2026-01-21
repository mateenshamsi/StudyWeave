import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
           <Image src="/images/logo.png" alt="StudyWeave Logo" width={63} height={64} />
                </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              How It Works
            </Link>
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Pricing
            </Link>
            <Link href="#sign-in" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Sign In
            </Link>
          </nav>

          {/* CTA Button */}
          <Button className="bg-slate-900 text-white hover:bg-slate-800">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
