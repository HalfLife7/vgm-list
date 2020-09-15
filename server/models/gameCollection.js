const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class GameCollection extends Model {
  static get tableName() {
    return "game_collections";
  }

  // must return multiple keys for combination keys since by default objection returns a single column 'id' for the id column
  // https://stackoverflow.com/a/58443161/12464694
  static get idColumn() {
    return ["game_id", "collection_id"];
  }

  static get relationMappings() {
    const Game = require("./game");
    const Collection = require("./collection");
    return {
      games: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "game_collections.game_id",
          to: "games.id",
        },
      },
      collections: {
        relation: Model.BelongsToOneRelation,
        modelClass: Collection,
        join: {
          from: "game_collections.collection_id",
          to: "collections.id",
        },
      },
    };
  }
}

module.exports = GameCollection;
