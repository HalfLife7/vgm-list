const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class Album extends Model {
  static get tableName() {
    return "albums";
  }

  static get relationMappings() {
    const AlbumArranger = require("./albumArranger");
    const AlbumComposer = require("./albumComposer");
    const AlbumLyricist = require("./albumLyricist");
    const AlbumPerformer = require("./albumPerformer");
    const AlbumCover = require("./albumCover");
    const AlbumDisc = require("./albumDisc");
    const AlbumStore = require("./albumStore");
    const AlbumTrack = require("./albumTrack");
    const AlbumGame = require("./albumGame");
    return {
      albums: {
        relation: Model.HasManyRelation,
        modelClass: AlbumGame,
        join: {
          from: "albums.id",
          to: "album_games.album_id",
        },
      },
      arrangers: {
        relation: Model.HasManyRelation,
        modelClass: AlbumArranger,
        join: {
          from: "albums.id",
          to: "album_arrangers.album_id",
        },
      },
      composers: {
        relation: Model.HasManyRelation,
        modelClass: AlbumComposer,
        join: {
          from: "albums.id",
          to: "album_composers.album_id",
        },
      },
      lyricists: {
        relation: Model.HasManyRelation,
        modelClass: AlbumLyricist,
        join: {
          from: "albums.id",
          to: "album_lyricists.album_id",
        },
      },
      performers: {
        relation: Model.HasManyRelation,
        modelClass: AlbumPerformer,
        join: {
          from: "albums.id",
          to: "album_performers.album_id",
        },
      },
      covers: {
        relation: Model.HasManyRelation,
        modelClass: AlbumCover,
        join: {
          from: "albums.id",
          to: "album_covers.album_id",
        },
      },
      discs: {
        relation: Model.HasManyRelation,
        modelClass: AlbumDisc,
        join: {
          from: "albums.id",
          to: "album_discs.album_id",
        },
      },
      stores: {
        relation: Model.HasManyRelation,
        modelClass: AlbumStore,
        join: {
          from: "albums.id",
          to: "album_stores.album_id",
        },
      },
      tracks: {
        relation: Model.HasManyRelation,
        modelClass: AlbumTrack,
        join: {
          from: "albums.id",
          to: "album_tracks.album_id",
        },
      },
    };
  }
}

module.exports = Album;
