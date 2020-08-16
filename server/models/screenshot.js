const {
    Model
} = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Screenshot extends Model {
    static get tableName() {
        return 'screenshots';
    }

    static get relationMappings() {
        const Game = require('./game');
        return {
            writer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'screenshots.game_id',
                    to: 'games.id'
                }
            }
        }
    }
}

module.exports = Screenshot;