'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import { getImageUrl } from '../lib/api';

export default function SkillsCarousel({ thumbnails = [] }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="skills-showcase-section" id="skills-section">
            <div className="eductix-container">
                <div className="skills-showcase-grid">
                    {/* Left Column */}
                    <div className="skills-text-side">
                        <div className="pill-badge">
                            <span className="pill-dot"></span> In-Demand Skills
                        </div>

                        <h2 className="section-title">
                            Learn Essential Career & Life Skills
                        </h2>

                        <p className="section-desc" style={{ fontSize: '16px' }}>
                            Build in-demand skills fast and advance your career. Follow guided learning tracks curated by real-world industry experts to gain practical confidence.
                        </p>

                        <ul className="skills-features-list">
                            <li>
                                <span className="bullet-dot">✓</span>
                                <span>Hands-on project-based roadmaps</span>
                            </li>
                            <li>
                                <span className="bullet-dot">✓</span>
                                <span>Expert mentorship & real-time feedback</span>
                            </li>
                            <li>
                                <span className="bullet-dot">✓</span>
                                <span>Recognized career certification upon completion</span>
                            </li>
                        </ul>

                        {/* Navigation Row */}
                        <div className="skills-nav-row">
                            <button ref={prevRef} className="skills-arrow-btn" aria-label="Previous slide">←</button>
                            <button ref={nextRef} className="skills-arrow-btn" aria-label="Next slide">→</button>
                            <Link href="/#course-section" className="btn-eductix-primary" style={{ marginLeft: '10px' }}>
                                <span>Explore All</span>
                                <span className="icon-circle">↗</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Slider Column */}
                    <div className="skills-slider-side">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            slidesPerView={1}
                            spaceBetween={20}
                            loop={true}
                            grabCursor={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            breakpoints={{
                                560: {
                                    slidesPerView: 1.4,
                                    spaceBetween: 20,
                                },
                                820: {
                                    slidesPerView: 1.8,
                                    spaceBetween: 24,
                                },
                                1100: {
                                    slidesPerView: 2.2,
                                    spaceBetween: 24,
                                }
                            }}
                        >
                            {thumbnails.map((item, index) => {
                                const imgSrc = getImageUrl(item.heroThumbnailImage, '/images/edubackground02.jpg');

                                return (
                                    <SwiperSlide key={index}>
                                        <div className="skills-card">
                                            <img 
                                                src={imgSrc} 
                                                alt={item.heroTitle}
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
                                                }}
                                            />
                                            <div className="skills-card-gradient"></div>
                                            <div className="skills-floating-bottom">
                                                <span className="skills-card-title-text">{item.heroTitle}</span>
                                                <span className="skills-card-arrow-circle">→</span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
