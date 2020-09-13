"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _moment = _interopRequireDefault(require("moment"));

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

    if (game.artworks !== undefined) {
      game.artworks.map(function (artwork) {
        var url = artwork.url;
        artwork.url = url.replace("t_thumb", "t_720p");
      });
    }

    if (game.screenshots !== undefined) {
      game.screenshots.map(function (screenshot) {
        var url = screenshot.url;
        screenshot.url = url.replace("t_thumb", "t_720p");
      });
    } // if (game.videos !== undefined) {
    //   game.videos.map((video) => {
    //     const url = video.video_id;
    //     video.video_id = "https://www.youtube.com/watch?v=" + url;
    //   });
    // }


    game.first_release_date = _moment["default"].unix(game.first_release_date).format("YYYY-MM-DD");

    if (game.websites !== undefined) {
      game.websites.map(function (website) {
        console.log(website.category);

        if (website.category === "1") {
          website.type = "Official";
          website.logo = "https://icongr.am/octicons/verified.svg?size=148&color=0080ff";
        } else if (website.category === "2") {
          website.type = "Wikia";
          website.logo = "https://upload.wikimedia.org/wikipedia/commons/1/17/Wikia_Logo.svg";
        } else if (website.category === "3") {
          website.type = "Wikipedia";
          website.logo = "https://www.vectorlogo.zone/logos/wikipedia/wikipedia-tile.svg";
        } else if (website.category === "4") {
          website.type = "Facebook";
          website.logo = "https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg";
        } else if (website.category === "5") {
          website.type = "Twitter";
          website.logo = "https://www.vectorlogo.zone/logos/twitter/twitter-tile.svg";
        } else if (website.category === "6") {
          website.type = "Twitch";
          website.logo = "https://www.vectorlogo.zone/logos/twitch/twitch-tile.svg";
        } else if (website.category === "8") {
          website.type = "Instagram";
          website.logo = "https://www.vectorlogo.zone/logos/instagram/instagram-tile.svg";
        } else if (website.category === "9") {
          website.type = "Youtube";
          website.logo = "https://www.vectorlogo.zone/logos/youtube/youtube-tile.svg";
        } else if (website.category === "10") {
          delete website.category;
        } else if (website.category === "11") {
          delete website.category;
        } else if (website.category === "12") {
          website.type = "Android";
          website.logo = "https://www.vectorlogo.zone/logos/google_play/google_play-tile.svg";
        } else if (website.category === "13") {
          website.type = "Steam";
          website.logo = "https://www.vectorlogo.zone/logos/steampowered/steampowered-tile.svg";
        } else if (website.category === "14") {
          website.type = "Reddit";
          website.logo = "https://www.vectorlogo.zone/logos/reddit/reddit-tile.svg";
        } else if (website.category === "15") {
          website.type = "Itch";
          website.logo = "https://www.vectorlogo.zone/logos/discordapp/discordapp-tile.svg";
        } else if (website.category === "16") {
          website.type = "Epic Games";
          website.logo = "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg";
        } else if (website.category === "17") {
          website.type = "GOG";
          website.logo = "https://www.vectorlogo.zone/logos/gog/gog-icon.svg";
        } else if (website.category === "18") {
          website.type = "Discord";
          website.logo = "https://www.vectorlogo.zone/logos/discordapp/discordapp-tile.svg";
        } else {
          delete website.category;
        }
      });
    }

    console.log(game);
    res.send(game);
  });
});
var _default = router;
exports["default"] = _default;