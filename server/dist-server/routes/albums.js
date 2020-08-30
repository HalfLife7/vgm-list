"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var Album = require('../../models/album');

router.get('/all', function (req, res, next) {
  Album.query().withGraphFetched('albumArtists.[artists(selectName)]').modifiers({
    selectName: function selectName(builder) {
      builder.select('name');
    }
  }).then(function (albums) {
    res.send(albums);
  });
});
router.get('/:id', function (req, res, next) {
  var albumId = req.params.id;
  Album.query().findById(albumId).withGraphFetched('albumArtists.[artists(selectName)]').modifiers({
    selectName: function selectName(builder) {
      builder.select('name');
    }
  }).then(function (albums) {
    res.send(albums);
  });
});
router.get('/', function (req, res, next) {});
var _default = router;
exports["default"] = _default;