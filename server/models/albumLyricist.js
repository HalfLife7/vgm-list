const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class AlbumLyricist extends Model {
  static get tableName() {
    return "album_lyricists";
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
          from: "album_lyricists.album_id",
          to: "albums.id",
        },
      },
      artists: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artist,
        join: {
          from: "album_lyricists.artist_id",
          to: "artists.id",
        },
      },
    };
  }
}

module.exports = AlbumLyricist;
