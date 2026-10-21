const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Load environment variables (from backend .env first, then root .env if present)
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;
const DB_URL = process.env.DB_URL;

// MongoDB Connection
if (DB_URL) {
    mongoose.connect(DB_URL)
        .then(() => console.log("✓ MongoDB Connected Successfully"))
        .catch((error) => console.error("✗ MongoDB Connection Error:", error.message));
} else {
    console.log("ℹ Note: DB_URL is not set. API will operate with mock fallback data.");
}

// Middleware: JSON & URL-encoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for Next.js Frontend
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

// Serve static course images and thumbnails (checks frontend/public, backend/public, or root public)
const frontendPublic = path.join(__dirname, '../frontend/public');
const localPublic = path.join(__dirname, 'public');
const rootPublic = path.join(__dirname, '../public');
const activePublic = fs.existsSync(frontendPublic)
    ? frontendPublic
    : (fs.existsSync(localPublic) ? localPublic : rootPublic);

app.use('/images', express.static(path.join(activePublic, 'images')));
app.use(express.static(activePublic));

// Mount REST API routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

// Health check / API Welcome root endpoint
app.get('/', (req, res) => {
    res.json({
        status: "active",
        service: "Eductix Backend API",
        version: "2.0.0",
        message: "Next.js Frontend connects to this API at /api",
        endpoints: {
            home: "/api/home",
            courses: "/api/courses",
            thumbnails: "/api/thumbnails",
            reviews: "/api/reviews",
            cart: "/api/cart",
            auth_register: "POST /api/auth/register",
            auth_login: "POST /api/auth/login"
        }
    });
});

// Start server (unless in serverless environment)
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`===============================================`);
        console.log(`🚀 Eductix Express API running on http://localhost:${PORT}`);
        console.log(`🌐 Next.js Frontend runs on http://localhost:3000`);
        console.log(`📡 API Endpoints available at http://localhost:${PORT}/api/`);
        console.log(`===============================================`);
    });
}

module.exports = app;
