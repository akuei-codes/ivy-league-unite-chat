
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SchoolNameProps {
  name: string;
  initialPosition: {
    x: number;
    y: number;
  };
  size: 'sm' | 'md' | 'lg';
  opacity: number;
  delay: number;
}

const ivyLeagueSchools = [
  'Harvard',
  'Yale',
  'Princeton',
  'Columbia',
  'Brown',
  'Dartmouth',
  'Cornell',
  'UPenn',
];

const FloatingName: React.FC<SchoolNameProps> = ({ 
  name, 
  initialPosition, 
  size, 
  opacity, 
  delay 
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay appearance for staggered effect
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Set up animation interval
    const driftInterval = setInterval(() => {
      setPosition({
        x: initialPosition.x + (Math.random() * 10 - 5),
        y: initialPosition.y + (Math.random() * 10 - 5)
      });
    }, 5000 + Math.random() * 2000); // Random drift timing for natural movement

    return () => {
      clearTimeout(showTimer);
      clearInterval(driftInterval);
    };
  }, [delay, initialPosition]);

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  return (
    <div 
      className={cn(
        "absolute font-serif transition-all duration-[7000ms] ease-in-out text-gray-300",
        sizeClasses[size],
        isVisible ? 'opacity-[var(--opacity)]' : 'opacity-0'
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `rotate(${Math.random() * 6 - 3}deg)`,
        '--opacity': opacity.toString(),
        filter: 'blur(1px)',
        fontWeight: Math.random() > 0.5 ? 300 : 400
      } as React.CSSProperties}
    >
      {name}
    </div>
  );
};

const FloatingSchoolNames: React.FC = () => {
  // Generate random positions for each school name
  const schoolElements = ivyLeagueSchools.flatMap((school) => {
    // Create multiple instances of each school name with different sizes and positions
    return Array.from({ length: 3 }).map((_, idx) => {
      const size = ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg';
      const opacity = 0.1 + Math.random() * 0.15; // Low opacity between 0.1 and 0.25
      const delay = idx * 400 + Math.random() * 1000; // Staggered delay for natural appearance
      
      return (
        <FloatingName 
          key={`${school}-${idx}`} 
          name={school} 
          initialPosition={{
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          size={size}
          opacity={opacity}
          delay={delay}
        />
      );
    });
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {schoolElements}
    </div>
  );
};

export default FloatingSchoolNames;
