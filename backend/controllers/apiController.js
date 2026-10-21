const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Models
const { 
    courseSchemaModels, 
    thumbanileSchemaModels, 
    reviewsModels, 
    userreviewsModels, 
    cartModel, 
    categoryModels, 
    userModels 
} = require('../models/courseSchema');

// 1. Get Home Data (Courses, Thumbnails, Reviews)
exports.getHomeData = async (req, res) => {
    try {
        const [thumbnails, courses, reviews] = await Promise.all([
            thumbanileSchemaModels.find({}).catch(() => []),
            courseSchemaModels.find({ isDelete: false }).catch(() => []),
            reviewsModels.find({}).catch(() => [])
        ]);

        res.json({
            success: true,
            data: {
                thumbnails,
                courses,
                reviews
            }
        });
    } catch (error) {
        console.error("API getHomeData error:", error);
        res.status(500).json({ success: false, message: "Error fetching home data", error: error.message });
    }
};

// 2. Courses Endpoints
exports.getAllCourses = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isDelete: false };

        if (category && category !== 'all') {
            query.courseCategory = new RegExp(category, 'i');
        }

        if (search) {
            query.$or = [
                { courseName: new RegExp(search, 'i') },
                { Instructor: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ];
        }

        const courses = await courseSchemaModels.find(query);
        res.json({ success: true, count: courses.length, data: courses });
    } catch (error) {
        console.error("API getAllCourses error:", error);
        res.status(500).json({ success: false, message: "Error fetching courses", error: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseSchemaModels.findOne({ _id: id });
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.json({ success: true, data: course });
    } catch (error) {
        console.error("API getCourseById error:", error);
        res.status(500).json({ success: false, message: "Error fetching course details", error: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const { courseId, courseName, description, courseFee, courseDuration, Instructor, courseCategory, level } = req.body;
        const file = req.file;

        if (!courseId || !courseName || !courseFee) {
            return res.status(400).json({ success: false, message: "Required fields missing" });
        }

        const newCourse = await courseSchemaModels.create({
            courseId,
            courseName,
            description,
            courseFee: Number(courseFee),
            courseDuration: courseDuration || 'Self-paced',
            coursesthumbnailImage: file ? file.filename : 'default.jpg',
            Instructor: Instructor || 'Eductix Mentor',
            courseCategory: courseCategory || 'Development',
            level: level || 'Beginner',
            isDelete: false
        });

        res.status(201).json({ success: true, message: "Course created successfully", data: newCourse });
    } catch (error) {
        console.error("API createCourse error:", error);
        res.status(500).json({ success: false, message: "Error creating course", error: error.message });
    }
};

// 3. Thumbnails / Essential Skills Slider
exports.getThumbnails = async (req, res) => {
    try {
        const thumbnails = await thumbanileSchemaModels.find({});
        res.json({ success: true, count: thumbnails.length, data: thumbnails });
    } catch (error) {
        console.error("API getThumbnails error:", error);
        res.status(500).json({ success: false, message: "Error fetching thumbnails", error: error.message });
    }
};

// 4. Reviews Endpoints
exports.getReviews = async (req, res) => {
    try {
        const reviews = await reviewsModels.find({});
        res.json({ success: true, count: reviews.length, data: reviews });
    } catch (error) {
        console.error("API getReviews error:", error);
        res.status(500).json({ success: false, message: "Error fetching reviews", error: error.message });
    }
};

exports.submitReview = async (req, res) => {
    try {
        const { Name, courseName, review, rating } = req.body;
        const file = req.file;

        const newReview = await userreviewsModels.create({
            Name: Name || "Anonymous Student",
            courseName: courseName || "General Course",
            review,
            rating: rating || "5",
            Image: file ? file.filename : "userProfile.png"
        });

        res.status(201).json({ success: true, message: "Review submitted successfully", data: newReview });
    } catch (error) {
        console.error("API submitReview error:", error);
        res.status(500).json({ success: false, message: "Error submitting review", error: error.message });
    }
};

// 5. Cart Endpoints
exports.getCart = async (req, res) => {
    try {
        const cartItems = await cartModel.find({});
        const total = cartItems.reduce((acc, item) => {
            const price = Number(item.courseFee) || 0;
            return acc + price;
        }, 0);

        res.json({
            success: true,
            count: cartItems.length,
            total,
            discount: 299,
            grandTotal: Math.max(0, total - 299),
            data: cartItems
        });
    } catch (error) {
        console.error("API getCart error:", error);
        res.status(500).json({ success: false, message: "Error fetching cart", error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await courseSchemaModels.findOne({ _id: courseId });

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        const existing = await cartModel.findOne({ courseId: course._id });
        if (existing) {
            return res.json({ success: true, message: "Course already in cart", data: existing });
        }

        const cartItem = await cartModel.create({
            courseId: course._id,
            courseName: course.courseName,
            courseFee: course.courseFee,
            courseCategory: course.courseCategory,
            Instructor: course.Instructor,
            coursesthumbnailImage: course.coursesthumbnailImage
        });

        res.status(201).json({ success: true, message: "Course added to cart", data: cartItem });
    } catch (error) {
        console.error("API addToCart error:", error);
        res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        await cartModel.deleteOne({ _id: id });
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.error("API removeFromCart error:", error);
        res.status(500).json({ success: false, message: "Error removing item", error: error.message });
    }
};

// 6. User Auth Endpoints
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await userModels.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email is already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModels.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        console.error("API registerUser error:", error);
        res.status(500).json({ success: false, message: "Registration failed", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        res.json({
            success: true,
            message: "Login successful",
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error("API loginUser error:", error);
        res.status(500).json({ success: false, message: "Login failed", error: error.message });
    }
};

// 7. Admin Dashboard & Management Endpoints
exports.getAdminStats = async (req, res) => {
    try {
        const [totalCourses, deletedCourses, totalUsers, totalReviews, courses] = await Promise.all([
            courseSchemaModels.countDocuments({ isDelete: false }).catch(() => 0),
            courseSchemaModels.countDocuments({ isDelete: true }).catch(() => 0),
            userModels.countDocuments({}).catch(() => 0),
            reviewsModels.countDocuments({}).catch(() => 0),
            courseSchemaModels.find({ isDelete: false }).sort({ _id: -1 }).limit(5).catch(() => [])
        ]);

        res.json({
            success: true,
            data: {
                totalRevenue: "$45,231.89",
                revenueGrowth: "+20.1%",
                subscriptions: 2350 + totalUsers,
                subscriptionGrowth: "+180.1%",
                sales: 12234 + totalCourses * 15,
                salesGrowth: "+19%",
                activeLearners: 573 + totalUsers,
                totalCourses,
                deletedCourses,
                recentCourses: courses
            }
        });
    } catch (error) {
        console.error("API getAdminStats error:", error);
        res.status(500).json({ success: false, message: "Error fetching admin stats", error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { courseId, courseName, description, courseFee, courseDuration, Instructor, courseCategory, level } = req.body;
        const file = req.file;

        const updateData = {};
        if (courseId) updateData.courseId = courseId;
        if (courseName) updateData.courseName = courseName;
        if (description) updateData.description = description;
        if (courseFee) updateData.courseFee = Number(courseFee);
        if (courseDuration) updateData.courseDuration = courseDuration;
        if (Instructor) updateData.Instructor = Instructor;
        if (courseCategory) updateData.courseCategory = courseCategory;
        if (level) updateData.level = level;
        if (file) updateData.coursesthumbnailImage = file.filename;

        const updated = await courseSchemaModels.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.json({ success: true, message: "Course updated successfully", data: updated });
    } catch (error) {
        console.error("API updateCourse error:", error);
        res.status(500).json({ success: false, message: "Error updating course", error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await courseSchemaModels.findByIdAndUpdate(id, { isDelete: true });
        res.json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        console.error("API deleteCourse error:", error);
        res.status(500).json({ success: false, message: "Error deleting course", error: error.message });
    }
};

exports.restoreCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await courseSchemaModels.findByIdAndUpdate(id, { isDelete: false });
        res.json({ success: true, message: "Course restored successfully" });
    } catch (error) {
        console.error("API restoreCourse error:", error);
        res.status(500).json({ success: false, message: "Error restoring course", error: error.message });
    }
};

exports.getDeletedCourses = async (req, res) => {
    try {
        const courses = await courseSchemaModels.find({ isDelete: true });
        res.json({ success: true, count: courses.length, data: courses });
    } catch (error) {
        console.error("API getDeletedCourses error:", error);
        res.status(500).json({ success: false, message: "Error fetching deleted courses", error: error.message });
    }
};

exports.createThumbnail = async (req, res) => {
    try {
        const { heroTitle, heroSubtitle, buttonText, oldprice, offerprice } = req.body;
        const file = req.file;

        const thumbnail = await thumbanileSchemaModels.create({
            heroTitle: heroTitle || "Essential Skills",
            heroSubtitle: heroSubtitle || "Learn from industry experts",
            buttonText: buttonText || "Enroll Now",
            oldprice: oldprice || "$199",
            offerprice: offerprice || "$99",
            heroThumbnailImage: file ? file.filename : "edubackground01.jpg"
        });

        res.status(201).json({ success: true, message: "Thumbnail created successfully", data: thumbnail });
    } catch (error) {
        console.error("API createThumbnail error:", error);
        res.status(500).json({ success: false, message: "Error creating thumbnail", error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryModels.find({});
        res.json({ success: true, count: categories.length, data: categories });
    } catch (error) {
        console.error("API getCategories error:", error);
        res.status(500).json({ success: false, message: "Error fetching categories", error: error.message });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(400).json({ success: false, message: "Category name required" });
        }
        const newCat = await categoryModels.create({ categoryName });
        res.status(201).json({ success: true, message: "Category created successfully", data: newCat });
    } catch (error) {
        console.error("API addCategory error:", error);
        res.status(500).json({ success: false, message: "Error creating category", error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModels.findByIdAndDelete(id);
        res.json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        console.error("API deleteCategory error:", error);
        res.status(500).json({ success: false, message: "Error deleting category", error: error.message });
    }
};

