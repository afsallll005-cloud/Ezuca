'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCourses, getDeletedCourses, deleteCourse, restoreCourse, getImageUrl } from '../../../lib/api';

export default function AdminAllCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [deletedCourses, setDeletedCourses] = useState([]);
    const [viewMode, setViewMode] = useState('active'); // 'active' or 'trash'
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const [active, deleted] = await Promise.all([
                getCourses(),
                getDeletedCourses()
            ]);
            setCourses(active);
            setDeletedCourses(deleted);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to move this course to trash?")) return;
        try {
            await deleteCourse(id);
            loadData();
        } catch (e) {
            alert("Error deleting course");
        }
    };

    const handleRestore = async (id) => {
        try {
            await restoreCourse(id);
            loadData();
        } catch (e) {
            alert("Error restoring course");
        }
    };

    const currentList = viewMode === 'active' ? courses : deletedCourses;
    const filteredList = currentList.filter(c => 
        (c.courseName && c.courseName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.courseId && c.courseId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.Instructor && c.Instructor.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--eductix-forest)', margin: 0 }}>
                        {viewMode === 'active' ? 'Course Catalog Management' : 'Trash Bin (Deleted Courses)'}
                    </h1>
                    <p style={{ color: 'var(--eductix-muted)', fontSize: '14px', marginTop: '4px' }}>
                        View, search, edit, or remove curriculum courses.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ display: 'inline-flex', background: '#e2e8f0', padding: '4px', borderRadius: '10px' }}>
                        <button
                            onClick={() => setViewMode('active')}
                            style={{
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '8px',
                                background: viewMode === 'active' ? '#fff' : 'transparent',
                                color: viewMode === 'active' ? 'var(--eductix-forest)' : '#64748b',
                                fontWeight: 600,
                                fontSize: '13px',
                                cursor: 'pointer'
                            }}
                        >
                            Active ({courses.length})
                        </button>
                        <button
                            onClick={() => setViewMode('trash')}
                            style={{
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '8px',
                                background: viewMode === 'trash' ? '#fff' : 'transparent',
                                color: viewMode === 'trash' ? '#dc2626' : '#64748b',
                                fontWeight: 600,
                                fontSize: '13px',
                                cursor: 'pointer'
                            }}
                        >
                            Trash ({deletedCourses.length})
                        </button>
                    </div>

                    <Link href="/admin/add-course" className="btn-eductix-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                        <span>+ Add Course</span>
                    </Link>
                </div>
            </div>

            {/* Filter Search */}
            <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--eductix-border-card)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '18px' }}>🔍</span>
                <input
                    type="text"
                    placeholder="Search by course title, ID or instructor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px' }}
                />
            </div>

            {/* Courses Table */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: 'var(--eductix-muted)', fontWeight: 600 }}>
                            <th style={{ padding: '16px 20px' }}>Course</th>
                            <th style={{ padding: '16px 20px' }}>Course ID</th>
                            <th style={{ padding: '16px 20px' }}>Category</th>
                            <th style={{ padding: '16px 20px' }}>Fee</th>
                            <th style={{ padding: '16px 20px' }}>Instructor</th>
                            <th style={{ padding: '16px 20px' }}>Level</th>
                            <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.length > 0 ? (
                            filteredList.map((course) => {
                                const imgSrc = getImageUrl(course.coursesthumbnailImage, '/images/edubackground01.jpg');

                                return (
                                    <tr key={course._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', background: '#e2e8f0', flexShrink: 0 }}>
                                                    <img 
                                                        src={imgSrc} 
                                                        alt={course.courseName} 
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=80';
                                                        }}
                                                    />
                                                </div>
                                                <span style={{ fontWeight: 600, color: 'var(--eductix-forest)' }}>
                                                    {course.courseName}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>
                                            <code>{course.courseId || 'CS-101'}</code>
                                        </td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <span style={{ padding: '4px 10px', borderRadius: '12px', background: 'var(--eductix-card-mint)', color: 'var(--eductix-emerald)', fontSize: '12px', fontWeight: 600 }}>
                                                {course.courseCategory || 'Development'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--eductix-forest)' }}>
                                            ${course.courseFee}
                                        </td>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>
                                            {course.Instructor || 'Mentor'}
                                        </td>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>
                                            {course.level || 'Beginner'}
                                        </td>
                                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                            {viewMode === 'active' ? (
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                    <Link
                                                        href={`/admin/edit-course/${course._id}`}
                                                        style={{ padding: '6px 12px', borderRadius: '6px', background: '#f1f5f9', color: '#334155', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(course._id)}
                                                        style={{ padding: '6px 12px', borderRadius: '6px', background: '#fee2e2', color: '#dc2626', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleRestore(course._id)}
                                                    style={{ padding: '6px 14px', borderRadius: '6px', background: '#dcfce7', color: '#16a34a', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                                                >
                                                    Restore
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ padding: '48px', textAlign: 'center', color: 'var(--eductix-muted)' }}>
                                    {loading ? 'Loading courses...' : 'No courses found in this view.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
