'use client';

import { useState, useEffect } from 'react';
import { getHomeData, getImageUrl } from '../../../lib/api';

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        Name: '',
        courseName: '',
        review: '',
        rating: '5'
    });
    const [imageFile, setImageFile] = useState(null);

    const loadData = () => {
        getHomeData().then(res => {
            if (res && res.reviews) {
                setReviews(res.reviews);
            }
        }).catch(() => {});
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('Name', formData.Name);
        data.append('courseName', formData.courseName);
        data.append('review', formData.review);
        data.append('rating', formData.rating);
        if (imageFile) {
            data.append('Image', imageFile);
        }

        try {
            const res = await fetch(`${API_BASE_URL}/api/reviews`, {
                method: 'POST',
                body: data
            });
            const json = await res.json();
            if (json.success) {
                alert("Student review published!");
                setFormData({ Name: '', courseName: '', review: '', rating: '5' });
                setImageFile(null);
                loadData();
            } else {
                alert(json.message || "Failed to submit review");
            }
        } catch (err) {
            alert("Error: Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '960px' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--eductix-forest)', margin: 0 }}>
                    Student Testimonials & Reviews
                </h1>
                <p style={{ color: 'var(--eductix-muted)', fontSize: '14px', marginTop: '4px' }}>
                    Moderate, add, and publish student reviews displayed on the public landing page.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px', alignItems: 'flex-start' }}>
                {/* Form */}
                <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '28px', borderRadius: '18px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '18px' }}>
                        + Add Student Review
                    </h3>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                            Student Name
                        </label>
                        <input
                            type="text"
                            name="Name"
                            required
                            placeholder="e.g. Maya Lin"
                            value={formData.Name}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                            Course Taken
                        </label>
                        <input
                            type="text"
                            name="courseName"
                            required
                            placeholder="e.g. Full Stack JavaScript Bootcamp"
                            value={formData.courseName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                            Star Rating
                        </label>
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
                        >
                            <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                            <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                            <option value="3">★★★☆☆ (3 Stars - Average)</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                            Testimonial Review
                        </label>
                        <textarea
                            name="review"
                            required
                            rows="4"
                            placeholder="How did Ezuca help accelerate their career, build confidence, or land a job?"
                            value={formData.review}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                            Student Avatar Photo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            style={{ width: '100%', fontSize: '13px' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-eductix-primary"
                        style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '14px' }}
                    >
                        <span>{loading ? 'Submitting Review...' : 'Publish Testimonial →'}</span>
                    </button>
                </form>

                {/* Existing Reviews */}
                <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                        Published Student Reviews ({reviews.length})
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {reviews.length > 0 ? (
                            reviews.map((r, idx) => {
                                const imgSrc = getImageUrl(r.studentImage || r.Image, '/images/userProfile.png');

                                return (
                                    <div key={idx} style={{ background: '#fff', borderRadius: '14px', padding: '18px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', background: '#e2e8f0', flexShrink: 0 }}>
                                                <img
                                                    src={imgSrc}
                                                    alt={r.studentName || r.Name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--eductix-forest)', margin: 0 }}>
                                                    {r.studentName || r.Name}
                                                </h4>
                                                <p style={{ fontSize: '12px', color: 'var(--eductix-muted)', margin: 0 }}>
                                                    {r.courseName}
                                                </p>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                                            "{r.review}"
                                        </p>
                                    </div>
                                );
                            })
                        ) : (
                            <p style={{ color: 'var(--eductix-muted)', fontSize: '14px' }}>No reviews recorded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
