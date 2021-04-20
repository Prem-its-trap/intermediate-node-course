const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();
const User = require("./models/User");
// connect to the local database
mongoose.connect("mongodb://localhost/userData");

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

// CREATE
app.post("/users", (req, res) => {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    (err, data) => {
      if (err) {
        res.json({ success: false, message: err });
      } else if (!data) {
        res.json({ success: false, message: "Not found" });
      } else {
        res.json({ success: true, data: data });
      }
    }
  );
});

// route chaining
app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    const id = "607f3e595d6de62d2849b0d9";
    // const id = req.params._id;
    User.findById(id, (err, data) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({
          success: true,
          data: data,
        });
      }
    });
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  });
