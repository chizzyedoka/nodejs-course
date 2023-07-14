const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0/playground3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: authorSchema,
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId, authorName) {
  const course = await Course.findById(courseId);
  course.author.name = authorName;
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

//createCourse("Backend Course", new Author({ name: "Chisom" }));
updateAuthor("64afeaf36fba4a31643cfbc8", "Chisom Edoka");
