'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCourseById, updateCourse, getCategories, getImageUrl } from '../../../../lib/api';

export default function AdminEditCoursePage() {
    const router = useRouter();
    const params = useParams();
    const courseId = params?.id;

    const [categories, setCategories] = useState([
        'Programming', 'Web Development', 'App Development', 'Data Science', 'Data Analysis', 'Design', 'Marketing'
    ]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [formData, setFormData] = useState({
        courseId: '',
        courseName: '',
        description: '',
        Instructor: '',
        courseFee: '',
        courseCategory: 'Web Development',
        courseDuration: '6 Month',
        level: 'Beginner',
        currentImage: ''
    });
    const [thumbnailFile, setThumbnailFile] = useState(null);

    useEffect(() => {
        if (!courseId) return;

        Promise.all([
            getCourseById(courseId),
            getCategories()
        ]).then(([course, cats]) => {
            if (cats && cats.length > 0) {
                setCategories(prev => Array.from(new Set([...prev, ...cats.map(c => c.categoryName)])));
            }
            if (course) {
                setFormData({
                    courseId: course.courseId || '',
                    courseName: course.courseName || '',
                    description: course.description || '',
                    Instructor: course.Instructor || '',
                    courseFee: course.courseFee || '',
                    courseCategory: course.courseCategory || 'Web Development',
                    courseDuration: course.courseDuration || '6 Month',
                    level: course.level || 'Beginner',
                    currentImage: course.coursesthumbnailImage || ''
                });
            }
        }).finally(() => setFetching(false));
    }, [courseId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'currentImage') data.append(key, formData[key]);
        });
        if (thumbnailFile) {
            data.append('coursesthumbnailImage', thumbnailFile);
        }

        try {
            const res = await updateCourse(courseId, data);
            if (res.success) {
                alert("Course updated successfully!");
                router.push('/admin/courses');
            } else {
                alert(res.message || "Failed to update course");
            }
        } catch (err) {
            alert("Network error: Please verify Express backend is running on port 3500.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div style={{ padding: '40px', color: 'var(--eductix-muted)' }}>Loading course data...</div>;
    }

    const currentImgSrc = getImageUrl(formData.currentImage, '/images/edubackground01.jpg');

    return (
        <div style={{ maxWidth: '900px' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--eductix-forest)', margin: 0 }}>
                    Edit Course: {formData.courseName}
                </h1>
                <p style={{ color: 'var(--eductix-muted)', fontSize: '14px', marginTop: '4px' }}>
                    Modify course curriculum, pricing, category, or update cover media.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                            Course Details
                        </h3>

                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Course ID
                            </label>
                            <input
                                type="text"
                                name="courseId"
                                required
                                value={formData.courseId}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Course Title
                            </label>
                            <input
                                type="text"
                                name="courseName"
                                required
                                value={formData.courseName}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Description
                            </label>
                            <textarea
                                name="description"
                                required
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Instructor
                            </label>
                            <input
                                type="text"
                                name="Instructor"
                                required
                                value={formData.Instructor}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                        </div>
                    </div>

                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                            Pricing
                        </h3>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Course Fee ($ USD)
                            </label>
                            <input
                                type="number"
                                name="courseFee"
                                required
                                value={formData.courseFee}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                            Thumbnail Image
                        </h3>

                        {formData.currentImage && (
                            <div style={{ marginBottom: '16px', width: '100%', height: '140px', borderRadius: '8px', overflow: 'hidden', background: '#e2e8f0' }}>
                                <img
                                    src={currentImgSrc}
                                    alt="Current thumbnail"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=80';
                                    }}
                                />
                            </div>
                        )}

                        <div style={{ border: '2px dashed #cbd5e1', borderRadius: '10px', padding: '16px', textAlign: 'center', background: '#f8fafc' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setThumbnailFile(e.target.files[0])}
                                style={{ width: '100%', fontSize: '13px' }}
                            />
                            <p style={{ fontSize: '11px', color: 'var(--eductix-muted)', marginTop: '6px' }}>
                                Leave empty to keep existing image.
                            </p>
                        </div>
                    </div>

                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                            Taxonomy & Options
                        </h3>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Category
                            </label>
                            <select
                                name="courseCategory"
                                value={formData.courseCategory}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Duration
                            </label>
                            <select
                                name="courseDuration"
                                value={formData.courseDuration}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                            >
                                <option value="4 Month">4 Month</option>
                                <option value="6 Month">6 Month</option>
                                <option value="10 Month">10 Month</option>
                                <option value="12 Month">12 Month</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '10px', color: '#334155' }}>
                                Level
                            </label>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                                    <label key={lvl} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="level"
                                            value={lvl}
                                            checked={formData.level === lvl}
                                            onChange={handleChange}
                                        />
                                        {lvl}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-eductix-primary"
                        style={{ width: '100%', padding: '14px', fontSize: '15px', justifyContent: 'center' }}
                    >
                        <span>{loading ? 'Saving Changes...' : 'Update Course Track →'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
