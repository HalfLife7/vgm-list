const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class Collection extends Model {
  static get tableName() {
    return "collections";
  }

  static get relationMappings() {
    const GameCollection = require("./gameCollection");
    return {
      games: {
        relation: Model.HasManyRelation,
        modelClass: GameCollection,
        join: {
          from: "collections.id",
          to: "game_collections.collection_id",
        },
      },
    };
  }
}

module.exports = Collection;
