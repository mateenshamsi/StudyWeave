import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Personalized learning
            <br />
            that adapts to you
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            An AI-powered course that fits your language, pace, and learning style. Start learning anything, anytime, anywhere.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="bg-slate-900 text-white hover:bg-slate-800" size="lg">
              Get Learning
            </Button>
            <Button variant="outline" size="lg" className="border-slate-300 text-slate-900 hover:bg-slate-50">
              Create a Course
            </Button>
          </div>

          {/* Illustration */}
          <div className="mt-16 flex justify-center">
          
              <div className="flex h-full items-center justify-center">
                <Image
                  src="/images/hero-illustration.png"
                  alt="Learning illustration"
                  width={300}
                  height={300}
                  className="h-auto w-full max-w-xs"
                />
              </div>
          
            </div>
        
        </div>
      </div>
    </section>
  );
}
