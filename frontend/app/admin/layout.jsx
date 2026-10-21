'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: '📊' },
        { label: 'All Courses', href: '/admin/courses', icon: '📚' },
        { label: 'Add Course', href: '/admin/add-course', icon: '➕' },
        { label: 'Set Thumbnails', href: '/admin/thumbnails', icon: '🖼️' },
        { label: 'Student Reviews', href: '/admin/reviews', icon: '⭐' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
            {/* Sidebar */}
            <aside style={{ width: '260px', background: '#0a231c', color: '#fff', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                {/* Brand */}
                <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }}>Ezuca</span>
                        <span style={{ fontSize: '11px', background: 'var(--eductix-emerald)', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>ADMIN</span>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav style={{ padding: '24px 16px', flexGrow: 1 }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.08em', padding: '0 12px 12px' }}>
                        Management
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {navItems.map(item => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            fontWeight: isActive ? 600 : 500,
                                            color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                                            background: isActive ? 'rgba(13,136,60,0.35)' : 'transparent',
                                            border: isActive ? '1px solid rgba(13,136,60,0.5)' : '1px solid transparent',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <span style={{ fontSize: '16px' }}>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Sidebar Bottom User Profile */}
                <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--eductix-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', color: '#fff' }}>
                        A
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Afsal (Admin)</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>admin@ezuca.edu</div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flexGrow: 1, padding: '36px 40px', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}
