'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAdminStats } from '../../lib/api';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalRevenue: "$45,231.89",
        revenueGrowth: "+20.1%",
        subscriptions: 2350,
        subscriptionGrowth: "+180.1%",
        sales: 12234,
        salesGrowth: "+19%",
        totalCourses: 12,
        recentCourses: []
    });

    useEffect(() => {
        getAdminStats().then(data => {
            if (data) setStats(data);
        }).catch(() => {});
    }, []);

    const cards = [
        { title: "Total Revenue", value: stats.totalRevenue, sub: `${stats.revenueGrowth} from last month`, icon: "💰" },
        { title: "Subscriptions", value: `+${stats.subscriptions}`, sub: `${stats.subscriptionGrowth} from last month`, icon: "👥" },
        { title: "Sales", value: `+${stats.sales}`, sub: `${stats.salesGrowth} from last month`, icon: "📈" },
        { title: "Published Courses", value: stats.totalCourses, sub: "Active in catalog", icon: "🎓" }
    ];

    const chartBars = [
        { month: 'Jan', height: 40 },
        { month: 'Feb', height: 65 },
        { month: 'Mar', height: 50 },
        { month: 'Apr', height: 85 },
        { month: 'May', height: 95 },
        { month: 'Jun', height: 75 },
        { month: 'Jul', height: 110 },
        { month: 'Aug', height: 130 },
        { month: 'Sep', height: 120 },
        { month: 'Oct', height: 145 },
    ];

    return (
        <div>
            {/* Topbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--eductix-forest)', margin: 0 }}>
                        Admin Dashboard
                    </h1>
                    <p style={{ color: 'var(--eductix-muted)', fontSize: '14px', marginTop: '4px' }}>
                        Platform performance, course sales, and student enrollments overview.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link href="/admin/add-course" className="btn-eductix-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
                        <span>+ Add New Course</span>
                    </Link>
                    <button 
                        onClick={() => alert("Report downloaded successfully!")}
                        style={{ padding: '10px 18px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Export Report
                    </button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {cards.map((c, i) => (
                    <div key={i} style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--eductix-muted)' }}>{c.title}</span>
                            <span style={{ fontSize: '20px' }}>{c.icon}</span>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--eductix-forest)', marginBottom: '4px' }}>
                            {c.value}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--eductix-emerald)', fontWeight: 600 }}>
                            {c.sub}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section: Chart & Recent Sales */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'flex-start' }}>
                {/* Revenue Overview Chart */}
                <div style={{ background: '#fff', padding: '28px', borderRadius: '18px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--eductix-forest)', margin: 0 }}>Enrollment & Revenue Growth</h3>
                            <p style={{ fontSize: '13px', color: 'var(--eductix-muted)', marginTop: '4px' }}>Monthly learner registrations</p>
                        </div>
                        <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '12px', background: 'var(--eductix-card-mint)', color: 'var(--eductix-emerald)', fontWeight: 600 }}>2026 Year</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '180px', paddingTop: '20px', borderBottom: '1px solid #eee' }}>
                        {chartBars.map(bar => (
                            <div key={bar.month} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div 
                                    style={{ 
                                        width: '100%', 
                                        maxWidth: '32px', 
                                        height: `${bar.height}px`, 
                                        background: 'linear-gradient(180deg, var(--eductix-emerald) 0%, #0a231c 100%)', 
                                        borderRadius: '6px 6px 0 0',
                                        transition: 'height 0.3s ease'
                                    }} 
                                    title={`${bar.month}: $${bar.height * 350}`}
                                />
                                <span style={{ fontSize: '12px', color: 'var(--eductix-muted)' }}>{bar.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions & Recent Activity */}
                <div style={{ background: '#fff', padding: '28px', borderRadius: '18px', border: '1px solid var(--eductix-border-card)', boxShadow: 'var(--eductix-card-shadow)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--eductix-forest)', marginBottom: '16px' }}>
                        Quick Admin Actions
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Link 
                            href="/admin/courses" 
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', background: '#f8fafc', textDecoration: 'none', border: '1px solid #e2e8f0', color: 'var(--eductix-forest)', fontWeight: 600, fontSize: '14px' }}
                        >
                            <span>📚 Manage Course Catalog</span>
                            <span>→</span>
                        </Link>

                        <Link 
                            href="/admin/add-course" 
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', background: '#f8fafc', textDecoration: 'none', border: '1px solid #e2e8f0', color: 'var(--eductix-forest)', fontWeight: 600, fontSize: '14px' }}
                        >
                            <span>➕ Add New Course Track</span>
                            <span>→</span>
                        </Link>

                        <Link 
                            href="/admin/thumbnails" 
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', background: '#f8fafc', textDecoration: 'none', border: '1px solid #e2e8f0', color: 'var(--eductix-forest)', fontWeight: 600, fontSize: '14px' }}
                        >
                            <span>🖼️ Edit Skills Slider Slides</span>
                            <span>→</span>
                        </Link>

                        <Link 
                            href="/admin/reviews" 
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', background: '#f8fafc', textDecoration: 'none', border: '1px solid #e2e8f0', color: 'var(--eductix-forest)', fontWeight: 600, fontSize: '14px' }}
                        >
                            <span>⭐ Moderate Student Reviews</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
