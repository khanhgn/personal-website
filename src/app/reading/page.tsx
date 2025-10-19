import React from 'react';
import Carousel from 'src/app/books/page.tsx';

const data = [
    {
      url: '/book-covers/midnight library.png',
      name: 'The Midnight Library',
      review: 'The Midnight Library hits different when you\'re going through something. Matt Haig creates this concept where Nora gets to explore all the different lives she could have lived, and honestly, it\'s such a brilliant premise. The book deals with depression and regret in a way that feels real but also hopeful. Yeah, the ending wraps things up a bit too neatly, and sometimes the "grass isn\'t greener" message gets repetitive, but that doesn\'t take away from how comforting this book can be. It\'s like a warm hug in book form. If you\'re struggling with "what ifs" in your life, this might be exactly what you need.',
      rating: 8,
    },
    {
      url: '/book-covers/deep learning.png',
      name: 'Deep Learning',
      review: 'This book is basically the bible for anyone serious about understanding deep learning. Goodfellow, Bengio, and Courville really know their stuff, and they take you from linear algebra basics all the way to modern architectures like CNNs and GANs. Not gonna lie, it\'s dense. You need a solid math background and you\'ll probably have to reread sections multiple times. But if you want to truly understand why algorithms work the way they do, not just copy-paste code from tutorials, this is essential. It\'s not a quick read, but it\'s worth the effort if you\'re committed to really learning this field.',
      rating: 9,
    },
    {
      url: '/book-covers/advertising methods.png',
      name: 'Tested Advertising Methods',
      review: 'John Caples wrote the copywriting bible, plain and simple. This book is packed with headline formulas and techniques that actually work because they\'ve been tested over decades. What I love about it is the focus on results over creativity. Caples shows you how to write copy that converts by understanding basic human psychology: self-interest, curiosity, emotion. Sure, some examples are from old newspaper ads, but the principles still apply to everything from emails to landing pages. If you\'re in marketing or growth, this is a must-read. It\'s not about being clever, it\'s about being effective.',
      rating: 9,
    },
    {
      url: '/book-covers/proj hail mary.png',
      name: 'Project Hail Mary',
      review: 'Andy Weir did it again, and honestly, I think this is even better than The Martian. The story starts with this guy waking up alone on a spaceship with no memory, and from there it just gets wild. What makes it special isn\'t just the science problem-solving (which is fantastic), it\'s the friendship that develops during the mission. I won\'t spoil it, but it\'s genuinely moving. The book is funny, clever, and surprisingly emotional. If you like sci-fi that makes you think while also making you care about the characters, this is perfect.',
      rating: 10,
    },
    {
      url: '/book-covers/showurwork.png',
      name: 'Show Your Work',
      review: 'This book literally inspired me to build this website. Austin Kleon\'s message about sharing your creative process instead of waiting for perfection really resonated with me. I used to think I needed everything polished before putting it out there, but Kleon shows how the journey itself is valuable. It\'s not just about the end result, it\'s about documenting the ups and downs along the way. This shift in mindset motivated me to start sharing my projects and thoughts publicly. Quick read, but the impact sticks with you.',
      rating: 8,
    },
    {
      url: '/book-covers/klara and the sun.png',
      name: 'Klara and the Sun',
      review: 'Ishiguro writes this beautiful story from the perspective of Klara, an AI companion for children, and it makes you think about what it means to be human. The book raises questions about AI, love, and consciousness without being preachy about it. Klara\'s understanding of the world is limited but sincere, especially her relationship with the Sun, which creates these moments that are both touching and heartbreaking. Some people find it slow, but that\'s kind of the point. The constrained perspective mirrors how we all try to make sense of things we can\'t fully understand. Classic Ishiguro ending that stays with you.',
      rating: 9,
    },
    {
      url: '/book-covers/obstacleistheway.png',
      name: 'The obstacle is the way',
      review: 'Ryan Holiday breaks down Stoic philosophy into practical advice for turning obstacles into opportunities. The core message is solid and the examples are interesting, but man, it gets repetitive. You could probably get the same value from half the pages. If you\'re new to Stoicism, this is a decent intro, but don\'t expect to be blown away. It\'s practical and motivating in parts, just wish it moved faster.',
      rating: 8,
    },
    {
      url: '/book-covers/song of achilles.png',
      name: 'The Song of Achilles',
      review: 'Madeline Miller took the Iliad and turned it into one of the most heartbreaking love stories I\'ve ever read. The way she writes Achilles and Patroclus feels so real and intimate, even though you know exactly how it ends. That\'s what makes it so powerful. Achilles is still the legendary warrior but also flawed and shaped by prophecy, while Patroclus is this gentle moral compass to all that fury. The first half builds slowly, but it needs to so the ending hits as hard as it does. I cried. Multiple times. If you love mythology, romance, or just beautiful writing, read this.',
      rating: 10,
    },
    {
      url: '/book-covers/tribal leadership.png',
      name: 'Tribal Leadership',
      review: 'This book breaks down company culture into five stages, from toxic ("Life Sucks") to transformative ("Life is Great"). The interesting part is how they focus on language patterns to diagnose where your team is at. The move from Stage 3 (everyone competing individually) to Stage 4 (tribal collaboration) is super relevant for growing companies. Some examples feel a bit dated and the model can seem overly simple, but the core insights about meeting people where they are and not skipping stages really stuck with me. Useful for anyone leading teams.',
      rating: 8,
    },
    {
      url: '/book-covers/atomichabbits.png',
      name: 'Atomic Habbits',
      review: 'James Clear makes a compelling case that small habits, done consistently, lead to big changes. The "2-minute rule" and habit stacking are genuinely useful strategies I\'ve actually applied. What I like is that Clear breaks down the psychology behind habits in a way that\'s easy to understand. It\'s not about massive overnight changes, it\'s about tiny improvements that compound over time. If you want to build better habits without feeling overwhelmed, this book gives you a realistic roadmap. The science is there, but it\'s presented in a way anyone can use.',
      rating: 8,
    },
    {
      url: '/book-covers/peter thiel.png',
      name: 'Zero to One',
      review: 'Peter Thiel\'s take on building startups is pretty contrarian, and that\'s what makes it interesting. His big idea is that real innovation comes from creating something entirely new (zero to one) rather than copying what exists (one to n). Some of his views are controversial, especially about monopolies and competition, but the book forces you to think differently about business strategy. His emphasis on finding "secrets" that nobody else believes in is particularly compelling. Worth reading if you\'re into startups, just remember to think critically about what actually applies to your situation.',
      rating: 9,
    },
    {
      url: '/book-covers/steallikeanartist.png',
      name: 'Steal like an artist',
      review: 'Austin Kleon flips the whole idea of originality on its head. Nothing is truly original, he argues, so embrace your influences and make them your own. The book is full of practical advice about creativity, like actively collecting ideas from everywhere and remixing them in new ways. It\'s a quick, fun read with playful illustrations. What I love is how it takes the pressure off trying to be completely original. Creativity thrives on influence, and this book reminds you that your unique voice comes from how you combine your inspirations. Great for anyone feeling stuck creatively.',
      rating: 9,
    },
    {
      url: '/book-covers/deepwork.png',
      name: 'Deep Work',
      review: 'Cal Newport makes a strong case for why focused, distraction-free work matters more than ever. In a world of constant notifications and context switching, the ability to do deep work is becoming rare and valuable. The book is packed with strategies for carving out time for concentrated effort. Honestly, it changed how I think about productivity. It\'s not about working more hours, it\'s about working deeply during the hours you have. Essential reading if you want to produce meaningful work.',
      rating: 9,
    },
    {
      url: '/book-covers/thursdaymurderclub.png',
      name: 'The Thursday Murder Club',
      review: 'Richard Osman wrote this charming mystery about four retirees who meet weekly to solve cold cases, until a real murder happens in their village. What makes it special is how the older characters are fully dimensional people, not just background comedy. Elizabeth, Joyce, Ibrahim, and Ron feel like real friends, and their dynamic is what carries the book. The mystery itself is solid but not groundbreaking. It\'s cozy, funny, and surprisingly touching. Perfect comfort read if you want a mystery that makes you smile.',
      rating: 8,
    },
    {
      url: '/book-covers/lean startup.png',
      name: 'The Lean Startup',
      review: 'Eric Ries basically changed how people think about building companies with this book. The Build-Measure-Learn loop and MVP concept are everywhere now, maybe too much so. But the core ideas are still solid: experiment fast, pivot based on data, don\'t waste time building what nobody wants. Some sections get repetitive, especially if you\'re already familiar with these concepts. The real value is in actually applying these principles, not just reading about them. Good intro for entrepreneurs, though experienced founders might skim through parts.',
      rating: 8,
    },
    {
      url: '/book-covers/1984georgeowell.png',
      name: '1984',
      review: 'Orwell wrote this brutal look at totalitarianism that feels more relevant every year. What gets me isn\'t just the surveillance, it\'s how the Party can literally rewrite reality and make people believe it. Winston\'s rebellion is tragic because it\'s basically futile from the start. The scariest part? With enough control, you can make people believe anything, even that 2 + 2 = 5. As AI and data surveillance keep growing, this book reads less like fiction and more like a warning. Fascinating and terrifying to think about where we\'re heading.',
      rating: 9,
    },
    {
      url: '/book-covers/warofart.png',
      name: 'War of Art',
      review: 'Steven Pressfield calls out all the internal resistance that stops us from doing our best work. He\'s talking about procrastination, fear, self-doubt, all that stuff we use to avoid our calling. His tone is pretty direct, almost military-like, which works. The key message is simple: show up every day, do the work, push through the resistance. It\'s a powerful kick in the pants when you\'re stuck on a creative project. Not just about art, really about developing the mental toughness to pursue anything you care about.',
      rating: 9,
    },
    {
      url: '/book-covers/a little life.png',
      name: 'A Little Life',
      review: 'This book wrecked me. Hanya Yanagihara tells this story about four friends in New York, focusing on Jude who\'s carrying impossible trauma from his past. The writing is beautiful but unflinching. It doesn\'t look away from pain. I cried multiple times reading this. Some people think it goes too far with the suffering, and I get that critique. But there\'s something powerful about how Yanagihara explores how love persists even in broken circumstances. Heavy warning: this deals with abuse, self-harm, and suicide. Not a light read at all, but if you can handle it, it\'s a profound meditation on resilience and healing.',
      rating: 9,
    },
    {
      url: '/book-covers/startup manual.png',
      name: 'The Startup Owner\'s Manual',
      review: 'Steve Blank and Bob Dorf created the comprehensive playbook for Customer Development, which basically laid the foundation for the Lean Startup movement. This book is dense and practical, walking through every step of validating your business model. Blank\'s framework about getting out of the building and talking to customers before building anything has saved countless startups from wasting time. Fair warning, it\'s a hefty read that feels more like a textbook. You won\'t read it cover to cover in one go, but you\'ll keep coming back to it at different stages. For serious entrepreneurs, this is the definitive guide.',
      rating: 9,
    },
    {
      url: '/book-covers/beneath a scarlet sky.png',
      name: 'Beneath a Scarlet Sky',
      review: 'Mark Sullivan tells the true story of Pino Lella, an Italian teenager who becomes a spy for the Allies during WWII. The book mixes romance, adventure, and war in a way that keeps you turning pages. What makes it powerful is knowing this actually happened, even though Sullivan takes some creative liberties. The love story between Pino and Anna adds emotional depth, though sometimes it overshadows the historical parts. The prose isn\'t literary fiction level, but the story itself is so extraordinary that it doesn\'t matter. Great for historical fiction fans who want an accessible, fast-paced read about an incredible true story.',
      rating: 8,
    },
    {
      url: '/book-covers/onearthwerebrieflygorgeous.png',
      name: 'On Earth We\'re Briefly Gorgeous',
      review: 'Ocean Vuong\'s prose is as beautiful as it is devastating. This book captures identity, trauma, and love in a way that feels almost overwhelming. The lyrical style can be a lot, like drinking poetry straight from the bottle. It\'s gorgeous but intense, demanding your full attention. Not something you can breeze through. For some people that slow burn is frustrating, but the payoff is worth it. Vuong has a gift for making you feel everything.',
      rating: 9,
    },
    {
      url: '/book-covers/E-reader.png',
      name: 'No Death - No Fear',
      review: 'This book holds special meaning for me as a Vietnamese Buddhist. Thich Nhat Hanh\'s teachings connect deeply with the Buddhist principles I grew up with. His gentle wisdom about life and death reflects what I\'ve learned through Buddhist practice: that life is transient and interconnected. Reading this feels like a reminder of lessons from my upbringing, that death isn\'t an ending but a transformation, and fear only comes when we forget our true nature. The book captures that peaceful acceptance of impermanence that sits at the heart of Buddhism. It\'s deeply personal for me, affirming the teachings I hold close and offering a sense of peace.',
      rating: 8,
    },
];

const ReadingPage: React.FC = () => {
    return (
      <>
        <h2 className="mb-12">What I have been reading</h2>
        <div className="mt-10 space-y-12 border-t border-gray-200 pt-10 dark:border-gray-700">
          <Carousel books={data} />
        </div>
      </>
    );
};

export default ReadingPage;
