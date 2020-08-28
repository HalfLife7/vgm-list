const {
    Model
} = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Cover extends Model {
    static get tableName() {
        return 'game_covers';
    }

    static get relationMappings() {
        const Game = require('./game');
        return {
            game: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'game_covers.game_id',
                    to: 'games.id'
                }
            }
        }
    }
}

module.exports = Cover;