const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class GameVideo extends Model {
  static get tableName() {
    return "game_videos";
  }

  static get relationMappings() {
    const Game = require("./game");
    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "game_videos.game_id",
          to: "games.id",
        },
      },
    };
  }
}

module.exports = GameVideo;
