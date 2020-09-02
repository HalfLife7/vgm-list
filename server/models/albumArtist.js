const {
  Model,
} = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class AlbumArtists extends Model {
  static get tableName() {
    return 'album_artists';
  }

  static get relationMappings() {
    const Album = require('./album');
    const Artist = require('./artist');
    return {
      albums: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: 'album_artists.album_id',
          to: 'albums.id',
        },
      },
      artists: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artist,
        join: {
          from: 'album_artists.artist_id',
          to: 'artists.id',
        },
      },
    };
  }
}

module.exports = AlbumArtists;
