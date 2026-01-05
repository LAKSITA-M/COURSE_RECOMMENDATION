export type UserType = 'school' | 'college' | 'office' | null;
export type Grade = '10th' | '11th' | '12th' | null;
export type PGPreference = 'abroad' | 'india' | null;
export type OfficeGoal = 'skill' | 'certification' | null;

export interface UserData {
  name: string;
  email: string;
  userType: UserType;
  grade?: Grade;
  marks?: number;
  useMarksForRecommendation?: boolean;
  areaOfInterest?: string;
  takeSkillTest?: boolean;
  skillTestScore?: number;
  wantsPG?: boolean;
  pgPreference?: PGPreference;
  officeGoal?: OfficeGoal;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  provider: string;
  rating: number;
}

export interface BookmarkedCourse extends Course {
  bookmarkedAt: Date;
}
