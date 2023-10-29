const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//------------------------------------------------------------------------------------------------
const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });
  // console.log(user);

  if (user) {
    res.send({ messege: "email already exists...", status: 409 });
  } else {
    if (name && email && password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        console.log(hashPassword);
        await User.create({
          name,
          email,
          password: hashPassword,
        });
        res
          .status(201)
          .send({ messege: "user registerd successfully...", status: 201 });
      } catch (error) {
        res.send({ messege: "unable to register...", status: "failed" });
      }
    } else {
      res.send({ messege: "all fields are required", status: 500 });
    }
  }
};

//-----------------------------------------------------------------------------------------

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
          console.log(token);
          res.send({ message: "login is successfull...", status: 200 });
        } else {
          res.send({
            message: "either email or password is incorrect...",
            status: 400,
          });
        }
      } else {
        res.send({ message: "you are not registerd user...", status: 400 });
      }
    } else {
      res.send({ message: "all fields are required...", status: 400 });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "unable to login...", status: 400 });
  }
};

//-----------------------------------------------------------------------------------

const loggedUser = async (req, res) => {
  res.send({ user: req.userId, messege: "success" });
};

module.exports = { userSignUp, userLogin, loggedUser };
