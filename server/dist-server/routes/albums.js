"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var router = _express["default"].Router();

var Album = require('../../models/album');

router.get('/all', function (req, res, next) {
  Album.query().withGraphFetched('covers').then(function (albums) {
    albums.map(function (album) {
      // album.covers[0] ? album.cover.url.replace("t_thumb", "t_cover_big") : null
      var url = album.covers[0].url;
      album.covers[0].url = url.replace("t_thumb", "t_cover_big");

      var truncate = function truncate(input) {
        return input.length > 250 ? "".concat(input.substring(0, 250), "...") : input;
      };

      album.summary = truncate(album.summary);
    });
    res.send(albums);
  });
});
router.get('/search/:id', function (req, res, next) {
  var searchParams = req.params.searchParams;
  console.log(searchParams);
  console.log(req.params.searchParams);
  Game.query() // use ilike for case insensitive search (postgres feature)
  .where('name', 'ilike', "%".concat(searchParams, "%")).withGraphFetched('covers').then(function (games) {
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
});