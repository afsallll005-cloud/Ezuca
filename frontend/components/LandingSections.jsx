'use client';

import Link from 'next/link';
import { getImageUrl } from '../lib/api';

// 1. Hero Section
export function HeroSection() {
    return (
        <section className="eductix-hero" id="hero">
            <div className="eductix-ambient-canvas">
                <div className="eductix-glow-orb glow-orb-forest"></div>
                <div className="eductix-glow-orb glow-orb-emerald"></div>
                <div className="eductix-glow-orb glow-orb-purple"></div>
            </div>

            <div className="eductix-container">
                <div className="eductix-hero-grid">
                    {/* Left Column */}
                    <div className="eductix-hero-content">
                        <div className="pill-badge">
                            <span className="pill-dot"></span>
                            Built for real growth & careers
                        </div>

                        <h1 className="eductix-hero-title">
                            Build Skills That Shape Your Future
                        </h1>

                        <p className="eductix-hero-subtitle">
                            Practical online courses designed to help you gain real-world experience, master in-demand technology, and grow with confidence.
                        </p>

                        <div className="eductix-hero-cta-group">
                            <Link href="/#course-section" className="btn-eductix-primary">
                                <span>Explore Courses</span>
                                <span className="icon-circle">↗</span>
                            </Link>
                            <Link href="/pricing" className="btn-eductix-secondary">
                                <span>View Plans</span>
                            </Link>
                        </div>

                        <div className="eductix-feature-mini-card">
                            <div className="eductix-feature-mini-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                    <path d="M2 17l10 5 10-5"></path>
                                    <path d="M2 12l10 5 10-5"></path>
                                </svg>
                            </div>
                            <div className="eductix-feature-mini-text">
                                <h5>Follow Guided Paths</h5>
                                <p>Structured curriculum from beginner level to industry job-ready mastery.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Showcase */}
                    <div className="eductix-hero-visual">
                        <div className="showcase-card card-large">
                            <img 
                                src="/images/edubackground02.jpg" 
                                alt="Learning Experience"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80';
                                }}
                            />
                        </div>

                        <div className="showcase-card card-emerald">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="pill-badge" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', border: 'none', fontSize: '11px' }}>Best Choice</span>
                                <span style={{ fontSize: '18px' }}>★ ★ ★ ★ ★</span>
                            </div>
                            <p style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.4, color: '#fff' }}>
                                "Hands-on lessons that helped me apply skills right away in real projects."
                            </p>
                        </div>

                        <div className="showcase-card card-forest">
                            <div>
                                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#92b8a7', fontWeight: 700 }}>Curriculum</span>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginTop: '4px' }}>62+</h3>
                            </div>
                            <p style={{ fontSize: '13.5px', color: '#d0e6dc' }}>
                                Courses built around real-world projects and portfolio creation.
                            </p>
                        </div>

                        <div className="showcase-card card-col2-tall">
                            <img 
                                src="/images/edubackground01.jpg" 
                                alt="Interactive Classrooms"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80';
                                }}
                            />
                            <div className="overlay-text">
                                Interactive Classrooms & Live Mentorship
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 2. Ticker Marquee
export function TickerSection() {
    return (
        <section className="eductix-ticker-section">
            <p className="eductix-ticker-title">Trusted by learners and educators worldwide</p>
            <div className="eductix-ticker-track">
                <div className="ticker-item"><span className="ticker-dot"></span> Google Cloud Partner</div>
                <div className="ticker-item"><span className="ticker-dot"></span> Amazon AWS Certified</div>
                <div className="ticker-item"><span className="ticker-dot"></span> Microsoft Learn</div>
                <div className="ticker-item"><span className="ticker-dot"></span> Meta Developer Community</div>
                <div className="ticker-item"><span className="ticker-dot"></span> IBM SkillsBuild</div>
                <div className="ticker-item"><span className="ticker-dot"></span> Harvard edX Standards</div>
                <div className="ticker-item"><span className="ticker-dot"></span> Google Cloud Partner</div>
                <div className="ticker-item"><span className="ticker-dot"></span> Amazon AWS Certified</div>
                <div className="ticker-item"><span className="ticker-dot"></span> Microsoft Learn</div>
                <div className="ticker-item"><span className="ticker-dot"></span> Meta Developer Community</div>
            </div>
        </section>
    );
}

// 3. Stats Section
export function StatsSection() {
    return (
        <section className="eductix-stats-section" id="about">
            <div className="eductix-container">
                <div className="eductix-hero-grid" style={{ marginBottom: '60px' }}>
                    <div>
                        <span className="section-tagline">Why Ezuca</span>
                        <h2 className="section-title">Learning Built for Real Careers</h2>
                        <p className="section-desc">
                            Ezuca is a modern online learning platform focused on practical, skill-based education. We bridge the gap between academic theory and market requirements.
                        </p>
                        <div style={{ marginTop: '32px' }}>
                            <Link href="/#program-section" className="btn-eductix-primary">
                                <span>Explore Programs</span>
                                <span className="icon-circle">↗</span>
                            </Link>
                        </div>
                    </div>

                    <div style={{ position: 'relative', height: '380px', borderRadius: 'var(--radius-card)', overflow: 'hidden', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <img 
                            src="/images/edubackground03.jpg" 
                            alt="Student Success" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80';
                            }}
                        />

                        {/* Floating Badges */}
                        <div style={{ position: 'absolute', top: '30px', left: '30px', transform: 'rotate(-4deg)', background: 'var(--eductix-card-mint)', padding: '8px 18px', borderRadius: '50px', fontWeight: 600, color: 'var(--eductix-forest)', boxShadow: '0 8px 24px rgba(0,59,45,0.08)' }}>
                            Digital Marketing
                        </div>
                        <div style={{ position: 'absolute', top: '140px', right: '30px', transform: 'rotate(5deg)', background: 'var(--eductix-emerald)', color: '#fff', padding: '8px 18px', borderRadius: '50px', fontWeight: 600 }}>
                            Web Development
                        </div>
                        <div style={{ position: 'absolute', bottom: '90px', left: '40px', transform: 'rotate(-2deg)', background: 'var(--eductix-card-mint)', padding: '8px 18px', borderRadius: '50px', fontWeight: 600, color: 'var(--eductix-forest)' }}>
                            Data Analytics
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="eductix-stats-box">
                    <div className="stat-item">
                        <div className="stat-number">95%</div>
                        <div className="stat-label">Learner Satisfaction</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">120+</div>
                        <div className="stat-label">Courses Available</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">30K+</div>
                        <div className="stat-label">Active Learners</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Countries Reached</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 4. Programs Grid
export function ProgramsSection() {
    return (
        <section className="eductix-section" id="program-section">
            <div className="eductix-container">
                <div className="section-header">
                    <span className="section-tagline">Pathways to Success</span>
                    <h2 className="section-title">Explore Career-Focused Programs</h2>
                    <p className="section-desc">Choose from expertly designed tracks built around high-impact, real-world skills.</p>
                </div>

                <div className="programs-grid">
                    <div className="program-card-wrap">
                        <div className="program-card-inner">
                            <div className="program-icon-badge">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                                </svg>
                            </div>
                            <div className="program-content">
                                <h4>Digital Marketing</h4>
                                <p>Master SEO, performance marketing, paid ads, content strategy, and analytics for hyper growth.</p>
                            </div>
                            <Link href="/#course-section" className="btn-eductix-outline" style={{ alignSelf: 'flex-start' }}>Explore Courses →</Link>
                        </div>
                    </div>

                    <div className="program-card-wrap">
                        <div className="program-card-inner">
                            <div className="program-icon-badge" style={{ background: 'var(--eductix-forest)' }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                            </div>
                            <div className="program-content">
                                <h4>Web Development</h4>
                                <p>Build modern frontend apps, robust backend APIs, scalable databases, and fullstack cloud architectures.</p>
                            </div>
                            <Link href="/#course-section" className="btn-eductix-outline" style={{ alignSelf: 'flex-start' }}>Explore Courses →</Link>
                        </div>
                    </div>

                    <div className="program-card-wrap">
                        <div className="program-card-inner">
                            <div className="program-icon-badge">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="20" x2="18" y2="10"></line>
                                    <line x1="12" y1="20" x2="12" y2="4"></line>
                                    <line x1="6" y1="20" x2="6" y2="14"></line>
                                </svg>
                            </div>
                            <div className="program-content">
                                <h4>Data & AI Analytics</h4>
                                <p>Transform raw datasets into actionable insights with Python, SQL, PowerBI, and cutting-edge machine learning.</p>
                            </div>
                            <Link href="/#course-section" className="btn-eductix-outline" style={{ alignSelf: 'flex-start' }}>Explore Courses →</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 5. Outcomes Section
export function OutcomesSection() {
    return (
        <section className="outcomes-grid-section" id="feature-section">
            <div className="eductix-container">
                <div className="section-header text-center">
                    <span className="section-tagline">Why Choose Us</span>
                    <h2 className="section-title">Skills That Prepare You for Real Opportunities</h2>
                    <p className="section-desc">Our programs are designed to help you build practical knowledge, apply real-world skills, and grow with confidence.</p>
                </div>

                <div className="outcomes-container">
                    <div className="outcomes-col">
                        <div className="outcome-pill mint">Structured, Ready-To-Use Curriculum</div>
                        <div className="outcome-pill mint">Hands-On Project Experience</div>
                        <div className="outcome-pill mint">Real-World Case Studies</div>
                        <div className="outcome-pill mint">Performance Tracking & Feedback</div>
                        <div className="outcome-pill mint">Flexible Learning Schedule</div>
                        <div className="outcome-pill mint">Career-Focused Assignments</div>
                    </div>

                    <div className="outcomes-timeline">
                        <div className="timeline-dot"></div>
                        <div className="timeline-line"></div>
                        <div className="timeline-dot"></div>
                        <div className="timeline-line"></div>
                        <div className="timeline-dot"></div>
                        <div className="timeline-line"></div>
                        <div className="timeline-dot"></div>
                    </div>

                    <div className="outcomes-col">
                        <div className="outcome-pill emerald">Practical, Skill-Based Training</div>
                        <div className="outcome-pill emerald">Industry-Relevant Skills Training</div>
                        <div className="outcome-pill emerald">Clear Goals & Progress Milestones</div>
                        <div className="outcome-pill emerald">Industry-Relevant Knowledge</div>
                        <div className="outcome-pill emerald">Learn at Your Own Pace</div>
                        <div className="outcome-pill emerald">Job-Ready Confidence</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 6. Testimonials Section
export function TestimonialsSection({ reviews = [] }) {
    return (
        <section className="testimonials-section" id="testimonial-section">
            <div className="eductix-container">
                <div className="section-header text-center">
                    <span className="section-tagline">Student Reviews</span>
                    <h2 className="section-title">What Our Learners Say</h2>
                    <p className="section-desc">Real feedback from students and professionals who completed courses on Ezuca.</p>
                </div>

                <div className="testimonials-grid">
                    {reviews.map((item, idx) => (
                        <div key={idx} className="testimonial-card-eductix">
                            <div className="testimonial-quote-icon">“</div>
                            <p className="testimonial-text">
                                "{item.review}"
                            </p>
                            <div className="testimonial-student-row">
                                <img 
                                    src={getImageUrl(item.studentImage || item.Image, '/images/userProfile.png')} 
                                    alt={item.studentName || item.Name || 'Student'} 
                                    className="student-avatar"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';
                                    }}
                                />
                                <div className="student-info">
                                    <h5>{item.studentName}</h5>
                                    <p>{item.courseName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 7. Bottom CTA Banner
export function CtaBannerSection() {
    return (
        <section className="cta-banner-section">
            <div className="eductix-container">
                <div className="cta-banner-box">
                    <div>
                        <h2 className="cta-banner-title">Start Your Learning Journey Today</h2>
                        <p className="cta-banner-desc">Join thousands of learners building real-world skills and growing their careers with confidence.</p>
                    </div>
                    <Link href="/#course-section" className="btn-eductix-primary" style={{ background: 'white', color: 'var(--eductix-forest)', flexShrink: 0, padding: '16px 32px', fontSize: '16px' }}>
                        <span>Explore Courses</span>
                        <span className="icon-circle" style={{ background: 'var(--eductix-emerald)', color: 'white' }}>↗</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
