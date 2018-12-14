var express = require("express");
var app = express();
var routes = require("./routes.js");
app.use("/weather", routes);

module.exports = app;
