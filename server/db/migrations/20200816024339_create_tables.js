exports.up = async (knex) => {
    try {
        const createGamesTable = await knex.schema.createTable('games', t => {
            t.integer('id').unsigned().primary()
            t.integer('aggregated_rating_count')
            t.float('aggregated_rating')
            // t.enu('category', ['main_game', 'dlc_addon', 'expansion', 'bundle', 'standalone_expansion', 'mod', 'episode'], {
            //     useNative: true,
            //     enumName: 'game_categories'
            // })
            t.enu('category', ['0', '2', '3', '4', '5', '6', '7'], {
                useNative: true,
                enumName: 'game_categories'
            })
            t.integer('first_release_date')
            t.text('name')
            t.text('slug')
            t.text('summary')
        });
        const createGameAlternativeNamesTable = await knex.schema.createTable('game_alternative_names', t => {
            t.integer('id').unsigned().primary()
            t.uuid('checksum')
            t.text('comment')
            t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
            t.text('name')
        });
        const createGameArtworksTable = await knex.schema.createTable('game_artworks', t => {
            t.integer('id').unsigned().primary()
            t.boolean('alpha_channel')
            t.boolean('animated')
            t.uuid('checksum')
            t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
            t.integer('height')
            t.text('image_id')
            t.text('url')
            t.integer('width')
        });
        const createGameCoversTable = await knex.schema.createTable('game_covers', t => {
            t.integer('id').unsigned().primary()
            t.boolean('alpha_channel')
            t.boolean('animated')
            t.uuid('checksum')
            t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
            t.integer('height')
            t.text('image_id')
            t.text('url')
            t.integer('width')
        });
        const createGameScreenshotsTable = await knex.schema.createTable('game_screenshots', t => {
            t.integer('id').unsigned().primary()
            t.boolean('alpha_channel')
            t.boolean('animated')
            t.uuid('checksum')
            t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
            t.integer('height')
            t.text('image_id')
            t.text('url')
            t.integer('width')
        });
        const createGameVideosTable = await knex.schema.createTable('game_videos', t => {
            t.integer('id').unsigned().primary()
            t.uuid('checksum')
            t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
            t.text('name')
            t.text('video_id')
        });
        const createGameWebsitesTable = await knex.schema.createTable('game_websites', t => {
            t.integer('id').unsigned().primary()
            // t.enu('category', ['official', 'wikia', 'wikipedia', 'facebook', 'twitter', 'twitch', 'instagram', 'youtube', 'iphone', 'ipad', 'android', 'steam', 'reddit', 'itch', 'epicgames', 'gog'], {
            //     useNative: true,
            //     enumName: 'website_categories'
            // })
            t.enu('category', ['1', '2', '3', '4', '5', '6', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'], {
                useNative: true,
                enumName: 'website_categories'
            })
            t.uuid('checksum')
            t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
            t.boolean('trusted')
            t.text('url')
        });
        const createAlbumsTable = await knex.schema.createTable('albums', t => {
            t.integer('id').unsigned().primary()
            t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
            t.text('category')
            t.text('classification')
            t.text('name')
            t.text('notes')
            t.text('game_name') // products field in album json
            t.date('release_date')
        });
        const createArtistsTable = await knex.schema.createTable('artists', t => {
            t.integer('id').unsigned().primary()
            t.text('name')
        });
        const createAlbumArtistsTable = await knex.schema.createTable('album_artists', t => {
            t.integer('artist_id').unsigned().references('id').inTable('artists').notNull().onDelete('cascade')
            t.integer('album_id').unsigned().references('id').inTable('albums').notNull().onDelete('cascade')
            t.boolean('arranger')
            t.boolean('composer')
            t.boolean('lyricist')
            t.boolean('performer')
            t.primary(['artist_id', 'album_id'])
        });
        const createAlbumCoversTable = await knex.schema.createTable('album_covers', t => {
            t.integer('id').unsigned().primary()
            t.integer('album_id').unsigned().references('id').inTable('albums').notNull().onDelete('cascade')
            t.text('full')
            t.text('medium')
            t.text('name')
            t.text('thumb')
        });
        const createAlbumDiscsTable = await knex.schema.createTable('album_discs', t => {
            t.integer('id').unsigned()
            t.integer('album_id').unsigned().references('id').inTable('albums').notNull().onDelete('cascade')
            t.text('length')
            t.text('name')
            t.unique(['id', 'album_id'])

        });
        const createAlbumTracksTable = await knex.schema.createTable('album_tracks', t => {
            t.integer('id').unsigned()
            t.integer('album_id').unsigned().references('id').inTable('albums').notNull().onDelete('cascade')
            t.integer('disc_id').unsigned().notNull()
            t.text('length')
            t.text('name')
            t.unique(['id', 'disc_id', 'album_id'])
        });
        const createAlbumStoresTable = await knex.schema.createTable('album_stores', t => {
            t.increments('id')
            t.integer('album_id').unsigned().references('id').inTable('albums').notNull().onDelete('cascade')
            t.text('link')
            t.text('name')
        });
        // set character_encoding to utf8 since Japanese characters stored in DB lead to the following error:
        // character with byte sequence 0xe3 0x83 0x87 in encoding "UTF8" has no equivalent in encoding "WIN1252"
        // https://stackoverflow.com/questions/380924/how-can-i-change-database-encoding-for-a-postgresql-database-using-sql-or-phppga
        const setClientEncoding = await knex.schema.raw(`UPDATE pg_database set encoding = pg_char_to_encoding('UTF8') where datname = 'vgm_list'`);
    } catch (err) {
        console.error(err.name);
        console.error(err.message);
    }
};

exports.down = async (knex) => {
    try {
        const dropAlbumStoresTable = await knex.schema.dropTable('album_stores');
        const dropAlbumTracksTable = await knex.schema.dropTable('album_tracks');
        const dropAlbumDiscsTable = await knex.schema.dropTable('album_discs');
        const dropAlbumCoversTable = await knex.schema.dropTable('album_covers');
        const dropAlbumArtistsTable = await knex.schema.dropTable('album_artists');
        const dropArtistsTable = await knex.schema.dropTable('artists');
        const dropAlbumsTable = await knex.schema.dropTable('albums');
        const dropGameWebsitesTable = await knex.schema.dropTable('game_websites');
        const dropGameVideosTable = await knex.schema.dropTable('game_videos');
        const dropGameScreenshotsTable = await knex.schema.dropTable('game_screenshots');
        const dropGameCoversTable = await knex.schema.dropTable('game_covers');
        const dropGameArtworksTable = await knex.schema.dropTable('game_artworks');
        const dropGameAlternativeNamesTable = await knex.schema.dropTable('game_alternative_names');
        const dropGamesTable = await knex.schema.dropTable('games');
        const dropEnumWebsiteCategories = await knex.schema.raw('DROP TYPE website_categories');
        const dropEnumGameCategories = await knex.schema.raw('DROP TYPE game_categories');
    } catch (err) {
        console.error(err.name);
        console.error(err.message);
    }
};