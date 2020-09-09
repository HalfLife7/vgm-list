import express from "express";
// import config from '../config'
// import axios from 'axios';
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
      console.error(err);
    });
});

router.get("/all", (req, res, next) => {
  Game.query()
    .joinRelated("platforms")
    .whereIn("platforms.platform_id", [
      4,
      5,
      7,
      8,
      9,
      11,
      12,
      18,
      19,
      21,
      23,
      29,
      30,
      32,
      41,
      48,
      49,
      130,
      6,
      92,
      20,
      22,
      24,
      33,
      37,
      38,
      46,
      137,
      159,
    ])
    .where("category", "=", "0")
    .whereExists(Game.relatedQuery("covers"))
    .withGraphFetched("covers")
    .limit(20)
    .orderBy(raw("random()"))
    .then((games) => {
      games.map((game) => {
        // game.covers[0] ? game.cover.url.replace("t_thumb", "t_cover_big") : null
        console.log(game.covers);
        if (game.covers !== undefined) {
          const url = game?.covers[0].url;
          console.log(game.covers);
          console.log(url);
          game.covers[0].url = url.replace("t_thumb", "t_720p");
        }

        const truncate = (input) =>
          input.length > 250 ? `${input.substring(0, 250)}...` : input;

        if (game.summary !== null) {
          game.summary = truncate(game.summary);
        }
      });
      res.send(games);
    });
});

router.get("/search", (req, res, next) => {
  const searchParams = req.query.name;
  console.log(searchParams);
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
      console.log(games.length);
      games.map((game) => {
        // game.covers[0] ? game.cover.url.replace("t_thumb", "t_cover_big") : null
        if (game.covers !== undefined && game.covers[0]?.url !== undefined) {
          const url = game.covers[0]?.url;
          console.log(url);
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
      console.error(err);
    });
});

router.get("/:id", (req, res, next) => {
  const gameId = req.params.id;
  console.log(gameId);

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
        builder.select("id");
      },
    })
    .then((game) => {
      if (game.covers !== undefined) {
        const url = game?.covers[0].url;
        console.log(game.covers);
        console.log(url);
        game.covers[0].url = url.replace("t_thumb", "t_720p");
      }

      function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + " " + month + " " + year;
        return time;
      }

      let dateTime = timeConverter(game.first_release_date);
      game.first_release_date = dateTime;

      console.log(game);
      res.send(game);
    });
});

export default router;
