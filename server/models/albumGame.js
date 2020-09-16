const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class AlbumGame extends Model {
  static get tableName() {
    return "album_games";
  }

  static get idColumn() {
    return ["album_id", "game_id"];
  }

  static get relationMappings() {
    const Album = require("./album");
    const Game = require("./game");
    return {
      album: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: "album_games.album_id",
          to: "albums.id",
        },
      },
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "album_games.game_id",
          to: "games.id",
        },
      },
    };
  }
}

module.exports = AlbumGame;
