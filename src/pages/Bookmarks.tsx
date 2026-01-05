import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Bookmark, Star, Clock, ArrowLeft, Trash2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

export default function Bookmarks() {
  const navigate = useNavigate();
  const { bookmarkedCourses, removeBookmark } = useUser();
  const { toast } = useToast();

  const handleRemove = (courseId: string) => {
    removeBookmark(courseId);
    toast({ title: "Removed from bookmarks" });
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
            onClick={() => navigate('/recommendations')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Bookmark className="h-8 w-8 text-accent" />
              Your Saved Courses
            </h2>
            <p className="text-muted-foreground">
              {bookmarkedCourses.length === 0 
                ? "You haven't saved any courses yet" 
                : `You have ${bookmarkedCourses.length} saved course${bookmarkedCourses.length > 1 ? 's' : ''}`}
            </p>
          </div>

          {bookmarkedCourses.length === 0 ? (
            <Card className="shadow-soft border-0 text-center py-12">
              <CardContent>
                <Bookmark className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No saved courses</h3>
                <p className="text-muted-foreground mb-6">
                  Start exploring and save courses you're interested in
                </p>
                <Button variant="hero" onClick={() => navigate('/recommendations')}>
                  Browse Recommendations
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {bookmarkedCourses.map((course, index) => (
                <Card 
                  key={course.id} 
                  className="shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in border-0"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge className="bg-primary/10 text-primary border-0">{course.category}</Badge>
                      <button 
                        onClick={() => handleRemove(course.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
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
          )}
        </div>
      </div>
    </div>
  );
}
