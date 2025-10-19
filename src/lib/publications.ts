// lib/publications.ts
import publicationsData from '../../data/publications.json';

type Publication = {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: string;
  link: string;
  abstract: string;
  tags: string[];
  image?: string;
};

export function getAllPublications(): Publication[] {
  return publicationsData as Publication[];
}
