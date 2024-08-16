// components/NewsSection.tsx
'use client'

import { useEffect, useState } from 'react';
import { getAllNews } from '@/lib/news';
import { format, parseISO } from 'date-fns'


const NewsSection = ({ limit }: { limit: number }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const newsData = getAllNews().slice(0, limit);
    setNews(newsData);
  }, [limit]);

  return (
    <div className="news-section">
      {news.map((item, index) => (
        <div key={index} className="pt-10">
          <h4>{item.title}</h4>
          <time className="my-4 block text-sm text-zinc-400" dateTime={item.date}>
            {format(parseISO(item.date), 'LLLL d, yyyy')}
          </time>
          {/* <p>{item.content}</p> */}
        </div>
      ))}
    </div>
  );
};

export default NewsSection;
