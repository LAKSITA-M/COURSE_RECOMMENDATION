import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Grade } from '@/types/user';
import { interestAreas } from '@/data/courses';
import { useToast } from '@/hooks/use-toast';

type Step = 'grade' | 'marks' | 'preference' | 'interest' | 'skill-test';

export default function SchoolFlow() {
  const navigate = useNavigate();
  const { userData, setUserData } = useUser();
  const { toast } = useToast();
  
  const [step, setStep] = useState<Step>('grade');
  const [grade, setGrade] = useState<Grade>(null);
  const [marks, setMarks] = useState('');
  const [useMarks, setUseMarks] = useState<string | null>(null);
  const [interest, setInterest] = useState('');
  const [takeTest, setTakeTest] = useState<string | null>(null);
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});

  const handleGradeSelect = (selectedGrade: Grade) => {
    setGrade(selectedGrade);
    if (selectedGrade === '11th') {
      // 11th grade students proceed to interest selection
      setStep('interest');
    } else {
      setStep('marks');
    }
  };

  const handleMarksSubmit = () => {
    if (!marks || parseFloat(marks) < 0 || parseFloat(marks) > 100) {
      toast({
        title: "Invalid marks",
        description: "Please enter marks between 0 and 100",
        variant: "destructive",
      });
      return;
    }
    setStep('preference');
  };

  const handlePreferenceSubmit = () => {
    if (useMarks === 'yes') {
      // Use marks for recommendation
      setUserData(prev => ({
        ...prev,
        grade,
        marks: parseFloat(marks),
        useMarksForRecommendation: true,
      }));
      navigate('/recommendations');
    } else {
      setStep('interest');
    }
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
    
    if (takeTest === null) {
      toast({
        title: "Make a choice",
        description: "Please indicate if you want to take the skill test",
        variant: "destructive",
      });
      return;
    }

    if (takeTest === 'yes') {
      setStep('skill-test');
    } else {
      setUserData(prev => ({
        ...prev,
        grade,
        marks: marks ? parseFloat(marks) : undefined,
        useMarksForRecommendation: false,
        areaOfInterest: interest,
        takeSkillTest: false,
      }));
      navigate('/recommendations');
    }
  };

  const handleSkillTestSubmit = () => {
    const score = Object.values(testAnswers).reduce((a, b) => a + b, 0) / Object.keys(testAnswers).length || 0;
    
    setUserData(prev => ({
      ...prev,
      grade,
      marks: marks ? parseFloat(marks) : undefined,
      useMarksForRecommendation: false,
      areaOfInterest: interest,
      takeSkillTest: true,
      skillTestScore: score,
    }));
    navigate('/recommendations');
  };

  const goBack = () => {
    switch (step) {
      case 'marks':
        setStep('grade');
        break;
      case 'preference':
        setStep('marks');
        break;
      case 'interest':
        if (grade === '11th') {
          setStep('grade');
        } else {
          setStep('preference');
        }
        break;
      case 'skill-test':
        setStep('interest');
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
          <p className="text-sm text-muted-foreground text-center mt-2">Step 3 of 3 - School Flow</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-lg animate-slide-up">
          {/* Grade Selection */}
          {step === 'grade' && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">What grade are you in?</CardTitle>
                <CardDescription>Select your current grade level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {(['10th', '11th', '12th'] as Grade[]).map((g) => (
                    <Button
                      key={g}
                      variant={grade === g ? 'default' : 'outline'}
                      size="lg"
                      className="w-full justify-start text-left h-16"
                      onClick={() => handleGradeSelect(g)}
                    >
                      <BookOpen className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">{g} Grade</div>
                        <div className="text-xs opacity-70">
                          {g === '10th' && 'Explore 11th-12th options'}
                          {g === '11th' && 'Currently in 11th grade'}
                          {g === '12th' && 'Explore undergraduate options'}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
                <Button variant="ghost" onClick={() => navigate('/user-type')} className="w-full mt-4">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Marks Input */}
          {step === 'marks' && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Your {grade} Marks</CardTitle>
                <CardDescription>Enter your overall percentage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Overall Percentage</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 85"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    className="h-12 text-lg text-center"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={goBack} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button variant="hero" onClick={handleMarksSubmit} className="flex-1">
                    Continue <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preference */}
          {step === 'preference' && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Course Recommendation Method</CardTitle>
                <CardDescription>
                  Should we suggest {grade === '10th' ? '11th-12th courses' : 'undergraduate courses'} based on your marks?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={useMarks || ''} onValueChange={setUseMarks}>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="flex-1 cursor-pointer">
                      <div className="font-medium">Yes, use my marks</div>
                      <div className="text-sm text-muted-foreground">Get recommendations based on your academic performance</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="flex-1 cursor-pointer">
                      <div className="font-medium">No, I'll choose my interest</div>
                      <div className="text-sm text-muted-foreground">Select your area of interest manually</div>
                    </Label>
                  </div>
                </RadioGroup>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={goBack} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button variant="hero" onClick={handlePreferenceSubmit} disabled={!useMarks} className="flex-1">
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
                <CardDescription>Select what interests you the most</CardDescription>
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

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Not sure about your choice? Take our skill assessment test!
                  </p>
                  <RadioGroup value={takeTest || ''} onValueChange={setTakeTest}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                      <RadioGroupItem value="no" id="noTest" />
                      <Label htmlFor="noTest" className="cursor-pointer">Skip the test</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-border">
                      <RadioGroupItem value="yes" id="yesTest" />
                      <Label htmlFor="yesTest" className="cursor-pointer">Take skill assessment test</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={goBack} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button variant="hero" onClick={handleInterestSubmit} className="flex-1">
                    Continue <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skill Test */}
          {step === 'skill-test' && (
            <Card className="shadow-card border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Skill Assessment</CardTitle>
                <CardDescription>Rate each statement (1 = Disagree, 5 = Strongly Agree)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 1, text: "I enjoy solving mathematical problems" },
                  { id: 2, text: "I'm fascinated by how technology works" },
                  { id: 3, text: "I like creative activities like art and design" },
                  { id: 4, text: "I enjoy reading about business and economics" },
                  { id: 5, text: "I want to help and work with people" },
                ].map((q) => (
                  <div key={q.id} className="space-y-2">
                    <p className="text-sm font-medium">{q.text}</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <Button
                          key={score}
                          variant={testAnswers[q.id] === score ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTestAnswers(prev => ({ ...prev, [q.id]: score }))}
                          className="flex-1"
                        >
                          {score}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={goBack} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button 
                    variant="hero" 
                    onClick={handleSkillTestSubmit} 
                    disabled={Object.keys(testAnswers).length < 5}
                    className="flex-1"
                  >
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
