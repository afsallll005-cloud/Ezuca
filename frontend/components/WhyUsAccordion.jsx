'use client';

import { useState } from 'react';

const ACCORDION_DATA = [
    {
        title: "01. Expert Mentors",
        body: "Learn directly from industry professionals with battle-tested experience who review your work, host Q&A sessions, and guide you step-by-step."
    },
    {
        title: "02. Hands-On Real World Projects",
        body: "Build real software, launch marketing campaigns, and analyze actual data sets. Graduate with a production-ready portfolio that impresses hiring managers."
    },
    {
        title: "03. Career-Focused Curriculum",
        body: "Our syllabus is regularly refreshed alongside industry leaders to ensure you are always learning the tools and frameworks modern companies use right now."
    },
    {
        title: "04. Recognized Certificates",
        body: "Earn verifiable credentials upon project completion to showcase on LinkedIn, your resume, and portfolio to stand out from the competition."
    }
];

export default function WhyUsAccordion() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="eductix-section" id="work-section" style={{ padding: '100px 32px' }}>
            <div className="eductix-container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    {/* Visual Card */}
                    <div style={{ height: '460px', borderRadius: 'var(--radius-card)', overflow: 'hidden', boxShadow: 'var(--eductix-card-shadow-hover)', background: 'var(--eductix-forest)' }}>
                        <img 
                            src="http://localhost:3500/images/edubackground02.jpg" 
                            alt="Learners Outcome" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80';
                            }}
                        />
                    </div>

                    {/* Accordion List */}
                    <div>
                        <span className="section-tagline">Outcome Driven</span>
                        <h2 className="section-title">Built for Learners, Driven by Outcomes</h2>
                        <p className="section-desc" style={{ marginBottom: '32px' }}>
                            Every module is structured around practical applications, portfolio projects, and direct career readiness.
                        </p>

                        <div className="accordion-list">
                            {ACCORDION_DATA.map((item, idx) => {
                                const isActive = activeIndex === idx;
                                return (
                                    <div key={idx} className={`accordion-item ${isActive ? 'active' : ''}`}>
                                        <button 
                                            className="accordion-header"
                                            onClick={() => setActiveIndex(isActive ? -1 : idx)}
                                        >
                                            <span>{item.title}</span>
                                            <span className="accordion-icon">+</span>
                                        </button>
                                        {isActive && (
                                            <div className="accordion-body">
                                                {item.body}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
