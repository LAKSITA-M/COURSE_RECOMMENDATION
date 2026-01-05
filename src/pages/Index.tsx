import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, BookOpen, Users, Target, Sparkles } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/details');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 bg-primary-foreground/20 rounded-2xl animate-float">
              <GraduationCap className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground text-center mb-6 animate-slide-up">
            Find Your Perfect
            <span className="block mt-2">Learning Path</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 text-center max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Personalized course recommendations for students and professionals. 
            Discover courses tailored to your goals, interests, and academic background.
          </p>
          
          <div className="flex justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button 
              variant="accent" 
              size="lg" 
              onClick={handleGetStarted}
              className="text-lg px-10"
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Get personalized course recommendations in just a few simple steps
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Tell Us About You',
                description: 'Share your current educational stage - school, college, or professional',
                gradient: 'from-cyan-500 to-blue-600',
              },
              {
                icon: Target,
                title: 'Define Your Goals',
                description: 'Let us know your interests, marks, and career aspirations',
                gradient: 'from-violet-500 to-purple-600',
              },
              {
                icon: Sparkles,
                title: 'Get Recommendations',
                description: 'Receive personalized course suggestions based on your profile',
                gradient: 'from-amber-500 to-orange-600',
              },
              {
                icon: BookOpen,
                title: 'Save & Explore',
                description: 'Bookmark courses you like and explore your learning path',
                gradient: 'from-emerald-500 to-teal-600',
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-secondary/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Discover Your Path?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of students who found their perfect courses through our personalized recommendations
          </p>
          <Button variant="hero" size="lg" onClick={handleGetStarted}>
            Start Your Journey
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-semibold">CourseCompass</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 CourseCompass. Helping students find their path.
          </p>
        </div>
      </footer>
    </div>
  );
}
