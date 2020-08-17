exports.up = async (knex) => {
    const createGamesTable = await knex.schema.createTable('games', t => {
        t.integer('id').unsigned().primary()
        t.integer('aggregated_rating_count')
        t.float('aggregated_rating')
        t.enu('category', ['main_game', 'dlc_addon', 'expansion', 'bundle', 'standalone_expansion', 'mod', 'episode'], {
            useNative: true,
            enumName: 'game_categories'
        })
        t.integer('first_release_date')
        t.string('name')
        t.string('slug')
        t.string('summary')
    });
    const createAlternativeNamesTable = await knex.schema.createTable('alternative_names', t => {
        t.integer('id').unsigned().primary()
        t.uuid('checksum')
        t.text('comment')
        t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
        t.text('name')
    });
    const createArtworksTable = await knex.schema.createTable('artworks', t => {
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
    const createCoversTable = await knex.schema.createTable('covers', t => {
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
    const createScreenshotsTable = await knex.schema.createTable('screenshots', t => {
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
    const createVideosTable = await knex.schema.createTable('videos', t => {
        t.integer('id').unsigned().primary()
        t.uuid('checksum')
        t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
        t.text('name')
        t.text('video_id')
    });
    const createWebsitesTable = await knex.schema.createTable('websites', t => {
        t.integer('id').unsigned().primary()
        t.enu('category', ['official', 'wikia', 'wikipedia', 'facebook', 'twitter', 'twitch', 'instagram', 'youtube', 'iphone', 'ipad', 'android', 'steam', 'reddit', 'itch', 'epicgames', 'gog'], {
            useNative: true,
            enumName: 'website_categories'
        })
        t.uuid('checksum')
        t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
        t.boolean('trusted')
        t.text('url')
    });
    // set character_encoding to utf8 since Japanese characters stored in DB lead to the following error:
    // character with byte sequence 0xe3 0x83 0x87 in encoding "UTF8" has no equivalent in encoding "WIN1252"
    const setClientEncoding = await knex.schema.raw(`UPDATE pg_database set encoding = pg_char_to_encoding('UTF8') where datname = 'vgm_list'`);
    return ([createGamesTable, createArtworksTable, createCoversTable, createVideosTable, createScreenshotsTable, createWebsitesTable, setClientEncoding]);
};

exports.down = async (knex) => {
    const dropWebsitesTable = await knex.schema.dropTable('websites');
    const dropVideosTable = await knex.schema.dropTable('videos');
    const dropScreenshotsTable = await knex.schema.dropTable('screenshots');
    const dropCoversTable = await knex.schema.dropTable('covers');
    const dropArtworksTable = await knex.schema.dropTable('artworks');
    const dropAlternativeNamesTable = await knex.schema.dropTable('alternative_names');
    const dropGamesTable = await knex.schema.dropTable('games');
    const dropEnumWebsiteCategories = await knex.schema.raw('DROP TYPE website_categories');
    const dropEnumGameCategories = await knex.schema.raw('DROP TYPE game_categories');
    return ([dropWebsitesTable, dropVideosTable, dropScreenshotsTable, dropCoversTable, dropArtworksTable, dropAlternativeNamesTable, dropGamesTable, dropEnumWebsiteCategories, dropEnumGameCategories])
};