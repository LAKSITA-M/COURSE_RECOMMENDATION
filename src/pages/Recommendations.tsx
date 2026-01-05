import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Bookmark, BookmarkCheck, Star, Clock, ArrowLeft, RefreshCw } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Course } from '@/types/user';
import { schoolCourses, undergraduateCourses, postgraduateCourses, professionalCourses } from '@/data/courses';
import { useToast } from '@/hooks/use-toast';

export default function Recommendations() {
  const navigate = useNavigate();
  const { userData, addBookmark, removeBookmark, isBookmarked, resetFlow } = useUser();
  const { toast } = useToast();

  const recommendedCourses = useMemo(() => {
    const { userType, grade, marks, useMarksForRecommendation, areaOfInterest, wantsPG, pgPreference, officeGoal, skillTestScore } = userData;
    
    let courses: Course[] = [];

    // School flow
    if (userType === 'school') {
      if (grade === '10th' || grade === '11th') {
        courses = [...schoolCourses];
      } else if (grade === '12th') {
        courses = [...undergraduateCourses];
      }

      // Filter based on marks
      if (useMarksForRecommendation && marks) {
        if (marks >= 85) {
          courses = courses.filter(c => c.category === 'Science' || c.category === 'Engineering');
        } else if (marks >= 70) {
          courses = courses.filter(c => c.category === 'Commerce' || c.category === 'Science');
        } else {
          courses = courses.filter(c => c.category === 'Arts' || c.category === 'Vocational' || c.category === 'Commerce');
        }
      }

      // Filter based on interest
      if (areaOfInterest) {
        const interestMapping: Record<string, string[]> = {
          'Technology & Computer Science': ['Engineering', 'Science', 'Vocational'],
          'Medical & Healthcare': ['Medical', 'Science'],
          'Business & Management': ['Commerce', 'Business'],
          'Engineering & Manufacturing': ['Engineering'],
          'Arts & Design': ['Arts', 'Design'],
          'Science & Research': ['Science'],
          'Finance & Accounting': ['Commerce'],
          'Law & Public Policy': ['Arts'],
          'Media & Communication': ['Arts'],
          'Education & Teaching': ['Arts'],
        };
        const relevantCategories = interestMapping[areaOfInterest] || [];
        if (relevantCategories.length > 0) {
          courses = courses.filter(c => relevantCategories.includes(c.category));
        }
      }

      // Skill test adjustment
      if (skillTestScore) {
        // Higher scores = more advanced courses
        courses = courses.sort((a, b) => b.rating - a.rating);
      }
    }

    // College flow
    if (userType === 'college') {
      if (wantsPG) {
        courses = [...postgraduateCourses];
        if (pgPreference === 'abroad') {
          courses = courses.filter(c => c.provider.includes('Abroad'));
        } else if (pgPreference === 'india') {
          courses = courses.filter(c => c.provider.includes('India'));
        }
      } else {
        courses = [...undergraduateCourses, ...professionalCourses.slice(0, 5)];
      }

      // Filter based on interest
      if (areaOfInterest) {
        const interestMapping: Record<string, string[]> = {
          'Technology & Computer Science': ['Engineering', 'Science'],
          'Medical & Healthcare': ['Medical'],
          'Business & Management': ['Business', 'Commerce'],
          'Engineering & Manufacturing': ['Engineering'],
          'Arts & Design': ['Arts', 'Design'],
          'Science & Research': ['Science', 'Research'],
          'Finance & Accounting': ['Commerce', 'Business'],
        };
        const relevantCategories = interestMapping[areaOfInterest] || [];
        if (relevantCategories.length > 0) {
          courses = courses.filter(c => relevantCategories.includes(c.category));
        }
      }
    }

    // Office flow
    if (userType === 'office') {
      courses = [...professionalCourses];
      if (officeGoal === 'certification') {
        courses = courses.filter(c => c.category === 'Certification');
      } else if (officeGoal === 'skill') {
        courses = courses.filter(c => c.category === 'Skill Development');
      }

      // Filter based on interest
      if (areaOfInterest) {
        const interestMapping: Record<string, string[]> = {
          'Technology & Computer Science': ['Full Stack', 'Data Science', 'Cloud', 'AWS'],
          'Business & Management': ['PMP', 'Scrum', 'Six Sigma', 'Digital Marketing'],
          'Arts & Design': ['UI/UX'],
        };
        const keywords = interestMapping[areaOfInterest] || [];
        if (keywords.length > 0) {
          courses = courses.filter(c => 
            keywords.some(kw => c.title.includes(kw) || c.description.includes(kw))
          );
        }
      }
    }

    return courses.length > 0 ? courses : [...schoolCourses, ...undergraduateCourses.slice(0, 5)];
  }, [userData]);

  const handleBookmark = (course: Course) => {
    if (isBookmarked(course.id)) {
      removeBookmark(course.id);
      toast({ title: "Removed from bookmarks" });
    } else {
      addBookmark(course);
      toast({ title: "Added to bookmarks!" });
    }
  };

  const handleStartOver = () => {
    resetFlow();
    navigate('/user-type');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-hero py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
            <h1 className="text-xl font-bold text-primary-foreground">CourseCompass</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => navigate('/bookmarks')}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Bookmarks
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Recommended Courses for You
              </h2>
              <p className="text-muted-foreground">
                Based on your preferences, here are {recommendedCourses.length} courses we think you'll love
              </p>
            </div>
            <Button variant="outline" onClick={handleStartOver}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          </div>

          {/* User Summary */}
          <Card className="mb-6 shadow-soft">
            <CardContent className="py-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  {userData.userType === 'school' ? 'School Student' : 
                   userData.userType === 'college' ? 'College Student' : 'Professional'}
                </Badge>
                {userData.grade && <Badge variant="outline">{userData.grade} Grade</Badge>}
                {userData.areaOfInterest && <Badge variant="outline">{userData.areaOfInterest}</Badge>}
                {userData.pgPreference && (
                  <Badge variant="outline">
                    PG: {userData.pgPreference === 'abroad' ? 'Abroad' : 'India'}
                  </Badge>
                )}
                {userData.officeGoal && (
                  <Badge variant="outline">
                    {userData.officeGoal === 'skill' ? 'Skill Development' : 'Certification'}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Course Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course, index) => (
              <Card 
                key={course.id} 
                className="shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in border-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge className="bg-primary/10 text-primary border-0">{course.category}</Badge>
                    <button 
                      onClick={() => handleBookmark(course)}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {isBookmarked(course.id) ? (
                        <BookmarkCheck className="h-5 w-5 text-accent" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <CardTitle className="text-lg mt-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent" />
                      {course.rating}
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {course.provider}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Button variant="ghost" onClick={handleStartOver}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Try Different Options
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
