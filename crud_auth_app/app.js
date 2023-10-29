const express = require("express");
require("dotenv").config();
const route = require("./routes/route");
const app = new express();
// const cors = require('cors')
app.use(express.json());
// app.use(cors())
app.use(route);
const PORT = process.env.PORT || 4000;

console.log(process.env);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
