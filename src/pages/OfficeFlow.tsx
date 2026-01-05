import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { GraduationCap, ArrowRight, ArrowLeft, TrendingUp, Award } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { OfficeGoal } from '@/types/user';
import { interestAreas } from '@/data/courses';
import { useToast } from '@/hooks/use-toast';

type Step = 'goal' | 'interest';

export default function OfficeFlow() {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const { toast } = useToast();
  
  const [step, setStep] = useState<Step>('goal');
  const [goal, setGoal] = useState<OfficeGoal>(null);
  const [interest, setInterest] = useState('');

  const handleGoalSelect = (selectedGoal: OfficeGoal) => {
    setGoal(selectedGoal);
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
      officeGoal: goal,
      areaOfInterest: interest,
    }));
    navigate('/recommendations');
  };

  const goBack = () => {
    if (step === 'interest') {
      setStep('goal');
    } else {
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
          <p className="text-sm text-muted-foreground text-center mt-2">Step 3 of 3 - Professional Flow</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-lg animate-slide-up">
          {/* Goal Selection */}
          {step === 'goal' && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">What's your goal?</CardTitle>
                <CardDescription>Choose what you want to achieve</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button
                    variant={goal === 'skill' ? 'default' : 'outline'}
                    size="lg"
                    className="w-full justify-start text-left h-20"
                    onClick={() => handleGoalSelect('skill')}
                  >
                    <TrendingUp className="h-6 w-6 mr-4" />
                    <div>
                      <div className="font-semibold">Skill Development</div>
                      <div className="text-xs opacity-70">Learn new skills to advance your career</div>
                    </div>
                  </Button>
                  <Button
                    variant={goal === 'certification' ? 'default' : 'outline'}
                    size="lg"
                    className="w-full justify-start text-left h-20"
                    onClick={() => handleGoalSelect('certification')}
                  >
                    <Award className="h-6 w-6 mr-4" />
                    <div>
                      <div className="font-semibold">Certification</div>
                      <div className="text-xs opacity-70">Get certified to boost your credentials</div>
                    </div>
                  </Button>
                </div>
                <Button variant="ghost" onClick={() => navigate('/user-type')} className="w-full mt-4">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to selection
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Interest Selection */}
          {step === 'interest' && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Area of Interest</CardTitle>
                <CardDescription>
                  What field do you want to {goal === 'skill' ? 'develop skills in' : 'get certified in'}?
                </CardDescription>
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
