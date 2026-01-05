import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { GraduationCap, ArrowRight, ArrowLeft, Globe, MapPin } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { PGPreference } from '@/types/user';
import { interestAreas } from '@/data/courses';
import { useToast } from '@/hooks/use-toast';

type Step = 'pg-question' | 'pg-location' | 'interest';

export default function CollegeFlow() {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const { toast } = useToast();
  
  const [step, setStep] = useState<Step>('pg-question');
  const [wantsPG, setWantsPG] = useState<string | null>(null);
  const [pgLocation, setPGLocation] = useState<PGPreference>(null);
  const [interest, setInterest] = useState('');

  const handlePGQuestionSubmit = () => {
    if (!wantsPG) {
      toast({
        title: "Make a choice",
        description: "Please indicate if you want to pursue PG",
        variant: "destructive",
      });
      return;
    }

    if (wantsPG === 'yes') {
      setStep('pg-location');
    } else {
      setStep('interest');
    }
  };

  const handlePGLocationSubmit = () => {
    if (!pgLocation) {
      toast({
        title: "Select location",
        description: "Please select your preferred PG location",
        variant: "destructive",
      });
      return;
    }
    setStep('interest');
  };

  const handleInterestSubmit = () => {
    if (!interest) {
      toast({
        title: "Select an interest",
        description: "Please select your area of interest",
        variant: "destructive",
      });
      return;
    }

    setUserData(prev => ({
      ...prev,
      wantsPG: wantsPG === 'yes',
      pgPreference: pgLocation,
      areaOfInterest: interest,
    }));
    navigate('/recommendations');
  };

  const goBack = () => {
    switch (step) {
      case 'pg-location':
        setStep('pg-question');
        break;
      case 'interest':
        if (wantsPG === 'yes') {
          setStep('pg-location');
        } else {
          setStep('pg-question');
        }
        break;
      default:
        navigate('/user-type');
    }
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
            <div className="flex-1 h-2 rounded-full bg-primary" />
            <div className="flex-1 h-2 rounded-full bg-primary/50" />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">Step 3 of 3 - College Flow</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-lg animate-slide-up">
          {/* PG Question */}
          {step === 'pg-question' && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Postgraduate Plans</CardTitle>
                <CardDescription>Are you planning to pursue a PG degree?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={wantsPG || ''} onValueChange={setWantsPG}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="yes" id="yesPG" />
                    <Label htmlFor="yesPG" className="flex-1 cursor-pointer">
                      <div className="font-medium">Yes, I want to do PG</div>
                      <div className="text-sm text-muted-foreground">Explore masters and doctoral programs</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="no" id="noPG" />
                    <Label htmlFor="noPG" className="flex-1 cursor-pointer">
                      <div className="font-medium">Not right now</div>
                      <div className="text-sm text-muted-foreground">Focus on career opportunities</div>
                    </Label>
                  </div>
                </RadioGroup>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => navigate('/user-type')} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button variant="hero" onClick={handlePGQuestionSubmit} disabled={!wantsPG} className="flex-1">
                    Continue <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PG Location */}
          {step === 'pg-location' && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Where do you want to study?</CardTitle>
                <CardDescription>Choose your preferred location for PG studies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button
                    variant={pgLocation === 'india' ? 'default' : 'outline'}
                    size="lg"
                    className="w-full justify-start text-left h-16"
                    onClick={() => setPGLocation('india')}
                  >
                    <MapPin className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-semibold">Within India</div>
                      <div className="text-xs opacity-70">IIMs, IITs, Top Indian Universities</div>
                    </div>
                  </Button>
                  <Button
                    variant={pgLocation === 'abroad' ? 'default' : 'outline'}
                    size="lg"
                    className="w-full justify-start text-left h-16"
                    onClick={() => setPGLocation('abroad')}
                  >
                    <Globe className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-semibold">Abroad</div>
                      <div className="text-xs opacity-70">USA, UK, Europe, Australia</div>
                    </div>
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={goBack} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button variant="hero" onClick={handlePGLocationSubmit} disabled={!pgLocation} className="flex-1">
                    Continue <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interest Selection */}
          {step === 'interest' && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Area of Interest</CardTitle>
                <CardDescription>What field interests you the most?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={interest} onValueChange={setInterest}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {interestAreas.map((area) => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={goBack} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button variant="hero" onClick={handleInterestSubmit} disabled={!interest} className="flex-1">
                    Get Recommendations <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
