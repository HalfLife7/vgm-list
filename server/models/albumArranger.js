const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class AlbumArranger extends Model {
  static get tableName() {
    return "album_arrangers";
  }

  static get idColumn() {
    return ["artist_id", "album_id"];
  }

  static get relationMappings() {
    const Album = require("./album");
    const Artist = require("./artist");
    return {
      albums: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: "album_arrangers.album_id",
          to: "albums.id",
        },
      },
      artists: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artist,
        join: {
          from: "album_arrangers.artist_id",
          to: "artists.id",
        },
      },
    };
  }
}

module.exports = AlbumArranger;
