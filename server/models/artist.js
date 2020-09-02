const {
  Model,
} = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class Artist extends Model {
  static get tableName() {
    return 'artists';
  }

  static get relationMappings() {
    const AlbumArtist = require('./albumArtist');
    return {
      albumArtists: {
        relation: Model.HasManyRelation,
        modelClass: AlbumArtist,
        join: {
          from: 'artists.id',
          to: 'album_aritsts.artist_id',
        },
      },
    };
  }
}

module.exports = Artist;
