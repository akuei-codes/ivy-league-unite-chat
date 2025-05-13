
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import VideoChat from '@/components/chat/VideoChat';

// Mock user
const mockUser = {
  displayName: 'Jamie Smith',
  avatarUrl: '/avatar.jpg',
  initials: 'JS',
};

const Chat = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar user={mockUser} />
      <VideoChat />
    </div>
  );
};

export default Chat;
