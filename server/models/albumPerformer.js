const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class AlbumPerformers extends Model {
  static get tableName() {
    return "album_performers";
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
          from: "album_performers.album_id",
          to: "albums.id",
        },
      },
      artists: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artist,
        join: {
          from: "album_performers.artist_id",
          to: "artists.id",
        },
      },
    };
  }
}

module.exports = AlbumPerformers;
