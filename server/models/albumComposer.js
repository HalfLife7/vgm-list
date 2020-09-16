const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class AlbumComposer extends Model {
  static get tableName() {
    return "album_composers";
  }

  static get idColumn() {
    return ["artist_id", "album_id"];
  }

  static get relationMappings() {
    const Album = require("./album");
    const Artist = require("./artist");
    return {
      album: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: "album_composers.album_id",
          to: "albums.id",
        },
      },
      artist: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artist,
        join: {
          from: "album_composers.artist_id",
          to: "artists.id",
        },
      },
    };
  }
}

module.exports = AlbumComposer;
