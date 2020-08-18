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
        const Artwork = require('./gameArtwork');
        const AlternativeName = require('./gameAlternativeName');
        const Cover = require('./gameCover');
        const Video = require('./gameVideo');
        const Screenshot = require('./gameScreenshot');
        const Website = require('./gameWebsite');
        return {
            artworks: {
                relation: Model.HasManyRelation,
                modelClass: Artwork,
                join: {
                    from: 'games.id',
                    to: 'game_artworks.game_id'
                }
            },
            alternativeNames: {
                relation: Model.HasManyRelation,
                modelClass: AlternativeName,
                join: {
                    from: 'games.id',
                    to: 'game_alternative_names.game_id'
                }
            },
            covers: {
                relation: Model.HasManyRelation,
                modelClass: Cover,
                join: {
                    from: 'games.id',
                    to: 'game_covers.game_id'
                }
            },
            screenshots: {
                relation: Model.HasManyRelation,
                modelClass: Screenshot,
                join: {
                    from: 'games.id',
                    to: 'game_screenshots.game_id'
                }
            },
            videos: {
                relation: Model.HasManyRelation,
                modelClass: Video,
                join: {
                    from: 'games.id',
                    to: 'game_videos.game_id'
                }
            },
            websites: {
                relation: Model.HasManyRelation,
                modelClass: Website,
                join: {
                    from: 'games.id',
                    to: 'game_websites.game_id'
                }
            }
        }
    }
}

module.exports = Game;