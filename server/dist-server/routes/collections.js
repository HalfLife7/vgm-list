"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var Collection = require("../../models/collection");

router.get("/max", function (req, res, next) {
  Collection.query().max("id").then(function (collectionId) {
    res.send(collectionId);
  })["catch"](function (err) {
    console.error(err.message);
  });
});
module.exports = router;