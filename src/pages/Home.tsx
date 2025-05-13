
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import ActiveUserCard from '@/components/home/ActiveUserCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock active users
const mockUsers = [
  {
    id: '1',
    displayName: 'Alex Johnson',
    avatarUrl: '/profile1.jpg',
    school: 'harvard',
    studyField: 'Computer Science',
    interests: ['Technology', 'Academic', 'Business'],
    online: true,
  },
  {
    id: '2',
    displayName: 'Emma Wilson',
    avatarUrl: '/profile2.jpg',
    school: 'yale',
    studyField: 'Medicine',
    interests: ['Science', 'Medicine', 'Social Impact'],
    online: true,
  },
  {
    id: '3',
    displayName: 'Michael Chen',
    avatarUrl: '/profile3.jpg',
    school: 'princeton',
    studyField: 'Economics',
    interests: ['Business', 'Politics', 'Social Impact'],
    online: true,
  },
  {
    id: '4',
    displayName: 'Sofia Rodriguez',
    avatarUrl: '/profile4.jpg',
    school: 'cornell',
    studyField: 'Engineering',
    interests: ['Engineering', 'Technology', 'Science'],
    online: true,
  },
  {
    id: '5',
    displayName: 'James Thompson',
    avatarUrl: '/profile5.jpg',
    school: 'columbia',
    studyField: 'Law',
    interests: ['Law', 'Politics', 'Humanities'],
    online: true,
  },
  {
    id: '6',
    displayName: 'Olivia Parker',
    avatarUrl: '/profile6.jpg',
    school: 'brown',
    studyField: 'Arts',
    interests: ['Arts', 'Humanities', 'Music'],
    online: true,
  },
];

// Mock filters
const mockSchools = [
  { id: 'all', name: 'All Schools' },
  { id: 'harvard', name: 'Harvard' },
  { id: 'yale', name: 'Yale' },
  { id: 'princeton', name: 'Princeton' },
  { id: 'columbia', name: 'Columbia' },
  { id: 'brown', name: 'Brown' },
  { id: 'dartmouth', name: 'Dartmouth' },
  { id: 'cornell', name: 'Cornell' },
  { id: 'upenn', name: 'UPenn' },
];

const mockInterests = [
  'Academic', 'Arts', 'Athletics', 'Business', 'Engineering',
  'Humanities', 'Law', 'Medicine', 'Music', 'Politics',
  'Science', 'Social Impact', 'Technology'
];

const mockUser = {
  displayName: 'Jamie Smith',
  avatarUrl: '/avatar.jpg',
  initials: 'JS',
};

const Home = () => {
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState(mockUsers);
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isRandomMatchOpen, setIsRandomMatchOpen] = useState(false);
  
  const handleStartRandomChat = () => {
    navigate('/chat');
  };
  
  const handleFilterBySchool = (schoolId: string) => {
    setSelectedSchool(schoolId);
    if (schoolId === 'all') {
      setActiveUsers(mockUsers);
    } else {
      setActiveUsers(mockUsers.filter(user => user.school === schoolId));
    }
  };
  
  const handleToggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };
  
  useEffect(() => {
    // Apply filters
    let filteredUsers = mockUsers;
    
    if (selectedSchool !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.school === selectedSchool);
    }
    
    if (selectedInterests.length > 0) {
      filteredUsers = filteredUsers.filter(user => 
        selectedInterests.some(interest => user.interests.includes(interest))
      );
    }
    
    setActiveUsers(filteredUsers);
  }, [selectedSchool, selectedInterests]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 text-foreground">
      <Navbar user={mockUser} />
      
      <main className="container max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {mockUser.displayName}</h1>
            <p className="text-muted-foreground">Connect with other Ivy League students</p>
          </div>
          
          <Button
            className="btn-ivy w-full md:w-auto"
            onClick={() => navigate('/chat')}
          >
            Start Random Chat
          </Button>
        </div>
        
        {/* Filters */}
        <div className="ivy-card p-4 mb-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Filter by School</h3>
              <div className="flex flex-wrap gap-2">
                {mockSchools.map(school => (
                  <button
                    key={school.id}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      selectedSchool === school.id
                        ? 'bg-ivy text-white'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => handleFilterBySchool(school.id)}
                  >
                    {school.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Active Now</h3>
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm">{activeUsers.length} users online</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Filter by Interests</h3>
            <div className="flex flex-wrap gap-2">
              {mockInterests.map(interest => (
                <button
                  key={interest}
                  className={`px-3 py-1 text-xs rounded-full transition-all ${
                    selectedInterests.includes(interest)
                      ? 'bg-ivy text-white'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  onClick={() => handleToggleInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Active users grid */}
        {activeUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeUsers.map(user => (
              <ActiveUserCard
                key={user.id}
                user={user}
                onClick={() => navigate('/chat')}
              />
            ))}
          </div>
        ) : (
          <div className="ivy-card p-8 text-center">
            <h3 className="text-xl font-medium mb-2">No active users found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or check back later.
            </p>
            <Button variant="outline" onClick={() => {
              setSelectedSchool('all');
              setSelectedInterests([]);
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
