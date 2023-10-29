const express = require("express");
const {
  getData,
  postData,
  getSingleData,
  updateData,
  deleteData,
} = require("../controllers/studentController");
const {
  userSignUp,
  userLogin,
  loggedUser,
} = require("../controllers/userController");
const { userDashboard } = require("../middleware/authmiddleware");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("I am from router.");
});

route.get("/get-data", getData);
route.get("/get-singledata/:id", getSingleData);
route.post("/post-data", postData);
route.put("/update-data/:id", updateData);
route.delete("/delete-data/:id", deleteData);

// ---------------------- Authentication -----------------------

route.post("/sign-up", userSignUp);
route.post("/login", userLogin);
route.get("/dashboard", userDashboard, loggedUser);

module.exports = route;
