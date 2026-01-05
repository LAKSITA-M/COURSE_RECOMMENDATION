import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, School, Building2, Briefcase, ArrowRight } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { UserType } from '@/types/user';

const userTypes = [
  {
    id: 'school' as UserType,
    title: 'School Student',
    description: 'Currently in 10th, 11th, or 12th grade',
    icon: School,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'college' as UserType,
    title: 'College Student',
    description: 'Pursuing undergraduate degree',
    icon: Building2,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 'office' as UserType,
    title: 'Working Professional',
    description: 'Looking for skill development',
    icon: Briefcase,
    gradient: 'from-amber-500 to-orange-600',
  },
];

export default function UserTypeSelection() {
  const navigate = useNavigate();
  const { setUserData, resetFlow } = useUser();

  const handleSelect = (type: UserType) => {
    resetFlow();
    setUserData(prev => ({ ...prev, userType: type }));
    
    switch (type) {
      case 'school':
        navigate('/school');
        break;
      case 'college':
        navigate('/college');
        break;
      case 'office':
        navigate('/office');
        break;
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
            <div className="flex-1 h-2 rounded-full bg-muted" />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">Step 2 of 3</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Where are you in your journey?
            </h2>
            <p className="text-muted-foreground">
              Select your current stage to get personalized recommendations
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {userTypes.map((type) => (
              <Card
                key={type.id}
                className="cursor-pointer transition-all duration-300 hover:shadow-card hover:-translate-y-1 border-2 border-transparent hover:border-primary/20 group"
                onClick={() => handleSelect(type.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    <type.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg mb-2">{type.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {type.description}
                  </CardDescription>
                  <Button variant="ghost" size="sm" className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Select <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
