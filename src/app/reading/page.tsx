import React from 'react';
import Carousel from 'src/app/books/page.tsx';

const data = [
    {
        url: '/book-covers/A Man Called Ove.png',
        name: 'A Man Called Ove',
        review: 'Last Christmas, my mother gifted me a copy of Fredrik Backman’s A Man Called Ove. It had nothing to do with the fact that I had previously read and reviewed one of Backman’s other books and would have thus thought that I would like this book as well. No, the reason why I got this book as a gift was that there was a cat on the cover of the book and, because of that, she thought that the book might be a good read. I think what my mom was trying to tell me was that she thought I read too many weird books, so she wanted to give me something that was a little more “normal.” And what’s more normal than having a cat on the cover of a book? OK, the reason might partially have been that she misses her own cat, who passed on a couple of years ago, but, in any event, I got this book, and it has taken me a year to finally have the time to read it. It turns out that a year might have been too long. It’s a pretty good book. A Man Called Ove is simply about, well, a man called Ove. He’s a Swedish man in late middle age who is prickly and grumpy at best — but his terseness is a shell to protect him from the sorts of bad things that usually befall people in life. And some very bad things have happened to him by the start of this book. His wife of 40 odd years has recently died and he has just lost his job due to downsizing. He is contemplating ending his life because he feels he no longer has anything to live for. However, every time that he tries to die — and I hope this isn’t much of a spoiler because the book’s pleasure lies in its predictability — he gets rudely interrupted by a neighbour or someone else who wants something of him. In the end, will Ove come to see that he has an extended family of neighbours (along with a friendly feral cat that he winds up adopting) who likes him just as he is? Will his heart turn to gold, revealing that he’s not too much of an old grump at all? Well, does a bear poop in the woods?',
        rating: 9,
    },
    {
        url: '/book-covers/A Mathematician\'s Apology.png',
        name: 'A Mathematician\'s Apology',
        review: 'https://example.com/review2',
        rating: 8,
    },
    {
      url: '/book-covers/Animal Farm.png',
      name: 'Book One',
      review: 'https://example.com/review1',
      rating: 9,
    },
    {
        url: '/book-covers/Life of Pi.png',
        name: 'Book Two',
        review: 'https://example.com/review2',
        rating: 8,
    },
    {
      url: '/book-covers/Papillon.png',
      name: 'Book One',
      review: 'https://example.com/review1',
      rating: 9,
    },
    {
        url: '/book-covers/Skin in the Game.png',
        name: 'Book Two',
        review: 'https://example.com/review2',
        rating: 8,
    },
    {
      url: '/book-covers/The Stranger.png',
      name: 'Book One',
      review: 'https://example.com/review1',
      rating: 9,
    },
    {
        url: '/book-covers/The Amazing Story.png',
        name: 'Book Two',
        review: 'https://example.com/review2',
        rating: 8,
    },
    {
      url: '/book-covers/The End of Everything.png',
      name: 'Book One',
      review: 'https://example.com/review1',
      rating: 9,
    },
    {
        url: '/book-covers/The Myth of Normal.png',
        name: 'Book Two',
        review: 'https://example.com/review2',
        rating: 8,
    },
    {
      url: '/book-covers/Tribes.png',
      name: 'Book One',
      review: 'https://example.com/review1',
      rating: 9,
    },
    {
        url: '/book-covers/To Kill a Mockingbird.png',
        name: 'Book Two',
        review: 'https://example.com/review2',
        rating: 8,
    },
    {
      url: '/book-covers/Zero.png',
      name: 'Book Two',
      review: 'https://example.com/review2',
      rating: 8,
  },
  {
    url: '/book-covers/This Perfect Day.png',
    name: 'Book One',
    review: 'https://example.com/review1',
    rating: 9,
  },
  {
      url: '/book-covers/The Stranger.png',
      name: 'Book Two',
      review: 'https://example.com/review2',
      rating: 8,
  },
  {
    url: '/book-covers/The Shell Collector.png',
    name: 'Book One',
    review: 'https://example.com/review1',
    rating: 9,
  },
  {
      url: '/book-covers/The Da Vinci Code.png',
      name: 'Book Two',
      review: 'https://example.com/review2',
      rating: 8,
  },
  {
    url: '/book-covers/OPEN.png',
    name: 'Book One',
    review: 'https://example.com/review1',
    rating: 9,
  },
  {
      url: '/book-covers/E-reader.png',
      name: 'Book Two',
      review: 'https://example.com/review2',
      rating: 8,
  },
  {
    url: '/book-covers/Banco.png',
    name: 'Book One',
    review: 'https://example.com/review1',
    rating: 9,
  },
  {
      url: '/book-covers/Anxious People.png',
      name: 'Book Two',
      review: 'https://example.com/review2',
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
