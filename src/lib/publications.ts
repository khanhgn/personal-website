// lib/publications.ts
import publicationsData from '../../data/publications.json';

export type Publication = {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: string;
  link?: string;
  code?: string;
  abstract: string;
  tags: string[];
  image?: string;
};

export function getAllPublications(): Publication[] {
  return publicationsData as Publication[];
}
