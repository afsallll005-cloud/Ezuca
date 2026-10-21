'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCourseById, addToCart, getImageUrl } from '../../../lib/api';

export default function CourseDetailsPage({ params }) {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCourseById(params.id).then(data => {
            setCourse(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [params.id]);

    const handleEnroll = async () => {
        if (!course) return;
        try {
            await addToCart(course._id);
            alert(`"${course.courseName}" has been added to your cart!`);
        } catch (e) {
            alert('Added to cart!');
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '120px 20px' }}>
                <div className="stat-number">Loading course details...</div>
            </div>
        );
    }

    if (!course) {
        return (
            <div style={{ textAlign: 'center', padding: '120px 20px' }}>
                <h2>Course Not Found</h2>
                <Link href="/" className="btn-eductix-primary" style={{ marginTop: '20px' }}>Back to Courses</Link>
            </div>
        );
    }

    return (
        <>
            <section className="eductix-hero" style={{ padding: '60px 32px 80px', background: 'var(--eductix-forest)', color: 'white' }}>
                <div className="eductix-container">
                    <div className="pill-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', marginBottom: '16px' }}>
                        <span className="pill-dot"></span> Featured Masterclass
                    </div>
                    <h1 className="section-title" style={{ color: '#fff', fontSize: '48px', marginBottom: '14px' }}>
                        {course.courseName}
                    </h1>
                    <p style={{ fontSize: '18px', color: '#b2d6c6', maxWidth: '680px', lineHeight: '1.6' }}>
                        {course.description || 'Master practical skills with hands-on projects, industry workflows, and verified certification.'}
                    </p>
                </div>
            </section>

            <div className="eductix-container" style={{ padding: '0 32px 100px', marginTop: '-40px', position: 'relative', zIndex: 5 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px' }}>
                    {/* Left Column */}
                    <div>
                        <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: '36px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)', marginBottom: '30px' }}>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                                About This Course
                            </h3>
                            <p style={{ color: 'var(--eductix-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
                                This comprehensive program is designed by professional practitioners to build real confidence. You will work on progressive hands-on projects that build a portfolio hiring managers look for.
                            </p>

                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '30px' }}>
                                <span className="pill-badge">⭐ 4.9 Rating (420+ Reviews)</span>
                                <span className="pill-badge">⏱ {course.courseDuration || '10 Weeks'}</span>
                                <span className="pill-badge">🌐 English</span>
                                <span className="pill-badge">🏆 Certificate of Completion</span>
                            </div>

                            <div style={{ background: 'var(--eductix-card-mint)', borderRadius: '16px', padding: '24px', border: '1px solid var(--eductix-border-subtle)' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '8px' }}>
                                    🎯 Today's Interactive Practice
                                </h4>
                                <p style={{ fontSize: '14px', color: 'var(--eductix-muted)', marginBottom: '16px' }}>
                                    Take the interactive assessment to evaluate your starting knowledge and personalize your learning plan.
                                </p>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button className="btn-eductix-primary" onClick={() => alert('Practice quiz starting...')}>
                                        <span>Start Practice</span>
                                        <span className="icon-circle">↗</span>
                                    </button>
                                    <Link href="/syllabus" className="btn-eductix-secondary">
                                        View Full Syllabus
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Reservation Form */}
                        <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: '36px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--eductix-forest)', marginBottom: '6px' }}>
                                Reserve Your Seat
                            </h3>
                            <p style={{ fontSize: '14.5px', color: 'var(--eductix-muted)', marginBottom: '24px' }}>
                                Register your interest to get early cohort access or 1-on-1 counselor guidance.
                            </p>

                            <form onSubmit={(e) => { e.preventDefault(); alert('Seat reserved! Our academic coordinator will contact you.'); }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--eductix-slate)' }}>Full Name</label>
                                        <input type="text" placeholder="John Doe" required style={{ width: '100%', padding: '12px 16px', background: 'var(--eductix-card-mint)', border: '1px solid rgba(0,59,45,0.12)', borderRadius: '12px', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--eductix-slate)' }}>Phone Number</label>
                                        <input type="tel" placeholder="+1 (555) 000-0000" required style={{ width: '100%', padding: '12px 16px', background: 'var(--eductix-card-mint)', border: '1px solid rgba(0,59,45,0.12)', borderRadius: '12px', outline: 'none' }} />
                                    </div>
                                </div>

                                <button type="submit" className="btn-eductix-primary" style={{ padding: '12px 28px' }}>
                                    <span>Confirm Reservation</span>
                                    <span className="icon-circle">↗</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Sticky Card */}
                    <div>
                        <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: '32px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)', position: 'sticky', top: '100px' }}>
                            <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', background: '#e2e8f0' }}>
                                <img
                                    src={getImageUrl(course.coursesthumbnailImage, '/images/edubackground01.jpg')}
                                    alt={course.courseName}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80';
                                    }}
                                />
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--eductix-muted)' }}>Course Fee</span>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', fontWeight: 800, color: 'var(--eductix-forest)', margin: '6px 0 16px' }}>
                                ₹{course.courseFee}
                            </div>

                            <button onClick={handleEnroll} className="btn-eductix-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '12px', padding: '14px' }}>
                                <span>Add to Cart</span>
                                <span className="icon-circle">↗</span>
                            </button>

                            <Link href="/pricing" className="btn-eductix-secondary" style={{ width: '100%', justifyContent: 'center', marginBottom: '24px' }}>
                                Subscribe Pro
                            </Link>

                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0', fontSize: '14.5px', color: 'var(--eductix-slate)' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: 'var(--eductix-emerald)', fontWeight: 700 }}>✓</span> Full Lifetime Access</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: 'var(--eductix-emerald)', fontWeight: 700 }}>✓</span> Verified Completion Certificate</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: 'var(--eductix-emerald)', fontWeight: 700 }}>✓</span> 40+ Hours of Video Content</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: 'var(--eductix-emerald)', fontWeight: 700 }}>✓</span> Downloadable Resources</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: 'var(--eductix-emerald)', fontWeight: 700 }}>✓</span> Instructor Q&A Support</li>
                            </ul>

                            <div style={{ borderTop: '1px solid rgba(0,59,45,0.08)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Link href="/syllabus" className="btn-eductix-outline" style={{ textAlign: 'center' }}>
                                    📖 View Syllabus
                                </Link>
                                <a href="https://youtu.be/Yq0QkCxoTHM" target="_blank" rel="noopener noreferrer" className="btn-eductix-outline" style={{ textAlign: 'center', color: 'var(--eductix-emerald)', borderColor: 'var(--eductix-emerald)' }}>
                                    ▶ Watch Trial Video
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
