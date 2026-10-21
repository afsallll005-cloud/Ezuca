'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../lib/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                alert('Login successful! Redirecting to dashboard...');
                router.push('/profile');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Could not connect to authentication server. Please check backend.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, #eaf0ef 0%, #f3faf5 100%)' }}>
            <div style={{ width: '100%', maxWidth: '960px', background: '#fff', borderRadius: '24px', border: '1px solid rgba(0,59,45,0.08)', boxShadow: '0 20px 60px rgba(0,59,45,0.08)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', overflow: 'hidden' }}>
                {/* Left Visual Side */}
                <div style={{ background: 'var(--eductix-forest)', color: '#fff', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                    <div>
                        <div className="eductix-brand" style={{ color: 'white', marginBottom: '36px' }}>
                            Ezuca<span className="brand-dot"></span>
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, lineHeight: 1.2, marginBottom: '14px' }}>
                            Welcome Back to Your Learning Path
                        </h3>
                        <p style={{ fontSize: '15px', color: '#b2d4c6', lineHeight: 1.6 }}>
                            Pick up right where you left off. Continue your lessons, work on portfolio projects, and connect with mentors.
                        </p>
                    </div>

                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '14px', backdropFilter: 'blur(8px)', marginTop: '24px' }}>
                        <div style={{ fontSize: '13px', color: '#a3d9be', fontWeight: 600, marginBottom: '4px' }}>STUDENT COMMUNITY</div>
                        <div style={{ fontSize: '14px', color: '#ffffff' }}>Over 30,000+ active learners advancing their skills daily.</div>
                    </div>
                </div>

                {/* Right Form Side */}
                <div style={{ padding: '50px 45px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '28px' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '6px' }}>
                            Log in to your account
                        </h2>
                        <p style={{ fontSize: '14.5px', color: 'var(--eductix-muted)' }}>
                            Enter your credentials to access your courses.
                        </p>
                    </div>

                    {error && (
                        <div style={{ background: '#fff5f5', color: '#c53030', border: '1px solid #feb2b2', padding: '10px 14px', borderRadius: '10px', fontSize: '13.5px', marginBottom: '16px' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--eductix-slate)', marginBottom: '6px' }}>Email address</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="name@example.com" 
                                required 
                                style={{ width: '100%', padding: '13px 18px', background: 'var(--eductix-card-mint)', border: '1px solid rgba(0,59,45,0.12)', borderRadius: '12px', outline: 'none' }} 
                            />
                        </div>

                        <div style={{ marginBottom: '22px' }}>
                            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'var(--eductix-slate)', marginBottom: '6px' }}>Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••" 
                                required 
                                style={{ width: '100%', padding: '13px 18px', background: 'var(--eductix-card-mint)', border: '1px solid rgba(0,59,45,0.12)', borderRadius: '12px', outline: 'none' }} 
                            />
                        </div>

                        <button type="submit" disabled={loading} className="btn-eductix-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                            <span>{loading ? 'Logging in...' : 'Continue'}</span>
                            <span className="icon-circle">↗</span>
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--eductix-muted)', marginTop: '20px' }}>
                        Don't have an account? <Link href="/signup" style={{ color: 'var(--eductix-emerald)', fontWeight: 600 }}>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
