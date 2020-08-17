"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

// import config from '../config'
// import axios from 'axios';
var router = _express["default"].Router();

var Game = require('../../models/game'); // remove for now, cannot get header to send api key
// import igdb from 'igdb-api-node';
// const client = igdb(config.IGDB_KEY);
// router.get('/all', function (req, res, next) {
//   axios({
//       url: "https://api-v3.igdb.com/games",
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'user-key': config.IGDB_KEY
//       },
//       data: 'search "Final Fantasy"; fields name, summary, cover.url;  where version_parent = null; limit 10;'
//     })
//     .then(response => {
//       console.log(response.data);
//       response.data.map(game => {
//         let url = game.cover.url;
//         game.cover.url = url.replace("t_thumb", "t_cover_big");
//         const truncate = input =>
//           input.length > 250 ? `${input.substring(0, 250)}...` : input;
//         game.summary = truncate(game.summary);
//       });
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });


router.get('/all', function (req, res, next) {
  Game.query().eager('covers').then(function (games) {
    games.map(function (game) {
      var url = game.covers[0].url;
      game.covers[0].url = url.replace("t_thumb", "t_cover_big");

      var truncate = function truncate(input) {
        return input.length > 250 ? "".concat(input.substring(0, 250), "...") : input;
      };

      game.summary = truncate(game.summary);
    });
    res.send(games);
  });
});
router.get('/search/:searchParams', function (req, res, next) {
  var searchParams = req.params.searchParams;
  console.log(searchParams);
  Game.query() // use ilike for case insensitive search (postgres feature)
  .where('name', 'ilike', "%".concat(searchParams, "%")).eager('covers').then(function (games) {
    console.log(games);
    games.map(function (game) {
      var url = game.covers[0].url;
      game.covers[0].url = url.replace("t_thumb", "t_cover_big");

      var truncate = function truncate(input) {
        return input.length > 250 ? "".concat(input.substring(0, 250), "...") : input;
      };

      game.summary = truncate(game.summary);
    });
    res.send(games);
  });
}); // router.get('/search/:searchParams', function (req, res, next) {
//   const searchParams = req.params.searchParams;
//   axios({
//       url: "https://api-v3.igdb.com/games",
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'user-key': config.IGDB_KEY
//       },
//       data: 'search "' + searchParams + '"; fields name, summary, cover.url;  where version_parent = null; limit 10;'
//     })
//     .then(response => {
//       console.log(response.data);
//       response.data.map(game => {
//         let url = game.cover.url;
//         game.cover.url = url.replace("t_thumb", "t_cover_big");
//         const truncate = input =>
//           input.length > 250 ? `${input.substring(0, 250)}...` : input;
//         game.summary = truncate(game.summary);
//       });
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });

var _default = router;
exports["default"] = _default;