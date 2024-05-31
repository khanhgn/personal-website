'use client'
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from 'src/styles/Carousel.module.css';

interface BookData {
    url: string;
    name: string;
    review: string;
    rating: number;
}

interface CarouselProps {
    books: BookData[];
}

const Carousel: React.FC<CarouselProps> = ({ books }) => {
    const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

    const handleBookClick = (book: BookData) => {
        if (selectedBook === book) {
            // If the clicked book is already selected, remove the selection
            setSelectedBook(null);
        } else {
            // Otherwise, select the clicked book
            setSelectedBook(book);
        }
    };

    return (
        <div>
            <Swiper
                spaceBetween={2}
                slidesPerView={'auto'}
            >
                {books.map((book, idx) => (
                    <SwiperSlide key={idx} className={styles['slider-item']}>
                        <img
                            src={book.url}
                            alt={book.name}
                            className={`${styles['book-spine']} ${selectedBook === book ? styles['selected'] : ''}`}
                            id={book.name.replace(/\s+/g, '-').toLowerCase()}
                            onClick={() => handleBookClick(book)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {selectedBook && (
                <div>
                    <h2>{selectedBook.name}</h2>
                    <p><em>Rating: {selectedBook.rating}</em></p>
                    <p>{selectedBook.review}</p>
                </div>
            )}
        </div>
    );
};

export default Carousel;
