import express from 'express';
import util from 'util';
import config from './config';

const router = express.Router();
const axios = require('axios').default;
const { CronJob } = require('cron');

const { raw } = require('objection');
const Game = require('../models/game');
const GameAlternativeName = require('../models/gameAlternativeName');
const GameArtwork = require('../models/gameArtwork');
const GameCover = require('../models/gameCover');
const GameScreenshot = require('../models/gameScreenshot');
const GameVideo = require('../models/gameVideo');
const GameWebsite = require('../models/gameWebsite');
const GamePlatform = require('../models/gamePlatform');
const Platform = require('../models/platform');
const PlatformLogo = require('../models/platformLogo');

const updateGameDb = new CronJob('*/30 * * * * *', async () => {
  console.log('starting');
  // get highest id from db
  const getMaxGameId = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/games/max',
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

  // remove for now, cannot get header to send api key
  // import igdb from 'igdb-api-node';
  // const client = igdb(config.IGDB_KEY);

  const getGames = async () => {
    try {
      // query api for games not yet in db
      const response = await axios({
        url: 'https://api-v3.igdb.com/games',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'user-key': config.IGDB_KEY,
        },
        data: `fields aggregated_rating_count, aggregated_rating, alternative_names.*, category, first_release_date, name, platforms.*, slug, summary, artworks.*, cover.*, videos.*, screenshots.*, websites.*;  where version_parent = null & id > ${maxGameId}; limit 500; sort id asc;`,
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
        // console.log(util.inspect(game, false, null, true));
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
            }),
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
            }),
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
            }),
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
            }),
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
            }),
          );
        }

        if (game.platforms !== undefined) {
          await Promise.all(
            game.platforms.map(async (platform) => {
              await GamePlatform.query().insert({
                game_id: game.id,
                platform_id: platform.id,
              });
            }),
          );
        }
      }),
    );
  } catch (err) {
    console.error(err);
  }
});

const updatePlatforms = new CronJob('*/30 * * * * *', async () => {
  // get highest id from db
  const getMaxGameId = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/platforms/max',
      });
      return response.data[0].max;
    } catch (err) {
      console.error(err);
    }
  };
  let maxPlatformId = await getMaxGameId();
  if (maxPlatformId === null) {
    maxPlatformId = 0;
  }
  // console.log(util.inspect(maxPlatformId, false, null, true));

  const getPlatforms = async () => {
    try {
      // query api for games not yet in db
      const response = await axios({
        url: 'https://api-v3.igdb.com/platforms',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'user-key': config.IGDB_KEY,
        },
        data: `fields *, platform_logo.*; where id > ${maxPlatformId}; limit 500; sort id asc;`,
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const platforms = await getPlatforms();
  // console.log(util.inspect(game.data, false, null, true));

  await Promise.all(
    platforms.data.map(async (platform) => {
      try {
        await Platform.query().insert({
          id: platform?.id,
          abbreviation: platform?.abbreviation,
          alternative_name: platform?.alternative_name,
          category: platform?.category,
          created_at: platform?.created_at,
          generation: platform?.generation,
          name: platform?.name,
          slug: platform?.slug,
          summary: platform?.summary,
          updated_at: platform?.updated_at,
          url: platform?.url,
          checksum: platform?.checksum,
        });
      } catch (err) {
        console.error(err);
      }
      if (platform.platform_logo !== undefined) {
        try {
          await PlatformLogo.query().insert({
            id: platform.platform_logo?.id,
            platform_id: platform.id,
            alpha_channel: platform.platform_logo?.alpha_channel,
            animated: platform.platform_logo?.animated,
            height: platform.platform_logo?.height,
            image_id: platform.platform_logo?.image_id,
            url: platform.platform_logo?.url,
            width: platform.platform_logo?.width,
            checksum: platform.platform_logo?.checksum,
          });
        } catch (err) {
          console.error(err);
        }
      }
    }),
  );
});

// run this cron once to populate platform tables
// updatePlatforms.start();

// run this cron job for about 2 hours to pull all 129000~ game entries from igdb
// updateGameDb.start();

module.exports = router;
