'use client';

import Link from 'next/link';

export default function Footer() {
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="eductix-footer">
            <div className="eductix-container">
                <div className="eductix-footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <h3>Ezuca<span style={{ color: 'var(--eductix-emerald)' }}>.</span></h3>
                        <p>Build Skills. Build Your Future. A conversion-focused education ecosystem designed for ambitious learners worldwide.</p>
                        <div className="social-pills-row">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" title="Twitter / X">𝕏</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" title="LinkedIn">in</a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" title="Facebook">f</a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" title="YouTube">▶</a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="footer-col">
                        <h5>Navigation</h5>
                        <ul className="footer-links">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/#course-section">Courses</Link></li>
                            <li><Link href="/#program-section">Programs</Link></li>
                            <li><Link href="/#work-section">Why Us</Link></li>
                            <li><Link href="/pricing">Pricing</Link></li>
                            <li><Link href="/#faq-section">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-col">
                        <h5>Categories</h5>
                        <ul className="footer-links">
                            <li><Link href="/#course-section">Web Development</Link></li>
                            <li><Link href="/#course-section">Data Analytics</Link></li>
                            <li><Link href="/#course-section">UI/UX Design</Link></li>
                            <li><Link href="/#course-section">Cloud & DevOps</Link></li>
                            <li><Link href="/#course-section">Digital Marketing</Link></li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div className="footer-col">
                        <h5>Account & Portals</h5>
                        <ul className="footer-links">
                            <li><Link href="/login">Student Login</Link></li>
                            <li><Link href="/signup">Register Account</Link></li>
                            <li><Link href="/cart">Shopping Cart</Link></li>
                            <li><Link href="/profile">My Profile</Link></li>
                            <li><Link href="/pricing">Pro Subscription</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="eductix-footer-bottom">
                    <p>© 2026 Ezuca / Eductix. All rights reserved. Crafted for real careers and growth.</p>
                    <button onClick={scrollToTop} className="btn-back-to-top">
                        <span>Back To Top</span>
                        <span>↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
