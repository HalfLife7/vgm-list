const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class PlatformLogo extends Model {
  static get tableName() {
    return "platform_logos";
  }

  static get relationMappings() {
    const Platform = require("./platform");
    return {
      platform: {
        relation: Model.BelongsToOneRelation,
        modelClass: Platform,
        join: {
          from: "platform_logos.platform_id",
          to: "platforms.id",
        },
      },
    };
  }
}

module.exports = PlatformLogo;
