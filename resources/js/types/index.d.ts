import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
  user: User;
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
  }
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
  [key: string]: unknown; // This allows for additional properties...
}

export interface Academic {
  id: number;
  title: string;
  image: string;
  description: string;
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
  academic: Academic;
  modules: Module[];
  users: User[];
}

export interface Module {
  id: number;
  title: string;
  order: number;
  course: Course;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  order: number;
  module: Module;
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
  }
  course?: {
    data: Course
  }
};
