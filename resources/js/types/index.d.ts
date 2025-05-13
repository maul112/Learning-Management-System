import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User & {
    admin?: {
      id: number;
      user_id: number;
    };
    instructor?: {
      id: number;
      user_id: number;
    };
    student?: {
      id: number;
      user_id: number;
    };
  };
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  icon?: LucideIcon | null;
  items: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  courses: {
    data: Course[];
  };
  [key: string]: unknown;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  by: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  status: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
  admin?: {
    id: number;
    user_id: number;
  };
  instructor?: {
    id: number;
    user_id: number;
  };
  student?: {
    id: number;
    user_id: number;
  };
  [key: string]: unknown; // This allows for additional properties...
}

export interface Academic {
  id: number;
  title: string;
  image: string;
  description: string;
  status: string;
  courses: Course[];
}

export interface Course {
  id: number;
  title: string;
  image: string;
  information: string;
  description: string;
  order: number;
  duration: number;
  difficulty: string;
  price: number;
  status: string;
  academic: Academic;
  modules: Module[];
  students: User[];
  ratings: Rating[];
  instructor: {
    id: number;
    user: User;
  };
}

export interface Module {
  id: number;
  title: string;
  order: number;
  status: string;
  course: Course;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  order: number;
  video: string;
  status: string;
  module: Module;
}

export interface Rating {
  id: number;
  rating: number;
  comment: string;
  course: Course;
  student: User;
}

export type DataContextType = {
  events?: {
    data: Event[];
  };
  academics?: {
    data: Academic[];
  };
  academic?: {
    data: Academic;
  };
  courses?: {
    data: Course[];
  };
  course?: {
    data: Course;
  };
};
