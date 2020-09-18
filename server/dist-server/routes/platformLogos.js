"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var PlatformLogo = require("../../models/platformLogo");

router.get("/max", function (req, res, next) {
  PlatformLogo.query().max("id").then(function (platformLogoId) {
    res.send(platformLogoId);
  })["catch"](function (err) {
    console.error(err.message);
  });
});
module.exports = router;