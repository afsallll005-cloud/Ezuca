'use client';

import Link from 'next/link';

const MODULES = [
    {
        title: "Module 01: Modern HTML5 & CSS3 Architecture",
        time: "Week 1–2",
        topics: [
            "Semantic HTML5 Architecture",
            "Advanced CSS Grid & Flexbox Layouts",
            "Responsive Mobile-First Design",
            "Design Tokens, Variables & Custom Properties"
        ]
    },
    {
        title: "Module 02: JavaScript & Modern ES6+ Mastery",
        time: "Week 3–5",
        topics: [
            "Async/Await, Promises & Fetch API",
            "DOM Manipulation & Interactive Event Systems",
            "Closures, Prototypes & OOP Principles",
            "Live Interactive Capstone Project"
        ]
    },
    {
        title: "Module 03: Modern Frontend with React & Next.js",
        time: "Week 6–8",
        topics: [
            "React 18/19 Component Architecture & Hooks",
            "Next.js App Router, SSR, SSG & Server Components",
            "Global State Management & Data Caching",
            "Performance Optimization & SEO Best Practices"
        ]
    },
    {
        title: "Module 04: Backend Engineering with Express & MongoDB",
        time: "Week 9–12",
        topics: [
            "Node.js Runtime & Express.js REST APIs",
            "MongoDB Database Modeling & Mongoose Schemas",
            "JWT Authentication, Multer Uploads & Security",
            "Vercel Cloud Deployment & Production CI/CD"
        ]
    }
];

export default function SyllabusPage() {
    return (
        <div className="eductix-container" style={{ maxWidth: '960px', margin: '40px auto 80px', padding: '0 20px' }}>
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '48px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                <div className="pill-badge" style={{ marginBottom: '16px' }}>
                    <span className="pill-dot"></span> Full Curriculum Roadmap
                </div>

                <h1 className="section-title" style={{ fontSize: '36px', marginBottom: '8px' }}>
                    Full Stack Web & AI Development Syllabus
                </h1>

                <p style={{ color: 'var(--eductix-muted)', fontSize: '16px', marginBottom: '36px' }}>
                    A comprehensive, industry-aligned breakdown of every module, project, and milestone you will master.
                </p>

                {MODULES.map((mod, idx) => (
                    <div key={idx} style={{ border: '1px solid var(--eductix-border-card)', borderRadius: '16px', marginBottom: '20px', overflow: 'hidden', background: 'var(--eductix-card-mint)' }}>
                        <div style={{ background: 'var(--eductix-forest)', color: 'white', padding: '16px 24px', fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>{mod.title}</span>
                            <span style={{ fontSize: '13px', opacity: 0.8 }}>{mod.time}</span>
                        </div>
                        <ul style={{ padding: '20px 24px', listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                            {mod.topics.map((t, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14.5px', color: 'var(--eductix-slate)' }}>
                                    <span style={{ color: 'var(--eductix-emerald)', fontWeight: 700 }}>✓</span> {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div style={{ marginTop: '36px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <button onClick={() => alert('Downloading official curriculum PDF...')} className="btn-eductix-primary">
                        <span>Download Full Syllabus PDF</span>
                        <span className="icon-circle">↓</span>
                    </button>
                    <Link href="/#course-section" className="btn-eductix-secondary">
                        Browse Courses
                    </Link>
                </div>
            </div>
        </div>
    );
}
