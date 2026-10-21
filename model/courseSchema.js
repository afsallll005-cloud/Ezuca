import mongoose from 'mongoose'


// ---------------------------------------------  corse Schema  -----------------------------------------------------
const courseSchema = new mongoose.Schema({
  //course Area
  courseId: { type: String, required: true, uppercase: true },
  courseName: { type: String, required: true, uppercase: true },
  description: { type: String, required: true },
  courseFee: { type: Number, required: true },
  courseDuration: { type: String, required: true },
  hours: { type: Number },
  coursesthumbnailImage: { type: String, required: true },
  Instructor: { type: String, required: true, uppercase: true },
  courseCategory: { type: String, required: true },
  level: { type: String, required: true },
  isDelete: { type: Boolean, default: false, required: true },

  //hero Area
  // herothumbnailImage: { type: String },

});

export const courseSchemaModels = mongoose.model('CourseCollection', courseSchema)








// ------------------------------------------   Tumbanile Area ---------------------------------------------------------

const thumbanileSchema = new mongoose.Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  buttonText: { type: String, required: true },
  oldprice: { type: String },
  offerprice: { type: String },
  heroThumbnailImage: { type: String, required: true },

});

export const thumbanileSchemaModels = mongoose.model('ThumanileCollection', thumbanileSchema)








//--------------------------------------------   user Schema  ----------------------------------------------------------
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export const userModels = mongoose.model('UserCollection', userSchema)



// ------------------------------------------ category Schema  --------------------------------------------------------
const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },

})

export const categoryModels = mongoose.model('categoryCollection', categorySchema)


//----------------------------------------- add reviews schema --------------------------------------------------------
const reviewsSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  courseName: { type: String, required: true },
  review: { type: String, required: true },
  studentImage: { type: String, required: true },
})

export const reviewsModels = mongoose.model('reviewsCollection', reviewsSchema)



//----------------------------------------- add reviews schema --------------------------------------------------------
const userreviewsSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  courseName: { type: String, required: true },
  review: { type: String, required: true },
  Image: { type: String, required: true },
  rating: { type: String, required: true }
})

export const userreviewsModels = mongoose.model('user_reviewsCollection', userreviewsSchema)







//  ------------------------------------------- cart shema ----------------------------------------------

const cartSchema = new mongoose.Schema({

  courseName: { type: String, required: true, uppercase: true },
  courseFee: { type: String, required: true },
  coursesthumbnailImage: { type: String, required: true },
  courseCategory: { type: String, required: true, uppercase: true },
  userId: { type: String, required: true },
  Instructor: { type: String, required: true, uppercase: true },

  quantity: {
    type: Number,
    default: 1
  }

})

export const cartModel = mongoose.model('cartCollection', cartSchema)