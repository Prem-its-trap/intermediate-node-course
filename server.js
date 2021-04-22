const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();
const User = require("./models/User");
// connect to the local database
mongoose
  .connect("mongodb://localhost:27017/userData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

function sendResponse(res, err, data) {
  if (err) {
    res.json({
      success: false,
      message: err,
    });
  } else if (!data) {
    res.json({
      success: false,
      message: "Not Found",
    });
  } else {
    res.json({
      success: true,
      data: data,
    });
  }
}

//       name: req.body.newData.name,
// email: req.body.newData.email,
// password: req.body.newData.password,
// ALTERNATE OF THIS IS TO SPREAD THE DATA LIKE THIS =====>> {...req.body.newData}

// CREATE
app.post("/users", (req, res) => {
  User.create(
    {
      ...req.body.newData,
    },
    (err, data) => {
      sendResponse(res, err, data);
    }
  );
});

app.get("/users", (req, res) => {
  User.find({}, (err, data) => {
    sendResponse(res, err, data);
  });
});
// route chaining
app
  .route("/users/:id")
  // READ
  .get((req, res) => {
    // const id = "607f3e595d6de62d2849b0d9";
    const id = req.params.id;
    console.log(id);
    User.findById(id, (err, data) => {
      sendResponse(res, err, data);
    });
  })
  // UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.newData.name,
        email: req.body.newData.email,
        password: req.body.newData.password,
      },
      {
        new: true,
      },
      (err, data) => {
        sendResponse(res, err, data);
      }
    );
  })
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  });
