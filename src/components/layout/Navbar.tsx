
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from '@/lib/supabase';
import { toast } from 'sonner';
import { User, Settings, LogOut } from 'lucide-react';

interface NavbarProps {
  user?: {
    displayName: string;
    avatarUrl?: string;
    initials: string;
  } | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        throw error;
      }
      toast.success("Signed out successfully");
      navigate('/login');
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="w-full py-4 px-6 border-b border-border/40 backdrop-blur-lg bg-background/80 sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="text-ivy text-2xl font-bold">
            Ivy<span className="text-white">TV</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/chat" className="btn-ivy">
                Start Chatting
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                    <Avatar>
                      {user.avatarUrl ? (
                        <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                      ) : (
                        <AvatarFallback className="bg-ivy text-primary-foreground">
                          {user.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-normal">
                      <div className="font-medium">{user.displayName}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button className="btn-ivy" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
