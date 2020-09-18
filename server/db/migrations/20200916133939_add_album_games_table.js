const { table } = require("../knex");

exports.up = async (knex) => {
  try {
    await knex.schema.table("albums", (t) => {
      t.dropColumn("game_id");
      t.dropColumn("game_name");
    });
    await knex.schema.createTable("album_games", (t) => {
      t.integer("album_id")
        .unsigned()
        .references("id")
        .inTable("albums")
        .notNull()
        .onDelete("cascade");
      t.integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .notNull()
        .onDelete("cascade");
      t.primary(["album_id", "game_id"]);
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.down = async (knex) => {
  try {
    await knex.schema.dropTable("album_games");
    await knex.schema.table("albums", (t) => {
      t.integer("game_id").unsigned().references("id").inTable("games");
      t.text("game_name");
    });
  } catch (err) {
    console.error(err.message);
  }
};
