'use client'
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
    books?: BookData[]; // Make books optional
}

const Carousel: React.FC<CarouselProps> = ({ books = [] }) => { // Provide default empty array
    const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

    const handleBookClick = (book: BookData) => {
        if (selectedBook === book) {
            setSelectedBook(null);
        } else {
            setSelectedBook(book);
        }
    };

    return (
        <div>
            <Swiper
                spaceBetween={2}
                slidesPerView={'auto'}
            >
                {books.length > 0 ? (
                    books.map((book, idx) => (
                        <SwiperSlide key={idx} className={styles['slider-item']}>
                            <img
                                src={book.url}
                                alt={book.name}
                                className={`${styles['book-spine']} ${selectedBook === book ? styles['selected'] : ''}`}
                                id={book.name.replace(/\s+/g, '-').toLowerCase()}
                                onClick={() => handleBookClick(book)}
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <p>No books available</p>
                )}
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
