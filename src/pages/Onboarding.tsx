
import React from 'react';
import OnboardingForm from '@/components/auth/OnboardingForm';

const Onboarding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="text-center py-4">
        <h2 className="text-ivy text-2xl font-bold">
          Ivy<span className="text-white">TV</span>
        </h2>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
