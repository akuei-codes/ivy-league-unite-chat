
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
        console.log("Current user:", currentUser);
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

  // Now we can properly direct based on auth state
  return user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

export default Index;
