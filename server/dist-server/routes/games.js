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

var _require = require("objection"),
    raw = _require.raw;

var Game = require("../../models/game");

router.get("/max", function (req, res, next) {
  Game.query().max("id").then(function (gameId) {
    res.send(gameId);
  })["catch"](function (err) {
    console.error(err);
  });
});
router.get("/all", function (req, res, next) {
  Game.query().joinRelated("platforms").whereIn("platforms.platform_id", [4, 5, 7, 8, 9, 11, 12, 18, 19, 21, 23, 29, 30, 32, 41, 48, 49, 130, 6, 92, 20, 22, 24, 33, 37, 38, 46, 137, 159]).where("category", "=", "0").whereExists(Game.relatedQuery("covers")).withGraphFetched("covers").limit(20).orderBy(raw("random()")).then(function (games) {
    games.map(function (game) {
      // game.covers[0] ? game.cover.url.replace("t_thumb", "t_cover_big") : null
      console.log(game.covers);

      if (game.covers !== undefined) {
        var url = game === null || game === void 0 ? void 0 : game.covers[0].url;
        console.log(game.covers);
        console.log(url);
        game.covers[0].url = url.replace("t_thumb", "t_720p");
      }

      var truncate = function truncate(input) {
        return input.length > 250 ? "".concat(input.substring(0, 250), "...") : input;
      };

      if (game.summary !== null) {
        game.summary = truncate(game.summary);
      }
    });
    res.send(games);
  });
});
router.get("/search", function (req, res, next) {
  var searchParams = req.query.name;
  console.log(searchParams);
  Game.query() // use ilike for case insensitive search (postgres feature)
  .where("name", "ilike", "%".concat(searchParams, "%")).where(function (builder) {
    return builder.where("category", "=", "0").orWhere("category", "=", "2").orWhere("category", "=", "4");
  }).whereExists(Game.relatedQuery("covers")).withGraphFetched("covers").withGraphFetched("platforms").orderBy("first_release_date").then(function (games) {
    console.log(games.length);
    games.map(function (game) {
      var _game$covers$;

      // game.covers[0] ? game.cover.url.replace("t_thumb", "t_cover_big") : null
      if (game.covers !== undefined && ((_game$covers$ = game.covers[0]) === null || _game$covers$ === void 0 ? void 0 : _game$covers$.url) !== undefined) {
        var _game$covers$2;

        var url = (_game$covers$2 = game.covers[0]) === null || _game$covers$2 === void 0 ? void 0 : _game$covers$2.url;
        console.log(url);
        game.covers[0].url = url.replace("t_thumb", "t_720p");
      } else {
        game.covers[0] = {
          url: "https://via.placeholder.com/318x512"
        };
      }

      var truncate = function truncate(input) {
        return input.length > 250 ? "".concat(input.substring(0, 250), "...") : input;
      };

      if (game.summary !== null) {
        game.summary = truncate(game.summary);
      }
    });
    res.send(games);
  })["catch"](function (err) {
    console.error(err);
  });
});
router.get("/:id", function (req, res, next) {
  var gameId = req.params.id;
  console.log(gameId);
  Game.query().findById(gameId).withGraphFetched("alternativeNames(selectName, onlyEnglish)").modifiers({
    selectName: function selectName(builder) {
      builder.select("name");
    },
    onlyEnglish: function onlyEnglish(builder) {
      builder.where("comment", "Other");
    }
  }).withGraphFetched("artworks(selectUrl)").modifiers({
    selectUrl: function selectUrl(builder) {
      builder.select("url");
    }
  }).withGraphFetched("covers(selectUrl)").modifiers({
    selectUrl: function selectUrl(builder) {
      builder.select("url");
    }
  }).withGraphFetched("screenshots(selectUrl)").modifiers({
    selectUrl: function selectUrl(builder) {
      builder.select("url");
    }
  }).withGraphFetched("videos(selectVideoIdAndName)").modifiers({
    selectVideoIdAndName: function selectVideoIdAndName(builder) {
      builder.select("name", "video_id");
    }
  }).withGraphFetched("websites(selectCategoryAndUrl)").modifiers({
    selectCategoryAndUrl: function selectCategoryAndUrl(builder) {
      builder.select("category", "url");
    }
  }).withGraphFetched("albums(selectId)").modifiers({
    selectId: function selectId(builder) {
      builder.select("id");
    }
  }).then(function (game) {
    if (game.covers !== undefined) {
      var url = game === null || game === void 0 ? void 0 : game.covers[0].url;
      console.log(game.covers);
      console.log(url);
      game.covers[0].url = url.replace("t_thumb", "t_720p");
    }

    function timeConverter(UNIX_timestamp) {
      var a = new Date(UNIX_timestamp * 1000);
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + " " + month + " " + year;
      return time;
    }

    var dateTime = timeConverter(game.first_release_date);
    game.first_release_date = dateTime;
    console.log(game);
    res.send(game);
  });
});
var _default = router;
exports["default"] = _default;