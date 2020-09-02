const {
  Model,
} = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class AlbumDiscs extends Model {
  static get tableName() {
    return 'album_discs';
  }

  static get relationMappings() {
    const Album = require('./album');
    return {
      albums: {
        relation: Model.BelongsToOneRelation,
        modelClass: Album,
        join: {
          from: 'album_discs.album_id',
          to: 'albums.id',
        },
      },
    };
  }
}

module.exports = AlbumDiscs;
