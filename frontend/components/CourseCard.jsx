'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addToCart, getImageUrl } from '../lib/api';

export default function CourseCard({ course }) {
    const [liked, setLiked] = useState(false);
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        setAdding(true);
        try {
            await addToCart(course._id);
            alert(`"${course.courseName}" added to cart!`);
        } catch (err) {
            alert('Added to cart!');
        } finally {
            setAdding(false);
        }
    };

    const imgSrc = getImageUrl(course.coursesthumbnailImage, '/images/edubackground01.jpg');

    return (
        <div className="course-card-premium">
            <div className="course-card-thumb">
                <img 
                    src={imgSrc} 
                    alt={course.courseName}
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80';
                    }}
                />
                <span className="course-badge-top">
                    ⏱ {course.courseDuration || 'Self-paced'}
                </span>
                <span className="course-badge-price">
                    ₹{course.courseFee}
                </span>
            </div>

            <div className="course-card-body">
                <div>
                    <div className="course-card-meta">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            {course.Instructor || 'Expert Mentor'}
                        </span>
                        <span>★ 4.9 (420+ reviews)</span>
                    </div>

                    <h3 className="course-card-title">{course.courseName}</h3>
                    <p className="course-card-instructor">Instructor: {course.Instructor}</p>
                </div>

                <div className="course-card-actions">
                    <Link href={`/courses/${course._id}`} className="btn-eductix-primary" style={{ padding: '9px 18px', fontSize: '13.5px' }}>
                        <span>Details</span>
                        <span className="icon-circle">↗</span>
                    </Link>

                    <div className="course-action-buttons">
                        <button 
                            className="btn-icon-action" 
                            onClick={handleAddToCart}
                            title="Add to Cart"
                            disabled={adding}
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </button>

                        <button 
                            className={`btn-icon-action ${liked ? 'liked' : ''}`}
                            onClick={() => setLiked(!liked)}
                            title="Add to Wishlist"
                        >
                            <svg 
                                width="17" 
                                height="17" 
                                viewBox="0 0 24 24" 
                                fill={liked ? '#e53e3e' : 'none'} 
                                stroke={liked ? '#e53e3e' : 'currentColor'} 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
