import express from "express";
import util from "util";
import config from "./config";
import fs from "fs";
import moment from "moment";
import Artist from "../models/artist";

const router = express.Router();
const axios = require("axios").default;
const { CronJob } = require("cron");

const { raw } = require("objection");
const Game = require("../models/game");
const GameAlternativeName = require("../models/gameAlternativeName");
const GameArtwork = require("../models/gameArtwork");
const GameCover = require("../models/gameCover");
const GameScreenshot = require("../models/gameScreenshot");
const GameVideo = require("../models/gameVideo");
const GameWebsite = require("../models/gameWebsite");
const GamePlatform = require("../models/gamePlatform");
const GameCollection = require("../models/gameCollection");
const Platform = require("../models/platform");
const PlatformLogo = require("../models/platformLogo");
const Collection = require("../models/collection");
const Album = require("../models/album");
const AlbumCover = require("../models/albumCover");
const AlbumDisc = require("../models/albumDisc");
const AlbumStore = require("../models/albumStore");
const AlbumTrack = require("../models/albumTrack");
const AlbumGame = require("../models/albumGame");
const AlbumArranger = require("../models/albumArranger");
const AlbumComposer = require("../models/albumComposer");
const AlbumLyricist = require("../models/albumLyricist");
const AlbumPerformer = require("../models/albumPerformer");

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
  console.log(util.inspect(maxGameId, false, null, true));

  // remove for now, cannot get header to send api key
  // import igdb from 'igdb-api-node';
  // const client = igdb(config.IGDB_KEY);

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
        data: `fields aggregated_rating_count, aggregated_rating, alternative_names.*, category, collection.*, first_release_date, name, platforms.*, slug, summary, artworks.*, cover.*, videos.*, screenshots.*, websites.*;  where version_parent = null & id > ${maxGameId}; limit 500; sort id asc;`,
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

        if (game.platforms !== undefined) {
          await Promise.all(
            game.platforms.map(async (platform) => {
              await GamePlatform.query().insert({
                game_id: game.id,
                platform_id: platform.id,
              });
            })
          );
        }

        if (game.collection !== undefined) {
          await GameCollection.query().insert({
            game_id: game.id,
            collection_id: game.collection.id,
          });
        }
      })
    );
  } catch (err) {
    console.error(err);
  }
});

const updatePlatforms = new CronJob("*/30 * * * * *", async () => {
  // get highest id from db
  const getMaxPlatformId = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3000/platforms/max",
      });
      return response.data[0].max;
    } catch (err) {
      console.error(err);
    }
  };
  let maxPlatformId = await getMaxPlatformId();
  if (maxPlatformId === null) {
    maxPlatformId = 0;
  }
  // console.log(util.inspect(maxPlatformId, false, null, true));

  const getPlatforms = async () => {
    try {
      // query api for games not yet in db
      const response = await axios({
        url: "https://api-v3.igdb.com/platforms",
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": config.IGDB_KEY,
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
    })
  );
});

const updateCollections = new CronJob("*/30 * * * * *", async () => {
  // get highest id from db
  const getMaxCollectionId = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3000/collections/max",
      });
      return response.data[0].max;
    } catch (err) {
      console.error(err);
    }
  };
  let maxCollectionId = await getMaxCollectionId();
  if (maxCollectionId === null) {
    maxCollectionId = 0;
  }
  console.log(util.inspect(maxCollectionId, false, null, true));

  const getCollections = async () => {
    try {
      // query api for games not yet in db
      const response = await axios({
        url: "https://api-v3.igdb.com/collections",
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": config.IGDB_KEY,
        },
        data: `fields *; where id > ${maxCollectionId}; limit 500; sort id asc;`,
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const collections = await getCollections();
  // console.log(util.inspect(game.data, false, null, true));

  await Promise.all(
    collections.data.map(async (collection) => {
      try {
        await Collection.query().insert({
          id: collection?.id,
          created_at: collection?.created_at,
          name: collection?.name,
          slug: collection?.slug,
          updated_at: collection?.updated_at,
          url: collection?.url,
          checksum: collection?.checksum,
        });
      } catch (err) {
        console.error(err);
      }
    })
  );
});

const addAlbums = new CronJob("25 15 * * *", async () => {
  console.log("starting addAlbums");
  let rawData = fs.readFileSync("./data.json");
  let albumList = JSON.parse(rawData);
  await Promise.all(
    albumList.albums.map(async (album) => {
      // console.log("id: " + album.id);
      // console.log("title: " + album.title);
      try {
        await Album.query().insert({
          id: album.id,
          name: album.title,
        });
      } catch (err) {
        console.error(err);
      }
    })
  );
});

const updateAlbumDb = new CronJob("*/1 * * * *", async () => {
  console.log("starting updateAlbumDb");

  // get highest id from db
  const getNotUpdatedAlbumId = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3000/albums/not-updated",
      });
      return response.data[0].min;
    } catch (err) {
      console.error(err);
    }
  };
  let updateAlbumId = await getNotUpdatedAlbumId();
  console.log(util.inspect(updateAlbumId, false, null, true));

  const getAlbum = async () => {
    try {
      // query api for games not yet in db
      const response = await axios({
        url: `http://vgmdb.info/album/${updateAlbumId}`,
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((response) => {
        return response.data;
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const album = await getAlbum();
  // console.log(util.inspect(album, false, null, true));

  if (album.products.length !== 0) {
    const updateAlbumGames = await Promise.all(
      album.products.map(async (product) => {
        let gameName = product?.names?.en;
        console.log(gameName);
        if (gameName !== undefined) {
          // get highest id from db
          const getGameId = async () => {
            try {
              const response = await axios({
                method: "get",
                url: `http://localhost:3000/games/search-by-exact-name/${gameName}`,
              }).then((response) => {
                return response.data.id;
              });
              return response;
            } catch (err) {
              console.error(err);
            }
          };
          let gameId = await getGameId();
          console.log(util.inspect(gameId, false, null, true));

          // if a corresponding gameId is found, insert it
          if (gameId !== undefined) {
            await AlbumGame.query().insert({
              album_id: updateAlbumId,
              game_id: gameId,
            });
          }
        }
      })
    );
  }

  await Album.query().findById(updateAlbumId).patch({
    catalog: album?.catalog,
    category: album?.category,
    classification: album?.classification,
    media_format: album?.media_format,
    notes: album?.notes,
    publisher: album?.publisher?.names?.en,
    release_date: album?.release_date,
    updated_at: moment().unix(),
  });

  if (album.covers.length !== 0) {
    const updateAlbumCovers = await Promise.all(
      album.covers.map(async (cover) => {
        await AlbumCover.query().insert({
          id: cover?.full.split("/").pop().split("-").pop().split(".")[0],
          album_id: updateAlbumId,
          full: cover?.full,
          medium: cover?.medium,
          name: cover?.name,
          thumb: cover?.thumb,
        });
      })
    );
  } else {
    const updateAlbumCovers = await AlbumCover.query().insert({
      id: album?.picture_full.split("/").pop().split("-").pop().split(".")[0],
      album_id: updateAlbumId,
      full: album?.picture_full,
      medium: album?.picture_small,
      name: "Front",
      thumb: album?.picture_thumb,
    });
  }

  if (album.discs.length !== 0) {
    const updateAlbumDiscAndTracks = await Promise.all(
      album.discs.map(async (disc, discIndex) => {
        await AlbumDisc.query().insert({
          id: discIndex,
          album_id: updateAlbumId,
          length: disc?.disc_length,
          name: disc?.name,
        });

        disc.tracks.map(async (track, trackIndex) => {
          await AlbumTrack.query().insert({
            id: trackIndex,
            album_id: updateAlbumId,
            disc_id: discIndex,
            length: track?.track_length,
            name: track?.names?.English,
          });
        });
      })
    );
  }

  if (album.stores.length !== 0) {
    const updateAlbumStores = await Promise.all(
      album.stores.map(async (store) => {
        if (store.link.includes("db/collection.php")) {
          // do nothing
        } else {
          await AlbumStore.query().insert({
            album_id: updateAlbumId,
            link: store?.link,
            name: store?.name,
          });
        }
      })
    );
  }

  if (album.arrangers.length !== 0) {
    const updateAlbumArrangers = await Promise.all(
      album.arrangers.map(async (arranger) => {
        if (arranger?.link !== undefined) {
          let artistId = arranger.link.split("/")[1];
          const checkArtist = await Artist.query().findById(artistId);

          if (checkArtist === undefined) {
            // insert a new artist and arranger if the artist is not yet in db
            await Artist.query().insert({
              id: artistId,
              name: arranger?.names?.en,
            });
            await AlbumArranger.query().insert({
              artist_id: artistId,
              album_id: updateAlbumId,
            });
          } else {
            // if artist already exists, only insert a new arranger
            await AlbumArranger.query().insert({
              artist_id: artistId,
              album_id: updateAlbumId,
            });
          }
        }
      })
    );
  }

  if (album.composers.length !== 0) {
    const updateAlbumComposers = await Promise.all(
      album.composers.map(async (composer) => {
        if (composer?.link !== undefined) {
          let artistId = composer.link.split("/")[1];
          const checkArtist = await Artist.query().findById(artistId);

          if (checkArtist === undefined) {
            // insert a new artist and composer if the artist is not yet in db
            await Artist.query().insert({
              id: artistId,
              name: composer?.names?.en,
            });
            await AlbumComposer.query().insert({
              artist_id: artistId,
              album_id: updateAlbumId,
            });
          } else {
            // if artist already exists, only insert a new composer
            await AlbumComposer.query().insert({
              artist_id: artistId,
              album_id: updateAlbumId,
            });
          }
        }
      })
    );
  }

  if (album.lyricists.length !== 0) {
    const updateAlbumLyricists = await Promise.all(
      album.lyricists.map(async (lyricist) => {
        if (lyricist?.link !== undefined) {
          let artistId = lyricist.link.split("/")[1];
          const checkArtist = await Artist.query().findById(artistId);

          if (checkArtist === undefined) {
            // insert a new artist and lyricist if the artist is not yet in db
            await Artist.query().insert({
              id: artistId,
              name: lyricist?.names?.en,
            });
            await AlbumLyricist.query().insert({
              artist_id: artistId,
              album_id: updateAlbumId,
            });
          } else {
            // if artist already exists, only insert a new lyricist
            await AlbumLyricist.query().insert({
              artist_id: artistId,
              album_id: updateAlbumId,
            });
          }
        }
      })
    );
  }

  if (album.performers.length !== 0) {
    const updateAlbumPerformers = await Promise.all(
      album.performers.map(async (performer) => {
        if (performer?.link !== undefined) {
          let artistId = performer.link.split("/")[1];
          const checkArtist = await Artist.query().findById(artistId);

          if (checkArtist === undefined) {
            // insert a new artist and performer if the artist is not yet in db
            await Artist.query().insert({
              id: artistId,
              name: performer?.names?.en,
            });
            await AlbumPerformer.query().insert({
              artist_id: artistId,
              album_id: updateAlbumId,
            });
          } else {
            // if artist already exists, only insert a new performer
            await AlbumPerformer.query().insert({
              artist_id: artistId,
              album_id: updateAlbumId,
            });
          }
        }
      })
    );
  }
});

// run this cron once to populate platform tables
// updatePlatforms.start();

// run this cron 13x to populate collections tables
// updateCollections.start();

// run this cron job for about 2 hours to pull all 139000~ game entries from igdb
// updateGameDb.start();

// run this cron job to add all initial album names/ids to database
// addAlbums.start();

// run 15500~ cycles to get all albums for game OST
// updateAlbumDb.start();

module.exports = router;
