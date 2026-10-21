'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCart, removeFromCart, getImageUrl } from '../../lib/api';

export default function CartPage() {
    const [cartData, setCartData] = useState({ data: [], total: 0, grandTotal: 0 });
    const [loading, setLoading] = useState(true);

    const loadCart = () => {
        getCart().then(res => {
            setCartData(res);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleRemove = async (id) => {
        try {
            await removeFromCart(id);
            loadCart();
        } catch (e) {
            alert('Failed to remove item');
        }
    };

    return (
        <div className="eductix-container" style={{ padding: '40px 32px 100px' }}>
            <div className="section-header" style={{ marginBottom: '32px' }}>
                <span className="section-tagline">Checkout</span>
                <h1 className="section-title">Your Learning Cart</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'flex-start' }}>
                {/* Cart Items List */}
                <div>
                    {cartData.data && cartData.data.length > 0 ? (
                        cartData.data.map((item, idx) => {
                            const imgSrc = getImageUrl(item.coursesthumbnailImage, '/images/edubackground01.jpg');

                            return (
                                <div key={idx} style={{ background: '#fff', border: '1px solid var(--eductix-border-card)', borderRadius: 'var(--radius-card)', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '20px', boxShadow: 'var(--eductix-card-shadow)' }}>
                                    <div style={{ width: '140px', height: '100px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0, background: '#e2e8e5' }}>
                                        <img 
                                            src={imgSrc} 
                                            alt={item.courseName} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80';
                                            }}
                                        />
                                    </div>

                                    <div style={{ flexGrow: 1 }}>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--eductix-dark)', marginBottom: '4px' }}>
                                            {item.courseName}
                                        </h3>
                                        <p style={{ fontSize: '13.5px', color: 'var(--eductix-muted)', marginBottom: '8px' }}>
                                            Instructor: {item.Instructor || 'Expert Mentor'}
                                        </p>
                                        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--eductix-forest)' }}>
                                            ₹{item.courseFee}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <button className="btn-eductix-primary" style={{ padding: '8px 18px', fontSize: '13.5px' }} onClick={() => alert('Proceeding to course access...')}>
                                            <span>Enroll</span>
                                            <span className="icon-circle">↗</span>
                                        </button>
                                        <button 
                                            onClick={() => handleRemove(item._id)} 
                                            className="btn-eductix-outline" 
                                            style={{ color: '#e53e3e', borderColor: 'rgba(229,62,62,0.3)', padding: '6px 14px', fontSize: '12.5px' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ background: 'white', borderRadius: 'var(--radius-card)', padding: '60px 40px', textAlign: 'center', border: '1px solid var(--eductix-border-card)' }}>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--eductix-forest)', marginBottom: '8px' }}>
                                Your cart is empty
                            </h3>
                            <p style={{ color: 'var(--eductix-muted)', marginBottom: '24px' }}>
                                Browse our industry-ready courses and begin your learning journey.
                            </p>
                            <Link href="/#course-section" className="btn-eductix-primary">
                                <span>Explore Courses</span>
                                <span className="icon-circle">↗</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right: Price Summary */}
                <div>
                    <div style={{ background: '#fff', border: '1px solid var(--eductix-border-card)', borderRadius: 'var(--radius-card)', padding: '32px', boxShadow: 'var(--eductix-card-shadow)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--eductix-forest)', marginBottom: '20px' }}>
                            Price Summary
                        </h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '14.5px', color: 'var(--eductix-muted)' }}>
                            <span>Subtotal</span>
                            <span>₹{cartData.total || 0}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '14.5px', color: 'var(--eductix-emerald)', fontWeight: 600 }}>
                            <span>Seasonal Discount</span>
                            <span>− ₹299</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', borderTop: '1px solid rgba(0,59,45,0.08)', fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: 'var(--eductix-forest)' }}>
                            <span>Total Amount</span>
                            <span>₹{cartData.grandTotal || 0}</span>
                        </div>

                        <button 
                            className="btn-eductix-primary" 
                            style={{ width: '100%', justifyContent: 'center', marginTop: '24px', padding: '14px' }}
                            onClick={() => alert('Order placed successfully! Welcome aboard.')}
                        >
                            <span>Checkout Now</span>
                            <span className="icon-circle">↗</span>
                        </button>

                        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--eductix-light-muted)', marginTop: '12px' }}>
                            🔒 30-Day Money-Back Guarantee
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
