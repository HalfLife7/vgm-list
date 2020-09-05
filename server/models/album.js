const { Model } = require("objection");

const knex = require("../db/knex");

Model.knex(knex);

class Album extends Model {
  static get tableName() {
    return "albums";
  }

  static get relationMappings() {
    const AlbumArtist = require("./albumArtist");
    const AlbumCover = require("./albumCover");
    const AlbumDisc = require("./albumDisc");
    const AlbumStore = require("./albumStore");
    const AlbumTrack = require("./albumTrack");
    const Game = require("./game");
    return {
      artists: {
        relation: Model.HasManyRelation,
        modelClass: AlbumArtist,
        join: {
          from: "albums.id",
          to: "album_artists.album_id",
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
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: "albums.game_id",
          to: "games.id",
        },
      },
    };
  }
}

module.exports = Album;
