// lib/news.ts

import newsData from 'data/news.json';

// Define NewsItem type
type NewsItem = {
  id: number;
  title: string;
  date: string;
  content: string;
};

// Export function to get all news
export function getAllNews(): NewsItem[] {
  return newsData.reverse() as NewsItem[];
}
