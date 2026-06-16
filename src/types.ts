export type Language = 'id' | 'en';

export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  title: Record<Language, string>;
  category: 'infrastructure' | 'building' | 'renovation' | 'green';
  location: Record<Language, string>;
  year: string;
  budgetEst: string;
  image: string;
  description: Record<Language, string>;
  specs: {
    label: Record<Language, string>;
    value: string;
  }[];
  completed: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: Record<Language, string>;
  shortDescription: Record<Language, string>;
  fullDescription: Record<Language, string>;
  features: Record<Language, string[]>;
  averageTimeline: Record<Language, string>;
  priceRange: string;
}

export interface FAQItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface ProcessStep {
  step: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  metric: string;
}

export interface Testimony {
  id: string;
  name: string;
  role: Record<Language, string>;
  company: string;
  quote: Record<Language, string>;
  avatarUrl: string;
}

export interface ClientLogo {
  name: string;
  logoText: string;
  industry: Record<Language, string>;
}
