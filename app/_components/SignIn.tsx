import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2">StudyWeave</h1>
            <p className="text-xl text-blue-100">Adaptive Learning for Every Child</p>
          </div>

          {/* Illustration */}
          <div className="relative w-full max-w-md aspect-square mb-8">
            <Image
              src="/signin-illustration.svg" // You'll need to add this
              alt="Children learning with AI"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
            {/* Fallback if no image yet */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">📚</div>
                <div className="text-6xl mb-4">🧠</div>
                <div className="text-8xl">✨</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold">Personalized Learning</h3>
                <p className="text-sm text-blue-100">Adapts to your child's pace and style</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🎙️</span>
              </div>
              <div>
                <h3 className="font-semibold">AI Voice Tutor</h3>
                <p className="text-sm text-blue-100">Get help anytime with voice guidance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-sm text-blue-100">See how your child is improving</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Sign In */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">StudyWeave</h1>
            <p className="text-gray-600">Adaptive Learning for Every Child</p>
          </div>

          {/* Sign In Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Sign in to continue your learning journey</p>
            </div>

            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700",
                  formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
                  footerActionLink: "text-blue-600 hover:text-blue-700"
                }
              }}
              redirectUrl="/dashboard"
              signUpUrl="/sign-up"
            />
          </div>

          {/* Additional Info */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/sign-up" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInPage