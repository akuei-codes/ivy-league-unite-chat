
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import LeafBackground from '@/components/animations/LeafBackground';
import FeatureShowcase from '@/components/auth/FeatureShowcase';
import Testimonials from '@/components/auth/Testimonials';
import { Sparkle, University } from 'lucide-react';
import FloatingSchoolNames from '@/components/animations/FloatingSchoolNames';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Hero Section */}
        <div className="bg-ivy lg:w-1/2 p-8 flex flex-col justify-center relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-ivy to-ivy-dark opacity-90" />
          <div className="absolute inset-0 bg-[url('/ivy-pattern.png')] opacity-10" />
          <LeafBackground leafCount={20} />
          
          <div className="relative z-10 max-w-md mx-auto lg:mx-0 lg:ml-auto text-white">
            {/* Logo/branding section */}
            <div className="flex items-center mb-8 animate-fade-in">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl mr-3">
                <University size={24} className="text-ivy-light" />
              </div>
              <div>
                <h2 className="font-bold text-2xl">IvyTV</h2>
                <p className="text-xs text-white/70">Ivy League Video Network</p>
              </div>
            </div>

            {/* Main heading */}
            <div className="relative">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
                Connect Across
                <div className="relative inline-flex mx-2">
                  <span className="relative z-10">Campuses</span>
                  <Sparkle className="text-ivy-light absolute -top-2 -right-3 z-0" size={16} />
                </div>
              </h1>
              <p className="text-lg opacity-90 mb-8 animate-fade-in [animation-delay:200ms]">
                IvyTV brings together students from all Ivy League universities 
                for meaningful video conversations.
              </p>
            </div>
            
            {/* Features */}
            <div className="flex flex-col space-y-4 animate-fade-in [animation-delay:400ms]">
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-4">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Exclusive Community</h3>
                  <p className="text-sm opacity-80">Only verified Ivy League students can join</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-4">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Random Matching</h3>
                  <p className="text-sm opacity-80">Connect with students across all eight campuses</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-4">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Face to Face</h3>
                  <p className="text-sm opacity-80">High quality video chats for real connections</p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <Testimonials />
            
            {/* Feature Showcase */}
            <FeatureShowcase />
          </div>
        </div>
        
        {/* Form Section */}
        <div className="lg:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-gray-100/80 to-gray-200/90 backdrop-blur-md relative">
          <div className="absolute inset-0 bg-[url('/ivy-pattern.png')] opacity-5 z-0" />
          <FloatingSchoolNames />
          <div className="relative z-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
