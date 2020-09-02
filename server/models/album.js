const {
  Model,
} = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class Album extends Model {
  static get tableName() {
    return 'albums';
  }

  static get relationMappings() {
    const Artist = require('./artist');
    const AlbumArtist = require('./albumArtist');
    const AlbumCover = require('./albumCover');
    const AlbumDisc = require('./albumDisc');
    const AlbumStore = require('./albumStore');
    const AlbumTrack = require('./albumTrack');
    const Game = require('./game');
    return {
      artists: {
        relation: Model.HasManyRelation,
        modelClass: Artist,
        join: {
          from: 'albums.id',
          to: 'artists.album_id',
        },
      },
      albumArtists: {
        relation: Model.HasManyRelation,
        modelClass: AlbumArtist,
        join: {
          from: 'albums.id',
          to: 'album_artists.album_id',
        },
      },
      albumCovers: {
        relation: Model.HasManyRelation,
        modelClass: AlbumCover,
        join: {
          from: 'albums.id',
          to: 'album_covers.album_id',
        },
      },
      albumDiscs: {
        relation: Model.HasManyRelation,
        modelClass: AlbumDisc,
        join: {
          from: 'albums.id',
          to: 'album_discs.album_id',
        },
      },
      albumStores: {
        relation: Model.HasManyRelation,
        modelClass: AlbumStore,
        join: {
          from: 'albums.id',
          to: 'album_stores.album_id',
        },
      },
      albumTracks: {
        relation: Model.HasManyRelation,
        modelClass: AlbumTrack,
        join: {
          from: 'albums.id',
          to: 'album_tracks.album_id',
        },
      },
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        join: {
          from: 'albums.game_id',
          to: 'games.id',
        },
      },
    };
  }
}

module.exports = Album;
