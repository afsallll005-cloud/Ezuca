import Link from 'next/link';

export default function PricingGrid() {
    return (
        <section className="pricing-section" id="pricing-section">
            <div className="eductix-container">
                <div className="section-header text-center">
                    <span className="section-tagline">Investment In Your Growth</span>
                    <h2 className="section-title">Flexible Plans for Every Learner</h2>
                    <p className="section-desc">Choose a plan that fits your career goals and grow at your own pace with confidence.</p>
                </div>

                <div className="pricing-grid">
                    {/* Basic Plan */}
                    <div className="pricing-card standard">
                        <div className="pricing-header">
                            <h4 className="pricing-tier-name">Basic Plan</h4>
                            <div className="pricing-price-wrap">
                                <span className="pricing-amount">₹499</span>
                                <span className="pricing-period">/ month</span>
                            </div>
                            <p className="pricing-desc">Perfect for beginners starting their learning journey.</p>
                        </div>

                        <ul className="pricing-features-list">
                            <li><span className="pricing-check-icon">✓</span> Access to 5 foundation courses</li>
                            <li><span className="pricing-check-icon">✓</span> Community forum access</li>
                            <li><span className="pricing-check-icon">✓</span> Downloadable study resources</li>
                            <li><span className="pricing-check-icon">✓</span> Course completion certificates</li>
                            <li className="disabled"><span className="pricing-check-icon">✕</span> 1-on-1 mentor code reviews</li>
                            <li className="disabled"><span className="pricing-check-icon">✕</span> Dedicated career coaching</li>
                        </ul>

                        <Link href="/pricing" className="btn-eductix-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                            Get Started
                        </Link>
                    </div>

                    {/* Pro Plan (Featured) */}
                    <div className="pricing-card featured">
                        <div style={{ position: 'absolute', top: '-14px', right: '24px', background: '#ffffff', color: 'var(--eductix-emerald)', fontSize: '11.5px', fontWeight: 700, padding: '4px 14px', borderRadius: '20px', textTransform: 'uppercase' }}>
                            Most Popular
                        </div>

                        <div className="pricing-header">
                            <h4 className="pricing-tier-name">Pro Plan</h4>
                            <div className="pricing-price-wrap">
                                <span className="pricing-amount">₹999</span>
                                <span className="pricing-period">/ month</span>
                            </div>
                            <p className="pricing-desc">Best for learners who want full access, projects, and mentorship.</p>
                        </div>

                        <ul className="pricing-features-list">
                            <li><span className="pricing-check-icon">✓</span> Full access to all 120+ courses</li>
                            <li><span className="pricing-check-icon">✓</span> Hands-on real world portfolio projects</li>
                            <li><span className="pricing-check-icon">✓</span> Downloadable source code & templates</li>
                            <li><span className="pricing-check-icon">✓</span> Industry recognized certificates</li>
                            <li><span className="pricing-check-icon">✓</span> Monthly 1-on-1 mentor guidance</li>
                            <li><span className="pricing-check-icon">✓</span> Priority Q&A support</li>
                        </ul>

                        <Link href="/pricing" className="btn-eductix-primary" style={{ background: 'white', color: 'var(--eductix-forest)', width: '100%', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                            <span>Subscribe Pro</span>
                            <span className="icon-circle" style={{ background: 'var(--eductix-emerald)', color: 'white' }}>↗</span>
                        </Link>
                    </div>

                    {/* Team Plan */}
                    <div className="pricing-card standard">
                        <div className="pricing-header">
                            <h4 className="pricing-tier-name">Team Plan</h4>
                            <div className="pricing-price-wrap">
                                <span className="pricing-amount">₹2,499</span>
                                <span className="pricing-period">/ month</span>
                            </div>
                            <p className="pricing-desc">For small teams and startups looking to upskill developers together.</p>
                        </div>

                        <ul className="pricing-features-list">
                            <li><span className="pricing-check-icon">✓</span> Everything in Pro plan included</li>
                            <li><span className="pricing-check-icon">✓</span> Team admin & analytics dashboard</li>
                            <li><span className="pricing-check-icon">✓</span> Employee progress tracking</li>
                            <li><span className="pricing-check-icon">✓</span> Up to 5 team member seats</li>
                            <li><span className="pricing-check-icon">✓</span> Dedicated account manager</li>
                            <li><span className="pricing-check-icon">✓</span> Custom workshop assignments</li>
                        </ul>

                        <Link href="/pricing" className="btn-eductix-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
