"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var Platform = require("../../models/platform");

router.get("/max", function (req, res, next) {
  Platform.query().max("id").then(function (platformId) {
    res.send(platformId);
  })["catch"](function (err) {
    console.error(err.message);
  });
});
module.exports = router;