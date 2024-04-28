import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';
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
                <h1>✌️ Hello, I'm Khanh</h1>
                <p>
                    I'm a Bachelor of Computer Science (Advanced) Student at the University of Adelaide, a research intern at MIT Media Lab, a SWE intern at Maptek and a Deep Learning enthusiast :D
                </p>

                <div className="fle space-x-3">
                  <Button asChild>
                      <a href="https://github.com/khanhgn" target="_blank">
                          <Github className="mr-1" /> Github
                      </a>
                  </Button>
                  <Button asChild>
                      <a href="https://www.linkedin.com/in/khanh-nguyen-58445a261/" target="_blank">
                          <Linkedin className="mr-1" /> Linkedin
                      </a>
                  </Button>
                  <Button asChild>
                      <a href="https://twitter.com/khanhgng" target="_blank">
                          <Twitter className="mr-1" /> Twitter
                      </a>
                  </Button>
                </div>
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
