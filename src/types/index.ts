export type ProjectStatus = 'live' | 'coming-soon' | 'in-development';
export type ProjectCategory = 'internal' | 'client';
export type FilterType = 'all' | 'live' | 'coming-soon' | 'internal' | 'client';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  url: string | null;
  repo: string | null;
  logo: string;
  description: string;
  slogan: string;
  themeColor: string;
  themeGradient: string;
  techStack: string[];
  problem: string;
  solution: string;
  outcome: string;
  galleryImages: string[];
  socialLinks: SocialLink[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FormSubmission {
  id?: string;
  created_at?: string;
  type?: string;
}

export interface ProjectRequest extends FormSubmission {
  full_name: string;
  email: string;
  project_name: string;
  description: string;
  budget_range: string | null;
  timeline: string | null;
}

export interface PartnershipRequest extends FormSubmission {
  company_name: string;
  contact_person: string;
  email: string;
  proposal: string;
  goals: string | null;
}

export interface SponsorshipRequest extends FormSubmission {
  org_name: string;
  contact_info: string;
  purpose: string;
  budget_range: string | null;
  description: string | null;
}

export interface GeneralInquiry extends FormSubmission {
  name: string;
  email: string;
  message: string;
}

export type FormType = 'project' | 'partnership' | 'sponsorship' | 'inquiry';
