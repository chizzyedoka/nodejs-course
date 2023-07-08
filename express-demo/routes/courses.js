const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// route.METHOD(endpoint, Handler)
router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  console.log(req.body);
  courses.push(course);
  res.send(course);
});

//UPDATE
router.put("/:id", (req, res) => {
  //Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Course doesn't exist");
    return;
  }

  // Validate
  // If invalid, return 400 - Bad request

  //const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); // result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update course
  console.log(`Update ${course.name} to ${req.body.name}`);
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
});

// code re-structring; in order to avoid repeating validation code
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

// Delete
router.delete("/:id", (req, res) => {
  // Look up the course
  // Not existing, return 404
  const course = courses.find((c) => c.id == parseInt(req.params.id));
  if (!course) res.status(404).send(`The course with given ID doesn't exist`);
  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // Return the same course
  res.status(200).send(course);
});

//ROUTE PARAMETERS

// app.get("/api/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });

router.get("/:id", (req, res) => {
  const course = courses.find(({ id, name }) => id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("The course with the given ID was not found");
  }
  res.send(course);
});

module.exports = router;
