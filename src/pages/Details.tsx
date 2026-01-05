import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, User, Mail, ArrowRight } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

export default function Details() {
  const navigate = useNavigate();
  const { userData, setUserData } = useUser();
  const { toast } = useToast();
  const [name, setName] = useState(userData.name || localStorage.getItem('userName') || '');
  const [email, setEmail] = useState(userData.email || localStorage.getItem('userEmail') || '');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setUserData(prev => ({ ...prev, name, email }));
    navigate('/user-type');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-hero py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary-foreground" />
          <h1 className="text-xl font-bold text-primary-foreground">CourseCompass</h1>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-card border-b border-border py-4 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-primary" />
            <div className="flex-1 h-2 rounded-full bg-muted" />
            <div className="flex-1 h-2 rounded-full bg-muted" />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">Step 1 of 3</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md animate-slide-up">
          <Card className="shadow-card border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">Your Details</CardTitle>
              <CardDescription className="text-muted-foreground">
                Tell us a bit about yourself
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12 bg-secondary/50 border-border"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-secondary/50 border-border"
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full mt-6">
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
