"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _require = require("objection"),
    raw = _require.raw;

var router = _express["default"].Router();

var GameScreenshots = require("../../models/gameScreenshot");

router.get("/random", function (req, res, next) {
  GameScreenshots.query().select("url").where("width", ">=", "1280").orderBy(raw("random()")).limit(1).then(function (screenshot) {
    screenshot[0].url = screenshot[0].url.replace("t_thumb", "t_1080p");
    res.send(screenshot[0]);
  })["catch"](function (err) {
    console.error(err.message);
  });
});
module.exports = router;