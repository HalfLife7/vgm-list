exports.seed = async function seedGamePlatforms(knex) {
  try {
    // Deletes ALL existing entries
    await knex("game_collections").del();
    // Inserts seed entries
    await knex("game_collections").insert([
      {
        game_id: 11800,
        collection_id: 1024,
      },
      {
        game_id: 386,
        collection_id: 39,
      },
      {
        game_id: 2963,
        collection_id: 556,
      },
    ]);
  } catch (err) {
    console.error(err.name);
    console.error(err.message);
  }
};
