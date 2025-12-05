import { ReactNode } from 'react';

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  createdAt: number;
}

export interface SearchEngine {
  id: string;
  name: string;
  searchUrl: string; // URL pattern with %s for query
  icon: ReactNode;
  placeholder: string;
}

export type ThemeMode = 'light' | 'dark';

export interface NavLink {
  title: string;
  url: string;
  desc?: string;
}

export interface NavCategory {
  id: string;
  title: string;
  icon: ReactNode;
  links: NavLink[];
}