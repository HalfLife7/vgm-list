const {
    Model
} = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Cover extends Model {
    static get tableName() {
        return 'covers';
    }

    static get relationMappings() {
        const Game = require('./game');
        return {
            writer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'covers.game_id',
                    to: 'games.id'
                }
            }
        }
    }
}

module.exports = Cover;