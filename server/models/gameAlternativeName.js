const {
    Model
} = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class AlternativeNames extends Model {
    static get tableName() {
        return 'game_alternative_names';
    }

    static get relationMappings() {
        const Game = require('./game');
        return {
            game: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'game_alternative_names.game_id',
                    to: 'games.id'
                }
            }
        }
    }
}

module.exports = AlternativeNames;