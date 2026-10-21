'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCart } from '../lib/api';

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        getCart().then(res => {
            if (res && res.count !== undefined) {
                setCartCount(res.count);
            }
        }).catch(() => {});
    }, []);

    return (
        <>
            {/* Offer Bar */}
            <div className="eductix-offer-bar">
                <span className="badge">New</span>
                <span>Build in-demand skills with practical online courses & verified certificates.</span>
                <Link href="/#course-section" style={{ textDecoration: 'underline', color: '#fff', fontWeight: 600 }}>
                    Explore Now →
                </Link>
            </div>

            {/* Navigation Header */}
            <header className="eductix-nav-wrapper">
                <nav className="eductix-nav">
                    <Link href="/" className="eductix-brand">
                        Ezuca<span className="brand-dot"></span>
                    </Link>

                    <ul className="eductix-nav-links">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/#course-section">Courses</Link></li>
                        <li><Link href="/#program-section">Programs</Link></li>
                        <li><Link href="/#work-section">Why Us</Link></li>
                        <li><Link href="/pricing">Pricing</Link></li>
                        <li><Link href="/#faq-section">FAQ</Link></li>
                        <li><Link href="/admin" style={{ color: 'var(--eductix-emerald)', fontWeight: 600 }}>Admin</Link></li>
                    </ul>

                    {/* Search Bar */}
                    <div className="eductix-search-pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" placeholder="Search courses..." />
                    </div>

                    {/* Actions */}
                    <div className="eductix-nav-actions">
                        <Link href="/cart" className="eductix-icon-btn" title="View Cart">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
                        </Link>

                        <Link href="/profile" className="eductix-icon-btn" title="User Profile">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </Link>

                        <Link href="/login" className="btn-eductix-outline">
                            Log in
                        </Link>

                        <Link href="/#course-section" className="btn-eductix-primary">
                            <span>Explore</span>
                            <span className="icon-circle">↗</span>
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    );
}
