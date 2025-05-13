
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadImage } from '@/lib/cloudinary';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Camera } from 'lucide-react';

const schools = [
  { id: 'harvard', name: 'Harvard University' },
  { id: 'yale', name: 'Yale University' },
  { id: 'princeton', name: 'Princeton University' },
  { id: 'columbia', name: 'Columbia University' },
  { id: 'brown', name: 'Brown University' },
  { id: 'dartmouth', name: 'Dartmouth College' },
  { id: 'cornell', name: 'Cornell University' },
  { id: 'upenn', name: 'University of Pennsylvania' },
];

const interests = [
  'Academic', 'Arts', 'Athletics', 'Business', 'Engineering', 
  'Humanities', 'Law', 'Medicine', 'Music', 'Politics', 
  'Science', 'Social Impact', 'Technology'
];

const OnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [formData, setFormData] = useState({
    displayName: '',
    school: '',
    yearOfGraduation: new Date().getFullYear(),
    studyField: '',
    bio: '',
    selectedInterests: [] as string[]
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        setIsLoading(true);
        const { url } = await uploadImage(file);
        setAvatarUrl(url);
        toast.success("Profile picture uploaded!");
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Failed to upload image");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedInterests.includes(interest);
      if (isSelected) {
        return {
          ...prev,
          selectedInterests: prev.selectedInterests.filter(i => i !== interest)
        };
      } else if (prev.selectedInterests.length < 5) {
        return {
          ...prev,
          selectedInterests: [...prev.selectedInterests, interest]
        };
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        toast.error("User not authenticated");
        navigate('/login');
        return;
      }

      const { error } = await supabase.from('profiles').insert({
        id: userData.user.id,
        display_name: formData.displayName,
        avatar_url: avatarUrl,
        school: formData.school,
        graduation_year: formData.yearOfGraduation,
        study_field: formData.studyField,
        bio: formData.bio,
        interests: formData.selectedInterests
      });

      if (error) {
        throw error;
      }

      toast.success("Profile created successfully!");
      navigate('/home');
    } catch (error: any) {
      console.error("Error creating profile:", error);
      toast.error(error.message || "Failed to create profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>
        <p className="text-muted-foreground">Tell us about yourself to get started</p>
      </div>
      
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <Avatar className="h-24 w-24 border-2 border-ivy">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-secondary text-foreground text-xl">
                <Camera size={24} />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <span className="text-xs font-medium">Upload Photo</span>
          </div>
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <p className="text-xs text-muted-foreground">Click to upload profile picture</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Display Name</label>
          <Input
            id="name"
            className="input-ivy w-full"
            value={formData.displayName}
            onChange={e => setFormData({...formData, displayName: e.target.value})}
            required
          />
        </div>

        <div>
          <label htmlFor="school" className="block text-sm font-medium mb-1">School</label>
          <Select 
            value={formData.school} 
            onValueChange={value => setFormData({...formData, school: value})}
            required
          >
            <SelectTrigger className="input-ivy w-full">
              <SelectValue placeholder="Select your university" />
            </SelectTrigger>
            <SelectContent>
              {schools.map(school => (
                <SelectItem key={school.id} value={school.id}>{school.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium mb-1">Graduation Year</label>
            <Input
              id="year"
              type="number"
              min={new Date().getFullYear()}
              max={new Date().getFullYear() + 6}
              className="input-ivy w-full"
              value={formData.yearOfGraduation}
              onChange={e => setFormData({...formData, yearOfGraduation: parseInt(e.target.value)})}
              required
            />
          </div>
          <div>
            <label htmlFor="field" className="block text-sm font-medium mb-1">Field of Study</label>
            <Input
              id="field"
              className="input-ivy w-full"
              value={formData.studyField}
              onChange={e => setFormData({...formData, studyField: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">Short Bio</label>
          <Input
            id="bio"
            className="input-ivy w-full"
            value={formData.bio}
            onChange={e => setFormData({...formData, bio: e.target.value})}
            placeholder="Tell us a bit about yourself"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Interests (Max 5)</label>
          <div className="flex flex-wrap gap-2">
            {interests.map(interest => (
              <button
                key={interest}
                type="button"
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  formData.selectedInterests.includes(interest)
                    ? 'bg-ivy text-white'
                    : 'bg-secondary/50 hover:bg-secondary'
                }`}
                onClick={() => handleInterestToggle(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Selected: {formData.selectedInterests.length}/5
          </p>
        </div>
      </div>

      <Button 
        type="submit" 
        className="btn-ivy w-full"
        disabled={isLoading || !formData.displayName || !formData.school}
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            <span>Saving Profile...</span>
          </>
        ) : "Complete Setup"}
      </Button>
    </form>
  );
};

export default OnboardingForm;
