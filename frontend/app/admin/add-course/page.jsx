'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createCourse, getCategories, addCategory } from '../../../lib/api';

export default function AdminAddCoursePage() {
    const router = useRouter();
    const [categories, setCategories] = useState([
        'Programming', 'Web Development', 'App Development', 'Data Science', 'Data Analysis', 'Design', 'Marketing'
    ]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        courseId: '',
        courseName: '',
        description: '',
        Instructor: '',
        courseFee: '',
        courseCategory: 'Web Development',
        courseDuration: '6 Month',
        level: 'Beginner'
    });
    const [thumbnailFile, setThumbnailFile] = useState(null);

    useEffect(() => {
        getCategories().then(res => {
            if (res && res.length > 0) {
                const names = res.map(c => c.categoryName);
                setCategories(prev => Array.from(new Set([...prev, ...names])));
            }
        }).catch(() => {});
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            await addCategory(newCategoryName);
            setCategories(prev => [...prev, newCategoryName]);
            setFormData(prev => ({ ...prev, courseCategory: newCategoryName }));
            setNewCategoryName('');
            setShowCategoryModal(false);
            alert("Category added successfully!");
        } catch (e) {
            alert("Failed to add category");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (thumbnailFile) {
            data.append('coursesthumbnailImage', thumbnailFile);
        }

        try {
            const res = await createCourse(data);
            if (res.success) {
                alert("Course added successfully!");
                router.push('/admin/courses');
            } else {
                alert(res.message || "Failed to create course");
            }
        } catch (err) {
            alert("Network error: Please verify Express backend is running on port 3500.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--eductix-forest)', margin: 0 }}>
                        Create New Course
                    </h1>
                    <p style={{ color: 'var(--eductix-muted)', fontSize: '14px', marginTop: '4px' }}>
                        Fill in curriculum details, instructor credentials, and upload cover asset.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setShowCategoryModal(true)}
                    style={{ padding: '9px 16px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                    + Add Category
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px' }}>
                {/* Left Column: General Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                            General Information
                        </h3>

                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Course ID
                            </label>
                            <input
                                type="text"
                                name="courseId"
                                required
                                placeholder="e.g. FS-301"
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
                                placeholder="e.g. Master Full Stack Web Development"
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
                                placeholder="Comprehensive breakdown of curriculum, projects, and target outcomes..."
                                value={formData.description}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Instructor Name
                            </label>
                            <input
                                type="text"
                                name="Instructor"
                                required
                                placeholder="e.g. Alex Morgan"
                                value={formData.Instructor}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                        </div>
                    </div>

                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                            Pricing & Tuitions
                        </h3>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Course Fee (USD $)
                            </label>
                            <input
                                type="number"
                                name="courseFee"
                                required
                                placeholder="e.g. 1499"
                                value={formData.courseFee}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Taxonomy, Media & Level */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                            Course Thumbnail
                        </h3>
                        <div style={{ border: '2px dashed #cbd5e1', borderRadius: '10px', padding: '24px', textAlign: 'center', background: '#f8fafc' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setThumbnailFile(e.target.files[0])}
                                style={{ width: '100%', fontSize: '13px' }}
                            />
                            <p style={{ fontSize: '12px', color: 'var(--eductix-muted)', marginTop: '8px' }}>
                                Recommended size: 800x500px JPG or PNG
                            </p>
                        </div>
                    </div>

                    <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                            Category & Duration
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
                                Difficulty Level
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
                        <span>{loading ? 'Creating Course...' : 'Publish Course Track →'}</span>
                    </button>
                </div>
            </form>

            {/* Modal for Adding Category */}
            {showCategoryModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#fff', padding: '32px', borderRadius: '18px', width: '90%', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                            Add New Course Category
                        </h3>
                        <input
                            type="text"
                            placeholder="Category Name (e.g. Artificial Intelligence)"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', marginBottom: '20px' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setShowCategoryModal(false)}
                                style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleAddCategory}
                                style={{ padding: '8px 18px', background: 'var(--eductix-emerald)', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                            >
                                Save Category
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
