const {
    Model
} = require('objection');

Model.knex(knex);

class AlbumCovers extends Model {
    static get tableName() {
        return 'album_covers';
    }

    static get relationMappings() {
        const Album = require('./album');
        return {
            albums: {
                relation: Model.BelongsToOneRelation,
                modelClass: Album,
                join: {
                    from: 'album_covers.album_id',
                    to: 'albums.id'
                }
            }
        }
    }
}

module.exports = AlbumCovers;