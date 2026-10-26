'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCart } from '../lib/api';

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    const fetchCartCount = () => {
        getCart()
            .then((res) => {
                if (res && res.count !== undefined) {
                    setCartCount(res.count);
                }
            })
            .catch(() => {});
    };

    useEffect(() => {
        fetchCartCount();

        // Listen for storage or custom cart events
        const handleCartUpdate = () => fetchCartCount();
        window.addEventListener('cart-updated', handleCartUpdate);
        window.addEventListener('focus', handleCartUpdate);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('focus', handleCartUpdate);
        };
    }, []);

    // Scroll state for elevation & backdrop styling
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on pathname change
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    // Close mobile menu on resize past 1024px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setIsMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent background scroll when mobile drawer is open & handle Esc key
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMobileOpen) {
                setIsMobileOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMobileOpen]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = searchQuery.trim();
        setIsMobileOpen(false);
        if (query) {
            router.push(`/#course-section?search=${encodeURIComponent(query)}`);
        } else {
            router.push('/#course-section');
        }
    };

    return (
        <>
            {/* Offer / Announcement Bar */}
            <aside className="eductix-offer-bar" aria-label="Announcement">
                <div className="eductix-offer-content">
                    <span className="badge">New</span>
                    <span className="offer-text">Build in-demand skills with practical online courses & verified certificates.</span>
                    <Link href="/#course-section" className="offer-link">
                        Explore Now →
                    </Link>
                </div>
            </aside>

            {/* Navigation Header */}
            <header className={`eductix-nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
                <nav className="eductix-nav" aria-label="Main Navigation">
                    {/* Brand */}
                    <Link href="/" className="eductix-brand" onClick={() => setIsMobileOpen(false)}>
                        Ezuca<span className="brand-dot"></span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <ul className="eductix-nav-links">
                        <li>
                            <Link href="/" className={pathname === '/' ? 'active' : ''}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/#course-section">Courses</Link>
                        </li>
                        <li>
                            <Link href="/#program-section">Programs</Link>
                        </li>
                        <li>
                            <Link href="/#work-section">Why Us</Link>
                        </li>
                        <li>
                            <Link href="/pricing" className={pathname === '/pricing' ? 'active' : ''}>
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="/#faq-section">FAQ</Link>
                        </li>
                        <li>
                            <Link href="/admin" className={pathname.startsWith('/admin') ? 'active' : ''} style={{ color: 'var(--eductix-emerald)', fontWeight: 600 }}>
                                Admin
                            </Link>
                        </li>
                    </ul>

                    {/* Desktop Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="eductix-search-pill" role="search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search courses"
                        />
                    </form>

                    {/* Actions */}
                    <div className="eductix-nav-actions">
                        {/* Cart Button */}
                        <Link href="/cart" className="eductix-icon-btn" title="View Cart" aria-label={`View Cart with ${cartCount} items`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
                        </Link>

                        {/* Profile Button (Desktop & Tablet) */}
                        <Link href="/profile" className="eductix-icon-btn eductix-profile-btn" title="User Profile" aria-label="User Profile">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </Link>

                        {/* Desktop Log In Button */}
                        <Link href="/login" className="btn-eductix-outline eductix-desktop-only">
                            Log in
                        </Link>

                        {/* Desktop Explore Button */}
                        <Link href="/#course-section" className="btn-eductix-primary eductix-desktop-only">
                            <span>Explore</span>
                            <span className="icon-circle">↗</span>
                        </Link>

                        {/* Mobile Hamburger Toggle Button */}
                        <button
                            type="button"
                            className={`eductix-mobile-toggle ${isMobileOpen ? 'is-active' : ''}`}
                            onClick={() => setIsMobileOpen((prev) => !prev)}
                            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={isMobileOpen}
                        >
                            <span className="hamburger-line line-1"></span>
                            <span className="hamburger-line line-2"></span>
                            <span className="hamburger-line line-3"></span>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Backdrop Overlay */}
            <div
                className={`eductix-mobile-backdrop ${isMobileOpen ? 'is-open' : ''}`}
                onClick={() => setIsMobileOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Slide-out Drawer Panel */}
            <aside
                className={`eductix-mobile-drawer ${isMobileOpen ? 'is-open' : ''}`}
                aria-label="Mobile Navigation Drawer"
                aria-hidden={!isMobileOpen}
            >
                {/* Drawer Header */}
                <div className="mobile-drawer-header">
                    <Link href="/" className="eductix-brand" onClick={() => setIsMobileOpen(false)}>
                        Ezuca<span className="brand-dot"></span>
                    </Link>
                    <button
                        type="button"
                        className="drawer-close-btn"
                        onClick={() => setIsMobileOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="mobile-drawer-search" role="search">
                    <div className="mobile-search-pill">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search courses, mentors..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search courses in mobile menu"
                        />
                        <button type="submit" className="search-submit-btn" aria-label="Submit search">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Navigation Links */}
                <div className="mobile-drawer-content">
                    <div className="mobile-nav-group">
                        <span className="mobile-group-title">Main Menu</span>
                        <ul className="mobile-nav-list">
                            <li>
                                <Link href="/" onClick={() => setIsMobileOpen(false)} className={pathname === '/' ? 'active' : ''}>
                                    <span className="nav-item-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    </span>
                                    <span className="nav-item-text">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#course-section" onClick={() => setIsMobileOpen(false)}>
                                    <span className="nav-item-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10"></path><path d="M6 10h10"></path></svg>
                                    </span>
                                    <span className="nav-item-text">Courses</span>
                                    <span className="nav-item-pill">Popular</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#program-section" onClick={() => setIsMobileOpen(false)}>
                                    <span className="nav-item-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    </span>
                                    <span className="nav-item-text">Programs</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#work-section" onClick={() => setIsMobileOpen(false)}>
                                    <span className="nav-item-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                                    </span>
                                    <span className="nav-item-text">Why Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" onClick={() => setIsMobileOpen(false)} className={pathname === '/pricing' ? 'active' : ''}>
                                    <span className="nav-item-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                                    </span>
                                    <span className="nav-item-text">Pricing</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#faq-section" onClick={() => setIsMobileOpen(false)}>
                                    <span className="nav-item-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                    </span>
                                    <span className="nav-item-text">FAQ</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin" onClick={() => setIsMobileOpen(false)} className={`admin-link ${pathname.startsWith('/admin') ? 'active' : ''}`}>
                                    <span className="nav-item-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
                                    </span>
                                    <span className="nav-item-text">Admin Portal</span>
                                    <span className="nav-admin-badge">Staff</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="mobile-nav-group">
                        <span className="mobile-group-title">User Account</span>
                        <ul className="mobile-nav-list">
                            <li>
                                <Link href="/profile" onClick={() => setIsMobileOpen(false)} className={pathname === '/profile' ? 'active' : ''}>
                                    <span className="nav-item-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    </span>
                                    <span className="nav-item-text">My Profile & Enrolled</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" onClick={() => setIsMobileOpen(false)} className={pathname === '/cart' ? 'active' : ''}>
                                    <span className="nav-item-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                    </span>
                                    <span className="nav-item-text">Shopping Cart</span>
                                    {cartCount > 0 && <span className="badge-count-inline">{cartCount}</span>}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="mobile-drawer-footer">
                    <Link href="/login" onClick={() => setIsMobileOpen(false)} className="btn-eductix-outline full-width">
                        Log in
                    </Link>
                    <Link href="/#course-section" onClick={() => setIsMobileOpen(false)} className="btn-eductix-primary full-width">
                        <span>Explore Courses</span>
                        <span className="icon-circle">↗</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
