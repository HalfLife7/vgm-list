"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var AlbumTracks = require("../../models/albumTrack");

router.get("/missing-names", function (req, res, next) {
  AlbumTracks.query().select("album_id").whereNull("name").where("id", "=", "0").where("disc_id", "=", "0").orderBy("album_id").then(function (albums) {
    res.send(albums);
  })["catch"](function (err) {
    console.error(err.message);
  });
});
module.exports = router;