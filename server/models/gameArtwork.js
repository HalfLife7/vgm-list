const {
    Model
} = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class Artwork extends Model {
    static get tableName() {
        return 'game_artworks';
    }

    static get relationMappings() {
        const Game = require('./game');
        return {
            game: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'game_artworks.game_id',
                    to: 'games.id'
                }
            }
        }
    }
}

module.exports = Artwork;