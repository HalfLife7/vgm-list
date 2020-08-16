exports.up = async (knex) => {
    const createGamesTable = await knex.schema.createTable('games', t => {
        t.integer('id').primary()
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
    const createArtworksTable = await knex.schema.createTable('artworks', t => {
        t.integer('id').primary()
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
        t.integer('id').primary()
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
        t.integer('id').primary()
        t.uuid('checksum')
        t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
        t.text('name')
        t.text('video_id')
    });
    const createScreenshotsTable = await knex.schema.createTable('screenshots', t => {
        t.integer('id').primary()
        t.boolean('alpha_channel')
        t.boolean('animated')
        t.uuid('checksum')
        t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
        t.integer('height')
        t.text('image_id')
        t.text('url')
        t.integer('width')
    });
    const createWebsitesTable = await knex.schema.createTable('websites', t => {
        t.integer('id').primary()
        t.enu('category', ['official', 'wikia', 'wikipedia', 'facebook', 'twitter', 'twitch', 'instagram', 'youtube', 'iphone', 'ipad', 'android', 'steam', 'reddit', 'itch', 'epicgames', 'gog'], {
            useNative: true,
            enumName: 'website_categories'
        })
        t.uuid('checksum')
        t.integer('game_id').unsigned().references('id').inTable('games').notNull().onDelete('cascade')
        t.boolean('trusted')
        t.text('url')
    });
    return ([createGamesTable, createArtworksTable, createCoversTable, createGameVideosTable, createScreenshotsTable, createWebsitesTable]);
};

exports.down = async (knex) => {
    const dropWebsitesTable = await knex.schema.dropTable('websites');
    const dropScreenshotsTable = await knex.schema.dropTable('screenshots');
    const dropGameVideosTable = await knex.schema.dropTable('game_videos');
    const dropCoversTable = await knex.schema.dropTable('covers');
    const dropArtworksTable = await knex.schema.dropTable('artworks');
    const dropGamesTable = await knex.schema.dropTable('games');
    const dropEnumWebsiteCategories = await knex.schema.raw('DROP TYPE website_categories');
    const dropEnumGameCategories = await knex.schema.raw('DROP TYPE game_categories');
    return ([dropWebsitesTable, dropScreenshotsTable, dropGameVideosTable, dropCoversTable, dropArtworksTable, dropGamesTable, dropEnumWebsiteCategories, dropEnumGameCategories])
};