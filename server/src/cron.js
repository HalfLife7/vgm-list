import express from "express";
import Bottleneck from "bottleneck";
import util from "util";
import config from "./config";

const router = express.Router();
const axios = require("axios").default;
const { CronJob } = require("cron");

const Game = require("../models/game");
const GameAlternativeName = require("../models/gameAlternativeName");
const GameArtwork = require("../models/gameArtwork");
const GameCover = require("../models/gameCover");
const GameScreenshot = require("../models/gameScreenshot");
const GameVideo = require("../models/gameVideo");
const GameWebsite = require("../models/gameWebsite");

const updateGameDb = new CronJob("*/30 * * * * *", async () => {
  console.log("starting");
  // get highest id from db
  const getMaxGameId = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3000/games/max",
      });
      return response.data[0].max;
    } catch (err) {
      console.error(err);
    }
  };
  let maxGameId = await getMaxGameId();
  if (maxGameId === null) {
    maxGameId = 1;
  }
  // console.log(util.inspect(maxGameId, false, null, true));

  const getGames = async () => {
    try {
      // query api for games not yet in db
      const response = await axios({
        url: "https://api-v3.igdb.com/games",
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": config.IGDB_KEY,
        },
        data: `fields aggregated_rating_count, aggregated_rating, alternative_names.*, category, first_release_date, name, slug, summary, artworks.*, cover.*, videos.*, screenshots.*, websites.*;  where version_parent = null & id > ${maxGameId}; limit 500; sort id asc;`,
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  };
  const games = await getGames();
  // console.log(util.inspect(game.data, false, null, true));

  try {
    await Promise.all(
      games.data.map(async (game) => {
        // console.log(game);
        await Game.query().insert({
          id: game?.id,
          aggregated_rating: game?.aggregated_rating,
          aggregated_rating_count: game?.aggregated_rating_count,
          category: game?.category,
          first_release_date: game?.first_release_date,
          name: game?.name,
          slug: game?.slug,
          summary: game?.summary,
        });

        if (game.alternative_names !== undefined) {
          await Promise.all(
            game.alternative_names.map(async (alternative_name) => {
              await GameAlternativeName.query().insert({
                id: alternative_name?.id,
                comment: alternative_name?.comment,
                game_id: game.id,
                name: alternative_name?.name,
                checksum: alternative_name?.checksum,
              });
            })
          );
        }

        if (game.artworks !== undefined) {
          await Promise.all(
            game.artworks.map(async (artwork) => {
              await GameArtwork.query().insert({
                id: artwork?.id,
                game_id: game.id,
                height: artwork?.height,
                image_id: artwork?.image_id,
                url: artwork?.url,
                width: artwork?.width,
                checksum: artwork?.checksum,
              });
            })
          );
        }

        if (game.cover !== undefined) {
          await GameCover.query().insert({
            id: game.cover?.id,
            game_id: game.id,
            alpha_channel: game.cover?.alpha_channel,
            animated: game.cover?.animated,
            height: game.cover?.height,
            image_id: game.cover?.image_id,
            url: game.cover?.url,
            width: game.cover?.width,
            checksum: game.cover?.checksum,
          });
        }

        if (game.screenshots !== undefined) {
          await Promise.all(
            game.screenshots.map(async (screenshot) => {
              await GameScreenshot.query().insert({
                id: screenshot?.id,
                alpha_channel: screenshot?.alpha_channel,
                game_id: game.id,
                animated: screenshot?.animated,
                height: screenshot?.height,
                image_id: screenshot?.image_id,
                url: screenshot?.url,
                width: screenshot?.width,
                checksum: screenshot?.checksum,
              });
            })
          );
        }

        if (game.videos !== undefined) {
          await Promise.all(
            game.videos.map(async (video) => {
              await GameVideo.query().insert({
                id: video?.id,
                game_id: game.id,
                name: video?.name,
                video_id: video?.video_id,
                checksum: video?.checksum,
              });
            })
          );
        }

        if (game.websites !== undefined) {
          await Promise.all(
            game.websites.map(async (website) => {
              await GameWebsite.query().insert({
                id: website?.id,
                game_id: game.id,
                category: website?.category,
                trusted: website?.trusted,
                url: website?.url,
                checksum: website?.checksum,
              });
            })
          );
        }
      })
    );
  } catch (err) {
    console.error(err);
  }

  // .then(response => {
  //     console.log(response.data);
  //     response.data.map(game => {
  //         let url = game.cover.url;
  //         game.cover.url = url.replace("t_thumb", "t_cover_big");

  //         const truncate = input =>
  //             input.length > 250 ? `${input.substring(0, 250)}...` : input;

  //         game.summary = truncate(game.summary);
  //     });
  //     res.send(response.data);
  // })
  // .catch(err => {
  //     console.error(err);
  // });
});

updateGameDb.start();

// var test = new CronJob('*/3 * * * * *', function () {
//     console.log('You will see this message every 3 second');
// }, null, true, 'America/Los_Angeles');

// test.start();

module.exports = router;
