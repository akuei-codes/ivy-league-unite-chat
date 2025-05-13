
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '@/lib/supabase';
import { toast } from 'sonner';

// This page serves as a router to direct users to the appropriate page
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking user:", error);
        toast.error("Failed to authenticate user");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-ivy border-t-transparent rounded-full animate-spin-slow mx-auto mb-4" />
          <p className="text-muted-foreground">Loading IvyTV...</p>
        </div>
      </div>
    );
  }

  // For development, we'll redirect to the home page for now
  // In production with Supabase integration, this would check the actual auth state
  // return user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
  
  // For now, let's redirect everyone to the login page for demonstration
  return <Navigate to="/login" replace />;
};

export default Index;
