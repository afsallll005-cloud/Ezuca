'use client';

import { useState } from 'react';
import Link from 'next/link';

const FAQS = [
    {
        q: "Who can enroll in courses?",
        a: "Anyone interested in building practical skills can enroll. Our courses are beginner-friendly, structured from foundational concepts up to advanced production standards."
    },
    {
        q: "Do I get a certificate after completion?",
        a: "Yes! Every student who successfully finishes the curriculum and submits the project assessments receives a digitally verifiable certificate of completion."
    },
    {
        q: "Do I get lifetime access to the courses?",
        a: "Yes. Once you purchase or enroll in a course, you get lifetime access to all video lessons, code repositories, resources, and future course updates."
    },
    {
        q: "Are the courses beginner friendly?",
        a: "Absolutely. We do not assume any prior technical background for introductory tracks. Each course begins with fundamentals before progressing into hands-on code."
    }
];

export default function FaqAccordion() {
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <section className="faq-section" id="faq-section">
            <div className="eductix-container">
                <div className="faq-layout">
                    <div>
                        <span className="section-tagline">Got Questions?</span>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                        <p className="section-desc" style={{ marginBottom: '24px' }}>
                            Everything you need to know about our courses, certifications, and career outcomes.
                        </p>
                        <Link href="/pricing" className="btn-eductix-primary">
                            <span>Contact Support</span>
                            <span className="icon-circle">↗</span>
                        </Link>
                    </div>

                    <div className="accordion-list">
                        {FAQS.map((item, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div key={idx} className={`accordion-item ${isOpen ? 'active' : ''}`}>
                                    <button 
                                        className="accordion-header"
                                        onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                                    >
                                        <span>{item.q}</span>
                                        <span className="accordion-icon">+</span>
                                    </button>
                                    {isOpen && (
                                        <div className="accordion-body">
                                            {item.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
