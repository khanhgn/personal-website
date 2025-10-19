// components/PublicationsSection.tsx
'use client'

import { useEffect, useState } from 'react';
import { getAllPublications } from '@/lib/publications';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

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

const PublicationsSection = ({ limit }: { limit?: number }) => {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const pubs = getAllPublications();
    setPublications(limit ? pubs.slice(0, limit) : pubs);
  }, [limit]);

  return (
    <div className="space-y-5">
      {publications.map((pub) => (
        <a
          key={pub.id}
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-stretch gap-4 md:gap-6">
              {pub.image && (
                <div className="relative w-full md:w-80 h-56 md:h-auto md:self-stretch overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={pub.image}
                    alt={pub.title}
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  <h3 className="text-base md:text-lg font-semibold leading-snug">
                    <span className="underline-offset-4 hover:underline">{pub.title}</span>
                  </h3>
                  <ExternalLink className="mt-0.5 w-4 h-4 text-zinc-400" />
                </div>

                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 truncate">
                  {pub.authors}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{pub.venue}</span>
                  <span className="mx-2 text-zinc-400">•</span>
                  {pub.year}
                </p>

                {pub.abstract && (
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {pub.abstract}
                  </p>
                )}

                {pub.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pub.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 bg-zinc-50/60 dark:bg-zinc-900/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default PublicationsSection;
