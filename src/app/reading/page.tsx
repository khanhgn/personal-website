import React from 'react';
import Carousel from 'src/app/books/page.tsx';

const data = [
    {
      url: '/book-covers/steallikeanartist.png',
      name: 'Steal like an artist',
      review: 'Steal Like an Artist by Austin Kleon is a creative manifesto that flips the script on originality. Kleon argues that nothing is truly original, and that the best way to create is by embracing the influence of others—stealing ideas, but making them your own. The book is filled with practical advice for tapping into your creativity, encouraging you to draw inspiration from everywhere, remix existing ideas, and forge your own unique path. Kleon’s writing is accessible and motivating, breaking down the creative process into simple, actionable steps. He emphasizes that creativity isn’t about waiting for lightning to strike; it’s about actively engaging with the world around you, collecting ideas, and recombining them in new ways. The book’s playful illustrations and quotes add to its charm, making it a fun and quick read. Steal Like an Artist is a must-read for anyone looking to boost their creativity and let go of the pressure to be completely original. It’s a reminder that creativity thrives on influence, and that by embracing the ideas of others, you can discover your own voice. This book isn’t just about creating art—it’s about living a creative life.',
      rating: 9,
    },
    {
      url: '/book-covers/1984georgeowell.png',
      name: '1984',
      review: '1984 by George Orwell is a brutal indictment of totalitarianism, showing just how far a regime can go in controlling not just actions, but thoughts. The novel doesn’t just warn about the loss of freedom—it showcases the horrifying power of propaganda and surveillance to rewrite reality itself. Winston Smith’s rebellion is less a fight for freedom and more a tragic exercise in futility. Orwell’s world isn’t just dystopian; it’s a nightmare of psychological manipulation where truth is a casualty. Hot take: The most terrifying part of 1984 isn’t the constant surveillance—it’s the idea that with enough control, the state can make you believe anything, even that 2 + 2 = 5. As AI and data surveillance grow more pervasive in our own world, Orwell\'s vision feels less like fiction and more like a warning. It’s going to be fascinating—and possibly frightening—to see how our future unfolds in this context.',
      rating: 9,
    },
    {
      url: '/book-covers/onearthwerebrieflygorgeous.png',
      name: 'On Earth We\'re Briefly Gorgeous',
      review: 'On Earth We\'re Briefly Gorgeous by Ocean Vuong is a poetic gut-punch that lingers long after you close the book. Vuong’s prose is as beautiful as it is devastating, capturing the raw, aching complexities of identity, trauma, and love. But the book’s lyrical style can feel overwhelming at times, almost too rich, like trying to drink poetry straight from the bottle. It’s a gorgeous, emotional read, but not one you can breeze through—its intensity demands your full attention. For some, that might make it a bit of a slow burn, but the payoff is worth it.',
      rating: 9,
    },
    {
      url: '/book-covers/showurwork.png',
      name: 'Show Your Work',
      review: 'Show Your Work! by Austin Kleon had a profound impact on me, inspiring me to create my own website and blog. Kleon’s message about the importance of sharing your creative process really hit home. Instead of waiting for everything to be perfect, I realized the value in putting my work out there, step by step, and letting others see the journey unfold. The book encouraged me to embrace transparency and connect with others through my work. It’s not just about the end result—it’s about sharing the ups, downs, and everything in between. This shift in mindset motivated me to build my platform, where I can document my projects, thoughts, and growth in real time. Kleon’s advice made me see that the process itself is worth celebrating, and that by sharing it, I can inspire and engage with a community of like-minded individuals.',
      rating: 8,
    },
    {
      url: '/book-covers/atomichabbits.png',
      name: 'Atomic Habbits',
      review: 'Atomic Habits by James Clear is a practical guide to building good habits and breaking bad ones, all through the power of small, incremental changes. Clear’s core idea is that it\'s not massive shifts that lead to success, but rather tiny habits that compound over time to produce significant results. He breaks down the science of habit formation in a way that’s easy to understand and apply, offering a clear roadmap for making lasting changes in your life. The book is filled with actionable strategies, such as the “2-minute rule” and habit stacking, which make it easier to start and maintain new habits. Clear also dives into the psychology behind why we do what we do, helping readers understand the cues and rewards that drive their behavior. Atomic Habits is an essential read for anyone looking to make positive changes in their life without the overwhelm. Clear’s approach is both realistic and encouraging, showing that even the smallest actions, when done consistently, can lead to big transformations. Whether you\'re looking to improve your health, productivity, or personal growth, this book provides the tools you need to make those changes stick.',
      rating: 8,
    },
    {
      url: '/book-covers/deepwork.png',
      name: 'Deep Work',
      review: 'Deep Work by Cal Newport is a game-changer for anyone seeking to achieve truly meaningful and productive work. Newport makes a compelling case for the power of focused, distraction-free effort in an age where constant connectivity often leads to shallow, unfocused work. The book is packed with actionable strategies to help you carve out time for deep, concentrated effort, enabling you to produce high-quality results and reach your full potential. It’s an essential read for anyone serious about taking their productivity and work quality to the next level.',
      rating: 9,
    },
    {
      url: '/book-covers/obstacleistheway.png',
      name: 'The obstacle is the way',
      review: 'The Obstacle Is the Way by Ryan Holiday serves up Stoic philosophy with a side of self-help, but at times, it feels like it’s stuck in first gear. While Holiday\'s advice on turning challenges into opportunities is practical and motivating, the pacing can drag, and the repetition of key ideas makes it feel like the book is circling the same point over and over. If you’re looking for a quick, impactful read, this one might test your patience. It\'s a solid introduction to Stoicism, but the message could have been delivered in half the time.',
      rating: 8,
    },
    {
      url: '/book-covers/warofart.png',
      name: 'War of Art',
      review: 'The War of Art by Steven Pressfield is a no-nonsense guide to overcoming the internal barriers that keep us from doing our best work. Pressfield identifies these obstacles as "Resistance," a force that manifests as procrastination, fear, self-doubt, and anything else that keeps you from pursuing your true calling. The book is divided into three sections, each tackling different aspects of Resistance and offering strategies to conquer it. Pressfield’s tone is direct and almost militaristic, urging readers to treat their creative work with the same seriousness and discipline as a professional soldier. He makes it clear that the hardest battle is often within ourselves, and the key to success is showing up every day, no matter how difficult it feels. The War of Art is a powerful kick in the pants for anyone struggling to get started on a creative project or who feels stuck in their work. It’s a reminder that the biggest obstacles are often self-imposed, and that true artists must push through Resistance to reach their potential. This book isn’t just about creativity; it’s about developing the mental toughness to pursue your passion relentlessly.',
      rating: 9,
    },
    {
      url: '/book-covers/E-reader.png',
      name: 'No Death - No Fear',
      review: 'No Death, No Fear by Thich Nhat Hanh holds a special resonance for me as a Vietnamese Buddhist. Hanh’s teachings are deeply rooted in the Buddhist principles that have been a part of my cultural and spiritual upbringing. His gentle wisdom and compassionate approach to life and death reflect the essence of what I’ve learned through Buddhist practices—the understanding that life is transient and interconnected. Hanh’s words feel like a reminder of the lessons I\'ve grown up with: that death is not an end, but a transformation, and that fear of death only arises when we forget our true nature. The book beautifully captures the peaceful acceptance of impermanence that is at the heart of Buddhism, and it provides a comforting, spiritual perspective that aligns with the values and beliefs I’ve carried with me throughout my life. It’s a deeply personal and affirming read, one that echoes the teachings I hold close and offers a profound sense of peace.',
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
