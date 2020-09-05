const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class Platform extends Model {
  static get tableName() {
    return "platforms";
  }

  static get relationMappings() {
    const GamePlatform = require("./gamePlatform");
    const PlatformLogo = require("./platformLogo");
    return {
      games: {
        relation: Model.HasManyRelation,
        modelClass: GamePlatform,
        join: {
          from: "platforms.id",
          to: "game_platforms.platform_id",
        },
      },
      logos: {
        relation: Model.BelongsToOneRelation,
        modelClass: PlatformLogo,
        join: {
          from: "platforms.id",
          to: "platform_logos.platform_id",
        },
      },
    };
  }
}

module.exports = Platform;
