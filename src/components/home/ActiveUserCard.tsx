
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ActiveUserCardProps {
  user: {
    id: string;
    displayName: string;
    avatarUrl?: string;
    school: string;
    studyField: string;
    interests: string[];
    online: boolean;
  };
  onClick?: () => void;
}

const ActiveUserCard: React.FC<ActiveUserCardProps> = ({ user, onClick }) => {
  const schoolDisplayNames: Record<string, string> = {
    'harvard': 'Harvard',
    'yale': 'Yale',
    'princeton': 'Princeton',
    'columbia': 'Columbia',
    'brown': 'Brown',
    'dartmouth': 'Dartmouth',
    'cornell': 'Cornell',
    'upenn': 'UPenn',
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card 
      className="ivy-card overflow-hidden hover:shadow-2xl cursor-pointer transform transition-all duration-300 hover:translate-y-[-5px]"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border border-ivy/30">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.displayName} />
              ) : (
                <AvatarFallback className="bg-ivy/30 text-foreground">
                  {getInitials(user.displayName)}
                </AvatarFallback>
              )}
            </Avatar>
            {user.online && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
            )}
          </div>
          <div>
            <h3 className="font-medium text-base">{user.displayName}</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{schoolDisplayNames[user.school] || user.school}</span>
              <span className="mx-1">•</span>
              <span>{user.studyField}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {user.interests.slice(0, 3).map(interest => (
            <Badge key={interest} variant="secondary" className="text-xs bg-secondary/60">
              {interest}
            </Badge>
          ))}
          {user.interests.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-secondary/60">
              +{user.interests.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ActiveUserCard;
