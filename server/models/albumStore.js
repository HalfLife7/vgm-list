const {
    Model
} = require('objection');

Model.knex(knex);

class AlbumStores extends Model {
    static get tableName() {
        return 'album_stores';
    }

    static get relationMappings() {
        const Album = require('./album');
        return {
            albums: {
                relation: Model.BelongsToOneRelation,
                modelClass: Album,
                join: {
                    from: 'album_stores.album_id',
                    to: 'albums.id'
                }
            }
        }
    }
}

module.exports = AlbumStores;