'use client';

import { useState } from 'react';
import CourseCard from './CourseCard';

export default function CourseCatalog({ initialCourses = [] }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { id: 'all', label: 'All Courses' },
        { id: 'web', label: 'Web & Software' },
        { id: 'data', label: 'Data & AI' },
        { id: 'design', label: 'UI/UX Design' },
        { id: 'marketing', label: 'Marketing' }
    ];

    const filteredCourses = initialCourses.filter(course => {
        const matchesCategory = selectedCategory === 'all' || 
            (course.courseCategory && course.courseCategory.toLowerCase().includes(selectedCategory)) ||
            (course.courseName && course.courseName.toLowerCase().includes(selectedCategory));

        const matchesSearch = !searchTerm || 
            (course.courseName && course.courseName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (course.Instructor && course.Instructor.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    return (
        <section className="eductix-section" id="course-section">
            <div className="eductix-container">
                <div className="section-header text-center">
                    <span className="section-tagline">Explore Our Curriculum</span>
                    <h2 className="section-title">Skills to Transform Your Career & Life</h2>
                    <p className="section-desc">From critical engineering skills to business strategies, support your professional development with verified mentorship.</p>
                </div>

                {/* Filter and Search Bar */}
                <div className="category-filter-bar">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Courses Grid */}
                <div className="courses-grid">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <CourseCard key={course._id} course={course} />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: 'var(--radius-card)' }}>
                            <p style={{ fontSize: '18px', color: 'var(--eductix-muted)' }}>No courses matching your criteria. Try another filter or search!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
