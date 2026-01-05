import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserData, BookmarkedCourse, Course } from '@/types/user';

interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  bookmarkedCourses: BookmarkedCourse[];
  addBookmark: (course: Course) => void;
  removeBookmark: (courseId: string) => void;
  isBookmarked: (courseId: string) => boolean;
  resetFlow: () => void;
}

const defaultUserData: UserData = {
  name: '',
  email: '',
  userType: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<BookmarkedCourse[]>(() => {
    const saved = localStorage.getItem('bookmarkedCourses');
    return saved ? JSON.parse(saved) : [];
  });

  const addBookmark = (course: Course) => {
    const newBookmark: BookmarkedCourse = {
      ...course,
      bookmarkedAt: new Date(),
    };
    setBookmarkedCourses(prev => {
      const updated = [...prev, newBookmark];
      localStorage.setItem('bookmarkedCourses', JSON.stringify(updated));
      return updated;
    });
  };

  const removeBookmark = (courseId: string) => {
    setBookmarkedCourses(prev => {
      const updated = prev.filter(c => c.id !== courseId);
      localStorage.setItem('bookmarkedCourses', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (courseId: string) => {
    return bookmarkedCourses.some(c => c.id === courseId);
  };

  const resetFlow = () => {
    setUserData(prev => ({
      ...prev,
      grade: undefined,
      marks: undefined,
      useMarksForRecommendation: undefined,
      areaOfInterest: undefined,
      takeSkillTest: undefined,
      skillTestScore: undefined,
      wantsPG: undefined,
      pgPreference: undefined,
      officeGoal: undefined,
    }));
  };

  return (
    <UserContext.Provider value={{
      userData,
      setUserData,
      bookmarkedCourses,
      addBookmark,
      removeBookmark,
      isBookmarked,
      resetFlow,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
