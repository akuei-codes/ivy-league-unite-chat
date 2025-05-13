
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Hero Section */}
        <div className="bg-ivy lg:w-1/2 p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ivy to-ivy-dark opacity-90" />
          <div className="absolute inset-0 bg-[url('/ivy-pattern.png')] opacity-10" />
          
          <div className="relative z-10 max-w-md mx-auto lg:mx-0 lg:ml-auto text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Connect Across Campuses
            </h1>
            <p className="text-lg opacity-90 mb-6">
              IvyTV brings together students from all Ivy League universities for meaningful video conversations.
            </p>
            <div className="flex flex-col space-y-4">
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
          </div>
        </div>
        
        {/* Form Section */}
        <div className="lg:w-1/2 p-8 flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
