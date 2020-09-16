const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class GamePlatform extends Model {
  static get tableName() {
    return "game_platforms";
  }

  // must return multiple keys for combination keys since by default objection returns a single column 'id' for the id column
  // https://stackoverflow.com/a/58443161/12464694
  static get idColumn() {
    return ["game_id", "platform_id"];
  }

  static get relationMappings() {
    const Game = require("./game");
    const Platform = require("./platform");
    return {
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "game_platforms.game_id",
          to: "games.id",
        },
      },
      platform: {
        relation: Model.BelongsToOneRelation,
        modelClass: Platform,
        join: {
          from: "game_platforms.platform_id",
          to: "platforms.id",
        },
      },
    };
  }
}

module.exports = GamePlatform;
