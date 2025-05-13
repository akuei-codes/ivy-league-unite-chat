
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  school: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "IvyTV helped me connect with peers across different campuses. Made some incredible friends!",
    author: "Emma T.",
    school: "Harvard",
    rating: 5
  },
  {
    quote: "Great platform to discuss class topics with students from other universities.",
    author: "Michael R.",
    school: "Yale",
    rating: 5
  },
  {
    quote: "Found my study group for finals through IvyTV. Best decision ever!",
    author: "Sarah L.",
    school: "Princeton",
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <div className="relative overflow-hidden mb-6">
      <div 
        className="flex transition-transform duration-300 ease-in-out" 
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {testimonials.map((testimonial, idx) => (
          <div 
            key={idx} 
            className="w-full flex-shrink-0 px-1"
          >
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={cn(
                      "fill-current",
                      i < testimonial.rating ? "text-yellow-400" : "text-gray-400"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm italic text-white/90 mb-3">"{testimonial.quote}"</p>
              <div className="text-xs text-white/70">
                {testimonial.author}, <span className="font-medium">{testimonial.school}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {testimonials.length > 1 && (
        <div className="flex justify-between mt-3">
          <button 
            onClick={handlePrev} 
            className="text-xs text-white/70 hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            ← Prev
          </button>
          <div className="flex gap-1">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  activeIndex === idx ? "bg-white" : "bg-white/40"
                )}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          <button 
            onClick={handleNext} 
            className="text-xs text-white/70 hover:text-white transition-colors"
            aria-label="Next testimonial"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
