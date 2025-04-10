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
  [key: string]: unknown;
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

export interface Course {
  id: number;
  title: string;
  instructorId: string;
  instructor: string;
}

export interface Module {
  id: number;
  title: string;
  course_id: number;
  course: string;
}
