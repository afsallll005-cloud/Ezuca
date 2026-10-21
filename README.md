# Ezuca – Next.js (JSX) & Express.js Modern Education Platform

A clean full-stack architecture built completely with **React / Next.js 14 JSX** on the frontend and an **Express.js REST API** on the backend. **Zero EJS templates remain.**

---

## 📁 100% JSX Frontend & Express Backend Architecture

```
express11/
├── 🌐 frontend/                          # ALL JSX PAGES & REACT COMPONENTS
│   ├── app/                              # Next.js App Router (100% JSX)
│   │   ├── layout.jsx                    # Root HTML layout with Navbar & Footer
│   │   ├── page.jsx                      # Eductix Modern Landing Page
│   │   ├── globals.css                   # Eductix Design System & CSS tokens
│   │   ├── courses/                      # Course Catalog & [id] Detail Page
│   │   ├── cart/                         # Shopping Cart & Checkout
│   │   ├── pricing/                      # Subscription Plans & FAQ
│   │   ├── syllabus/                     # Curriculum Breakdown & Milestones
│   │   ├── profile/                      # Student Profile & Certificates
│   │   ├── login/                        # Student Authentication
│   │   ├── signup/                       # Student Registration
│   │   │
│   │   └── admin/                        # 🛡️ COMPLETE ADMIN PORTAL (JSX)
│   │       ├── layout.jsx                # Modern Admin Layout with Sidebar & Profile
│   │       ├── page.jsx                  # Dashboard (Revenue, Subscriptions, Sales, Charts)
│   │       ├── courses/page.jsx          # Manage All Courses + Trash Bin & Restore
│   │       ├── add-course/page.jsx       # Add Course Form + Category Modal
│   │       ├── edit-course/[id]/page.jsx # Edit Existing Course Track
│   │       ├── thumbnails/page.jsx       # Set Hero & Essential Skills Slider Slides
│   │       └── reviews/page.jsx          # Moderate & Add Student Reviews
│   │
│   ├── components/                       # Modular UI Components (100% JSX)
│   │   ├── Navbar.jsx                    # Navigation, Search, Cart Badge, Admin link
│   │   ├── Footer.jsx                    # Footer Links & Branding
│   │   ├── SkillsCarousel.jsx            # Essential Skills Slider
│   │   ├── CourseCard.jsx                # Interactive Course Cards
│   │   ├── CourseCatalog.jsx             # Live Category Filters & Search
│   │   ├── WhyUsAccordion.jsx            # Feature Breakdown
│   │   ├── PricingGrid.jsx               # Subscription Grid
│   │   ├── FaqAccordion.jsx              # Expandable FAQs
│   │   └── LandingSections.jsx           # Hero, Marquee, Stats, Testimonials, CTA
│   │
│   ├── lib/
│   │   └── api.js                        # Complete REST API client
│   ├── vercel.json                       # Next.js Vercel deployment configuration
│   ├── next.config.mjs                   # Next.js configuration
│   └── package.json                      # Frontend dependencies (Next.js, React, Swiper)
│
├── ⚙️ backend/                           # EXPRESS REST API & ASSETS
│   ├── controllers/
│   │   └── apiController.js              # REST API Controllers (Courses, Admin, Auth, Cart)
│   ├── models/
│   │   └── courseSchema.js               # CommonJS Mongoose Schemas (Courses, Users, Cart)
│   ├── routes/
│   │   └── apiRoutes.js                  # Express API Router (/api/courses, /api/admin, etc.)
│   ├── public/                           # Static Assets & Course Images
│   │   ├── images/                       # Course Thumbnails, Avatars, Assets
│   │   └── css/                          # CSS Reference
│   ├── .env                              # Backend Environment Variables (PORT=3500, DB_URL)
│   ├── server.js                         # Express Server Entry Point (CORS, Static, Routes)
│   └── package.json                      # Backend dependencies (Express, Mongoose, Multer, etc.)
│
├── .gitignore                            # Excludes node_modules, .next, .env
├── package.json                          # Convenience scripts
└── README.md                             # Documentation
```

---

## 🔄 Complete EJS → JSX Mapping

| Old EJS File | New React / Next.js JSX File | Description |
|---|---|---|
| `view/adminpanel.ejs` | [`frontend/app/admin/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/admin/page.jsx) | Admin Dashboard with Revenue, Subscriptions, Sales & Charts |
| `view/addcourse.ejs` | [`frontend/app/admin/add-course/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/admin/add-course/page.jsx) | Add Course Form + Category Management Modal |
| `view/adminallcourses.ejs` | [`frontend/app/admin/courses/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/admin/courses/page.jsx) | Course Catalog Table with Edit & Delete actions |
| `view/editcourse.ejs` | [`frontend/app/admin/edit-course/[id]/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/admin/edit-course/[id]/page.jsx) | Edit Course Details & Cover Media |
| `view/retrievepage.ejs` | [`frontend/app/admin/courses/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/admin/courses/page.jsx) | Integrated Trash Bin tab with 1-click Restore |
| `view/addthumbanile.ejs` | [`frontend/app/admin/thumbnails/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/admin/thumbnails/page.jsx) | Set Hero & Essential Skills Slider Slides |
| `view/addreviews.ejs` | [`frontend/app/admin/reviews/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/admin/reviews/page.jsx) | Moderate & Publish Student Testimonials |
| `view/index.ejs` | [`frontend/app/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/page.jsx) | Eductix Modern Landing Page |
| `view/moreDetails.ejs` | [`frontend/app/courses/[id]/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/courses/[id]/page.jsx) | Course Details & Curriculum Page |
| `view/addtocart.ejs` | [`frontend/app/cart/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/cart/page.jsx) | Shopping Cart & Checkout Page |
| `view/userlogin.ejs` | [`frontend/app/login/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/login/page.jsx) | Student Sign In Page |
| `view/usersignup.ejs` | [`frontend/app/signup/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/signup/page.jsx) | Student Sign Up Page |
| `view/userprofile.ejs` | [`frontend/app/profile/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/profile/page.jsx) | Student Dashboard & Profile |
| `view/syllabus.ejs` | [`frontend/app/syllabus/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/syllabus/page.jsx) | Full Curriculum Syllabus Breakdown |
| `view/subscribe.ejs` | [`frontend/app/pricing/page.jsx`](file:///c:/afsall/afsall/Node.js/express11/frontend/app/pricing/page.jsx) | Subscription Pricing Tiers & FAQ |

---

## 🗑️ Deleting Legacy EJS Files

Because everything is now in JSX, close any open `.ejs` tabs in your editor, then in your terminal run:
```powershell
Remove-Item -Recurse -Force view, controller, model, api, vercel.json, app.js
```
*(Or simply right-click and delete `view/`, `controller/`, `model/`, and `api/` in your VS Code file explorer).*

---

## 🚀 Running the Project

1. **Start Express Backend API**:
   ```bash
   npm run dev:backend
   ```
   > Runs on `http://localhost:3500`

2. **Start Next.js Frontend**:
   ```bash
   npm run dev:frontend
   ```
   > Runs on `http://localhost:3000`  
   > Student Site: `http://localhost:3000/`  
   > Admin Portal: `http://localhost:3000/admin`
