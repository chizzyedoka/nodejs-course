const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const Joi = require("joi"); // validation
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const logger = require("./logger");
require("dotenv").config(); //.env
const courses = require("./routes/courses");
const homePage = require("./routes/homepage");

const app = express();

app.set("view engine", "pug"); //template engine
app.set("views", "./views"); //default

// Configuration
// ensure you set the environment by `$env:NODE_ENV="production"`
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

// Environment
// process.env.NODE_ENV; // current node environment still undefined
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`); // returns development environment defautly

//Buit-in middleware
app.use(express.json()); // middleware
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static("public"));

// Third party middleware
app.use(helmet());
app.use("/api/courses", courses);
app.use(homePage);

if (app.get("env") == "production") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

app.use(logger);

app.use((req, res, next) => {
  console.log("Authenticating...");
  next();
});

// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.params); //{year:'year', month: 'month'}
// });

//QUERY STRING PARAMETER
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

// PORT
const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
// app.get();
// app.post(); -- to create a data
// app.put() -- to update resources
// app.delete()
