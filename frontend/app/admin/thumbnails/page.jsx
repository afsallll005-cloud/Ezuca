'use client';

import { useState, useEffect } from 'react';
import { getHomeData, createThumbnail, getImageUrl } from '../../../lib/api';

export default function AdminThumbnailsPage() {
    const [thumbnails, setThumbnails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        heroTitle: '',
        heroSubtitle: '',
        buttonText: 'Enroll Now',
        oldprice: '$199',
        offerprice: '$99'
    });
    const [imageFile, setImageFile] = useState(null);

    const loadData = () => {
        getHomeData().then(res => {
            if (res && res.thumbnails) {
                setThumbnails(res.thumbnails);
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
        Object.keys(formData).forEach(k => data.append(k, formData[k]));
        if (imageFile) {
            data.append('heroThumbnailImage', imageFile);
        }

        try {
            const res = await createThumbnail(data);
            if (res.success) {
                alert("Skills slide created successfully!");
                setFormData({
                    heroTitle: '',
                    heroSubtitle: '',
                    buttonText: 'Enroll Now',
                    oldprice: '$199',
                    offerprice: '$99'
                });
                setImageFile(null);
                loadData();
            } else {
                alert(res.message || "Failed to create thumbnail");
            }
        } catch (err) {
            alert("Error: Ensure backend API is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '960px' }}>
            <div style={{ marginBottom: '28px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--eductix-forest)', margin: 0 }}>
                    Essential Skills Carousel & Hero Slides
                </h1>
                <p style={{ color: 'var(--eductix-muted)', fontSize: '14px', marginTop: '4px' }}>
                    Configure the rotating featured slides displayed in the Essential Skills section.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px', alignItems: 'flex-start' }}>
                {/* Form */}
                <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '28px', borderRadius: '18px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '18px' }}>
                        + Add New Carousel Slide
                    </h3>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                            Slide Title
                        </label>
                        <input
                            type="text"
                            name="heroTitle"
                            required
                            placeholder="e.g. Master Artificial Intelligence"
                            value={formData.heroTitle}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                            Subtitle / Frameworks
                        </label>
                        <input
                            type="text"
                            name="heroSubtitle"
                            required
                            placeholder="e.g. Python, PyTorch, LLMs & Deep Learning"
                            value={formData.heroSubtitle}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Regular Price
                            </label>
                            <input
                                type="text"
                                name="oldprice"
                                placeholder="$199"
                                value={formData.oldprice}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                                Offer Price
                            </label>
                            <input
                                type="text"
                                name="offerprice"
                                placeholder="$99"
                                value={formData.offerprice}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                            Button Text
                        </label>
                        <input
                            type="text"
                            name="buttonText"
                            value={formData.buttonText}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#334155' }}>
                            Slide Background Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            required
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
                        <span>{loading ? 'Uploading Slide...' : 'Save Slide to Carousel'}</span>
                    </button>
                </form>

                {/* Existing Slides */}
                <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                        Active Carousel Slides ({thumbnails.length})
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {thumbnails.length > 0 ? (
                            thumbnails.map((t, idx) => {
                                const imgSrc = getImageUrl(t.heroThumbnailImage, '/images/edubackground01.jpg');

                                return (
                                    <div key={idx} style={{ background: '#fff', borderRadius: '14px', padding: '16px', border: '1px solid var(--eductix-border-card)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                                        <div style={{ width: '90px', height: '65px', borderRadius: '8px', overflow: 'hidden', background: '#e2e8f0', flexShrink: 0 }}>
                                            <img
                                                src={imgSrc}
                                                alt={t.heroTitle}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=80';
                                                }}
                                            />
                                        </div>
                                        <div style={{ flexGrow: 1 }}>
                                            <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--eductix-forest)', margin: 0 }}>
                                                {t.heroTitle}
                                            </h4>
                                            <p style={{ fontSize: '13px', color: 'var(--eductix-muted)', margin: '2px 0 6px' }}>
                                                {t.heroSubtitle}
                                            </p>
                                            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--eductix-emerald)' }}>
                                                {t.offerprice} <s style={{ color: '#94a3b8' }}>{t.oldprice}</s>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p style={{ color: 'var(--eductix-muted)', fontSize: '14px' }}>No custom slides uploaded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
