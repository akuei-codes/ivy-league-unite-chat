
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallback values for development
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tsucvxjsdapxjvvrsivw.supabase.co';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzdWN2eGpzZGFweGp2dnJzaXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMjEwNjEsImV4cCI6MjA2MjY5NzA2MX0.N-F6qQf_Mf7lbYizFt2CplLcsvGChQiIbkAd7LXjDfI';

// Verify we have the required values before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anonymous Key!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const isIvyLeagueEmail = (email: string) => {
  const ivyLeagueDomains = [
    'brown.edu',
    'columbia.edu',
    'cornell.edu',
    'dartmouth.edu',
    'harvard.edu',
    'upenn.edu',
    'princeton.edu',
    'yale.edu'
  ];
  
  return ivyLeagueDomains.some(domain => email.endsWith(`@${domain}`));
};
