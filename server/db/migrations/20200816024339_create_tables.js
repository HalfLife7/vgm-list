exports.up = async (knex) => {
  try {
    await knex.schema.createTable("games", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("aggregated_rating_count");
      t.float("aggregated_rating");
      // t.enu('category', ['main_game', 'dlc_addon', 'expansion', 'bundle', 'standalone_expansion', 'mod', 'episode'], {
      //     useNative: true,
      //     enumName: 'game_categories'
      // })
      t.enu("category", ["0", "1", "2", "3", "4", "5", "6", "7"], {
        useNative: true,
        enumName: "game_categories",
      });
      t.integer("first_release_date");
      t.text("name");
      t.text("slug");
      t.text("summary");
    });
    await knex.schema.createTable("game_alternative_names", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .notNull()
        .onDelete("cascade");
      t.text("comment");
      t.text("name");
      t.uuid("checksum");
    });
    await knex.schema.createTable("game_artworks", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .notNull()
        .onDelete("cascade");
      t.boolean("alpha_channel");
      t.boolean("animated");
      t.integer("height");
      t.text("image_id");
      t.text("url");
      t.integer("width");
      t.uuid("checksum");
    });
    await knex.schema.createTable("game_covers", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .notNull()
        .onDelete("cascade");
      t.boolean("alpha_channel");
      t.boolean("animated");
      t.integer("height");
      t.text("image_id");
      t.text("url");
      t.integer("width");
      t.uuid("checksum");
    });
    await knex.schema.createTable("game_screenshots", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .notNull()
        .onDelete("cascade");
      t.boolean("alpha_channel");
      t.boolean("animated");
      t.integer("height");
      t.text("image_id");
      t.text("url");
      t.integer("width");
      t.uuid("checksum");
    });
    await knex.schema.createTable("game_videos", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .notNull()
        .onDelete("cascade");
      t.text("name");
      t.text("video_id");
      t.uuid("checksum");
    });
    await knex.schema.createTable("game_websites", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .notNull()
        .onDelete("cascade");
      // t.enu('category', ['official', 'wikia', 'wikipedia', 'facebook', 'twitter', 'twitch', 'instagram', 'youtube', 'iphone', 'ipad', 'android', 'steam', 'reddit', 'itch', 'epicgames', 'gog'], {
      //     useNative: true,
      //     enumName: 'website_categories'
      // })
      t.enu(
        "category",
        [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
        ],
        {
          useNative: true,
          enumName: "website_categories",
        }
      );
      t.boolean("trusted");
      t.text("url");
      t.uuid("checksum");
    });
    await knex.schema.createTable("platforms", (t) => {
      t.integer("id").unsigned().primary();
      t.text("abbreviation");
      t.text("alternative_name");
      t.enu("category", ["1", "2", "3", "4", "5", "6"], {
        useNative: true,
        enumName: "platform_categories",
      });
      t.integer("created_at");
      t.text("generation");
      t.text("name");
      t.text("slug");
      t.text("summary");
      t.integer("updated_at");
      t.text("url");
      t.uuid("checksum");
    });
    await knex.schema.createTable("platform_logos", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("platform_id")
        .unsigned()
        .references("id")
        .inTable("platforms")
        .notNull()
        .onDelete("cascade");
      t.boolean("alpha_channel");
      t.boolean("animated");
      t.integer("height");
      t.text("image_id");
      t.text("url");
      t.integer("width");
      t.uuid("checksum");
    });
    await knex.schema.createTable("game_platforms", (t) => {
      t.integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .notNull()
        .onDelete("cascade");
      t.integer("platform_id")
        .unsigned()
        .references("id")
        .inTable("platforms")
        .notNull()
        .onDelete("cascade");
      t.primary(["game_id", "platform_id"]);
    });
    await knex.schema.createTable("collections", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("created_at");
      t.text("name");
      t.text("slug");
      t.integer("updated_at");
      t.text("url");
      t.uuid("checksum");
    });
    await knex.schema.createTable("game_collections", (t) => {
      t.integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .notNull()
        .onDelete("cascade");
      t.integer("collection_id")
        .unsigned()
        .references("id")
        .inTable("collections")
        .notNull()
        .onDelete("cascade");
      t.primary(["game_id", "collection_id"]);
    });
    await knex.schema.createTable("albums", (t) => {
      t.integer("id").unsigned().primary();
      t.integer("game_id").unsigned().references("id").inTable("games");
      t.text("catalog");
      t.text("category");
      t.text("classification");
      t.text("media_format");
      t.text("name");
      t.text("notes");
      t.text("publisher");
      t.text("game_name"); // products field in album json
      t.date("release_date");
      t.integer("updated_at");
    });
    await knex.schema.createTable("artists", (t) => {
      t.integer("id").unsigned().primary();
      t.text("name");
    });
    await knex.schema.createTable("album_arrangers", (t) => {
      t.integer("artist_id")
        .unsigned()
        .references("id")
        .inTable("artists")
        .notNull()
        .onDelete("cascade");
      t.integer("album_id")
        .unsigned()
        .references("id")
        .inTable("albums")
        .notNull()
        .onDelete("cascade");
      t.primary(["artist_id", "album_id"]);
    });
    await knex.schema.createTable("album_composers", (t) => {
      t.integer("artist_id")
        .unsigned()
        .references("id")
        .inTable("artists")
        .notNull()
        .onDelete("cascade");
      t.integer("album_id")
        .unsigned()
        .references("id")
        .inTable("albums")
        .notNull()
        .onDelete("cascade");
      t.primary(["artist_id", "album_id"]);
    });
    await knex.schema.createTable("album_lyricists", (t) => {
      t.integer("artist_id")
        .unsigned()
        .references("id")
        .inTable("artists")
        .notNull()
        .onDelete("cascade");
      t.integer("album_id")
        .unsigned()
        .references("id")
        .inTable("albums")
        .notNull()
        .onDelete("cascade");
      t.primary(["artist_id", "album_id"]);
    });
    await knex.schema.createTable("album_performers", (t) => {
      t.integer("artist_id")
        .unsigned()
        .references("id")
        .inTable("artists")
        .notNull()
        .onDelete("cascade");
      t.integer("album_id")
        .unsigned()
        .references("id")
        .inTable("albums")
        .notNull()
        .onDelete("cascade");
      t.primary(["artist_id", "album_id"]);
    });
    await knex.schema.createTable("album_covers", (t) => {
      t.increments("id");
      t.integer("album_id")
        .unsigned()
        .references("id")
        .inTable("albums")
        .notNull()
        .onDelete("cascade");
      t.text("full");
      t.text("medium");
      t.text("name");
      t.text("thumb");
    });
    await knex.schema.createTable("album_discs", (t) => {
      t.integer("id").unsigned();
      t.integer("album_id")
        .unsigned()
        .references("id")
        .inTable("albums")
        .notNull()
        .onDelete("cascade");
      t.text("length");
      t.text("name");
      t.unique(["id", "album_id"]);
    });
    await knex.schema.createTable("album_tracks", (t) => {
      t.integer("id").unsigned();
      t.integer("album_id")
        .unsigned()
        .references("id")
        .inTable("albums")
        .notNull()
        .onDelete("cascade");
      t.integer("disc_id").unsigned().notNull();
      t.text("length");
      t.text("name");
      t.unique(["id", "disc_id", "album_id"]);
    });
    await knex.schema.createTable("album_stores", (t) => {
      t.increments("id");
      t.integer("album_id")
        .unsigned()
        .references("id")
        .inTable("albums")
        .notNull()
        .onDelete("cascade");
      t.text("link");
      t.text("name");
    });
    // set character_encoding to utf8 since Japanese characters stored in DB lead to the following error:
    // character with byte sequence 0xe3 0x83 0x87 in encoding "UTF8" has no equivalent in encoding "WIN1252"
    // https://stackoverflow.com/questions/380924/how-can-i-change-database-encoding-for-a-postgresql-database-using-sql-or-phppga
    await knex.schema.raw(
      "UPDATE pg_database set encoding = pg_char_to_encoding('UTF8') where datname = 'vgm_list'"
    );
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};

exports.down = async (knex) => {
  try {
    await knex.schema.dropTable("album_stores");
    await knex.schema.dropTable("album_tracks");
    await knex.schema.dropTable("album_discs");
    await knex.schema.dropTable("album_covers");
    await knex.schema.dropTable("album_performers");
    await knex.schema.dropTable("album_lyricists");
    await knex.schema.dropTable("album_composers");
    await knex.schema.dropTable("album_arrangers");
    await knex.schema.dropTable("artists");
    await knex.schema.dropTable("albums");
    await knex.schema.dropTable("game_collections");
    await knex.schema.dropTable("collections");
    await knex.schema.dropTable("game_platforms");
    await knex.schema.dropTable("platform_logos");
    await knex.schema.dropTable("platforms");
    await knex.schema.dropTable("game_websites");
    await knex.schema.dropTable("game_videos");
    await knex.schema.dropTable("game_screenshots");
    await knex.schema.dropTable("game_covers");
    await knex.schema.dropTable("game_artworks");
    await knex.schema.dropTable("game_alternative_names");
    await knex.schema.dropTable("games");
    await knex.schema.raw("DROP TYPE website_categories");
    await knex.schema.raw("DROP TYPE platform_categories");
    await knex.schema.raw("DROP TYPE game_categories");
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
