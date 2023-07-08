const express = require("express");

const app = express();

// applies globally to all the routes
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

const groceryList = [
  {
    item: "milk",
    quantity: 2,
  },
  {
    item: "cereal",
    quantity: 1,
  },
  {
    item: "sugar",
    quantity: 5,
  },
];

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get(
  "/groceries",
  (req, res, next) => {
    console.log("Before Handling Request");
    next();
  },
  (req, res) => {
    res.send(groceryList);
  }
);

app.post("/groceries", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  res.status(200).send(groceryList);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));
