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
        const AlternativeNames = require('./alternativeNames');
        const Cover = require('./cover');
        const Video = require('./video');
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
            alternativeNames: {
                relation: Model.HasManyRelation,
                modelClass: AlternativeNames,
                join: {
                    from: 'games.id',
                    to: 'alternative_names.game_id'
                }
            },
            covers: {
                relation: Model.HasManyRelation,
                modelClass: Cover,
                join: {
                    from: 'games.id',
                    to: 'covers.game_id'
                }
            },
            screenshots: {
                relation: Model.HasManyRelation,
                modelClass: Screenshot,
                join: {
                    from: 'games.id',
                    to: 'screenshots.game_id'
                }
            },
            videos: {
                relation: Model.HasManyRelation,
                modelClass: Video,
                join: {
                    from: 'games.id',
                    to: 'videos.game_id'
                }
            },
            websites: {
                relation: Model.HasManyRelation,
                modelClass: Website,
                join: {
                    from: 'games.id',
                    to: 'websites.game_id'
                }
            }
        }
    }
}

module.exports = Game;