var express = require("express");
router = express.Router();
var controller = require("./controller.js");
router.get("/:city", controller.get.weatherByCity);

module.exports = router;
