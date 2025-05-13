
import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';
import { getRandomPosition } from '@/lib/animations';

interface LeafProps {
  color: string;
  size: number;
  delay: number;
}

const AnimatedLeaf: React.FC<LeafProps> = ({ color, size, delay }) => {
  const [position, setPosition] = useState(() => getRandomPosition());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the appearance for a staggered effect
    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Set up animation interval
    const interval = setInterval(() => {
      setPosition(getRandomPosition());
    }, 15000); // Change position every 15 seconds

    return () => {
      clearTimeout(showTimeout);
      clearInterval(interval);
    };
  }, [delay]);

  return (
    <div 
      className={`absolute transition-all duration-[15000ms] ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `rotate(${position.rotation}deg) scale(${position.scale})`,
      }}
    >
      <Leaf 
        size={size} 
        color={color} 
        className="drop-shadow-md"
      />
    </div>
  );
};

interface LeafBackgroundProps {
  leafCount?: number;
}

const LeafBackground: React.FC<LeafBackgroundProps> = ({ leafCount = 15 }) => {
  const leaves = Array.from({ length: leafCount }).map((_, i) => {
    const size = 20 + Math.random() * 30;
    const color = i % 2 === 0 ? '#2F4F4F' : '#3E6363';
    const delay = i * 200; // Stagger the appearance
    
    return (
      <AnimatedLeaf 
        key={i} 
        color={color} 
        size={size} 
        delay={delay}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves}
    </div>
  );
};

export default LeafBackground;
