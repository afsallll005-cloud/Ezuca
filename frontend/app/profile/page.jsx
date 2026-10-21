'use client';

import Link from 'next/link';

export default function ProfilePage() {
    return (
        <div className="eductix-container" style={{ maxWidth: '1040px', margin: '40px auto 80px', padding: '0 24px' }}>
            {/* Header Card */}
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)', display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--eductix-emerald)', boxShadow: '0 6px 20px rgba(13,136,60,0.15)', flexShrink: 0, background: '#eaf0ef' }}>
                    <img 
                        src="/images/profileeee.png" 
                        alt="Mohammed Afsal" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80';
                        }}
                    />
                </div>

                <div style={{ flexGrow: 1 }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '6px' }}>
                        Mohammed Afsal T
                    </h2>
                    <div style={{ marginBottom: '12px' }}>
                        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: 'var(--eductix-card-mint)', color: 'var(--eductix-emerald)', fontSize: '13px', fontWeight: 600, marginRight: '8px' }}>
                            Full Stack Web Developer
                        </span>
                        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: 'rgba(0,59,45,0.06)', color: 'var(--eductix-muted)', fontSize: '13px' }}>
                            📍 Perinthalmanna, Kerala
                        </span>
                    </div>
                    <div style={{ color: '#f59e0b', marginBottom: '16px', fontSize: '15px' }}>
                        ★★★★★ <span style={{ color: 'var(--eductix-muted)', fontSize: '13px' }}>(Certified Pro Student)</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link href="/cart" className="btn-eductix-primary" style={{ padding: '10px 22px', fontSize: '14px' }}>
                            <span>My Enrolled Courses</span>
                            <span className="icon-circle">↗</span>
                        </Link>
                        <Link href="/pricing" className="btn-eductix-secondary" style={{ padding: '10px 22px', fontSize: '14px' }}>
                            Upgrade Membership
                        </Link>
                    </div>
                </div>
            </div>

            {/* Body Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--eductix-muted)', marginBottom: '16px' }}>
                        Skills & Competencies
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {['Next.js', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'UI/UX Design', 'Tailwind CSS'].map(skill => (
                            <span key={skill} style={{ padding: '6px 14px', borderRadius: '20px', background: 'var(--eductix-card-mint)', border: '1px solid var(--eductix-border-subtle)', color: 'var(--eductix-forest)', fontSize: '13px', fontWeight: 500 }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--eductix-muted)', marginBottom: '16px' }}>
                        Contact & Account Information
                    </h4>
                    <div style={{ display: 'flex', padding: '10px 0', borderBottom: '1px solid rgba(0,59,45,0.06)', fontSize: '14.5px' }}>
                        <span style={{ width: '120px', color: 'var(--eductix-muted)' }}>Email:</span>
                        <span style={{ color: 'var(--eductix-dark)', fontWeight: 600 }}>afsal@gmail.com</span>
                    </div>
                    <div style={{ display: 'flex', padding: '10px 0', borderBottom: '1px solid rgba(0,59,45,0.06)', fontSize: '14.5px' }}>
                        <span style={{ width: '120px', color: 'var(--eductix-muted)' }}>Role:</span>
                        <span style={{ color: 'var(--eductix-emerald)', fontWeight: 600 }}>● Active Scholar</span>
                    </div>
                    <div style={{ display: 'flex', padding: '10px 0', fontSize: '14.5px' }}>
                        <span style={{ width: '120px', color: 'var(--eductix-muted)' }}>Status:</span>
                        <span style={{ color: 'var(--eductix-dark)', fontWeight: 600 }}>Pro Member</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
