const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class Artist extends Model {
  static get tableName() {
    return "artists";
  }

  static get relationMappings() {
    const AlbumArranger = require("./albumArranger");
    const AlbumComposer = require("./albumComposer");
    const AlbumLyricist = require("./albumLyricist");
    const AlbumPerformer = require("./albumPerformer");
    return {
      albumArrangers: {
        relation: Model.HasManyRelation,
        modelClass: AlbumArranger,
        join: {
          from: "artists.id",
          to: "album_arrangers.artist_id",
        },
      },
      albumComposers: {
        relation: Model.HasManyRelation,
        modelClass: AlbumComposer,
        join: {
          from: "artists.id",
          to: "album_composers.artist_id",
        },
      },
      albumLyricists: {
        relation: Model.HasManyRelation,
        modelClass: AlbumLyricist,
        join: {
          from: "artists.id",
          to: "album_lyricists.artist_id",
        },
      },
      albumPerformers: {
        relation: Model.HasManyRelation,
        modelClass: AlbumPerformer,
        join: {
          from: "artists.id",
          to: "album_performers.artist_id",
        },
      },
    };
  }
}

module.exports = Artist;
