const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const apiController = require('../controllers/apiController');

// Multer storage for uploads (prioritizes frontend/public/images, then backend/public/images)
const uploadDir = fs.existsSync(path.join(__dirname, '../frontend/public/images'))
    ? path.join(__dirname, '../frontend/public/images')
    : (fs.existsSync(path.join(__dirname, 'public/images'))
        ? path.join(__dirname, 'public/images')
        : path.join(__dirname, '../../public/images'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname || ''));
    }
});
const upload = multer({ storage: storage });

// Home Aggregate
router.get('/home', apiController.getHomeData);

// Courses
router.get('/courses', apiController.getAllCourses);
router.get('/courses/:id', apiController.getCourseById);
router.post('/courses', upload.single('coursesthumbnailImage'), apiController.createCourse);

// Thumbnails (Essential Skills Slider)
router.get('/thumbnails', apiController.getThumbnails);

// Reviews
router.get('/reviews', apiController.getReviews);
router.post('/reviews', upload.single('Image'), apiController.submitReview);

// Cart
router.get('/cart', apiController.getCart);
router.post('/cart/add', apiController.addToCart);
router.delete('/cart/:id', apiController.removeFromCart);

// Auth
router.post('/auth/register', apiController.registerUser);
router.post('/auth/login', apiController.loginUser);

// Admin Management Routes
router.get('/admin/stats', apiController.getAdminStats);
router.put('/admin/courses/:id', upload.single('coursesthumbnailImage'), apiController.updateCourse);
router.delete('/admin/courses/:id', apiController.deleteCourse);
router.post('/admin/courses/:id/restore', apiController.restoreCourse);
router.get('/admin/courses/deleted', apiController.getDeletedCourses);
router.post('/admin/thumbnails', upload.single('heroThumbnailImage'), apiController.createThumbnail);
router.get('/admin/categories', apiController.getCategories);
router.post('/admin/categories', apiController.addCategory);
router.delete('/admin/categories/:id', apiController.deleteCategory);

module.exports = router;
