const {
    Model
} = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Website extends Model {
    static get tableName() {
        return 'websites';
    }

    static get relationMappings() {
        const Game = require('./game');
        return {
            writer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'websites.game_id',
                    to: 'games.id'
                }
            }
        }
    }
}

module.exports = Website;