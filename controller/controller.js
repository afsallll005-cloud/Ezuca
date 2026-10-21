import { cartModel, categoryModels, courseSchemaModels, reviewsModels, thumbanileSchemaModels, userModels, userreviewsModels } from "../model/courseSchema.js";
// Requiring module
import bcrypt from 'bcrypt';


//  get Home 
export async function gethome(req, res) {

    try {
        const thumbanile = await thumbanileSchemaModels.find({});
        console.log(thumbanile);

        const course = await courseSchemaModels.find({ isDelete: false });
        console.log(course);

         const reviews = await reviewsModels.find({});
        console.log(reviews);

        res.render('index', { thumbanile: thumbanile, course: course ,reviews: reviews})

    } catch (error) {
        console.log('Error found in index page', error)
    }

}


// User sign up
export function getusersignup(req, res) {
    res.render('usersignup')
}

export async function postusersignup(req, res) {
    try {
        const { username, email, password, cpassword } = req.body
        console.log(username, email, password)



        if (username.length == 0 || email == 0 || password.length == 0) {
            res.send('All fields are required');
        } else if (password !== cpassword) {
            res.send('Password is not match to Confirm password');
        }
        else {
            // 1️. Generate salt
            const salt = await bcrypt.genSalt(10);
            // 2️. Hash password
            const hashedPassword = await bcrypt.hash(password, salt);


            userModels.insertOne({
                username: username,
                email: email,
                password: hashedPassword,
            }); console.log('User added successfully');
        }
        res.redirect('/')

    } catch (error) {
        console.log('Error found in add User', error)
    }
}


// User Log in 
export function getuserlogin(req, res) {
    res.render('userlogin')
}

export const postuserlogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log(email, password);
        const isDuplicateUsername = await userModels.findOne({ email: email })
        console.log(isDuplicateUsername)

        if (!isDuplicateUsername) {
            return res.send('User Not Found');
        }

        // Compare hashed password correctly
        const isMatch = await bcrypt.compare(password, isDuplicateUsername.password);

        if (!isMatch) {
            return res.send('Invalid Password');
        }

        //  Login success
        res.redirect('/admin/panel');

    } catch (error) {
        console.log('Error finding user:', error)
    }

}


// Admin panel
export function getadminpanel(req, res) {
    res.render('adminpanel')
}

// Admin Add course Get
export async function addcourse(req, res) {




     try {

        const categories = await categoryModels.find({})

        res.render('addcourse', { categories:categories })

    } catch (error) {
        console.log("Add course page error:", error)
    }

}



// Admin Add course Post

export async function admingetcourse(req, res) {

    try {
        const { courseId, courseName, description, courseFee, courseDuration, coursesthumbnailImage, Instructor, courseCategory, level } = req.body
        const file = req.file;

        console.log(courseId, courseName, description, courseFee, courseDuration, coursesthumbnailImage, Instructor, courseCategory, level, file)

        if (courseId.length == 0 || courseName.length == 0 || courseFee == 0 || courseDuration == 0 || Instructor == 0 || courseCategory == 0) {
            res.send('All fields are required');
        } else {
            await courseSchemaModels.insertOne({
                courseId: courseId,
                courseName: courseName,
                description: description,
                courseFee: courseFee,
                courseDuration: courseDuration,
                coursesthumbnailImage: file.filename,
                Instructor: Instructor,
                courseCategory: courseCategory,
                level: level

            }).then(() => {
                res.redirect('/admin/addcourse')
            }).catch((err) => {
                console.log('error addeding Course  ');
            })
        }

    } catch (error) {
        console.log('Error found in add Course', error)
    }

}


// Admin Get thumbanile
export function getthumbanile(req, res) {
    res.render('addthumbanile')
}

export async function postthumbanile(req, res) {


    try {
        const { heroTitle, heroSubtitle, buttonText, oldprice, offerprice, heroThumbnailImage } = req.body
        const file = req.file;
        console.log(heroTitle, heroSubtitle, buttonText, oldprice, offerprice, heroThumbnailImage, file);

        if (heroTitle.length == 0 || heroSubtitle.length == 0 || buttonText == 0 || heroThumbnailImage == 0) {
            res.send('All fields are required');
        } else {
            await thumbanileSchemaModels.insertOne({
                heroTitle: heroTitle,
                heroSubtitle: heroSubtitle,
                buttonText: buttonText,
                oldprice: oldprice,
                offerprice: offerprice,
                heroThumbnailImage: file.filename,


            }).then(() => {
                res.render('addthumbanile')
            }).catch((err) => {
                console.log('error addeding Thumbanile ', err);
            })
        }

    } catch (error) {
        console.log('error addeding Thumbanileee', error);
    }

}



// Admin Get All Courses

export async function getallcourses(req, res) {

    try {
        const course = await courseSchemaModels.find({ isDelete: false });
        console.log(course);


        res.render('adminallcourses', { course: course, });
    } catch (erro) {
        console.log('Error found in Get Course', erro)
    }
}


// Admin get page Delete

export const getdeletecourse = (req, res) => {
    try {
        const { courseId } = req.query
        console.log(courseId)

        courseSchemaModels.updateOne({
            _id: courseId
        }, {
            $set: { isDelete: true }
        }).then((result) => {
            console.log(result);
            res.redirect('/admin/allcourse');

        }).catch((error) => {
            console.log('error deleting Course:', error);
            res.send('Error deleting Course')
        })

    } catch (errr) {
        console.log('error deleting Course:', errr);
    }
}


// Admin get page Edit

export const geteditCourse = async (req, res) => {

    try {
        const { courseId } = req.query
        console.log(courseId)
        const courseDetails = await courseSchemaModels.findOne({ _id: courseId })
        res.render('editcourse', { file: courseDetails.coursesthumbnailImage, courseDetails: courseDetails })

    } catch (error) {
        console.log('error In Edit Course:', error);
    }
}

// Admin Edit post

export const posteditCourse = async (req, res) => {
    try {

        const { courseName, courseFee, courseDuration, Instructor ,description} = req.body;
        const { courseId } = req.query;

        console.log(courseId);

        let updatedata = {
            courseName,
            courseFee,
            courseDuration,
            Instructor,
             description
        };

        // only add image if uploaded
        if (req.file) {
            updatedata.coursesthumbnailImage = req.file.filename;
        }

        await courseSchemaModels.updateOne(
            { _id: courseId },
            { $set: updatedata }
        );

        res.redirect('/admin/allcourse');

    } catch (error) {
        console.log('Error editing product', error);
        res.send("Something went wrong");
    }
};









// Admin get page Retrive

export const getRetrievecourse = async (req, res) => {
    try {
        const deletedcourse = await courseSchemaModels.find({
            isDelete: true
        });
        console.log("Deleted Course:", deletedcourse);
        res.render("retrievepage", {
            course: deletedcourse
        });

    } catch (error) {
        console.log("Error in loading retrieve deleted Course:", error);
    }
};


// Admin get restore
export async function getrestoreCourse(req, res) {

    try {
        const { courseId } = req.query
        console.log(courseId)

        await courseSchemaModels.updateOne({
            _id: courseId
        }, {
            $set: { isDelete: false }
        }).then((result) => {
            console.log(result);
            res.redirect('/admin/Retrieve');

        }).catch((error) => {
            console.log('error restoring course:', error);
            res.send('error restoring course')
        })

    } catch (errr) {
        console.log('error restoring course:', errr);
    }

}


// Admin add category Get
// Admin add category Get
export async function getaddcategory(req, res) {

    try {

        const categories = await categoryModels.find()

        res.render('addcourse', { categories: categories })

    } catch (error) {
        console.log('error add category get:', error);
    }
}


// Admin add category Post
export async function postaddcategory(req, res) {
    try {

        const { categoryName } = req.body

        await categoryModels.insertOne({
            categoryName: categoryName
        });

        res.redirect('/admin/addcategory')

    } catch (error) {
        console.log('error add category Post:', error);
    }
}


// Admin add category Delete
export const getdeletecategory = async (req, res) => {
    try {

        const { Id } = req.query

        await categoryModels.deleteOne({
            _id: Id
        })

        res.redirect('/admin/addcategory')

    } catch (errr) {
        console.log('error deleting category:', errr);
    }
}



// Admin Add Reviews Area get

export  function getaddreview(req, res) {
    res.render('addreviews')
}


// Admin Add Reviews Area Post
export  async function postaddreview(req, res) {

     try {
        const {  studentName,  courseName,  review,  studentImage } = req.body
        const file = req.file;
        console.log(studentName,  courseName,  review,  studentImage, file);


        if (studentName.length == 0 || courseName.length == 0 || review == 0) {
            res.send('All fields are required');
        } else {
            await reviewsModels.insertOne({
              studentName: studentName,
               courseName: courseName,
                review: review,
               
                studentImage: file.filename,


            }).then(() => {
               res.render('addreviews')
            }).catch((err) => {
                console.log('error adding Reviews ', err);
            })
        }

    } catch (error) {
        console.log('error adding Reviews', error);
    }


}



// cart page get

export async function getcart(req, res) {

    const addtocartcourse = await cartModel.find({});
    console.log(addtocartcourse)


    
         const userreviews = await userreviewsModels.find({});
        console.log(userreviews);


    res.render('addtocart', { addtocartcourse: addtocartcourse ,userreviews: userreviews})

 
}




export async function getaddcart(req, res) {
    try {

        const { courseId } = req.query;

        const addtocartcourse = await courseSchemaModels.findOne({ _id: courseId });
        console.log(addtocartcourse);

        if (courseId) {

            // check if course already in cart
            const existingCourse = await cartModel.findOne({ userId: courseId });

            if (!existingCourse) {

                await cartModel.insertOne({
                    courseName: addtocartcourse.courseName,
                    courseFee: addtocartcourse.courseFee,
                    courseCategory: addtocartcourse.courseCategory,
                    Instructor: addtocartcourse.Instructor,
                    coursesthumbnailImage: addtocartcourse.coursesthumbnailImage,
                    userId: courseId
                }); 

                console.log("Course added to cart");

            } else {
                console.log("Course already in cart");
            }
        }

        const cartcourse = await cartModel.find({});
        console.log(cartcourse);

        res.redirect('/');

    } catch (error) {
        console.log('Error loading buy product:', error);
        res.send('Error');
    }
}



// Remove cart
export const getremovecart = (req, res) => {
    try {
        const { coursetId } = req.query
        console.log(coursetId)

        cartModel.deleteOne({
            _id: coursetId
        }).then((result) => {
            console.log(result);
            res.redirect('/cart');

        }).catch((error) => {
            console.log('error deleting product:', error);
            res.send('Error deleting product')
        })

    } catch (errr) {
        console.log('error deleting product:', errr);
    }
}


export function getuseraddreview (req, res) {


    res.render('addtocart')
}



export  async function postuseraddreview(req, res) {

     try {
        const { Name,  courseName,  review,  rating, Image } = req.body
        const file = req.file;
        console.log(Name,  courseName,  review, rating,  Image, file);

        // const addtocartcourse =  courseSchemaModels.findOne({  });


        if (Name.length == 0 || courseName.length == 0 || review == 0) {
            res.send('All fields are required');
        } else {
            await userreviewsModels.insertOne({
              Name: Name,
               courseName: courseName,
                review: review,
                rating: rating,
                Image: file.filename,


            }).then(() => {
               res.redirect('/cart' )
            }).catch((err) => {
                console.log('error adding Reviews ', err);
            })
        }

    } catch (error) {
        console.log('error adding Reviews', error);
    }



}

//  User Profile
export function getuserprofile (req, res) {


    res.render('userprofile')
}


// More Details
export async function getMoreDetails (req, res) {

     const { courseId } = req.query
        console.log(courseId)
        const MoreDetails = await courseSchemaModels.findOne({ _id: courseId })
        res.render('moreDetails' ,{ MoreDetails: MoreDetails})

}



// get syllabus page
export function getsyllabus (req, res) {

    
    res.render('syllabus')
}


export function getsubscribe (req, res) {
    res.render('subscribe')
}

