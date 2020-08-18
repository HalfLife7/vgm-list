const {
    Model
} = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Video extends Model {
    static get tableName() {
        return 'game_videos';
    }

    static get relationMappings() {
        const Game = require('./game');
        return {
            writer: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'game_videos.game_id',
                    to: 'games.id'
                }
            }
        }
    }
}

module.exports = Video;