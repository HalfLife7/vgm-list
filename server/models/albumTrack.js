const {
  Model,
} = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class AlbumTracks extends Model {
  static get tableName() {
    return 'album_tracks';
  }

  static get relationMappings() {
    const Album = require('./album');
    const AlbumDisc = require('./albumDisc');
    return {
      albums: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: 'album_tracks.album_id',
          to: 'albums.id',
        },
      },
      artists: {
        relation: {
          relation: Model.BelongsToOneRelation,
          modelClass: AlbumDisc,
          join: {
            from: 'album_tracks.disc_id',
            to: 'album_discs.id',
          },
        },
      },
    };
  }
}

module.exports = AlbumTracks;
