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

/* GET home page. */


router.get('/all', function (req, res, next) {
  (0, _axios["default"])({
    url: "https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': _config["default"].IGDB_KEY
    },
    data: "fields *; where id = 1942;"
  }).then(function (response) {
    console.log(response.data);
    res.send(response.data);
  })["catch"](function (err) {
    console.error(err);
  });
});
router.get('/cover', function (req, res, next) {
  (0, _axios["default"])({
    url: "https://api-v3.igdb.com/covers",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': _config["default"].IGDB_KEY
    },
    data: "fields alpha_channel,animated,checksum,game,height,image_id,url,width; where id = 89386;"
  }).then(function (response) {
    console.log(response.data);
    res.send(response.data);
  })["catch"](function (err) {
    console.error(err);
  });
});
var _default = router;
exports["default"] = _default;