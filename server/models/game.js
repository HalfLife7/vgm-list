const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class Game extends Model {
  static get tableName() {
    return "games";
  }

  static get relationMappings() {
    const GameArtwork = require("./gameArtwork");
    const GameAlternativeName = require("./gameAlternativeName");
    const GameCover = require("./gameCover");
    const GameVideo = require("./gameVideo");
    const GameScreenshot = require("./gameScreenshot");
    const GameWebsite = require("./gameWebsite");
    const Album = require("./album");
    const GamePlatform = require("./gamePlatform");
    const GameCollection = require("./gameCollection");
    return {
      artworks: {
        relation: Model.HasManyRelation,
        modelClass: GameArtwork,
        join: {
          from: "games.id",
          to: "game_artworks.game_id",
        },
      },
      alternativeNames: {
        relation: Model.HasManyRelation,
        modelClass: GameAlternativeName,
        join: {
          from: "games.id",
          to: "game_alternative_names.game_id",
        },
      },
      covers: {
        relation: Model.HasManyRelation,
        modelClass: GameCover,
        join: {
          from: "games.id",
          to: "game_covers.game_id",
        },
      },
      screenshots: {
        relation: Model.HasManyRelation,
        modelClass: GameScreenshot,
        join: {
          from: "games.id",
          to: "game_screenshots.game_id",
        },
      },
      videos: {
        relation: Model.HasManyRelation,
        modelClass: GameVideo,
        join: {
          from: "games.id",
          to: "game_videos.game_id",
        },
      },
      websites: {
        relation: Model.HasManyRelation,
        modelClass: GameWebsite,
        join: {
          from: "games.id",
          to: "game_websites.game_id",
        },
      },
      albums: {
        relation: Model.HasManyRelation,
        modelClass: Album,
        join: {
          from: "games.id",
          to: "albums.game_id",
        },
      },
      platforms: {
        relation: Model.HasManyRelation,
        modelClass: GamePlatform,
        join: {
          from: "games.id",
          to: "game_platforms.game_id",
        },
      },
      collections: {
        relation: Model.HasOneRelation,
        modelClass: GameCollection,
        join: {
          from: "games.id",
          to: "game_collections.game_id",
        },
      },
    };
  }
}

module.exports = Game;
