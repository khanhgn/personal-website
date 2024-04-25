import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { PostCard } from '@/components/PostCard'; // Assuming PostCard is located in the correct directory
import Image from 'next/image'; // Import the Image component from Next.js

export default function Home() {
    const posts = allPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date)),
    );

    return (
        <div>
            <div className="space-y-7">
                <h1>Home Page</h1>
                <p>
                    Next.js starter template for your next blog or personal site. Built
                    with:
                </p>
                <ul className="my-6 list-disc space-y-2 pl-4">
                    <li>
                        <Link className="link" href="https://nextjs.org/docs/app">
                            Next.js - App Router
                        </Link>
                    </li>
                    <li>
                        <Link className="link" href="https://www.contentlayer.dev/">
                            Contentlayer
                        </Link>
                    </li>
                    <li>
                        <Link className="link" href="https://mdxjs.com/">
                            MDX
                        </Link>
                    </li>
                    <li>
                        <Link className="link" href="https://ui.shadcn.com/">
                            shadcn-ui
                        </Link>
                    </li>
                    <li>
                        <Link className="link" href="https://tailwindcss.com/">
                            Tailwind CSS
                        </Link>
                    </li>
                </ul>

                <Button asChild>
                    <a href="https://github.com/ChangoMan/nextjs-mdx-blog">
                        <Github className="mr-1" /> Get the source code!
                    </a>
                </Button>
            </div>

            <div className="my-8 columns-2 gap-4 sm:columns-3">
              <div className="relative mb-4 h-40">
                <Image
                  alt="Me speaking on stage at React Summit about the future of Next.js"
                  src="/main-page-images/conference.JPG"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative mb-4 h-80 sm:mb-0">
                <Image
                  alt="Me, Lydia, and Delba filming the Next.js Conf keynote"
                  src="/main-page-images/hike.jpeg"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover object-[-16px] sm:object-center"
                />
              </div>
              <div className="relative h-40 sm:mb-4 sm:h-80">
                <Image
                  alt="Me standing on stage at Reactathon delivering the keynote"
                  src="/main-page-images/hackathon.JPG"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover object-top sm:object-center"
                />
              </div>
              <div className="relative mb-4 h-40 sm:mb-0">
                <Image
                  alt="Me standing on stage at SmashingConf giving a talk about my optimism for the web"
                  src="/main-page-images/squad.JPG"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative mb-4 h-40">
                <Image
                  alt="Me and Guillermo Rauch on stage for Vercel Ship, answering questions from the Next.js community"
                  src="/main-page-images/ngv.jpeg"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative h-80">
                <Image
                    alt="Me and Guillermo Rauch on stage for Vercel Ship, answering questions from the Next.js community"
                    src="/main-page-images/person.jpeg"
                    fill
                    sizes="(max-width: 768px) 213px, 33vw"
                    priority
                    className="rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="mt-16">
                <h2>From the blog</h2>
                <p className="mt-2 leading-8">
                    Blog posts are written with MDX and processed through Contentlayer.
                </p>
            </div>
            <div className="mt-10 space-y-12 border-t border-gray-200 pt-10 dark:border-gray-700">
                {posts.map((post, idx) => (
                    <PostCard key={idx} {...post} />
                ))}
            </div>
        </div>
    );
}
