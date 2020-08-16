const {
    Model
} = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Artwork extends Model {
    static get tableName() {
        return 'artworks';
    }

    static get relationMappings() {
        const Game = require('./game');
        return {
            writer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'artworks.game_id',
                    to: 'games.id'
                }
            }
        }
    }
}

module.exports = Artwork;