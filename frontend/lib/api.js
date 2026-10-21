// API client connecting to Express Backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500';

// Universal Image URL resolver: loads from local Next.js /images/ or remote URLs
export function getImageUrl(imagePath, fallback = '/images/edubackground01.jpg') {
    if (!imagePath) return fallback;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    const clean = imagePath.replace(/^\/+/, '');
    const filename = clean.startsWith('images/') ? clean.replace(/^images\//, '') : clean;
    return `/images/${filename}`;
}

// Fallback data in case Express backend or MongoDB is offline
export const FALLBACK_THUMBNAILS = [
    {
        heroTitle: "Full Stack Web Development",
        heroSubtitle: "React, Node.js, Next.js & Express",
        heroThumbnailImage: "edubackground02.jpg",
        buttonText: "Enroll Now"
    },
    {
        heroTitle: "Data Science & AI Analytics",
        heroSubtitle: "Python, SQL, Machine Learning",
        heroThumbnailImage: "edubackground01.jpg",
        buttonText: "Enroll Now"
    },
    {
        heroTitle: "UI/UX Product Design",
        heroSubtitle: "Figma, Wireframing & Prototyping",
        heroThumbnailImage: "itpro.jpg",
        buttonText: "Enroll Now"
    },
    {
        heroTitle: "Cloud Architecture & DevOps",
        heroSubtitle: "AWS, Docker, Kubernetes & CI/CD",
        heroThumbnailImage: "edubackground03.jpg",
        buttonText: "Enroll Now"
    }
];

export const FALLBACK_COURSES = [
    {
        _id: "c1",
        courseName: "Full Stack JavaScript Bootcamp",
        courseFee: 1499,
        Instructor: "Alex Morgan",
        courseDuration: "12 Weeks",
        coursesthumbnailImage: "edubackground02.jpg",
        description: "Master React, Node.js, Express, and MongoDB from scratch by building 5 production-ready applications."
    },
    {
        _id: "c2",
        courseName: "Python for Data Analysis & AI",
        courseFee: 1299,
        Instructor: "Dr. Sarah Chen",
        courseDuration: "10 Weeks",
        coursesthumbnailImage: "edubackground01.jpg",
        description: "Analyze complex datasets, build automated data pipelines, and deploy machine learning models with confidence."
    },
    {
        _id: "c3",
        courseName: "Modern UI/UX Design with Figma",
        courseFee: 999,
        Instructor: "Marcus Vance",
        courseDuration: "8 Weeks",
        coursesthumbnailImage: "itpro.jpg",
        description: "Learn design systems, typography, color theory, interactive micro-animations, and client presentation skills."
    }
];

export const FALLBACK_REVIEWS = [
    {
        studentName: "Daniel Carter",
        courseName: "Data Analytics Masterclass",
        review: "The lessons are practical and easy to follow. Eductix helped me build real skills and confidence to transition into my first developer role.",
        studentImage: "userProfile.png"
    },
    {
        studentName: "Olivia Bennett",
        courseName: "Full Stack Web Development",
        review: "I built my first fullstack portfolio website within 4 weeks. The mentors and hands-on projects made complex concepts so clear.",
        studentImage: "userProfile.png"
    },
    {
        studentName: "Sophia Turner",
        courseName: "UI/UX Product Design",
        review: "Practical learning that really works. The case studies and assignments gave me job-ready confidence during interviews.",
        studentImage: "userProfile.png"
    }
];

// Helper to fetch from backend or return fallback
export async function getHomeData() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/home`, { cache: 'no-store' });
        if (!res.ok) throw new Error("Backend not responding");
        const json = await res.json();
        return {
            thumbnails: (json.data && json.data.thumbnails && json.data.thumbnails.length > 0) ? json.data.thumbnails : FALLBACK_THUMBNAILS,
            courses: (json.data && json.data.courses && json.data.courses.length > 0) ? json.data.courses : FALLBACK_COURSES,
            reviews: (json.data && json.data.reviews && json.data.reviews.length > 0) ? json.data.reviews : FALLBACK_REVIEWS
        };
    } catch (err) {
        return {
            thumbnails: FALLBACK_THUMBNAILS,
            courses: FALLBACK_COURSES,
            reviews: FALLBACK_REVIEWS
        };
    }
}

export async function getCourses(category = 'all', search = '') {
    try {
        const params = new URLSearchParams();
        if (category && category !== 'all') params.append('category', category);
        if (search) params.append('search', search);

        const res = await fetch(`${API_BASE_URL}/api/courses?${params.toString()}`, { cache: 'no-store' });
        if (!res.ok) throw new Error("Failed to fetch courses");
        const json = await res.json();
        return (json.data && json.data.length > 0) ? json.data : FALLBACK_COURSES;
    } catch (err) {
        return FALLBACK_COURSES;
    }
}

export async function getCourseById(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/courses/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error("Failed to fetch course");
        const json = await res.json();
        return json.data || FALLBACK_COURSES[0];
    } catch (err) {
        return FALLBACK_COURSES.find(c => c._id === id) || FALLBACK_COURSES[0];
    }
}

export async function getCart() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/cart`, { cache: 'no-store' });
        if (!res.ok) throw new Error("Failed to fetch cart");
        return await res.json();
    } catch (err) {
        return { success: true, count: 0, total: 0, grandTotal: 0, data: [] };
    }
}

export async function addToCart(courseId) {
    const res = await fetch(`${API_BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
    });
    return await res.json();
}

export async function removeFromCart(id) {
    const res = await fetch(`${API_BASE_URL}/api/cart/${id}`, {
        method: 'DELETE'
    });
    return await res.json();
}

// Admin API Functions
export async function getAdminStats() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/admin/stats`, { cache: 'no-store' });
        if (!res.ok) throw new Error("Failed to fetch admin stats");
        const json = await res.json();
        return json.data;
    } catch (e) {
        return {
            totalRevenue: "$45,231.89",
            revenueGrowth: "+20.1%",
            subscriptions: 2350,
            subscriptionGrowth: "+180.1%",
            sales: 12234,
            salesGrowth: "+19%",
            activeLearners: 573,
            totalCourses: 12,
            deletedCourses: 0,
            recentCourses: FALLBACK_COURSES
        };
    }
}

export async function createCourse(formData) {
    const res = await fetch(`${API_BASE_URL}/api/courses`, {
        method: 'POST',
        body: formData
    });
    return await res.json();
}

export async function updateCourse(id, formData) {
    const res = await fetch(`${API_BASE_URL}/api/admin/courses/${id}`, {
        method: 'PUT',
        body: formData
    });
    return await res.json();
}

export async function deleteCourse(id) {
    const res = await fetch(`${API_BASE_URL}/api/admin/courses/${id}`, {
        method: 'DELETE'
    });
    return await res.json();
}

export async function restoreCourse(id) {
    const res = await fetch(`${API_BASE_URL}/api/admin/courses/${id}/restore`, {
        method: 'POST'
    });
    return await res.json();
}

export async function getDeletedCourses() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/admin/courses/deleted`, { cache: 'no-store' });
        const json = await res.json();
        return json.data || [];
    } catch (e) {
        return [];
    }
}

export async function createThumbnail(formData) {
    const res = await fetch(`${API_BASE_URL}/api/admin/thumbnails`, {
        method: 'POST',
        body: formData
    });
    return await res.json();
}

export async function getCategories() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/admin/categories`, { cache: 'no-store' });
        const json = await res.json();
        return json.data || [];
    } catch (e) {
        return [];
    }
}

export async function addCategory(categoryName) {
    const res = await fetch(`${API_BASE_URL}/api/admin/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryName })
    });
    return await res.json();
}

export async function deleteCategory(id) {
    const res = await fetch(`${API_BASE_URL}/api/admin/categories/${id}`, {
        method: 'DELETE'
    });
    return await res.json();
}

