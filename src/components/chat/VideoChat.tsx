
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mic, MicOff, Video, VideoOff, Phone, MessageCircle, Users } from 'lucide-react';

const VideoChat: React.FC = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [messages, setMessages] = useState<{text: string; isMine: boolean}[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Simulated peer for demo purposes
  const peerName = "Alex Johnson";
  const peerSchool = "Harvard University";

  useEffect(() => {
    // Simulate connection after delay
    const setupLocalVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Simulate calling and connection
        setTimeout(() => {
          setIsCalling(true);
          
          setTimeout(() => {
            setIsCalling(false);
            setIsConnected(true);
            toast.success("Connected with Alex from Harvard!");
            
            // Simulate remote video
            if (remoteVideoRef.current) {
              // In a real app, this would be the actual remote stream
              remoteVideoRef.current.srcObject = stream;
            }
          }, 3000);
        }, 1500);
      } catch (error) {
        console.error("Error accessing media devices:", error);
        toast.error("Failed to access camera and microphone");
      }
    };

    setupLocalVideo();

    // Cleanup
    return () => {
      const stream = localVideoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const toggleAudio = () => setIsAudioEnabled(!isAudioEnabled);
  const toggleVideo = () => setIsVideoEnabled(!isVideoEnabled);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const endCall = () => {
    const stream = localVideoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsConnected(false);
    toast.info("Call ended");
    // Navigate back or reset state
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, isMine: true }]);
      setNewMessage('');
      
      // Simulate response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "That's interesting! What else do you study?", 
          isMine: false 
        }]);
      }, 1500);
    }
  };

  return (
    <div className="relative h-[calc(100vh-72px)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-ivy/20" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Status indicator */}
        {isCalling && (
          <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
            <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 animate-pulse-slow">
              <div className="h-2 w-2 bg-ivy rounded-full animate-pulse" />
              <span>Connecting to peer...</span>
            </div>
          </div>
        )}
        
        {/* Main video container */}
        <div className="flex-1 relative">
          {/* Remote video (large) */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            muted={!isConnected}
            className={`object-cover w-full h-full ${!isConnected && 'hidden'}`}
          />
          
          {!isConnected && !isCalling && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-md p-6">
                <div className="text-4xl mb-4">👋</div>
                <h2 className="text-2xl font-bold mb-2">Welcome to IvyTV</h2>
                <p className="text-muted-foreground mb-6">
                  Ready to connect with other Ivy League students?
                  Click the button below to start matching.
                </p>
                <Button 
                  className="btn-ivy"
                  onClick={() => setIsCalling(true)}
                >
                  <Users size={16} className="mr-2" />
                  Find Match
                </Button>
              </div>
            </div>
          )}
          
          {isCalling && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center glass-panel p-8 rounded-xl">
                <div className="mb-4">
                  <div className="h-16 w-16 border-4 border-ivy border-t-transparent rounded-full animate-spin-slow mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-1">Finding a match...</h3>
                <p className="text-muted-foreground mb-4">
                  Looking for other online Ivy League students
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="btn-outline"
                  onClick={() => setIsCalling(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {/* Peer info when connected */}
          {isConnected && (
            <div className="absolute top-4 left-4 glass-panel px-3 py-2 rounded-lg flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="text-sm font-medium">{peerName}</span>
              <span className="text-xs text-muted-foreground">{peerSchool}</span>
            </div>
          )}
          
          {/* Local video (small) */}
          <div className="absolute bottom-20 right-4 w-32 h-48 md:w-48 md:h-64 rounded-lg overflow-hidden border border-border/50 shadow-lg">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className={`object-cover w-full h-full ${!isVideoEnabled && 'hidden'}`}
            />
            {!isVideoEnabled && (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <VideoOff size={24} className="text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
        
        {/* Controls */}
        {isConnected && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 z-20">
            <div className="glass-panel p-3 rounded-full flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${!isAudioEnabled ? 'bg-destructive/20 hover:bg-destructive/30' : 'hover:bg-white/10'}`}
                onClick={toggleAudio}
              >
                {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${!isVideoEnabled ? 'bg-destructive/20 hover:bg-destructive/30' : 'hover:bg-white/10'}`}
                onClick={toggleVideo}
              >
                {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-destructive hover:bg-destructive/80"
                onClick={endCall}
              >
                <Phone size={20} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${isChatOpen ? 'bg-ivy/20 hover:bg-ivy/30' : 'hover:bg-white/10'}`}
                onClick={toggleChat}
              >
                <MessageCircle size={20} />
              </Button>
            </div>
          </div>
        )}
        
        {/* Chat panel */}
        {isConnected && isChatOpen && (
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-72 md:w-80 glass-panel flex flex-col animate-fade-in z-30">
            <div className="p-3 border-b border-border/30 flex items-center">
              <h3 className="font-medium">Chat with {peerName}</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto" 
                onClick={toggleChat}
              >
                ✕
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground text-sm text-center">
                    No messages yet. Start the conversation!
                  </p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] p-2 px-3 rounded-lg ${
                      msg.isMine
                        ? 'bg-ivy/80 ml-auto rounded-br-none'
                        : 'bg-secondary/80 mr-auto rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                ))
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border/30 flex gap-2">
              <input
                type="text"
                className="input-ivy w-full text-sm"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" size="sm" className="btn-ivy">
                Send
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChat;
