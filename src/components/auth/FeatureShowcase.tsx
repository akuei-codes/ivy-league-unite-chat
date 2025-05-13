
import React, { useState, useEffect } from 'react';
import { GraduationCap, University, Book, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <University className="size-5" />,
    title: "Ivy League Network",
    description: "Connect with students from all eight prestigious universities"
  },
  {
    icon: <GraduationCap className="size-5" />,
    title: "Academic Collaboration",
    description: "Find study partners and discuss coursework across institutions"
  },
  {
    icon: <Book className="size-5" />,
    title: "Knowledge Sharing",
    description: "Exchange ideas and broaden your intellectual horizons"
  }
];

const FeatureShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="mt-10 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white/90">Why Join IvyTV?</h2>
      
      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            className={cn(
              "transition-all duration-500 absolute inset-0 flex flex-col p-6 rounded-xl",
              activeIndex === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ display: activeIndex === idx ? 'flex' : 'none' }}
          >
            <div className="mb-3 bg-ivy/30 backdrop-blur-sm p-2 w-fit rounded-md">
              {feature.icon}
            </div>
            <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
            <p className="text-sm text-white/80 mb-3">{feature.description}</p>
            <div className="mt-auto">
              <button className="flex items-center text-sm font-medium text-ivy-light hover:text-white gap-1 transition-colors">
                Learn more <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        ))}
        
        <div className="h-[120px]"></div>

        <div className="flex gap-1.5 mt-2 justify-center">
          {features.map((_, idx) => (
            <button 
              key={idx} 
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                activeIndex === idx ? "bg-white w-4" : "bg-white/40"
              )}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View feature ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
