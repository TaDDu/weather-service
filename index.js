require("dotenv").config();
const express = require("express");
const app = express();
const eStatics = require("e-statics")(app);
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(eStatics.counter);
app.use("/api", require("./lib"));
const port = process.env.PORT;
app.listen(port, function() {
  console.log("Server started at port: %i", port);
});
