const {
    Model
} = require('objection');

const knex = require('../db/knex');

Model.knex(knex);

class Game extends Model {
    static get tableName() {
        return 'games';
    }

    static get relationMappings() {
        const Artwork = require('./artwork');
        const Cover = require('./cover');
        const GameVideo = require('./gameVideo');
        const Screenshot = require('./screenshot');
        const Website = require('./website');
        return {
            artworks: {
                relation: Model.HasManyRelation,
                modelClass: Artwork,
                join: {
                    from: 'games.id',
                    to: 'artworks.game_id'
                }
            },
            covers: {
                relation: Model.HasManyRelation,
                modelClass: Artwork,
                join: {
                    from: 'games.id',
                    to: 'covers.game_id'
                }
            },
            game_videos: {
                relation: Model.HasManyRelation,
                modelClass: Artwork,
                join: {
                    from: 'games.id',
                    to: 'game_videos.game_id'
                }
            },
            screenshots: {
                relation: Model.HasManyRelation,
                modelClass: Artwork,
                join: {
                    from: 'games.id',
                    to: 'screenshots.game_id'
                }
            },
            websites: {
                relation: Model.HasManyRelation,
                modelClass: Artwork,
                join: {
                    from: 'games.id',
                    to: 'websites.game_id'
                }
            }
        }
    }
}

module.exports = Game;