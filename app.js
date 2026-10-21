const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { gethome, getusersignup, postusersignup, getuserlogin, postuserlogin, getadminpanel, admingetcourse, addcourse, getthumbanile, postthumbanile, getallcourses, getdeletecourse, getRetrievecourse, getrestoreCourse, geteditCourse, posteditCourse, getaddcategory, postaddcategory, getdeletecategory, getaddreview, postaddreview, getcart, getaddcart, getremovecart, postuseraddreview, getuseraddreview, getuserprofile, getMoreDetails, getsyllabus, getsubscribe } = require('./controller/controller');
const mongoose = require('mongoose');
const multer = require('multer');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3500;
const DB_URL = process.env.DB_URL;

if (DB_URL) {
    mongoose.connect(DB_URL)
        .then(() => console.log("Mongoose connection Successful"))
        .catch((error) => console.error("Mongoose connection error:", error));
} else {
    console.log("Warning: DB_URL is not set. Please configure your MongoDB connection string in environment variables.");
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

// View engine setup with absolute paths
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Home
app.get('/', gethome);

// User Sign up
app.get('/usersignup', getusersignup);
app.post('/usersignup', postusersignup);

// User Log in
app.get('/userlogin', getuserlogin);
app.post('/userlogin', postuserlogin);

// Admin Area
app.get('/admin/panel', getadminpanel);
app.get('/admin/addcourse', addcourse);
app.post('/admin/addcourse', upload.single('coursesthumbnailImage'), admingetcourse);

// Add thumbnail
app.get('/admin/addthumbanile', getthumbanile);
app.post('/admin/addthumbanile', upload.single('heroThumbnailImage'), postthumbanile);

// All Courses List Out
app.get('/admin/allcourse', getallcourses);

// All Courses Delete 
app.get('/deleteCourse', getdeletecourse);

// All Course page Retrieve
app.get('/admin/Retrieve', getRetrievecourse);
app.get('/restoreCourse', getrestoreCourse);

// All Course page Edit
app.get('/editCourse', geteditCourse);
app.post("/admin/updatecourse", upload.single('coursesthumbnailImage'), posteditCourse);

// add category
app.get('/admin/addcategory', getaddcategory);
app.post('/admin/addcategory', postaddcategory);
app.get('/deletecategory', getdeletecategory);

// Reviews Area
app.get('/admin/addreview', getaddreview);
app.post('/admin/addreview', upload.single('studentImage'), postaddreview);

// User Cart page
app.get('/cart', getcart);
app.get('/addtocart', getaddcart);
app.get('/removecart', getremovecart);

// User add reviews Area
app.get('/user/addreview', getuseraddreview);
app.post('/user/addreview', upload.single('Image'), postuseraddreview);

// User Profile page
app.get('/user/profile', getuserprofile);

// More Details
app.get('/MoreDetails', getMoreDetails);

// Syllabus page 
app.get('/syllabus', getsyllabus);
app.get('/subscribe', getsubscribe);

// Start server locally (if not running inside serverless Vercel function)
if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log('server started on http://localhost:' + PORT));
}

module.exports = app;