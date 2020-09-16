const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class AlbumCover extends Model {
  static get tableName() {
    return "album_covers";
  }

  static get relationMappings() {
    const Album = require("./album");
    return {
      album: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: "album_covers.album_id",
          to: "albums.id",
        },
      },
    };
  }
}

module.exports = AlbumCover;
