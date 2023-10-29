const jwt = require("jsonwebtoken");

const userDashboard = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(req.headers["authorization"], "--------");
  if (!token) {
    res.status(401).send({ message: "No Token Provided." });
  }

  if (token && token.startsWith("Bearer")) {
    console.log(token);
    try {
      token = token.split(" ")[1];
      console.log(token, "deep");
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .send({ message: "Failed to authenticate Token" });
        }
        console.log(decoded.userId, "-----------");
        req.userId = decoded.userId;
        next();
      });
    } catch (error) {
      res.status(401).send({ message: "unauthorised user", status: "failed" });
    }
  }
};

module.exports = { userDashboard };
