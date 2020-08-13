"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("../config"));

var _axios = _interopRequireDefault(require("axios"));

var router = _express["default"].Router(); // remove for now, cannot get header to send api key
// import igdb from 'igdb-api-node';
// const client = igdb(config.IGDB_KEY);


router.get('/all', function (req, res, next) {
  (0, _axios["default"])({
    url: "https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': _config["default"].IGDB_KEY
    },
    data: 'search "Final Fantasy"; fields name, summary, cover.url;  where version_parent = null; limit 10;'
  }).then(function (response) {
    console.log(response.data);
    response.data.map(function (game) {
      var url = game.cover.url;
      game.cover.url = url.replace("t_thumb", "t_cover_big");

      var truncate = function truncate(input) {
        return input.length > 250 ? "".concat(input.substring(0, 250), "...") : input;
      };

      game.summary = truncate(game.summary);
    });
    res.send(response.data);
  })["catch"](function (err) {
    console.error(err);
  });
});
router.get('/search/:searchParams', function (req, res, next) {
  var searchParams = req.params.searchParams;
  (0, _axios["default"])({
    url: "https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': _config["default"].IGDB_KEY
    },
    data: 'search "' + searchParams + '"; fields name, summary, cover.url;  where version_parent = null; limit 10;'
  }).then(function (response) {
    console.log(response.data);
    response.data.map(function (game) {
      var url = game.cover.url;
      game.cover.url = url.replace("t_thumb", "t_cover_big");

      var truncate = function truncate(input) {
        return input.length > 250 ? "".concat(input.substring(0, 250), "...") : input;
      };

      game.summary = truncate(game.summary);
    });
    res.send(response.data);
  })["catch"](function (err) {
    console.error(err);
  });
});
var _default = router;
exports["default"] = _default;