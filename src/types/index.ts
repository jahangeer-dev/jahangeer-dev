export interface NavItem {
  id: string;
  label: string;
}

export interface Experience {
  title: string;
  duration: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
  outcome: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string | null;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface NavigationProps {
  currentSection: string;
}

export interface Scene3DProps {
  currentSection: string;
}

export interface FloatingGeometryProps {
  position: [number, number, number];
  geometry: any;
  color: string;
  rotationSpeed?: number;
}
