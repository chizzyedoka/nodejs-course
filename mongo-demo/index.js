const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

// mongoose
//   .connect("mongodb://0.0.0.0:27017/playground", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((err) => console.error("Could not connect to MongoDB...", err));

// const courseSchema = new mongoose.Schema({
//   name: String,
//   author: String,
//   tags: [String],
//   date: { type: Date, default: Date.now },
//   isPublished: Boolean,
// });

// const Course = mongoose.model("Course", courseSchema); // creating a course class
// // model name, schema  // the model name is the singular version of the collection name

// // saving the object to the database
// async function createCourse() {
//   // creating an object based on the class
//   const course = new Course({
//     name: "Angular Course",
//     author: "Mosh",
//     tags: ["angular", "frontend"],
//     isPublished: true,
//   });
//   const result = await course.save();
//   console.log(result);
// }

// // createCourse();

// // getting the courses from the database
// async function getCourses() {
//   const courses = await Course.find({ author: "Mosh", isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// }
// getCourses();

mongoose
  .connect("mongodb://0.0.0.0:27017/mongo-exercises", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

// async function specificCourses() {
//   return await Course.find({
//     isPublished: true,
//     tags: { $in: ["frontend", "backend"] },
//   })
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1, price: 1 });
// }

// async function run() {
//   const courses = await specificCourses();
//   console.log(courses);
// }

//run();

// async function getCourses() {
//   const courses = await Course.find();
//   console.log(courses);
// }

// getCourses();

// UPDATE course
// query first approach
// findById()
// modify its properties
// save
async function updateCourse() {
  const course = await Course.find({ _id: "5a68fde3f09ad7646ddec17e" });
  if (!course) {
    console.log("not available");
    return;
  }
  course.isPublished = true;
  course.author = "Another Author";
  const result = await course.save();
  console.log(result);
}
updateCourse();

//update first approach
// update directly
// optionally:get the updated document

// updateCourse("5a68fde3f09ad7646ddec17e");
