import util from "util";
import express from "express";
import moment from "moment";
const router = express.Router();

const { raw } = require("objection");
const Game = require("../../models/game");

router.get("/max", (req, res, next) => {
  Game.query()
    .max("id")
    .then((gameId) => {
      res.send(gameId);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

router.get("/all", (req, res, next) => {
  Game.query()
    // .innerJoin("game_platforms", "games.id", "game_platforms.game_id")
    // .select([
    //   "games.*",
    //   raw("ARRAY_AGG(game_platforms.platform_id) as platforms"),
    // ])
    .whereExists(Game.relatedQuery("albums"))
    // .modifiers({
    //   filterPlatform(builder) {
    //     builder.whereIn("platform_id", [
    //       4,
    //       5,
    //       7,
    //       8,
    //       9,
    //       11,
    //       12,
    //       18,
    //       19,
    //       21,
    //       23,
    //       29,
    //       30,
    //       32,
    //       41,
    //       48,
    //       49,
    //       130,
    //       6,
    //       92,
    //       20,
    //       22,
    //       24,
    //       33,
    //       37,
    //       38,
    //       46,
    //       137,
    //       159,
    //     ]);
    //   },
    // })
    .where("category", "=", "0")
    .whereExists(Game.relatedQuery("covers"))
    .withGraphFetched("covers")
    .limit(20)
    .orderBy(raw("random()"))
    .groupBy("games.id")
    .then((games) => {
      games.map((game) => {
        // game.covers[0] ? game.cover.url.replace("t_thumb", "t_cover_big") : null
        if (game.covers !== undefined) {
          const url = game?.covers[0].url;
          game.covers[0].url = url.replace("t_thumb", "t_720p");
        }

        const truncate = (input) =>
          input.length > 250 ? `${input.substring(0, 250)}...` : input;

        if (game.summary !== null) {
          game.summary = truncate(game.summary);
        }
      });
      // console.log(util.inspect(games, false, null, true));
      res.send(games);
    });
});

// TODO: add collections route

router.get("/search-by-exact-name/:name", (req, res, next) => {
  const gameName = req.params.name.toLowerCase();

  Game.query()
    .leftJoin(
      "game_alternative_names",
      "games.id",
      "=",
      "game_alternative_names.game_id"
    )
    .select(
      "games.*",
      "game_alternative_names.name AS alternative_name",
      "game_alternative_names.comment"
    )
    .where((builder) =>
      builder
        .where("games.name", "ilike", gameName)
        .orWhere("game_alternative_names.name", "ilike", gameName)
    )
    .then((game) => {
      // console.log(game[0]);
      res.send(game[0]);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

router.get("/search", (req, res, next) => {
  const searchParams = req.query.name;
  // console.log(searchParams);
  Game.query()
    // use ilike for case insensitive search (postgres feature)
    .where("name", "ilike", `%${searchParams}%`)
    .where((builder) =>
      builder
        .where("category", "=", "0")
        .orWhere("category", "=", "2")
        .orWhere("category", "=", "4")
    )
    .whereExists(Game.relatedQuery("covers"))
    .withGraphFetched("covers")
    .withGraphFetched("platforms")
    .orderBy("first_release_date")
    .then((games) => {
      // console.log(games.length);
      games.map((game) => {
        // game.covers[0] ? game.cover.url.replace("t_thumb", "t_cover_big") : null
        if (game.covers !== undefined && game.covers[0]?.url !== undefined) {
          const url = game.covers[0]?.url;
          // console.log(url);
          game.covers[0].url = url.replace("t_thumb", "t_720p");
        } else {
          game.covers[0] = {
            url: "https://via.placeholder.com/318x512",
          };
        }

        const truncate = (input) =>
          input.length > 250 ? `${input.substring(0, 250)}...` : input;

        if (game.summary !== null) {
          game.summary = truncate(game.summary);
        }
      });
      res.send(games);
    })
    .catch((err) => {
      console.error(err.message);
    });
});

router.get("/:id", (req, res, next) => {
  const gameId = req.params.id;
  // console.log(gameId);

  Game.query()
    .findById(gameId)
    .withGraphFetched("alternativeNames(selectName, onlyEnglish)")
    .modifiers({
      selectName: (builder) => {
        builder.select("name");
      },
      onlyEnglish: (builder) => {
        builder.where("comment", "Other");
      },
    })
    .withGraphFetched("artworks(selectUrl)")
    .modifiers({
      selectUrl: (builder) => {
        builder.select("url");
      },
    })
    .withGraphFetched("covers(selectUrl)")
    .modifiers({
      selectUrl: (builder) => {
        builder.select("url");
      },
    })
    .withGraphFetched("screenshots(selectUrl)")
    .modifiers({
      selectUrl: (builder) => {
        builder.select("url");
      },
    })
    .withGraphFetched("videos(selectVideoIdAndName)")
    .modifiers({
      selectVideoIdAndName: (builder) => {
        builder.select("name", "video_id");
      },
    })
    .withGraphFetched("websites(selectCategoryAndUrl)")
    .modifiers({
      selectCategoryAndUrl: (builder) => {
        builder.select("category", "url");
      },
    })
    .withGraphFetched("albums(selectId)")
    .modifiers({
      selectId: (builder) => {
        builder.select("album_id");
      },
    })
    .then((game) => {
      if (game.covers !== undefined) {
        const url = game?.covers[0].url;
        // console.log(game.covers);
        // console.log(url);
        game.covers[0].url = url.replace("t_thumb", "t_720p");
      }

      if (game.artworks !== undefined) {
        game.artworks.map((artwork) => {
          const url = artwork.url;
          artwork.url = url.replace("t_thumb", "t_720p");
        });
      }

      if (game.screenshots !== undefined) {
        game.screenshots.map((screenshot) => {
          const url = screenshot.url;
          screenshot.url = url.replace("t_thumb", "t_720p");
        });
      }

      // if (game.videos !== undefined) {
      //   game.videos.map((video) => {
      //     const url = video.video_id;
      //     video.video_id = "https://www.youtube.com/watch?v=" + url;
      //   });
      // }

      game.first_release_date = moment
        .unix(game.first_release_date)
        .format("YYYY-MM-DD");

      if (game.websites !== undefined) {
        game.websites.map((website) => {
          // console.log(website.category);
          if (website.category === "1") {
            website.type = "Official";
            website.logo =
              "https://icongr.am/octicons/verified.svg?size=148&color=0080ff";
          } else if (website.category === "2") {
            website.type = "Wikia";
            website.logo =
              "https://upload.wikimedia.org/wikipedia/commons/1/17/Wikia_Logo.svg";
          } else if (website.category === "3") {
            website.type = "Wikipedia";
            website.logo =
              "https://www.vectorlogo.zone/logos/wikipedia/wikipedia-tile.svg";
          } else if (website.category === "4") {
            website.type = "Facebook";
            website.logo =
              "https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg";
          } else if (website.category === "5") {
            website.type = "Twitter";
            website.logo =
              "https://www.vectorlogo.zone/logos/twitter/twitter-tile.svg";
          } else if (website.category === "6") {
            website.type = "Twitch";
            website.logo =
              "https://www.vectorlogo.zone/logos/twitch/twitch-tile.svg";
          } else if (website.category === "8") {
            website.type = "Instagram";
            website.logo =
              "https://www.vectorlogo.zone/logos/instagram/instagram-tile.svg";
          } else if (website.category === "9") {
            website.type = "Youtube";
            website.logo =
              "https://www.vectorlogo.zone/logos/youtube/youtube-tile.svg";
          } else if (website.category === "10") {
            website.type = "Apple App Store";
            website.logo =
              "https://www.vectorlogo.zone/logos/apple/apple-tile.svg";
          } else if (website.category === "11") {
            website.type = "Apple App Store";
            website.logo =
              "https://www.vectorlogo.zone/logos/apple/apple-tile.svg";
          } else if (website.category === "12") {
            website.type = "Google Play Store";
            website.logo =
              "https://www.vectorlogo.zone/logos/google_play/google_play-tile.svg";
          } else if (website.category === "13") {
            website.type = "Steam";
            website.logo =
              "https://www.vectorlogo.zone/logos/steampowered/steampowered-tile.svg";
          } else if (website.category === "14") {
            website.type = "Reddit";
            website.logo =
              "https://www.vectorlogo.zone/logos/reddit/reddit-tile.svg";
          } else if (website.category === "15") {
            website.type = "Itch";
            website.logo =
              "https://www.vectorlogo.zone/logos/discordapp/discordapp-tile.svg";
          } else if (website.category === "16") {
            website.type = "Epic Games";
            website.logo =
              "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg";
          } else if (website.category === "17") {
            website.type = "GOG";
            website.logo = "https://www.vectorlogo.zone/logos/gog/gog-icon.svg";
          } else if (website.category === "18") {
            website.type = "Discord";
            website.logo =
              "https://www.vectorlogo.zone/logos/discordapp/discordapp-tile.svg";
          } else {
            delete website.category;
          }
        });
      }

      // console.log(game);
      res.send(game);
    });
});

export default router;
