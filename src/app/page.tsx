import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { PostCard } from '@/components/PostCard';
import Image from 'next/image';
import PublicationsSection from '@/components/PublicationsSection';


export default function Home() {
    const posts = allPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date)),
    );

    return (
        <div>
            <div className="space-y-7">
                <h1>✌️ Hello, I'm Khanh</h1>
                <p>
                    I'm a Bachelor of Computer Science (Advanced) Student at the University of Adelaide. I'm currently working under Prof. Minh Hoai Nguyen at the Australian Institute of Machine Learning and Tobin South at MIT Media Lab.
                </p>

                <div className="space-x-3">
                  <Button asChild>
                      <a href="https://github.com/khanhgn" target="_blank">
                          <Github className="mr-1" />
                          <span className="hidden md:inline">Github</span>
                      </a>
                  </Button>
                  <Button asChild>
                      <a href="https://www.linkedin.com/in/khanh-nguyen-58445a261/" target="_blank">
                          <Linkedin className="mr-1" />
                          <span className="hidden md:inline">Linkedin</span>
                      </a>
                  </Button>
                  <Button asChild>
                      <a href="https://twitter.com/khanhgng" target="_blank">
                          <Twitter className="mr-1" />
                          <span className="hidden md:inline">Twitter</span>
                      </a>
                  </Button>
                  <Button asChild>
                      <a href="https://youtube.com/@khanhgn?si=l4dOln_Cgm4PNDYL" target="_blank">
                          <Youtube className="mr-1" />
                          <span className="hidden md:inline">YouTube</span>
                      </a>
                  </Button>
                </div>
            </div>

            <div className="my-8 columns-2 gap-4 sm:columns-3">
              <div className="relative mb-4 h-40">
              <Image
                  alt="Me playing frisbee"
                  src="/main-page-images/frisbee.jpeg"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative mb-4 h-80 sm:mb-0">
              <Image
                  alt="Me competing at Adelaide Medtech Hackathon"
                  src="/main-page-images/hackathon.JPG"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative h-40 sm:mb-4 sm:h-80">
                <Image
                  alt="Me in the sun"
                  src="/main-page-images/person.jpeg"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative mb-4 h-40 sm:mb-0">
                <Image
                  alt="My hobby includes playing the guitar"
                  src="/main-page-images/guitar2.JPEG"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative mb-4 h-40">
                <Image
                  alt="Me and my friends hiking"
                  src="/main-page-images/hike.jpeg"
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="relative h-80">
                <Image
                    alt="My hobby includes collecting records and cassettes of my favourite artists"
                    src="/main-page-images/music2.jpg"
                    fill
                    sizes="(max-width: 768px) 213px, 33vw"
                    priority
                    className="rounded-lg object-cover"
                />
              </div>

            </div>

            <div className="mt-16">
                <h2>Publications</h2>
            </div>
            <PublicationsSection />
        </div>
    );
}
