const {
    Model
} = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Website extends Model {
    static get tableName() {
        return 'game_websites';
    }

    static get relationMappings() {
        const Game = require('./game');
        return {
            writer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'game_websites.game_id',
                    to: 'games.id'
                }
            }
        }
    }
}

module.exports = Website;