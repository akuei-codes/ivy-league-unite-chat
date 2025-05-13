
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from '@/lib/supabase';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const IvyLeagueLogos = [
  { name: 'Harvard', src: '/harvard-logo.png' },
  { name: 'Yale', src: '/yale-logo.png' },
  { name: 'Princeton', src: '/princeton-logo.png' },
  { name: 'Columbia', src: '/columbia-logo.png' },
  { name: 'Brown', src: '/brown-logo.png' },
  { name: 'Dartmouth', src: '/dartmouth-logo.png' },
  { name: 'Cornell', src: '/cornell-logo.png' },
  { name: 'UPenn', src: '/upenn-logo.png' },
];

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await signInWithGoogle();
      if (error) {
        toast.error("Sign in failed", {
          description: error.message
        });
      } else if (data) {
        toast.success("Signed in successfully!");
        navigate('/onboarding');
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md animate-fade-in">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Welcome to IvyTV</h1>
        <p className="text-muted-foreground">
          Connect with students across Ivy League universities
        </p>
      </div>

      <div className="ivy-card p-6 space-y-4">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {IvyLeagueLogos.map((logo) => (
            <div key={logo.name} className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
              <img src={logo.src} alt={`${logo.name} logo`} className="w-8 h-8 object-contain" />
            </div>
          ))}
        </div>

        <Button 
          className="w-full btn-ivy flex items-center justify-center gap-2" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>Sign in with Ivy League Email</span>
            </>
          )}
        </Button>
        
        <div className="text-xs text-center text-muted-foreground mt-4">
          Only students with verified Ivy League email addresses can join.
        </div>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        By continuing, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginForm;
